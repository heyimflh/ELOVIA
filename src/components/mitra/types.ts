export type OperationalStatus = 'open' | 'closed';

export interface MitraProfile {
  id: string;
  code: string;
  name: string;
  type: string;
  tagline: string;
  address: string;
  area: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  verified: boolean;
  sniStandard: string;
  rating: number;
  reviewsCount: number;
  operatingHours: string;
  pickupRadius: string;
  managerName: string;
  managerRole: string;
  managerEmail: string;
  managerAvatar: string;
  storeAvatarText: string;
  heroImage: string;
}

export type NotificationCategory = 'pickup' | 'dropoff' | 'weighing' | 'pricing' | 'system';

export interface MitraNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  category: NotificationCategory;
  orderId?: string;
  weightSummary?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface OperationalMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  badge?: string;
  badgeColor?: string;
  subtext: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
}

export type WasteQualityGrade = 'A' | 'B' | 'C';

export interface WeighInMaterialItem {
  id: string;
  name: string;
  estimatedWeight: number; // in kg
  basePricePerKg: number; // in Rp
  actualWeight: number; // in kg
  quality: WasteQualityGrade;
}

export interface WeighInTicketData {
  ticketId: string;
  customerName: string;
  customerAvatar?: string;
  location?: string;
  method?: 'pickup' | 'dropoff';
  materials: WeighInMaterialItem[];
}

