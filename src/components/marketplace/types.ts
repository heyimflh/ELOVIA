export type MarketplaceCategory = 'semua' | 'plastik' | 'kertas' | 'logam' | 'kaca';

export type MarketplaceMethod = 'all' | 'pickup' | 'dropoff';

export interface MarketplaceFilters {
  searchQuery: string;
  selectedCategory: MarketplaceCategory;
  selectedMethod: MarketplaceMethod;
  isVerifiedOnly: boolean;
}

export const INITIAL_FILTERS: MarketplaceFilters = {
  searchQuery: '',
  selectedCategory: 'semua',
  selectedMethod: 'all',
  isVerifiedOnly: false,
};

