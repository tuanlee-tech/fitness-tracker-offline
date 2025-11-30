// src/components/Workout/NoWorkoutInfo.js
const NoWorkoutInfo = () => {
  return (
    <div className="flex justify-center items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Chưa có lịch trình tập luyện
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Hãy bắt đầu thiết kế chương trình tập luyện của bạn! 
        </p>
      </div>
    </div>
  );
};
export default NoWorkoutInfo;
