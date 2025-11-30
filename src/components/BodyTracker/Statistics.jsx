import { TrendingDown, Target, Activity, Calendar } from 'lucide-react';

export const Statistics = ({ stats, targetWeight }) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  const sorted = [...stats].sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstEntry = sorted[0];
  const lastEntry = sorted[sorted.length - 1];
  
  const startWeight = firstEntry.weight;
  const currentWeight = lastEntry.weight;
  const change = currentWeight - startWeight;
  
  // Calculate average change per week
  const daysDiff = (new Date(lastEntry.date) - new Date(firstEntry.date)) / (1000 * 60 * 60 * 24);
  const weeks = daysDiff / 7;
  const avgPerWeek = weeks > 0 ? change / weeks : 0;
  
  // Calculate days to goal
  const remaining = currentWeight - targetWeight;
  const daysToGoal = avgPerWeek < 0 ? Math.abs(remaining / avgPerWeek) * 7 : null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Total Change */}
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-purple-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Thay đổi</p>
        </div>
        <p className={`text-2xl font-bold ${change < 0 ? 'text-success' : 'text-danger'}`}>
          {change > 0 ? '+' : ''}{change.toFixed(1)} kg
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Từ {startWeight.toFixed(1)} kg
        </p>
      </div>

      {/* Current Weight */}
      <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-4 h-4 text-blue-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Hiện tại</p>
        </div>
        <p className="text-2xl font-bold text-blue-600">
          {currentWeight.toFixed(1)} kg
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(lastEntry.date).toLocaleDateString('vi-VN')}
        </p>
      </div>

      {/* Average Per Week */}
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-green-600" />
          <p className="text-sm text-gray-600 dark:text-gray-400">TB/tuần</p>
        </div>
        <p className={`text-2xl font-bold ${avgPerWeek < 0 ? 'text-success' : 'text-warning'}`}>
          {avgPerWeek > 0 ? '+' : ''}{avgPerWeek.toFixed(2)} kg
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {weeks.toFixed(1)} tuần
        </p>
      </div>

      {/* Goal Progress */}
      {targetWeight && (
        <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-orange-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Còn lại</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {Math.abs(remaining).toFixed(1)} kg
          </p>
          {daysToGoal && avgPerWeek < 0 && (
            <p className="text-xs text-gray-500 mt-1">
              ~{Math.ceil(daysToGoal)} ngày nữa
            </p>
          )}
        </div>
      )}
    </div>
  );
};
