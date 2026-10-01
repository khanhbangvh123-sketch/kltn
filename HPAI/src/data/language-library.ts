export type AppLangId =
  | 'auto'
  | 'vi'
  | 'ede'
  | 'en'
  | 'fr'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'th'
  | 'km'
  | 'lo'
  | 'id'
  | 'es'
  | 'de'
  | 'ru'
  | 'hi'
  // Thêm mới — dịch qua Gemini
  | 'it'
  | 'pt'
  | 'ar'
  | 'tr'
  | 'ms'
  | 'tl'
  | 'pl'
  | 'nl'
  | 'sv'
  | 'uk'
  | 'bn'
  | 'my'
  | 'mn';

export type AppLang = {
  id: AppLangId;
  label: string;
  short: string;
  /** Mã MyMemory / ISO 639-1, dùng làm fallback khi không có Gemini key. null = chỉ từ điển nội bộ (Ê Đê). */
  iso: string | null;
  needsNetwork: boolean;
};

export const LANGUAGE_LIBRARY: AppLang[] = [
  { id: 'vi', label: 'Tiếng Việt', short: 'Việt', iso: 'vi', needsNetwork: false },
  { id: 'ede', label: 'Klei Êđê', short: 'Ê Đê', iso: null, needsNetwork: false },
  { id: 'en', label: 'English', short: 'Anh', iso: 'en', needsNetwork: false },
  { id: 'fr', label: 'Français', short: 'Pháp', iso: 'fr', needsNetwork: true },
  { id: 'zh', label: '中文', short: 'Trung', iso: 'zh-CN', needsNetwork: true },
  { id: 'ja', label: '日本語', short: 'Nhật', iso: 'ja', needsNetwork: true },
  { id: 'ko', label: '한국어', short: 'Hàn', iso: 'ko', needsNetwork: true },
  { id: 'th', label: 'ไทย', short: 'Thái', iso: 'th', needsNetwork: true },
  { id: 'km', label: 'ភាសាខ្មែរ', short: 'Khmer', iso: 'km', needsNetwork: true },
  { id: 'lo', label: 'ລາວ', short: 'Lào', iso: 'lo', needsNetwork: true },
  { id: 'id', label: 'Bahasa Indonesia', short: 'Indo', iso: 'id', needsNetwork: true },
  { id: 'es', label: 'Español', short: 'Tây Ban Nha', iso: 'es', needsNetwork: true },
  { id: 'de', label: 'Deutsch', short: 'Đức', iso: 'de', needsNetwork: true },
  { id: 'ru', label: 'Русский', short: 'Nga', iso: 'ru', needsNetwork: true },
  { id: 'hi', label: 'हिन्दी', short: 'Hindi', iso: 'hi', needsNetwork: true },
  { id: 'it', label: 'Italiano', short: 'Ý', iso: 'it', needsNetwork: true },
  { id: 'pt', label: 'Português', short: 'Bồ Đào Nha', iso: 'pt', needsNetwork: true },
  { id: 'ar', label: 'العربية', short: 'Ả Rập', iso: 'ar', needsNetwork: true },
  { id: 'tr', label: 'Türkçe', short: 'Thổ Nhĩ Kỳ', iso: 'tr', needsNetwork: true },
  { id: 'ms', label: 'Bahasa Melayu', short: 'Mã Lai', iso: 'ms', needsNetwork: true },
  { id: 'tl', label: 'Filipino', short: 'Philippines', iso: 'tl', needsNetwork: true },
  { id: 'pl', label: 'Polski', short: 'Ba Lan', iso: 'pl', needsNetwork: true },
  { id: 'nl', label: 'Nederlands', short: 'Hà Lan', iso: 'nl', needsNetwork: true },
  { id: 'sv', label: 'Svenska', short: 'Thụy Điển', iso: 'sv', needsNetwork: true },
  { id: 'uk', label: 'Українська', short: 'Ukraina', iso: 'uk', needsNetwork: true },
  { id: 'bn', label: 'বাংলা', short: 'Bengal', iso: 'bn', needsNetwork: true },
  { id: 'my', label: 'မြန်မာ', short: 'Myanmar', iso: 'my', needsNetwork: true },
  { id: 'mn', label: 'Монгол', short: 'Mông Cổ', iso: 'mn', needsNetwork: true },
];

export const INPUT_LANGUAGES: AppLang[] = [
  { id: 'auto', label: 'Phát hiện ngôn ngữ', short: 'Phát hiện ngôn ngữ', iso: null, needsNetwork: false },
  ...LANGUAGE_LIBRARY,
];

export const OUTPUT_LANGUAGES: AppLang[] = LANGUAGE_LIBRARY;

export function getLang(id: AppLangId): AppLang {
  const found = INPUT_LANGUAGES.find((item) => item.id === id);
  if (!found) {
    return LANGUAGE_LIBRARY[0];
  }
  return found;
}

export function needsNetworkPair(source: AppLangId, target: AppLangId): boolean {
  const from = source === 'auto' ? 'vi' : source;
  const local = new Set(['vi', 'en', 'ede']);
  if (local.has(from) && local.has(target)) return false;
  return true;
}