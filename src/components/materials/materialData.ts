export interface MaterialItem {
  id: string;
  title: string;
  localName: string;
  categoryNumber: string;
  badge: {
    text: string;
    variant: 'mint' | 'teal' | 'lime';
  };
  image: string;
  alt: string;
  subCategories: string[];
  subCategoriesText: string;
  priceRange: string;
  priceUnit: string;
  priceDate: string;
  ecoImpact: string;
  sortingTip: string;
  ctaUrl: string;
}

export const MATERIAL_ITEMS: MaterialItem[] = [
  {
    id: 'paper',
    title: 'Paper & Cardboard',
    localName: 'Kertas & Kardus Bekas',
    categoryNumber: '01',
    badge: {
      text: 'High Recyclability · 92%',
      variant: 'mint',
    },
    image: '/images/materials/paper_cardboard.jpg',
    alt: 'Flat-lay bersih material daur ulang kertas dan kardus',
    subCategories: ['Kardus Box', 'Kertas HVS/Putih', 'Koran & Majalah', 'Paper Bag'],
    subCategoriesText: 'Kardus Box, Kertas HVS, Koran & Majalah',
    priceRange: '≈ Rp 1.200–2.500',
    priceUnit: '/kg',
    priceDate: 'Acuan per 31 Okt 2026',
    ecoImpact: 'Hemat 17 pohon per ton material terolah',
    sortingTip: 'Jaga tetap kering & ratakan kardus sebelum disetor',
    ctaUrl: '/pindai?kategori=paper',
  },
  {
    id: 'plastic',
    title: 'Plastic',
    localName: 'Plastik Terpilah',
    categoryNumber: '02',
    badge: {
      text: 'High Demand · High Value',
      variant: 'teal',
    },
    image: '/images/materials/plastic.jpg',
    alt: 'Flat-lay bersih material daur ulang botol dan wadah plastik',
    subCategories: ['Botol PET', 'Gelas PP', 'Jerigen HDPE', 'Tutup & Ember'],
    subCategoriesText: 'Botol PET, Gelas PP, Jerigen',
    priceRange: '≈ Rp 1.500–2.500',
    priceUnit: '/kg',
    priceDate: 'Acuan per 31 Okt 2026',
    ecoImpact: 'Reduksi emisi hingga 1.5 kg CO₂e per kg plastik',
    sortingTip: 'Kosongkan, bilas bersih & ratakan botol',
    ctaUrl: '/pindai?kategori=plastic',
  },
  {
    id: 'metal',
    title: 'Metal',
    localName: 'Logam & Kaleng',
    categoryNumber: '03',
    badge: {
      text: 'Highest Market Value',
      variant: 'lime',
    },
    image: '/images/materials/metal.jpg',
    alt: 'Flat-lay bersih material daur ulang kaleng dan aluminium',
    subCategories: ['Kaleng Aluminium', 'Besi Bekas', 'Seng & Pipa', 'Kuningan'],
    subCategoriesText: 'Kaleng Aluminium, Besi Bekas, Seng & Pipa',
    priceRange: '≈ Rp 12.000–22.000',
    priceUnit: '/kg',
    priceDate: 'Acuan per 31 Okt 2026',
    ecoImpact: 'Hemat 95% energi dibanding bijih primer',
    sortingTip: 'Bilas kaleng & pisahkan aluminium dari besi',
    ctaUrl: '/pindai?kategori=metal',
  },
  {
    id: 'glass',
    title: 'Glass',
    localName: 'Kaca & Botol Beling',
    categoryNumber: '04',
    badge: {
      text: '100% Infinitely Circular',
      variant: 'mint',
    },
    image: '/images/materials/glass.jpg',
    alt: 'Flat-lay bersih material daur ulang botol dan stoples kaca',
    subCategories: ['Botol Kaca Bening', 'Botol Kaca Cokelat/Hijau', 'Stoples Kaca', 'Kaca Lembaran'],
    subCategoriesText: 'Botol Bening, Botol Kaca Hijau/Cokelat, Stoples',
    priceRange: '≈ Rp 600–1.400',
    priceUnit: '/kg',
    priceDate: 'Acuan per 31 Okt 2026',
    ecoImpact: 'Dapat dilebur berulang tanpa degradasi kualitas',
    sortingTip: 'Bilas, keringkan & pisahkan bening vs warna',
    ctaUrl: '/pindai?kategori=glass',
  },
];

