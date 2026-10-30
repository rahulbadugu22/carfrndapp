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
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import {
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  MessageSquare,
  Clock,
  Car,
  QrCode,
  ArrowRight,
} from 'lucide-react-native';

type ScanSubmittedProps = NativeStackScreenProps<RootStackParamList, 'ScanSubmitted'>;

export default function ScanSubmittedScreen({ route, navigation }: ScanSubmittedProps) {
  const { alert } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Icon Center */}
        <View style={styles.successIconBox}>
          <View style={styles.successOuterCircle}>
            <CheckCircle2 size={54} color={Colors.magenta} />
          </View>
          <View style={styles.refPill}>
            <Text style={styles.refPillText}>ALERT REF: {alert.alertId}</Text>
          </View>
          <Text style={styles.title}>SMS Alert Sent Successfully!</Text>
          <Text style={styles.subtitle}>
            The vehicle owner has been immediately alerted via SMS & Push notification on their phone.
          </Text>
        </View>

        {/* Dispatch Summary Card */}
        <View style={styles.card}>
          <View style={styles.vehicleRow}>
            <View style={styles.carIconBox}>
              <Car size={20} color={Colors.magenta} />
            </View>
            <View style={styles.vehicleTexts}>
              <Text style={styles.plateNumber}>{alert.vehiclePlate}</Text>
              <Text style={styles.alertReason}>{alert.reasonLabel}</Text>
            </View>
            <View style={styles.timeBadge}>
              <Clock size={12} color={Colors.textMuted} />
              <Text style={styles.timeText}>{alert.timestamp}</Text>
            </View>
          </View>

          {alert.customNote ? (
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>YOUR NOTE:</Text>
              <Text style={styles.noteContent}>"{alert.customNote}"</Text>
            </View>
          ) : null}

          <View style={styles.divider} />

          {/* Delivery Channels Checklist */}
          <Text style={styles.channelsTitle}>MULTI-CHANNEL DELIVERY STATUS</Text>

          <View style={styles.channelItem}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.channelLabel}>Instant Push Notification</Text>
            <Text style={styles.channelStatus}>DELIVERED</Text>
          </View>

          <View style={styles.channelItem}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.channelLabel}>SMS Alert to Registered Mobile</Text>
            <Text style={styles.channelStatus}>SENT</Text>
          </View>

          <View style={styles.channelItem}>
            <CheckCircle2 size={16} color="#10B981" />
            <Text style={styles.channelLabel}>WhatsApp Smart Alert</Text>
            <Text style={styles.channelStatus}>TRIGGERED</Text>
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyBox}>
          <ShieldCheck size={16} color="#065F46" />
          <Text style={styles.privacyText}>
            Privacy Guaranteed: Neither your phone number nor the owner's personal number was revealed during this interaction.
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.actionsColumn}>
          <Button
            title="Scan Another Vehicle Tag"
            onPress={() => navigation.replace('ScanQr')}
            variant="outline"
            icon={<QrCode size={18} color={Colors.magenta} />}
            size="lg"
            style={{ marginBottom: Spacing.sm }}
          />

          <Button
            title="Return to Home Dashboard"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            }
            variant="primary"
            size="lg"
          />
        </View>
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
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.huge,
  },
  successIconBox: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  successOuterCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.magentaLight,
    borderWidth: 2,
    borderColor: Colors.magentaBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.subtle,
  },
  refPill: {
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    marginBottom: Spacing.sm,
  },
  refPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textMain,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vehicleTexts: {
    flex: 1,
  },
  plateNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textMain,
    letterSpacing: 0.8,
  },
  alertReason: {
    fontSize: 13,
    color: Colors.magenta,
    fontWeight: '600',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  noteBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  noteLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  noteContent: {
    fontSize: 13,
    color: Colors.textMain,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.md,
  },
  channelsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  channelLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.textMain,
    fontWeight: '500',
    marginLeft: Spacing.sm,
  },
  channelStatus: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  privacyText: {
    fontSize: 12,
    color: '#065F46',
    marginLeft: Spacing.sm,
    lineHeight: 17,
    flex: 1,
    fontWeight: '500',
  },
  actionsColumn: {
    width: '100%',
  },
});
