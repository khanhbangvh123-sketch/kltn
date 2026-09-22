export type Lang = 'vi' | 'en' | 'ede';

export type LexEntry = {
  ede: string;
  en: string;
  vi: string;
  extraEn?: string[];
  extraVi?: string[];
  extraEde?: string[];
};

/** Bộ từ / cụm từ lấy từ ngon-ngu-e-de.md — tiếng Anh là trục nghĩa. */
export const LEXICON: LexEntry[] = [
  // Câu / cụm ưu tiên (dài hơn được khớp trước)
  {
    ede: "alum k'kuh",
    en: 'hello',
    vi: 'xin chào',
    extraEn: ['hi', 'greetings'],
    extraVi: ['chào', 'chào bạn'],
  },
  {
    ede: 'ih suaih pral mơ̆',
    en: 'how are you',
    vi: 'bạn khỏe không',
    extraEn: ['are you well', 'are you healthy'],
    extraVi: ['anh khỏe không', 'chị khỏe không', 'bạn có khỏe không'],
  },
  {
    ede: 'hlei anăn ih',
    en: 'what is your name',
    vi: 'bạn tên gì',
    extraEn: ['what is your name?', "what's your name"],
    extraVi: ['tên bạn là gì', 'anh tên gì', 'chị tên gì'],
    extraEde: ['si anăn ih'],
  },
  {
    ede: 'si djuê ih',
    en: 'what is your family name',
    vi: 'bạn họ gì',
    extraEn: ['what is your surname'],
    extraVi: ['họ bạn là gì'],
  },
  {
    ede: 'dŭm thŭn ih mâo',
    en: 'how old are you',
    vi: 'bạn bao nhiêu tuổi',
    extraVi: ['anh bao nhiêu tuổi', 'chị bao nhiêu tuổi'],
  },
  {
    ede: 'ti anôk sang ih',
    en: 'where is your house',
    vi: 'nhà bạn ở đâu',
    extraEn: ['where do you live'],
    extraVi: ['nhà anh ở đâu', 'bạn sống ở đâu'],
  },
  {
    ede: 'ti anôk buôn sang ih',
    en: 'where is your hometown',
    vi: 'quê bạn ở đâu',
    extraVi: ['buôn bạn ở đâu', 'bạn quê ở đâu'],
  },
  {
    ede: 'ya bruă ih ngă',
    en: 'what is your job',
    vi: 'bạn làm nghề gì',
    extraEn: ['what do you do'],
    extraVi: ['bạn làm công việc gì', 'bạn làm việc gì'],
  },
  {
    ede: 'ih khăp mơ̆ hriăm klei êđê',
    en: 'do you like learning ede',
    vi: 'bạn có thích học tiếng ê đê không',
    extraEn: ['do you like to learn ede', 'do you like studying rade'],
    extraVi: ['bạn thích học tiếng ê đê không'],
  },
  {
    ede: 'kâo ngă sang',
    en: 'i build a house',
    vi: 'tôi làm nhà',
    extraEn: ['i make a house', 'i build house'],
  },
  {
    ede: 'anăn kâo',
    en: 'my name is',
    vi: 'tên tôi là',
    extraEn: ['my name'],
  },
  {
    ede: 'kâo adôk hđeh nao sang hră',
    en: 'i am a student',
    vi: 'tôi là học sinh',
    extraVi: ['tôi là sinh viên', 'tôi đang là sinh viên'],
  },
  {
    ede: 'klei êđê jing klei blŭ phung êđê',
    en: 'ede is the language of the ede people',
    vi: 'tiếng ê đê là tiếng nói của người ê đê',
  },
  {
    ede: 'siam mniê',
    en: 'beautiful girl',
    vi: 'cô gái đẹp',
  },
  {
    ede: 'bi êmut',
    en: 'hate',
    vi: 'ghét',
  },
  {
    ede: 'klei blŭ',
    en: 'language',
    vi: 'ngôn ngữ',
    extraEn: ['speech'],
    extraVi: ['tiếng nói'],
  },
  {
    ede: 'klei êđê',
    en: 'ede',
    vi: 'tiếng ê đê',
    extraEn: ['rade', 'rhade', 'e-de', 'ede language'],
    extraVi: ['tiếng êđê', 'tiếng rhade'],
  },
  {
    ede: 'klei mi',
    en: 'english',
    vi: 'tiếng anh',
  },
  {
    ede: 'klei prăng-xê',
    en: 'french',
    vi: 'tiếng pháp',
  },
  {
    ede: 'bruă knuă',
    en: 'job',
    vi: 'công việc',
    extraEn: ['work', 'occupation'],
  },
  {
    ede: 'buôn sang',
    en: 'hometown',
    vi: 'quê',
    extraVi: ['quê quán', 'quê hương'],
  },
  {
    ede: 'sang hră',
    en: 'school',
    vi: 'trường',
    extraEn: ['schoolhouse'],
    extraVi: ['nhà sách'],
  },
  {
    ede: 'amĭ ama',
    en: 'parents',
    vi: 'cha mẹ',
    extraVi: ['mẹ cha', 'bố mẹ'],
    extraEde: ['ami ama'],
  },
  {
    ede: 'aduôn aê',
    en: 'grandparents',
    vi: 'ông bà',
    extraVi: ['bà ông'],
  },
  {
    ede: 'amai adei',
    en: 'sisters',
    vi: 'chị em',
  },
  {
    ede: 'ayŏng adei',
    en: 'brothers',
    vi: 'anh em',
  },
  {
    ede: 'ung mo',
    en: 'husband and wife',
    vi: 'vợ chồng',
    extraVi: ['chồng vợ'],
  },
  {
    ede: 'khoa sang',
    en: 'elder of the longhouse',
    vi: 'người lớn tuổi trong nhà dài',
  },
  {
    ede: 'čar yuăn',
    en: 'vietnam',
    vi: 'việt nam',
  },
  {
    ede: 'čar mi',
    en: 'america',
    vi: 'mỹ',
    extraEn: ['usa', 'united states'],
    extraEde: ['čar amêrik'],
  },
  {
    ede: 'čar kŭr',
    en: 'cambodia',
    vi: 'campuchia',
  },
  {
    ede: "ƀuôn ama y'thuôt",
    en: 'buon ma thuot',
    vi: 'buôn ma thuột',
    extraEn: ['ban me thuot'],
    extraVi: ['thành phố buôn ma thuột', 'tp. buôn ma thuột'],
  },
  {
    ede: 'ti anôk',
    en: 'where',
    vi: 'ở đâu',
    extraVi: ['chỗ nào'],
  },
  {
    ede: 'leh ka',
    en: 'yet',
    vi: 'chưa',
    extraEn: ['not yet'],
  },
  {
    ede: 'leh hĕ',
    en: 'already right',
    vi: 'rồi hả',
    extraVi: ['hả'],
  },
  {
    ede: 'suaih pral',
    en: 'healthy',
    vi: 'khỏe',
    extraEn: ['well'],
  },
  {
    ede: 'aê diê',
    en: 'god',
    vi: 'chúa',
    extraVi: ['thần'],
  },

  // Đại từ
  { ede: 'kâo', en: 'i', vi: 'tôi', extraEn: ['me', 'my'], extraVi: ['mình', 'tớ'] },
  { ede: 'ih', en: 'you', vi: 'bạn', extraEn: ['your'], extraVi: ['anh', 'chị'] },
  { ede: 'di ih', en: 'you all', vi: 'các bạn', extraEn: ['you plural'] },
  { ede: 'ñu', en: 'he', vi: 'anh ấy', extraEn: ['she', 'him', 'her', 'it'], extraVi: ['cô ấy', 'nó'] },
  { ede: 'gơ̆', en: 'he informal', vi: 'nó' },
  { ede: 'diñu', en: 'they', vi: 'họ' },
  { ede: 'drei', en: 'we', vi: 'chúng tôi', extraVi: ['chúng ta'] },
  { ede: 'arăng', en: 'people', vi: 'người ta' },

  // Từ hỏi / tiểu từ
  { ede: 'hlei', en: 'who', vi: 'ai' },
  { ede: 'ya', en: 'what', vi: 'gì', extraVi: ['cái gì'] },
  { ede: 'si', en: 'what about', vi: 'gì (hỏi tên)' },
  { ede: 'dŭm', en: 'how many', vi: 'bao nhiêu', extraEn: ['how much'], extraVi: ['mấy'] },
  { ede: 'mơ̆', en: 'question', vi: 'không', extraEn: ['or not'] },
  { ede: 'leh', en: 'already', vi: 'rồi' },
  { ede: 'ti', en: 'at', vi: 'ở', extraEn: ['in', 'on'] },
  { ede: 'jing', en: 'is', vi: 'là', extraEn: ['am', 'are', 'be'] },

  // Động từ / giao tiếp
  { ede: 'ngă', en: 'do', vi: 'làm', extraEn: ['make', 'build'] },
  { ede: 'brei', en: 'give', vi: 'cho', extraVi: ['đưa'] },
  { ede: 'blŭ', en: 'speak', vi: 'nói' },
  { ede: 'hriăm', en: 'learn', vi: 'học', extraEn: ['study'] },
  { ede: 'čih', en: 'write', vi: 'viết' },
  { ede: 'nao', en: 'go', vi: 'đi' },
  { ede: 'mâo', en: 'have', vi: 'có' },
  { ede: 'khăp', en: 'love', vi: 'yêu', extraEn: ['like'], extraVi: ['thích'] },
  { ede: 'čiăng', en: 'want', vi: 'muốn' },
  { ede: 'huă', en: 'eat rice', vi: 'ăn cơm' },
  { ede: 'ƀơ̆ng', en: 'eat', vi: 'ăn', extraEn: ['eat fruit'] },
  { ede: 'boh', en: 'fruit', vi: 'quả', extraEn: ['classifier'], extraVi: ['trái', 'cái'] },
  { ede: 'djŏ', en: 'true', vi: 'đúng', extraEn: ['really'] },
  { ede: 'adôk', en: 'currently', vi: 'đang' },
  { ede: 'lač', en: 'say', vi: 'phán', extraVi: ['nói rằng'] },

  // Gia đình
  { ede: 'ama', en: 'father', vi: 'bố', extraEn: ['dad', 'daddy'], extraVi: ['cha'] },
  { ede: 'amĭ', en: 'mother', vi: 'mẹ', extraEde: ['ami'], extraEn: ['mom'] },
  { ede: 'aê', en: 'grandfather', vi: 'ông' },
  { ede: 'aduôn', en: 'grandmother', vi: 'bà', extraEde: ['yah'] },
  { ede: 'ayŏng', en: 'older brother', vi: 'anh' },
  { ede: 'amai', en: 'older sister', vi: 'chị' },
  { ede: 'adei', en: 'younger sibling', vi: 'em', extraEde: ['idai'] },
  { ede: 'ung', en: 'husband', vi: 'chồng' },
  { ede: 'mo', en: 'wife', vi: 'vợ' },
  { ede: 'anak', en: 'child', vi: 'con', extraEn: ['person'], extraVi: ['đứa trẻ'] },
  { ede: 'anăn', en: 'name', vi: 'tên' },
  { ede: 'djuê', en: 'family name', vi: 'họ', extraEn: ['surname'] },
  { ede: 'thŭn', en: 'year', vi: 'năm', extraEde: ['thun'], extraEn: ['age'], extraVi: ['tuổi'] },

  // Tính từ
  { ede: 'jăk', en: 'good', vi: 'tốt' },
  { ede: 'jhat', en: 'bad', vi: 'xấu', extraVi: ['dở'] },
  { ede: 'siam', en: 'pretty', vi: 'đẹp', extraEn: ['beautiful'] },
  { ede: 'êmŏng', en: 'fat', vi: 'béo' },
  { ede: 'êwang', en: 'skinny', vi: 'gầy' },
  { ede: 'jŭ', en: 'black', vi: 'đen' },
  { ede: 'mluk', en: 'crazy', vi: 'điên' },
  { ede: 'prông', en: 'big', vi: 'to', extraEn: ['large'], extraVi: ['lớn'] },
  { ede: 'loo', en: 'a lot', vi: 'nhiều', extraEn: ['many', 'much'] },
  { ede: 'aneei', en: 'this', vi: 'này', extraEde: ['anei'] },

  // Đời sống
  { ede: 'sang', en: 'house', vi: 'nhà', extraEn: ['home'] },
  { ede: 'êsei', en: 'rice', vi: 'cơm' },
  { ede: 'bur', en: 'porridge', vi: 'cháo' },
  { ede: 'êa', en: 'water', vi: 'nước' },
  { ede: 'hla', en: 'leaf', vi: 'lá' },
  { ede: 'kan', en: 'fish', vi: 'cá' },
  { ede: 'asâo', en: 'dog', vi: 'chó' },
  { ede: 'mtei', en: 'banana', vi: 'chuối' },
  { ede: 'kbâo', en: 'sugarcane', vi: 'mía' },
  { ede: 'čeh', en: 'jar', vi: 'ché' },
  { ede: 'gŏ', en: 'pot', vi: 'nồi' },
  { ede: 'čar', en: 'country', vi: 'nước (quốc gia)', extraEn: ['land'] },
  { ede: 'ƀuôn', en: 'village', vi: 'buôn', extraVi: ['làng'] },
  { ede: 'hră', en: 'book', vi: 'sách' },
  { ede: 'hđeh', en: 'young person', vi: 'học trò', extraVi: ['trẻ'] },
  { ede: 'phung', en: 'group', vi: 'người (cộng đồng)', extraEn: ['people of'] },
  { ede: 'bruă', en: 'work', vi: 'việc' },
  { ede: 'jih jang', en: 'all', vi: 'tất cả' },
  { ede: 'mniê', en: 'girl', vi: 'con gái', extraEn: ['woman'] },
  { ede: 'suai', en: 'mango', vi: 'xoài' },
  { ede: 'ao', en: 'shirt', vi: 'áo', extraVi: ['quần áo'] },
];

export const DIGIT_EDE: Record<number, string> = {
  0: 'jêrô',
  1: 'sa',
  2: 'dua',
  3: 'tlâo',
  4: 'pă',
  5: 'êma',
  6: 'năm',
  7: 'kjuh',
  8: 'sapăn',
  9: 'duapăn',
  10: 'pluh',
};

export const EDE_DIGIT: Record<string, number> = Object.fromEntries(
  Object.entries(DIGIT_EDE).map(([n, w]) => [w, Number(n)])
);

export const VI_DIGIT: Record<string, number> = {
  không: 0,
  mot: 1,
  một: 1,
  hai: 2,
  ba: 3,
  bốn: 4,
  bon: 4,
  năm: 5,
  nam: 5,
  sáu: 6,
  sau: 6,
  bảy: 7,
  bay: 7,
  tám: 8,
  tam: 8,
  chín: 9,
  chin: 9,
  mười: 10,
  muoi: 10,
};

export const EN_DIGIT: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

export const LANG_LABEL: Record<Lang, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ede: 'Klei Êđê',
};

export const LANG_CODE: Record<Lang, string> = {
  vi: 'VI',
  en: 'EN',
  ede: 'ÊĐÊ',
};
