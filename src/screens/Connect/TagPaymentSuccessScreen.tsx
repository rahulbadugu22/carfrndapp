import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function TagPaymentSuccessScreen({
  onNavigate,
  routeParams,
}: {
  onNavigate: any;
  routeParams?: any;
}) {
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  const orderId = routeParams?.orderId || '#CFD-10492';
  const address = routeParams?.address || '123, Palm Grove Apartments...';

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
          <Icon name="check" size={48} color={Colors.magenta} />
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim, alignItems: 'center', width: '100%' }}>
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.successSubtitle}>Your CarFrnd Smart Decal is being dispatched.</Text>

          <View style={styles.orderCard}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Order ID</Text>
              <Text style={styles.orderValue}>{orderId}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Estimated Delivery</Text>
              <Text style={styles.orderValue}>3 - 5 Business Days</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Shipping Address</Text>
              <Text style={styles.orderValue} numberOfLines={2}>
                {address}
              </Text>
            </View>
          </View>

          <Text style={styles.instructionText}>
            Once delivered, simply scan the QR code on the sticker using the app scanner to activate your 100% private masked contact link.
          </Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => onNavigate('ConnectHome')}>
            <Text style={styles.primaryBtnText}>Back to Connect Dashboard</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.magentaLight,
    borderWidth: 2,
    borderColor: Colors.magentaBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginBottom: 20,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  orderLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  orderValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  instructionText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: Colors.magenta,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
