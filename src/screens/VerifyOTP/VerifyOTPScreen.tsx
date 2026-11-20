import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function VerifyOTPScreen({
  onNavigate,
  routeParams,
}: {
  onNavigate: any;
  routeParams?: any;
}) {
  const { verifyOtp, sendOtp } = useAuth();
  const phone = routeParams?.phone || '+91 98765 43210';
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<any>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError('');

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setLoading(true);
    setError('');

    const res = await verifyOtp(phone, fullOtp);
    setLoading(false);

    if (res.success) {
      onNavigate('Location');
    } else {
      setError(res.message || 'Invalid verification code. Try 1234.');
    }
  };

  const handleResend = async () => {
    setResending(true);
    await sendOtp(phone);
    setResending(false);
    setError('Code resent! Test code is 1234');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => onNavigate('Login')}
            >
              <Icon name="arrow-left" size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.backButtonPlaceholder} />
          </View>

          {/* Title & Subtitle */}
          <Text style={styles.title}>Verify Details</Text>
          <Text style={styles.subtitle}>Enter the 4-digit code sent to</Text>

          <View style={styles.phoneContainer}>
            <Text style={styles.phoneNumber}>{phone}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onNavigate('Login')}
            >
              <Icon name="edit-2" size={12} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectionColor={Colors.magenta}
              />
            ))}
          </View>

          {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

          {/* Auto-detect info banner */}
          <View style={styles.autoDetectContainer}>
            <Icon name="shield-check" size={16} color={Colors.magenta} style={{ marginRight: 8 }} />
            <Text style={styles.autoDetectText}>
              Live CarFrnd authentication active (Test OTP: 1234)
            </Text>
          </View>

          {/* Resend Timer */}
          <TouchableOpacity onPress={handleResend} disabled={resending}>
            <Text style={styles.resendText}>
              Didn't receive code?{' '}
              <Text style={styles.resendTimer}>
                {resending ? 'Sending...' : 'Resend Code'}
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Verify Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPlaceholder: {
    width: 40,
  },
  headerLogo: {
    width: 130,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 8,
  },
  editButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.magentaLight,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  autoDetectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  autoDetectText: {
    color: Colors.magenta,
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  resendText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  resendTimer: {
    color: Colors.magenta,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: Colors.magenta,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
