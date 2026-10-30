import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useScan } from '../context/ScanContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Header } from '../components/Header';
import {
  ShieldCheck,
  Car,
  Lock,
  Sparkles,
  AlertCircle,
  KeyRound,
} from 'lucide-react-native';

type ScanVerificationProps = NativeStackScreenProps<RootStackParamList, 'ScanVerification'>;

export default function ScanVerificationScreen({ route, navigation }: ScanVerificationProps) {
  const { token } = route.params;
  const { scannedTag, verifyPlateDigits, isVerifying, verifyError } = useScan();

  const [digits, setDigits] = useState('');
  const [localError, setLocalError] = useState('');

  const targetDigits = scannedTag?.fullPlate
    ? scannedTag.fullPlate.replace(/\D/g, '').slice(-4)
    : '8820';

  const handleVerify = async () => {
    if (!digits.trim()) {
      setLocalError('Please enter the last 4 digits of the vehicle number plate');
      return;
    }

    setLocalError('');
    const res = await verifyPlateDigits(digits.trim());
    if (res.success) {
      navigation.replace('VehiclePublicProfile', { token });
    } else {
      setLocalError(res.error || 'Digits do not match vehicle plate.');
    }
  };

  const autoFillPlateDigits = () => {
    setDigits(targetDigits);
    setLocalError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Vehicle Verification"
        subtitle="Security check to confirm physical presence"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Security Gate Icon & Description */}
          <View style={styles.topIconBox}>
            <View style={styles.shieldCircle}>
              <KeyRound size={28} color={Colors.magenta} />
            </View>
            <View style={styles.badgePill}>
              <ShieldCheck size={12} color="#10B981" />
              <Text style={styles.badgePillText}>ANTI-SPAM PRIVACY GATE</Text>
            </View>
            <Text style={styles.title}>Confirm Vehicle Plate</Text>
            <Text style={styles.subtitle}>
              To prevent unauthorized alerts, please verify the last 4 digits of the vehicle license plate you are standing next to.
            </Text>
          </View>

          {/* Vehicle Hint Card */}
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View style={styles.carIconBox}>
                <Car size={20} color={Colors.magenta} />
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.modelName}>
                  {scannedTag?.vehicleModel || 'Registered Vehicle'}
                </Text>
                <Text style={styles.vehicleType}>
                  {scannedTag?.vehicleType || 'Car / SUV'} • Tag ID: {token}
                </Text>
              </View>
            </View>

            {/* Masked Plate Visualization */}
            <View style={styles.plateContainer}>
              <View style={styles.indStrip}>
                <Text style={styles.indText}>IND</Text>
              </View>
              <Text style={styles.maskedPlateText}>
                {scannedTag?.maskedPlate || 'KA 01 ** ****'}
              </Text>
            </View>
          </View>

          {/* Verification Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.inputLabel}>
              Enter Last 4 Digits of Plate Number *
            </Text>

            <Input
              placeholder={`e.g. ${targetDigits}`}
              keyboardType="number-pad"
              maxLength={4}
              value={digits}
              onChangeText={(val) => {
                setDigits(val.replace(/\D/g, ''));
                if (localError) setLocalError('');
              }}
              error={localError || verifyError}
              leftIcon={<KeyRound size={18} color={Colors.textMuted} />}
              containerStyle={{ marginBottom: Spacing.sm }}
            />

            {/* One-Tap Autofill Tester */}
            <TouchableOpacity
              style={styles.autofillPill}
              onPress={autoFillPlateDigits}
              activeOpacity={0.7}
            >
              <Sparkles size={13} color={Colors.magenta} />
              <Text style={styles.autofillText}>
                Quick Demo: Autofill plate digits '{targetDigits}'
              </Text>
            </TouchableOpacity>

            <Button
              title="Verify & Open Vehicle Profile"
              onPress={handleVerify}
              loading={isVerifying}
              size="lg"
              style={{ marginTop: Spacing.lg }}
            />
          </View>

          {/* Privacy Note */}
          <View style={styles.privacyNote}>
            <Lock size={14} color="#64748B" />
            <Text style={styles.privacyNoteText}>
              CarFrnd encrypts all vehicle data. The driver's personal phone number is never exposed to public callers.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  topIconBox: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  shieldCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.magentaLight,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
    marginBottom: Spacing.sm,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: 0.6,
    marginLeft: 4,
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
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
  },
  vehicleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    ...Shadows.card,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.md,
  },
  carIconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textMain,
  },
  vehicleType: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0F172A',
    borderRadius: Radius.xs,
    paddingVertical: 4,
    paddingRight: 14,
    ...Shadows.subtle,
  },
  indStrip: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 2,
  },
  indText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  maskedPlateText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 2,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    ...Shadows.card,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: Spacing.sm,
  },
  autofillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    alignSelf: 'center',
    marginTop: Spacing.xs,
  },
  autofillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 6,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  privacyNoteText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
    lineHeight: 17,
    flex: 1,
  },
});
