import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { ShieldCheck, RotateCcw, Sparkles } from 'lucide-react-native';

type OtpScreenProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OtpScreen({ route, navigation }: OtpScreenProps) {
  const { phone } = route.params;
  const { verifyOtp, sendOtp, isMockAuth } = useAuth();

  const [digits, setDigits] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef<any[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleDigitChange = (val: string, index: number) => {
    const clean = val.replace(/\D/g, '');
    const newDigits = [...digits];

    if (clean.length > 1) {
      // Pasted full OTP
      const pasted = clean.slice(0, 4).split('');
      pasted.forEach((d, i) => {
        newDigits[i] = d;
      });
      setDigits(newDigits);
      if (newDigits.every((d) => d !== '')) {
        handleVerifyCode(newDigits.join(''));
      }
      return;
    }

    newDigits[index] = clean;
    setDigits(newDigits);
    setError('');

    if (clean && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newDigits.every((d) => d !== '')) {
      handleVerifyCode(newDigits.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (codeToVerify?: string) => {
    const fullCode = codeToVerify || digits.join('');
    if (fullCode.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }

    setLoading(true);
    setError('');
    const res = await verifyOtp(phone, fullCode);
    setLoading(false);

    if (res.success) {
      if (res.isNewUser) {
        navigation.replace('RegisterProfile', { phone });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } else {
      setError(res.message || 'Incorrect verification code. Please try again.');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setDigits(['', '', '', '']);
    setError('');
    await sendOtp(phone);
    inputRefs.current[0]?.focus();
  };

  const autoFillTestOtp = () => {
    const testDigits = ['1', '2', '3', '4'];
    setDigits(testDigits);
    handleVerifyCode('1234');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Verification Code"
        subtitle="Security Check"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Header Texts */}
          <View style={styles.headerBlock}>
            <View style={styles.shieldIconCircle}>
              <ShieldCheck size={28} color={Colors.magenta} />
            </View>
            <Text style={styles.title}>Enter 4-Digit Code</Text>
            <Text style={styles.subtitle}>
              We sent a verification code via SMS to{' '}
              <Text style={styles.phoneHighlight}>+91 {phone}</Text>
            </Text>
          </View>

          {/* OTP Input Boxes */}
          <View style={styles.otpRow}>
            {digits.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  Boolean(digit) && styles.otpInputFilled,
                  Boolean(error) && styles.otpInputError,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleDigitChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
                selectTextOnFocus
              />
            ))}
          </View>

          {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

          {/* Test Mode Autofill (Available only when in Test Mode) */}
          {isMockAuth && (
            <TouchableOpacity
              style={styles.demoFillPill}
              onPress={autoFillTestOtp}
              activeOpacity={0.7}
            >
              <Sparkles size={13} color={Colors.magenta} />
              <Text style={styles.demoFillText}>Quick Test: Autofill '1234' & Continue</Text>
            </TouchableOpacity>
          )}

          {/* Verify Button */}
          <Button
            title="Verify & Continue"
            onPress={() => handleVerifyCode()}
            loading={loading}
            size="lg"
            style={{ marginTop: Spacing.xl }}
          />

          {/* Resend Timer */}
          <View style={styles.resendRow}>
            {canResend ? (
              <TouchableOpacity
                onPress={handleResend}
                activeOpacity={0.7}
                style={styles.resendButton}
              >
                <RotateCcw size={14} color={Colors.magenta} />
                <Text style={styles.resendButtonText}>Resend OTP Code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend code in{' '}
                <Text style={styles.timerNumber}>{timer}s</Text>
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  shieldIconCircle: {
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
  },
  phoneHighlight: {
    fontWeight: '700',
    color: Colors.textMain,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  otpInput: {
    width: 62,
    height: 64,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textMain,
    ...Shadows.subtle,
  },
  otpInputFilled: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.magentaLight,
  },
  otpInputError: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerLight,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  demoFillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.round,
    alignSelf: 'center',
    marginTop: Spacing.xs,
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 6,
  },
  resendRow: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  timerNumber: {
    fontWeight: '700',
    color: Colors.magenta,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 6,
  },
});
