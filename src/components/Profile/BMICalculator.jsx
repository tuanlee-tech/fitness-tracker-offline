import { Activity } from 'lucide-react';
import { calculateBMI, getBMIClassification } from '../../utils/calculations';

export const BMICalculator = ({ weight, height }) => {
  if (!weight || !height) {
    return (
      <div className="card bg-gray-50 dark:bg-gray-800/50">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Nhập chiều cao và cân nặng để tính BMI</p>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI(weight, height);
  const { label, color } = getBMIClassification(bmi);

  // Calculate position on scale (18.5 - 30 range)
  const minBMI = 16;
  const maxBMI = 35;
  const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
  const clampedPosition = Math.max(0, Math.min(100, position));

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary-500" />
        <h3 className="font-semibold">Chỉ số BMI</h3>
      </div>

      <div className="text-center mb-4">
        <div className={`text-4xl font-bold ${color} mb-1`}>
          {bmi.toFixed(1)}
        </div>
        <div className={`text-sm font-medium ${color}`}>
          {label}
        </div>
      </div>

      {/* BMI Scale */}
      <div className="relative h-8 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full mb-2">
        {/* Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
          style={{ left: `${clampedPosition}%` }}
        >
          <div className="w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-white rounded-full shadow-lg" />
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
        <span>16</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>35</span>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Thiếu cân</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Bình thường</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Thừa cân</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Béo phì</span>
        </div>
      </div>
    </div>
  );
};
