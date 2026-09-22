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
  | 'hi';

export type AppLang = {
  id: AppLangId;
  label: string;
  short: string;
  /** Mã MyMemory / ISO 639-1. null = chỉ từ điển nội bộ (Ê Đê). */
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
