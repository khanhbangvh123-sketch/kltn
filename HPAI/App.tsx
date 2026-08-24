import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* 1. Header */}
        <View style={styles.header}>
          <Text style={styles.iconText}>{'<'}</Text>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>D95 ✎</Text>
            <Text style={styles.status}>● Connected</Text>
          </View>
          <Text style={styles.iconText}>⬡</Text>
        </View>

        {/* 2. Product Image Placeholder */}
        <View style={styles.imageContainer}>
          {/* Thay thế link dưới bằng ảnh tai nghe thực tế đã tách nền của bạn */}
          <View style={styles.placeholderImage}>
             <Text style={{color: '#888'}}>Product Image Area</Text>
          </View>
        </View>

        {/* 3. Sliders L / R */}
        <View style={styles.slidersContainer}>
          {['L', 'R'].map((side) => (
            <View key={side} style={styles.sliderRow}>
              <Text style={styles.sideText}>{side}</Text>
              <View style={styles.track}>
                <View style={styles.thumb} />
              </View>
              <Text style={styles.percentText}>100%</Text>
            </View>
          ))}
        </View>

        {/* 4. Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.btn, styles.btnDiscovery]}>
            <Text style={styles.txtDiscovery}>Discovery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnAi]}>
            <Text style={styles.txtAi}>AI assistant</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Find Headphones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find headphones</Text>
          <View style={styles.findCard}>
            <View style={styles.locationIcon}>
              <Text style={{fontSize: 24}}>📍</Text>
            </View>
          </View>
        </View>

        {/* 6. EQ Adjustment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EQ adjustment</Text>
          <View style={styles.eqGrid}>
            {['Nature', 'Rock', 'Popularity', 'Classic', 'Jazz', 'Rural'].map((item, index) => (
              <TouchableOpacity 
                key={item} 
                style={[styles.eqBtn, index === 0 ? styles.eqBtnActive : null]}
              >
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  iconText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  headerCenter: { alignItems: 'center' },
  title: { color: '#A5D62D', fontSize: 18, fontWeight: 'bold' },
  status: { color: '#A5D62D', fontSize: 12, marginTop: 2 },
  imageContainer: { height: 200, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  placeholderImage: { width: 250, height: 150, backgroundColor: '#222', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  slidersContainer: { marginBottom: 30 },
  sliderRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  sideText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', width: 20 },
  track: { flex: 1, height: 8, backgroundColor: '#333', borderRadius: 4, marginHorizontal: 15, justifyContent: 'center' },
  thumb: { width: '100%', height: 8, backgroundColor: '#FFF', borderRadius: 4 },
  percentText: { color: '#FFF', fontSize: 14, width: 40, textAlign: 'right' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  btn: { flex: 0.48, paddingVertical: 15, borderRadius: 25, alignItems: 'center' },
  btnDiscovery: { backgroundColor: '#FFF' },
  txtDiscovery: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  btnAi: { backgroundColor: '#A5D62D' },
  txtAi: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  section: { marginBottom: 30 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  findCard: { backgroundColor: '#1A1A1A', height: 120, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  locationIcon: { width: 40, height: 40, backgroundColor: '#A5D62D', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  eqGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  eqBtn: { width: '31%', backgroundColor: '#1A1A1A', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  eqBtnActive: { backgroundColor: '#F2F2F2' },
  eqTxt: { color: '#FFF', fontWeight: '600' },
  eqTxtActive: { color: '#000' }
});