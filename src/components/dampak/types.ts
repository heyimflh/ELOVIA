export type GardenLevel = 1 | 2 | 3;

export interface GardenStageInfo {
  id: GardenLevel;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  carbonOffsetKg: number;
  biomassIndex: number;
  circularityScore: number;
  materialsHarvestedKg: {
    plastic: number;
    paper: number;
    metal: number;
    glass: number;
  };
}

export interface CameraScrollState {
  progress: number;
  rawScroll: number;
}

