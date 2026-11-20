import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import { Colors } from '../../theme/colors';

export default function OrderCompletedScreen({ onNavigate }: { onNavigate: any }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Header Background */}
        <View style={styles.headerBackground}>
          <View style={styles.successIconContainer}>
            <Icon name="check" size={32} color={Colors.magenta} />
          </View>
          <Text style={styles.title}>Your Car Is Now{'\n'}Sparkling Clean!</Text>
          <Text style={styles.subtitle}>
            Order #CW-892341 has been completed successfully at your doorstep.
          </Text>
        </View>

        {/* Review Card */}
        <View style={styles.reviewCard}>
          <View style={styles.vendorRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' }}
              style={styles.vendorAvatar}
            />
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>Rajesh Kumar</Text>
              <Text style={styles.vendorRole}>Detailing Specialist</Text>
            </View>
            <View style={styles.proBadge}>
              <Icon name="award" size={10} color={Colors.magenta} style={{ marginRight: 4 }} />
              <Text style={styles.proText}>Pro 4.9★</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.questionText}>Rate your service experience:</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Icon
                  name="star"
                  size={32}
                  color={star <= rating ? '#F59E0B' : '#CBD5E1'}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Leave a helpful feedback for Rajesh (Optional)..."
              placeholderTextColor="#94A3B8"
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => onNavigate('Home')}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>Submit & Return to Home</Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  headerBackground: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.magentaLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: -20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 40,
  },
  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  vendorRole: {
    fontSize: 12,
    color: '#64748B',
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.magentaLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  proText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.magenta,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  starIcon: {
    marginHorizontal: 6,
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    height: 80,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 13,
    color: '#0F172A',
    height: '100%',
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: Colors.magenta,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
