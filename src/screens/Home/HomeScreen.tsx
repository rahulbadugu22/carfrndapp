import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen({ onNavigate }: { onNavigate: any }) {
  const { user } = useAuth();

  const services = [
    {
      id: 1,
      title: 'Car Wash Hub',
      subtitle: 'Nearby partner wash stations with express priority bays.',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'Door-step Car Wash',
      subtitle: 'Professional pressure foam wash delivered right to your home.',
      image: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'Car Detailing Studio',
      subtitle: 'Deep interior sanitation, paint claying and ceramic finish.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      title: 'Buy Tyres & Wheels',
      subtitle: 'Branded tyres at manufacturer prices with doorstep fitment.',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      title: 'Tyre Services & Balancing',
      subtitle: 'Precision laser alignment, puncture fixes, and nitrogen refill.',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIconWrapper}>
              <Icon name="map-pin" size={16} color={Colors.magenta} />
            </View>
            <View>
              <Text style={styles.locationLabel}>YOUR LOCATION</Text>
              <TouchableOpacity
                style={styles.locationSelector}
                onPress={() => onNavigate('Location')}
              >
                <Text style={styles.locationText}>{user?.city || 'Indiranagar, Bengaluru'}</Text>
                <Icon name="chevron-down" size={16} color="#0F172A" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => onNavigate('Profile')} activeOpacity={0.8}>
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.avatar}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Brand Banner */}
        <View style={styles.brandRow}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />
        </View>

        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>
            Hello, {user?.name ? user.name.split(' ')[0] : 'Rahul'} 👋
          </Text>
          <Text style={styles.greetingSubtitle}>What does your car need today?</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doorstep wash, tyres, ceramic detail..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Connect Promo Highlight Banner */}
        <TouchableOpacity
          style={styles.connectPromoBanner}
          activeOpacity={0.9}
          onPress={() => onNavigate('ConnectHome')}
        >
          <View style={styles.connectPromoLeft}>
            <View style={styles.connectPill}>
              <Icon name="radio" size={11} color="#FFFFFF" />
              <Text style={styles.connectPillText}>SMART VEHICLE TAG</Text>
            </View>
            <Text style={styles.connectPromoTitle}>Protect Your Privacy</Text>
            <Text style={styles.connectPromoSubtitle}>
              Masked calls & instant parking pings. Never leave your phone number visible on the windshield.
            </Text>
            <View style={styles.connectCtaBtn}>
              <Text style={styles.connectCtaText}>Manage My CarFrnd Tags</Text>
              <Icon name="chevron-right" size={14} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.connectPromoIconBox}>
            <Icon name="shield-check" size={38} color={Colors.magenta} />
          </View>
        </TouchableOpacity>

        {/* Services Grid */}
        <Text style={styles.servicesHeading}>CAR CARE & SERVICES</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              activeOpacity={0.9}
              onPress={() => {
                if (service.id === 2) {
                  onNavigate('ServiceDetails');
                } else if (service.id <= 3) {
                  onNavigate('SelectVendor');
                } else if (service.id === 4 || service.id === 5) {
                  onNavigate('TyreSearch');
                } else {
                  Alert.alert('Coming Soon!', 'This service will be available shortly.');
                }
              }}
            >
              <View style={styles.serviceImageContainer}>
                <Image source={{ uri: service.image }} style={styles.serviceImage} />
                <View style={styles.serviceOverlayBadge}>
                  <Text style={styles.serviceOverlayText}>CarFrnd Certified</Text>
                </View>
              </View>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar with Highlighted Connect Button */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={22} color={Colors.magenta} />
          <Text style={[styles.tabText, styles.tabTextActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Bookings')}>
          <Icon name="calendar" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>Bookings</Text>
        </TouchableOpacity>

        {/* Highlighted CarFrnd Connect Button */}
        <TouchableOpacity
          style={styles.connectTabItem}
          onPress={() => onNavigate('ConnectHome')}
          activeOpacity={0.85}
        >
          <View style={styles.connectTabInner}>
            <Icon name="radio" size={18} color="#ffffff" />
            <Text style={styles.connectTabText}>Connect</Text>
          </View>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Profile')}>
          <Icon name="user" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandRow: {
    marginBottom: 16,
  },
  brandLogo: {
    width: 140,
    height: 40,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.magenta,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 4,
  },
  avatarBorder: {
    padding: 2,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.magenta,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingContainer: {
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  connectPromoBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  connectPromoLeft: {
    flex: 1,
    paddingRight: 14,
  },
  connectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  connectPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  connectPromoTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  connectPromoSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
    marginBottom: 12,
  },
  connectCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  connectCtaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    marginRight: 4,
  },
  connectPromoIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 43, 133, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 43, 133, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  serviceImageContainer: {
    position: 'relative',
    width: '100%',
    height: 104,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceOverlayBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  serviceOverlayText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
  serviceContent: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#ffffff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.magenta,
    fontWeight: '700',
  },
  connectTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: -10,
  },
  connectTabInner: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.magenta,
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  connectTabText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  newBadge: {
    position: 'absolute',
    top: -8,
    right: -4,
    backgroundColor: Colors.magenta,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
  },
});
