import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AUTO_SERVICES } from '../config/constants';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  X,
} from 'lucide-react-native';

const SERVICE_IMAGES: { [key: string]: any } = {
  service_car_wash: require('../../assets/images/service_car_wash.jpg'),
  service_car_detailing: require('../../assets/images/service_car_detailing.jpg'),
  service_tyres_wheels: require('../../assets/images/service_tyres_wheels.jpg'),
  service_fastag: require('../../assets/images/service_fastag.jpg'),
  service_challan: require('../../assets/images/service_challan.jpg'),
  service_rsa: require('../../assets/images/service_rsa.jpg'),
};

type ServiceDetailProps = NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;

export default function ServiceDetailScreen({ route, navigation }: ServiceDetailProps) {
  const { serviceId } = route.params;
  const service = AUTO_SERVICES.find((s) => s.id === serviceId) || AUTO_SERVICES[0];

  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title={service.title}
        subtitle={service.badge}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Service Hero Media */}
        <View style={styles.imageContainer}>
          <Image
            source={SERVICE_IMAGES[service.imageKey] || SERVICE_IMAGES.service_car_wash}
            style={styles.heroImage}
          />
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{service.badge}</Text>
          </View>
        </View>

        <View style={styles.titleCard}>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.subtitle}>{service.subtitle}</Text>
          <Text style={styles.priceTag}>{service.priceTag}</Text>
        </View>

        {/* Deliverables / Package Highlights */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>PACKAGE HIGHLIGHTS</Text>

          <View style={styles.highlightRow}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.highlightText}>{service.tagline}</Text>
          </View>
          <View style={styles.highlightRow}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.highlightText}>
              Delivered at your home or office parking space
            </Text>
          </View>
          <View style={styles.highlightRow}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.highlightText}>
              Certified CarFrnd automotive technicians
            </Text>
          </View>
          <View style={styles.highlightRow}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.highlightText}>
              100% Satisfaction or free re-service guarantee
            </Text>
          </View>
        </View>

        {/* Booking Action */}
        <Button
          title="Schedule Doorstep Service"
          onPress={() => setBookingSuccessModal(true)}
          icon={<Calendar size={18} color="#FFFFFF" />}
          size="lg"
          style={{ marginTop: Spacing.md }}
        />
      </ScrollView>

      {/* Booking Confirmation Dialog */}
      <Modal
        visible={bookingSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setBookingSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <View style={styles.checkCircle}>
              <CheckCircle2 size={40} color={Colors.magenta} />
            </View>
            <Text style={styles.confirmTitle}>Service Slot Requested!</Text>
            <Text style={styles.confirmSub}>
              Our scheduling concierge will call you shortly to confirm your preferred doorstep timing and vehicle details.
            </Text>

            <Button
              title="Got It, Thank You"
              onPress={() => setBookingSuccessModal(false)}
              size="md"
              style={{ width: '100%' }}
            />
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
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  titleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSub,
    marginBottom: Spacing.md,
  },
  priceTag: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.magenta,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  highlightText: {
    fontSize: 13,
    color: Colors.textMain,
    marginLeft: Spacing.sm,
    flex: 1,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  confirmModal: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.elevated,
  },
  checkCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: Spacing.xs,
  },
  confirmSub: {
    fontSize: 13,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
});
