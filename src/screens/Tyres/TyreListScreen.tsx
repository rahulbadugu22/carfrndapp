import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function TyreListScreen({ onNavigate }: { onNavigate: any }) {
  const [activeFilter, setActiveFilter] = useState('All Brands');

  const filters = ['All Brands', 'Michelin', 'Bridgestone', 'Apollo', 'MRF'];

  const tyres = [
    {
      id: 1,
      brand: 'Michelin',
      model: 'Primacy 4',
      specs: '205/55 R16 91V',
      price: 6450,
      image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80',
      features: ['Wet Grip: A', 'Fuel: B', 'Noise: 68dB'],
    },
    {
      id: 2,
      brand: 'Bridgestone',
      model: 'Turanza T005',
      specs: '205/55 R16 91V',
      price: 5800,
      image: 'https://images.unsplash.com/photo-1620023602492-972173165b4c?auto=format&fit=crop&w=400&q=80',
      features: ['Wet Grip: A', 'Fuel: B', 'Noise: 71dB'],
    },
    {
      id: 3,
      brand: 'Apollo',
      model: 'Alnac 4G',
      specs: '205/55 R16 91V',
      price: 4950,
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=400&q=80',
      features: ['Wet Grip: B', 'Fuel: C', 'Noise: 70dB'],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('TyreSearch')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>205 / 55 R 16</Text>
          <Text style={styles.headerSubtitle}>3 Tyres Available Nearby</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="filter" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {tyres.map((item) => (
          <View key={item.id} style={styles.tyreCard}>
            <View style={styles.tyreTopRow}>
              <Image source={{ uri: item.image }} style={styles.tyreImage} />
              <View style={styles.tyreInfo}>
                <Text style={styles.tyreBrand}>{item.brand}</Text>
                <Text style={styles.tyreModel}>{item.model}</Text>
                <Text style={styles.tyreSpecs}>{item.specs}</Text>
                <Text style={styles.tyrePrice}>₹{item.price}</Text>
              </View>
            </View>

            <View style={styles.featuresRow}>
              {item.features.map((feat, idx) => (
                <View key={idx} style={styles.featBadge}>
                  <Text style={styles.featText}>{feat}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.selectInstallerBtn}
              activeOpacity={0.85}
              onPress={() => onNavigate('SelectInstaller')}
            >
              <Text style={styles.selectInstallerText}>Select Fitment Hub</Text>
              <Icon name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 12,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.magenta,
    borderColor: Colors.magenta,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  tyreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 16,
  },
  tyreTopRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tyreImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },
  tyreInfo: {
    flex: 1,
  },
  tyreBrand: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.magenta,
    letterSpacing: 0.5,
  },
  tyreModel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  tyreSpecs: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  tyrePrice: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.magenta,
    marginTop: 4,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  featBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  selectInstallerBtn: {
    backgroundColor: Colors.magenta,
    height: 46,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectInstallerText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
