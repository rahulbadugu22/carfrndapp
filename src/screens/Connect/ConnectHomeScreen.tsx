import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import CustomModal from '../../components/CustomModal';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function ConnectHomeScreen({
  onNavigate,
  routeParams,
}: {
  onNavigate: any;
  routeParams?: any;
}) {
  const { vehicles, activateTagAndCreateAccount, user } = useAuth();

  // State for vehicle number and unique tag code inputs
  const [newVehicleNo, setNewVehicleNo] = useState('');
  const [newTagCode, setNewTagCode] = useState('');
  const [linking, setLinking] = useState(false);

  // State for custom popup modal
  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    type: 'success' | 'warning' | 'info' | 'emergency';
    title: string;
    message: string;
  }>({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  useEffect(() => {
    if (routeParams?.prefillTagCode) {
      setNewTagCode(routeParams.prefillTagCode);
    }
    if (routeParams?.prefillVehicleNo) {
      setNewVehicleNo(routeParams.prefillVehicleNo);
    }
    if (routeParams?.scannedFromCamera) {
      setModalConfig({
        visible: true,
        type: 'info',
        title: 'Tag QR Code Scanned! 📷',
        message: `Unique Tag Code ID "${routeParams.prefillTagCode}" captured successfully. Complete linking by confirming your vehicle registration number.`,
      });
    }
  }, [routeParams]);

  const handleLinkTag = async () => {
    if (!newVehicleNo.trim()) {
      setModalConfig({
        visible: true,
        type: 'warning',
        title: 'Vehicle Number Required',
        message: 'Please enter your vehicle registration number (e.g. KA01ME2177) before linking.',
      });
      return;
    }

    if (!newTagCode.trim()) {
      setModalConfig({
        visible: true,
        type: 'warning',
        title: 'Unique Tag Code Required',
        message: 'Please enter or scan the Unique QR / Tag Code ID (e.g. CFD-BLR-000001) printed on your decal.',
      });
      return;
    }

    const formattedVehicle = newVehicleNo.toUpperCase().trim();
    const formattedTagCode = newTagCode.toUpperCase().trim();

    setLinking(true);
    const res = await activateTagAndCreateAccount({
      tagId: formattedTagCode,
      vehicleNo: formattedVehicle,
      name: user?.name || 'CarFrnd Driver',
      phone: user?.phone || '+91 98765 43210',
    });
    setLinking(false);

    if (res.success) {
      setNewVehicleNo('');
      setNewTagCode('');
      setModalConfig({
        visible: true,
        type: 'success',
        title: 'Tag Linked Successfully! 🎉',
        message: `Tag ID "${formattedTagCode}" has been successfully linked to vehicle ${formattedVehicle} and is now active with masked call protection.`,
      });
    } else {
      setModalConfig({
        visible: true,
        type: 'warning',
        title: 'Linking Issue',
        message: res.message || 'Could not link tag right now. Please verify details.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CarFrnd Connect</Text>
          <Text style={styles.headerSubtitle}>Smart Windshield QR Tag</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. FIRST: Link a Vehicle Tag Card */}
        <Text style={styles.sectionTitle}>Link a Vehicle Tag</Text>
        <View style={styles.linkCardForm}>
          <View style={styles.linkFormHeader}>
            <Icon name="tag" size={18} color={Colors.magenta} style={{ marginRight: 8 }} />
            <Text style={styles.linkFormTitle}>Vehicle Registration & Tag QR</Text>
          </View>
          <Text style={styles.linkFormSubtitle}>
            Enter your vehicle registration number along with the Unique QR Tag Code ID from your CarFrnd sticker.
          </Text>

          {/* Input 1: Vehicle Registration Number */}
          <Text style={styles.inputLabel}>Vehicle Number</Text>
          <View style={styles.inputContainer}>
            <Icon name="truck" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.input}
              placeholder="e.g. KA01ME2177"
              placeholderTextColor="#94A3B8"
              value={newVehicleNo}
              onChangeText={setNewVehicleNo}
              autoCapitalize="characters"
            />
          </View>

          {/* Input 2: Unique Tag Code ID with Scan QR Shortcut */}
          <Text style={styles.inputLabel}>Unique Tag Code ID / QR</Text>
          <View style={styles.inputContainerWithBtn}>
            <View style={styles.inputInnerLeft}>
              <Icon name="maximize" size={18} color={Colors.magenta} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.input}
                placeholder="e.g. CFD-BLR-000001"
                placeholderTextColor="#94A3B8"
                value={newTagCode}
                onChangeText={setNewTagCode}
                autoCapitalize="characters"
              />
            </View>
            <TouchableOpacity
              style={styles.qrScanInlineBtn}
              activeOpacity={0.8}
              onPress={() => onNavigate('ScanTag', { mode: 'link', prefillVehicleNo: newVehicleNo })}
            >
              <Icon name="camera" size={14} color={Colors.magenta} style={{ marginRight: 4 }} />
              <Text style={styles.qrScanInlineText}>Scan QR</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.submitLinkBtnFull}
            activeOpacity={0.85}
            onPress={handleLinkTag}
            disabled={linking}
          >
            <Icon name="check-circle" size={16} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.submitLinkBtnText}>
              {linking ? 'Linking Tag...' : 'Link Tag to Vehicle'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. My Active Tags Section */}
        <Text style={styles.sectionTitle}>My Active Tags</Text>

        {vehicles && vehicles.length > 0 ? (
          vehicles.map((tag) => (
            <View key={tag.id} style={styles.tagCard}>
              <View style={styles.tagLeft}>
                <View style={styles.tagIconWrapper}>
                  <Icon name="shield-check" size={20} color={Colors.magenta} />
                </View>
                <View style={styles.tagTextContent}>
                  <Text style={styles.tagCar}>{tag.makeModel || tag.regNumber}</Text>
                  <View style={styles.tagMetaRow}>
                    <Text style={styles.tagCodeBadge}>Tag ID: {tag.tagId}</Text>
                    <Text style={styles.tagTypeDot}>•</Text>
                    <Text style={styles.tagType}>{tag.regNumber}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{tag.status || 'Active'}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyTagsCard}>
            <Icon name="tag" size={28} color="#94A3B8" />
            <Text style={styles.emptyTagsText}>No tags linked yet. Enter your Tag ID above to link.</Text>
          </View>
        )}

        {/* 3. Link Another Tag Button */}
        <TouchableOpacity
          style={styles.addTagBtn}
          activeOpacity={0.8}
          onPress={() => {
            setModalConfig({
              visible: true,
              type: 'info',
              title: 'Link Additional Vehicle',
              message: 'Please enter the vehicle registration number and scan/type the Unique QR Tag ID in the form at the top to link another tag.',
            });
          }}
        >
          <Icon name="plus" size={18} color={Colors.magenta} style={{ marginRight: 8 }} />
          <Text style={styles.addTagText}>+ Link another Tag</Text>
        </TouchableOpacity>

        {/* 4. Order Tag Hero Card */}
        <Text style={styles.sectionTitle}>Get New Tag</Text>
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.launchTag}>
              <Text style={styles.launchTagText}>LAUNCH OFFER</Text>
            </View>
            <Text style={styles.heroTitle}>Privacy-First{'\n'}Vehicle Tagging</Text>
            <Text style={styles.heroSubtitle}>
              Let people contact you for parking alerts without sharing your personal mobile number.
            </Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => onNavigate('OrderTag')}
              activeOpacity={0.85}
            >
              <Text style={styles.heroBtnText}>Order a Tag (₹450)</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroGraphic}>
            <Icon name="maximize" size={60} color="rgba(255, 43, 133, 0.2)" />
            <Icon name="phone" size={30} color={Colors.magenta} style={{ position: 'absolute' }} />
          </View>
        </View>

        {/* 5. How It Works Section */}
        <Text style={styles.sectionTitle}>How it works</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.stepCircle}><Text style={styles.stepText}>1</Text></View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Stick the Tag</Text>
              <Text style={styles.infoDesc}>Place the weather-resistant QR decal on your car's windshield.</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.stepCircle}><Text style={styles.stepText}>2</Text></View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Someone Scans</Text>
              <Text style={styles.infoDesc}>Anyone can scan it with their phone camera to report an issue (e.g. blocking, lights on).</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.stepCircle}><Text style={styles.stepText}>3</Text></View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>You get Notified</Text>
              <Text style={styles.infoDesc}>Receive an instant push notification or a secure masked call. Your number stays hidden.</Text>
            </View>
          </View>
        </View>

        {/* 6. Why CarFrnd Connect Section */}
        <Text style={styles.sectionTitle}>Why CarFrnd Connect?</Text>
        <View style={styles.infoCard}>
          <View style={styles.featureRow}>
            <Icon name="shield-check" size={18} color={Colors.magenta} style={{ marginTop: 2 }} />
            <Text style={styles.featureText}>100% Privacy: Your mobile number is never shared with anyone.</Text>
          </View>
          <View style={styles.featureRow}>
            <Icon name="alert-circle" size={18} color="#EA4335" style={{ marginTop: 2 }} />
            <Text style={styles.featureText}>Emergency Alerts: Avoid getting towed, clamped, or blocked.</Text>
          </View>
          <View style={styles.featureRow}>
            <Icon name="check-circle" size={18} color={Colors.magenta} style={{ marginTop: 2 }} />
            <Text style={styles.featureText}>One-Time Decal: Weatherproof automotive grade vinyl decal.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Connect Bottom Navigation Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Home')}>
          <Icon name="home" size={24} color="#94A3B8" />
          <Text style={styles.tabTextInactive}>App Home</Text>
        </TouchableOpacity>

        {/* Prominent Scan FAB */}
        <TouchableOpacity
          style={styles.scanFab}
          onPress={() => onNavigate('ScanTag', { mode: 'contact' })}
          activeOpacity={0.9}
        >
          <View style={styles.scanFabInner}>
            <Icon name="maximize" size={28} color="#ffffff" />
          </View>
          <Text style={styles.scanFabText}>Scan Tag</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Profile')}>
          <Icon name="user" size={24} color="#94A3B8" />
          <Text style={styles.tabTextInactive}>Profile</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  linkCardForm: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  linkFormHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  linkFormTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  linkFormSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 18,
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
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  inputContainerWithBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 48,
    paddingLeft: 14,
    paddingRight: 6,
    marginBottom: 18,
  },
  inputInnerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrScanInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
  },
  qrScanInlineText: {
    color: Colors.magenta,
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  submitLinkBtnFull: {
    backgroundColor: Colors.magenta,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  submitLinkBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  tagCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  tagLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  tagIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tagTextContent: {
    flex: 1,
  },
  tagCar: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
  },
  tagMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagCodeBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.magenta,
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  tagTypeDot: {
    fontSize: 10,
    color: '#94A3B8',
    marginHorizontal: 4,
  },
  tagType: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '800',
  },
  emptyTagsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyTagsText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  addTagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.magenta,
    borderStyle: 'dashed',
    marginBottom: 24,
    backgroundColor: Colors.magentaLight,
  },
  addTagText: {
    color: Colors.magenta,
    fontSize: 14,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heroContent: {
    flex: 1,
    paddingRight: 14,
  },
  launchTag: {
    backgroundColor: Colors.magenta,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  launchTagText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: 25,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 17,
  },
  heroBtn: {
    backgroundColor: Colors.magenta,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  heroGraphic: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.magenta,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
  },
  infoDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  featureText: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    marginLeft: 10,
    lineHeight: 18,
    fontWeight: '500',
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#ffffff',
  },
  tabItem: {
    alignItems: 'center',
    width: 80,
  },
  tabTextInactive: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '600',
  },
  scanFab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  scanFabInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.magenta,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.magenta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#FAFAFA',
  },
  scanFabText: {
    color: Colors.magenta,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
});
