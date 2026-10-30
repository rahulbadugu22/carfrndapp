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
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ShieldCheck, Smartphone, Lock, Sparkles, QrCode, Zap } from 'lucide-react-native';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { sendOtp, isMockAuth, setIsMockAuth } = useAuth();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    const clean = phone.replace(/\D/g, '').slice(-10);
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setLoading(true);
    const res = await sendOtp(clean);
    setLoading(false);

    if (res.success) {
      navigation.navigate('Otp', { phone: clean });
    } else {
      setError(res.message || 'Failed to send verification code');
    }
  };

  const fillDemoPhone = () => {
    setPhone('9876543210');
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View style={styles.securityTag}>
              <ShieldCheck size={13} color={Colors.magenta} />
              <Text style={styles.securityTagText}>SECURE LOGIN</Text>
            </View>
            <Text style={styles.heading}>Welcome to CarFrnd</Text>
            <Text style={styles.subheading}>
              Enter your mobile number to manage your vehicle QR tags and emergency alerts.
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <View style={styles.phoneInputRow}>
              <View style={styles.countryBadge}>
                <Text style={styles.flagText}>🇮🇳</Text>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  placeholder="Enter 10-digit mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={(val) => {
                    setPhone(val);
                    if (error) setError('');
                  }}
                  error={error}
                  leftIcon={<Smartphone size={18} color={Colors.textMuted} />}
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
            </View>

            {/* Quick Demo Fill Pill */}
            <TouchableOpacity
              onPress={fillDemoPhone}
              activeOpacity={0.7}
              style={styles.demoFillPill}
            >
              <Sparkles size={13} color={Colors.magenta} />
              <Text style={styles.demoFillText}>Tap to use Demo Number: 9876543210</Text>
            </TouchableOpacity>

            <Button
              title="Get OTP Verification Code"
              onPress={handleSendOtp}
              loading={loading}
              size="lg"
              style={{ marginTop: Spacing.lg }}
            />

            {/* Privacy Promise */}
            <View style={styles.privacyBox}>
              <Lock size={14} color="#10B981" />
              <Text style={styles.privacyText}>
                Your number is never shared with callers. All interactions are securely masked.
              </Text>
            </View>

            {/* Live SMS vs Test Mode Toggle */}
            <TouchableOpacity
              onPress={() => setIsMockAuth(!isMockAuth)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isMockAuth ? '#FEF3C7' : '#ECFDF5',
                borderColor: isMockAuth ? '#FDE68A' : '#A7F3D0',
                borderWidth: 1,
                borderRadius: Radius.md,
                paddingVertical: 9,
                paddingHorizontal: 12,
                marginTop: Spacing.md,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Zap size={14} color={isMockAuth ? '#D97706' : '#059669'} />
                <Text style={{ fontSize: 12, fontWeight: '700', color: isMockAuth ? '#92400E' : '#065F46', marginLeft: 6 }}>
                  {isMockAuth ? 'Testing OTP Mode (1234)' : 'Live SMS OTP Mode (MSG91)'}
                </Text>
              </View>
              <Text style={{ fontSize: 11, fontWeight: '800', color: Colors.magenta }}>
                Switch
              </Text>
            </TouchableOpacity>
          </View>

          {/* Guest / Direct Public Scan Option */}
          <View style={styles.guestSection}>
            <Text style={styles.orText}>OR SCAN A VEHICLE TAG DIRECTLY</Text>
            <TouchableOpacity
              style={styles.directScanButton}
              onPress={() => navigation.navigate('ScanQr')}
              activeOpacity={0.8}
            >
              <QrCode size={18} color={Colors.magenta} />
              <Text style={styles.directScanText}>Scan Any Vehicle QR Tag Now</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoImage: {
    width: 170,
    height: 48,
    marginBottom: Spacing.md,
  },
  securityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
    marginBottom: Spacing.md,
  },
  securityTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.magenta,
    marginLeft: 4,
    letterSpacing: 0.6,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textMain,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 14,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    ...Shadows.card,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    height: 52,
    paddingHorizontal: 12,
    marginRight: Spacing.sm,
  },
  flagText: {
    fontSize: 18,
    marginRight: 4,
  },
  countryCode: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textMain,
  },
  demoFillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.sm,
    marginTop: Spacing.sm,
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.magenta,
    marginLeft: 6,
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },
  privacyText: {
    fontSize: 12,
    color: '#065F46',
    flex: 1,
    marginLeft: Spacing.sm,
    lineHeight: 17,
    fontWeight: '500',
  },
  guestSection: {
    marginTop: Spacing.xxl,
    alignItems: 'center',
  },
  orText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  directScanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: Radius.lg,
    ...Shadows.subtle,
  },
  directScanText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: Spacing.sm,
  },
});
