import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function SelectInstallerScreen({ onNavigate }: { onNavigate: any }) {
  const [activeFilter, setActiveFilter] = useState('Top Rated');

  const filters = ['Top Rated', 'Nearest', 'Fastest Bay'];

  const vendors = [
    {
      id: 1,
      name: 'PitStop Tyre Care Center',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
      topChoice: true,
      rating: '4.9',
      reviews: '1.2k+ Reviews',
      distance: '2.4 km away',
      location: 'Indiranagar 100ft Rd',
      tags: [
        { icon: 'star', text: 'CarFrnd Hub' },
        { icon: 'check-circle', text: 'Certified Fitters' },
        { icon: 'zap', text: 'Express Bay' },
      ],
      avgWaitTime: '15 - 20 mins',
      currentQueue: '1 car ahead',
    },
    {
      id: 2,
      name: 'Luxe Tyres & Wheel Alignment',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      topChoice: false,
      rating: '4.7',
      reviews: '854 Reviews',
      distance: '3.1 km away',
      location: 'Koramangala 4th Block',
      tags: [
        { icon: 'tool', text: '3D Laser Alignment' },
        { icon: 'target', text: 'Free Nitrogen' },
      ],
      avgWaitTime: '25 - 30 mins',
      currentQueue: '3 cars ahead',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('TyreList')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Select Installer</Text>
          <Text style={styles.headerSubtitle}>Certified Tyre Fitment Hubs</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="sliders" size={18} color="#0F172A" />
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
        {vendors.map((vendor) => (
          <TouchableOpacity
            key={vendor.id}
            style={styles.vendorCard}
            activeOpacity={0.9}
            onPress={() => onNavigate('TyreCart')}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
              {vendor.topChoice && (
                <View style={styles.badgeTopChoice}>
                  <Icon name="award" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                  <Text style={styles.badgeText}>Top Choice</Text>
                </View>
              )}
            </View>

            <View style={styles.vendorContent}>
              <View style={styles.vendorHeaderRow}>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>{vendor.rating}</Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <Icon name="map-pin" size={12} color={Colors.magenta} />
                <Text style={styles.locationText}>{vendor.distance} • {vendor.location}</Text>
              </View>

              <View style={styles.tagsRow}>
                {vendor.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tagBadge}>
                    <Icon name={tag.icon} size={12} color={Colors.magenta} style={{ marginRight: 4 }} />
                    <Text style={styles.tagText}>{tag.text}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              <View style={styles.bottomRow}>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Wait Time</Text>
                  <Text style={styles.infoVal}>{vendor.avgWaitTime}</Text>
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Queue</Text>
                  <Text style={styles.infoVal}>{vendor.currentQueue}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
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
    fontSize: 17,
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
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#ffffff',
    marginRight: 10,
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
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: '#FAFAFA',
  },
  vendorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    position: 'relative',
  },
  vendorImage: {
    width: '100%',
    height: '100%',
  },
  badgeTopChoice: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  vendorContent: {
    padding: 16,
  },
  vendorHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.magenta,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {},
  infoLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 1,
  },
  infoVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
});
