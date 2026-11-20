import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function ServiceDetailsScreen({ onNavigate }: { onNavigate: any }) {
  const [activeTab, setActiveTab] = useState('Packages');
  const [addedCards, setAddedCards] = useState<Record<number, boolean>>({ 1: true, 2: false });
  const [cartCount, setCartCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(2499);

  const tabs = ['Packages', 'Interior Deep Clean', 'Exterior Foam Detail'];

  const toggleAdd = (id: number, price: number) => {
    if (addedCards[id]) {
      setAddedCards({ ...addedCards, [id]: false });
      setCartCount((prev) => Math.max(0, prev - 1));
      setTotalPrice((prev) => Math.max(0, prev - price));
    } else {
      setAddedCards({ ...addedCards, [id]: true });
      setCartCount((prev) => prev + 1);
      setTotalPrice((prev) => prev + price);
      Alert.alert('Service Added', 'Added to your CarFrnd booking cart!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Detailing & Wash</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80' }}
          style={styles.heroCard}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>DOORSTEP DELIVERY</Text>
            </View>
            <Text style={styles.heroTitle}>Showroom Foam Finish</Text>
            <Text style={styles.heroSubtitle}>
              Professional multi-stage pressure foam wash and paint conditioning at your doorstep.
            </Text>
          </View>
        </ImageBackground>

        {/* Tabs */}
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

        {/* Service Card 1 - Selected */}
        <View style={styles.serviceCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.cardInfo}>
              <Text style={styles.serviceName}>Complete Showroom Detail</Text>
              <View style={styles.priceRow}>
                <Text style={styles.servicePrice}>₹2499</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <View style={styles.timeBadge}>
                  <Icon name="clock" size={10} color={Colors.magenta} />
                  <Text style={styles.timeText}>180-240 min</Text>
                </View>
              </View>
              <Text style={styles.serviceDesc}>
                Ultimate package combining high-pressure foam wash, steam disinfection and 3-stage polish.
              </Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80' }}
              style={styles.serviceImage}
            />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.addBtn,
                addedCards[1] ? styles.addBtnActive : styles.addBtnOutline,
              ]}
              onPress={() => toggleAdd(1, 2499)}
            >
              <Text
                style={[
                  styles.addBtnText,
                  addedCards[1] && styles.addBtnTextActive,
                ]}
              >
                {addedCards[1] ? '✓ Added to Cart' : '+ Add Service'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Card 2 */}
        <View style={styles.serviceCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.cardInfo}>
              <Text style={styles.serviceName}>Interior Deep Steam Sanitize</Text>
              <View style={styles.priceRow}>
                <Text style={styles.servicePrice}>₹1299</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <View style={styles.timeBadge}>
                  <Icon name="clock" size={10} color={Colors.magenta} />
                  <Text style={styles.timeText}>90-120 min</Text>
                </View>
              </View>
              <Text style={styles.serviceDesc}>
                Steam extraction on seats, roof liner, floor carpets, and AC vent bacterial purge.
              </Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=400&q=80' }}
              style={styles.serviceImage}
            />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.addBtn,
                addedCards[2] ? styles.addBtnActive : styles.addBtnOutline,
              ]}
              onPress={() => toggleAdd(2, 1299)}
            >
              <Text
                style={[
                  styles.addBtnText,
                  addedCards[2] && styles.addBtnTextActive,
                ]}
              >
                {addedCards[2] ? '✓ Added to Cart' : '+ Add Service'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating View Cart Bar */}
      {cartCount > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarLeft}>
            <Text style={styles.bottomBarCount}>{cartCount} Service(s) selected</Text>
            <Text style={styles.bottomBarTotal}>₹{totalPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewCartBtn}
            activeOpacity={0.85}
            onPress={() => onNavigate('Cart')}
          >
            <Text style={styles.viewCartBtnText}>View Cart</Text>
            <Icon name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
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
    paddingTop: 10,
    paddingBottom: 100,
  },
  heroCard: {
    height: 190,
    marginBottom: 20,
    overflow: 'hidden',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    padding: 20,
    justifyContent: 'flex-end',
    borderRadius: 18,
  },
  heroPill: {
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  heroPillText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 16,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsScroll: {
    flexDirection: 'row',
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  cardInfo: {
    flex: 1,
    paddingRight: 12,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.magenta,
  },
  dotSeparator: {
    color: '#CBD5E1',
    marginHorizontal: 6,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.magenta,
    marginLeft: 3,
  },
  serviceDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addBtnOutline: {
    borderWidth: 1.5,
    borderColor: Colors.magenta,
  },
  addBtnActive: {
    backgroundColor: Colors.magenta,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.magenta,
  },
  addBtnTextActive: {
    color: '#ffffff',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F172A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBarLeft: {},
  bottomBarCount: {
    color: '#94A3B8',
    fontSize: 12,
  },
  bottomBarTotal: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  viewCartBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
