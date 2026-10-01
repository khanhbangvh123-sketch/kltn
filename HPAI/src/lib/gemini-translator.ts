/**
 * Gọi Gemini API để dịch. Đọc API key từ biến môi trường EXPO_PUBLIC_GEMINI_API_KEY.
 *
 * CÁCH THIẾT LẬP:
 * 1. Tạo file `.env` ở gốc project (KHÔNG commit lên git — thêm vào .gitignore):
 *      EXPO_PUBLIC_GEMINI_API_KEY=your_key_here
 * 2. Restart Metro/Expo sau khi thêm biến môi trường.
 *
 * LƯU Ý BẢO MẬT: biến EXPO_PUBLIC_* bị nhúng thẳng vào bundle JS của app, nên
 * ai giải nén APK/IPA cũng lấy được key. Chấp nhận được khi thử nghiệm, nhưng
 * trước khi phát hành nên chuyển việc gọi Gemini qua một backend nhỏ (proxy)
 * để giấu key và giới hạn tần suất gọi.
 */

const GEMINI_MODEL = 'gemini-2.5-flash'; // đổi thành 'gemini-2.5-pro' nếu muốn chất lượng cao hơn (chậm/đắt hơn)
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const ENDPOINT = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

export function hasGeminiKey(): boolean {
  return GEMINI_API_KEY.length > 0;
}

async function callGemini(
  prompt: string,
  opts: { temperature?: number; maxOutputTokens?: number; timeoutMs?: number } = {}
): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 12000);
  try {
    const res = await fetch(ENDPOINT(GEMINI_MODEL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: opts.temperature ?? 0.2,
          maxOutputTokens: opts.maxOutputTokens ?? 512,
        },
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const out = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return out || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Dịch văn bản thường giữa hai ngôn ngữ bất kỳ (không dùng cho Ê Đê). */
export async function geminiTranslate(
  text: string,
  fromLabel: string,
  toLabel: string
): Promise<string | null> {
  const prompt =
    `Dịch đoạn văn bản sau từ ${fromLabel} sang ${toLabel}. ` +
    `Chỉ trả về bản dịch, không thêm giải thích, không thêm ngoặc kép, không thêm ghi chú.\n\n` +
    `Văn bản: """${text}"""`;
  return callGemini(prompt, { temperature: 0.2 });
}

/**
 * Gợi ý một từ/cụm tiếng Ê Đê cho một từ tiếng Việt đang thiếu trong từ điển nội bộ.
 * Trả về null nếu Gemini không đủ tự tin — KHÔNG được ghép thẳng vào bản dịch chính
 * thức, chỉ hiển thị như gợi ý riêng có cảnh báo "AI, chưa kiểm chứng" cho người dùng.
 */
export async function geminiSuggestEde(viWord: string): Promise<string | null> {
  const prompt =
    `Bạn là trợ lý ngôn ngữ học. Tôi cần bản dịch sang tiếng Ê Đê ` +
    `(dân tộc Ê Đê, Tây Nguyên, Việt Nam; còn gọi Rade/Rhade, mã ISO 639-3: rad) ` +
    `cho từ/cụm tiếng Việt sau: "${viWord}".\n` +
    `Nếu bạn KHÔNG chắc chắn, hoặc không có nguồn dữ liệu đáng tin cậy về từ này trong ` +
    `tiếng Ê Đê, hãy trả lời chính xác một từ: KHONG_CHAC\n` +
    `Nếu chắc chắn, chỉ trả về từ/cụm tiếng Ê Đê tương ứng, không giải thích gì thêm.`;
  const out = await callGemini(prompt, { temperature: 0, maxOutputTokens: 40 });
  if (!out || /KHONG_CHAC/i.test(out)) return null;
  return out.replace(/^["'“”]+|["'“”]+$/g, '').trim();
}