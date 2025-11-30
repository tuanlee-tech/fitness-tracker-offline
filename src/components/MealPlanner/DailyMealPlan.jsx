import { Trash2, UtensilsCrossed, Plus } from 'lucide-react';

export const DailyMealPlan = ({ meals, onRemoveFood, onClearMeal, onAddFoodClick }) => {
  console.log('DailyMealPlan props:', { meals, onRemoveFood, onClearMeal, onAddFoodClick });
  const mealTypes = [
    { id: 'breakfast', label: 'Bữa sáng', emoji: '🌅' },
    { id: 'lunch', label: 'Bữa trưa', emoji: '☀️' },
    { id: 'dinner', label: 'Bữa tối', emoji: '🌙' },
    { id: 'snack', label: 'Bữa phụ', emoji: '🍎' }
  ];

  const getMealsByType = (type) => meals.filter(meal => meal.type === type);

  const calculateTotal = (typeMeals) => {
    return typeMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.totalCalories,
      protein: acc.protein + meal.totalProtein,
      carbs: acc.carbs + meal.totalCarbs,
      fat: acc.fat + meal.totalFat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const calculateDailyTotal = () => {
    return meals.reduce((total, food) => ({
      calories: total.calories + food.totalCalories,
      protein: total.protein + food.totalProtein,
      carbs: total.carbs + food.totalCarbs,
      fat: total.fat + food.totalFat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const dailyTotal = calculateDailyTotal();

  return (
    <div className="space-y-6">
      {/* Daily Total */}
      {meals.length > 0 && (
        <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-100 dark:border-primary-800/30">
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Tổng cả ngày</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Calories</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{Math.round(dailyTotal.calories)}</p>
            </div>
            <div className="text-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Protein</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{Math.round(dailyTotal.protein)}g</p>
            </div>
            <div className="text-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Carbs</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{Math.round(dailyTotal.carbs)}g</p>
            </div>
            <div className="text-center p-2 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fat</p>
              <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{Math.round(dailyTotal.fat)}g</p> 
            </div>
          </div>
        </div>
      )}
      {mealTypes.map(type => {
        const typeMeals = getMealsByType(type.id);
        const totals = calculateTotal(typeMeals);
        
        return (
          <div key={type.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{type.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{type.label}</h3>
                  <p className="text-xs text-gray-300 font-semibold">
                    {Math.round(totals.calories)} calories
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {totals.protein.toFixed(1)} P | {totals.carbs.toFixed(1)} C | {totals.fat.toFixed(1)} F
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onAddFoodClick(type.id)}
                  className="btn px-3 py-2 pe-5 btn-primary btn-sm text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" /> Thêm món
                </button>
                {typeMeals.length > 0 && (
                  <button 
                    onClick={() => onClearMeal(type.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {typeMeals.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic py-4 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                Chưa có thực phẩm
              </p>
            ) : (
              <>
                <div className="space-y-2 mb-3">
                  {typeMeals.map((food, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{food.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {food.grams}g • {Math.round(food.totalCalories)} kcal
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFood(type.id, idx)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
