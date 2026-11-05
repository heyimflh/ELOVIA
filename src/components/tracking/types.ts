export type TrackingStepId = 1 | 2 | 3 | 4;

export interface TrackingStep {
  id: TrackingStepId;
  label: string;
  shortLabel: string;
  description: string;
  timeEstimate?: string;
  iconName: 'clock' | 'truck' | 'scale' | 'checkCircle';
}

export type DeliveryMethod = 'pickup' | 'dropoff';

export interface WeighedMaterial {
  id: string;
  name: string;
  category: string;
  categoryBadge: string;
  estimatedWeight: number; // in kg
  verifiedWeight: number | null; // in kg or null if pending
  pricePerKg: number;
  image?: string;
}

export interface DriverInfo {
  name: string;
  role: string;
  avatar: string;
  phone: string;
  whatsappUrl: string;
  vehicleType: string;
  plateNumber: string;
  rating: number;
  totalTrips: number;
  driverId: string;
}

export interface PartnerFacilityInfo {
  name: string;
  role: string;
  avatar: string;
  operatingHours: string;
  address: string;
  distance: string;
  phone: string;
  mapsUrl: string;
}

export interface EcologicalImpact {
  carbonOffsetKg: number; // e.g. 12.4
  greenPoints: number; // e.g. 120
  waterSavedLiters: number; // e.g. 48
}

export interface OrderTrackingData {
  orderId: string;
  referenceNumber: string;
  createdAt: string;
  scheduledTime: string;
  deliveryMethod: DeliveryMethod;
  currentStep: TrackingStepId;
  estimatedArrival: string;
  remainingDistance: string;
  driver: DriverInfo;
  partner: PartnerFacilityInfo;
  materials: WeighedMaterial[];
  impact: EcologicalImpact;
  cryptoHash: string;
}

