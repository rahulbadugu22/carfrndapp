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

export default function CheckoutScreen({ onNavigate }: { onNavigate: any }) {
  const frequentAddons = [
    { id: 1, title: 'Interior Vacuum', price: '+₹149', icon: 'wind' },
    { id: 2, title: 'Dashboard Polish', price: '+₹199', icon: 'sun' },
    { id: 3, title: 'Hydrophobic Wax', price: '+₹299', icon: 'shield' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Cart')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Service Location</Text>
        <View style={styles.locationCard}>
          <View style={styles.locationIconWrapper}>
            <Icon name="map-pin" size={18} color={Colors.magenta} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Primary Address</Text>
            <Text style={styles.locationAddress}>
              Indiranagar 100ft Road, Bengaluru, Karnataka 560038
            </Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('Location')}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemText}>Complete Showroom Detail</Text>
            <Text style={styles.summaryItemPriceText}>₹2499</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summarySubItemText}>Tyre Polish & Gloss</Text>
            <Text style={styles.summarySubItemPriceText}>₹99</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summarySubItemText}>Ceramic Spray Coat</Text>
            <Text style={styles.summarySubItemPriceText}>₹999</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summarySubItemText}>GST & Convenience Fee</Text>
            <Text style={styles.summarySubItemPriceText}>₹200</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>Grand Total</Text>
            <Text style={styles.summaryTotalValue}>₹3797</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Frequently Added Together</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.addonScroll}
        >
          {frequentAddons.map((addon) => (
            <View key={addon.id} style={styles.addonCard}>
              <View style={styles.addonIconContainer}>
                <Icon name={addon.icon} size={16} color={Colors.magenta} />
              </View>
              <Text style={styles.addonCardTitle}>{addon.title}</Text>
              <Text style={styles.addonCardPrice}>{addon.price}</Text>
              <TouchableOpacity style={styles.addonAddBtn}>
                <Text style={styles.addonAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Fixed Bottom Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payBtn} onPress={() => onNavigate('Payment')}>
          <Text style={styles.payText}>Proceed to Pay • ₹3797</Text>
          <Icon name="arrow-right" size={18} color="#ffffff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
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
    width: 38,
    height: 38,
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
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
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
    fontWeight: '700',
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
    fontSize: 18,
    fontWeight: '900',
    color: Colors.magenta,
  },
  addonScroll: {
    paddingBottom: 16,
  },
  addonCard: {
    width: 130,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  addonIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  addonCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 2,
  },
  addonCardPrice: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.magenta,
    marginBottom: 8,
  },
  addonAddBtn: {
    backgroundColor: Colors.magentaLight,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addonAddText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.magenta,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    padding: 16,
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
  payText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
