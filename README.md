# CarFrnd Mobile App (React Native)

Smart Vehicle Safety & Emergency QR Tag Application designed for the CarFrnd ecosystem.

---

## 🎨 Brand Design & Styling
- **Signature Magenta**: `#FF2B85`
- **Dark Elements**: `#0B0F19`, `#0F172A`, `#1E293B`
- **Clean Surfaces**: `#FFFFFF`, `#F8FAFC`, `#F1F5F9`
- **Status Accents**: `#10B981` (Active/Verified), `#F59E0B` (Pending), `#EF4444` (Critical SOS)
- **Logos & Media**: High-res logo and real automotive service photography located in `assets/`.

---

## 🚀 End-to-End User Flow Architecture

```
                                    ┌───────────────────────┐
                                    │     SplashScreen      │
                                    │  (Animated Brand Tag) │
                                    └───────────┬───────────┘
                                                │
                                    ┌───────────▼───────────┐
                                    │   OnboardingScreen    │
                                    │ (3 Interactive Slides)│
                                    └───────────┬───────────┘
                                                │
                                    ┌───────────▼───────────┐
                                    │      LoginScreen      │
                                    │  (+91 Mobile & Demo)  │
                                    └───────────┬───────────┘
                                                │
                                    ┌───────────▼───────────┐
                                    │       OtpScreen       │
                                    │  (4 Digits / Timer)   │
                                    └───────────┬───────────┘
                                                │
                                    ┌───────────▼───────────┐
                                    │ RegisterProfileScreen │
                                    │  (City selector chips)│
                                    └───────────┬───────────┘
                                                │
                                    ┌───────────▼───────────┐
                                    │      HomeScreen       │
                                    │  (Master Dashboard)   │
                                    └───────────┬───────────┘
           ┌──────────────────────┬─────────────┴─────────────┬─────────────────────┐
           ▼                      ▼                           ▼                     ▼
┌──────────────────┐    ┌──────────────────┐        ┌──────────────────┐   ┌──────────────────┐
│   ScanQrScreen   │    │ ActivateTagScreen│        │  OrderTagScreen  │   │   GarageScreen   │
│(Viewfinder Laser)│    │(3-Step QR Wizard)│        │  (₹450 Delivery) │   │ (Vehicle Toggles)│
└──────────┬───────┘    └─────────┬────────┘        └─────────┬────────┘   └──────────────────┘
           │                      │                           │
┌──────────▼──────────┐ ┌─────────▼──────────────┐  ┌─────────▼──────────────┐
│ScanVerificationGate │ │ ActivationSuccessScreen│  │  OrderTrackingScreen  │
│(Plate Last 4 Digits)│ │  (Digital QR Decal)    │  │ (BlueDart / Delhivery) │
└──────────┬──────────┘ └────────────────────────┘  └────────────────────────┘
           │
┌──────────▼───────────────┐
│VehiclePublicProfileScreen│
│(Send Alert / Masked Call)│
└──────────┬───────────────┘
           │
┌──────────▼───────────────┐
│   ScanSubmittedScreen    │
│(SMS/Push/WA Confirmation)│
└──────────────────────────┘
```

---

## 📱 How to Run Locally

### 1. Start Metro Bundler
```bash
npm start
```

### 2. Run on Android Device / Emulator
Make sure you have an Android device connected via USB with USB Debugging enabled, or an Android emulator running:
```bash
npm run android
```

---

## 🛠️ Tech Stack
- **Framework**: React Native 0.87.1
- **Navigation**: `@react-navigation/native` & `@react-navigation/native-stack`
- **Design & Icons**: `lucide-react-native` & `react-native-svg`
- **State & Storage**: React Context + `@react-native-async-storage/async-storage`
- **Safe Area**: `react-native-safe-area-context`
