import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function PaymentScreen({ onNavigate }: { onNavigate: any }) {
  const [selectedMethod, setSelectedMethod] = useState('gpay');

  const handlePay = () => {
    onNavigate('PaymentSuccess');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Checkout')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Amount to Pay */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Payable Amount</Text>
          <Text style={styles.amountValue}>₹3797</Text>
        </View>

        {/* UPI Apps */}
        <Text style={styles.sectionTitle}>UPI Payment Apps</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('gpay')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}>
                <Image
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png',
                  }}
                  style={styles.appIcon}
                />
              </View>
              <Text style={styles.optionText}>Google Pay UPI</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === 'gpay' && styles.radioCircleSelected,
              ]}
            >
              {selectedMethod === 'gpay' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('phonepe')}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#5F259F' }]}>
                <Text style={styles.appIconText}>पे</Text>
              </View>
              <Text style={styles.optionText}>PhonePe UPI</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === 'phonepe' && styles.radioCircleSelected,
              ]}
            >
              {selectedMethod === 'phonepe' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('paytm')}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#00B9F1' }]}>
                <Text style={[styles.appIconText, { color: '#ffffff' }]}>Pay</Text>
              </View>
              <Text style={styles.optionText}>Paytm / Any UPI ID</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === 'paytm' && styles.radioCircleSelected,
              ]}
            >
              {selectedMethod === 'paytm' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Cards */}
        <Text style={styles.sectionTitle}>Cards & NetBanking</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => setSelectedMethod('card')}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}>
                <Icon name="credit-card" size={18} color={Colors.magenta} />
              </View>
              <Text style={styles.optionText}>Credit / Debit Card</Text>
            </View>
            <View
              style={[
                styles.radioCircle,
                selectedMethod === 'card' && styles.radioCircleSelected,
              ]}
            >
              {selectedMethod === 'card' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Security badge */}
        <View style={styles.securityBox}>
          <Icon name="shield-check" size={16} color={Colors.magenta} />
          <Text style={styles.securityText}>
            256-Bit Encrypted Razorpay & Stripe Bank Gateway
          </Text>
        </View>

        <TouchableOpacity style={styles.payBtn} activeOpacity={0.85} onPress={handlePay}>
          <Text style={styles.payBtnText}>Pay Securely • ₹3797</Text>
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
  amountCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.magenta,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  optionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appIcon: {
    width: 22,
    height: 22,
  },
  appIconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.magentaLight,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
    marginBottom: 24,
  },
  securityText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 6,
  },
  payBtn: {
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
  payBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
