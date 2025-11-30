export interface Device {
  id: string;
  name: string;
  brand: string;
  wattage: number;
  hoursPerDay: number;
  category: DeviceCategory;
  roomId?: string;
  isCustom?: boolean;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  devices: Device[];
}

export type DeviceCategory = 'Cooling' | 'Lighting' | 'Entertainment' | 'Kitchen' | 'Washing' | 'Other';

export interface StateElectricityRate {
  state: string;
  ratePerUnit: number;
}

export interface BillCalculation {
  device: Device;
  dailyCost: number;
  monthlyCost: number;
  monthlyUnits: number;
}

export interface CategoryBreakdown {
  category: DeviceCategory;
  totalCost: number;
  percentage: number;
}

export interface RoomBreakdown {
  room: Room;
  totalCost: number;
  percentage: number;
}

export interface BillHistory {
  id: string;
  timestamp: number;
  month: string; // e.g., "November 2025"
  totalCost: number;
  totalUnits: number;
  totalCO2: number;
  deviceCount: number;
  rooms: Room[];
  state: string;
  ratePerUnit: number;
}
