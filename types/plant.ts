export interface Plant {
  id: string;
  plantType: string;
  nickname?: string;
  imageUrl: string;
  waterFrequency: string;
  lastWatered?: string;
  waterLevel?: number;
  waterFreqDays?: number;
  plantFoodFrequency?: string;
  lastPlantFood?: string;
  generalCareInfo?: string;
  lightRequirement?: string;
}
