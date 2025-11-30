import React from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { Leaf, TreeDeciduous, Car, Factory, TrendingDown, Lightbulb } from 'lucide-react';

const CarbonFootprint: React.FC = () => {
  const { getAllDevices, ratePerUnit } = useCalculator();
  const devices = getAllDevices();

  // India's average CO2 emission factor: 0.82 kg CO2 per kWh
  const CO2_PER_KWH = 0.82;
  
  // Calculate total monthly kWh consumption
  const totalMonthlyKWh = devices.reduce((sum, device) => {
    const dailyKWh = (device.wattage * device.hoursPerDay) / 1000;
    const monthlyKWh = dailyKWh * 30;
    return sum + monthlyKWh;
  }, 0);

  // Calculate CO2 emissions
  const monthlyCO2 = totalMonthlyKWh * CO2_PER_KWH; // in kg
  const yearlyCO2 = monthlyCO2 * 12;

  // Environmental comparisons
  const treesNeeded = Math.ceil(yearlyCO2 / 21); // 1 tree absorbs ~21 kg CO2/year
  const carKmEquivalent = Math.floor(monthlyCO2 / 0.25); // Average car emits ~0.25 kg CO2/km
  const coalBurned = (monthlyCO2 / 2.86).toFixed(1); // 1 kg coal = ~2.86 kg CO2

  // Calculate potential savings with LED bulbs
  const lightingDevices = devices.filter(d => d.category === 'Lighting');
  const ledSavings = lightingDevices.reduce((sum, device) => {
    // Assume 60% reduction with LED
    const monthlyKWh = (device.wattage * device.hoursPerDay * 30) / 1000;
    return sum + (monthlyKWh * 0.6 * CO2_PER_KWH);
  }, 0);

  // Calculate savings with efficient appliances
  const coolingDevices = devices.filter(d => d.category === 'Cooling' && d.wattage > 1000);
  const coolingEmissions = coolingDevices.reduce((sum, device) => {
    const monthlyKWh = (device.wattage * device.hoursPerDay * 30) / 1000;
    return sum + (monthlyKWh * CO2_PER_KWH);
  }, 0);
  const efficientCoolingSavings = coolingEmissions * 0.3; // 30% reduction with inverter ACs

  const totalPotentialSavings = ledSavings + efficientCoolingSavings;

  // Color coding based on emissions
  const getEmissionLevel = () => {
    if (monthlyCO2 < 100) return { color: 'green', label: 'Excellent', icon: '🌿' };
    if (monthlyCO2 < 200) return { color: 'blue', label: 'Good', icon: '💚' };
    if (monthlyCO2 < 300) return { color: 'yellow', label: 'Average', icon: '⚠️' };
    return { color: 'red', label: 'High', icon: '🔴' };
  };

  const emissionLevel = getEmissionLevel();

  if (devices.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <Leaf className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">Add devices to see your carbon footprint</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
          <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Carbon Footprint</h2>
          <p className="text-gray-600 dark:text-gray-400">Environmental impact of your energy usage</p>
        </div>
      </div>

      {/* Main Emission Card */}
      <div className={`bg-gradient-to-br from-${emissionLevel.color}-50 to-${emissionLevel.color}-100 dark:from-${emissionLevel.color}-900/20 dark:to-${emissionLevel.color}-800/20 rounded-2xl p-6 mb-6 border-2 border-${emissionLevel.color}-200 dark:border-${emissionLevel.color}-700`}>
        <div className="text-center">
          <div className="text-5xl mb-2">{emissionLevel.icon}</div>
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {monthlyCO2.toFixed(1)} kg
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 mb-1">
            CO₂ Emissions per Month
          </div>
          <div className={`inline-block px-4 py-1 rounded-full bg-${emissionLevel.color}-200 dark:bg-${emissionLevel.color}-700 text-${emissionLevel.color}-800 dark:text-${emissionLevel.color}-200 font-semibold`}>
            {emissionLevel.label}
          </div>
        </div>
      </div>

      {/* Environmental Comparisons */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <TreeDeciduous className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{treesNeeded}</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Trees needed to offset yearly emissions
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{carKmEquivalent}</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            km driven by car (monthly equivalent)
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Factory className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{coalBurned}</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            kg of coal burned (monthly equivalent)
          </div>
        </div>
      </div>

      {/* Reduction Opportunities */}
      {totalPotentialSavings > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
          <div className="flex items-start gap-3 mb-4">
            <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Potential CO₂ Reduction
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can reduce your carbon footprint by <span className="font-bold text-green-600 dark:text-green-400">{totalPotentialSavings.toFixed(1)} kg CO₂/month</span> with these changes:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {ledSavings > 0 && (
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Switch to LED bulbs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Replace {lightingDevices.length} lighting devices</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 dark:text-green-400">-{ledSavings.toFixed(1)} kg</div>
                  <div className="text-xs text-gray-500">CO₂/month</div>
                </div>
              </div>
            )}

            {efficientCoolingSavings > 0 && (
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4">
                <Leaf className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Upgrade to inverter ACs</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Replace {coolingDevices.length} cooling devices</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 dark:text-green-400">-{efficientCoolingSavings.toFixed(1)} kg</div>
                  <div className="text-xs text-gray-500">CO₂/month</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">Yearly Impact:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                -{(totalPotentialSavings * 12).toFixed(0)} kg CO₂
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-right">
              Equivalent to planting {Math.ceil((totalPotentialSavings * 12) / 21)} trees! 🌳
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> Calculations based on India's average carbon intensity of {CO2_PER_KWH} kg CO₂ per kWh. 
          Actual emissions may vary based on your state's energy mix (coal, renewable, nuclear).
        </p>
      </div>
    </div>
  );
};

export default CarbonFootprint;
