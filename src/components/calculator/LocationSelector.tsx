import React, { useState, useEffect } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { indianStateRates } from '../../data/electricityRates';
import { MapPin, DollarSign } from 'lucide-react';

const LocationSelector: React.FC = () => {
  const { selectedState, setSelectedState, ratePerUnit, setRatePerUnit } = useCalculator();
  const [isManualRate, setIsManualRate] = useState(false);

  useEffect(() => {
    if (selectedState && !isManualRate) {
      const stateData = indianStateRates.find(s => s.state === selectedState);
      if (stateData) {
        setRatePerUnit(stateData.ratePerUnit);
      }
    }
  }, [selectedState, isManualRate, setRatePerUnit]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
          <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Location & Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select your state to get default electricity rates
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* State Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select State / UT
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="">-- Select State --</option>
            {indianStateRates.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        {/* Rate Display */}
        {selectedState && (
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Electricity Rate
                </span>
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ₹{ratePerUnit.toFixed(2)}
                <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">
                  /unit
                </span>
              </div>
            </div>

            {/* Manual Override */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isManualRate}
                  onChange={(e) => setIsManualRate(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Override with custom rate
                </span>
              </label>

              {isManualRate && (
                <div className="animate-fade-in">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={ratePerUnit}
                    onChange={(e) => setRatePerUnit(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500 focus:outline-none"
                    placeholder="Enter custom rate per unit"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedState && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Please select your state to continue
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
