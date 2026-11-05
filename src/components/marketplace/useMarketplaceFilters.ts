'use client';

import { useState, useCallback, useMemo } from 'react';
import type { PartnerItem } from './partnerData';
import {
  type MarketplaceFilters,
  type MarketplaceCategory,
  type MarketplaceMethod,
  INITIAL_FILTERS,
} from './types';

export function useMarketplaceFilters(initialValues: Partial<MarketplaceFilters> = {}) {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    ...INITIAL_FILTERS,
    ...initialValues,
  });

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedCategory = useCallback((category: MarketplaceCategory) => {
    setFilters((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  const setSelectedMethod = useCallback((method: MarketplaceMethod) => {
    setFilters((prev) => ({ ...prev, selectedMethod: method }));
  }, []);

  const setIsVerifiedOnly = useCallback((verifiedOnly: boolean | ((prev: boolean) => boolean)) => {
    setFilters((prev) => ({
      ...prev,
      isVerifiedOnly: typeof verifiedOnly === 'function' ? verifiedOnly(prev.isVerifiedOnly) : verifiedOnly,
    }));
  }, []);

  const toggleVerifiedOnly = useCallback(() => {
    setFilters((prev) => ({ ...prev, isVerifiedOnly: !prev.isVerifiedOnly }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const filterPartners = useCallback(
    (partners: PartnerItem[]) => {
      return partners.filter((partner) => {
        // 1. Search Query filter (matches name, area, tagline, accepted materials)
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase().trim();
          const matchesName = partner.name.toLowerCase().includes(query);
          const matchesArea = partner.area.toLowerCase().includes(query);
          const matchesTagline = partner.tagline.toLowerCase().includes(query);
          const matchesMaterial = partner.acceptedMaterials.some((m) =>
            m.name.toLowerCase().includes(query)
          );
          if (!matchesName && !matchesArea && !matchesTagline && !matchesMaterial) {
            return false;
          }
        }

        // 2. Verified Only toggle
        if (filters.isVerifiedOnly && !partner.verified) {
          return false;
        }

        // 3. Category Filter
        if (filters.selectedCategory !== 'semua') {
          const categoryMap: Record<MarketplaceCategory, string> = {
            semua: '',
            plastik: 'plastic',
            kertas: 'paper',
            logam: 'metal',
            kaca: 'glass',
          };
          const targetCat = categoryMap[filters.selectedCategory];
          const acceptsCategory = partner.acceptedMaterials.some(
            (m) => m.category === targetCat
          );
          if (!acceptsCategory) {
            return false;
          }
        }

        // 4. Method Filter ('all' | 'pickup' | 'dropoff')
        if (filters.selectedMethod !== 'all') {
          if (!partner.handoverMethods.includes(filters.selectedMethod)) {
            return false;
          }
        }

        return true;
      });
    },
    [filters]
  );

  return {
    filters,
    searchQuery: filters.searchQuery,
    selectedCategory: filters.selectedCategory,
    selectedMethod: filters.selectedMethod,
    isVerifiedOnly: filters.isVerifiedOnly,
    setSearchQuery,
    setSelectedCategory,
    setSelectedMethod,
    setIsVerifiedOnly,
    toggleVerifiedOnly,
    resetFilters,
    filterPartners,
  };
}

