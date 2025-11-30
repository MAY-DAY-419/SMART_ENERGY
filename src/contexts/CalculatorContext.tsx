import React, { createContext, useState, useEffect } from 'react';
import { Device, Room, BillHistory } from '../types';
import { supabase } from '../lib/supabase';

export interface CalculatorContextType {
  rooms: Room[];
  selectedState: string;
  ratePerUnit: number;
  currentRoomId: string | null;
  billHistory: BillHistory[];
  addRoom: (room: Room) => void;
  removeRoom: (id: string) => void;
  updateRoom: (id: string, room: Room) => void;
  addDeviceToRoom: (roomId: string, device: Device) => void;
  removeDeviceFromRoom: (roomId: string, deviceId: string) => void;
  setSelectedState: (state: string) => void;
  setRatePerUnit: (rate: number) => void;
  setCurrentRoomId: (id: string | null) => void;
  clearAll: () => void;
  getAllDevices: () => Device[];
  saveBillSnapshot: () => void;
  deleteBillHistory: (id: string) => void;
}

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [ratePerUnit, setRatePerUnit] = useState(6.5);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [billHistory, setBillHistory] = useState<BillHistory[]>([]);
  const [userId] = useState(() => {
    // Get or create a user ID for this browser
    let id = localStorage.getItem('energyUserId');
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('energyUserId', id);
    }
    return id;
  });

  // Load data from Supabase on mount
  useEffect(() => {
    loadFromSupabase();
  }, []);

  const loadFromSupabase = async () => {
    try {
      // Load rooms with devices
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('*')
        .eq('user_id', userId);

      if (roomsError) throw roomsError;

      if (roomsData && roomsData.length > 0) {
        // Load devices for each room
        const roomsWithDevices = await Promise.all(
          roomsData.map(async (room) => {
            const { data: devicesData } = await supabase
              .from('devices')
              .select('*')
              .eq('room_id', room.id);

            return {
              id: room.id,
              name: room.name,
              icon: room.icon,
              devices: devicesData || [],
            };
          })
        );
        setRooms(roomsWithDevices);
      }

      // Load bill history
      const { data: historyData, error: historyError } = await supabase
        .from('bill_history')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(12);

      if (historyError) throw historyError;
      if (historyData) {
        setBillHistory(historyData.map(h => ({
          ...h,
          rooms: JSON.parse(h.rooms as string),
        })));
      }
    } catch (error) {
      console.error('Error loading from Supabase:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('energyBillHistory');
      if (stored) {
        try {
          setBillHistory(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load bill history:', e);
        }
      }
    }
  };

  // Save bill history to localStorage whenever it changes
  useEffect(() => {
    if (billHistory.length > 0) {
      localStorage.setItem('energyBillHistory', JSON.stringify(billHistory));
    }
  }, [billHistory]);

  const addRoom = async (room: Room) => {
    setRooms([...rooms, room]);
    
    // Sync to Supabase
    try {
      await supabase.from('rooms').insert({
        id: room.id,
        user_id: userId,
        name: room.name,
        icon: room.icon,
      });
    } catch (error) {
      console.error('Error saving room to Supabase:', error);
    }
  };

  const removeRoom = async (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
    if (currentRoomId === id) {
      setCurrentRoomId(null);
    }
    
    // Sync to Supabase
    try {
      await supabase.from('rooms').delete().eq('id', id);
      await supabase.from('devices').delete().eq('room_id', id);
    } catch (error) {
      console.error('Error deleting room from Supabase:', error);
    }
  };

  const updateRoom = (id: string, room: Room) => {
    setRooms(rooms.map(r => r.id === id ? room : r));
  };

  const addDeviceToRoom = async (roomId: string, device: Device) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          devices: [...room.devices, device],
        };
      }
      return room;
    }));
    
    // Sync to Supabase
    try {
      await supabase.from('devices').insert({
        id: device.id,
        room_id: roomId,
        name: device.name,
        brand: device.brand,
        wattage: device.wattage,
        hours_per_day: device.hoursPerDay,
        category: device.category,
        is_custom: device.isCustom || false,
      });
    } catch (error) {
      console.error('Error saving device to Supabase:', error);
    }
  };

  const removeDeviceFromRoom = async (roomId: string, deviceId: string) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          devices: room.devices.filter(d => d.id !== deviceId),
        };
      }
      return room;
    }));
    
    // Sync to Supabase
    try {
      await supabase.from('devices').delete().eq('id', deviceId);
    } catch (error) {
      console.error('Error deleting device from Supabase:', error);
    }
  };

  const getAllDevices = () => {
    return rooms.flatMap(room => room.devices);
  };

  const saveBillSnapshot = async () => {
    const devices = getAllDevices();
    if (devices.length === 0 || !selectedState) return;

    const totalUnits = devices.reduce((sum, device) => {
      return sum + (device.wattage * device.hoursPerDay * 30) / 1000;
    }, 0);

    const totalCost = totalUnits * ratePerUnit;
    const totalCO2 = totalUnits * 0.82; // India's CO2 factor

    const now = new Date();
    const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const newSnapshot: BillHistory = {
      id: Date.now().toString(),
      timestamp: now.getTime(),
      month: monthName,
      totalCost,
      totalUnits,
      totalCO2,
      deviceCount: devices.length,
      rooms: JSON.parse(JSON.stringify(rooms)), // Deep copy
      state: selectedState,
      ratePerUnit,
    };

    // Keep only last 12 months
    const updatedHistory = [newSnapshot, ...billHistory].slice(0, 12);
    setBillHistory(updatedHistory);
    
    // Sync to Supabase
    try {
      await supabase.from('bill_history').insert({
        id: newSnapshot.id,
        user_id: userId,
        timestamp: newSnapshot.timestamp,
        month: newSnapshot.month,
        total_cost: newSnapshot.totalCost,
        total_units: newSnapshot.totalUnits,
        total_co2: newSnapshot.totalCO2,
        device_count: newSnapshot.deviceCount,
        rooms: JSON.stringify(newSnapshot.rooms),
        state: newSnapshot.state,
        rate_per_unit: newSnapshot.ratePerUnit,
      });
      
      // Keep localStorage as backup
      localStorage.setItem('energyBillHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving bill snapshot to Supabase:', error);
      localStorage.setItem('energyBillHistory', JSON.stringify(updatedHistory));
    }
  };

  const deleteBillHistory = async (id: string) => {
    setBillHistory(prev => prev.filter(h => h.id !== id));
    
    // Sync to Supabase
    try {
      await supabase.from('bill_history').delete().eq('id', id);
    } catch (error) {
      console.error('Error deleting bill history from Supabase:', error);
    }
  };

  const clearAll = () => {
    setRooms([]);
    setSelectedState('');
    setRatePerUnit(6.5);
    setCurrentRoomId(null);
  };

  return (
    <CalculatorContext.Provider value={{
      rooms,
      selectedState,
      ratePerUnit,
      currentRoomId,
      billHistory,
      addRoom,
      removeRoom,
      updateRoom,
      addDeviceToRoom,
      removeDeviceFromRoom,
      setSelectedState,
      setRatePerUnit,
      setCurrentRoomId,
      clearAll,
      getAllDevices,
      saveBillSnapshot,
      deleteBillHistory,
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};
