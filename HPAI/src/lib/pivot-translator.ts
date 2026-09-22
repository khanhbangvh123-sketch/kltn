import type { AppLangId } from '@/data/language-library';
import { getLang } from '@/data/language-library';
import {
  DIGIT_EDE,
  EDE_DIGIT,
  EN_DIGIT,
  LEXICON,
  type Lang,
  type LexEntry,
  VI_DIGIT,
} from '@/data/ede-lexicon';

export type TranslateStep = {
  label: string;
  text: string;
};

export type TranslateResult = {
  output: string;
  source: AppLangId;
  target: AppLangId;
  pivotVietnamese: string;
  steps: TranslateStep[];
  unmatched: string[];
  usedOnlinePivot: boolean;
  needsNetwork: boolean;
};

const EDE_SCRIPT = /[ƀčñĕĭŏŭɃČÑĔĬŎŬ]|[êôơưÊÔƠƯ]\u0306/;
const VI_TONES =
  /[àáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵằắẳẵặầấẩẫậềếểễệồốổỗộờớởỡợừứửữựÀÁẢÃẠÈÉẺẼẸÌÍỈĨỊÒÓỎÕỌÙÚỦŨỤỲÝỶỸỴ]/;

function lexiconCoverage(text: string, lang: Lang): number {
  const src = fold(text);
  if (!src) return 0;
  const compact = src.replace(/\s+/g, '');
  let matched = 0;
  let rest = src;
  while (rest.length) {
    let hit: string | null = null;
    for (const key of KEYS[lang]) {
      if (rest === key || rest.startsWith(`${key} `)) {
        hit = key;
        break;
      }
    }
    if (hit) {
      matched += hit.replace(/\s+/g, '').length;
      rest = rest.slice(hit.length).trim();
    } else {
      const tok = rest.split(' ')[0];
      rest = rest.slice(tok.length).trim();
    }
  }
  return matched / compact.length;
}

export function detectLanguage(text: string): Lang {
  const raw = text.trim();
  if (!raw) return 'vi';
  if (EDE_SCRIPT.test(raw)) return 'ede';
  if (VI_TONES.test(raw)) return 'vi';

  const ede = lexiconCoverage(raw, 'ede');
  const vi = lexiconCoverage(raw, 'vi');
  const en = lexiconCoverage(raw, 'en');
  const best = Math.max(ede, vi, en);
  if (best < 0.25) return 'vi';
  if (ede >= vi && ede >= en) return 'ede';
  if (en > vi && en > ede) return 'en';
  return 'vi';
}

const DROP_VI = new Set([
  'của',
  'những',
  'các',
  'thì',
  'đã',
  'sẽ',
  'rằng',
  'hãy',
  'một',
  'cái',
  'chiếc',
]);

