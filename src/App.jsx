import { useEffect, useState } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { TabNavigation } from './components/Layout/TabNavigation';
import { ProfileForm } from './components/Profile/ProfileForm';
import { BMICalculator } from './components/Profile/BMICalculator';
import { TDEECalculator } from './components/Profile/TDEECalculator';
import { WorkoutCalendar } from './components/Workout/WorkoutCalendar';
import { WeightEntryForm } from './components/BodyTracker/WeightEntryForm';
import { ProgressChart } from './components/BodyTracker/ProgressChart';
import { Statistics } from './components/BodyTracker/Statistics';
import { Timeline } from './components/BodyTracker/Timeline';
import { AddFoodModal } from './components/MealPlanner/AddFoodModal';
import { CreateFoodModal } from './components/MealPlanner/CreateFoodModal';
import { DailyMealPlan } from './components/MealPlanner/DailyMealPlan';
import { MacroProgress } from './components/MealPlanner/MacroProgress';
import { WaterTracker } from './components/Shared/WaterTracker';
import { DataExport } from './components/Shared/DataExport';
import { Toast } from './components/Shared/Toast';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useBodyStats } from './hooks/useBodyStats';
import { useFoodDatabase } from './hooks/useFoodDatabase';
import { calculateTDEE, calculateBMR, calculateCalorieDeficit, calculateMacros } from './utils/calculations';
import { ChefHat, ListPlus, PlusCircleIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useLocalStorage('userProfile', {});
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyMeals, setDailyMeals] = useLocalStorage(`meals-${currentDate}`, []);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isCreateFoodModalOpen, setIsCreateFoodModalOpen] = useState(false);
  
  const { stats } = useBodyStats();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleProfileSave = () => {
    showToast('Đã lưu thông tin cá nhân!');
  };

  // Food Database Hook
  const { searchFoods, addFood: addNewFoodToDb, deleteFood: deleteFoodFromDb } = useFoodDatabase();

  // Goal Settings State
  const [goalSettings, setGoalSettings] = useLocalStorage('goalSettings', {
    isAuto: true,
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65
  });

  // Auto-calculate goals when profile changes if isAuto is true
  useEffect(() => {
    if (goalSettings.isAuto && profile.currentWeight && profile.height && profile.age) {
      const bmr = calculateBMR(profile.currentWeight, profile.height, profile.age, profile.gender);
      const tdee = calculateTDEE(bmr, profile.activityLevel);
      const targetCalories = calculateCalorieDeficit(tdee, 500);
      const macros = calculateMacros(targetCalories, profile.currentWeight);

      setGoalSettings(prev => ({
        ...prev,
        calories: Math.round(targetCalories),
        protein: Math.round(macros.protein),
        carbs: Math.round(macros.carbs),
        fat: Math.round(macros.fat)
      }));
    }
  }, [profile, goalSettings.isAuto]);

  // Meal Planner functions
  const handleAddFood = (food) => {
    setDailyMeals(prev => [...prev, { ...food, type: selectedMealType }]);
    showToast(`Đã thêm ${food.name}!`);
  };

  const handleRemoveFood = (mealType, index) => {
    setDailyMeals(prev => {
      const typeMeals = prev.filter(m => m.type === mealType);
      const foodToRemove = typeMeals[index];
      return prev.filter(m => m !== foodToRemove);
    });
  };

  const handleClearMeal = (mealType) => {
    setDailyMeals(prev => prev.filter(m => m.type !== mealType));
    showToast('Đã xóa bữa ăn!', 'info');
  };

  const calculateConsumed = () => {
    return dailyMeals.reduce((total, food) => ({
      calories: total.calories + food.totalCalories,
      protein: total.protein + food.totalProtein,
      carbs: total.carbs + food.totalCarbs,
      fat: total.fat + food.totalFat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // Handle cascading updates when food database changes
  const handleFoodUpdate = (updatedFood) => {
    setDailyMeals(prev => prev.map(meal => {
      if (meal.id === updatedFood.id) {
        // Recalculate totals based on the existing grams and new nutrition info
        const multiplier = meal.grams / 100;
        return {
          ...meal,
          ...updatedFood, // Update name and base nutrition
          totalCalories: updatedFood.calories * multiplier,
          totalProtein: updatedFood.protein * multiplier,
          totalCarbs: updatedFood.carbs * multiplier,
          totalFat: updatedFood.fat * multiplier
        };
      }
      return meal;
    }));
    showToast('Đã cập nhật thông tin món ăn trong thực đơn!');
  };

  const handleFoodDelete = (foodId) => {
    setDailyMeals(prev => prev.filter(meal => meal.id !== foodId));
    showToast('Đã xóa món ăn khỏi thực đơn và cơ sở dữ liệu!');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen mesh-bg dark:mesh-bg-dark transition-colors duration-500 pb-32">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 py-6 relative z-10">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <ProfileForm 
                    profile={profile} 
                    onSave={(updatedProfile) => {
                      setProfile(updatedProfile);
                      handleProfileSave();
                    }} 
                  />
                </div>
                <div className="space-y-6">
                  <BMICalculator 
                    weight={profile.currentWeight} 
                    height={profile.height} 
                  />
                  <WaterTracker />
                </div>
              </div>
              <TDEECalculator profile={profile} />
              <DataExport />
            </div>
          )}

          {/* Workout Tab */}
          {activeTab === 'workout' && (
            <WorkoutCalendar />
          )}

          {/* Body Tracker Tab */}
          {activeTab === 'tracker' && (
            <div className="space-y-6">
              <Statistics 
                stats={stats} 
                targetWeight={profile.targetWeight} 
              />
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <WeightEntryForm />
                  <Timeline />
                </div>
                <ProgressChart stats={stats} />
              </div>
            </div>
          )}

          {/* Meal Planner Tab */}
          {activeTab === 'meal' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Thực đơn</h2>
                <button 
                  onClick={() => setIsCreateFoodModalOpen(true)}
                  className="btn btn-secondary btn-sm"
                >
                  <ListPlus className="w-4 h-4 mr-1" />
                  Thực phẩm
                </button>
              </div>

              <MacroProgress 
                consumed={calculateConsumed()} 
                target={goalSettings.calories}
                goalSettings={goalSettings}
                onUpdateGoals={setGoalSettings}
              />
              
              <DailyMealPlan 
                meals={dailyMeals}
                onRemoveFood={handleRemoveFood}
                onClearMeal={handleClearMeal}
                onAddFoodClick={(type) => {
                  setSelectedMealType(type);
                  setIsAddFoodModalOpen(true);
                }}
              />

            </div>
          )}
        </main>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Modals - Rendered at root level to ensure proper z-index overlay */}
        <AddFoodModal 
          isOpen={isAddFoodModalOpen}
          onClose={() => setIsAddFoodModalOpen(false)}
          mealType={selectedMealType}
          onAddFood={handleAddFood}
          onFoodUpdate={handleFoodUpdate}
          onFoodDelete={handleFoodDelete}
        />

        <CreateFoodModal
          isOpen={isCreateFoodModalOpen}
          onClose={() => setIsCreateFoodModalOpen(false)}
        />
        
        <Toast 
          message={toast.message}
          type={toast.type}
          isVisible={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
