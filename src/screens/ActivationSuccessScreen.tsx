import React from 'react';
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
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';
import { Button } from '../components/Button';
import {
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Car,
  PhoneCall,
  Sparkles,
} from 'lucide-react-native';

type ActivationSuccessProps = NativeStackScreenProps<RootStackParamList, 'ActivationSuccess'>;

export default function ActivationSuccessScreen({ route, navigation }: ActivationSuccessProps) {
  const { vehicleNo, tagId, makeModel } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Celebration Header */}
        <View style={styles.headerBlock}>
          <View style={styles.checkCircle}>
            <CheckCircle2 size={52} color={Colors.magenta} />
          </View>
          <View style={styles.pill}>
            <Sparkles size={11} color="#FFFFFF" />
            <Text style={styles.pillText}>ACTIVATION SUCCESSFUL</Text>
          </View>
          <Text style={styles.title}>Your CarFrnd Tag is Live!</Text>
          <Text style={styles.subtitle}>
            {vehicleNo} is now protected with 24/7 cloud call masking and parking alert monitoring.
          </Text>
        </View>

        {/* Digital Tag Card */}
        <View style={styles.qrCard}>
          <View style={styles.plateContainer}>
            <View style={styles.indStrip}>
              <Text style={styles.indText}>IND</Text>
            </View>
            <Text style={styles.plateText}>{vehicleNo}</Text>
          </View>

          <Text style={styles.modelText}>{makeModel}</Text>

          <View style={styles.qrGraphicBox}>
            <QrCode size={160} color="#0F172A" />
            <View style={styles.centerLogo}>
              <Text style={styles.centerLogoText}>CF</Text>
            </View>
          </View>

          <Text style={styles.tagIdLabel}>TAG ID: {tagId}</Text>

          <View style={styles.protectionPill}>
            <ShieldCheck size={13} color="#10B981" />
            <Text style={styles.protectionText}>Masked Calls & Emergency SOS Active</Text>
          </View>
        </View>

        {/* Next Steps Guide */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionTitle}>WHAT HAPPENS NEXT?</Text>
          <View style={styles.instructionRow}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.instructionText}>
              Peel the adhesive backing and stick the decal inside your lower front windshield.
            </Text>
          </View>
          <View style={styles.instructionRow}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.instructionText}>
              Anyone who scans will immediately be able to notify you without seeing your phone number.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Button
          title="View Vehicle in My Garage"
          onPress={() => navigation.replace('Garage')}
          size="lg"
          style={{ marginBottom: Spacing.sm }}
        />

        <Button
          title="Back to Home Dashboard"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }
          variant="outline"
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  checkCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: Colors.magentaLight,
    borderWidth: 2,
    borderColor: Colors.magentaBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.subtle,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    marginBottom: Spacing.sm,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    marginLeft: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textMain,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSub,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
  },
  qrCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0F172A',
    borderRadius: Radius.xs,
    paddingVertical: 3,
    paddingRight: 10,
    marginBottom: 4,
  },
  indStrip: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 5,
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
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1.2,
  },
  modelText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  qrGraphicBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: Spacing.sm,
  },
  centerLogo: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  centerLogoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  tagIdLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textMain,
    marginTop: Spacing.md,
    letterSpacing: 0.6,
  },
  protectionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
    marginTop: 6,
  },
  protectionText: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '700',
    marginLeft: 4,
  },
  instructionsCard: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  instructionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.magenta,
    width: 18,
  },
  instructionText: {
    fontSize: 13,
    color: Colors.textSub,
    flex: 1,
    lineHeight: 18,
  },
});
