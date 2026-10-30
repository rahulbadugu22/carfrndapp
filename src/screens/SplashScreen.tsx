import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { ShieldCheck, Sparkles } from 'lucide-react-native';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: SplashScreenProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false,
      }),
    ]).start();

    // Navigate once loading completes
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isLoggedIn) {
          navigation.replace('Home');
        } else {
          navigation.replace('Onboarding');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, isLoggedIn]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Decorative background glow circles */}
      <View style={styles.glowCircleTop} />
      <View style={styles.glowCircleBottom} />

      {/* Animated Brand Center */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.badgePill}>
          <Sparkles size={13} color={Colors.magenta} />
          <Text style={styles.badgeText}>SMART VEHICLE SECURITY</Text>
        </View>

        <Text style={styles.tagline}>
          Protect Your Phone Number.{'\n'}
          Get Instant Vehicle & Parking Alerts.
        </Text>
      </Animated.View>

      {/* Bottom Loading Progress Bar & Security Badge */}
      <View style={styles.bottomContainer}>
        <View style={styles.progressBarTrack}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>

        <View style={styles.securityRow}>
          <ShieldCheck size={14} color="#10B981" />
          <Text style={styles.securityText}>Masked Calls & Cloud Privacy</Text>
        </View>

        <Text style={styles.versionText}>v1.0.0 • Made for Smart Drivers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  glowCircleTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.magenta,
    opacity: 0.15,
  },
  glowCircleBottom: {
    position: 'absolute',
    bottom: -100,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.magentaDark,
    opacity: 0.12,
  },
  logoContainer: {
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logoWrapper: {
    width: 240,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 43, 133, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 43, 133, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 16,
  },
  badgeText: {
    color: Colors.magenta,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.darkMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  progressBarTrack: {
    width: 140,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.magenta,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  securityText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  versionText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
});
