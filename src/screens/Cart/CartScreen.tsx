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

export default function CartScreen({ onNavigate }: { onNavigate: any }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('ServiceDetails')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Cart Item */}
        <View style={styles.cartCard}>
          <View style={styles.cartHeaderRow}>
            <View style={styles.cartTitleCol}>
              <Text style={styles.cartItemTitle}>Complete Showroom Detail</Text>
            </View>
            <View style={styles.counterBtn}>
              <Text style={styles.counterText}>1x</Text>
            </View>
          </View>

          <Text style={styles.cartItemSub}>Car Detailing Studio • 180-240 min</Text>
          <Text style={styles.cartItemPrice}>₹2499</Text>

          <View style={styles.dashedDivider} />

          {/* Add-ons */}
          <View style={styles.addonRow}>
            <View style={styles.addonLeft}>
              <View style={styles.magentaDot} />
              <Text style={styles.addonTitle}>
                Tyre Polish & Gloss <Text style={styles.addonPrice}>₹99</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn}>
              <Icon name="trash-2" size={14} color="#EA4335" />
            </TouchableOpacity>
          </View>

          <View style={styles.addonRow}>
            <View style={styles.addonLeft}>
              <View style={styles.magentaDot} />
              <Text style={styles.addonTitle}>
                Ceramic Spray Coat <Text style={styles.addonPrice}>₹999</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn}>
              <Icon name="trash-2" size={14} color="#EA4335" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add more services button */}
        <TouchableOpacity style={styles.addMoreBtn} onPress={() => onNavigate('ServiceDetails')}>
          <Icon name="plus" size={16} color={Colors.magenta} style={{ marginRight: 8 }} />
          <Text style={styles.addMoreText}>Add more services</Text>
        </TouchableOpacity>

        {/* Bill Details */}
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Bill Details</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>₹3597</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Doorstep Delivery / Convenience</Text>
            <Text style={[styles.billValue, { color: '#10B981' }]}>FREE</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes (GST 18%)</Text>
            <Text style={styles.billValue}>₹200</Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.billRowTotal}>
            <Text style={styles.billTotalLabel}>To Pay</Text>
            <Text style={styles.billTotalValue}>₹3797</Text>
          </View>
        </View>

        {/* Proceed to Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={() => onNavigate('Checkout')}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout • ₹3797</Text>
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
    fontSize: 12,
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
    fontWeight: '800',
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
    marginBottom: 10,
  },
  addonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  magentaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.magenta,
    marginRight: 8,
  },
  addonTitle: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  addonPrice: {
    fontWeight: '700',
    color: Colors.magenta,
  },
  deleteBtn: {
    padding: 4,
  },
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.magenta,
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
    marginBottom: 14,
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
    height: 54,
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
