import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, ChefHat, AlertCircle, SaveIcon, ListPlus } from 'lucide-react';
import { useFoodDatabase } from '../../hooks/useFoodDatabase';

export const CreateFoodModal = ({ isOpen, onClose }) => {
  const { addFood: addNewFoodToDb, searchFoods } = useFoodDatabase();
  
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (newFood.name.trim().length > 1) {
      const results = searchFoods(newFood.name);
      // Filter out exact match if needed, or just show all similar
      setSuggestions(results.slice(0, 3)); // Show top 3 suggestions
    } else {
      setSuggestions([]);
    }
  }, [newFood.name]);

  if (!isOpen) return null;

  const handleCreateFood = (e) => {
    e.preventDefault();
    if (!newFood.name || !newFood.calories) return;

    addNewFoodToDb({
      name: newFood.name,
      calories: Number(newFood.calories),
      protein: Number(newFood.protein) || 0,
      carbs: Number(newFood.carbs) || 0,
      fat: Number(newFood.fat) || 0
    });

    setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '' });
    setSuggestions([]);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-t-3xl sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <ListPlus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
             Thêm món mới
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm p-1 rounded-full">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleCreateFood} className="space-y-4">
            <div className="relative">
              <label className="label">Tên thực phẩm</label>
              <input
                type="text"
                required
                value={newFood.name}
                onChange={e => setNewFood({...newFood, name: e.target.value})}
                className="input"
                placeholder="Ví dụ: Cá hồi phi lê"
                autoFocus
              />
              
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800/30">
                  <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 flex items-center gap-1 mb-2">
                    <AlertCircle className="w-3 h-3" />
                    Có thể bạn đang tìm:
                  </p>
                  <div className="space-y-2">
                    {suggestions.map(food => (
                      <div key={food.id} className="text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                        <span>{food.name}</span>
                        <span className="text-xs text-gray-400">{food.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
            <button type="submit" className="btn btn-primary w-full mt-4 py-3">
              <SaveIcon className="w-4 h-4 mr-2" />
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};
