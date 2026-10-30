import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ViewStyle,
} from 'react-native';
import { Car, ShieldCheck, PhoneCall, Truck, QrCode } from 'lucide-react-native';
import { Vehicle } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Badge } from './Badge';

interface VehicleCardProps {
  vehicle: Vehicle;
  onShowQr?: (vehicle: Vehicle) => void;
  onToggleCallMasking?: (vehicleId: string) => void;
  onToggleTowingAlerts?: (vehicleId: string) => void;
  style?: ViewStyle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onShowQr,
  onToggleCallMasking,
  onToggleTowingAlerts,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Top Bar with Number Plate and Status */}
      <View style={styles.topRow}>
        <View style={styles.plateContainer}>
          <View style={styles.indStrip}>
            <Text style={styles.indText}>IND</Text>
          </View>
          <Text style={styles.plateText}>{vehicle.regNumber}</Text>
        </View>

        <Badge
          label={vehicle.status}
          variant={vehicle.status === 'ACTIVE' ? 'success' : 'warning'}
          dot
        />
      </View>

      {/* Model & Tag Info */}
      <View style={styles.infoRow}>
        <View style={styles.carIconBox}>
          <Car size={22} color={Colors.magenta} />
        </View>
        <View style={styles.modelColumn}>
          <Text style={styles.modelText}>{vehicle.makeModel}</Text>
          <View style={styles.tagIdRow}>
            <ShieldCheck size={13} color={Colors.textMuted} />
            <Text style={styles.tagIdText}>Tag: {vehicle.tagId}</Text>
          </View>
        </View>

        {onShowQr && (
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => onShowQr(vehicle)}
            activeOpacity={0.7}
          >
            <QrCode size={18} color={Colors.magenta} />
            <Text style={styles.qrButtonText}>QR Tag</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.divider} />

      {/* Security Features Toggles */}
      <View style={styles.featuresRow}>
        {/* Masked Calls Feature */}
        <View style={styles.featureItem}>
          <View style={styles.featureHeader}>
            <PhoneCall size={14} color={Colors.magenta} />
            <Text style={styles.featureTitle}>Masked Calls</Text>
          </View>
          <Text style={styles.featureDesc}>Hides phone number</Text>
          {onToggleCallMasking && (
            <Switch
              value={vehicle.callMasking}
              onValueChange={() => onToggleCallMasking(vehicle.id)}
              trackColor={{ false: Colors.border, true: Colors.magentaLight }}
              thumbColor={vehicle.callMasking ? Colors.magenta : '#f4f3f4'}
              style={styles.toggleSwitch}
            />
          )}
        </View>

        <View style={styles.verticalDivider} />

        {/* Towing Alerts Feature */}
        <View style={styles.featureItem}>
          <View style={styles.featureHeader}>
            <Truck size={14} color={Colors.info} />
            <Text style={styles.featureTitle}>Tow Alert</Text>
          </View>
          <Text style={styles.featureDesc}>Instant SMS & Push</Text>
          {onToggleTowingAlerts && (
            <Switch
              value={vehicle.towingAlerts}
              onValueChange={() => onToggleTowingAlerts(vehicle.id)}
              trackColor={{ false: Colors.border, true: Colors.infoLight }}
              thumbColor={vehicle.towingAlerts ? Colors.info : '#f4f3f4'}
              style={styles.toggleSwitch}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0F172A',
    borderRadius: Radius.xs,
    overflow: 'hidden',
    paddingVertical: 2,
    paddingRight: 8,
  },
  indStrip: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginRight: 6,
    borderRadius: 2,
  },
  indText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  plateText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1.2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  carIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  modelColumn: {
    flex: 1,
  },
  modelText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 2,
  },
  tagIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagIdText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    marginLeft: 4,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
  },
  qrButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.sm,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
  },
  featureItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.md,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMain,
    marginLeft: 4,
  },
  featureDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginLeft: -4,
  },
});
