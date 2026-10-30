import { DispatchedAlert } from '../context/ScanContext';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Otp: { phone: string };
  RegisterProfile: { phone: string };
  Home: undefined;
  ScanQr: undefined;
  ScanVerification: { token: string };
  VehiclePublicProfile: { token: string };
  ScanSubmitted: { alert: DispatchedAlert };
  ActivateTag: { prefillTag?: string } | undefined;
  ActivationSuccess: { vehicleNo: string; tagId: string; makeModel: string };
  OrderTag: undefined;
  OrderTracking: { orderId: string };
  Garage: undefined;
  Notifications: undefined;
  Profile: undefined;
  ServiceDetail: { serviceId: string };
};
