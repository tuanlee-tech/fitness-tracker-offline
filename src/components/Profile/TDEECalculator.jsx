import { Flame, TrendingDown } from 'lucide-react';
import { calculateBMR, calculateTDEE, calculateCalorieDeficit, calculateMacros } from '../../utils/calculations';

export const TDEECalculator = ({ profile }) => {
  if (!profile.currentWeight || !profile.height || !profile.age) {
    return (
      <div className="card bg-gray-50 dark:bg-gray-800/50">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Flame className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Nhập đầy đủ thông tin để tính TDEE</p>
        </div>
      </div>
    );
  }

  const bmr = calculateBMR(profile.currentWeight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const caloriesForWeightLoss = calculateCalorieDeficit(tdee, 500);
  const macros = calculateMacros(caloriesForWeightLoss, profile.currentWeight);

  const weightDiff = profile.currentWeight - profile.targetWeight;
  const isLosing = weightDiff > 0;

  return (
    <div className="space-y-4">
      {/* TDEE Card */}
      <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold">Calories tiêu hao hàng ngày</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">BMR (Nghỉ ngơi)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(bmr)}
            </p>
            <p className="text-xs text-gray-500">kcal/ngày</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">TDEE (Tổng)</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.round(tdee)}
            </p>
            <p className="text-xs text-gray-500">kcal/ngày</p>
          </div>
        </div>
      </div>

      {/* Weight Loss Plan */}
      {isLosing && (
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold">Kế hoạch giảm cân</h3>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mục tiêu giảm
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {weightDiff.toFixed(1)} kg
              </p>
            </div>

            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Ăn mỗi ngày
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(caloriesForWeightLoss)}
              </p>
              <p className="text-xs text-gray-500">kcal/ngày (deficit 500 kcal)</p>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              💡 Với deficit 500 kcal, bạn sẽ giảm ~0.5kg/tuần
            </p>
          </div>
        </div>
      )}

      {/* Macro Recommendations */}
      <div className="card">
        <h3 className="font-semibold mb-4">Khuyến nghị macros</h3>
        
        <div className="space-y-3">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Protein</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {macros.protein}g ({macros.proteinCalories} kcal)
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${(macros.proteinCalories / caloriesForWeightLoss) * 100}%` }}
              />
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Chất béo</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">
                {macros.fat}g ({Math.round(macros.fatCalories)} kcal)
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${(macros.fatCalories / caloriesForWeightLoss) * 100}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Carbs</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {macros.carbs}g ({Math.round(macros.carbCalories)} kcal)
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(macros.carbCalories / caloriesForWeightLoss) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Lưu ý:</strong> Protein ưu tiên 1.6-2g/kg để duy trì cơ bắp. Phần còn lại chia cho carbs và chất béo.
          </p>
        </div>
      </div>
    </div>
  );
};
