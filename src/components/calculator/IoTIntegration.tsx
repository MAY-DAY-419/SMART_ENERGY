import React, { useState } from 'react';
import { Wifi, WifiOff, Smartphone, Activity, PlugZap, AlertCircle } from 'lucide-react';

const IoTIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
          {isConnected ? (
            <Wifi className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          ) : (
            <WifiOff className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            IoT Device Integration
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect smart devices for real-time monitoring
          </p>
        </div>
      </div>

      {!isConnected ? (
        <div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6 border-2 border-cyan-200 dark:border-cyan-800">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Real-time Energy Monitoring
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect your smart plugs, smart meters, and IoT sensors to automatically track power consumption in real-time. Get accurate data without manual entry.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlugZap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Smart Plugs
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor individual device consumption
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Smart Meters
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track total home energy usage
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                IoT Sensors
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced energy monitoring
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Supported Devices
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'TP-Link Kasa Smart Plug',
                'Wipro Smart Plug',
                'Syska Smart Plug',
                'Xiaomi Mi Smart Plug',
                'Amazon Smart Plug',
                'Philips Wiz Smart Plug',
              ].map((device) => (
                <div
                  key={device}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{device}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsConnected(true)}
            className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Wifi className="w-5 h-5" />
            Connect IoT Devices
          </button>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            * IoT integration requires compatible smart devices
          </p>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-gray-900 dark:text-white">
                Connected to IoT Network
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your devices are now being monitored in real-time. Data will be automatically synced to the calculator.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Connected Devices
            </h3>
            {[
              { name: 'Living Room Smart Plug', power: '145W', status: 'Active' },
              { name: 'Bedroom AC Monitor', power: '1200W', status: 'Active' },
              { name: 'Kitchen Appliances Hub', power: '320W', status: 'Active' },
            ].map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {device.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Current: {device.power}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {device.status}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsConnected(false)}
            className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default IoTIntegration;
