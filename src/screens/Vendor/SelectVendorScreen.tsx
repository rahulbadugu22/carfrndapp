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

export default function SelectVendorScreen({ onNavigate }: { onNavigate: any }) {
  const [activeFilter, setActiveFilter] = useState('Top Rated');

  const filters = ['Top Rated', 'Nearest to you', 'Fastest Service'];

  const vendors = [
    {
      id: 1,
      name: 'Aqua Shine Elite Hub',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
      topChoice: true,
      rating: '4.9',
      reviews: '1.2k+ Reviews',
      distance: '2.4 km away',
      location: 'Indiranagar 100ft Rd',
      tags: [
        { icon: 'star', text: 'CarFrnd Partner' },
        { icon: 'check-circle', text: 'Verified' },
        { icon: 'zap', text: 'Express Bay' },
      ],
      avgWashTime: '40 - 50 mins',
      currentWait: '~10 mins',
    },
    {
      id: 2,
      name: 'Luxe Auto Detailing',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      topChoice: false,
      rating: '4.7',
      reviews: '854 Reviews',
      distance: '3.1 km away',
      location: 'Koramangala 4th Block',
      tags: [
        { icon: 'droplet', text: 'Ceramic Certified' },
        { icon: 'target', text: 'Eco-Foam' },
      ],
      avgWashTime: '50 - 60 mins',
      currentWait: '~25 mins',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Select Wash Hub</Text>
          <Text style={styles.headerSubtitle}>Verified CarFrnd Wash Stations</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="sliders" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {vendors.map((vendor) => (
          <TouchableOpacity
            key={vendor.id}
            style={styles.vendorCard}
            activeOpacity={0.9}
            onPress={() => onNavigate('ServiceDetails')}
          >
            {/* Image Section */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
              {vendor.topChoice && (
                <View style={styles.badgeTopChoice}>
                  <Icon name="award" size={14} color="#F59E0B" style={styles.badgeIcon} />
                  <Text style={styles.badgeText}>Top Choice</Text>
                </View>
              )}
            </View>

            {/* Content Section */}
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
                <Text style={styles.locationText}>
                  {vendor.distance} • {vendor.location}
                </Text>
                <Text style={styles.reviewsText}>{vendor.reviews}</Text>
              </View>

              {/* Tags */}
              <View style={styles.tagsRow}>
                {vendor.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tagBadge}>
                    <Icon
                      name={tag.icon}
                      size={12}
                      color={Colors.magenta}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.tagText}>{tag.text}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.dashedDivider} />

              {/* Bottom Info */}
              <View style={styles.bottomInfoRow}>
                <View style={styles.infoItem}>
                  <View style={styles.infoIconWrapper}>
                    <Icon name="clock" size={14} color={Colors.magenta} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Avg. Wash Time</Text>
                    <Text style={styles.infoValue}>{vendor.avgWashTime}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <View style={styles.infoIconWrapperYellow}>
                    <Icon name="loader" size={14} color="#F59E0B" />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>Current Wait</Text>
                    <Text style={styles.infoValue}>{vendor.currentWait}</Text>
                  </View>
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
    paddingBottom: 16,
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
    marginTop: 2,
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 12,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
    backgroundColor: '#FAFAFA',
  },
  vendorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  vendorImage: {
    width: '100%',
    height: '100%',
  },
  badgeTopChoice: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeIcon: {
    marginRight: 4,
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
    marginBottom: 6,
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
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 4,
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
    flex: 1,
  },
  reviewsText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.magenta,
  },
  dashedDivider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginBottom: 14,
  },
  bottomInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoIconWrapperYellow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF9C3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 1,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
});
