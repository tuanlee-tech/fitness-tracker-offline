import { Target, Flame, Edit2, Check, X, RotateCcw, AlertCircle, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const MacroProgress = ({ consumed, target, goalSettings, onUpdateGoals }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    calories: goalSettings.calories,
    protein: goalSettings.protein,
    carbs: goalSettings.carbs,
    fat: goalSettings.fat
  });

  // Calculate percentages based on current goal settings (for auto-scaling)
  const [ratios, setRatios] = useState({
    protein: 0.3,
    carbs: 0.4,
    fat: 0.3
  });

  useEffect(() => {
    if (goalSettings.calories > 0) {
      setRatios({
        protein: (goalSettings.protein * 4) / goalSettings.calories,
        carbs: (goalSettings.carbs * 4) / goalSettings.calories,
        fat: (goalSettings.fat * 9) / goalSettings.calories
      });
    }
  }, [goalSettings]);

  const handleCaloriesChange = (newCalories) => {
    // Allow empty string for better typing experience
    if (newCalories === '') {
      setEditValues({...editValues, calories: ''});
      return;
    }

    const calories = Number(newCalories);
    if (isNaN(calories)) return;

    setEditValues({
      calories,
      protein: Math.round((calories * ratios.protein) / 4),
      carbs: Math.round((calories * ratios.carbs) / 4),
      fat: Math.round((calories * ratios.fat) / 9)
    });
  };

  const handleMacroChange = (field, value) => {
    if (value === '') {
      setEditValues({...editValues, [field]: ''});
      return;
    }
    const numValue = Number(value);
    if (isNaN(numValue)) return;
    setEditValues({...editValues, [field]: numValue});
  };

  // Calculate total calories from macros for validation
  const currentCalories = Number(editValues.calories) || 0;
  const currentProtein = Number(editValues.protein) || 0;
  const currentCarbs = Number(editValues.carbs) || 0;
  const currentFat = Number(editValues.fat) || 0;

  const macroCalories = (currentProtein * 4) + (currentCarbs * 4) + (currentFat * 9);
  // Strict validation: must be within 5 calories of target
  const isValid = Math.abs(macroCalories - currentCalories) <= 5;
  const isOver = macroCalories > currentCalories + 5;
  const isUnder = macroCalories < currentCalories - 5;

  const caloriePercentage = target > 0 ? Math.min((consumed.calories / target) * 100, 100) : 0;
  const remaining = Math.max(target - consumed.calories, 0);

  const proteinPercentage = goalSettings.protein > 0 ? (consumed.protein / goalSettings.protein) * 100 : 0;
  const carbsPercentage = goalSettings.carbs > 0 ? (consumed.carbs / goalSettings.carbs) * 100 : 0;
  const fatPercentage = goalSettings.fat > 0 ? (consumed.fat / goalSettings.fat) * 100 : 0;

  const handleSave = () => {
    if (!isValid) return;
    onUpdateGoals({
      ...goalSettings,
      isAuto: false,
      calories: currentCalories,
      protein: currentProtein,
      carbs: currentCarbs,
      fat: currentFat
    });
    setIsEditing(false);
  };

  const handleResetAuto = () => {
    onUpdateGoals({
      ...goalSettings,
      isAuto: true
    });
    setIsEditing(false);
  };

  const chartData = [
    { name: 'Protein', value: currentProtein * 4, color: '#3B82F6' },
    { name: 'Carbs', value: currentCarbs * 4, color: '#22C55E' },
    { name: 'Fat', value: currentFat * 9, color: '#EAB308' },
  ];

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-500" />
          Mục tiêu dinh dưỡng
        </h3>
        <div className='target-setting'>
        {!isEditing ? (
          <button 
            onClick={() => {
              setEditValues({
                calories: goalSettings.calories,
                protein: goalSettings.protein,
                carbs: goalSettings.carbs,
                fat: goalSettings.fat
              });
              setIsEditing(true);
            }}
            className="btn btn-ghost btn-sm text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 trigger-btn"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            {goalSettings.isAuto ? 'Tự động' : 'Tùy chỉnh'}
          </button>
        ) : (
          <div className="flex gap-2 animate-fadeIn action-buttons">
            <button onClick={handleResetAuto} className="btn btn-ghost btn-sm text-xs text-blue-500 bg-blue-50 dark:bg-blue-900/20">
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Auto
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-ghost btn-sm text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              Hủy
            </button>
            <button 
              onClick={handleSave} 
              disabled={!isValid}
              className={`btn btn-sm text-xs transition-all duration-200 ${
                isValid 
                  ? 'btn-primary shadow-lg shadow-primary-500/30' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              }`}
            >
              <Check className="w-3.5 h-3.5 mr-1" /> Lưu
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Edit Mode UI */}
      {isEditing ? (
        <div className="card bg-white dark:bg-gray-800 border-2 border-primary-100 dark:border-primary-900/50 animate-slideDown shadow-xl shadow-primary-500/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inputs Column */}
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                  Tổng Calories mục tiêu
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={editValues.calories}
                    onChange={e => handleCaloriesChange(e.target.value.replace(/\D/g, ''))}
                    className="input py-3 text-xl font-bold text-primary-600 dark:text-primary-400 pl-10"
                    placeholder="2000"
                  />
                  <Flame className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">kcal</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Phân bổ Macros (Tự động tính theo %)
                </label>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-xl border border-blue-100 dark:border-blue-800/30 relative">
                    <label className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mb-1 block">Protein</label>
                    <input 
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={editValues.protein}
                      onChange={e => handleMacroChange('protein', e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent border-none p-0 text-lg font-bold text-gray-900 dark:text-white focus:ring-0"
                    />
                    <span className="text-xs text-gray-400">g</span>
                    <div className="absolute top-2 right-2 text-[10px] font-medium text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 rounded-md">
                      {Math.round((currentProtein * 4 / currentCalories) * 100) || 0}%
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/10 p-2 rounded-xl border border-green-100 dark:border-green-800/30 relative">
                    <label className="text-[10px] text-green-600 dark:text-green-400 font-semibold mb-1 block">Carbs</label>
                    <input 
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={editValues.carbs}
                      onChange={e => handleMacroChange('carbs', e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent border-none p-0 text-lg font-bold text-gray-900 dark:text-white focus:ring-0"
                    />
                    <span className="text-xs text-gray-400">g</span>
                    <div className="absolute top-2 right-2 text-[10px] font-medium text-green-500 bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded-md">
                      {Math.round((currentCarbs * 4 / currentCalories) * 100) || 0}%
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 p-2 rounded-xl border border-yellow-100 dark:border-yellow-800/30 relative">
                    <label className="text-[10px] text-yellow-600 dark:text-yellow-400 font-semibold mb-1 block">Fat</label>
                    <input 
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={editValues.fat}
                      onChange={e => handleMacroChange('fat', e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-transparent border-none p-0 text-lg font-bold text-gray-900 dark:text-white focus:ring-0"
                    />
                    <span className="text-xs text-gray-400">g</span>
                    <div className="absolute top-2 right-2 text-[10px] font-medium text-yellow-500 bg-yellow-100 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded-md">
                      {Math.round((currentFat * 9 / currentCalories) * 100) || 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Column */}
            <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4">
              <div className="w-32 h-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className={`text-xs font-bold ${isValid ? 'text-gray-500' : 'text-red-500'}`}>
                    {Math.round((macroCalories / currentCalories) * 100)}%
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className={`text-sm font-medium ${isValid ? 'text-gray-600 dark:text-gray-300' : 'text-red-500'}`}>
                  Tổng: {macroCalories} kcal
                </p>
                {!isValid && (
                  <p className="text-xs text-red-500 mt-1 flex items-center justify-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                    <AlertCircle className="w-3 h-3" />
                    {isOver ? `Vượt quá ${macroCalories - currentCalories} kcal` : `Thiếu ${currentCalories - macroCalories} kcal`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* View Mode UI */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Calorie Progress Ring */}
          <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-100 dark:border-orange-800/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Calories</h3>
              <div className="p-1.5 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/50 dark:text-gray-700"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={caloriePercentage >= 100 ? 'text-red-500' : 'text-orange-500'}
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - caloriePercentage / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {Math.round(caloriePercentage)}%
                  </p>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(consumed.calories)}
                  <span className="text-sm font-normal text-gray-500 ml-1">/ {goalSettings.calories}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Còn lại: <span className="font-bold text-success">{Math.round(remaining)} kcal</span>
                </p>
              </div>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="card bg-white dark:bg-gray-800">
            <div className="space-y-4">
              {/* Protein */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Protein</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {consumed.protein.toFixed(0)}/{goalSettings.protein}g
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Carbs</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    {consumed.carbs.toFixed(0)}/{goalSettings.carbs}g
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(carbsPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Fat */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Fat</span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                    {consumed.fat.toFixed(0)}/{goalSettings.fat}g
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(fatPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
