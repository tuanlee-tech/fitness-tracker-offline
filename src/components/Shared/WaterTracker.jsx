import { Droplet } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const WaterTracker = () => {
  const [waterLog, setWaterLog] = useLocalStorage('waterLog', {});
  const today = new Date().toISOString().split('T')[0];
  const todayWater = waterLog[today] || 0;
  const goal = 2500; // 2.5L in ml

  const addWater = (amount) => {
    setWaterLog(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + amount
    }));
  };

  const resetToday = () => {
    setWaterLog(prev => ({
      ...prev,
      [today]: 0
    }));
  };

  const percentage = Math.min((todayWater / goal) * 100, 100);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Uống nước hôm nay</h3>
        </div>
        <button
          onClick={resetToday}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            {todayWater}ml / {goal}ml
          </span>
          <span className="font-medium text-primary-500">
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => addWater(250)}
          className="btn btn-secondary text-sm py-2"
        >
          +250ml
        </button>
        <button
          onClick={() => addWater(500)}
          className="btn btn-secondary text-sm py-2"
        >
          +500ml
        </button>
        <button
          onClick={() => addWater(1000)}
          className="btn btn-secondary text-sm py-2"
        >
          +1L
        </button>
      </div>

      {percentage >= 100 && (
        <div className="mt-4 p-3 bg-success/10 border border-success rounded-lg">
          <p className="text-sm text-success text-center font-medium">
            🎉 Đã hoàn thành mục tiêu hôm nay!
          </p>
        </div>
      )}
    </div>
  );
};
