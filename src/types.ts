export type ScreenType =
  | 'login'
  | 'dashboard'
  | 'filters'
  | 'inspection_dashboard'
  | 'farmer_list'
  | 'inspection_form'
  | 'reports'
  | 'profile';

export type StageId = 1 | 2 | 3 | 4;

export interface StageInfo {
  id: StageId;
  titleHindi: string;
  titleEng: string;
  subtitle: string;
  icon: string;
  pendingCount: number;
  completedCount: number;
  totalCount: number;
  isUnlocked: boolean;
  statusText: 'OPEN' | 'COMPLETED' | 'LOCKED';
}

export interface Farmer {
  id: string;
  name: string;
  fatherName?: string;
  mobile: string;
  village: string;
  circle: string; // Halka
  block: string;
  applicationId: string;
  khasraNo: string;
  areaHa: number;
  crop: string;
  scheme: string;
  stageStatuses: {
    1: 'pending' | 'completed';
    2: 'pending' | 'completed';
    3: 'pending' | 'completed';
    4: 'pending' | 'completed';
  };
  inspectionData?: {
    [key in StageId]?: StageInspectionData;
  };
}

export interface StageInspectionData {
  completedAt: string;
  verifiedAreaHa?: number;
  sowingDate?: string;
  seedQuantityKg?: number;
  germinationPercent?: number;
  cropCondition?: string;
  remarks?: string;
  photos: string[];
  pmfbyInsured?: boolean;
  location?: { lat: number; lng: number; address: string };
  polygonVerified?: boolean;
  // Stage 2 specific
  observation?: string;
  cropGrowthStage?: string;
  // Stage 3 specific
  cuttingDate?: string;
  demoPlotYield?: number;
  controlPlotYield?: number;
  // Stage 4 specific
  trainingDate?: string;
  farmersCount?: number;
}

export interface BlockSummary {
  id: string;
  nameHindi: string;
  nameEng: string;
  code: string;
  pendingCount: number;
  completedCount: number;
}

export interface FilterState {
  financialYear: string;
  season: string;
  scheme: string;
  block: string;
  status: 'All' | 'Pending' | 'Completed';
  circle: string;
  village: string;
  searchQuery: string;
}
