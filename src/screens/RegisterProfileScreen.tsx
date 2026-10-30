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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Header } from '../components/Header';
import { CITIES } from '../config/constants';
import { User, MapPin, Mail, Sparkles, CheckCircle2 } from 'lucide-react-native';

type RegisterProfileProps = NativeStackScreenProps<RootStackParamList, 'RegisterProfile'>;

export default function RegisterProfileScreen({ navigation }: RegisterProfileProps) {
  const { registerProfile } = useAuth();
  const [name, setName] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bengaluru');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    setLoading(true);
    setError('');
    await registerProfile(name.trim(), selectedCity, email.trim() || undefined);
    setLoading(false);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header title="Complete Profile" subtitle="Just a few quick details" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Banner */}
          <View style={styles.banner}>
            <View style={styles.badgePill}>
              <Sparkles size={12} color={Colors.magenta} />
              <Text style={styles.badgeText}>WELCOME TO CARFRND</Text>
            </View>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>
              This name will be displayed when customer support or emergency teams assist your vehicle.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Full Name */}
            <Input
              label="Full Name *"
              placeholder="e.g. Rahul Verma"
              value={name}
              onChangeText={(val) => {
                setName(val);
                if (error) setError('');
              }}
              error={error}
              leftIcon={<User size={18} color={Colors.textMuted} />}
            />

            {/* City Selection */}
            <Text style={styles.cityLabel}>Select Your City</Text>
            <View style={styles.citiesGrid}>
              {CITIES.map((city) => {
                const isSelected = selectedCity === city;
                return (
                  <TouchableOpacity
                    key={city}
                    onPress={() => setSelectedCity(city)}
                    activeOpacity={0.7}
                    style={[
                      styles.cityChip,
                      isSelected && styles.cityChipSelected,
                    ]}
                  >
                    {isSelected && (
                      <CheckCircle2 size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
                    )}
                    <Text
                      style={[
                        styles.cityChipText,
                        isSelected && styles.cityChipTextSelected,
                      ]}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Email Address */}
            <Input
              label="Email Address (Optional)"
              placeholder="e.g. rahul@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              leftIcon={<Mail size={18} color={Colors.textMuted} />}
              hint="For invoice receipts & order dispatch updates"
              containerStyle={{ marginTop: Spacing.md }}
            />

            <Button
              title="Continue to Dashboard"
              onPress={handleRegister}
              loading={loading}
              size="lg"
              style={{ marginTop: Spacing.md }}
            />
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
    paddingBottom: Spacing.xxxl,
  },
  banner: {
    marginBottom: Spacing.xl,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.magenta,
    marginLeft: 4,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSub,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    ...Shadows.card,
  },
  cityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMain,
    marginBottom: Spacing.sm,
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.xs + 2,
    marginBottom: Spacing.xs + 2,
  },
  cityChipSelected: {
    backgroundColor: Colors.magenta,
    borderColor: Colors.magenta,
  },
  cityChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSub,
  },
  cityChipTextSelected: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
});
