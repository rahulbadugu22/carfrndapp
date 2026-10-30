import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Header } from '../components/Header';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Car,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Lock,
} from 'lucide-react-native';

type OrderTagProps = NativeStackScreenProps<RootStackParamList, 'OrderTag'>;

export default function OrderTagScreen({ navigation }: OrderTagProps) {
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

    // Simulate order processing
    await new Promise((resolve) => setTimeout(() => resolve(true), 600));

    const fullAddress = `${address.trim()}${pincode ? ', ' + pincode : ''}`;
    const newOrder = await createOrder({
      quantity,
      totalPrice,
      vehicleNo: vehicleNo.trim().toUpperCase(),
      address: fullAddress,
    });

    setLoading(false);
    navigation.replace('OrderTracking', { orderId: newOrder.orderId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Order CarFrnd Tag"
        subtitle="Weatherproof Windshield Smart Sticker"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Product Hero Banner */}
          <View style={styles.productBanner}>
            <View style={styles.launchOfferPill}>
              <Sparkles size={11} color="#FFFFFF" />
              <Text style={styles.launchOfferText}>LAUNCH OFFER — ₹450 INCL. GST</Text>
            </View>

            <Text style={styles.productTitle}>Smart Contact Vehicle Tag</Text>
            <Text style={styles.productSubtitle}>
              Protect your personal mobile number and receive instant parking & tow alerts. Delivered in 3-5 business days.
            </Text>

            {/* Feature Bullets */}
            <View style={styles.featuresList}>
              <View style={styles.featureRow}>
                <ShieldCheck size={16} color={Colors.magenta} />
                <Text style={styles.featureText}>
                  Masked Voice Forwarding (Phone stays 100% private)
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Sparkles size={16} color={Colors.magenta} />
                <Text style={styles.featureText}>
                  Weatherproof High-Grade Automotive Vinyl Decal
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Truck size={16} color={Colors.magenta} />
                <Text style={styles.featureText}>
                  Free Doorstep Delivery Across India
                </Text>
              </View>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formSectionTitle}>DELIVERY & VEHICLE DETAILS</Text>

            {/* Quantity Selector */}
            <View style={styles.qtyContainer}>
              <Text style={styles.qtyLabel}>Number of Tags:</Text>
              <View style={styles.qtySelector}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  activeOpacity={0.7}
                >
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(quantity + 1)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Input
              label="Recipient Name *"
              placeholder="e.g. Rahul Verma"
              value={name}
              onChangeText={setName}
              leftIcon={<User size={18} color={Colors.textMuted} />}
            />

            <Input
              label="Contact Phone Number *"
              placeholder="e.g. 98765 43210"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              leftIcon={<Phone size={18} color={Colors.textMuted} />}
            />

            <Input
              label="Primary Vehicle Number Plate *"
              placeholder="e.g. KA 01 MJ 8820"
              value={vehicleNo}
              onChangeText={setVehicleNo}
              autoCapitalize="characters"
              leftIcon={<Car size={18} color={Colors.textMuted} />}
            />

            <Input
              label="Doorstep Delivery Address *"
              placeholder="Flat/House No, Building, Street, Area"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={2}
              leftIcon={<MapPin size={18} color={Colors.textMuted} />}
            />

            <Input
              label="PIN Code"
              placeholder="e.g. 560034"
              keyboardType="number-pad"
              maxLength={6}
              value={pincode}
              onChangeText={setPincode}
            />

            {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

            {/* Order Price Summary */}
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

            <Button
              title={`Confirm Order • ₹${totalPrice}`}
              onPress={handleOrder}
              loading={loading}
              size="lg"
              style={{ marginTop: Spacing.lg }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  productBanner: {
    backgroundColor: Colors.magentaLight,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  launchOfferPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: Radius.round,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  launchOfferText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginLeft: 4,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 13,
    color: Colors.textSub,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  featuresList: {},
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: Colors.textMain,
    fontWeight: '500',
    marginLeft: Spacing.sm,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  formSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textMain,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textMain,
    marginHorizontal: Spacing.md,
  },
  summaryBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textSub,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMain,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textMain,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.magenta,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
});
