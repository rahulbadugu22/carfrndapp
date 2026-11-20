import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function TyreCheckoutScreen({ onNavigate }: { onNavigate: any }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('TyreCart')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tyre Fitment Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Installer Hub</Text>
        <View style={styles.locationCard}>
          <View style={styles.locationIconWrapper}>
            <Icon name="map-pin" size={16} color={Colors.magenta} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>PitStop Tyre Care Center</Text>
            <Text style={styles.locationAddress}>
              Indiranagar 100ft Road, Bengaluru{'\n'}2.4 km away from you
            </Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('SelectInstaller')}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemText}>Michelin Primacy 4 (x4)</Text>
            <Text style={styles.summaryItemPriceText}>₹25,800</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summarySubItemText}>Laser Wheel Balancing & Alignment</Text>
            <Text style={[styles.summarySubItemPriceText, { color: '#10B981' }]}>FREE</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summarySubItemText}>Warranty</Text>
            <Text style={styles.summarySubItemPriceText}>5 Year Manufacturer Warranty</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>Grand Total</Text>
            <Text style={styles.summaryTotalValue}>₹25,800</Text>
          </View>
        </View>

        {/* Proceed to Payment Button */}
        <TouchableOpacity
          style={styles.payBtn}
          activeOpacity={0.85}
          onPress={() => onNavigate('TyrePayment')}
        >
          <Text style={styles.payBtnText}>Proceed to Payment • ₹25,800</Text>
          <Icon name="arrow-right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 20,
  },
  locationIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  locationAddress: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginTop: 2,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 8,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  summaryItemPriceText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  summarySubItemText: {
    fontSize: 12,
    color: '#64748B',
  },
  summarySubItemPriceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.magenta,
  },
  payBtn: {
    backgroundColor: Colors.magenta,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  payBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
