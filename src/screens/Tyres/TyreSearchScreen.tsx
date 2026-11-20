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

export default function TyreSearchScreen({ onNavigate }: { onNavigate: any }) {
  const [activeTab, setActiveTab] = useState('Tyres');
  const [widthVal, setWidthVal] = useState('205');
  const [profileVal, setProfileVal] = useState('55');
  const [rimVal, setRimVal] = useState('R16');

  const mainTabs = [
    { id: 'Tyres', icon: 'aperture' },
    { id: 'Insurance', icon: 'shield' },
    { id: 'Battery', icon: 'battery' },
    { id: 'Service', icon: 'tool' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Tyres & Wheels</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Tabs */}
        <View style={styles.tabsContainer}>
          {mainTabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.mainTab, activeTab === tab.id && styles.mainTabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon
                name={tab.icon}
                size={18}
                color={activeTab === tab.id ? Colors.magenta : '#94A3B8'}
                style={styles.tabIcon}
              />
              <Text
                style={[
                  styles.mainTabText,
                  activeTab === tab.id && styles.mainTabTextActive,
                ]}
              >
                {tab.id}
              </Text>
              {activeTab === tab.id && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'Tyres' ? (
          <View style={styles.searchCard}>
            {/* Graphic Guide */}
            <View style={styles.graphicContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80' }}
                style={styles.graphicImage}
              />
              <View style={styles.graphicOverlay}>
                <Text style={styles.graphicTextLarge}>205 / 55 R 16 91 V</Text>
                <Text style={styles.graphicTextSmall}>Check tyre size on vehicle sidewall</Text>
              </View>
            </View>

            {/* Size Selectors */}
            <Text style={styles.selectorLabel}>SELECT TYRE SPECIFICATIONS</Text>
            <View style={styles.selectorsRow}>
              <View style={styles.selectorCol}>
                <Text style={styles.selectorHeader}>Width</Text>
                <View style={styles.selectorBox}>
                  <Text style={styles.selectorValue}>{widthVal}</Text>
                  <Icon name="chevron-down" size={14} color="#0F172A" />
                </View>
              </View>
              <View style={styles.selectorCol}>
                <Text style={styles.selectorHeader}>Profile</Text>
                <View style={styles.selectorBox}>
                  <Text style={styles.selectorValue}>{profileVal}</Text>
                  <Icon name="chevron-down" size={14} color="#0F172A" />
                </View>
              </View>
              <View style={styles.selectorCol}>
                <Text style={styles.selectorHeader}>Rim Size</Text>
                <View style={styles.selectorBox}>
                  <Text style={styles.selectorValue}>{rimVal}</Text>
                  <Icon name="chevron-down" size={14} color="#0F172A" />
                </View>
              </View>
            </View>

            {/* Search Tyres Button */}
            <TouchableOpacity
              style={styles.searchBtn}
              activeOpacity={0.85}
              onPress={() => onNavigate('TyreList')}
            >
              <Text style={styles.searchBtnText}>Search Matching Tyres</Text>
              <Icon name="search" size={16} color="#ffffff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.comingSoonBox}>
            <Icon name="clock" size={32} color={Colors.magenta} />
            <Text style={styles.comingSoonTitle}>{activeTab} Services</Text>
            <Text style={styles.comingSoonSub}>Doorstep {activeTab.toLowerCase()} services coming soon.</Text>
          </View>
        )}
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 6,
    marginBottom: 20,
  },
  mainTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  mainTabActive: {
    backgroundColor: Colors.magentaLight,
    borderRadius: 10,
  },
  tabIcon: {
    marginBottom: 4,
  },
  mainTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  mainTabTextActive: {
    color: Colors.magenta,
    fontWeight: '700',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 20,
    height: 3,
    backgroundColor: Colors.magenta,
    borderRadius: 2,
  },
  searchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  graphicContainer: {
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  graphicImage: {
    width: '100%',
    height: '100%',
  },
  graphicOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicTextLarge: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  graphicTextSmall: {
    fontSize: 11,
    color: '#E2E8F0',
    marginTop: 4,
  },
  selectorLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  selectorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectorCol: {
    flex: 1,
    marginHorizontal: 4,
  },
  selectorHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  selectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  selectorValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  searchBtn: {
    backgroundColor: Colors.magenta,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  searchBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  comingSoonBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 4,
  },
  comingSoonSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});
