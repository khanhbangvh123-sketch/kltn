import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { detectLanguage, EXAMPLES, translateText } from '@/lib/pivot-translator';
import {
  INPUT_LANGUAGES,
  OUTPUT_LANGUAGES,
  getLang,
  needsNetworkPair,
  type AppLang,
  type AppLangId,
} from '@/data/language-library';
import type { TranslateResult } from '@/lib/pivot-translator';

export default function TranslateScreen() {
  const router = useRouter();
  const [source, setSource] = useState<AppLangId>('auto');
  const [target, setTarget] = useState<AppLangId>('ede');
  const [openSide, setOpenSide] = useState<'in' | 'out' | null>(null);
  const [text, setText] = useState('Xin chào');
  const [useNetwork, setUseNetwork] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resolvedSource = source === 'auto' ? detectLanguage(text) : source;
  const sourceMeta = getLang(source === 'auto' ? 'auto' : resolvedSource);
  const targetMeta = getLang(target);
  const willUseNetwork = needsNetworkPair(resolvedSource, target);

  const pathLabel = useMemo(() => {
    const from = source === 'auto' ? `Phát hiện ngôn ngữ · ${getLang(resolvedSource).short}` : sourceMeta.short;
    return `${from} → ${targetMeta.short}`;
  }, [resolvedSource, source, sourceMeta.short, targetMeta.short]);

  const selectSource = (id: AppLangId) => {
    setSource(id);
    if (id !== 'auto' && id === target) {
      setTarget(id === 'ede' ? 'vi' : 'ede');
    }
    setResult(null);
    setOpenSide(null);
  };

  const selectTarget = (id: AppLangId) => {
    setTarget(id);
    if (source !== 'auto' && id === source) {
      setSource(id === 'ede' ? 'vi' : 'ede');
    }
    setResult(null);
    setOpenSide(null);
  };

  const swap = () => {
    const nextSource: AppLangId = target;
    const nextTarget: AppLangId = source === 'auto' ? resolvedSource : source;
    setSource(nextSource);
    setTarget(nextTarget === nextSource ? (nextSource === 'ede' ? 'vi' : 'ede') : nextTarget);
    if (result?.output) setText(result.output);
    setResult(null);
    setOpenSide(null);
  };

  const run = async (override?: string) => {
    const input = (override ?? text).trim();
    if (!input) return;
    setLoading(true);
    setError(null);
    try {
      const next = await translateText({
        text: input,
        source,
        target,
        useNetwork,
      });
      setResult(next);
      if (!next.output && next.needsNetwork && !useNetwork) {
        setError('Cặp ngôn ngữ này cần kết nối mạng.');
      } else if (!next.output) {
        setError('Chưa dịch được. Bật mạng rồi thử lại.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không dịch được');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Text style={styles.iconText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Dịch</Text>
          <Text style={styles.path}>{pathLabel}</Text>
        </View>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.pairRow}>
          <LangColumn
            title="Đầu vào"
            languages={INPUT_LANGUAGES}
            selected={source}
            displayLabel={source === 'auto' ? `Phát hiện ngôn ngữ · ${getLang(resolvedSource).short}` : sourceMeta.label}
            open={openSide === 'in'}
            onToggle={() => setOpenSide((side) => (side === 'in' ? null : 'in'))}
            onSelect={selectSource}
          />
          <TouchableOpacity onPress={swap} style={styles.swapBtn} accessibilityLabel="Đổi chiều dịch">
            <Text style={styles.swapTxt}>⇅</Text>
          </TouchableOpacity>
          <LangColumn
            title="Đầu ra"
            languages={OUTPUT_LANGUAGES}
            selected={target}
            displayLabel={targetMeta.label}
            open={openSide === 'out'}
            onToggle={() => setOpenSide((side) => (side === 'out' ? null : 'out'))}
            onSelect={selectTarget}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder={`Nhập ${sourceMeta.label}…`}
          placeholderTextColor="#666"
          value={text}
          onChangeText={(value) => {
            setText(value);
            setResult(null);
          }}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.onlineRow}
          onPress={() => setUseNetwork((v) => !v)}
          activeOpacity={0.8}
        >
          <View style={[styles.check, useNetwork && styles.checkOn]} />
          <Text style={styles.onlineTxt}>
            Kết nối mạng khi cần
            {willUseNetwork ? ' · cặp này cần mạng' : ' · từ điển nội bộ'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.translateBtn} onPress={() => run()} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.translateTxt}>Dịch</Text>
          )}
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {result?.output ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>{getLang(result.target).label}</Text>
            <Text style={styles.resultText}>{result.output}</Text>
            {result.usedOnlinePivot ? (
              <Text style={styles.meta}>Đã dùng mạng</Text>
            ) : (
              <Text style={styles.meta}>Từ điển nội bộ</Text>
            )}
            {result.unmatched.length ? (
              <Text style={styles.warn}>
                Chưa có trong từ điển: {result.unmatched.join(', ')}
              </Text>
            ) : null}
          </View>
        ) : null}

        {result?.aiSuggestions?.length ? (
          <View style={styles.aiBox}>
            <Text style={styles.aiWarnTitle}>⚠ Gợi ý từ AI — chưa kiểm chứng</Text>
            <Text style={styles.aiWarnSub}>
              Đây là suy đoán của Gemini, KHÔNG lấy từ nguồn Ê Đê đáng tin cậy. Chỉ dùng tham
              khảo, nên nhờ người Ê Đê bản ngữ xác nhận trước khi dùng thật.
            </Text>
            {result.aiSuggestions.map((s) => (
              <Text key={s.word} style={styles.aiItem}>
                {s.word} → {s.guess}
              </Text>
            ))}
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Thử nhanh</Text>
        <View style={styles.chips}>
          {EXAMPLES.map((example) => (
            <TouchableOpacity
              key={example}
              style={styles.chip}
              onPress={() => {
                setSource('auto');
                setTarget('ede');
                setText(example);
                void run(example);
              }}
            >
              <Text style={styles.chipTxt}>{example}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LangColumn({
  title,
  languages,
  selected,
  displayLabel,
  open,
  onToggle,
  onSelect,
}: {
  title: string;
  languages: AppLang[];
  selected: AppLangId;
  displayLabel: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (id: AppLangId) => void;
}) {
  return (
    <View style={styles.langCol}>
      <Text style={styles.langHeading}>{title}</Text>
      <TouchableOpacity style={[styles.langTrigger, open && styles.langTriggerOn]} onPress={onToggle}>
        <Text style={[styles.langTriggerTxt, open && styles.langTriggerTxtOn]} numberOfLines={2}>
          {displayLabel}
        </Text>
        <Text style={[styles.caret, open && styles.caretOn]}>{open ? '▴' : '▾'}</Text>
      </TouchableOpacity>
      {open ? (
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          style={styles.langHiddenList}
          showsVerticalScrollIndicator
        >
          {languages.map((lang) => {
            const on = lang.id === selected;
            return (
              <TouchableOpacity
                key={lang.id}
                style={[styles.langItem, on && styles.langItemOn]}
                onPress={() => onSelect(lang.id)}
              >
                <Text style={[styles.langItemTxt, on && styles.langItemTxtOn]}>{lang.label}</Text>
                {lang.needsNetwork ? <Text style={styles.netDot}>net</Text> : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  iconBtn: { padding: 5, width: 36 },
  iconText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  headerCenter: { alignItems: 'center' },
  title: { color: '#A5D62D', fontSize: 18, fontWeight: 'bold' },
  path: { color: '#888', fontSize: 12, marginTop: 4 },
  pairRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  langCol: { flex: 1, minWidth: 0 },
  langHeading: { color: '#888', fontSize: 12, marginBottom: 8, textAlign: 'center' },
  langTrigger: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 12,
    minHeight: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langTriggerOn: { backgroundColor: '#2A3318', borderWidth: 1, borderColor: '#A5D62D' },
  langTriggerTxt: { color: '#FFF', fontWeight: '700', fontSize: 14, textAlign: 'center' },
  langTriggerTxtOn: { color: '#A5D62D' },
  caret: { color: '#666', marginTop: 4, fontSize: 12 },
  caretOn: { color: '#A5D62D' },
  langHiddenList: {
    maxHeight: 200,
    marginTop: 8,
    backgroundColor: '#161616',
    borderRadius: 12,
  },
  langItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A2A',
  },
  langItemOn: { backgroundColor: '#A5D62D' },
  langItemTxt: { color: '#EEE', fontSize: 13, fontWeight: '600' },
  langItemTxtOn: { color: '#000' },
  netDot: { color: '#888', fontSize: 9, marginTop: 2 },
  swapBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 32,
  },
  swapTxt: { color: '#A5D62D', fontWeight: '700', fontSize: 18 },
  input: {
    minHeight: 110,
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    color: '#FFF',
    padding: 14,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  onlineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  check: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 8,
  },
  checkOn: { backgroundColor: '#A5D62D', borderColor: '#A5D62D' },
  onlineTxt: { color: '#AAA', fontSize: 13, flex: 1 },
  translateBtn: {
    backgroundColor: '#A5D62D',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  translateTxt: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  error: { color: '#FF6B6B', marginBottom: 12 },
  resultCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  resultLabel: { color: '#888', fontSize: 12, marginBottom: 6 },
  resultText: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  meta: { color: '#666', fontSize: 12, marginTop: 10 },
  warn: { color: '#E6B800', fontSize: 12, marginTop: 8 },
  aiBox: {
    backgroundColor: '#241C0F',
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#5A4620',
  },
  aiWarnTitle: { color: '#E6B800', fontSize: 13, fontWeight: '700', marginBottom: 4 },
  aiWarnSub: { color: '#B8A467', fontSize: 11, lineHeight: 16, marginBottom: 8 },
  aiItem: { color: '#EEE', fontSize: 14, marginTop: 2 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipTxt: { color: '#EEE', fontSize: 12 },
});
