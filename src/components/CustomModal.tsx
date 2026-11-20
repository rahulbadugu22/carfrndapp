import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from './Icon';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export interface CustomModalProps {
  visible: boolean;
  type?: 'success' | 'warning' | 'info' | 'emergency';
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

export default function CustomModal({
  visible,
  type = 'success',
  title,
  message,
  buttonText = 'Got it',
  onClose,
}: CustomModalProps) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  const getIconDetails = () => {
    switch (type) {
      case 'success':
        return { name: 'check-circle', color: Colors.magenta, bg: Colors.magentaLight };
      case 'warning':
        return { name: 'alert-triangle', color: '#F59E0B', bg: '#FEF3C7' };
      case 'emergency':
        return { name: 'alert-circle', color: '#DC2626', bg: '#FEE2E2' };
      case 'info':
      default:
        return { name: 'info', color: Colors.magenta, bg: Colors.magentaLight };
    }
  };

  const iconDetails = getIconDetails();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Top Icon Badge */}
          <View style={[styles.iconWrapper, { backgroundColor: iconDetails.bg }]}>
            <Icon name={iconDetails.name} size={32} color={iconDetails.color} />
          </View>

          {/* Title & Message */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.button,
              type === 'emergency'
                ? { backgroundColor: '#DC2626' }
                : { backgroundColor: Colors.magenta },
            ]}
            activeOpacity={0.85}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
