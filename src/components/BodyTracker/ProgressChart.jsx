import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';

export const ProgressChart = ({ stats }) => {
  if (!stats || stats.length === 0) {
    return (
      <div className="card bg-gray-50 dark:bg-gray-800/50">
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <TrendingDown className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Chưa có dữ liệu</p>
          <p className="text-sm mt-1">Thêm số liệu đầu tiên để xem biểu đồ</p>
        </div>
      </div>
    );
  }

  // Sort stats by date
  const sortedStats = [...stats].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Format data for chart
  const chartData = sortedStats.map(stat => ({
    date: new Date(stat.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }),
    weight: stat.weight,
    fullDate: stat.date
  }));

  // Determine trend
  const firstWeight = sortedStats[0].weight;
  const lastWeight = sortedStats[sortedStats.length - 1].weight;
  const change = lastWeight - firstWeight;
  const isDecreasing = change < 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">{payload[0].payload.fullDate}</p>
          <p className="font-semibold text-primary-500">{payload[0].value.toFixed(1)} kg</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Tiến độ</h3>
        <div className={`flex items-center gap-1 text-sm font-medium ${isDecreasing ? 'text-success' : 'text-danger'}`}>
          {isDecreasing ? (
            <>
              <TrendingDown className="w-4 h-4" />
              <span>{Math.abs(change).toFixed(1)} kg</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4" />
              <span>+{change.toFixed(1)} kg</span>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" vertical={false} />
            <XAxis 
              dataKey="date" 
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
              tickMargin={15}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={['dataMin - 2', 'dataMax + 2']}
              className="text-xs text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke={isDecreasing ? '#10B981' : '#EF4444'}
              strokeWidth={3}
              dot={{ fill: isDecreasing ? '#10B981' : '#EF4444', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
