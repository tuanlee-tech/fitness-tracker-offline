import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, Plus, X, Trash2, Edit2, Save, AlertTriangle } from 'lucide-react';
import { useFoodDatabase } from '../../hooks/useFoodDatabase';
import { validateGrams } from '../../utils/validation';

const SwipeableFoodItem = ({ food, isSelected, onSelect, onEdit, onDelete }) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      // If scrolled more than 10px, consider it swiped
      setIsSwiped(scrollRef.current.scrollLeft > 10);
    }
  };

  return (
    <div className={`
      relative rounded-xl overflow-hidden group border transition-all
      ${isSelected 
        ? 'border-primary-500 ring-1 ring-primary-500' 
        : 'border-transparent'
      }
    `}>
      {/* Swipe Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar" 
        style={{ scrollbarWidth: 'none' }}
      >
        
        {/* Main Content */}
        <div 
          className="min-w-full snap-start bg-gray-50 dark:bg-gray-800 p-3 cursor-pointer relative"
          onClick={() => onSelect(food)}
        >
          <div className="pr-16">
            <p className="font-semibold text-gray-900 dark:text-white">
              {food.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {food.calories} kcal • P: {food.protein} • C: {food.carbs} • F: {food.fat}
            </p>
          </div>
          
          {/* Quick Actions (Hover/Focus) - Hidden if swiped */}
          <div className={`
            absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 
            transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-lg shadow-sm
            ${!isSwiped && (isSelected || 'group-hover:opacity-100 group-hover:translate-x-0') 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-2'
            }
            ${isSwiped ? 'pointer-events-none' : ''}
          `}>
            <button 
              onClick={(e) => onEdit(e, food)}
              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
              title="Sửa"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => onDelete(e, food.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Xóa"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipe Actions (Mobile) */}
        <div className="flex snap-end">
          <button 
            onClick={(e) => onEdit(e, food)}
            className="w-16 bg-blue-500 text-white flex items-center justify-center active:bg-blue-600 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => onDelete(e, food.id)}
            className="w-16 bg-red-500 text-white flex items-center justify-center active:bg-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export const AddFoodModal = ({ isOpen, onClose, mealType, onAddFood, onFoodUpdate, onFoodDelete }) => {
  const { searchFoods, deleteFood: deleteFoodFromDb, updateFood } = useFoodDatabase();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [grams, setGrams] = useState('100');
  const [error, setError] = useState('');
  
  // Edit Mode State
  const [editingFood, setEditingFood] = useState(null);

  if (!isOpen) return null;

  const filteredFoods = searchFoods(searchQuery);

  const handleSelectFood = (food) => {
    setSelectedFood(food);
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

    // Reset and close
    setSearchQuery('');
    setSelectedFood(null);
    setGrams('100');
    setError('');
    onClose();
  };

  const handleDeleteFood = (e, foodId) => {
    e.stopPropagation();
    if (confirm('Cảnh báo: Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa món này khỏi cơ sở dữ liệu?')) {
      deleteFoodFromDb(foodId);
      if (onFoodDelete) onFoodDelete(foodId); // Cascading delete
      if (selectedFood?.id === foodId) setSelectedFood(null);
    }
  };

  const handleEditClick = (e, food) => {
    e.stopPropagation();
    setEditingFood({ ...food });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingFood.name || !editingFood.calories) return;

    const updatedData = {
      name: editingFood.name,
      calories: Number(editingFood.calories),
      protein: Number(editingFood.protein) || 0,
      carbs: Number(editingFood.carbs) || 0,
      fat: Number(editingFood.fat) || 0
    };

    updateFood(editingFood.id, updatedData);
    if (onFoodUpdate) onFoodUpdate({ ...editingFood, ...updatedData }); // Cascading update

    setEditingFood(null);
  };

  const getMealLabel = (type) => {
    const labels = {
      breakfast: 'Bữa sáng',
      lunch: 'Bữa trưa',
      dinner: 'Bữa tối',
      snack: 'Bữa phụ'
    };
    return labels[type] || 'Bữa ăn';
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {editingFood ? 'Chỉnh sửa món ăn' : `Thêm vào ${getMealLabel(mealType)}`}
          </h3>
          <button onClick={() => {
            if (editingFood) setEditingFood(null);
            else onClose();
          }} className="btn btn-ghost btn-sm p-1 rounded-full">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
          
          {editingFood ? (
            /* Edit Form */
            <form onSubmit={handleSaveEdit} className="space-y-4 animate-fadeIn">
              <div>
                <label className="label">Tên món ăn</label>
                <input
                  type="text"
                  required
                  value={editingFood.name}
                  onChange={e => setEditingFood({...editingFood, name: e.target.value})}
                  className="input"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Calories (kcal)</label>
                  <input
                    type="number"
                    required
                    value={editingFood.calories}
                    onChange={e => setEditingFood({...editingFood, calories: e.target.value})}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Protein (g)</label>
                  <input
                    type="number"
                    value={editingFood.protein}
                    onChange={e => setEditingFood({...editingFood, protein: e.target.value})}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Carbs (g)</label>
                  <input
                    type="number"
                    value={editingFood.carbs}
                    onChange={e => setEditingFood({...editingFood, carbs: e.target.value})}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Fat (g)</label>
                  <input
                    type="number"
                    value={editingFood.fat}
                    onChange={e => setEditingFood({...editingFood, fat: e.target.value})}
                    className="input"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setEditingFood(null)}
                  className="btn btn-ghost flex-1"
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Lưu
                </button>
              </div>
            </form>
          ) : (
            /* Search & List */
            <>
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!e.target.value) setSelectedFood(null);
                  }}
                  className="input pl-10"
                  placeholder="Tìm món ăn..."
                  autoFocus
                />
              </div>

              {/* Search Results */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {searchQuery ? 'Kết quả tìm kiếm' : 'Danh sách món ăn'}
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {filteredFoods.map(food => (
                    <SwipeableFoodItem
                      key={food.id}
                      food={food}
                      isSelected={selectedFood?.id === food.id}
                      onSelect={handleSelectFood}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteFood}
                    />
                  ))}
                  {filteredFoods.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Không tìm thấy món nào</p>
                  )}
                </div>
              </div>

              {/* Selection Details & Add Button */}
              {selectedFood && (
                <div className="animate-slideUp space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <label className="label">Số lượng (gram)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={grams}
                        onChange={(e) => {
                          setGrams(e.target.value);
                          setError('');
                        }}
                        className={`input flex-1 ${error ? 'border-danger-500' : ''}`}
                        placeholder="100"
                      />
                      <div className="flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium text-gray-600">
                        g
                      </div>
                    </div>
                    {error && <p className="text-sm text-danger-500 mt-2">⚠️ {error}</p>}
                  </div>

                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30">
                    <p className="text-sm font-semibold mb-3 text-primary-900 dark:text-primary-100">
                      Tổng dinh dưỡng ({grams}g):
                    </p>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Kcal</p>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                          {Math.round(selectedFood.calories * Number(grams) / 100)}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <p className="text-blue-500 mb-1">Pro</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {(selectedFood.protein * Number(grams) / 100).toFixed(1)}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <p className="text-green-500 mb-1">Carb</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {(selectedFood.carbs * Number(grams) / 100).toFixed(1)}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <p className="text-yellow-500 mb-1">Fat</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {(selectedFood.fat * Number(grams) / 100).toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-primary-500/30"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm vào {getMealLabel(mealType)}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
