import React, { useState, useMemo } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import { indianStateIrradiance, DEFAULT_AVG_SUN_HOURS } from '../../data/solarIrradiance';

const SolarEstimator: React.FC = () => {
  const { selectedState, ratePerUnit } = useCalculator();
  const [mode, setMode] = useState<'avg' | '3months' | '12months'>('avg');
  const [avgBill, setAvgBill] = useState<number | ''>('');
  const [threeMonths, setThreeMonths] = useState<number[]>([0, 0, 0]);
  const [twelveMonths, setTwelveMonths] = useState<number[]>(Array(12).fill(0));
  const [manualSun, setManualSun] = useState<boolean>(false);
  const [sunHours, setSunHours] = useState<number>(5); // user-set sun exposure default 5

  const avgSunHours = useMemo(() => {
    if (!selectedState) return DEFAULT_AVG_SUN_HOURS;
    const v = indianStateIrradiance.find(s => s.state === selectedState);
    return v ? v.avgSunHours : DEFAULT_AVG_SUN_HOURS;
  }, [selectedState]);
  
  // Effective sun hours used for calculation (either manual override or state average)
  const effectiveSunHours = manualSun ? sunHours : avgSunHours;

  const computed = useMemo(() => {
    let monthlyBill = 0;
    if (mode === 'avg') {
      monthlyBill = typeof avgBill === 'number' ? avgBill : 0;
    } else if (mode === '3months') {
      const vals = threeMonths.filter(v => !!v);
      monthlyBill = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    } else {
      const vals = twelveMonths.filter(v => !!v);
      monthlyBill = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }

    const monthlyKWh = ratePerUnit > 0 ? monthlyBill / ratePerUnit : 0;

    // Estimate required system size in kW
    const performanceRatio = 0.75; // system losses
    const requiredKW = effectiveSunHours > 0 ? monthlyKWh / (effectiveSunHours * 30 * performanceRatio) : 0;

    // Panel sizing (typical panel 400Wp)
    const panelWp = 400; // watts per panel
    const panels = Math.max(0, Math.ceil((requiredKW * 1000) / panelWp));

    // Cost estimates (₹/W) - provide low/high range
    const costPerWLow = 45; // ₹/W
    const costPerWHigh = 90; // ₹/W
    const costLow = requiredKW * 1000 * costPerWLow;
    const costHigh = requiredKW * 1000 * costPerWHigh;

    const yearlySavings = monthlyBill * 12;
    const paybackLow = yearlySavings > 0 ? costLow / yearlySavings : Infinity;
    const paybackHigh = yearlySavings > 0 ? costHigh / yearlySavings : Infinity;

    return {
      monthlyBill,
      monthlyKWh,
      requiredKW,
      panels,
      costLow,
      costHigh,
      paybackLow,
      paybackHigh,
    };
  }, [mode, avgBill, threeMonths, twelveMonths, ratePerUnit, effectiveSunHours]);

  const fmt = (n: number) => Number.isFinite(n) ? n.toFixed(2) : '—';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" d="M3 13h4l3-8 4 16 3-8h4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Solar Panel Estimator</h2>
          <p className="text-gray-600 dark:text-gray-400">Enter your bills to estimate panels, cost and payback years.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <label className={`px-4 py-2 rounded-xl cursor-pointer ${mode==='avg' ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-900/20 border-2 border-transparent'}`}>
            <input type="radio" name="mode" checked={mode==='avg'} onChange={() => setMode('avg')} className="mr-2" />
            Average monthly bill
          </label>
          <label className={`px-4 py-2 rounded-xl cursor-pointer ${mode==='3months' ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-900/20 border-2 border-transparent'}`}>
            <input type="radio" name="mode" checked={mode==='3months'} onChange={() => setMode('3months')} className="mr-2" />
            Last 3 months
          </label>
          <label className={`px-4 py-2 rounded-xl cursor-pointer ${mode==='12months' ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-900/20 border-2 border-transparent'}`}>
            <input type="radio" name="mode" checked={mode==='12months'} onChange={() => setMode('12months')} className="mr-2" />
            Last 12 months
          </label>
        </div>

        {mode === 'avg' && (
          <div>
            <input
              type="number"
              value={avgBill}
              onChange={(e) => setAvgBill(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter average monthly bill (₹)"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-green-500"
            />
          </div>
        )}

        {mode === '3months' && (
          <div className="grid grid-cols-3 gap-3">
            {threeMonths.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                onChange={(e) => {
                  const copy = [...threeMonths];
                  copy[i] = parseFloat(e.target.value) || 0;
                  setThreeMonths(copy);
                }}
                placeholder={`Month ${i + 1} (₹)`}
                className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            ))}
          </div>
        )}

        {mode === '12months' && (
          <div className="grid grid-cols-4 gap-3">
            {twelveMonths.map((val, i) => (
              <input
                key={i}
                type="number"
                value={val}
                onChange={(e) => {
                  const copy = [...twelveMonths];
                  copy[i] = parseFloat(e.target.value) || 0;
                  setTwelveMonths(copy);
                }}
                placeholder={`M${i + 1}`}
                className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            ))}
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border-2 border-transparent">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Estimated monthly consumption</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(computed.monthlyKWh)} kWh</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Estimated system size</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(computed.requiredKW)} kW</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Panels (≈400Wp)</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{computed.panels}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg sun hrs (selected)</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{effectiveSunHours}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={manualSun}
              onChange={(e) => setManualSun(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Set sun exposure manually</span>
          </label>

          {manualSun && (
            <input
              type="number"
              step="0.1"
              min="0"
              value={sunHours}
              onChange={(e) => setSunHours(parseFloat(e.target.value) || 0)}
              className="ml-2 w-28 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              aria-label="Sun hours per day"
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">Estimated cost (rough)</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">₹{fmt(computed.costLow)} — ₹{fmt(computed.costHigh)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Estimated payback</div>
          <div className="text-sm text-gray-900 dark:text-white">{computed.paybackLow === Infinity ? '—' : `${fmt(computed.paybackLow)} years`} — {computed.paybackHigh === Infinity ? '—' : `${fmt(computed.paybackHigh)} years`}</div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          These are ballpark estimates. Costs and production depend on site, orientation, shading, subsidies and installation quality.
        </div>
      </div>
    </div>
  );
};

export default SolarEstimator;
