import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useScan } from '../context/ScanContext';
import { DEFAULT_PARKING_REASONS, ParkingReason } from '../config/constants';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Badge } from '../components/Badge';
import {
  Car,
  ShieldCheck,
  PhoneCall,
  Bell,
  AlertTriangle,
  Sparkles,
  Truck,
  Disc,
  MessageSquare,
  Send,
  Lock,
  Phone,
  PhoneOff,
  CheckCircle2,
} from 'lucide-react-native';

type VehiclePublicProfileProps = NativeStackScreenProps<RootStackParamList, 'VehiclePublicProfile'>;

const REASON_ICONS: { [key: string]: any } = {
  AlertTriangle: AlertTriangle,
  Sparkles: Sparkles,
  ShieldAlert: ShieldCheck,
  Truck: Truck,
  Disc: Disc,
  Bell: Bell,
};

export default function VehiclePublicProfileScreen({ navigation }: VehiclePublicProfileProps) {
  const { scannedTag, submitVehicleAlert, initiateMaskedCall } = useScan();

  const [activeTab, setActiveTab] = useState<'alert' | 'call'>('alert');
  const [selectedReason, setSelectedReason] = useState<ParkingReason>(DEFAULT_PARKING_REASONS[0]);
  const [customNote, setCustomNote] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Masked Voice Call State
  const [callerPhone, setCallerPhone] = useState('');
  const [callError, setCallError] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callingModalVisible, setCallingModalVisible] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatusText, setCallStatusText] = useState("Connecting via virtual line...");

  const handleSubmitAlert = async () => {
    setIsSubmitting(true);
    const res = await submitVehicleAlert(
      selectedReason.id,
      customNote.trim() || undefined,
      senderPhone.trim() || undefined
    );
    setIsSubmitting(false);

    if (res.success && res.alert) {
      navigation.replace('ScanSubmitted', { alert: res.alert });
    }
  };

  const handleStartCall = async () => {
    const phoneToUse = callerPhone.trim() || senderPhone.trim();
    const clean = phoneToUse.replace(/\D/g, '').slice(-10);

    if (clean.length !== 10) {
      setCallError('Please enter your 10-digit mobile number so the virtual PBX can connect you');
      return;
    }

    setCallError('');
    setIsCalling(true);
    setCallStatusText('Connecting to Exotel Virtual Bridge...');
    setCallingModalVisible(true);
    setCallDuration(0);

    const res = await initiateMaskedCall(clean, selectedReason.label);
    setIsCalling(false);

    if (res.success) {
      setCallStatusText(res.message || "Ringing your phone & driver's phone privately...");
    } else {
      setCallStatusText(res.message || 'Call failed to connect');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Vehicle Profile"
        subtitle="Contact Driver Privately"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP VERIFIED VEHICLE CARD */}
        <View style={styles.vehicleProfileCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.plateBadge}>
              <View style={styles.indBox}>
                <Text style={styles.indText}>IND</Text>
              </View>
              <Text style={styles.plateText}>
                {scannedTag?.maskedPlate || 'KA 01 ** 8820'}
              </Text>
            </View>

            <Badge label="VERIFIED TAG" variant="success" dot />
          </View>

          <View style={styles.vehicleDetailsRow}>
            <View style={styles.carCircle}>
              <Car size={24} color={Colors.magenta} />
            </View>
            <View style={styles.modelTexts}>
              <Text style={styles.modelName}>
                {scannedTag?.vehicleModel || 'Registered Vehicle'}
              </Text>
              <Text style={styles.ownerText}>
                Owner: {scannedTag?.ownerName || 'Verified CarFrnd Driver'}
              </Text>
            </View>
          </View>

          <View style={styles.privacyBanner}>
            <Lock size={13} color="#10B981" />
            <Text style={styles.privacyBannerText}>
              CarFrnd Cloud Masking Active • Zero Mobile Number Exposure
            </Text>
          </View>
        </View>

        {/* TABS: SEND SMS ALERT vs MASKED VOICE CALL */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'alert' && styles.tabButtonActive]}
            onPress={() => setActiveTab('alert')}
            activeOpacity={0.7}
          >
            <MessageSquare
              size={16}
              color={activeTab === 'alert' ? Colors.magenta : Colors.textMuted}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'alert' && styles.tabButtonTextActive,
              ]}
            >
              Send SMS Alert
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'call' && styles.tabButtonActive]}
            onPress={() => setActiveTab('call')}
            activeOpacity={0.7}
          >
            <PhoneCall
              size={16}
              color={activeTab === 'call' ? Colors.magenta : Colors.textMuted}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'call' && styles.tabButtonTextActive,
              ]}
            >
              Call Car Owner
            </Text>
          </TouchableOpacity>
        </View>

        {/* TAB 1: SEND ALERT FORM */}
        {activeTab === 'alert' ? (
          <View style={styles.alertTabContent}>
            <Text style={styles.sectionHeading}>SELECT ALERT REASON</Text>

            <View style={styles.reasonsList}>
              {DEFAULT_PARKING_REASONS.map((reason) => {
                const isSelected = selectedReason.id === reason.id;
                const IconComp = REASON_ICONS[reason.iconName] || AlertTriangle;

                return (
                  <TouchableOpacity
                    key={reason.id}
                    style={[
                      styles.reasonCard,
                      isSelected && styles.reasonCardSelected,
                    ]}
                    onPress={() => setSelectedReason(reason)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.reasonIconCircle,
                        isSelected && styles.reasonIconCircleSelected,
                      ]}
                    >
                      <IconComp
                        size={18}
                        color={isSelected ? '#FFFFFF' : Colors.magenta}
                      />
                    </View>

                    <View style={styles.reasonTextColumn}>
                      <View style={styles.reasonTitleRow}>
                        <Text
                          style={[
                            styles.reasonLabel,
                            isSelected && styles.reasonLabelSelected,
                          ]}
                        >
                          {reason.label}
                        </Text>
                      </View>
                      <Text style={styles.reasonDesc}>{reason.description}</Text>
                    </View>

                    {isSelected && (
                      <View style={styles.selectedCheck}>
                        <CheckCircle2 size={18} color={Colors.magenta} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Custom Message / Note */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Add Details or Location Note (Optional)
              </Text>
              <TextInput
                placeholder="e.g. Blocking silver Honda City near basement gate 2"
                placeholderTextColor={Colors.textLight}
                value={customNote}
                onChangeText={setCustomNote}
                multiline
                numberOfLines={3}
                style={styles.textArea}
              />
            </View>

            {/* Sender Phone (Optional) */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Your Phone Number for Callback (Optional)
              </Text>
              <TextInput
                placeholder="e.g. 98765 43210 (Only shared if you want callback)"
                placeholderTextColor={Colors.textLight}
                keyboardType="phone-pad"
                value={senderPhone}
                onChangeText={setSenderPhone}
                style={styles.phoneInput}
              />
            </View>

            {/* Dispatch Button */}
            <Button
              title="Send SMS Alert to Car Owner Now"
              onPress={handleSubmitAlert}
              loading={isSubmitting}
              icon={<Send size={18} color="#FFFFFF" />}
              size="lg"
              style={{ marginTop: Spacing.md }}
            />
          </View>
        ) : (
          /* TAB 2: ANONYMOUS MASKED VOICE CALL */
          <View style={styles.callTabContent}>
            <View style={styles.callIllustrationBox}>
              <View style={styles.callPulseCircle}>
                <PhoneCall size={38} color={Colors.magenta} />
              </View>
              <Text style={styles.callHeading}>CarFrnd Cloud Telephony</Text>
              <Text style={styles.callSubtitle}>
                Initiate a masked call directly to the driver's phone. Both phone numbers remain 100% confidential.
              </Text>
            </View>

            <View style={styles.callFeatureList}>
              <View style={styles.callFeatureRow}>
                <CheckCircle2 size={16} color="#10B981" />
                <Text style={styles.callFeatureText}>
                  Your number is NOT displayed on driver's screen
                </Text>
              </View>
              <View style={styles.callFeatureRow}>
                <CheckCircle2 size={16} color="#10B981" />
                <Text style={styles.callFeatureText}>
                  Driver's number is NOT displayed on your screen
                </Text>
              </View>
              <View style={styles.callFeatureRow}>
                <CheckCircle2 size={16} color="#10B981" />
                <Text style={styles.callFeatureText}>
                  End-to-End encrypted Exotel cloud call routing
                </Text>
              </View>
            </View>

            {/* Caller Mobile Number Input */}
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>Your 10-Digit Mobile Number (To Receive Bridge Call) *</Text>
              <TextInput
                placeholder="e.g. 98765 43210"
                placeholderTextColor={Colors.textLight}
                keyboardType="phone-pad"
                maxLength={10}
                value={callerPhone}
                onChangeText={(val) => {
                  setCallerPhone(val);
                  if (callError) setCallError('');
                }}
                style={styles.phoneInput}
              />
              {callError ? (
                <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4, fontWeight: '600' }}>
                  {callError}
                </Text>
              ) : null}
            </View>

            <Button
              title="Call Car Owner Now (Masked)"
              onPress={handleStartCall}
              loading={isCalling}
              icon={<Phone size={18} color="#FFFFFF" />}
              size="lg"
              style={{ marginTop: Spacing.lg }}
            />
          </View>
        )}
      </ScrollView>

      {/* MASKED CALL IN PROGRESS MODAL */}
      <Modal
        visible={callingModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCallingModalVisible(false)}
      >
        <View style={styles.callModalOverlay}>
          <View style={styles.callModalCard}>
            <View style={styles.callModalTop}>
              <Badge label="ENCRYPTED VOICE BRIDGE" variant="success" dot />
              <Text style={styles.callModalNumber}>+91 95138 86363</Text>
              <Text style={styles.callModalStatus}>{callStatusText}</Text>
            </View>

            <View style={styles.callTargetInfo}>
              <Text style={styles.callTargetPlate}>
                {scannedTag?.maskedPlate || 'KA 01 ** 8820'}
              </Text>
              <Text style={styles.callTargetModel}>
                {scannedTag?.vehicleModel || 'Registered Vehicle'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.endCallButton}
              onPress={() => setCallingModalVisible(false)}
              activeOpacity={0.8}
            >
              <PhoneOff size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.endCallText}>End Call</Text>
          </View>
        </View>
      </Modal>
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
  vehicleProfileCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  plateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0F172A',
    borderRadius: Radius.xs,
    paddingVertical: 2,
    paddingRight: 8,
  },
  indBox: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 4,
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
    letterSpacing: 1,
  },
  vehicleDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  carCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  modelTexts: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
  },
  ownerText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    borderRadius: Radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  privacyBannerText: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600',
    marginLeft: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.md,
    padding: 4,
    marginBottom: Spacing.lg,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: Radius.sm,
  },
  tabButtonActive: {
    backgroundColor: Colors.surface,
    ...Shadows.subtle,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
    marginLeft: 6,
  },
  tabButtonTextActive: {
    color: Colors.magenta,
    fontWeight: '700',
  },
  alertTabContent: {},
  sectionHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  reasonsList: {
    marginBottom: Spacing.lg,
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.subtle,
  },
  reasonCardSelected: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.magentaLight,
  },
  reasonIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  reasonIconCircleSelected: {
    backgroundColor: Colors.magenta,
  },
  reasonTextColumn: {
    flex: 1,
  },
  reasonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
  },
  reasonLabelSelected: {
    color: Colors.magenta,
  },
  reasonDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 15,
  },
  selectedCheck: {
    marginLeft: Spacing.sm,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMain,
    marginBottom: 6,
  },
  textArea: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: 14,
    color: Colors.textMain,
    textAlignVertical: 'top',
    minHeight: 76,
  },
  phoneInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 48,
    fontSize: 14,
    color: Colors.textMain,
  },
  callTabContent: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.card,
  },
  callIllustrationBox: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  callPulseCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.magentaLight,
    borderWidth: 2,
    borderColor: Colors.magentaBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  callHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 4,
  },
  callSubtitle: {
    fontSize: 13,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: Spacing.md,
  },
  callFeatureList: {
    width: '100%',
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  callFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  callFeatureText: {
    fontSize: 12,
    color: Colors.textMain,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },
  callModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 15, 25, 0.85)',
    justifyContent: 'flex-end',
  },
  callModalCard: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xxl,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#1E293B',
  },
  callModalTop: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  callModalNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: Spacing.md,
    letterSpacing: 0.5,
  },
  callModalStatus: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  callTargetInfo: {
    backgroundColor: '#1E293B',
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  callTargetPlate: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.magenta,
    letterSpacing: 1,
  },
  callTargetModel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  endCallButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.elevated,
  },
  endCallText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  noteBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 6,
  },
});
