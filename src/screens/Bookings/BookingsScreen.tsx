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

export default function BookingsScreen({ onNavigate }: { onNavigate: any }) {
  const [activeTab, setActiveTab] = useState('Completed');
  const tabs = ['Upcoming', 'Completed', 'Cancelled'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings & Orders</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'Completed' ? (
          <>
            {/* Booking Card 1 */}
            <TouchableOpacity
              style={styles.bookingCard}
              activeOpacity={0.8}
              onPress={() => onNavigate('OrderCompleted')}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderId}>Order #CW-892341</Text>
                  <Text style={styles.dateText}>Today, 10:30 AM</Text>
                </View>
                <View style={styles.statusBadgeCompleted}>
                  <Text style={styles.statusTextCompleted}>Completed</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.serviceRow}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80' }}
                    style={styles.serviceImage}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>Complete Showroom Detail</Text>
                  <Text style={styles.vendorName}>Pro: Rajesh Kumar</Text>
                  <Text style={styles.priceText}>₹3797</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionBtnOutline}
                  onPress={() => onNavigate('ServiceDetails')}
                >
                  <Icon name="refresh-cw" size={14} color={Colors.magenta} style={{ marginRight: 6 }} />
                  <Text style={styles.actionTextOutline}>Rebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtnSolid}
                  onPress={() => onNavigate('OrderCompleted')}
                >
                  <Text style={styles.actionTextSolid}>View Receipt</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Smart Decal Order Card */}
            <TouchableOpacity style={styles.bookingCard} activeOpacity={0.8}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderId}>Order #TAG-10492</Text>
                  <Text style={styles.dateText}>Yesterday, 04:00 PM</Text>
                </View>
                <View style={styles.statusBadgeCompleted}>
                  <Text style={styles.statusTextCompleted}>Delivered</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.serviceRow}>
                <View style={[styles.imageContainer, { backgroundColor: Colors.magentaLight, justifyContent: 'center', alignItems: 'center' }]}>
                  <Icon name="maximize" size={26} color={Colors.magenta} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>CarFrnd Smart Decal (1x)</Text>
                  <Text style={styles.vendorName}>Tag ID: CFD-BLR-000001</Text>
                  <Text style={styles.priceText}>₹450</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="calendar" size={38} color="#94A3B8" />
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} bookings found</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Home')}>
          <Icon name="home" size={22} color="#94A3B8" />
          <Text style={styles.tabTextInactive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="calendar" size={22} color={Colors.magenta} />
          <Text style={[styles.tabTextInactive, { color: Colors.magenta, fontWeight: '700' }]}>
            Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => onNavigate('Profile')}>
          <Icon name="user" size={22} color="#94A3B8" />
          <Text style={styles.tabTextInactive}>Profile</Text>
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
  tabsContainer: {
    backgroundColor: '#ffffff',
    paddingBottom: 12,
  },
  tabsScroll: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  tabChipActive: {
    backgroundColor: Colors.magenta,
    borderColor: Colors.magenta,
  },
  tabText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 80,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  dateText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  statusBadgeCompleted: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusTextCompleted: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  vendorName: {
    fontSize: 12,
    color: '#64748B',
    marginVertical: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.magenta,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.magenta,
  },
  actionTextOutline: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.magenta,
  },
  actionBtnSolid: {
    backgroundColor: '#0F172A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionTextSolid: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 10,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  tabTextInactive: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '600',
  },
});
