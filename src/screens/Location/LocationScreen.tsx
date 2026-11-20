import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

const POPULAR_LOCATIONS = [
  { id: '1', title: 'Indiranagar', desc: '100ft Road, Bengaluru, Karnataka 560038' },
  { id: '2', title: 'Koramangala 4th Block', desc: '80 Feet Rd, Bengaluru, Karnataka 560034' },
  { id: '3', title: 'HSR Layout Sector 1', desc: 'Outer Ring Rd, Bengaluru, Karnataka 560102' },
  { id: '4', title: 'Whitefield', desc: 'ITPL Main Rd, Bengaluru, Karnataka 560066' },
  { id: '5', title: 'Sector 44, Gurugram', desc: 'Near HUDA City Centre, Haryana 122003' },
  { id: '6', title: 'South Extension II', desc: 'Ring Road, New Delhi 110049' },
];

export default function LocationScreen({ onNavigate }: { onNavigate: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoc, setSelectedLoc] = useState(POPULAR_LOCATIONS[0]);

  const filtered = POPULAR_LOCATIONS.filter(
    (loc) =>
      loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate('Home')}
        >
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>Where are you parked?</Text>
        <Text style={styles.subtitle}>
          Select your service area for doorstep car wash & smart tag delivery.
        </Text>

        {/* Search Input Bar */}
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locality, apartment or street..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {Boolean(searchQuery) && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="x" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Detect Current Location GPS Button */}
        <TouchableOpacity
          style={styles.detectLocationBtn}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedLoc(POPULAR_LOCATIONS[0]);
          }}
        >
          <View style={styles.gpsIconCircle}>
            <Icon name="crosshair" size={18} color={Colors.magenta} />
          </View>
          <View style={styles.gpsTextCol}>
            <Text style={styles.gpsTitle}>Use Current GPS Location</Text>
            <Text style={styles.gpsSub}>Enable location for high-accuracy doorstep dispatch</Text>
          </View>
        </TouchableOpacity>

        {/* Current Selected Location Card */}
        <Text style={styles.sectionHeading}>CONFIRMED PIN LOCATION</Text>
        <View style={styles.selectedCard}>
          <View style={styles.selectedIconCircle}>
            <Icon name="map-pin" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.selectedTextCol}>
            <View style={styles.selectedTitleRow}>
              <Text style={styles.selectedTitle}>{selectedLoc.title}</Text>
              <View style={styles.activeTagBadge}>
                <Text style={styles.activeTagText}>SELECTED</Text>
              </View>
            </View>
            <Text style={styles.selectedDesc}>{selectedLoc.desc}</Text>
          </View>
        </View>

        {/* Popular Locations List */}
        <Text style={styles.sectionHeading}>POPULAR HUBS & SERVICE HUBS</Text>
        <View style={styles.locationsList}>
          {filtered.map((item) => {
            const isChosen = selectedLoc.id === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.locationItem, isChosen && styles.locationItemActive]}
                activeOpacity={0.7}
                onPress={() => setSelectedLoc(item)}
              >
                <View
                  style={[
                    styles.locItemIconBox,
                    isChosen && { backgroundColor: Colors.magentaLight },
                  ]}
                >
                  <Icon
                    name="map-pin"
                    size={16}
                    color={isChosen ? Colors.magenta : '#64748B'}
                  />
                </View>
                <View style={styles.locItemTextCol}>
                  <Text
                    style={[
                      styles.locItemTitle,
                      isChosen && { color: Colors.magenta, fontWeight: '700' },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.locItemDesc}>{item.desc}</Text>
                </View>
                {isChosen && (
                  <Icon name="check-circle" size={18} color={Colors.magenta} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={() => onNavigate('Home')}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Location • {selectedLoc.title}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  detectLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  gpsIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gpsTextCol: {
    flex: 1,
  },
  gpsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.magenta,
    marginBottom: 2,
  },
  gpsSub: {
    fontSize: 11,
    color: '#64748B',
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  selectedIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.magenta,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  selectedTextCol: {
    flex: 1,
  },
  selectedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  activeTagBadge: {
    backgroundColor: 'rgba(255, 43, 133, 0.25)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activeTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.magenta,
    letterSpacing: 0.5,
  },
  selectedDesc: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
  locationsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 28,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  locationItemActive: {
    backgroundColor: Colors.magentaLight,
  },
  locItemIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locItemTextCol: {
    flex: 1,
  },
  locItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  locItemDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  confirmButton: {
    backgroundColor: Colors.magenta,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
