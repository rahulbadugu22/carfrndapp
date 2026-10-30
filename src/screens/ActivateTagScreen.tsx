import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Header } from '../components/Header';
import {
  QrCode,
  Car,
  User,
  Mail,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  RotateCcw,
} from 'lucide-react-native';

type ActivateTagProps = NativeStackScreenProps<RootStackParamList, 'ActivateTag'>;

export default function ActivateTagScreen({ route, navigation }: ActivateTagProps) {
  const prefillTag = route.params?.prefillTag || '';
  const { user, isLoggedIn, sendOtp, activateTagAndCreateAccount } = useAuth();

  // Basic Tag & Customer Details
  const [tagId, setTagId] = useState(prefillTag || 'CFD-BLR-009988');
  const [vehicleNo, setVehicleNo] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Auth / Mobile Number State (if not logged in)
  const [phone, setPhone] = useState(user?.phone || '');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setSendingOtp(true);
    setError('');
    const res = await sendOtp(cleanPhone);
    setSendingOtp(false);

    if (res.success) {
      setOtpSent(true);
      setTimer(30);
    } else {
      setError(res.message || 'Failed to dispatch OTP code');
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const clean = text.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = clean;
    setOtp(newOtp);
    setError('');
  };

  const handleActivateTag = async () => {
    if (!tagId.trim()) {
      setError('Please enter your CarFrnd QR Tag Serial ID');
      return;
    }
    if (!vehicleNo.trim()) {
      setError('Please enter your Car / Vehicle Number Plate');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your Name');
      return;
    }

    const effectivePhone = isLoggedIn ? user?.phone || '' : phone.replace(/\D/g, '').slice(-10);

    if (!isLoggedIn) {
      if (effectivePhone.length !== 10) {
        setError('Please enter your 10-digit mobile phone number');
        return;
      }
      if (!otpSent) {
        setError('Please tap "Send OTP" to verify your mobile number first');
        return;
      }
      const fullOtp = otp.join('');
      if (fullOtp.length !== 4) {
        setError('Please enter the 4-digit verification code');
        return;
      }
    }

    setSubmitting(true);
    setError('');

    const res = await activateTagAndCreateAccount({
      tagId: tagId.trim().toUpperCase(),
      vehicleNo: vehicleNo.trim().toUpperCase(),
      name: name.trim(),
      email: email.trim() || undefined,
      phone: effectivePhone,
      otp: otp.join(''),
    });

    setSubmitting(false);

    if (res.success) {
      navigation.replace('ActivationSuccess', {
        vehicleNo: vehicleNo.trim().toUpperCase(),
        tagId: tagId.trim().toUpperCase(),
        makeModel: 'Registered Vehicle',
      });
    } else {
      setError(res.message || 'Failed to activate tag. Please check details.');
    }
  };

  const autoFillDemo = () => {
    setVehicleNo('KA01MJ8820');
    setName('Rahul Verma');
    setEmail('rahul@example.com');
    if (!isLoggedIn) {
      setPhone('9876543210');
      setOtpSent(true);
      setOtp(['1', '2', '3', '4']);
    }
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Activate CarFrnd Tag"
        subtitle="Link vehicle to your smart QR sticker"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header Card */}
          <View style={styles.topInfoCard}>
            <View style={styles.tagBadgeRow}>
              <View style={styles.tagPill}>
                <QrCode size={13} color={Colors.magenta} />
                <Text style={styles.tagPillText}>TAG: {tagId || 'NEW STICKER'}</Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>PENDING ACTIVATION</Text>
              </View>
            </View>

            <Text style={styles.title}>Activate Your CarFrnd QR Tag</Text>
            <Text style={styles.subtitle}>
              Fill in your vehicle and contact details. Once verified, your QR tag is immediately live with masked calling protection!
            </Text>

            <TouchableOpacity
              style={styles.demoFillBtn}
              onPress={autoFillDemo}
              activeOpacity={0.7}
            >
              <Sparkles size={12} color={Colors.magenta} />
              <Text style={styles.demoFillText}>Quick Test: Autofill Sample Details</Text>
            </TouchableOpacity>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Tag Serial ID */}
            <Input
              label="QR Tag Serial ID *"
              placeholder="e.g. CFD-BLR-009988"
              value={tagId}
              onChangeText={(val) => {
                setTagId(val);
                if (error) setError('');
              }}
              autoCapitalize="characters"
              leftIcon={<QrCode size={18} color={Colors.textMuted} />}
            />

            {/* Car Number */}
            <Input
              label="Car / Vehicle Number *"
              placeholder="e.g. KA 01 MJ 8820"
              value={vehicleNo}
              onChangeText={(val) => {
                setVehicleNo(val);
                if (error) setError('');
              }}
              autoCapitalize="characters"
              leftIcon={<Car size={18} color={Colors.textMuted} />}
              hint="Printed on your car's front & rear number plates"
            />

            {/* Customer Name */}
            <Input
              label="Your Full Name *"
              placeholder="e.g. Rahul Verma"
              value={name}
              onChangeText={(val) => {
                setName(val);
                if (error) setError('');
              }}
              leftIcon={<User size={18} color={Colors.textMuted} />}
            />

            {/* Email (Optional) */}
            <Input
              label="Email Address (Optional)"
              placeholder="e.g. rahul@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              leftIcon={<Mail size={18} color={Colors.textMuted} />}
              hint="For billing invoice and tag updates"
            />

            <View style={styles.divider} />

            {/* AUTHENTICATION SECTION */}
            {isLoggedIn ? (
              <View style={styles.loggedInBox}>
                <View style={styles.loggedInIconCircle}>
                  <CheckCircle2 size={20} color="#10B981" />
                </View>
                <View style={styles.loggedInTexts}>
                  <Text style={styles.loggedInTitle}>Connected Account</Text>
                  <Text style={styles.loggedInPhone}>
                    +91 {user?.phone} ({user?.name})
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.authSection}>
                <View style={styles.authHeaderRow}>
                  <Smartphone size={18} color={Colors.magenta} />
                  <Text style={styles.authHeaderTitle}>
                    Mobile Number & Account Creation
                  </Text>
                </View>
                <Text style={styles.authHeaderSub}>
                  Enter your mobile number. We will send an OTP to activate your tag and create your CarFrnd account.
                </Text>

                <View style={styles.phoneInputRow}>
                  <View style={styles.countryCodeBadge}>
                    <Text style={styles.flag}>🇮🇳</Text>
                    <Text style={styles.codeText}>+91</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      placeholder="10-digit mobile number"
                      placeholderTextColor={Colors.textLight}
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phone}
                      onChangeText={(val) => {
                        setPhone(val);
                        if (error) setError('');
                      }}
                      style={styles.phoneInput}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.sendOtpBtn, sendingOtp && styles.btnDisabled]}
                    onPress={handleSendOtp}
                    disabled={sendingOtp}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.sendOtpBtnText}>
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {otpSent && (
                  <View style={styles.otpBlock}>
                    <Text style={styles.otpLabel}>Enter 4-Digit Verification Code *</Text>
                    <View style={styles.otpInputsRow}>
                      {[0, 1, 2, 3].map((idx) => (
                        <TextInput
                          key={idx}
                          style={[
                            styles.otpBox,
                            Boolean(otp[idx]) && styles.otpBoxFilled,
                          ]}
                          keyboardType="number-pad"
                          maxLength={1}
                          value={otp[idx]}
                          onChangeText={(val) => handleOtpChange(val, idx)}
                        />
                      ))}
                    </View>
                    <Text style={styles.otpHint}>
                      Code sent to +91 {phone.slice(-10)} (Use 1234 for quick test)
                    </Text>
                  </View>
                )}
              </View>
            )}

            {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

            <Button
              title={
                isLoggedIn
                  ? 'Activate QR Tag Now'
                  : 'Verify OTP & Activate QR Tag'
              }
              onPress={handleActivateTag}
              loading={submitting}
              size="lg"
              style={{ marginTop: Spacing.lg }}
            />

            <View style={styles.privacyNote}>
              <Lock size={13} color="#10B981" />
              <Text style={styles.privacyText}>
                100% Privacy Protected: Your personal mobile number is never exposed to callers who scan your tag.
              </Text>
            </View>
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
    padding: Spacing.lg,
    paddingBottom: Spacing.huge,
  },
  topInfoCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  tagBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.magenta,
    marginLeft: 4,
  },
  statusPill: {
    backgroundColor: Colors.warningLight,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: Radius.round,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.warning,
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSub,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
    marginTop: 4,
  },
  demoFillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    ...Shadows.card,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.lg,
  },
  loggedInBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  loggedInIconCircle: {
    marginRight: Spacing.md,
  },
  loggedInTexts: {
    flex: 1,
  },
  loggedInTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  loggedInPhone: {
    fontSize: 12,
    color: '#047857',
    marginTop: 1,
  },
  authSection: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  authHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  authHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    marginLeft: 6,
  },
  authHeaderSub: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
    marginBottom: Spacing.md,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  countryCodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    height: 48,
    paddingHorizontal: 10,
    marginRight: Spacing.xs,
  },
  flag: {
    fontSize: 16,
    marginRight: 2,
  },
  codeText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
  },
  phoneInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    height: 48,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    color: Colors.textMain,
    marginRight: Spacing.xs,
  },
  sendOtpBtn: {
    backgroundColor: Colors.magenta,
    borderRadius: Radius.md,
    height: 48,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendOtpBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  otpBlock: {
    marginTop: Spacing.sm,
  },
  otpLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 6,
  },
  otpInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
    marginBottom: 4,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textMain,
  },
  otpBoxFilled: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.magentaLight,
  },
  otpHint: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    fontWeight: '600',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },
  privacyText: {
    fontSize: 11,
    color: '#065F46',
    marginLeft: 6,
    flex: 1,
    lineHeight: 16,
  },
});
