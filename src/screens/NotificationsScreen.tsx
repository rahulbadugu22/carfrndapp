import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Header } from '../components/Header';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Sparkles,
  ShoppingBag,
} from 'lucide-react-native';

type NotificationsProps = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

export default function NotificationsScreen({ navigation }: NotificationsProps) {
  const { notifications, markNotificationRead } = useAuth();
  const [filter, setFilter] = useState<'all' | 'alert' | 'system'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'alert') return n.type === 'alert' || n.type === 'scan';
    return n.type === 'system' || n.type === 'order';
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={18} color={Colors.magenta} />;
      case 'scan':
        return <QrCode size={18} color="#3B82F6" />;
      case 'order':
        return <ShoppingBag size={18} color="#10B981" />;
      default:
        return <Bell size={18} color={Colors.magenta} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Header
        showBack
        onBack={() => navigation.goBack()}
        title="Activity & Notifications"
        subtitle="Live vehicle security alerts"
      />

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === 'all' && styles.filterChipTextActive,
            ]}
          >
            All Activity
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'alert' && styles.filterChipActive]}
          onPress={() => setFilter('alert')}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === 'alert' && styles.filterChipTextActive,
            ]}
          >
            Security & Scans
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'system' && styles.filterChipActive]}
          onPress={() => setFilter('system')}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === 'system' && styles.filterChipTextActive,
            ]}
          >
            System & Care
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((n) => (
            <TouchableOpacity
              key={n.id}
              style={[styles.notifCard, !n.isRead && styles.notifCardUnread]}
              onPress={() => markNotificationRead(n.id)}
              activeOpacity={0.8}
            >
              <View style={styles.notifIconBox}>{getIcon(n.type)}</View>

              <View style={styles.notifContent}>
                <View style={styles.notifTitleRow}>
                  <Text style={styles.notifTitle}>{n.title}</Text>
                  {!n.isRead && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.notifMessage}>{n.message}</Text>
                <Text style={styles.notifTime}>{n.timestamp}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <Bell size={40} color={Colors.border} />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySub}>
              You will be alerted here whenever someone scans your vehicle tag.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    backgroundColor: Colors.surfaceSubtle,
    marginRight: Spacing.xs + 2,
  },
  filterChipActive: {
    backgroundColor: Colors.magenta,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSub,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.huge,
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.subtle,
  },
  notifCardUnread: {
    borderColor: Colors.magentaBorder,
    backgroundColor: Colors.magentaLight,
  },
  notifIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  notifContent: {
    flex: 1,
  },
  notifTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.magenta,
    marginLeft: 6,
  },
  notifMessage: {
    fontSize: 12,
    color: Colors.textSub,
    lineHeight: 17,
    marginBottom: 4,
  },
  notifTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    marginTop: Spacing.md,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: Spacing.xl,
  },
});
