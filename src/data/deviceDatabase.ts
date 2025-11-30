import { Device, DeviceCategory } from '../types';

export const deviceDatabase: Omit<Device, 'id' | 'hoursPerDay' | 'roomId'>[] = [
  // Cooling
  { name: 'Samsung 1.5 Ton 3 Star Split AC', brand: 'Samsung', wattage: 1500, category: 'Cooling' },
  { name: 'LG 1.5 Ton 5 Star Inverter AC', brand: 'LG', wattage: 1200, category: 'Cooling' },
  { name: 'Voltas 1 Ton 3 Star AC', brand: 'Voltas', wattage: 1000, category: 'Cooling' },
  { name: 'Godrej 1.5 Ton AC', brand: 'Godrej', wattage: 1400, category: 'Cooling' },
  { name: 'Havells Ceiling Fan', brand: 'Havells', wattage: 75, category: 'Cooling' },
  { name: 'Crompton Table Fan', brand: 'Crompton', wattage: 50, category: 'Cooling' },
  { name: 'Bajaj Tower Fan', brand: 'Bajaj', wattage: 60, category: 'Cooling' },
  { name: 'Usha Cooler', brand: 'Usha', wattage: 180, category: 'Cooling' },
  
  // Lighting
  { name: 'Philips 9W LED Bulb', brand: 'Philips', wattage: 9, category: 'Lighting' },
  { name: 'Syska 12W LED Bulb', brand: 'Syska', wattage: 12, category: 'Lighting' },
  { name: 'Havells 20W LED Tubelight', brand: 'Havells', wattage: 20, category: 'Lighting' },
  { name: 'Bajaj 40W CFL', brand: 'Bajaj', wattage: 40, category: 'Lighting' },
  { name: 'Crompton LED Strip Light', brand: 'Crompton', wattage: 15, category: 'Lighting' },
  
  // Entertainment
  { name: 'Samsung 55" 4K Smart TV', brand: 'Samsung', wattage: 150, category: 'Entertainment' },
  { name: 'LG 43" Full HD TV', brand: 'LG', wattage: 100, category: 'Entertainment' },
  { name: 'Sony 65" OLED TV', brand: 'Sony', wattage: 200, category: 'Entertainment' },
  { name: 'Mi 32" HD TV', brand: 'Mi', wattage: 60, category: 'Entertainment' },
  { name: 'Sony Home Theater System', brand: 'Sony', wattage: 120, category: 'Entertainment' },
  { name: 'JBL Soundbar', brand: 'JBL', wattage: 80, category: 'Entertainment' },
  { name: 'PS5 Gaming Console', brand: 'Sony', wattage: 200, category: 'Entertainment' },
  
  // Kitchen
  { name: 'Samsung 253L Refrigerator', brand: 'Samsung', wattage: 150, category: 'Kitchen' },
  { name: 'LG 190L Single Door Fridge', brand: 'LG', wattage: 100, category: 'Kitchen' },
  { name: 'Whirlpool 292L Double Door Fridge', brand: 'Whirlpool', wattage: 180, category: 'Kitchen' },
  { name: 'Godrej 196L Refrigerator', brand: 'Godrej', wattage: 120, category: 'Kitchen' },
  { name: 'IFB 20L Microwave Oven', brand: 'IFB', wattage: 1200, category: 'Kitchen' },
  { name: 'Samsung 28L Convection Microwave', brand: 'Samsung', wattage: 1400, category: 'Kitchen' },
  { name: 'Philips Air Fryer', brand: 'Philips', wattage: 1400, category: 'Kitchen' },
  { name: 'Prestige Induction Cooktop', brand: 'Prestige', wattage: 2000, category: 'Kitchen' },
  { name: 'Bajaj Mixer Grinder', brand: 'Bajaj', wattage: 750, category: 'Kitchen' },
  { name: 'Philips Electric Kettle', brand: 'Philips', wattage: 1500, category: 'Kitchen' },
  { name: 'Panasonic Rice Cooker', brand: 'Panasonic', wattage: 650, category: 'Kitchen' },
  { name: 'Butterfly Wet Grinder', brand: 'Butterfly', wattage: 150, category: 'Kitchen' },
  
  // Washing
  { name: 'Samsung 6.5kg Washing Machine', brand: 'Samsung', wattage: 500, category: 'Washing' },
  { name: 'LG 7kg Fully Automatic', brand: 'LG', wattage: 600, category: 'Washing' },
  { name: 'Whirlpool 6kg Semi-Automatic', brand: 'Whirlpool', wattage: 400, category: 'Washing' },
  { name: 'IFB 8kg Front Load Washer', brand: 'IFB', wattage: 700, category: 'Washing' },
  { name: 'Havells Water Heater Geyser 15L', brand: 'Havells', wattage: 2000, category: 'Washing' },
  { name: 'Crompton Instant Water Heater 3L', brand: 'Crompton', wattage: 3000, category: 'Washing' },
  
  // Other
  { name: 'Eureka Forbes Vacuum Cleaner', brand: 'Eureka Forbes', wattage: 1400, category: 'Other' },
  { name: 'Philips Iron', brand: 'Philips', wattage: 1000, category: 'Other' },
  { name: 'HP Desktop Computer', brand: 'HP', wattage: 300, category: 'Other' },
  { name: 'Dell Laptop', brand: 'Dell', wattage: 65, category: 'Other' },
  { name: 'Crompton Water Motor 0.5HP', brand: 'Crompton', wattage: 370, category: 'Other' },
  { name: 'Havells Immersion Rod', brand: 'Havells', wattage: 1500, category: 'Other' },
  { name: 'Kent RO Water Purifier', brand: 'Kent', wattage: 60, category: 'Other' },
];

export const categories: DeviceCategory[] = ['Cooling', 'Lighting', 'Entertainment', 'Kitchen', 'Washing', 'Other'];
