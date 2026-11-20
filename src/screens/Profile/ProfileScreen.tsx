import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ onNavigate }: { onNavigate: any }) {
  const { user, vehicles, orders, logout } = useAuth();

  const primaryVehicle = vehicles && vehicles.length > 0 ? vehicles[0] : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
            <Icon name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="edit-2" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.cameraBadge}>
              <Icon name="camera" size={12} color="#ffffff" />
            </View>
          </View>

          <Text style={styles.userName}>{user?.name || 'Rahul Sharma'}</Text>
          <Text style={styles.contactInfo}>
            {user?.phone || '+91 98765 43210'} • {user?.city || 'Bengaluru'}
          </Text>

          {/* Inline CarFrnd QR Code Section */}
          <View style={styles.qrSection}>
            <View style={styles.qrImageWrapper}>
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${primaryVehicle?.tagId || 'CFD-BLR-000001'}`,
                }}
                style={styles.inlineQrImage}
              />
            </View>
            <Text style={styles.inlineQrCode}>{primaryVehicle?.tagId || 'CFD-BLR-000001'}</Text>
            <Text style={styles.qrStatusText}>Active Masked QR Tag</Text>
          </View>
        </View>

        {/* My Garage */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Garage</Text>
          <TouchableOpacity onPress={() => onNavigate('ConnectHome')}>
            <Text style={styles.sectionLink}>+ Add Vehicle</Text>
          </TouchableOpacity>
        </View>

        {vehicles && vehicles.length > 0 ? (
          vehicles.map((veh) => (
            <TouchableOpacity key={veh.id} style={styles.card} activeOpacity={0.7}>
              <View style={styles.cardIconWrapper}>
                <Icon name="truck" size={20} color={Colors.magenta} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{veh.makeModel || 'Registered Vehicle'}</Text>
                <Text style={styles.cardSubtitle}>
                  {veh.vehicleType || 'Car / SUV'} • {veh.regNumber}
                </Text>
              </View>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>{veh.tagId}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onNavigate('ConnectHome')}
          >
            <View style={styles.cardIconWrapper}>
              <Icon name="truck" size={20} color={Colors.magenta} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>No Vehicle Tag Linked</Text>
              <Text style={styles.cardSubtitle}>Tap to link your CarFrnd decal</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#A3A3A3" />
          </TouchableOpacity>
        )}

        {/* Saved Addresses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          <TouchableOpacity onPress={() => onNavigate('Location')}>
            <Text style={styles.sectionLink}>+ Change</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => onNavigate('Location')}
        >
          <View style={styles.cardIconWrapper}>
            <Icon name="home" size={20} color={Colors.magenta} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Primary Service Location</Text>
            <Text style={styles.cardSubtitle}>Indiranagar, 100ft Road, Bengaluru 560038</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#A3A3A3" />
        </TouchableOpacity>

        {/* Recent Orders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => onNavigate('Bookings')}>
            <Text style={styles.sectionLink}>View All</Text>
          </TouchableOpacity>
        </View>
        {orders && orders.length > 0 ? (
          orders.map((ord) => (
            <TouchableOpacity key={ord.orderId} style={styles.card} activeOpacity={0.7}>
              <View style={styles.cardIconWrapper}>
                <Icon name="file-text" size={20} color={Colors.magenta} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>CarFrnd Smart Decal ({ord.quantity}x)</Text>
                <Text style={styles.cardSubtitle}>{ord.orderId} • ₹{ord.totalPrice}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{ord.status}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardIconWrapper}>
              <Icon name="file-text" size={20} color={Colors.magenta} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Doorstep Premium Wash</Text>
              <Text style={styles.cardSubtitle}>#CW-892341 • ₹2499</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Delivered</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Icon name="credit-card" size={20} color={Colors.magenta} style={styles.menuIcon} />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Icon name="chevron-right" size={20} color="#A3A3A3" />
          </TouchableOpacity>
          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Icon name="help-circle" size={20} color={Colors.magenta} style={styles.menuIcon} />
            <Text style={styles.menuText}>Help & Support</Text>
            <Icon name="chevron-right" size={20} color="#A3A3A3" />
          </TouchableOpacity>
          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Icon name="settings" size={20} color={Colors.magenta} style={styles.menuIcon} />
            <Text style={styles.menuText}>App Settings & Security</Text>
            <Icon name="chevron-right" size={20} color="#A3A3A3" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={async () => {
            await logout();
            onNavigate('Login');
          }}
        >
          <Icon name="log-out" size={18} color="#EA4335" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab Bar Mock */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Home')}>
          <Icon name="home" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Bookings')}>
          <Icon name="calendar" size={22} color="#94A3B8" />
          <Text style={styles.tabText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="user" size={22} color={Colors.magenta} />
          <Text style={[styles.tabText, styles.tabTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    marginBottom: 24,
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
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: Colors.magentaLight,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.magenta,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 18,
  },
  qrSection: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: Colors.magentaBorder,
    borderRadius: 18,
    padding: 16,
    width: '75%',
  },
  qrImageWrapper: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  inlineQrImage: {
    width: 90,
    height: 90,
  },
  inlineQrCode: {
    color: Colors.magenta,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  qrStatusText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.magenta,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  cardIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  tagBadge: {
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagBadgeText: {
    color: Colors.magenta,
    fontSize: 10,
    fontWeight: '800',
  },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  menuContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    marginRight: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 34,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F2',
    height: 52,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  logoutText: {
    color: '#EA4335',
    fontSize: 15,
    fontWeight: '700',
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
  },
  tabText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.magenta,
    fontWeight: '700',
  },
});
