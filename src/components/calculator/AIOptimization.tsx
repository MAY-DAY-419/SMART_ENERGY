import React from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { Brain, Lightbulb, TrendingDown, Clock, Leaf, Zap } from 'lucide-react';

const AIOptimization: React.FC = () => {
  const { getAllDevices, ratePerUnit } = useCalculator();
  const devices = getAllDevices();

  const generateSuggestions = () => {
    const suggestions: Array<{ icon: React.ReactNode; title: string; description: string; savings: string }> = [];

    // Check for high-wattage devices
    const highWattageDevices = devices.filter(d => d.wattage > 1000);
    if (highWattageDevices.length > 0) {
      suggestions.push({
        icon: <TrendingDown className="w-5 h-5" />,
        title: 'Replace High-Power Appliances',
        description: `You have ${highWattageDevices.length} high-wattage devices. Consider replacing with energy-efficient inverter models.`,
        savings: 'Save up to 30-40%',
      });
    }

    // Check for AC usage
    const acDevices = devices.filter(d => d.name.toLowerCase().includes('ac'));
    if (acDevices.length > 0 && acDevices.some(d => d.hoursPerDay > 8)) {
      suggestions.push({
        icon: <TrendingDown className="w-5 h-5" />,
        title: 'Optimize AC Temperature',
        description: 'Set your AC to 24-26°C instead of lower temperatures. Each degree higher saves 3-5% energy.',
        savings: 'Save ₹500-800/month',
      });
    }

    // Check for old refrigerators
    const fridgeDevices = devices.filter(d => d.name.toLowerCase().includes('refrigerator') || d.name.toLowerCase().includes('fridge'));
    if (fridgeDevices.length > 0) {
      suggestions.push({
        icon: <Zap className="w-5 h-5" />,
        title: 'Upgrade to Inverter Refrigerator',
        description: 'Inverter refrigerators consume 30-40% less energy than conventional models.',
        savings: 'Save ₹300-500/month',
      });
    }

    // Check for lighting
    const lightingDevices = devices.filter(d => d.category === 'Lighting' && d.wattage > 15);
    if (lightingDevices.length > 0) {
      suggestions.push({
        icon: <Lightbulb className="w-5 h-5" />,
        title: 'Switch to LED Lights',
        description: 'Replace all CFL and incandescent bulbs with LED. LEDs use 75% less energy.',
        savings: 'Save ₹200-400/month',
      });
    }

    // Check for washing machine
    const washingDevices = devices.filter(d => d.name.toLowerCase().includes('washing'));
    if (washingDevices.length > 0) {
      suggestions.push({
        icon: <Clock className="w-5 h-5" />,
        title: 'Optimize Washing Schedule',
        description: 'Run washing machine and water motor during off-peak hours (10 PM - 6 AM) if available in your area.',
        savings: 'Save 10-15% on costs',
      });
    }

    // Check for entertainment devices
    const entertainmentDevices = devices.filter(d => d.category === 'Entertainment');
    if (entertainmentDevices.length > 0) {
      suggestions.push({
        icon: <Zap className="w-5 h-5" />,
        title: 'Eliminate Standby Power',
        description: 'Turn off TVs, gaming consoles, and entertainment systems completely. Standby mode wastes 5-10W continuously.',
        savings: 'Save ₹100-200/month',
      });
    }

    // Check for water heaters
    const heaterDevices = devices.filter(d => d.name.toLowerCase().includes('heater') || d.name.toLowerCase().includes('geyser'));
    if (heaterDevices.some(d => d.wattage > 2000)) {
      suggestions.push({
        icon: <Clock className="w-5 h-5" />,
        title: 'Reduce Water Heater Usage',
        description: 'Use water heater only when needed. Consider solar water heater for long-term savings.',
        savings: 'Save ₹400-600/month',
      });
    }

    // IoT automation suggestion
    if (devices.length >= 5) {
      suggestions.push({
        icon: <Brain className="w-5 h-5" />,
        title: 'IoT Smart Automation',
        description: 'Install smart plugs and automate device schedules based on your usage patterns. Turn off devices automatically when not in use.',
        savings: 'Save 15-20% overall',
      });
    }

    // General tip
    suggestions.push({
      icon: <Leaf className="w-5 h-5" />,
      title: 'Regular Maintenance',
      description: 'Clean AC filters monthly, defrost refrigerator regularly, and service appliances annually for optimal efficiency.',
      savings: 'Maintain peak efficiency',
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  if (devices.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Energy Optimization
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Smart recommendations to reduce your electricity bill
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {suggestion.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  <TrendingDown className="w-4 h-4" />
                  {suggestion.savings}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Pro Tips for Maximum Savings
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
            <span>Use natural light during the day and reduce artificial lighting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
            <span>Unplug phone and laptop chargers when not in use</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
            <span>Use ceiling fans along with AC to distribute cool air better</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
            <span>Cook in batches to reduce microwave/oven usage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
            <span>Check for BEE 5-star ratings when buying new appliances</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AIOptimization;
