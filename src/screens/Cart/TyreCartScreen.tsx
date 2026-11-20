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

export default function TyreCartScreen({ onNavigate }: { onNavigate: any }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('SelectInstaller')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tyre Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Cart Item - Tyre */}
        <View style={styles.cartCard}>
          <View style={styles.cartHeaderRow}>
            <View style={styles.cartTitleCol}>
              <Text style={styles.cartItemTitle}>Michelin Primacy 4</Text>
            </View>
            <View style={styles.counterBtn}>
              <Text style={styles.counterText}>4 Tyres</Text>
            </View>
          </View>

          <Text style={styles.cartItemSub}>205/55 R16 91V • Tubeless Radial</Text>
          <Text style={styles.cartItemPrice}>₹25,800</Text>

          <View style={styles.dashedDivider} />

          {/* Installer */}
          <View style={styles.addonRow}>
            <View style={styles.addonLeft}>
              <View style={styles.magentaDot} />
              <View>
                <Text style={styles.addonTitle}>Fitment at PitStop Tyre Care</Text>
                <Text style={styles.addonDesc}>Indiranagar 100ft Rd • 2.4 km</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => onNavigate('SelectInstaller')}>
              <Icon name="edit-2" size={14} color={Colors.magenta} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Details */}
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Bill Breakdown</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total (4x)</Text>
            <Text style={styles.billValue}>₹25,800</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Fitment & 3D Wheel Balancing</Text>
            <Text style={[styles.billValue, { color: '#10B981' }]}>FREE</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>GST (18% Included)</Text>
            <Text style={styles.billValue}>Included</Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.billRowTotal}>
            <Text style={styles.billTotalLabel}>Grand Total</Text>
            <Text style={styles.billTotalValue}>₹25,800</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={() => onNavigate('TyreCheckout')}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Fitment Schedule</Text>
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
  cartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginBottom: 16,
  },
  cartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cartTitleCol: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  counterBtn: {
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  counterText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.magenta,
  },
  cartItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  cartItemPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.magenta,
    marginBottom: 14,
  },
  dashedDivider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginBottom: 14,
  },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  magentaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.magenta,
    marginRight: 10,
  },
  addonTitle: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  addonDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  editBtn: {
    padding: 6,
  },
  billCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginBottom: 24,
  },
  billTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  billRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  billTotalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.magenta,
  },
  checkoutBtn: {
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
  checkoutBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