function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFC')
    .replace(/['’ʼ]/g, "'")
    .replace(/[?!.,;:""]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formsFor(entry: LexEntry, lang: Lang): string[] {
  const primary = lang === 'ede' ? entry.ede : lang === 'en' ? entry.en : entry.vi;
  const extra =
    lang === 'ede' ? entry.extraEde : lang === 'en' ? entry.extraEn : entry.extraVi;
  return [primary, ...(extra ?? [])].map(fold).filter(Boolean);
}

type Index = Map<string, LexEntry>;

function buildIndex(lang: Lang): Index {
  const map: Index = new Map();
  for (const entry of LEXICON) {
    for (const form of formsFor(entry, lang)) {
      if (!map.has(form)) map.set(form, entry);
    }
  }
  return map;
}

const INDEX: Record<Lang, Index> = {
  vi: buildIndex('vi'),
  en: buildIndex('en'),
  ede: buildIndex('ede'),
};

const KEYS: Record<Lang, string[]> = {
  vi: [...INDEX.vi.keys()].sort((a, b) => b.length - a.length),
  en: [...INDEX.en.keys()].sort((a, b) => b.length - a.length),
  ede: [...INDEX.ede.keys()].sort((a, b) => b.length - a.length),
};

function field(entry: LexEntry, lang: Lang): string {
  return lang === 'ede' ? entry.ede : lang === 'en' ? entry.en : entry.vi;
}

function numberToEde(n: number): string {
  if (n < 0 || !Number.isFinite(n)) return String(n);
  if (n <= 10) return DIGIT_EDE[n] ?? String(n);
  if (n < 20) return `pluh ${DIGIT_EDE[n - 10]}`;
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return ones === 0 ? `${DIGIT_EDE[tens]} pluh` : `${DIGIT_EDE[tens]} pluh ${DIGIT_EDE[ones]}`;
  }
  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    const head = hundreds === 1 ? 'sa êtuh' : `${numberToEde(hundreds)} êtuh`;
    return rest === 0 ? head : `${head} ${numberToEde(rest)}`;
  }
  if (n < 1_000_000) {
    const thousands = Math.floor(n / 1000);
    const rest = n % 1000;
    const head = thousands === 1 ? 'sa êbâo' : `${numberToEde(thousands)} êbâo`;
    return rest === 0 ? head : `${head} ${numberToEde(rest)}`;
  }
  return String(n);
}

function lookupNumber(token: string, lang: Lang): number | null {
  if (/^\d+$/.test(token)) return Number(token);
  if (lang === 'vi' && token in VI_DIGIT) return VI_DIGIT[token];
  if (lang === 'en' && token in EN_DIGIT) return EN_DIGIT[token];
  if (lang === 'ede' && token in EDE_DIGIT) return EDE_DIGIT[token];
  return null;
}

function greedyMatch(
  text: string,
  source: Lang,
  toward: Lang
): { pieces: string[]; unmatched: string[] } {
  const src = fold(text);
  if (!src) return { pieces: [], unmatched: [] };

  const keys = KEYS[source];
  const index = INDEX[source];
  const unmatched: string[] = [];
  const pieces: string[] = [];
  let rest = src;

  while (rest.length) {
    let hit: string | null = null;
    for (const key of keys) {
      if (rest === key || rest.startsWith(`${key} `)) {
        hit = key;
        break;
      }
    }

    if (hit) {
      const entry = index.get(hit)!;
      const n = lookupNumber(hit, source);
      if (n !== null && toward === 'ede') {
        pieces.push(numberToEde(n));
      } else if (n !== null && toward === 'vi') {
        pieces.push(String(n));
      } else {
        pieces.push(field(entry, toward));
      }
      rest = rest.slice(hit.length).trim();
      continue;
    }

    const [tok, ...tail] = rest.split(' ');
    const n = lookupNumber(tok, source);
    if (n !== null) {
      if (toward === 'ede') pieces.push(numberToEde(n));
      else pieces.push(String(n));
    } else if (toward === 'vi' && DROP_VI.has(tok)) {
      if (source !== 'vi') unmatched.push(tok);
    } else {
      unmatched.push(tok);
      pieces.push(tok);
    }
    rest = tail.join(' ').trim();
  }

  return { pieces, unmatched };
}

function applyVietnameseTransfer(vietnamese: string, target: Lang): string | null {
  const v = fold(vietnamese);
  if (target !== 'ede') return null;

  const age = v.match(/^(?:tôi|mình)(?: có)? (\d+)(?: tuổi)?$/);
  if (age) return `kâo mâo ${numberToEde(Number(age[1]))} thŭn`;

  const poss = v.match(/^(.+?) (?:của )?(tôi|mình|bạn|anh|chị|nó|họ)$/);
  if (poss) {
    const owners: Record<string, string> = {
      tôi: 'kâo',
      mình: 'kâo',
      bạn: 'ih',
      anh: 'ih',
      chị: 'ih',
      nó: 'ñu',
      họ: 'diñu',
    };
    const noun = greedyMatch(poss[1], 'vi', 'ede').pieces.join(' ');
    return `${noun} ${owners[poss[2]]}`;
  }

  return null;
}

function tidy(text: string, target: Lang, askedQuestion: boolean): string {
  let out = text.replace(/\s+/g, ' ').trim();
  if (!out) return out;
  if (askedQuestion && target === 'ede' && !out.includes('mơ̆') && !/[?]/.test(out)) {
    out = `${out} mơ̆`;
  }
  if (askedQuestion && !out.endsWith('?')) out = `${out}?`;
  if (target === 'ede') {
    out = out.replace(/\b(là|của|một|cái|những|các)\b/gi, '').replace(/\s+/g, ' ').trim();
  }
  if (out.length) out = out.charAt(0).toUpperCase() + out.slice(1);
  return out;
}

async function myMemory(text: string, fromIso: string, toIso: string): Promise<string | null> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromIso}|${toIso}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = (await res.json()) as { responseData?: { translatedText?: string } };
    const translated = json.responseData?.translatedText?.trim();
    if (!translated || /invalid|query length|please specify/i.test(translated)) return null;
    return translated;
  } catch {
    return null;
  }
}

