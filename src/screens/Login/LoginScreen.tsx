import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ onNavigate }: { onNavigate: any }) {
  const { sendOtp } = useAuth();
  const [phone, setPhone] = useState('9876543210');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);

    const formatted = `+91 ${cleanPhone.slice(-10)}`;
    const res = await sendOtp(formatted);
    setLoading(false);

    if (res.success) {
      onNavigate('VerifyOTP', { phone: formatted });
    } else {
      setError(res.message || 'Failed to send verification code. Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Logo */}
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />

          {/* Hero Image */}
          <Image
            source={require('../../../assets/carphoto.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Title & Subtitle */}
          <Text style={styles.title}>Enter your mobile number</Text>
          <Text style={styles.subtitle}>
            We'll send you a verification code to log in or{'\n'}create your CarFrnd account.
          </Text>

          {/* Phone Input */}
          <View style={[styles.inputContainer, error ? styles.inputError : null]}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.callingCode}>+91</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </View>

            <View style={styles.verticalDivider} />

            <TextInput
              style={styles.textInput}
              placeholder="99999 99999"
              placeholderTextColor="#A3A3A3"
              keyboardType="phone-pad"
              maxLength={11}
              value={phone}
              onChangeText={(val) => {
                setPhone(val);
                if (error) setError('');
              }}
            />
          </View>

          {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={handleContinue}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>

          {/* Create Account Link */}
          <TouchableOpacity
            style={styles.createAccountContainer}
            activeOpacity={0.7}
            onPress={() => onNavigate('CreateAccount')}
          >
            <Text style={styles.createAccountText}>
              Don't have an account?{' '}
              <Text style={styles.createAccountLink}>Create account</Text>
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or connect with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Button */}
          <TouchableOpacity
            style={styles.googleButton}
            activeOpacity={0.7}
            onPress={() => onNavigate('Home')}
          >
            <View style={styles.googleIconWrapper}>
              <Text style={[styles.googleLetter, { color: '#4285F4' }]}>G</Text>
              <Text style={[styles.googleLetter, { color: '#EA4335', marginLeft: -2 }]}>o</Text>
              <Text style={[styles.googleLetter, { color: '#FBBC05', marginLeft: -2 }]}>o</Text>
              <Text style={[styles.googleLetter, { color: '#4285F4', marginLeft: -2 }]}>g</Text>
              <Text style={[styles.googleLetter, { color: '#34A853', marginLeft: -2 }]}>l</Text>
              <Text style={[styles.googleLetter, { color: '#EA4335', marginLeft: -2 }]}>e</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  headerLogo: {
    width: 150,
    height: 48,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
    marginTop: -8,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: '100%',
  },
  flag: {
    fontSize: 18,
  },
  callingCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 6,
  },
  dropdownIcon: {
    fontSize: 9,
    color: '#64748B',
    marginLeft: 6,
  },
  verticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#CBD5E1',
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: Colors.magenta,
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  createAccountText: {
    fontSize: 14,
    color: '#64748B',
  },
  createAccountLink: {
    color: Colors.magenta,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconWrapper: {
    flexDirection: 'row',
    marginRight: 10,
  },
  googleLetter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
});
