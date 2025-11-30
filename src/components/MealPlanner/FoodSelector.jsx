import { useState } from 'react';
import { Search, Plus, X, ChefHat, Trash2, PlusCircleIcon } from 'lucide-react';
import { useFoodDatabase } from '../../hooks/useFoodDatabase';
import { validateGrams } from '../../utils/validation';

export const FoodSelector = ({ onAddFood }) => {
  const { searchFoods, addFood: addNewFoodToDb, deleteFood: deleteFoodFromDb } = useFoodDatabase();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [grams, setGrams] = useState('100');
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // New Food Form State
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const filteredFoods = searchFoods(searchQuery);

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setSearchQuery(food.name);
    setShowDropdown(false);
  };

  const handleAdd = () => {
    const gramsError = validateGrams(grams);
    if (gramsError) {
      setError(gramsError);
      return;
    }

    if (!selectedFood) {
      setError('Vui lòng chọn thực phẩm');
      return;
    }

    const multiplier = Number(grams) / 100;
    onAddFood({
      ...selectedFood,
      grams: Number(grams),
      totalCalories: selectedFood.calories * multiplier,
      totalProtein: selectedFood.protein * multiplier,
      totalCarbs: selectedFood.carbs * multiplier,
      totalFat: selectedFood.fat * multiplier
    });

    // Reset
    setSearchQuery('');
    setSelectedFood(null);
    setGrams('100');
    setError('');
  };

  const handleCreateFood = (e) => {
    e.preventDefault();
    if (!newFood.name || !newFood.calories) return;

    const createdFood = addNewFoodToDb({
      name: newFood.name,
      calories: Number(newFood.calories),
      protein: Number(newFood.protein) || 0,
      carbs: Number(newFood.carbs) || 0,
      fat: Number(newFood.fat) || 0
    });

    setSelectedFood(createdFood);
    setSearchQuery(createdFood.name);
    setIsAddingNew(false);
    setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const handleDeleteFood = (e, foodId) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc muốn xóa món này?')) {
      deleteFoodFromDb(foodId);
    }
  };

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl">
            <Search className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Thêm thực phẩm</h3>
        </div>
        <button 
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="btn btn-secondary btn-sm"
        >
          <PlusCircleIcon className="w-4 h-4 mr-1" />
          {isAddingNew ? 'Hủy' : 'Thêm thực phẩm'}
        </button>
      </div>
      
      {isAddingNew ? (
        <form onSubmit={handleCreateFood} className="space-y-4 animate-fadeIn">
          <div>
            <label className="label">Tên thực phẩm</label>
            <input
              type="text"
              required
              value={newFood.name}
              onChange={e => setNewFood({...newFood, name: e.target.value})}
              className="input"
              placeholder="Ví dụ: Phở bò"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Calories (kcal)</label>
              <input
                type="number"
                required
                value={newFood.calories}
                onChange={e => setNewFood({...newFood, calories: e.target.value})}
                className="input"
                placeholder="0"
              />
            </div>
            <div>
              <label className="label">Protein (g)</label>
              <input
                type="number"
                value={newFood.protein}
                onChange={e => setNewFood({...newFood, protein: e.target.value})}
                className="input"
                placeholder="0"
              />
            </div>
            <div>
              <label className="label">Carbs (g)</label>
              <input
                type="number"
                value={newFood.carbs}
                onChange={e => setNewFood({...newFood, carbs: e.target.value})}
                className="input"
                placeholder="0"
              />
            </div>
            <div>
              <label className="label">Fat (g)</label>
              <input
                type="number"
                value={newFood.fat}
                onChange={e => setNewFood({...newFood, fat: e.target.value})}
                className="input"
                placeholder="0"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            Tạo thực phẩm
          </button>
        </form>
      ) : (
        <div className="space-y-5">
          {/* Food Search */}
          <div className="relative">
            <label className="label">Tìm thực phẩm</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  if (!e.target.value) setSelectedFood(null);
                }}
                onFocus={() => setShowDropdown(true)}
                className="input pl-10"
                placeholder="Tìm kiếm..."
              />
            </div>
            
            {/* Dropdown */}
            {showDropdown && searchQuery && filteredFoods.length > 0 && (
              <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-auto no-scrollbar">
                {filteredFoods.map(food => (
                  <div
                    key={food.id}
                    onClick={() => handleSelectFood(food)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0 cursor-pointer flex justify-between items-center group"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {food.name}
                        {food.isCustom && <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Tùy chỉnh</span>}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {food.calories} kcal • P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                      </p>
                    </div>
                    {food.isCustom && (
                      <button 
                        onClick={(e) => handleDeleteFood(e, food.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Grams Input */}
          <div>
            <label className="label">Số gram</label>
            <input
              type="number"
              value={grams}
              onChange={(e) => {
                setGrams(e.target.value);
                setError('');
              }}
              className={`input ${error ? 'border-danger-500' : ''}`}
              placeholder="100"
            />
            {error && <p className="text-sm text-danger-500 mt-2">⚠️ {error}</p>}
          </div>

          {/* Preview */}
          {selectedFood && grams && !error && (
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30">
              <p className="text-sm font-semibold mb-3 text-primary-900 dark:text-primary-100">Dinh dưỡng ({grams}g):</p>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Kcal</p>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{Math.round(selectedFood.calories * Number(grams) / 100)}</p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <p className="text-blue-500 mb-1">Pro</p>
                  <p className="font-bold text-gray-900 dark:text-white">{(selectedFood.protein * Number(grams) / 100).toFixed(1)}</p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <p className="text-green-500 mb-1">Carb</p>
                  <p className="font-bold text-gray-900 dark:text-white">{(selectedFood.carbs * Number(grams) / 100).toFixed(1)}</p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <p className="text-yellow-500 mb-1">Fat</p>
                  <p className="font-bold text-gray-900 dark:text-white">{(selectedFood.fat * Number(grams) / 100).toFixed(1)}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            className="btn btn-primary w-full"
            disabled={!selectedFood || !grams}
          >
            <Plus className="w-5 h-5" />
            Thêm vào bữa ăn
          </button>
        </div>
      )}
    </div>
  );
};
