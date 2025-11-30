import React, { useState } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { Room } from '../../types';
import { roomTemplates } from '../../data/roomTemplates';
import { Plus, Trash2, Home, ChevronRight, Bed, Sofa, ChefHat, Bath, Briefcase, UtensilsCrossed, Car, BookOpen, Users } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Bed, Sofa, ChefHat, Bath, Briefcase, UtensilsCrossed, Car, BookOpen, Users, Plus,
};

const RoomManager: React.FC = () => {
  const { rooms, addRoom, removeRoom, setCurrentRoomId } = useCalculator();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customRoomName, setCustomRoomName] = useState('');

  const handleAddRoom = () => {
    if (!selectedTemplate) return;

    const template = roomTemplates.find(t => t.name === selectedTemplate);
    if (!template) return;

    const roomName = template.name === 'Custom' ? customRoomName : template.name;
    if (!roomName) return;

    const newRoom: Room = {
      id: Date.now().toString(),
      name: roomName,
      icon: template.icon,
      devices: [],
    };

    addRoom(newRoom);
    setShowAddForm(false);
    setSelectedTemplate('');
    setCustomRoomName('');
  };

  const getDeviceCount = (room: Room) => {
    return room.devices.length;
  };

  const getRoomIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Home;
    return IconComponent;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Room Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Create rooms and organize your devices
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Room
        </button>
      </div>

      {/* Add Room Form */}
      {showAddForm && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6 animate-fade-in">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Create New Room
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {roomTemplates.map((template) => {
              const IconComponent = getRoomIcon(template.icon);
              return (
                <button
                  key={template.name}
                  onClick={() => setSelectedTemplate(template.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedTemplate === template.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {template.name}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedTemplate === 'Custom' && (
            <input
              type="text"
              placeholder="Enter custom room name"
              value={customRoomName}
              onChange={(e) => setCustomRoomName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none mb-4"
            />
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAddRoom}
              disabled={!selectedTemplate || (selectedTemplate === 'Custom' && !customRoomName)}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
            >
              Create Room
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setSelectedTemplate('');
                setCustomRoomName('');
              }}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Room List */}
      {rooms.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => {
            const IconComponent = getRoomIcon(room.icon);
            const template = roomTemplates.find(t => t.icon === room.icon);
            
            return (
              <div
                key={room.id}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${template?.color || 'from-gray-500 to-gray-600'} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {room.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getDeviceCount(room)} device{getDeviceCount(room) !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeRoom(room.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setCurrentRoomId(room.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Manage Devices
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No rooms created yet</p>
          <p className="text-sm">Click "Add Room" to get started organizing your home</p>
        </div>
      )}
    </div>
  );
};

export default RoomManager;
