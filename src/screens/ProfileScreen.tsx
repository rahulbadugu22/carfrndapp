import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import {
  User,
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Car,
  LogOut,
  HelpCircle,
  FileText,
  ChevronRight,
  Sparkles,
  Trash2,
  AlertTriangle,
  Zap,
} from 'lucide-react-native';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: ProfileProps) {
  const { user, vehicles, logout, deleteAccount, isMockAuth, setIsMockAuth } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleConfirmDeleteAccount = async () => {
    setIsDeleting(true);
    await deleteAccount();
    setIsDeleting(false);
    setDeleteModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Account & Profile"
        subtitle="Manage personal settings"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.userName}>{user?.name || 'CarFrnd Driver'}</Text>
          <View style={styles.verifiedRow}>
            <ShieldCheck size={13} color="#10B981" />
            <Text style={styles.verifiedText}>Verified CarFrnd Member</Text>
          </View>

          <View style={styles.detailsDivider} />

          <View style={styles.detailItem}>
            <Phone size={16} color={Colors.magenta} />
            <Text style={styles.detailText}>+91 {user?.phone || '98765 43210'}</Text>
          </View>

          <View style={styles.detailItem}>
            <MapPin size={16} color={Colors.magenta} />
            <Text style={styles.detailText}>{user?.city || 'Bengaluru, India'}</Text>
          </View>

          {user?.email ? (
            <View style={styles.detailItem}>
              <Mail size={16} color={Colors.magenta} />
              <Text style={styles.detailText}>{user.email}</Text>
            </View>
          ) : null}
        </View>

        {/* Garage Quick Link */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Garage')}
          activeOpacity={0.8}
        >
          <View style={styles.menuIconBox}>
            <Car size={20} color={Colors.magenta} />
          </View>
          <View style={styles.menuTexts}>
            <Text style={styles.menuTitle}>My Vehicles Garage</Text>
            <Text style={styles.menuSub}>{vehicles.length} vehicle(s) linked to QR tags</Text>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Order Smart Tag */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('OrderTag')}
          activeOpacity={0.8}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#ECFDF5' }]}>
            <Sparkles size={20} color="#10B981" />
          </View>
          <View style={styles.menuTexts}>
            <Text style={styles.menuTitle}>Order Additional Smart Tags</Text>
            <Text style={styles.menuSub}>₹450 doorstep delivery for second car</Text>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Support & Legal */}
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <HelpCircle size={18} color={Colors.textSub} />
            <Text style={styles.settingText}>Help Center & 24/7 Support</Text>
            <ChevronRight size={16} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <FileText size={18} color={Colors.textSub} />
            <Text style={styles.settingText}>Privacy Policy & Cloud Masking Terms</Text>
            <ChevronRight size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Developer / Testing Auth Mode Toggle */}
        <View style={styles.authModeCard}>
          <View style={styles.authModeHeader}>
            <Zap size={16} color={isMockAuth ? '#F59E0B' : '#10B981'} />
            <Text style={styles.authModeTitle}>
              {isMockAuth ? 'Testing OTP Mode Active (1234)' : 'Live SMS OTP Mode (MSG91)'}
            </Text>
          </View>
          <Text style={styles.authModeSub}>
            {isMockAuth
              ? 'Instant local test verification is enabled. Real SMS is bypassed.'
              : 'Production SMS delivery via Airtel DLT and MSG91 is live.'}
          </Text>
          <TouchableOpacity
            style={styles.toggleModeBtn}
            onPress={() => setIsMockAuth(!isMockAuth)}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleModeBtnText}>
              Switch to {isMockAuth ? 'Live SMS Mode' : 'Test Mode (1234)'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <Button
          title="Sign Out"
          variant="outline"
          onPress={() => setLogoutModalVisible(true)}
          icon={<LogOut size={16} color={Colors.magenta} />}
          size="lg"
          style={{ marginTop: Spacing.xl }}
        />

        {/* Delete Account Button (Google Play 2026 Compliant) */}
        <TouchableOpacity
          style={styles.deleteAccountBtn}
          onPress={() => setDeleteModalVisible(true)}
          activeOpacity={0.7}
        >
          <Trash2 size={15} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={styles.deleteAccountText}>Delete Account & Data</Text>
        </TouchableOpacity>

        <Text style={styles.versionLabel}>CarFrnd App v1.0.0 • Build 2026</Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.confirmTitle}>Confirm Sign Out</Text>
            <Text style={styles.confirmSub}>
              Are you sure you want to sign out? You can sign back in anytime with your mobile number.
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={handleConfirmLogout}
              >
                <Text style={styles.logoutBtnText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Permanent Account Deletion Modal (Google Play 2026 Compliant) */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!isDeleting) {
            setDeleteModalVisible(false);
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.confirmModal, { borderColor: '#FCA5A5', borderWidth: 1 }]}>
            <View style={styles.deleteIconCircle}>
              <AlertTriangle size={24} color="#EF4444" />
            </View>
            <Text style={[styles.confirmTitle, { color: '#B91C1C' }]}>
              Permanently Delete Account?
            </Text>
            <Text style={styles.confirmSub}>
              This action is permanent and cannot be undone. In compliance with data privacy regulations, all your registered vehicles, linked CarFrnd QR stickers, and contact numbers will be completely purged from our servers.
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModalVisible(false)}
                disabled={isDeleting}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteConfirmBtn, isDeleting && { opacity: 0.6 }]}
                onPress={handleConfirmDeleteAccount}
                disabled={isDeleting}
              >
                <Text style={styles.deleteConfirmBtnText}>
                  {isDeleting ? 'Deleting...' : 'Delete Forever'}
                </Text>
              </TouchableOpacity>
            </View>
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
  userCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.subtle,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: 4,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  detailsDivider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textMain,
    fontWeight: '500',
    marginLeft: Spacing.md,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.subtle,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.magentaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuTexts: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
  },
  menuSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  settingsGroup: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textMain,
    fontWeight: '500',
    marginLeft: Spacing.md,
  },
  versionLabel: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: Spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  confirmModal: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.elevated,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textMain,
    marginBottom: Spacing.xs,
  },
  confirmSub: {
    fontSize: 13,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.xl,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMain,
  },
  logoutBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.danger,
    alignItems: 'center',
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  authModeCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },
  authModeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authModeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMain,
    marginLeft: 6,
  },
  authModeSub: {
    fontSize: 11,
    color: Colors.textSub,
    lineHeight: 15,
    marginBottom: Spacing.sm,
  },
  toggleModeBtn: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: Radius.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignSelf: 'flex-start',
  },
  toggleModeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.magenta,
  },
  deleteAccountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  deleteAccountText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },
  deleteIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  deleteConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: '#DC2626',
    alignItems: 'center',
  },
  deleteConfirmBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
