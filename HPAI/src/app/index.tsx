import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}>
        
        <View style={styles.header}>
          <TouchableOpacity><Text style={styles.iconText}>{'<'}</Text></TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>HP AI ✎</Text>
            <Text style={styles.status}>● Connected</Text>
          </View>
          <TouchableOpacity><Text style={styles.iconText}>⬡</Text></TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
             <Text style={{color: '#888', fontWeight: '500'}}>Hình ảnh tai nghe HP AI</Text>
          </View>
        </View>

        <View style={styles.slidersContainer}>
          {['L', 'R'].map((side) => (
            <View key={side} style={styles.sliderRow}>
              <Text style={styles.sideText}>{side}</Text>
              <View style={styles.track}><View style={styles.thumb} /></View>
              <Text style={styles.percentText}>100%</Text>
            </View>
          ))}
        </View>

        {/* Nút bấm đã được cài đặt lệnh chuyển trang router.push */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.btn, styles.btnDiscovery]}>
            <Text style={styles.txtDiscovery}>Discovery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btn, styles.btnAi]}
            onPress={() => router.push('/ai-assistant')}
          >
            <Text style={styles.txtAi}>AI assistant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find headphones</Text>
          <TouchableOpacity style={styles.findCard} activeOpacity={0.8}>
            <View style={styles.locationIcon}><Text style={{fontSize: 20}}>📍</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EQ adjustment</Text>
          <View style={styles.eqGrid}>
            {['Nature', 'Rock', 'Popularity', 'Classic', 'Jazz', 'Rural'].map((item, index) => (
              <TouchableOpacity key={item} style={[styles.eqBtn, index === 0 ? styles.eqBtnActive : null]} activeOpacity={0.7}>
                <Text style={[styles.eqTxt, index === 0 ? styles.eqTxtActive : null]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  iconText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  headerCenter: { alignItems: 'center' },
  title: { color: '#A5D62D', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  status: { color: '#A5D62D', fontSize: 12, marginTop: 4 },
  imageContainer: { height: 200, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  placeholderImage: { width: '80%', height: 160, backgroundColor: '#1E1E1E', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  slidersContainer: { marginBottom: 30 },
  sliderRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  sideText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', width: 25 },
  track: { flex: 1, height: 6, backgroundColor: '#333', borderRadius: 3, marginHorizontal: 15, justifyContent: 'center' },
  thumb: { width: '100%', height: 6, backgroundColor: '#FFF', borderRadius: 3 },
  percentText: { color: '#FFF', fontSize: 14, width: 45, textAlign: 'right', fontWeight: '600' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35 },
  btn: { flex: 0.48, paddingVertical: 16, borderRadius: 25, alignItems: 'center', elevation: 2 },
  btnDiscovery: { backgroundColor: '#FFF' },
  txtDiscovery: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  btnAi: { backgroundColor: '#A5D62D' },
  txtAi: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  section: { marginBottom: 30 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  findCard: { backgroundColor: '#1A1A1A', height: 140, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  locationIcon: { width: 50, height: 50, backgroundColor: '#A5D62D', borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  eqGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  eqBtn: { width: '31%', backgroundColor: '#1A1A1A', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  eqBtnActive: { backgroundColor: '#EAEAEA' },
  eqTxt: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  eqTxtActive: { color: '#000' }
});