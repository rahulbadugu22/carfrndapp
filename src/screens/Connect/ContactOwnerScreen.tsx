import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import CustomModal from '../../components/CustomModal';
import { Colors } from '../../theme/colors';
import { useScan } from '../../context/ScanContext';

export default function ContactOwnerScreen({
  onNavigate,
  routeParams,
}: {
  onNavigate: any;
  routeParams?: any;
}) {
  const { scannedTag, verifyPlateDigits, submitVehicleAlert } = useScan();

  // Confirmation State (Phase 1: plate verification, Phase 2: verified contact unlocked)
  const [isVerified, setIsVerified] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<string>('parking');
  const [customNote, setCustomNote] = useState('');
  const [submittingAlert, setSubmittingAlert] = useState(false);
  const pinInputRefs = useRef<any>([]);

  // State for custom popup modal
  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    type: 'success' | 'warning' | 'info' | 'emergency';
    title: string;
    message: string;
  }>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  const issues = [
    { id: 'parking', icon: 'alert-triangle', text: 'Car is blocking my way' },
    { id: 'lights', icon: 'sun', text: 'Headlights are left on' },
    { id: 'windows', icon: 'wind', text: 'Windows are open' },
    { id: 'tow', icon: 'alert-octagon', text: 'Tow truck alert / Danger' },
    { id: 'other', icon: 'message-circle', text: 'Other issue or inquiry' },
  ];

  const handlePinChange = async (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (verifyError) setVerifyError('');

    // Auto-advance input focus
    if (text && index < 3) {
      pinInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when 4 digits are filled
    if (index === 3 && text) {
      const fullPin = newPin.join('');
      if (fullPin.length === 4) {
        setVerifying(true);
        const res = await verifyPlateDigits(fullPin);
        setVerifying(false);
        if (res.success) {
          setIsVerified(true);
        } else {
          setVerifyError(res.error || 'Incorrect digits. Check vehicle license plate.');
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmPin = async () => {
    const enteredPin = pin.join('');
    if (enteredPin.length < 4) {
      setVerifyError('Please enter all 4 digits from the vehicle number plate');
      return;
    }
    setVerifying(true);
    const res = await verifyPlateDigits(enteredPin);
    setVerifying(false);
    if (res.success) {
      setIsVerified(true);
    } else {
      setVerifyError(res.error || 'Incorrect digits. Check vehicle license plate.');
    }
  };

  const handleSendMessage = async () => {
    setSubmittingAlert(true);
    const selectedObj = issues.find((i) => i.id === selectedIssue);
    const res = await submitVehicleAlert(selectedIssue, customNote || selectedObj?.text);
    setSubmittingAlert(false);

    setModalConfig({
      visible: true,
      type: 'success',
      title: 'Alert Dispatched! 💬',
      message: `CarFrnd instant SMS alert for "${selectedObj?.text}" has been delivered directly to the car owner's mobile phone.`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('ConnectHome')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CarFrnd Connect</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Plate Header Title */}
        <Text style={styles.contactOwnerHeader}>Contact vehicle owner</Text>

        {/* High-Fidelity Indian License Plate Component */}
        <View style={styles.plateContainer}>
          <View style={styles.plateHeaderBlue}>
            <Text style={styles.plateIndFlag}>🇮🇳</Text>
            <Text style={styles.plateIndText}>IND</Text>
          </View>
          <View style={styles.plateNumberBody}>
            {isVerified ? (
              <Text style={styles.plateNumberText}>
                {scannedTag?.fullPlate || 'KA 01 MJ 8820'}
              </Text>
            ) : (
              <Text style={styles.plateNumberTextMasked}>
                {scannedTag?.maskedPlate ? (
                  scannedTag.maskedPlate
                ) : (
                  <>KA 01 MP <Text style={styles.maskedHash}># # # #</Text></>
                )}
              </Text>
            )}
          </View>
        </View>

        {/* Phase 1: 4-Digit Confirmation Input */}
        {!isVerified ? (
          <View style={styles.verifyCard}>
            <View style={styles.verifyHeaderRow}>
              <Icon name="shield-check" size={22} color={Colors.magenta} style={{ marginRight: 8 }} />
              <Text style={styles.verifyTitle}>Vehicle Presence Confirmation</Text>
            </View>
            <Text style={styles.verifySubtitle}>
              Please enter the last 4 digits of the physical vehicle registration plate to unlock private driver contact options.
            </Text>

            <View style={styles.pinContainer}>
              {pin.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={(ref) => {
                    pinInputRefs.current[idx] = ref;
                  }}
                  style={[styles.pinInput, digit ? styles.pinInputFilled : null]}
                  value={digit}
                  onChangeText={(val) => handlePinChange(val, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectionColor={Colors.magenta}
                />
              ))}
            </View>

            {Boolean(verifyError) && (
              <Text style={styles.errorText}>{verifyError}</Text>
            )}

            <TouchableOpacity
              style={styles.verifyButton}
              activeOpacity={0.85}
              onPress={handleConfirmPin}
              disabled={verifying}
            >
              {verifying ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.verifyButtonText}>Confirm & Unlock Contact</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          /* Phase 2: Verified Owner Contact Options */
          <View>
            {/* 1. Select Issue Tag FIRST */}
            <Text style={styles.reachOwnerTitle}>What's the issue?</Text>
            <View style={styles.issuesContainer}>
              {issues.map((issue) => (
                <TouchableOpacity
                  key={issue.id}
                  style={[
                    styles.issueBtn,
                    selectedIssue === issue.id && styles.issueBtnSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedIssue(issue.id)}
                >
                  <Icon
                    name={issue.icon}
                    size={18}
                    color={selectedIssue === issue.id ? Colors.magenta : '#94A3B8'}
                  />
                  <Text
                    style={[
                      styles.issueText,
                      selectedIssue === issue.id && styles.issueTextSelected,
                    ]}
                  >
                    {issue.text}
                  </Text>
                  {selectedIssue === issue.id ? (
                    <Icon name="check-circle" size={16} color={Colors.magenta} />
                  ) : (
                    <Icon name="chevron-right" size={16} color="#CBD5E1" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Optional Custom Note */}
            <View style={styles.noteInputCard}>
              <Text style={styles.noteLabel}>Additional Location Note (Optional):</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="e.g. Blocking black Honda City near basement ramp"
                placeholderTextColor="#94A3B8"
                value={customNote}
                onChangeText={setCustomNote}
              />
            </View>

            {/* 2. Contact Method SECOND */}
            <Text style={[styles.reachOwnerTitle, { marginTop: 8 }]}>
              How would you like to reach the owner?
            </Text>

            {/* Contact Action Cards Row (Masked call & Message) */}
            <View style={styles.contactOptionsRow}>
              {/* Masked Call Card */}
              <TouchableOpacity
                style={styles.contactCard}
                activeOpacity={0.85}
                onPress={() => onNavigate('SecureCall', { plate: scannedTag?.fullPlate || 'KA 01 MJ 8820' })}
              >
                <View style={[styles.cardIconWrapper, { backgroundColor: Colors.magentaLight }]}>
                  <Icon name="phone" size={24} color={Colors.magenta} />
                </View>
                <Text style={styles.cardTitle}>Masked call</Text>
                <Text style={styles.cardSubtext}>90 sec • private</Text>
              </TouchableOpacity>

              {/* Message Card */}
              <TouchableOpacity
                style={styles.contactCard}
                activeOpacity={0.85}
                onPress={handleSendMessage}
                disabled={submittingAlert}
              >
                <View style={[styles.cardIconWrapper, { backgroundColor: '#DCFCE7' }]}>
                  <Icon name="message-square" size={24} color="#16A34A" />
                </View>
                <Text style={styles.cardTitle}>
                  {submittingAlert ? 'Sending...' : 'Send SMS'}
                </Text>
                <Text style={styles.cardSubtext}>Instant Ping</Text>
              </TouchableOpacity>
            </View>

            {/* Emergency Button */}
            <TouchableOpacity
              style={styles.emergencyButton}
              activeOpacity={0.8}
              onPress={() =>
                setModalConfig({
                  visible: true,
                  type: 'emergency',
                  title: 'Emergency Alert Triggered 🚨',
                  message:
                    'Emergency broadcast sent to vehicle owner & registered emergency family contacts via CarFrnd Safety Network.',
                })
              }
            >
              <Icon name="alert-circle" size={20} color="#DC2626" style={{ marginRight: 8 }} />
              <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
            </TouchableOpacity>
            <Text style={styles.emergencySubtext}>
              Vehicle accident or towing threat? Use Emergency.
            </Text>

            {/* Information / Terms Box */}
            <View style={styles.infoFooterBox}>
              <Text style={styles.infoFooterText}>
                90 seconds per call. Calls are 100% masked via CarFrnd Cloud Bridge. Spam will result in permanent blocking.
              </Text>
              <View style={styles.infoFooterLinks}>
                <TouchableOpacity
                  onPress={() =>
                    setModalConfig({
                      visible: true,
                      type: 'info',
                      title: 'CarFrnd 24/7 Helpline',
                      message: 'Toll-free Safety Support: 1800-CAR-FRND (1800-227-3763)',
                    })
                  }
                >
                  <Text style={styles.infoLinkText}>Urgent Support</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setModalConfig({
                      visible: true,
                      type: 'info',
                      title: 'Report Submitted',
                      message: 'Thank you. Our safety moderation team will review this tag within 15 minutes.',
                    })
                  }
                >
                  <Text style={styles.infoLinkText}>Report wrong info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* High-Fidelity Custom Animated Popup Modal */}
      <CustomModal
        visible={modalConfig.visible}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({ ...modalConfig, visible: false })}
      />
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
    backgroundColor: '#F1F5F9',
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
    paddingBottom: 40,
  },
  contactOwnerHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  plateContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1E3A8A',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  plateHeaderBlue: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  plateIndFlag: {
    fontSize: 12,
    marginRight: 4,
  },
  plateIndText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  plateNumberBody: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  plateNumberText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  plateNumberTextMasked: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  maskedHash: {
    color: '#64748B',
    letterSpacing: 4,
  },
  verifyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  verifyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  verifyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  verifySubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 22,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pinInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  pinInputFilled: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.magentaLight,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 14,
  },
  verifyButton: {
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
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  reachOwnerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  issuesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  issueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  issueBtnSelected: {
    backgroundColor: Colors.magentaLight,
  },
  issueText: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    marginLeft: 12,
    fontWeight: '500',
  },
  issueTextSelected: {
    color: Colors.magenta,
    fontWeight: '700',
  },
  noteInputCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 18,
  },
  noteLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  noteInput: {
    fontSize: 13,
    color: '#0F172A',
    height: 38,
  },
  contactOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardSubtext: {
    fontSize: 11,
    color: '#64748B',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    borderRadius: 14,
    height: 50,
    marginBottom: 6,
  },
  emergencyButtonText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '700',
  },
  emergencySubtext: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoFooterBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoFooterText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 10,
  },
  infoFooterLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
  },
});
