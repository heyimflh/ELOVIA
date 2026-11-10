/**
 * ELOVIA Address Management Store
 * Handles persistent storage, CRUD operations, and cross-feature synchronization
 * with /salur/baru and user pickup dispatching.
 */

export interface AddressItem {
  id: string;
  type: 'home' | 'office' | 'kost' | 'other';
  label: string;
  recipientName: string;
  phone: string;
  fullAddress: string;
  city?: string;
  district?: string;
  postalCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  driverNotes?: string;
  isDefault: boolean;
  createdAt?: string;
}

export const STORAGE_KEY = 'elovia_saved_addresses';

export const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: 'addr-01',
    type: 'home',
    label: 'Rumah',
    recipientName: 'Budi Santoso',
    phone: '+62 812-3456-7890',
    fullAddress:
      'Jl. Sukamaju No. 12, RT 03 / RW 05, Kel. Cibiru, Kec. Coblong, Kota Bandung, 40135',
    city: 'Kota Bandung',
    district: 'Coblong',
    postalCode: '40135',
    coordinates: {
      lat: -6.8924,
      lng: 107.6186,
    },
    driverNotes: 'Pagar hitam tinggi, posisi rumah di ujung jalan buntu sebelah pohon mangga.',
    isDefault: true,
    createdAt: '2026-10-15T09:00:00Z',
  },
  {
    id: 'addr-02',
    type: 'office',
    label: 'Kantor',
    recipientName: 'Budi Santoso (Office)',
    phone: '+62 811-2233-4455',
    fullAddress:
      'Gedung Sate Lt. 2, Jl. Diponegoro No. 22, Citarum, Kec. Bandung Wetan, Kota Bandung, 40115',
    city: 'Kota Bandung',
    district: 'Bandung Wetan',
    postalCode: '40115',
    coordinates: {
      lat: -6.9024,
      lng: 107.6187,
    },
    driverNotes: 'Titip di pos satpam depan lobby utama, bilang paket pilah sampah untuk Pak Budi.',
    isDefault: false,
    createdAt: '2026-10-28T14:30:00Z',
  },
];

export function getSavedAddresses(): AddressItem[] {
  if (typeof window === 'undefined') {
    return INITIAL_ADDRESSES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ADDRESSES));
      return INITIAL_ADDRESSES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_ADDRESSES;
  } catch (err) {
    console.warn('Failed to read addresses from localStorage:', err);
    return INITIAL_ADDRESSES;
  }
}

export function saveAddressesToStorage(addresses: AddressItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    // Dispatch custom event for cross-tab or cross-component reactivity
    window.dispatchEvent(new Event('elovia_addresses_updated'));
  } catch (err) {
    console.error('Failed to save addresses to localStorage:', err);
  }
}

export function getDefaultAddress(): AddressItem | null {
  const addresses = getSavedAddresses();
  return addresses.find((a) => a.isDefault) || addresses[0] || null;
}

