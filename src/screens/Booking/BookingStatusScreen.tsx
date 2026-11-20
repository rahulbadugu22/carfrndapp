import React, { useState, useEffect } from 'react';
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

export default function BookingStatusScreen({ onNavigate }: { onNavigate: any }) {
  const [statusStep, setStatusStep] = useState(2); // 1: Searching, 2: Assigned, 3: On The Way, 4: In Progress, 5: Completed
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStatusStep(3), 3000);
    const timer2 = setTimeout(() => setStatusStep(4), 7000);
    const timer3 = setTimeout(() => onNavigate('OrderCompleted'), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onNavigate]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('Home')}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Booking Tracker</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Icon name="more-vertical" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Status Hero Card */}
        <View style={styles.statusHeroCard}>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>SERVICE IN PROGRESS</Text>
          </View>
          <Text style={styles.statusHeroTitle}>Professional is En Route</Text>
          <Text style={styles.statusHeroSub}>Estimated arrival in 12 - 15 mins</Text>
        </View>

        {/* Stepper Timeline */}
        <View style={styles.timelineCard}>
          <View style={styles.stepRow}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Icon name="check" size={14} color="#FFFFFF" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Booking Confirmed</Text>
              <Text style={styles.stepDesc}>10:30 AM • Order #CW-892341</Text>
            </View>
          </View>
          <View style={styles.stepLineActive} />

          <View style={styles.stepRow}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Icon name="check" size={14} color="#FFFFFF" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Detailing Pro Assigned</Text>
              <Text style={styles.stepDesc}>Rajesh Kumar (CarFrnd Certified)</Text>
            </View>
          </View>
          <View style={[styles.stepLine, statusStep >= 3 && styles.stepLineActive]} />

          <View style={styles.stepRow}>
            <View
              style={[
                styles.stepCircle,
                statusStep >= 3 ? styles.stepCircleActive : styles.stepCirclePending,
              ]}
            >
              <Icon name="truck" size={14} color={statusStep >= 3 ? '#FFFFFF' : '#94A3B8'} />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>On The Way</Text>
              <Text style={styles.stepDesc}>Carrying pressure foam equipment</Text>
            </View>
          </View>
          <View style={[styles.stepLine, statusStep >= 4 && styles.stepLineActive]} />

          <View style={styles.stepRow}>
            <View
              style={[
                styles.stepCircle,
                statusStep >= 4 ? styles.stepCircleActive : styles.stepCirclePending,
              ]}
            >
              <Icon name="sparkles" size={14} color={statusStep >= 4 ? '#FFFFFF' : '#94A3B8'} />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Doorstep Foam Service</Text>
              <Text style={styles.stepDesc}>Multi-stage foam wash & polish</Text>
            </View>
          </View>
        </View>

        {/* Assigned Technician Profile */}
        <View style={styles.techCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' }}
            style={styles.techAvatar}
          />
          <View style={styles.techInfo}>
            <View style={styles.techNameRow}>
              <Text style={styles.techName}>Rajesh Kumar</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proText}>PRO 4.9★</Text>
              </View>
            </View>
            <Text style={styles.techRole}>Lead Detailing Technician</Text>
          </View>
          <TouchableOpacity style={styles.techCallBtn}>
            <Icon name="phone" size={18} color="#FFFFFF" />
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
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  statusHeroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  statusPill: {
    backgroundColor: Colors.magenta,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusHeroSub: {
    fontSize: 13,
    color: '#94A3B8',
  },
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  stepCircleActive: {
    backgroundColor: Colors.magenta,
  },
  stepCirclePending: {
    backgroundColor: '#E2E8F0',
  },
  stepLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginLeft: 13,
    marginVertical: 2,
  },
  stepLineActive: {
    backgroundColor: Colors.magenta,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  techCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  techAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  techInfo: {
    flex: 1,
  },
  techNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  techName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 6,
  },
  proBadge: {
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.magenta,
  },
  techRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  techCallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.magenta,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
