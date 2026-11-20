import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function OrderTagScreen({ onNavigate }: { onNavigate: any }) {
  const { user, createOrder } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [vehicleNo, setVehicleNo] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const unitPrice = 450;
  const totalPrice = unitPrice * quantity;

  const handleOrder = async () => {
    if (!name.trim() || !phone.trim() || !vehicleNo.trim() || !address.trim()) {
      setError('Please fill in all mandatory fields');
      return;
    }

    setLoading(true);
    setError('');

    const fullAddress = `${address.trim()}${pincode ? ', PIN ' + pincode : ''}`;
    const newOrder = await createOrder({
      quantity,
      totalPrice,
      vehicleNo: vehicleNo.trim().toUpperCase(),
      address: fullAddress,
    });

    setLoading(false);
    onNavigate('TagPaymentSuccess', { orderId: newOrder.orderId, address: fullAddress });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('ConnectHome')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order CarFrnd Tag</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Hero Banner */}
        <View style={styles.productBanner}>
          <View style={styles.launchOfferPill}>
            <Icon name="sparkles" size={12} color="#FFFFFF" />
            <Text style={styles.launchOfferText}>LAUNCH OFFER — ₹450 INCL. GST</Text>
          </View>

          <Text style={styles.productTitle}>Smart Contact Vehicle Decal</Text>
          <Text style={styles.productSubtitle}>
            Protect your personal mobile number and receive instant parking & tow alerts. Delivered in 3-5 business days.
          </Text>

          {/* Feature Bullets */}
          <View style={styles.featureRow}>
            <Icon name="shield-check" size={16} color={Colors.magenta} />
            <Text style={styles.featureText}>Masked Voice Forwarding (100% Privacy)</Text>
          </View>
          <View style={styles.featureRow}>
            <Icon name="sparkles" size={16} color={Colors.magenta} />
            <Text style={styles.featureText}>Weatherproof High-Grade Automotive Vinyl</Text>
          </View>
          <View style={styles.featureRow}>
            <Icon name="truck" size={16} color={Colors.magenta} />
            <Text style={styles.featureText}>Free Express Doorstep Delivery Across India</Text>
          </View>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formSectionTitle}>DELIVERY & VEHICLE DETAILS</Text>

          {/* Quantity Selector */}
          <View style={styles.qtyContainer}>
            <Text style={styles.qtyLabel}>Number of Decals:</Text>
            <View style={styles.qtySelector}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recipient Name */}
          <Text style={styles.inputLabel}>Recipient Name *</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Rahul Verma"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Phone */}
          <Text style={styles.inputLabel}>Contact Phone *</Text>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.input}
              placeholder="e.g. 98765 43210"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Vehicle Number */}
          <Text style={styles.inputLabel}>Primary Vehicle Number Plate *</Text>
          <View style={styles.inputContainer}>
            <Icon name="truck" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.input}
              placeholder="e.g. KA 01 MJ 8820"
              placeholderTextColor="#94A3B8"
              value={vehicleNo}
              onChangeText={setVehicleNo}
              autoCapitalize="characters"
            />
          </View>

          {/* Address */}
          <Text style={styles.inputLabel}>Delivery Address *</Text>
          <View style={[styles.inputContainer, { height: 70, alignItems: 'flex-start', paddingTop: 10 }]}>
            <Icon name="map-pin" size={18} color="#94A3B8" style={{ marginRight: 10, marginTop: 2 }} />
            <TextInput
              style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
              placeholder="Flat/House No, Building, Street, Area"
              placeholderTextColor="#94A3B8"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>

          {/* PIN Code */}
          <Text style={styles.inputLabel}>PIN Code</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g. 560034"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={6}
              value={pincode}
              onChangeText={setPincode}
            />
          </View>

          {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

          {/* Order Summary */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>CarFrnd Tag ({quantity}x)</Text>
              <Text style={styles.summaryVal}>₹{unitPrice * quantity}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18% Included)</Text>
              <Text style={styles.summaryVal}>Included</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Express Delivery</Text>
              <Text style={[styles.summaryVal, { color: '#10B981' }]}>FREE</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payable:</Text>
              <Text style={styles.totalVal}>₹{totalPrice}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleOrder}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.confirmBtnText}>Confirm Order • ₹{totalPrice}</Text>
            )}
          </TouchableOpacity>
        </View>
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
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  productBanner: {
    backgroundColor: Colors.magentaLight,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  launchOfferPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  launchOfferText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginLeft: 4,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
    marginLeft: 8,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
  },
  formSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginHorizontal: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  summaryVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.magenta,
  },
  confirmBtn: {
    backgroundColor: Colors.magenta,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
