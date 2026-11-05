'use client';

import { useSyncExternalStore, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  materialId: string;
  name: string;
  category: string;
  tag: string;
  weightKg: number;
  qualityGrade: string;
  qualityMultiplier: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  totalMinPrice: number;
  totalMaxPrice: number;
  co2ePerKg: number;
  totalCo2e: number;
  image?: string;
  icon?: string;
  color?: string;
  badge?: string;
}

export const INITIAL_DEMO_ITEMS: CartItem[] = [
  {
    id: 'cart-item-1',
    materialId: 'pet-clear',
    name: 'Botol Minuman PET',
    category: 'Plastik',
    tag: 'PET #1 Bening',
    weightKg: 20,
    qualityGrade: 'Bersih & Kering 1.0x',
    qualityMultiplier: 1.0,
    minPricePerKg: 12000,
    maxPricePerKg: 16500,
    totalMinPrice: 240000,
    totalMaxPrice: 330000,
    co2ePerKg: 0.51,
    totalCo2e: 10.2,
    image: '/images/materials/plastic.jpg',
    icon: '🍶',
    color: '#0E7C7B',
    badge: 'SNI Daur Ulang',
  },
  {
    id: 'cart-item-2',
    materialId: 'box-corrugated',
    name: 'Kardus Box Corrugated (Kraft)',
    category: 'Kertas',
    tag: 'Kraft Box',
    weightKg: 3.5,
    qualityGrade: 'Kering & Terlipat 1.0x',
    qualityMultiplier: 1.0,
    minPricePerKg: 2800,
    maxPricePerKg: 4200,
    totalMinPrice: 9800,
    totalMaxPrice: 14700,
    co2ePerKg: 0.628,
    totalCo2e: 2.2,
    image: '/images/materials/paper_cardboard.jpg',
    icon: '📦',
    color: '#DEA123',
    badge: 'Kraft Grade A',
  },
];

const STORAGE_KEY = 'elovia_material_cart_v1';

// In-memory store state for reactive subscribers
let cartState: CartItem[] = INITIAL_DEMO_ITEMS;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
      // Dispatch storage event for other tabs/components
      window.dispatchEvent(new Event('elovia-cart-updated'));
    } catch {
      // storage unavailable
    }
  }
}

// Hydrate from localStorage once on client
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        cartState = parsed;
      }
    }
  } catch {
    // fallback to initial
  }

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        cartState = JSON.parse(e.newValue);
        notify();
      } catch {
        // ignore
      }
    }
  });

  window.addEventListener('elovia-cart-updated', () => {
    listeners.forEach((listener) => listener());
  });
}

export const cartActions = {
  getItems: () => cartState,

  addItem: (item: CartItem) => {
    const existingIndex = cartState.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      const updated = [...cartState];
      const prev = updated[existingIndex];
      const newWeight = prev.weightKg + item.weightKg;
      updated[existingIndex] = {
        ...prev,
        weightKg: Number(newWeight.toFixed(1)),
        totalMinPrice: Math.round(newWeight * prev.minPricePerKg * prev.qualityMultiplier),
        totalMaxPrice: Math.round(newWeight * prev.maxPricePerKg * prev.qualityMultiplier),
        totalCo2e: Number((newWeight * prev.co2ePerKg).toFixed(1)),
      };
      cartState = updated;
    } else {
      cartState = [...cartState, item];
    }
    notify();
  },

  removeItem: (id: string) => {
    cartState = cartState.filter((item) => item.id !== id);
    notify();
  },

  updateWeight: (id: string, newWeight: number) => {
    const clampedWeight = Math.max(0.1, Math.min(1000, Number(newWeight.toFixed(1))));
    cartState = cartState.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          weightKg: clampedWeight,
          totalMinPrice: Math.round(clampedWeight * item.minPricePerKg * item.qualityMultiplier),
          totalMaxPrice: Math.round(clampedWeight * item.maxPricePerKg * item.qualityMultiplier),
          totalCo2e: Number((clampedWeight * item.co2ePerKg).toFixed(1)),
        };
      }
      return item;
    });
    notify();
  },

  clearCart: () => {
    cartState = [];
    notify();
  },

  resetToDemo: () => {
    cartState = [...INITIAL_DEMO_ITEMS];
    notify();
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useCart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = useSyncExternalStore(
    cartActions.subscribe,
    cartActions.getItems,
    () => INITIAL_DEMO_ITEMS
  );

  const totalWeight = Number(
    items.reduce((sum, item) => sum + item.weightKg, 0).toFixed(1)
  );

  const totalMinPrice = items.reduce((sum, item) => sum + item.totalMinPrice, 0);
  const totalMaxPrice = items.reduce((sum, item) => sum + item.totalMaxPrice, 0);

  const totalCo2e = Number(
    items.reduce((sum, item) => sum + item.totalCo2e, 0).toFixed(1)
  );

  const itemCount = items.length;

  return {
    items,
    totalWeight,
    totalMinPrice,
    totalMaxPrice,
    totalCo2e,
    itemCount,
    isLoaded: mounted,
    removeItem: cartActions.removeItem,
    updateWeight: cartActions.updateWeight,
    clearCart: cartActions.clearCart,
    resetToDemo: cartActions.resetToDemo,
    addItem: cartActions.addItem,
  };
}

