import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useScan } from '../../context/ScanContext';

export default function SecureCallScreen({
  onNavigate,
  routeParams,
}: {
  onNavigate: any;
  routeParams?: any;
}) {
  const { initiateMaskedCall } = useScan();
  const [callState, setCallState] = useState('Connecting to CarFrnd Virtual Bridge...');
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const pulseAnim = useState(new Animated.Value(1))[0];

  const plateNumber = routeParams?.plate || 'KA 01 MJ 8820';

  useEffect(() => {
    // Pulse animation for the avatar
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();

    // Call state progression
    const timer1 = setTimeout(() => {
      setCallState('Dialing Car Owner (Private Exotel Line)...');
    }, 2000);

    const timer2 = setTimeout(() => {
      setCallState('Ringing driver...');
    }, 4000);

    const timer3 = setTimeout(() => {
      setCallState('Connected • 90s Private Bridge');
    }, 7000);

    return () => {
      anim.stop();
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Duration counter once connected
  useEffect(() => {
    if (callState.includes('Connected')) {
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {/* Security Badge */}
        <View style={styles.header}>
          <Icon name="lock" size={14} color={Colors.magenta} style={{ marginRight: 6 }} />
          <Text style={styles.secureText}>End-to-End Encrypted Voice Bridge</Text>
        </View>

        {/* Main Info */}
        <View style={styles.mainInfo}>
          <Text style={styles.title}>Car Owner</Text>
          <Text style={styles.subtitle}>{plateNumber}</Text>
          <Text style={styles.callState}>
            {duration > 0 ? formatTime(duration) : callState}
          </Text>

          <View style={styles.avatarContainer}>
            <Animated.View
              style={[
                styles.pulseCircle,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <View style={styles.avatar}>
              <Icon name="phone" size={38} color={Colors.magenta} />
            </View>
          </View>

          <View style={styles.virtualNumberBadge}>
            <Text style={styles.virtualNumberText}>
              Virtual Line: +91 95138 86363
            </Text>
            <Text style={styles.virtualSubText}>
              Neither driver nor caller phone number is revealed
            </Text>
          </View>
        </View>

        {/* Call Controls */}
        <View style={styles.controls}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.controlBtn, muted && styles.controlBtnActive]}
              onPress={() => setMuted(!muted)}
            >
              <Icon name={muted ? 'mic-off' : 'mic'} size={24} color={muted ? '#FFFFFF' : '#0F172A'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlBtn, speaker && styles.controlBtnActive]}
              onPress={() => setSpeaker(!speaker)}
            >
              <Icon name="volume-2" size={24} color={speaker ? '#FFFFFF' : '#0F172A'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.endCallBtn}
            onPress={() => onNavigate('ConnectHome')}
            activeOpacity={0.85}
          >
            <Icon name="phone-off" size={30} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.endCallLabel}>End Call</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 43, 133, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 43, 133, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  secureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  mainInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.magenta,
    letterSpacing: 2,
    marginBottom: 12,
  },
  callState: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 36,
  },
  avatarContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  pulseCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 43, 133, 0.2)',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.magenta,
  },
  virtualNumberBadge: {
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  virtualNumberText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  virtualSubText: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  controls: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: 28,
  },
  controlBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnActive: {
    backgroundColor: Colors.magenta,
  },
  endCallBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 6,
  },
  endCallLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
});
