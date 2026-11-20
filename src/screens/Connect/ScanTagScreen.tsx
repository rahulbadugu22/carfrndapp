import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Platform,
  TextInput,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useScan } from '../../context/ScanContext';
import {
  Camera as VisionCameraView,
  useCameraDevice,
  useCameraPermission,
  useObjectOutput,
} from 'react-native-vision-camera';

const { width } = Dimensions.get('window');
const SCAN_SIZE = width * 0.72;

export default function ScanTagScreen({
  onNavigate,
  routeParams,
}: {
  onNavigate: any;
  routeParams?: { mode?: 'link' | 'contact'; prefillVehicleNo?: string };
}) {
  const { scanTagByToken } = useScan();
  const [flashOn, setFlashOn] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [processing, setProcessing] = useState(false);

  const isLinkMode = routeParams?.mode === 'link';
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  // Vision Camera Permission & Device
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: SCAN_SIZE - 4,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loopAnimation.start();
    return () => loopAnimation.stop();
  }, [scanLineAnim]);

  const handleProcessCode = async (rawCode: string) => {
    if (!rawCode.trim() || processing) return;
    setProcessing(true);
    Vibration.vibrate(80);

    let parsed = rawCode.trim();
    if (parsed.includes('/scan/')) {
      parsed = parsed.split('/scan/').pop() || parsed;
    } else if (parsed.includes('/q/')) {
      parsed = parsed.split('/q/').pop() || parsed;
    }
    parsed = parsed.split('?')[0].replace(/\/+$/, '');

    const res = await scanTagByToken(parsed);
    setProcessing(false);

    if (isLinkMode) {
      onNavigate('ConnectHome', {
        prefillTagCode: parsed.toUpperCase(),
        prefillVehicleNo: routeParams?.prefillVehicleNo || '',
        scannedFromCamera: true,
      });
    } else {
      onNavigate('ContactOwner', {
        token: parsed,
        tagData: res.data,
      });
    }
  };

  const objectOutput = useObjectOutput({
    types: ['qr'],
    onObjectsScanned(objects) {
      if (processing || !objects || objects.length === 0) return;
      const code = objects[0] as any;
      if (code && code.value) {
        handleProcessCode(code.value);
      }
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => onNavigate('ConnectHome')}
        >
          <Icon name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isLinkMode ? 'Scan Tag QR Code' : 'Scan CarFrnd Tag'}
        </Text>
        <TouchableOpacity
          style={[styles.iconBtn, flashOn && styles.iconBtnActive]}
          onPress={() => setFlashOn(!flashOn)}
        >
          <Icon
            name={flashOn ? 'zap' : 'zap-off'}
            size={20}
            color={flashOn ? Colors.magenta : '#ffffff'}
          />
        </TouchableOpacity>
      </View>

      {/* Main Viewfinder Section */}
      <View style={styles.container}>
        <View style={styles.viewfinderContainer}>
          {/* Hardware Camera View if available */}
          {device != null && hasPermission ? (
            <VisionCameraView
              style={StyleSheet.absoluteFill}
              device={device}
              outputs={[objectOutput]}
              isActive={!processing}
            />
          ) : null}

          {/* Target Frame Box */}
          <View style={styles.scanBox} pointerEvents="none">
            {/* Top-Left Corner */}
            <View style={[styles.corner, styles.topLeft]} />
            {/* Top-Right Corner */}
            <View style={[styles.corner, styles.topRight]} />
            {/* Bottom-Left Corner */}
            <View style={[styles.corner, styles.bottomLeft]} />
            {/* Bottom-Right Corner */}
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Moving Laser Beam */}
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: scanLineAnim }],
                },
              ]}
            />
          </View>
        </View>

        {/* Guidance Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>
            {isLinkMode ? 'Align Unique QR Code' : 'Position CarFrnd Tag in Frame'}
          </Text>
          <Text style={styles.instructionSubtitle}>
            {isLinkMode
              ? 'Point camera at the QR code printed on your physical decal to capture its Unique Code ID.'
              : 'Hold camera over the CarFrnd tag decal on the vehicle windshield to contact owner privately.'}
          </Text>
        </View>

        {/* Quick Demo Test Buttons */}
        <View style={styles.demoChipsRow}>
          <TouchableOpacity
            style={styles.demoChip}
            onPress={() => handleProcessCode('CFD-BLR-000001')}
          >
            <Text style={styles.demoChipText}>Demo Tag 1 (KA 01 MJ 8820)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.demoChip}
            onPress={() => handleProcessCode('CFD-BLR-002341')}
          >
            <Text style={styles.demoChipText}>Demo Tag 2 (Tata Nexon)</Text>
          </TouchableOpacity>
        </View>

        {/* Manual Code Input Bar */}
        <View style={styles.manualInputRow}>
          <TextInput
            style={styles.manualInput}
            placeholder="Or type Tag ID e.g. CFD-BLR-000001"
            placeholderTextColor="#64748B"
            value={manualCode}
            onChangeText={setManualCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={styles.manualSubmitBtn}
            onPress={() => handleProcessCode(manualCode)}
            disabled={!manualCode.trim()}
          >
            <Icon name="check" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 16,
    paddingBottom: 16,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnActive: {
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
  },
  viewfinderContainer: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    marginTop: 20,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: Colors.magenta,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: Colors.magenta,
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  instructionContainer: {
    alignItems: 'center',
    paddingHorizontal: 28,
    marginVertical: 14,
  },
  instructionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  instructionSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  demoChipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  demoChip: {
    backgroundColor: 'rgba(255, 43, 133, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 43, 133, 0.4)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  demoChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  manualInputRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    height: 50,
  },
  manualInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  manualSubmitBtn: {
    backgroundColor: Colors.magenta,
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
