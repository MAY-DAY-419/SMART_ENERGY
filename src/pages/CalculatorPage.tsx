import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import LocationSelector from '../components/calculator/LocationSelector';
import RoomManager from '../components/calculator/RoomManager';
import DeviceManager from '../components/calculator/DeviceManager';
import BillSummary from '../components/calculator/BillSummary';
import CarbonFootprint from '../components/calculator/CarbonFootprint';
import BillComparison from '../components/calculator/BillComparison';
import AIOptimization from '../components/calculator/AIOptimization';
import IoTIntegration from '../components/calculator/IoTIntegration';
import SolarEstimator from '../components/calculator/SolarEstimator';
import { CheckCircle2 } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const { selectedState, getAllDevices } = useCalculator();
  const devices = getAllDevices();

  const canProceedToStep2 = selectedState !== '';
  const canProceedToStep3 = devices.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Energy Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate your monthly electricity bill and get optimization tips
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <StepIndicator
              number={1}
              title="Location & Pricing"
              isActive={step === 1}
              isCompleted={step > 1}
              onClick={() => setStep(1)}
            />
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 mx-4">
              <div
                className={`h-full bg-green-500 transition-all duration-500 ${
                  step > 1 ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
            <StepIndicator
              number={2}
              title="Add Devices"
              isActive={step === 2}
              isCompleted={step > 2}
              onClick={() => canProceedToStep2 && setStep(2)}
              disabled={!canProceedToStep2}
            />
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 mx-4">
              <div
                className={`h-full bg-green-500 transition-all duration-500 ${
                  step > 2 ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
            <StepIndicator
              number={3}
              title="View Results"
              isActive={step === 3}
              isCompleted={false}
              onClick={() => canProceedToStep3 && setStep(3)}
              disabled={!canProceedToStep3}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className={`grid ${step === 3 ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
          <div className={step === 3 ? 'w-full' : 'lg:col-span-2'}>
            {step === 1 && (
              <div className="animate-fade-in">
                <LocationSelector />
                {canProceedToStep2 && (
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Next: Add Devices →
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in space-y-6">
                <RoomManager />
                <DeviceManager />
                {canProceedToStep3 && (
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Calculate Bill →
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-8">
                <BillSummary />
                <CarbonFootprint />
                <BillComparison />
                <SolarEstimator />
                <AIOptimization />
                <IoTIntegration />
                <div className="mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    ← Back to Devices
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Only show in steps 1 and 2 */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Quick Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">State:</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedState || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Devices:</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {devices.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  number,
  title,
  isActive,
  isCompleted,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-2 transition-all duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
          isCompleted
            ? 'bg-green-500 text-white'
            : isActive
            ? 'bg-green-500 text-white scale-110'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
      >
        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : number}
      </div>
      <span
        className={`text-sm font-medium ${
          isActive
            ? 'text-green-600 dark:text-green-400'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {title}
      </span>
    </button>
  );
};

export default CalculatorPage;
