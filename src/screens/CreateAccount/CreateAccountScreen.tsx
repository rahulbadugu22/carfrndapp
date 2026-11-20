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
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function CreateAccountScreen({ onNavigate }: { onNavigate: any }) {
  const { registerProfile, sendOtp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [carCapacity, setCarCapacity] = useState('5 Seats');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carOptions = ['2 Seats', '5 Seats', '7 Seats'];

  const handleSendOtp = async () => {
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);

    const formatted = `+91 ${clean.slice(-10)}`;
    await sendOtp(formatted);
    await registerProfile(fullName.trim(), city.trim());
    setLoading(false);

    onNavigate('VerifyOTP', { phone: formatted, name: fullName.trim() });
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
          <Text style={styles.title}>Create CarFrnd Account</Text>
          <Text style={styles.subtitle}>
            Join CarFrnd for smart vehicle tag protection, masked calls & doorstep car care.
          </Text>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Full Name */}
            <Text style={styles.inputLabel}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Icon name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Rahul Sharma"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Mobile Number */}
            <Text style={styles.inputLabel}>Mobile Number *</Text>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={18} color="#94A3B8" style={styles.inputIcon} />
              <Text style={styles.callingCode}>+91</Text>
              <View style={styles.verticalDivider} />
              <TextInput
                style={styles.textInput}
                placeholder="98765 43210"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* City */}
            <Text style={styles.inputLabel}>City</Text>
            <View style={styles.inputContainer}>
              <Icon name="map-pin" size={18} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Bengaluru"
                placeholderTextColor="#94A3B8"
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* Car Capacity Dropdown */}
            <Text style={styles.inputLabel}>Car Capacity</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.8}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Icon name="truck" size={18} color="#94A3B8" style={styles.inputIcon} />
              <Text style={[styles.textInput, { paddingTop: 16 }]}>
                {carCapacity}
              </Text>
              <Icon
                name={showDropdown ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#0F172A"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                {carOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setCarCapacity(option);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

          {/* Send OTP Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={handleSendOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Send OTP Verification</Text>
            )}
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 24,
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
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginBottom: 24,
  },
  form: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    height: 52,
    marginBottom: 16,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  callingCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  dropdownList: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginTop: -8,
    marginBottom: 16,
    paddingVertical: 6,
    elevation: 3,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  primaryButton: {
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
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  termsLink: {
    color: Colors.magenta,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    height: 52,
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
    fontSize: 17,
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