export async function translatePivot(options: {
  text: string;
  source: Lang;
  target: Lang;
  useOnlinePivot?: boolean;
}): Promise<TranslateResult> {
  const { text, source, target, useOnlinePivot = true } = options;
  const askedQuestion = /[?]/.test(text) || /không\s*$/i.test(text.trim());

  if (source === target) {
    return {
      output: text.trim(),
      source,
      target,
      pivotVietnamese: source === 'vi' ? fold(text) : '',
      steps: [{ label: 'Cùng ngôn ngữ', text: text.trim() }],
      unmatched: [],
      usedOnlinePivot: false,
      needsNetwork: false,
    };
  }

  const steps: TranslateStep[] = [{ label: `Nguồn (${source.toUpperCase()})`, text: text.trim() }];
  let usedOnlinePivot = false;
  let unmatched: string[] = [];

  let vietnamese = '';
  if (source === 'vi') {
    vietnamese = fold(text);
  } else {
    const local = greedyMatch(text, source, 'vi');
    unmatched = local.unmatched;
    vietnamese = local.pieces.filter((p) => !DROP_VI.has(fold(p))).join(' ');
    const coverageBad = local.unmatched.length > 0 && local.unmatched.length >= local.pieces.length * 0.4;
    if (useOnlinePivot && coverageBad && source === 'en') {
      const online = await myMemory(text, 'en', 'vi');
      if (online) {
        vietnamese = fold(online);
        usedOnlinePivot = true;
        unmatched = [];
      }
    }
  }

  if (target === 'vi') {
    const output = tidy(vietnamese, 'vi', askedQuestion);
    return { output, source, target, pivotVietnamese: vietnamese, steps, unmatched, usedOnlinePivot, needsNetwork: false };
  }

  const transferred = applyVietnameseTransfer(vietnamese, target);
  if (transferred) {
    const output = tidy(transferred, target, askedQuestion);
    return { output, source, target, pivotVietnamese: vietnamese, steps, unmatched, usedOnlinePivot, needsNetwork: false };
  }

  const toward = greedyMatch(vietnamese, 'vi', target);
  unmatched = [...unmatched, ...toward.unmatched.filter((t) => !DROP_VI.has(t) && !/^\d+$/.test(t))];
  let output = toward.pieces.filter((p) => !DROP_VI.has(fold(p))).join(' ');

  if (useOnlinePivot && target === 'en' && toward.unmatched.length > 0) {
    const online = await myMemory(vietnamese, 'vi', 'en');
    if (online) {
      output = online;
      usedOnlinePivot = true;
    }
  }

  output = tidy(output, target, askedQuestion);
  return { output, source, target, pivotVietnamese: vietnamese, steps, unmatched, usedOnlinePivot, needsNetwork: false };
}

const LEXICON_LANGS = new Set<string>(['vi', 'en', 'ede']);

function emptyResult(
  text: string,
  source: AppLangId,
  target: AppLangId,
  extra: Partial<TranslateResult> = {}
): TranslateResult {
  return {
    output: text,
    source,
    target,
    pivotVietnamese: '',
    steps: [],
    unmatched: [],
    usedOnlinePivot: false,
    needsNetwork: false,
    ...extra,
  };
}

