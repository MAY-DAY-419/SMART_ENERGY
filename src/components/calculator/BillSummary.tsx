import React, { useMemo } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Zap, DollarSign, Leaf } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
  }
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const BillSummary: React.FC = () => {
  const { rooms, getAllDevices, ratePerUnit, selectedState } = useCalculator();
  const devices = getAllDevices();

  const calculateTotals = () => {
    let totalMonthlyBill = 0;
    let totalUnits = 0;
    let totalCO2 = 0;
    const categoryData: { [key: string]: number } = {};

    devices.forEach((device) => {
      const monthlyUnits = (device.wattage * device.hoursPerDay * 30) / 1000;
      const monthlyCost = monthlyUnits * ratePerUnit;
      const co2 = monthlyUnits * 0.82; // India's CO2 factor

      totalUnits += monthlyUnits;
      totalMonthlyBill += monthlyCost;
      totalCO2 += co2;

      if (!categoryData[device.category]) {
        categoryData[device.category] = 0;
      }
      categoryData[device.category] += monthlyCost;
    });

    return { totalMonthlyBill, totalUnits, totalCO2, categoryData };
  };

  const { totalMonthlyBill, totalUnits, totalCO2, categoryData } = calculateTotals();

  const pieData = Object.entries(categoryData).map(([category, cost]) => ({
    name: category,
    value: parseFloat(cost.toFixed(2)),
  }));

  const barData = devices.map((device) => ({
    name: device.name.length > 15 ? device.name.substring(0, 15) + '...' : device.name,
    cost: parseFloat((((device.wattage * device.hoursPerDay * 30) / 1000) * ratePerUnit).toFixed(2)),
  })).sort((a, b) => b.cost - a.cost).slice(0, 10);

  const exportToExcel = () => {
    const data = devices.map((device) => ({
      Device: device.name,
      Brand: device.brand,
      Category: device.category,
      Wattage: device.wattage,
      'Hours/Day': device.hoursPerDay,
      'Monthly Units (kWh)': ((device.wattage * device.hoursPerDay * 30) / 1000).toFixed(2),
      'Monthly Cost (₹)': (((device.wattage * device.hoursPerDay * 30) / 1000) * ratePerUnit).toFixed(2),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Energy Report');

    // Add summary
    const summary = [
      ['Energy Consumption Report'],
      ['State', selectedState],
      ['Rate per Unit', `₹${ratePerUnit}`],
      ['Total Monthly Units', `${totalUnits.toFixed(2)} kWh`],
      ['Total Monthly Bill', `₹${totalMonthlyBill.toFixed(2)}`],
    ];
    const ws2 = XLSX.utils.aoa_to_sheet(summary);
    XLSX.utils.book_append_sheet(wb, ws2, 'Summary');

    XLSX.writeFile(wb, 'energy-report.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Energy Consumption Report', 14, 22);

    // Summary
    doc.setFontSize(12);
    doc.text(`State: ${selectedState}`, 14, 35);
    doc.text(`Rate per Unit: ₹${ratePerUnit}`, 14, 42);
    doc.text(`Total Monthly Units: ${totalUnits.toFixed(2)} kWh`, 14, 49);
    doc.text(`Total Monthly Bill: ₹${totalMonthlyBill.toFixed(2)}`, 14, 56);
    doc.text(`Total CO2 Emissions: ${totalCO2.toFixed(2)} kg/month`, 14, 63);

    // Device table
    const tableData = devices.map((device) => {
      const monthlyUnits = (device.wattage * device.hoursPerDay * 30) / 1000;
      const monthlyCost = monthlyUnits * ratePerUnit;
      const co2 = monthlyUnits * 0.82;
      return [
        device.name,
        device.brand,
        device.category,
        `${device.wattage}W`,
        `${device.hoursPerDay}h`,
        `${monthlyUnits.toFixed(2)} kWh`,
        `₹${monthlyCost.toFixed(2)}`,
        `${co2.toFixed(2)} kg`,
      ];
    });

    doc.autoTable({
      startY: 72,
      head: [['Device', 'Brand', 'Category', 'Wattage', 'Hours/Day', 'Monthly Units', 'Monthly Cost', 'CO2 (kg)']],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save('energy-report.pdf');
  };

  if (devices.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bill Summary
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your complete energy consumption breakdown
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Total Monthly Bill
            </span>
          </div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">
            ₹{totalMonthlyBill.toFixed(2)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Total Units Consumed
            </span>
          </div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {totalUnits.toFixed(2)} kWh
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              CO₂ Emissions
            </span>
          </div>
          <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
            {totalCO2.toFixed(1)} kg
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            per month
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Cost by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top 10 Devices by Cost
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="cost" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {pieData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                ₹{item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
