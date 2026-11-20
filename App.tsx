import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ScanProvider } from './src/context/ScanContext';

// Splash & Auth Screens
import SplashScreen from './src/screens/Splash/SplashScreen';
import ServicesSplashScreen from './src/screens/Splash/ServicesSplashScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAccount/CreateAccountScreen';
import VerifyOTPScreen from './src/screens/VerifyOTP/VerifyOTPScreen';

// Core Experience Screens
import LocationScreen from './src/screens/Location/LocationScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import BookingsScreen from './src/screens/Bookings/BookingsScreen';

// Vendor & Services Flow
import SelectVendorScreen from './src/screens/Vendor/SelectVendorScreen';
import ServiceDetailsScreen from './src/screens/ServiceDetails/ServiceDetailsScreen';
import CartScreen from './src/screens/Cart/CartScreen';
import CheckoutScreen from './src/screens/Checkout/CheckoutScreen';
import PaymentScreen from './src/screens/Payment/PaymentScreen';
import PaymentSuccessScreen from './src/screens/Payment/PaymentSuccessScreen';
import BookingStatusScreen from './src/screens/Booking/BookingStatusScreen';
import OrderCompletedScreen from './src/screens/Booking/OrderCompletedScreen';

// Tyre Services Flow
import TyreSearchScreen from './src/screens/Tyres/TyreSearchScreen';
import TyreListScreen from './src/screens/Tyres/TyreListScreen';
import SelectInstallerScreen from './src/screens/Tyres/SelectInstallerScreen';
import TyreCartScreen from './src/screens/Cart/TyreCartScreen';
import TyreCheckoutScreen from './src/screens/Checkout/TyreCheckoutScreen';
import TyrePaymentScreen from './src/screens/Payment/TyrePaymentScreen';
import TyreOrderSuccessScreen from './src/screens/Payment/TyreOrderSuccessScreen';

// CarFrnd Connect Ecosystem
import ConnectSplashScreen from './src/screens/Connect/ConnectSplashScreen';
import ConnectHomeScreen from './src/screens/Connect/ConnectHomeScreen';
import ScanTagScreen from './src/screens/Connect/ScanTagScreen';
import ContactOwnerScreen from './src/screens/Connect/ContactOwnerScreen';
import SecureCallScreen from './src/screens/Connect/SecureCallScreen';
import OrderTagScreen from './src/screens/Connect/OrderTagScreen';
import TagPaymentSuccessScreen from './src/screens/Connect/TagPaymentSuccessScreen';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [screenParams, setScreenParams] = useState<any>(null);

  useEffect(() => {
    // Show branded splash screen for 2.2 seconds before entering Login
    const timer = setTimeout(() => {
      setCurrentScreen('Login');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (screen: string, params?: any) => {
    setScreenParams(params || null);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Login':
        return <LoginScreen onNavigate={handleNavigate} />;
      case 'CreateAccount':
        return <CreateAccountScreen onNavigate={handleNavigate} />;
      case 'VerifyOTP':
        return <VerifyOTPScreen onNavigate={handleNavigate} />;
      case 'Location':
        return <LocationScreen onNavigate={handleNavigate} />;
      case 'Home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'Profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'SelectVendor':
        return <SelectVendorScreen onNavigate={handleNavigate} />;
      case 'ServiceDetails':
        return <ServiceDetailsScreen onNavigate={handleNavigate} />;
      case 'Cart':
        return <CartScreen onNavigate={handleNavigate} />;
      case 'Checkout':
        return <CheckoutScreen onNavigate={handleNavigate} />;
      case 'Payment':
        return <PaymentScreen onNavigate={handleNavigate} />;
      case 'PaymentSuccess':
        return <PaymentSuccessScreen onNavigate={handleNavigate} />;
      case 'BookingStatus':
        return <BookingStatusScreen onNavigate={handleNavigate} />;
      case 'OrderCompleted':
        return <OrderCompletedScreen onNavigate={handleNavigate} />;
      case 'Bookings':
        return <BookingsScreen onNavigate={handleNavigate} />;
      case 'TyreSearch':
        return <TyreSearchScreen onNavigate={handleNavigate} />;
      case 'TyreList':
        return <TyreListScreen onNavigate={handleNavigate} />;
      case 'SelectInstaller':
        return <SelectInstallerScreen onNavigate={handleNavigate} />;
      case 'TyreCart':
        return <TyreCartScreen onNavigate={handleNavigate} />;
      case 'TyreCheckout':
        return <TyreCheckoutScreen onNavigate={handleNavigate} />;
      case 'TyrePayment':
        return <TyrePaymentScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      case 'TyreOrderSuccess':
        return <TyreOrderSuccessScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      case 'ConnectSplash':
        return <ConnectSplashScreen onNavigate={handleNavigate} />;
      case 'ConnectHome':
        return <ConnectHomeScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      case 'ServicesSplash':
        return <ServicesSplashScreen onNavigate={handleNavigate} />;
      case 'ScanTag':
        return <ScanTagScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      case 'OrderTag':
        return <OrderTagScreen onNavigate={handleNavigate} />;
      case 'ContactOwner':
        return <ContactOwnerScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      case 'TagPaymentSuccess':
        return <TagPaymentSuccessScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      case 'SecureCall':
        return <SecureCallScreen onNavigate={handleNavigate} routeParams={screenParams} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ScanProvider>
          <AppContent />
        </ScanProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
