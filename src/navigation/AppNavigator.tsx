import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import RegisterProfileScreen from '../screens/RegisterProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanQrScreen from '../screens/ScanQrScreen';
import ScanVerificationScreen from '../screens/ScanVerificationScreen';
import VehiclePublicProfileScreen from '../screens/VehiclePublicProfileScreen';
import ScanSubmittedScreen from '../screens/ScanSubmittedScreen';
import ActivateTagScreen from '../screens/ActivateTagScreen';
import ActivationSuccessScreen from '../screens/ActivationSuccessScreen';
import OrderTagScreen from '../screens/OrderTagScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import GarageScreen from '../screens/GarageScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="RegisterProfile" component={RegisterProfileScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScanQr" component={ScanQrScreen} />
        <Stack.Screen name="ScanVerification" component={ScanVerificationScreen} />
        <Stack.Screen name="VehiclePublicProfile" component={VehiclePublicProfileScreen} />
        <Stack.Screen name="ScanSubmitted" component={ScanSubmittedScreen} />
        <Stack.Screen name="ActivateTag" component={ActivateTagScreen} />
        <Stack.Screen name="ActivationSuccess" component={ActivationSuccessScreen} />
        <Stack.Screen name="OrderTag" component={OrderTagScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        <Stack.Screen name="Garage" component={GarageScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
