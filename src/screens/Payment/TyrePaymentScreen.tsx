import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import Icon from '../../components/Icon';

interface TyrePaymentScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  routeParams?: any;
}

export default function TyrePaymentScreen({ onNavigate, routeParams }: TyrePaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const amount = routeParams?.total || '₹16,499';

  const handlePay = () => {
    onNavigate('TyreOrderSuccess', {
      orderId: 'TYRE-' + Math.floor(1000 + Math.random() * 9000),
      installer: 'PitStop Tyre Care & Alignment',
      slot: 'Today, 04:30 PM',
      total: amount,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('TyreCheckout')}>
          <Icon name="arrow-left" size={20} color={Colors.slate} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tyre Fitment Payment</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Amount to Pay */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Payable</Text>
          <Text style={styles.amountValue}>{amount}</Text>
        </View>

        {/* UPI & Fast Payments */}
        <Text style={styles.sectionTitle}>UPI & Instant Pay</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('upi')}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#FDF2F8' }]}>
                <Icon name="smartphone" size={16} color={Colors.magenta} />
              </View>
              <View>
                <Text style={styles.optionText}>Google Pay / PhonePe / Paytm</Text>
                <Text style={styles.optionSubText}>Instant UPI 0% Convenience Fee</Text>
              </View>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'upi' && styles.radioCircleSelected]}>
              {selectedMethod === 'upi' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Saved Cards */}
        <Text style={styles.sectionTitle}>Credit & Debit Cards</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('card1')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}>
                <Icon name="credit-card" size={16} color={Colors.slate} />
              </View>
              <View>
                <Text style={styles.optionText}>•••• •••• •••• 4242</Text>
                <Text style={styles.optionSubText}>Expires 12/28 • HDFC Visa</Text>
              </View>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'card1' && styles.radioCircleSelected]}>
              {selectedMethod === 'card1' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
            <View style={styles.optionLeft}>
              <View style={styles.iconBoxAlt}>
                <Icon name="plus" size={16} color={Colors.magenta} />
              </View>
              <Text style={styles.optionText}>Add New Card</Text>
            </View>
            <Icon name="chevron-right" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Pay at Fitting Hub */}
        <Text style={styles.sectionTitle}>Other Options</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('cash')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconBoxAltYellow}>
                <Icon name="map-pin" size={16} color="#D97706" />
              </View>
              <View>
                <Text style={styles.optionText}>Pay at Fitting Centre</Text>
                <Text style={styles.optionSubText}>Pay after tyre fitment & balancing</Text>
              </View>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'cash' && styles.radioCircleSelected]}>
              {selectedMethod === 'cash' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.secureContainer}>
          <Icon name="shield" size={15} color={Colors.magenta} style={{ marginRight: 6 }} />
          <Text style={styles.secureText}>256-bit Bank Grade Encrypted Payment</Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payText}>Pay {amount}</Text>
          <Icon name="lock" size={14} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.slate,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
  },
  amountLabel: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.magenta,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.slate,
    marginBottom: 10,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBoxAlt: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBoxAltYellow: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.slate,
  },
  optionSubText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: Colors.magenta,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.magenta,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 64,
    marginRight: 16,
  },
  secureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  secureText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  payBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.magenta,
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  payText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
