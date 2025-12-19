export interface StateIrradiance {
  state: string;
  avgSunHours: number; // average peak sun hours per day
}

// Rough average peak sun hours per day for Indian states/UTs.
// These are approximate and intended for ballpark estimates only.
export const indianStateIrradiance: StateIrradiance[] = [
  { state: 'Andhra Pradesh', avgSunHours: 5.0 },
  { state: 'Arunachal Pradesh', avgSunHours: 3.5 },
  { state: 'Assam', avgSunHours: 4.0 },
  { state: 'Bihar', avgSunHours: 4.5 },
  { state: 'Chhattisgarh', avgSunHours: 5.0 },
  { state: 'Goa', avgSunHours: 5.0 },
  { state: 'Gujarat', avgSunHours: 5.8 },
  { state: 'Haryana', avgSunHours: 5.0 },
  { state: 'Himachal Pradesh', avgSunHours: 4.0 },
  { state: 'Jharkhand', avgSunHours: 4.8 },
  { state: 'Karnataka', avgSunHours: 5.0 },
  { state: 'Kerala', avgSunHours: 4.0 },
  { state: 'Madhya Pradesh', avgSunHours: 5.3 },
  { state: 'Maharashtra', avgSunHours: 5.0 },
  { state: 'Manipur', avgSunHours: 4.0 },
  { state: 'Meghalaya', avgSunHours: 3.8 },
  { state: 'Mizoram', avgSunHours: 3.8 },
  { state: 'Nagaland', avgSunHours: 3.8 },
  { state: 'Odisha', avgSunHours: 4.8 },
  { state: 'Punjab', avgSunHours: 5.2 },
  { state: 'Rajasthan', avgSunHours: 6.0 },
  { state: 'Sikkim', avgSunHours: 3.5 },
  { state: 'Tamil Nadu', avgSunHours: 4.5 },
  { state: 'Telangana', avgSunHours: 5.2 },
  { state: 'Tripura', avgSunHours: 4.0 },
  { state: 'Uttar Pradesh', avgSunHours: 4.8 },
  { state: 'Uttarakhand', avgSunHours: 4.0 },
  { state: 'West Bengal', avgSunHours: 4.5 },
  { state: 'Delhi', avgSunHours: 5.0 },
  { state: 'Jammu & Kashmir', avgSunHours: 4.0 },
  { state: 'Ladakh', avgSunHours: 5.5 },
  { state: 'Puducherry', avgSunHours: 4.8 },
  { state: 'Chandigarh', avgSunHours: 5.0 },
  { state: 'Andaman & Nicobar Islands', avgSunHours: 4.2 },
  { state: 'Dadra & Nagar Haveli and Daman & Diu', avgSunHours: 5.0 },
  { state: 'Lakshadweep', avgSunHours: 4.5 },
];

export const DEFAULT_AVG_SUN_HOURS = 4.5;
