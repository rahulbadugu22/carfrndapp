import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useScan } from '../context/ScanContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import {
  QrCode,
  Zap,
  Camera,
  Flashlight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
} from 'lucide-react-native';
import {
  Camera as VisionCameraView,
  useCameraDevice,
  useCameraPermission,
  useObjectOutput,
} from 'react-native-vision-camera';
import { DEMO_TAGS } from '../config/constants';

type ScanQrScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ScanQr'>;
};

export default function ScanQrScreen({ navigation }: ScanQrScreenProps) {
  const { scanTagByToken } = useScan();
  const [torchOn, setTorchOn] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Hardware Camera Hooks
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  // Animated laser beam up and down
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 240,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const handleProcessToken = async (token: string) => {
    if (!token.trim()) return;
    setIsProcessing(true);

    const res = await scanTagByToken(token.trim());
    setIsProcessing(false);

    if (res.success && res.data) {
      if (res.data.status === 'ASSIGNED' || res.data.status === 'UNASSIGNED') {
        // Tag needs activation -> route to activation & account creation flow
        navigation.navigate('ActivateTag', { prefillTag: res.data.serialNumber });
      } else {
        // Tag is active -> verify physical presence by entering plate digits before opening public contact
        navigation.navigate('ScanVerification', { token: res.data.token });
      }
    }
  };

  const handleScannedValue = (rawValue: string) => {
    if (!rawValue || isProcessing) return;
    Vibration.vibrate(100);

    // Extract token if scanner read full URL (e.g. https://carfrnd.com/scan/slug or https://findowner.carfrnd.com/q/slug)
    let parsed = rawValue.trim();
    if (parsed.includes('/scan/')) {
      parsed = parsed.split('/scan/').pop() || parsed;
    } else if (parsed.includes('/q/')) {
      parsed = parsed.split('/q/').pop() || parsed;
    }
    parsed = parsed.split('?')[0].replace(/\/+$/, '');

    handleProcessToken(parsed);
  };

  const objectOutput = useObjectOutput({
    types: ['qr'],
    onObjectsScanned(objects) {
      if (isProcessing || !objects || objects.length === 0) return;
      const code = objects[0] as any;
      if (code && code.value) {
        handleScannedValue(code.value);
      }
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Scan Vehicle Tag"
        subtitle="Point camera at the CarFrnd QR decal"
        style={styles.header}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Top Instruction Pill */}
          <View style={styles.instructionPill}>
            <ShieldCheck size={14} color="#10B981" />
            <Text style={styles.instructionText}>
              End-to-End Privacy Protected Vehicle Scanner
            </Text>
          </View>

          {/* Hardware Camera Viewfinder with Augmented Overlays */}
          <View style={styles.viewfinderContainer}>
            {device != null && hasPermission ? (
              <VisionCameraView
                style={StyleSheet.absoluteFill}
                device={device}
                outputs={[objectOutput]}
                isActive={!isProcessing}
              />
            ) : !hasPermission ? (
              <View style={styles.permissionBox}>
                <Camera size={34} color={Colors.magenta} style={{ marginBottom: 8 }} />
                <Text style={styles.permissionTitle}>Camera Access Required</Text>
                <Text style={styles.permissionSub}>
                  Allow camera permission to scan physical CarFrnd decals directly.
                </Text>
                <TouchableOpacity
                  style={styles.permissionBtn}
                  onPress={requestPermission}
                  activeOpacity={0.8}
                >
                  <Text style={styles.permissionBtnText}>Enable Camera</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {/* Corner Brackets */}
            <View style={[styles.cornerBracket, styles.topLeft]} />
            <View style={[styles.cornerBracket, styles.topRight]} />
            <View style={[styles.cornerBracket, styles.bottomLeft]} />
            <View style={[styles.cornerBracket, styles.bottomRight]} />

            {/* Laser scanning beam overlay */}
            <View style={styles.viewfinderTarget} pointerEvents="none">
              <Animated.View
                style={[
                  styles.laserBeam,
                  {
                    transform: [{ translateY: scanAnim }],
                  },
                ]}
              />

              {(!device || !hasPermission) && (
                <>
                  <QrCode size={80} color="rgba(255, 43, 133, 0.25)" />
                  <Text style={styles.centerHint}>Align QR tag within frame</Text>
                </>
              )}
            </View>

            {/* Torch Toggle Floating Button */}
            <TouchableOpacity
              style={[styles.torchButton, torchOn && styles.torchButtonActive]}
              onPress={() => setTorchOn(!torchOn)}
              activeOpacity={0.7}
            >
              <Flashlight size={20} color={torchOn ? '#0F172A' : '#FFFFFF'} />
            </TouchableOpacity>
          </View>

          {/* Quick Demo Test Buttons */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>QUICK DEMO VEHICLES (TAP TO SCAN)</Text>
            <View style={styles.demoChipsRow}>
              {DEMO_TAGS.map((demo) => (
                <TouchableOpacity
                  key={demo.token}
                  style={styles.demoChip}
                  onPress={() => handleProcessToken(demo.token)}
                  activeOpacity={0.8}
                >
                  <Sparkles size={11} color={Colors.magenta} />
                  <Text style={styles.demoChipText}>
                    {demo.maskedPlate || demo.token}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Manual Tag Token Input Bar */}
          <View style={styles.manualInputCard}>
            <Text style={styles.manualLabel}>Or enter Tag Serial ID manually:</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <Search size={16} color={Colors.textMuted} style={{ marginRight: 6 }} />
                <TextInput
                  placeholder="e.g. CFD-BLR-000001"
                  placeholderTextColor="#64748B"
                  value={manualToken}
                  onChangeText={setManualToken}
                  style={styles.textInput}
                  autoCapitalize="characters"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.submitTokenBtn,
                  !manualToken.trim() && styles.submitTokenBtnDisabled,
                ]}
                onPress={() => handleProcessToken(manualToken)}
                disabled={!manualToken.trim() || isProcessing}
                activeOpacity={0.8}
              >
                <ArrowRight size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  header: {
    backgroundColor: '#0B0F19',
    borderBottomColor: '#1E293B',
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
  },
  instructionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    marginBottom: Spacing.lg,
  },
  instructionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34D399',
    marginLeft: 6,
  },
  viewfinderContainer: {
    width: 270,
    height: 270,
    backgroundColor: 'rgba(19, 27, 46, 0.7)',
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  viewfinderTarget: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  laserBeam: {
    position: 'absolute',
    top: 10,
    width: '90%',
    height: 3,
    backgroundColor: Colors.magenta,
    borderRadius: 2,
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  centerHint: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
  },
  cornerBracket: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: Colors.magenta,
  },
  topLeft: {
    top: 12,
    left: 12,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 6,
  },
  topRight: {
    top: 12,
    right: 12,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 6,
  },
  bottomLeft: {
    bottom: 12,
    left: 12,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 6,
  },
  bottomRight: {
    bottom: 12,
    right: 12,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 6,
  },
  torchButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  torchButtonActive: {
    backgroundColor: '#FDE047',
    borderColor: '#EAB308',
  },
  demoSection: {
    width: '100%',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  demoTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  demoChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  demoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 43, 133, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 43, 133, 0.4)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    margin: 4,
  },
  demoChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  manualInputCard: {
    width: '100%',
    backgroundColor: '#131B2E',
    borderWidth: 1,
    borderColor: '#23304E',
    borderRadius: Radius.xl,
    padding: Spacing.lg,
  },
  manualLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: Spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B0F19',
    borderWidth: 1.5,
    borderColor: '#23304E',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    marginRight: Spacing.sm,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  submitTokenBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.magentaGlow,
  },
  submitTokenBtnDisabled: {
    opacity: 0.4,
  },
  permissionBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    zIndex: 2,
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  permissionSub: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: Spacing.md,
  },
  permissionBtn: {
    backgroundColor: Colors.magenta,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
  },
  permissionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