export async function translateText(options: {
  text: string;
  source: AppLangId;
  target: AppLangId;
  useNetwork?: boolean;
}): Promise<TranslateResult> {
  const raw = options.text.trim();
  const useNetwork = options.useNetwork ?? true;
  const source: AppLangId =
    options.source === 'auto' ? detectLanguage(raw) : options.source;
  const target = options.target;

  if (!raw) {
    return emptyResult('', source, target);
  }

  if (source === target) {
    return emptyResult(raw, source, target);
  }

  if (LEXICON_LANGS.has(source) && LEXICON_LANGS.has(target)) {
    return translatePivot({
      text: raw,
      source: source as Lang,
      target: target as Lang,
      useOnlinePivot: useNetwork,
    });
  }

  if (!useNetwork) {
    return emptyResult(raw, source, target, {
      output: '',
      unmatched: [raw],
      needsNetwork: true,
    });
  }

  const sourceMeta = getLang(source);
  const targetMeta = getLang(target);

  // … → Ê Đê: mạng ra tiếng Việt, rồi từ điển Ê Đê
  if (target === 'ede') {
    const vietnamese =
      source === 'vi'
        ? raw
        : sourceMeta.iso
          ? await myMemory(raw, sourceMeta.iso, 'vi')
          : null;
    if (!vietnamese) {
      return emptyResult(raw, source, target, {
        output: '',
        unmatched: [raw],
        needsNetwork: true,
      });
    }
    const local = await translatePivot({
      text: vietnamese,
      source: 'vi',
      target: 'ede',
      useOnlinePivot: false,
    });
    return { ...local, source, target, usedOnlinePivot: source !== 'vi', needsNetwork: source !== 'vi' };
  }

  // Ê Đê → …: từ điển ra tiếng Việt, rồi mạng sang đích
  if (source === 'ede') {
    const mid = await translatePivot({
      text: raw,
      source: 'ede',
      target: 'vi',
      useOnlinePivot: false,
    });
    if (target === 'vi') return { ...mid, source: 'ede', target: 'vi' };
    if (!targetMeta.iso) {
      return { ...mid, source, target, output: mid.output, needsNetwork: true };
    }
    const online = await myMemory(mid.output, 'vi', targetMeta.iso);
    return {
      ...mid,
      source,
      target,
      output: online ?? mid.output,
      usedOnlinePivot: Boolean(online),
      needsNetwork: true,
      unmatched: online ? [] : mid.unmatched,
    };
  }

  if (!sourceMeta.iso || !targetMeta.iso) {
    return emptyResult(raw, source, target, {
      output: '',
      unmatched: [raw],
      needsNetwork: true,
    });
  }

  // Cặp mạng khác: nguồn → tiếng Việt → đích
  const viaVi =
    source === 'vi' ? raw : await myMemory(raw, sourceMeta.iso, 'vi');
  if (!viaVi) {
    return emptyResult(raw, source, target, {
      output: '',
      unmatched: [raw],
      needsNetwork: true,
      usedOnlinePivot: true,
    });
  }
  if (target === 'vi') {
    return emptyResult(viaVi, source, target, {
      usedOnlinePivot: true,
      needsNetwork: true,
      pivotVietnamese: viaVi,
    });
  }
  const online = await myMemory(viaVi, 'vi', targetMeta.iso);
  if (!online) {
    return emptyResult(raw, source, target, {
      output: viaVi,
      unmatched: [raw],
      needsNetwork: true,
      usedOnlinePivot: true,
      pivotVietnamese: viaVi,
    });
  }

  return emptyResult(online, source, target, {
    usedOnlinePivot: true,
    needsNetwork: true,
    pivotVietnamese: viaVi,
  });
}

export const EXAMPLES: string[] = [
  'Xin chào',
  'Tôi làm nhà',
  'Bạn tên gì?',
  'Bạn khỏe không?',
  'How are you?',
];
