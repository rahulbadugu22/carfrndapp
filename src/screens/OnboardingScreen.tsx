import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { ShieldCheck, PhoneCall, Truck, Sparkles, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const SLIDES = [
  {
    id: 1,
    tag: 'PRIVACY FIRST',
    title: 'Your Personal Phone Number Stays 100% Private',
    description:
      'Never paste your personal phone number on your windshield. Callers reach you through an encrypted, anonymous cloud voice bridge.',
    icon: PhoneCall,
    color: Colors.magenta,
  },
  {
    id: 2,
    tag: 'INSTANT NOTIFICATIONS',
    title: 'Wrong-Parking & Towing Alerts In Seconds',
    description:
      'Blocked someone? Lights left ON? Vehicle getting towed? Anyone can scan your tag and dispatch an instant urgent alert straight to your phone.',
    icon: Truck,
    color: '#3B82F6',
  },
  {
    id: 3,
    tag: 'COMPLETE AUTO CARE',
    title: 'Smart Vehicle Security & Doorstep Services',
    description:
      'Weatherproof automotive tag with doorstep foam car wash, tyre inspection, e-challan checks, and emergency roadside assistance.',
    icon: Sparkles,
    color: '#10B981',
  },
];

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Top Header with Skip Button */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <Text style={styles.brandText}>CarFrnd</Text>
          </View>
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Center Card with Feature Graphics */}
        <View style={styles.slideContent}>
          <View style={[styles.iconCard, { borderColor: slide.color + '40' }]}>
            <View style={[styles.iconCircle, { backgroundColor: slide.color + '15' }]}>
              <IconComponent size={44} color={slide.color} />
            </View>
            <View style={[styles.shieldBadge, { backgroundColor: slide.color }]}>
              <ShieldCheck size={16} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>{slide.tag}</Text>
          </View>

          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        {/* Bottom Navigation with Dots & Next Button */}
        <View style={styles.bottomBar}>
          {/* Indicators */}
          <View style={styles.dotsRow}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentSlide ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.magenta,
    marginRight: 6,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    letterSpacing: -0.4,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  iconCard: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
    ...Shadows.card,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tagPill: {
    backgroundColor: Colors.magentaLight,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    marginBottom: Spacing.md,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.magenta,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textMain,
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.3,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 23,
  },
  bottomBar: {
    width: '100%',
    paddingBottom: Spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 28,
    backgroundColor: Colors.magenta,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: Colors.border,
  },
  actionButton: {
    backgroundColor: Colors.magenta,
    borderRadius: Radius.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.magentaGlow,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textWhite,
  },
});
