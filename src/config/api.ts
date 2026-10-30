import { Platform } from 'react-native';

// In Android emulator, 10.0.2.2 connects to host machine's localhost
// In iOS simulator, localhost connects directly
export const DEFAULT_API_HOST = Platform.select({
  android: 'http://10.0.2.2:5000',
  ios: 'http://localhost:5000',
  default: 'http://localhost:5000',
});

export const API_BASE_URL = DEFAULT_API_HOST;

// Authentication Mode Configuration:
// Set to false for LIVE MSG91 SMS OTP delivery (Production Mode)
// Set to true only for offline/local simulation with test code '1234'
export const USE_MOCK_AUTH = false;

export const ENDPOINTS = {
  // Auth & Profile
  sendOtp: `${API_BASE_URL}/api/customer/auth/send-otp`,
  verifyOtp: `${API_BASE_URL}/api/customer/auth/verify-otp`,
  registerProfile: `${API_BASE_URL}/api/customer/auth/register-profile`,
  resendOtp: `${API_BASE_URL}/api/customer/auth/resend-otp`,
  me: `${API_BASE_URL}/api/customer/auth/me`,
  deleteAccount: `${API_BASE_URL}/api/customer/auth/delete-account`,

  // Tag Management & Orders
  activateTag: `${API_BASE_URL}/api/customer/qr/activate`,
  orders: `${API_BASE_URL}/api/customer/orders`,

  // Public QR Tag Scan & Alerts
  scanTag: (token: string) => `${API_BASE_URL}/api/public/qr/${token}`,
  verifyPlate: (token: string) => `${API_BASE_URL}/api/public/qr/${token}/verify-plate`,
  parkingReasons: `${API_BASE_URL}/api/settings/parking-reasons`,
  createAlert: `${API_BASE_URL}/api/public/alerts`,
  maskedCallConnect: `${API_BASE_URL}/api/public/calls/masked-connect`,
};
