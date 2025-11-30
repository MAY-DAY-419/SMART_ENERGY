import React, { useMemo } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp, Calendar, Trash2, Save, AlertCircle } from 'lucide-react';

const BillComparison: React.FC = () => {
  const { billHistory, getAllDevices, ratePerUnit, selectedState, saveBillSnapshot, deleteBillHistory } = useCalculator();
  const currentDevices = getAllDevices();

  // Calculate current month stats
  const currentMonthStats = useMemo(() => {
    const totalUnits = currentDevices.reduce((sum, device) => {
      return sum + (device.wattage * device.hoursPerDay * 30) / 1000;
    }, 0);
    const totalCost = totalUnits * ratePerUnit;
    const totalCO2 = totalUnits * 0.82;

    return { totalCost, totalUnits, totalCO2, deviceCount: currentDevices.length };
  }, [currentDevices, ratePerUnit]);

  // Prepare chart data (reverse to show oldest to newest)
  const chartData = useMemo(() => {
    const data = [...billHistory].reverse().map(record => ({
      month: record.month.split(' ')[0].substring(0, 3), // Short month name
      cost: parseFloat(record.totalCost.toFixed(2)),
      units: parseFloat(record.totalUnits.toFixed(2)),
      co2: parseFloat(record.totalCO2.toFixed(2)),
    }));

    // Add current month if we have data
    if (currentDevices.length > 0 && selectedState) {
      const now = new Date();
      const currentMonth = now.toLocaleDateString('en-US', { month: 'short' });
      data.push({
        month: currentMonth,
        cost: parseFloat(currentMonthStats.totalCost.toFixed(2)),
        units: parseFloat(currentMonthStats.totalUnits.toFixed(2)),
        co2: parseFloat(currentMonthStats.totalCO2.toFixed(2)),
      });
    }

    return data;
  }, [billHistory, currentDevices, selectedState, currentMonthStats]);

  // Compare with last month
  const lastMonthComparison = useMemo(() => {
    if (billHistory.length === 0 || currentDevices.length === 0) return null;

    const lastMonth = billHistory[0];
    const costDiff = currentMonthStats.totalCost - lastMonth.totalCost;
    const unitsDiff = currentMonthStats.totalUnits - lastMonth.totalUnits;
    const co2Diff = currentMonthStats.totalCO2 - lastMonth.totalCO2;
    const deviceDiff = currentMonthStats.deviceCount - lastMonth.deviceCount;

    const costPercentage = ((costDiff / lastMonth.totalCost) * 100).toFixed(1);
    const unitsPercentage = ((unitsDiff / lastMonth.totalUnits) * 100).toFixed(1);

    return {
      lastMonth,
      costDiff,
      unitsDiff,
      co2Diff,
      deviceDiff,
      costPercentage,
      unitsPercentage,
      isImproved: costDiff < 0,
    };
  }, [billHistory, currentMonthStats, currentDevices.length]);

  const handleSaveSnapshot = () => {
    saveBillSnapshot();
  };

  if (currentDevices.length === 0 || !selectedState) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">
          Add devices and select a location to track your bill history
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bill Comparison</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your energy usage over time</p>
          </div>
        </div>
        <button
          onClick={handleSaveSnapshot}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
        >
          <Save className="w-5 h-5" />
          Save Current Bill
        </button>
      </div>

      {/* Last Month Comparison */}
      {lastMonthComparison && (
        <div className={`rounded-xl p-6 mb-6 border-2 ${
          lastMonthComparison.isImproved 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {lastMonthComparison.isImproved ? (
              <TrendingDown className="w-8 h-8 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {lastMonthComparison.isImproved ? 'Great Job! Bills Decreased 🎉' : 'Bills Increased ⚠️'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compared to {lastMonthComparison.lastMonth.month}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cost Change</div>
              <div className={`text-2xl font-bold ${
                lastMonthComparison.isImproved ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {lastMonthComparison.costDiff > 0 ? '+' : ''}₹{lastMonthComparison.costDiff.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                ({lastMonthComparison.costPercentage}%)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Units Change</div>
              <div className={`text-2xl font-bold ${
                lastMonthComparison.unitsDiff < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {lastMonthComparison.unitsDiff > 0 ? '+' : ''}{lastMonthComparison.unitsDiff.toFixed(1)} kWh
              </div>
              <div className="text-xs text-gray-500">
                ({lastMonthComparison.unitsPercentage}%)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">CO₂ Change</div>
              <div className={`text-2xl font-bold ${
                lastMonthComparison.co2Diff < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {lastMonthComparison.co2Diff > 0 ? '+' : ''}{lastMonthComparison.co2Diff.toFixed(1)} kg
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Devices</div>
              <div className={`text-2xl font-bold ${
                lastMonthComparison.deviceDiff > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
              }`}>
                {lastMonthComparison.deviceDiff > 0 ? '+' : ''}{lastMonthComparison.deviceDiff}
              </div>
              <div className="text-xs text-gray-500">
                Total: {currentMonthStats.deviceCount}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {chartData.length > 1 && (
        <div className="space-y-6 mb-6">
          {/* Cost Trend */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Bill Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="cost" stroke="#8B5CF6" strokeWidth={3} name="Cost (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Units and CO2 Comparison */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy & Emissions Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="units" fill="#3B82F6" name="Units (kWh)" />
                <Bar dataKey="co2" fill="#10B981" name="CO₂ (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Bill History Table */}
      {billHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saved Bills</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Month</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Cost</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Units</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">CO₂</th>
                  <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Devices</th>
                  <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {billHistory.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{record.month}</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">₹{record.totalCost.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">{record.totalUnits.toFixed(1)} kWh</td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">{record.totalCO2.toFixed(1)} kg</td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">{record.deviceCount}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteBillHistory(record.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No History Message */}
      {billHistory.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No bill history yet. Click "Save Current Bill" to start tracking!
          </p>
        </div>
      )}
    </div>
  );
};

export default BillComparison;
