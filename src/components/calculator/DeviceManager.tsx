import React, { useState } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { deviceDatabase, categories } from '../../data/deviceDatabase';
import { Device, DeviceCategory } from '../../types';
import { Plus, Trash2, Zap, ArrowLeft, Home } from 'lucide-react';

const DeviceManager: React.FC = () => {
  const { rooms, currentRoomId, addDeviceToRoom, removeDeviceFromRoom, ratePerUnit, setCurrentRoomId } = useCalculator();
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [customName, setCustomName] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [customWattage, setCustomWattage] = useState(0);
  const [customHours, setCustomHours] = useState(8);
  const [customCategory, setCustomCategory] = useState<DeviceCategory>('Other');

  const currentRoom = rooms.find(r => r.id === currentRoomId);

  if (!currentRoom) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <Home className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
          Please select a room to manage devices
        </p>
      </div>
    );
  }

  const handleAddDevice = () => {
    if (selectedDevice && currentRoomId) {
      const deviceData = deviceDatabase.find(d => `${d.name} - ${d.brand}` === selectedDevice);
      if (deviceData) {
        const device: Device = { id: Date.now().toString(), ...deviceData, hoursPerDay, roomId: currentRoomId };
        addDeviceToRoom(currentRoomId, device);
        setSelectedDevice('');
        setHoursPerDay(8);
      }
    }
  };

  const handleAddCustomDevice = () => {
    if (customName && customWattage > 0 && currentRoomId) {
      const device: Device = {
        id: Date.now().toString(), name: customName, brand: customBrand || 'Custom',
        wattage: customWattage, hoursPerDay: customHours, category: customCategory,
        roomId: currentRoomId, isCustom: true
      };
      addDeviceToRoom(currentRoomId, device);
      setCustomName(''); setCustomBrand(''); setCustomWattage(0); setCustomHours(8);
      setCustomCategory('Other'); setShowCustomForm(false);
    }
  };

  const calculateDailyCost = (device: Device) => ((device.wattage * device.hoursPerDay) / 1000) * ratePerUnit;
  const calculateMonthlyCost = (device: Device) => calculateDailyCost(device) * 30;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentRoomId(null)} className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentRoom.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage devices in this room</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Device</label>
            <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none">
              <option value="">-- Choose from database --</option>
              {categories.map((category) => (
                <optgroup key={category} label={category}>
                  {deviceDatabase.filter((d) => d.category === category).map((device, idx) => (
                    <option key={idx} value={`${device.name} - ${device.brand}`}>{device.name} - {device.brand} ({device.wattage}W)</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hours per Day</label>
            <input type="number" min="0" max="24" step="0.5" value={hoursPerDay} onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none" />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleAddDevice} disabled={!selectedDevice} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed">
            <Plus className="w-5 h-5" />Add Device
          </button>
          <button onClick={() => setShowCustomForm(!showCustomForm)} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
            <Plus className="w-5 h-5" />Custom Device
          </button>
        </div>

        {showCustomForm && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-4 animate-fade-in">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Add Custom Device</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Device Name" value={customName} onChange={(e) => setCustomName(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none" />
              <input type="text" placeholder="Brand (optional)" value={customBrand} onChange={(e) => setCustomBrand(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none" />
              <input type="number" placeholder="Wattage" value={customWattage || ''} onChange={(e) => setCustomWattage(parseFloat(e.target.value) || 0)} className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none" />
              <input type="number" placeholder="Hours per day" value={customHours} onChange={(e) => setCustomHours(parseFloat(e.target.value) || 0)} className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none" />
              <select value={customCategory} onChange={(e) => setCustomCategory(e.target.value as DeviceCategory)} className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none">
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
            <button onClick={handleAddCustomDevice} disabled={!customName || customWattage <= 0} className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed">Add Custom Device</button>
          </div>
        )}
      </div>

      {currentRoom.devices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Device</th>
                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Watts</th>
                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Hours/Day</th>
                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Cost/Day</th>
                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Cost/Month</th>
                <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRoom.devices.map((device) => (
                <tr key={device.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{device.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{device.brand} • {device.category}</div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-900 dark:text-white">{device.wattage}W</td>
                  <td className="py-4 px-4 text-right text-gray-900 dark:text-white">{device.hoursPerDay}h</td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">₹{calculateDailyCost(device).toFixed(2)}</td>
                  <td className="py-4 px-4 text-right font-semibold text-green-600 dark:text-green-400">₹{calculateMonthlyCost(device).toFixed(2)}</td>
                  <td className="py-4 px-4 text-center">
                    <button onClick={() => removeDeviceFromRoom(currentRoomId!, device.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No devices added to this room yet. Add your first device to get started!</p>
        </div>
      )}
    </div>
  );
};

export default DeviceManager;
