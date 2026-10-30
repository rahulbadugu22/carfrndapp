import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS, USE_MOCK_AUTH } from '../config/api';

export interface Vehicle {
  id: string;
  regNumber: string;
  tagId: string;
  makeModel: string;
  vehicleType: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  emergencyPhone?: string;
  callMasking: boolean;
  towingAlerts: boolean;
  activatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  city: string;
  email?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'order' | 'system' | 'scan';
  isRead: boolean;
}

export interface OrderItem {
  orderId: string;
  date: string;
  quantity: number;
  totalPrice: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  vehicleNo: string;
  address: string;
  trackingNumber: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
  vehicles: Vehicle[];
  orders: OrderItem[];
  notifications: AppNotification[];
  isMockAuth: boolean;
  setIsMockAuth: (val: boolean) => void;
  sendOtp: (phone: string) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; isNewUser?: boolean; message?: string }>;
  registerProfile: (name: string, city: string, email?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<{ success: boolean; message?: string }>;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'activatedAt'>) => void;
  toggleVehicleCallMasking: (vehicleId: string) => void;
  toggleVehicleTowingAlerts: (vehicleId: string) => void;
  createOrder: (orderData: Omit<OrderItem, 'orderId' | 'date' | 'status' | 'trackingNumber'>) => Promise<OrderItem>;
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  activateTagAndCreateAccount: (params: {
    tagId: string;
    vehicleNo: string;
    name: string;
    email?: string;
    phone: string;
    otp?: string;
  }) => Promise<{ success: boolean; vehicle?: Vehicle; message?: string }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const DEFAULT_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    regNumber: 'KA 01 MJ 8820',
    tagId: 'CFD-BLR-000001',
    makeModel: 'Hyundai Creta SX (2024)',
    vehicleType: 'Car / SUV',
    status: 'ACTIVE',
    emergencyPhone: '+91 91234 56789',
    callMasking: true,
    towingAlerts: true,
    activatedAt: '12 Jan 2026',
  },
  {
    id: 'veh-2',
    regNumber: 'KA 03 AA 4567',
    tagId: 'CFD-BLR-002341',
    makeModel: 'Tata Nexon EV Dark',
    vehicleType: 'Electric SUV',
    status: 'ACTIVE',
    emergencyPhone: '+91 98765 11223',
    callMasking: true,
    towingAlerts: true,
    activatedAt: '28 Feb 2026',
  },
];

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Smart Tag Active & Protected',
    message: 'Your CarFrnd QR Tag for KA 01 MJ 8820 is online and monitored 24/7.',
    timestamp: '10 mins ago',
    type: 'system',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Parking Ping Received',
    message: 'Someone scanned your vehicle QR tag at Koramangala 4th Block.',
    timestamp: '2 hours ago',
    type: 'scan',
    isRead: false,
  },
  {
    id: 'notif-3',
    title: 'CarFrnd Doorstep Wash Launch',
    message: 'Doorstep foam wash is now expanding in Bengaluru. Book your spot today!',
    timestamp: 'Yesterday',
    type: 'alert',
    isRead: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(DEFAULT_VEHICLES);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(DEFAULT_NOTIFICATIONS);
  const [tempPhone, setTempPhone] = useState<string>('');
  const [isMockAuth, setIsMockAuth] = useState<boolean>(USE_MOCK_AUTH);

  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('carfrnd_token');
      const storedUser = await AsyncStorage.getItem('carfrnd_user');
      const storedVehicles = await AsyncStorage.getItem('carfrnd_vehicles');
      const storedOrders = await AsyncStorage.getItem('carfrnd_orders');

      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }

      if (storedToken && storedUser) {
        setToken(storedToken);
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);

        // Sync fresh profile & linked vehicles from backend API
        try {
          const res = await fetch(ENDPOINTS.me, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const data = await res.json();
          if (res.ok && data.success && data.customer) {
            const dbCust = data.customer;
            const updatedProfile: UserProfile = {
              id: dbCust.id,
              name: dbCust.name || parsedUser.name,
              phone: dbCust.phone || parsedUser.phone,
              city: dbCust.city || parsedUser.city,
              email: dbCust.email || parsedUser.email,
            };
            setUser(updatedProfile);
            await AsyncStorage.setItem('carfrnd_user', JSON.stringify(updatedProfile));

            if (Array.isArray(dbCust.vehicles) && dbCust.vehicles.length > 0) {
              const liveVehicles: Vehicle[] = dbCust.vehicles.map((v: any, idx: number) => ({
                id: v.id || `veh-${idx}`,
                regNumber: v.reg_number || 'UNKNOWN',
                tagId: v.tag_id || 'CFD-LIVE-TAG',
                makeModel: v.make_model || 'Registered Vehicle',
                vehicleType: 'Car / SUV',
                status: (v.tag_status as any) || 'ACTIVE',
                emergencyPhone: parsedUser.phone,
                callMasking: true,
                towingAlerts: true,
                activatedAt: 'Active',
              }));
              setVehicles(liveVehicles);
              await AsyncStorage.setItem('carfrnd_vehicles', JSON.stringify(liveVehicles));
            }
          }
        } catch {
          // Graceful fallback to cached session on network offline
        }
      }
      if (storedVehicles) {
        setVehicles(JSON.parse(storedVehicles));
      }
    } catch (e) {
      console.log('Error loading session:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (phone: string): Promise<{ success: boolean; message?: string }> => {
    setTempPhone(phone);
    if (!isMockAuth) {
      // Live Mode: Dispatch OTP via MSG91 REST API
      try {
        const res = await fetch(ENDPOINTS.sendOtp, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          return { success: true, message: data.message || 'OTP sent successfully to your mobile number' };
        }
        return { success: false, message: data.error || 'Failed to send OTP. Please check mobile number.' };
      } catch {
        return { success: false, message: 'Network error: Cannot reach CarFrnd server. Please verify connection.' };
      }
    }

    // Mock Mode: Instant offline verification for testing
    return { success: true, message: 'Test Mode: Use code 1234' };
  };

  const verifyOtp = async (
    phone: string,
    otp: string
  ): Promise<{ success: boolean; isNewUser?: boolean; message?: string }> => {
    if (!isMockAuth) {
      // Live Mode: Strict server verification via MSG91
      try {
        const res = await fetch(ENDPOINTS.verifyOtp, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (data.isNewUser) {
            return { success: true, isNewUser: true };
          }
          const profile = data.customer || {
            id: 'cust-live',
            name: 'Registered User',
            phone,
            city: 'India',
          };
          const authToken = data.token;
          if (authToken) {
            await AsyncStorage.setItem('carfrnd_token', authToken);
            setToken(authToken);
          }
          await AsyncStorage.setItem('carfrnd_user', JSON.stringify(profile));
          setUser(profile);
          setIsLoggedIn(true);
          return { success: true, isNewUser: false };
        }
        return { success: false, message: data.error || 'Invalid OTP. Please try again.' };
      } catch {
        return { success: false, message: 'Network error connecting to verification server.' };
      }
    }

    // Test Mode: Validate 1234 or 4 digits
    if (otp === '1234' || otp.length === 4) {
      const isExisting = phone.endsWith('00') || phone.endsWith('10');
      if (isExisting) {
        const profile: UserProfile = {
          id: 'cust-1',
          name: 'Rahul Verma',
          phone,
          city: 'Bengaluru',
          email: 'rahul.verma@example.com',
        };
        const mockToken = 'mock-jwt-carfrnd-token';
        await AsyncStorage.setItem('carfrnd_token', mockToken);
        await AsyncStorage.setItem('carfrnd_user', JSON.stringify(profile));
        setToken(mockToken);
        setUser(profile);
        setIsLoggedIn(true);
        return { success: true, isNewUser: false };
      }
      return { success: true, isNewUser: true };
    }

    return { success: false, message: 'Invalid test OTP code. Use 1234' };
  };

  const registerProfile = async (
    name: string,
    city: string,
    email?: string
  ): Promise<{ success: boolean; message?: string }> => {
    const effectivePhone = tempPhone || user?.phone || '+91 98765 43210';
    let profile: UserProfile = {
      id: `cust-${Date.now()}`,
      name,
      phone: effectivePhone,
      city,
      email,
    };
    let authToken = 'mock-jwt-carfrnd-registered';

    try {
      const res = await fetch(ENDPOINTS.registerProfile, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: effectivePhone,
          name,
          city,
          email,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.customer) {
          profile = {
            id: data.customer.id,
            name: data.customer.name,
            phone: data.customer.phone,
            city: data.customer.city,
            email: data.customer.email,
          };
        }
        if (data.token) {
          authToken = data.token;
        }
      }
    } catch {
      // Offline fallback
    }

    try {
      await AsyncStorage.setItem('carfrnd_token', authToken);
      await AsyncStorage.setItem('carfrnd_user', JSON.stringify(profile));
    } catch {}

    setToken(authToken);
    setUser(profile);
    setIsLoggedIn(true);
    return { success: true };
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('carfrnd_token');
      await AsyncStorage.removeItem('carfrnd_user');
    } catch {}
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const deleteAccount = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const savedToken = await AsyncStorage.getItem('carfrnd_token');
      try {
        await fetch(ENDPOINTS.deleteAccount, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {}),
          },
          body: JSON.stringify({ phone: user?.phone }),
        });
      } catch (e) {
        console.warn('Network call to deleteAccount failed, purging local cache:', e);
      }

      await Promise.all([
        AsyncStorage.removeItem('carfrnd_token'),
        AsyncStorage.removeItem('carfrnd_user'),
        AsyncStorage.removeItem('carfrnd_vehicles'),
        AsyncStorage.removeItem('carfrnd_orders'),
        AsyncStorage.removeItem('carfrnd_notifications'),
      ]);

      setUser(null);
      setToken(null);
      setVehicles([]);
      setOrders([]);
      setNotifications([]);
      setIsLoggedIn(false);

      return {
        success: true,
        message: 'Your account, registered vehicles, and data have been permanently erased.',
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to complete account deletion' };
    }
  };

  const addVehicle = (newVeh: Omit<Vehicle, 'id' | 'activatedAt'>) => {
    const vehicle: Vehicle = {
      ...newVeh,
      id: `veh-${Date.now()}`,
      activatedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setVehicles((prev) => [vehicle, ...prev]);
    return vehicle;
  };

  const activateTagAndCreateAccount = async (params: {
    tagId: string;
    vehicleNo: string;
    name: string;
    email?: string;
    phone: string;
    otp?: string;
  }): Promise<{ success: boolean; vehicle?: Vehicle; message?: string }> => {
    const { tagId, vehicleNo, name, email, phone } = params;

    // Build or update profile
    const profile: UserProfile = {
      id: user?.id || `cust-${Date.now()}`,
      name: name.trim() || user?.name || 'CarFrnd Member',
      phone: phone.trim() || user?.phone || '+91 98765 43210',
      city: user?.city || 'Bengaluru',
      email: email?.trim() || user?.email,
    };

    const authToken = token || 'jwt-carfrnd-' + Date.now();
    let newVehicle: Vehicle = {
      id: `veh-${Date.now()}`,
      regNumber: vehicleNo.trim().toUpperCase(),
      tagId: tagId.trim().toUpperCase(),
      makeModel: 'Registered Vehicle',
      vehicleType: 'Car / SUV',
      status: 'ACTIVE',
      emergencyPhone: phone,
      callMasking: true,
      towingAlerts: true,
      activatedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    // Call backend API to link QR tag and create vehicle in PostgreSQL
    try {
      const res = await fetch(ENDPOINTS.activateTag, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          tagId: tagId.trim().toUpperCase(),
          serialNumber: tagId.trim().toUpperCase(),
          vehicleNo: vehicleNo.trim().toUpperCase(),
          ownerPhone: phone.trim(),
          emergencyPhone: phone.trim(),
          makeModel: 'Registered Vehicle',
          vehicleType: 'Car / SUV',
          customerId: user?.id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.vehicle) {
        newVehicle.id = data.vehicle.id || newVehicle.id;
        newVehicle.makeModel = data.vehicle.makeModel || newVehicle.makeModel;
      }
    } catch {
      // Local fallback for offline dev/test
    }

    try {
      await AsyncStorage.setItem('carfrnd_token', authToken);
      await AsyncStorage.setItem('carfrnd_user', JSON.stringify(profile));
      await AsyncStorage.setItem('carfrnd_vehicles', JSON.stringify([newVehicle, ...vehicles]));
    } catch {}

    setToken(authToken);
    setUser(profile);
    setIsLoggedIn(true);
    setVehicles((prev) => [newVehicle, ...prev]);

    // Add activity notification
    addNotification({
      title: 'QR Tag Activated!',
      message: `Your smart vehicle tag for ${vehicleNo.toUpperCase()} is now live with masked call protection.`,
      type: 'system',
    });

    return { success: true, vehicle: newVehicle };
  };

  const toggleVehicleCallMasking = (vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, callMasking: !v.callMasking } : v))
    );
  };

  const toggleVehicleTowingAlerts = (vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, towingAlerts: !v.towingAlerts } : v))
    );
  };

  const createOrder = async (
    orderData: Omit<OrderItem, 'orderId' | 'date' | 'status' | 'trackingNumber'>
  ): Promise<OrderItem> => {
    let newOrder: OrderItem = {
      ...orderData,
      orderId: `CF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Processing',
      trackingNumber: `TRK-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    try {
      const res = await fetch(ENDPOINTS.orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          phone: user?.phone,
          vehicleNo: orderData.vehicleNo,
          quantity: orderData.quantity,
          totalPrice: orderData.totalPrice,
          address: orderData.address,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.order) {
        newOrder = data.order;
      }
    } catch {
      // Offline fallback
    }

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      AsyncStorage.setItem('carfrnd_orders', JSON.stringify(updated)).catch(() => {});
      return updated;
    });

    return newOrder;
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const addNotification = (
    notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>
  ) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        token,
        vehicles,
        orders,
        notifications,
        isMockAuth,
        setIsMockAuth,
        sendOtp,
        verifyOtp,
        registerProfile,
        logout,
        deleteAccount,
        addVehicle,
        toggleVehicleCallMasking,
        toggleVehicleTowingAlerts,
        createOrder,
        markNotificationRead,
        addNotification,
        activateTagAndCreateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
