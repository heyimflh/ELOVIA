export type GardenStageId = 'tunas' | 'rimbun' | 'hutan-kecil';

export interface GardenStage {
  id: GardenStageId;
  name: string;
  weight: string;
  weightValue: number; // in kg
  verifiedKg: number;
  emissionsAvoidedKg: number;
  transactionsCount: number;
  milestoneTitle: string;
  badge: string;
  partnerName: string;
  description: string;
  elementsDescription: {
    paper: string;
    plastic: string;
    metal: string;
    glass: string;
  };
}

export interface MaterialElementInfo {
  id: 'paper' | 'plastic' | 'metal' | 'glass';
  name: string;
  categoryName: string;
  color: string;
  lightBg: string;
  accentBg: string;
  gardenRepresentation: string;
  description: string;
  hotspotLabel: string;
  hotspotPosition: { x: number; y: number }; // Percentage in SVG / Container
}

export const GARDEN_STAGES: GardenStage[] = [
  {
    id: 'tunas',
    name: 'Tunas',
    weight: '0.1 kg',
    weightValue: 0.1,
    verifiedKg: 0.8,
    emissionsAvoidedKg: 1.4,
    transactionsCount: 1,
    milestoneTitle: 'Awal Langkah Hijau',
    badge: 'Tahap Tunas',
    partnerName: 'TPS3R Karangpucung',
    description: 'Setoran perdana terverifikasi berhasil menumbuhkan kecambah hijau segar di pulau Anda.',
    elementsDescription: {
      paper: 'Tunas pohon muda dengan daun bersemi',
      plastic: 'Kolam mini jernih dengan kuncup teratai',
      metal: 'Batu mineral halus penopang tanah',
      glass: 'Tetesan embun pagi berkilauan',
    },
  },
  {
    id: 'rimbun',
    name: 'Rimbun',
    weight: '10 kg',
    weightValue: 10,
    verifiedKg: 14.6,
    emissionsAvoidedKg: 29.8,
    transactionsCount: 5,
    milestoneTitle: 'First 10 kg Recycled',
    badge: 'Milestone Terbuka',
    partnerName: 'Bank Sampah Bersinar & Mitra Daur Ulang',
    description: 'Pohon berakar kokoh bercabang lebat, teratai mekar sempurna, dan kristal alami membiaskan cahaya.',
    elementsDescription: {
      paper: 'Pohon bercabang rimbun dengan kanopi lebat',
      plastic: 'Teratai merah muda mekar di atas kolam beriak',
      metal: 'Gugusan kristal kuarsa & mineral zamrud',
      glass: 'Butiran embun prismatik menangkap sinar surya',
    },
  },
  {
    id: 'hutan-kecil',
    name: 'Hutan Kecil',
    weight: '50 kg',
    weightValue: 50,
    verifiedKg: 58.2,
    emissionsAvoidedKg: 124.5,
    transactionsCount: 19,
    milestoneTitle: 'Ekosistem Berkelanjutan',
    badge: 'Puncak Dampak',
    partnerName: 'Konsorsium Mitra Sirkular Jawa Tengah',
    description: 'Sebuah ekosistem mandiri nan megah dengan kanopi raksasa bertingkat, mata air murni, dan kristal menjulang.',
    elementsDescription: {
      paper: 'Kanopi pohon purba megah berkanopi rimbun',
      plastic: 'Kolam berjenjang dengan mekar teratai & ikan koi',
      metal: 'Puncak geode mineral berkilau tajam keemasan',
      glass: 'Mata air alami mengalirkan embun berkilau',
    },
  },
];

export const MATERIAL_ELEMENTS: MaterialElementInfo[] = [
  {
    id: 'paper',
    name: 'Kertas & Kardus',
    categoryName: 'Paper & Cardboard',
    color: '#177A47',
    lightBg: '#E8F4EC',
    accentBg: '#DCFCE7',
    gardenRepresentation: 'Pohon & Ranting Rimbun',
    description: 'Serat selulosa terselamatkan diwujudkan sebagai batang kokoh dan dedaunan lebat.',
    hotspotLabel: 'Pohon Rimbun',
    hotspotPosition: { x: 38, y: 32 },
  },
  {
    id: 'plastic',
    name: 'Plastik Terpilah',
    categoryName: 'Plastic (PET/HDPE)',
    color: '#0E7C7B',
    lightBg: '#DDF3F1',
    accentBg: '#CCFBF1',
    gardenRepresentation: 'Kolam Jernih & Bunga Teratai',
    description: 'Plastik yang terhindar dari laut menjadi air kolam yang murni dan mekar suci teratai.',
    hotspotLabel: 'Kolam & Teratai',
    hotspotPosition: { x: 64, y: 56 },
  },
  {
    id: 'metal',
    name: 'Logam & Kaleng',
    categoryName: 'Metal & Minerals',
    color: '#D97706',
    lightBg: '#FEF3C7',
    accentBg: '#FDE68A',
    gardenRepresentation: 'Batu Sungai & Kristal Mineral',
    description: 'Aluminium dan besi bernilai tinggi membentuk batu alam dan formasi kristal prismatik.',
    hotspotLabel: 'Kristal Mineral',
    hotspotPosition: { x: 53, y: 48 },
  },
  {
    id: 'glass',
    name: 'Kaca & Botol',
    categoryName: 'Glass & Silica',
    color: '#0284C7',
    lightBg: '#E0F2FE',
    accentBg: '#BAE6FD',
    gardenRepresentation: 'Embun Kristal & Mata Air',
    description: 'Silika kaca murni terlahir kembali sebagai embun jernih dan aliran air yang membiaskan cahaya.',
    hotspotLabel: 'Embun & Mata Air',
    hotspotPosition: { x: 33, y: 38 },
  },
];
