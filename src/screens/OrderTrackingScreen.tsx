import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import {
  CheckCircle2,
  Truck,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';

type OrderTrackingProps = NativeStackScreenProps<RootStackParamList, 'OrderTracking'>;

const TIMELINE = [
  {
    status: 'Order Placed & Confirmed',
    time: 'Today, Just now',
    done: true,
    desc: 'Decal manufacturing & QR code provisioning initiated.',
  },
  {
    status: 'Printed & Quality Inspected',
    time: 'Estimated tomorrow',
    done: true,
    desc: 'Weatherproof vinyl laminate tested for UV & rain resilience.',
  },
  {
    status: 'Dispatched via Express Courier',
    time: 'In 2 days',
    done: false,
    desc: 'Tracking ID assigned with BlueDart / Delhivery.',
  },
  {
    status: 'Out for Doorstep Delivery',
    time: 'Estimated in 3-5 days',
    done: false,
    desc: 'Courier agent will deliver package directly to your address.',
  },
];

export default function OrderTrackingScreen({ route, navigation }: OrderTrackingProps) {
  const { orderId } = route.params;
  const { orders } = useAuth();

  const currentOrder = orders.find((o) => o.orderId === orderId) || {
    orderId,
    date: 'Today',
    quantity: 1,
    totalPrice: 450,
    status: 'Processing',
    vehicleNo: 'KA 01 MJ 8820',
    address: 'Koramangala, Bengaluru - 560034',
    trackingNumber: 'TRK-IN-90812345',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
        title="Track Tag Order"
        subtitle={`Order Ref: ${currentOrder.orderId}`}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Top Banner */}
        <View style={styles.statusBanner}>
          <View style={styles.truckCircle}>
            <Truck size={28} color={Colors.magenta} />
          </View>
          <Text style={styles.statusTitle}>Order Confirmed & In Production</Text>
          <Text style={styles.trackingSub}>
            Tracking ID: <Text style={styles.trackingBold}>{currentOrder.trackingNumber}</Text>
          </Text>
        </View>

        {/* Order Info Card */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vehicle Assigned:</Text>
            <Text style={styles.infoVal}>{currentOrder.vehicleNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Quantity:</Text>
            <Text style={styles.infoVal}>{currentOrder.quantity} Tag(s)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Paid Amount:</Text>
            <Text style={[styles.infoVal, { color: Colors.magenta, fontWeight: '800' }]}>
              ₹{currentOrder.totalPrice} (Incl. GST)
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Delivery Address:</Text>
            <Text style={[styles.infoVal, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>
              {currentOrder.address}
            </Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>DELIVERY TIMELINE</Text>

          {TIMELINE.map((step, idx) => (
            <View key={idx} style={styles.timelineRow}>
              <View style={styles.markerColumn}>
                <View
                  style={[
                    styles.markerDot,
                    step.done ? styles.markerDotDone : styles.markerDotPending,
                  ]}
                >
                  {step.done ? <CheckCircle2 size={12} color="#FFFFFF" /> : null}
                </View>
                {idx < TIMELINE.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      step.done && styles.timelineLineDone,
                    ]}
                  />
                )}
              </View>

              <View style={styles.timelineContent}>
                <View style={styles.timelineHeaderRow}>
                  <Text
                    style={[
                      styles.timelineStatus,
                      step.done && styles.timelineStatusDone,
                    ]}
                  >
                    {step.status}
                  </Text>
                </View>
                <Text style={styles.timelineTime}>{step.time}</Text>
                <Text style={styles.timelineDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <Button
          title="Back to Dashboard"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }
          size="lg"
          style={{ marginTop: Spacing.lg }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.huge,
  },
  statusBanner: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  truckCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textMain,
    textAlign: 'center',
    marginBottom: 4,
  },
  trackingSub: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  trackingBold: {
    color: Colors.textMain,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMain,
  },
  timelineCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    ...Shadows.card,
  },
  timelineTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.lg,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  markerColumn: {
    alignItems: 'center',
    width: 24,
    marginRight: Spacing.md,
  },
  markerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDotDone: {
    backgroundColor: '#10B981',
  },
  markerDotPending: {
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
  timelineLineDone: {
    backgroundColor: '#10B981',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.lg,
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineStatus: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  timelineStatusDone: {
    color: Colors.textMain,
  },
  timelineTime: {
    fontSize: 11,
    color: Colors.magenta,
    fontWeight: '600',
    marginTop: 1,
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 12,
    color: Colors.textSub,
    lineHeight: 16,
  },
});
