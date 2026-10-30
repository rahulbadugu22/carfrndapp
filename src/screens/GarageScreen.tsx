import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth, Vehicle } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { VehicleCard } from '../components/VehicleCard';
import { Button } from '../components/Button';
import {
  Car,
  Zap,
  QrCode,
  ShieldCheck,
  X,
  Lock,
  Plus,
} from 'lucide-react-native';

type GarageProps = NativeStackScreenProps<RootStackParamList, 'Garage'>;

export default function GarageScreen({ navigation }: GarageProps) {
  const { vehicles, toggleVehicleCallMasking, toggleVehicleTowingAlerts } = useAuth();
  const [selectedVehicleForQr, setSelectedVehicleForQr] = useState<Vehicle | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="My Garage"
        subtitle={`${vehicles.length} Vehicle Tag(s) Protected`}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Summary Banner */}
        <View style={styles.summaryBanner}>
          <View style={styles.summaryIconBox}>
            <Car size={24} color={Colors.magenta} />
          </View>
          <View style={styles.summaryTexts}>
            <Text style={styles.summaryTitle}>Active Vehicle Security</Text>
            <Text style={styles.summarySub}>
              All linked vehicles have anonymous call masking & parking alert dispatch active.
            </Text>
          </View>
        </View>

        {/* Vehicles List */}
        <View style={styles.vehiclesList}>
          {vehicles.map((veh) => (
            <VehicleCard
              key={veh.id}
              vehicle={veh}
              onShowQr={(v) => setSelectedVehicleForQr(v)}
              onToggleCallMasking={toggleVehicleCallMasking}
              onToggleTowingAlerts={toggleVehicleTowingAlerts}
            />
          ))}
        </View>

        {/* Add / Activate Tag Action */}
        <Button
          title="Activate Another Vehicle Tag"
          onPress={() => navigation.navigate('ActivateTag')}
          icon={<Plus size={18} color="#FFFFFF" />}
          size="lg"
          style={{ marginTop: Spacing.md }}
        />
      </ScrollView>

      {/* QR MODAL */}
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
              <Text style={styles.modalSubheading}>Digital Vehicle Decal</Text>
            </View>

            <View style={styles.modalPlateBox}>
              <Text style={styles.modalPlateText}>
                {selectedVehicleForQr?.regNumber || 'KA 01 MJ 8820'}
              </Text>
              <Text style={styles.modalModelText}>
                {selectedVehicleForQr?.makeModel || 'Vehicle'}
              </Text>
            </View>

            <View style={styles.qrCardContainer}>
              <View style={styles.qrPatternBox}>
                <QrCode size={180} color="#0F172A" />
                <View style={styles.qrCenterBadge}>
                  <Text style={styles.qrCenterText}>CF</Text>
                </View>
              </View>

              <Text style={styles.qrTagIdText}>
                TAG: {selectedVehicleForQr?.tagId || 'CFD-BLR-000001'}
              </Text>
              <View style={styles.qrProtectedBadge}>
                <ShieldCheck size={12} color="#10B981" />
                <Text style={styles.qrProtectedText}>Cloud Masked Protection Active</Text>
              </View>
            </View>

            <View style={styles.qrInstructionBox}>
              <Lock size={14} color={Colors.magenta} />
              <Text style={styles.qrInstructionText}>
                Anyone scanning this QR code can call or alert you without seeing your phone number.
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
  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.subtle,
  },
  summaryIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  summaryTexts: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  vehiclesList: {
    marginBottom: Spacing.md,
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
