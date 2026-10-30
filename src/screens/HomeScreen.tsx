import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth, Vehicle } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { VehicleCard } from '../components/VehicleCard';
import { AUTO_SERVICES } from '../config/constants';
import {
  QrCode,
  Zap,
  ShoppingBag,
  Car,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MapPin,
  X,
  Share2,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Bell,
  Lock,
} from 'lucide-react-native';

// Service images mapping
const SERVICE_IMAGES: { [key: string]: any } = {
  service_car_wash: require('../../assets/images/service_car_wash.jpg'),
  service_car_detailing: require('../../assets/images/service_car_detailing.jpg'),
  service_tyres_wheels: require('../../assets/images/service_tyres_wheels.jpg'),
  service_fastag: require('../../assets/images/service_fastag.jpg'),
  service_challan: require('../../assets/images/service_challan.jpg'),
  service_rsa: require('../../assets/images/service_rsa.jpg'),
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const {
    user,
    vehicles,
    notifications,
    toggleVehicleCallMasking,
    toggleVehicleTowingAlerts,
  } = useAuth();

  const [selectedVehicleForQr, setSelectedVehicleForQr] = useState<Vehicle | null>(null);
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const primaryVehicle = vehicles.length > 0 ? vehicles[0] : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <Header
        showLogo
        showNotification
        unreadCount={unreadNotifs}
        onNotificationPress={() => navigation.navigate('Notifications')}
        rightComponent={
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Greeting & City Location */}
        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.greetingText}>
              Hello, {user?.name ? user.name.split(' ')[0] : 'Driver'} 👋
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color={Colors.magenta} />
              <Text style={styles.locationText}>{user?.city || 'Bengaluru'}</Text>
            </View>
          </View>

          <View style={styles.securityStatusPill}>
            <View style={styles.liveGreenDot} />
            <Text style={styles.securityStatusText}>TAGS ACTIVE</Text>
          </View>
        </View>

        {/* PRIMARY HERO: SCAN ANY VEHICLE TAG */}
        <TouchableOpacity
          style={styles.heroScanCard}
          onPress={() => navigation.navigate('ScanQr')}
          activeOpacity={0.9}
        >
          <View style={styles.heroScanLeft}>
            <View style={styles.heroPill}>
              <Sparkles size={11} color="#FFFFFF" />
              <Text style={styles.heroPillText}>INSTANT VEHICLE SCANNER</Text>
            </View>
            <Text style={styles.heroScanTitle}>Scan Any CarFrnd Tag</Text>
            <Text style={styles.heroScanSubtitle}>
              Send parking alerts or make a private masked call without seeing the owner's phone number.
            </Text>

            <View style={styles.heroCtaRow}>
              <View style={styles.heroCtaButton}>
                <Text style={styles.heroCtaText}>Open Scanner</Text>
                <ArrowRight size={14} color={Colors.magenta} />
              </View>
            </View>
          </View>

          <View style={styles.heroScanGraphic}>
            <View style={styles.qrScanIconBox}>
              <QrCode size={40} color="#FFFFFF" />
              <View style={styles.scanBeam} />
            </View>
          </View>
        </TouchableOpacity>

        {/* QUICK ACTIONS 4-GRID */}
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionTile}
            onPress={() => navigation.navigate('ScanQr')}
            activeOpacity={0.7}
          >
            <View style={[styles.tileIconBox, { backgroundColor: Colors.magentaLight }]}>
              <QrCode size={22} color={Colors.magenta} />
            </View>
            <Text style={styles.tileTitle}>Scan Tag</Text>
            <Text style={styles.tileSubtitle}>Park alert / Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionTile}
            onPress={() => navigation.navigate('ActivateTag')}
            activeOpacity={0.7}
          >
            <View style={[styles.tileIconBox, { backgroundColor: '#EFF6FF' }]}>
              <Zap size={22} color="#3B82F6" />
            </View>
            <Text style={styles.tileTitle}>Activate Tag</Text>
            <Text style={styles.tileSubtitle}>Link new sticker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionTile}
            onPress={() => navigation.navigate('OrderTag')}
            activeOpacity={0.7}
          >
            <View style={[styles.tileIconBox, { backgroundColor: '#ECFDF5' }]}>
              <ShoppingBag size={22} color="#10B981" />
            </View>
            <Text style={styles.tileTitle}>Order Tag</Text>
            <Text style={styles.tileSubtitle}>₹450 doorstep</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionTile}
            onPress={() => navigation.navigate('Garage')}
            activeOpacity={0.7}
          >
            <View style={[styles.tileIconBox, { backgroundColor: '#FDF4FF' }]}>
              <Car size={22} color="#A855F7" />
            </View>
            <Text style={styles.tileTitle}>My Garage</Text>
            <Text style={styles.tileSubtitle}>{vehicles.length} vehicle(s)</Text>
          </TouchableOpacity>
        </View>

        {/* MY PROTECTED VEHICLE SECTION */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>My Protected Vehicle</Text>
            <Text style={styles.sectionSubtitle}>
              Live security status & cloud call masking
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Garage')}
            activeOpacity={0.7}
            style={styles.viewAllRow}
          >
            <Text style={styles.viewAllText}>Manage</Text>
            <ChevronRight size={14} color={Colors.magenta} />
          </TouchableOpacity>
        </View>

        {primaryVehicle ? (
          <VehicleCard
            vehicle={primaryVehicle}
            onShowQr={(veh) => setSelectedVehicleForQr(veh)}
            onToggleCallMasking={toggleVehicleCallMasking}
            onToggleTowingAlerts={toggleVehicleTowingAlerts}
          />
        ) : (
          <TouchableOpacity
            style={styles.noVehicleCard}
            onPress={() => navigation.navigate('ActivateTag')}
            activeOpacity={0.8}
          >
            <Car size={32} color={Colors.textMuted} />
            <Text style={styles.noVehicleTitle}>No Vehicle Tag Linked Yet</Text>
            <Text style={styles.noVehicleSubtitle}>
              Activate your CarFrnd sticker or order one to protect your vehicle.
            </Text>
            <View style={styles.activateNowBtn}>
              <Zap size={14} color="#FFFFFF" />
              <Text style={styles.activateNowText}>Activate Tag in 60s</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* ORDER TAG SPECIAL OFFER PROMO BANNER */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>SPECIAL LAUNCH OFFER</Text>
            </View>
            <Text style={styles.promoTitle}>Weatherproof Automotive Tag</Text>
            <Text style={styles.promoDesc}>
              High-grade vinyl windshield sticker. Delivered in 3-5 days.
            </Text>
            <TouchableOpacity
              style={styles.promoBuyBtn}
              onPress={() => navigation.navigate('OrderTag')}
              activeOpacity={0.8}
            >
              <Text style={styles.promoBuyText}>Order Now — ₹450 (Incl. GST)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AUTO SERVICES HUB SECTION */}
        <View style={[styles.sectionHeaderRow, { marginTop: Spacing.xl }]}>
          <View>
            <View style={styles.serviceHeaderTitleRow}>
              <Text style={styles.sectionTitle}>CarFrnd Auto Services</Text>
              <View style={styles.comingSoonPill}>
                <Text style={styles.comingSoonText}>COMING SOON</Text>
              </View>
            </View>
            <Text style={styles.sectionSubtitle}>
              Complete doorstep maintenance and vehicle care
            </Text>
          </View>
        </View>

        {/* Services Horizontal Scroll Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScrollRow}
        >
          {AUTO_SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
              activeOpacity={0.8}
            >
              <View style={styles.serviceImageContainer}>
                <Image
                  source={SERVICE_IMAGES[service.imageKey] || SERVICE_IMAGES.service_car_wash}
                  style={styles.serviceImage}
                />
                <View style={styles.serviceBadgeFloating}>
                  <Text style={styles.serviceBadgeText}>{service.badge}</Text>
                </View>
              </View>

              <View style={styles.serviceBody}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle} numberOfLines={2}>
                  {service.subtitle}
                </Text>

                <View style={styles.serviceFooterRow}>
                  <Text style={styles.servicePrice}>{service.priceTag}</Text>
                  <View style={styles.serviceArrowCircle}>
                    <ChevronRight size={14} color={Colors.magenta} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* DIGITAL QR TAG MODAL */}
      <Modal
        visible={Boolean(selectedVehicleForQr)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedVehicleForQr(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSelectedVehicleForQr(null)}
            >
              <X size={20} color={Colors.textMain} />
            </TouchableOpacity>

            <View style={styles.modalHeader}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.modalLogo}
                resizeMode="contain"
              />
              <Text style={styles.modalSubheading}>Digital Vehicle Safety Tag</Text>
            </View>

            {/* Vehicle Card Header */}
            <View style={styles.modalPlateBox}>
              <Text style={styles.modalPlateText}>
                {selectedVehicleForQr?.regNumber || 'KA 01 MJ 8820'}
              </Text>
              <Text style={styles.modalModelText}>
                {selectedVehicleForQr?.makeModel || 'Hyundai Creta SX'}
              </Text>
            </View>

            {/* QR Mock graphic with CarFrnd center logo */}
            <View style={styles.qrCardContainer}>
              <View style={styles.qrPatternBox}>
                <QrCode size={180} color="#0F172A" />
                <View style={styles.qrCenterBadge}>
                  <Text style={styles.qrCenterText}>CF</Text>
                </View>
              </View>

              <Text style={styles.qrTagIdText}>
                ID: {selectedVehicleForQr?.tagId || 'CFD-BLR-000001'}
              </Text>
              <View style={styles.qrProtectedBadge}>
                <ShieldCheck size={12} color="#10B981" />
                <Text style={styles.qrProtectedText}>Cloud Masked Protection Active</Text>
              </View>
            </View>

            {/* QR Details */}
            <View style={styles.qrInstructionBox}>
              <Lock size={14} color={Colors.magenta} />
              <Text style={styles.qrInstructionText}>
                Anyone scanning this code can send wrong-parking alerts or call you via masked voice without seeing your phone number.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.huge,
  },
  avatarButton: {
    marginLeft: Spacing.sm,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: Colors.textWhite,
    fontSize: 15,
    fontWeight: '800',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    letterSpacing: -0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    marginLeft: 4,
  },
  securityStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
    marginRight: 6,
  },
  securityStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.success,
    letterSpacing: 0.6,
  },
  heroScanCard: {
    backgroundColor: '#0F172A',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    ...Shadows.elevated,
  },
  heroScanLeft: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: Radius.round,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  heroPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
    marginLeft: 4,
  },
  heroScanTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroScanSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 17,
    marginBottom: Spacing.md,
  },
  heroCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCtaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: Radius.round,
  },
  heroCtaText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
    marginRight: 4,
  },
  heroScanGraphic: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrScanIconBox: {
    width: 74,
    height: 74,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255, 43, 133, 0.2)',
    borderWidth: 2,
    borderColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scanBeam: {
    position: 'absolute',
    width: '80%',
    height: 2,
    backgroundColor: Colors.magenta,
    borderRadius: 1,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  quickActionTile: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    marginHorizontal: 3,
    ...Shadows.subtle,
  },
  tileIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  tileTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMain,
    textAlign: 'center',
  },
  tileSubtitle: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  serviceHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textMain,
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  comingSoonPill: {
    backgroundColor: Colors.magentaLight,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginLeft: 6,
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.magenta,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.magenta,
    marginRight: 2,
  },
  noVehicleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.borderDark,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  noVehicleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    marginTop: Spacing.sm,
  },
  noVehicleSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  activateNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.round,
    marginTop: Spacing.sm,
  },
  activateNowText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  promoBanner: {
    backgroundColor: Colors.magentaLight,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  promoContent: {
    alignItems: 'flex-start',
  },
  promoTag: {
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: Radius.round,
    marginBottom: 6,
  },
  promoTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 2,
  },
  promoDesc: {
    fontSize: 12,
    color: Colors.textSub,
    marginBottom: Spacing.md,
  },
  promoBuyBtn: {
    backgroundColor: Colors.magenta,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: Radius.round,
  },
  promoBuyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  servicesScrollRow: {
    paddingRight: Spacing.lg,
  },
  serviceCard: {
    width: 220,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.md,
    overflow: 'hidden',
    ...Shadows.card,
  },
  serviceImageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceBadgeFloating: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: Radius.round,
  },
  serviceBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  serviceBody: {
    padding: Spacing.md,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 2,
  },
  serviceSubtitle: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
    minHeight: 30,
  },
  serviceFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.magenta,
  },
  serviceArrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    position: 'relative',
    ...Shadows.elevated,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalLogo: {
    width: 130,
    height: 36,
    marginBottom: 4,
  },
  modalSubheading: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  modalPlateBox: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalPlateText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.textMain,
    letterSpacing: 1,
  },
  modalModelText: {
    fontSize: 13,
    color: Colors.textSub,
    marginTop: 2,
  },
  qrCardContainer: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    marginBottom: Spacing.md,
  },
  qrPatternBox: {
    padding: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Shadows.subtle,
  },
  qrCenterBadge: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  qrCenterText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  qrTagIdText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textMain,
    marginTop: Spacing.md,
    letterSpacing: 0.5,
  },
  qrProtectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qrProtectedText: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '700',
    marginLeft: 4,
  },
  qrInstructionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.magentaLight,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
    borderRadius: Radius.md,
    padding: Spacing.md,
    width: '100%',
  },
  qrInstructionText: {
    fontSize: 11,
    color: Colors.textSub,
    lineHeight: 16,
    marginLeft: 6,
    flex: 1,
  },
});
