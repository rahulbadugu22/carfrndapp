export const APP_NAME = 'CarFrnd';
export const TAGLINE = 'Smart Safety & Emergency QR Tag';

export const CITIES = [
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Mumbai',
  'Delhi-NCR',
  'Pune',
  'Kolkata',
  'Ahmedabad',
];

export interface ParkingReason {
  id: string;
  label: string;
  iconName: string;
  badge: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export const DEFAULT_PARKING_REASONS: ParkingReason[] = [
  {
    id: 'blocking',
    label: 'Vehicle Blocking Way / Wrong Parking',
    iconName: 'AlertTriangle',
    badge: 'Parking Issue',
    severity: 'medium',
    description: 'Your car is parked in a way that blocks someone or entry/exit.',
  },
  {
    id: 'lights',
    label: 'Headlights / Parking Lights Left ON',
    iconName: 'Sparkles',
    badge: 'Battery Hazard',
    severity: 'low',
    description: 'Your lights were left turned on and could drain your battery.',
  },
  {
    id: 'window',
    label: 'Window Rolled Down / Unlocked',
    iconName: 'ShieldAlert',
    badge: 'Security Warning',
    severity: 'medium',
    description: 'Your vehicle window is open or door appears unlocked.',
  },
  {
    id: 'towed',
    label: 'Vehicle Being Towed by Traffic Police',
    iconName: 'Truck',
    badge: 'Urgent Tow Alert',
    severity: 'high',
    description: 'Traffic authority is towing or clamping your vehicle.',
  },
  {
    id: 'tyre',
    label: 'Flat Tyre / Hazard / Leakage',
    iconName: 'Disc',
    badge: 'Inspection Notice',
    severity: 'medium',
    description: 'A puncture or fluid leak was spotted under your vehicle.',
  },
  {
    id: 'emergency',
    label: 'Emergency / Accident / Medical Need',
    iconName: 'Bell',
    badge: 'Critical SOS',
    severity: 'critical',
    description: 'Urgent emergency requiring immediate driver or family attention.',
  },
];

export const DEMO_TAGS = [
  {
    token: 'CFD-BLR-000001',
    serialNumber: 'CFD-BLR-000001',
    status: 'ACTIVATED',
    valid: true,
    maskedPlate: 'KA 01 ** 8820',
    fullPlate: 'KA01MJ8820',
    vehicleModel: 'Hyundai Creta SX (2024)',
    vehicleType: 'Car / SUV',
    ownerName: 'Rahul Verma',
    ownerPhone: '+91 98765 43210',
    emergencyPhone: '+91 91234 56789',
    callMaskingEnabled: true,
    towingAlertsEnabled: true,
  },
  {
    token: 'CFD-MUM-000842',
    serialNumber: 'CFD-MUM-000842',
    status: 'ACTIVATED',
    valid: true,
    maskedPlate: 'MH 02 ** 1144',
    fullPlate: 'MH02CY1144',
    vehicleModel: 'Tata Nexon EV Max',
    vehicleType: 'EV / SUV',
    ownerName: 'Priya Sharma',
    ownerPhone: '+91 98200 12345',
    emergencyPhone: '+91 98200 98765',
    callMaskingEnabled: true,
    towingAlertsEnabled: true,
  },
  {
    token: 'CFD-NEW-999999',
    serialNumber: 'CFD-NEW-999999',
    status: 'ASSIGNED',
    valid: false,
    maskedPlate: '',
    fullPlate: '',
    vehicleModel: '',
    vehicleType: '',
    ownerName: '',
    ownerPhone: '',
    emergencyPhone: '',
    callMaskingEnabled: true,
    towingAlertsEnabled: true,
  },
];

export const AUTO_SERVICES = [
  {
    id: 'wash',
    title: 'Doorstep Car Wash',
    subtitle: 'Eco foam wash at home or office',
    priceTag: 'From ₹399',
    badge: 'POPULAR',
    imageKey: 'service_car_wash',
    tagline: 'High-pressure foam wash, wheel rim scrubbing & interior vacuuming.',
  },
  {
    id: 'detailing',
    title: 'Car Detailing',
    subtitle: 'Showroom finish & paint protection',
    priceTag: 'From ₹1,499',
    badge: 'PREMIUM',
    imageKey: 'service_car_detailing',
    tagline: 'Deep steam sanitization, leather conditioning, 3-step machine polish.',
  },
  {
    id: 'tyres',
    title: 'Tyres & Wheels',
    subtitle: '3D alignment & nitrogen fill',
    priceTag: 'Inspection Free',
    badge: 'SAFETY',
    imageKey: 'service_tyres_wheels',
    tagline: 'Branded tyres, computerized 3D alignment, dynamic balancing.',
  },
  {
    id: 'fastag',
    title: 'FASTag Services',
    subtitle: 'Recharge & instant balance check',
    priceTag: 'Instant',
    badge: 'ACTIVE',
    imageKey: 'service_fastag',
    tagline: 'Direct NPCI integration with 0% convenience fees.',
  },
  {
    id: 'challan',
    title: 'E-Challan Check',
    subtitle: 'Live traffic penalty lookup',
    priceTag: 'Free Check',
    badge: 'VERIFIED',
    imageKey: 'service_challan',
    tagline: 'Check pending traffic violations by vehicle registration plate.',
  },
  {
    id: 'rsa',
    title: 'Roadside Assistance',
    subtitle: '24/7 towing & flat tyre aid',
    priceTag: '24x7 Help',
    badge: 'EMERGENCY',
    imageKey: 'service_rsa',
    tagline: 'Rapid dispatch within 30 minutes anywhere in major cities.',
  },
];
