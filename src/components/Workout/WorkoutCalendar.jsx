import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWorkoutData } from '../../hooks/useWorkoutData';
import { Calendar, ChevronLeft, ChevronRight, Check, Edit2, RotateCcw, Plus, Trash2, MoreVertical, Settings } from 'lucide-react';
import { DAYS_OF_WEEK, DAY_LABELS } from '../../data/workoutData';
import { Modal } from '../Shared/Modal';
import { EditWorkoutModal } from './EditWorkoutModal';
import { EditMonthModal } from './EditMonthModal';
import { Toast } from '../Shared/Toast';
import { ConfirmDialog } from '../Shared/ConfirmDialog';
import NoWorkoutInfo from './NoWorkoutInfo';

export const WorkoutCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [editingDay, setEditingDay] = useState(null);
  const [isEditMonthOpen, setIsEditMonthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [completedWorkouts, setCompletedWorkouts] = useLocalStorage('completedWorkouts', {});
  const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
  };
  
  const { program, updateWorkout, updateMonth, addMonth, deleteMonth, addWeek, deleteWeek, resetToDefault, getCurrentMonthKey, getCurrentWeekNumber } = useWorkoutData();

  // Auto-navigate to current week on mount
  useEffect(() => {
    const currentWeek = getCurrentWeekNumber();
    if (currentWeek) {
      setCurrentWeek(currentWeek);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find current month based on current week
  const currentMonthKey = Object.keys(program).find(key => 
    program[key].weeks.some(w => w.week === currentWeek)
  ) || 'month1';

  const monthData = program[currentMonthKey];
  const weekData = monthData?.weeks?.find(w => w.week === currentWeek);

  // Calculate total weeks available
  const allWeeks = Object.values(program).flatMap(m => m.weeks.map(w => w.week));
  const maxWeek = Math.max(...allWeeks);
  const minWeek = Math.min(...allWeeks);

  const toggleComplete = (day) => {
    const key = `${currentMonthKey}-${currentWeek}-${day}`;
    setCompletedWorkouts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isCompleted = (day) => {
    const key = `${currentMonthKey}-${currentWeek}-${day}`;
    return completedWorkouts[key] || false;
  };

  const getCompletionPercentage = () => {
    let total = 0;
    let completed = 0;
    
    DAYS_OF_WEEK.forEach(day => {
      const workout = weekData?.schedule[day];
      if (workout && !workout.rest) {
        total++;
        if (isCompleted(day)) completed++;
      }
    });
    
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const handleSaveWorkout = (updatedWorkout) => {
    if (editingDay) {
      updateWorkout(currentMonthKey, currentWeek, editingDay.day, updatedWorkout);
      setEditingDay(null);
      if (selectedDay && selectedDay.day === editingDay.day) {
        setSelectedDay({ ...selectedDay, workout: updatedWorkout });
      }
    }
  };

  const handleSaveMonth = (updates) => {
    updateMonth(currentMonthKey, updates);
  };

  const handleAddMonth = () => {
    const { startWeek } = addMonth();
    setCurrentWeek(startWeek);
    showToast('Đã thêm tháng mới thành công!', 'success');
    setIsMenuOpen(false);
  };

  const handleDeleteMonth = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Xóa tháng',
      message: 'Bạn có chắc chắn muốn xóa tháng này không? Mọi dữ liệu sẽ bị mất.',
      onConfirm: () => {
        deleteMonth(currentMonthKey);
        setCurrentWeek(prev => prev - 1 || 1);
        setIsEditMonthOpen(false);
        showToast('Đã xóa tháng thành công', 'success');
      }
    });
  };

  const handleResetProgram = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Khôi phục mặc định',
      message: 'Bạn có chắc chắn muốn khôi phục lịch tập mặc định? Mọi chỉnh sửa sẽ bị mất.',
      onConfirm: () => {
        resetToDefault((reset) => {
          reset();
          setCurrentWeek(1);
          showToast('Đã khôi phục lịch tập mặc định', 'success');
        });
      }
    });
  };

  const handleAddWeek = () => {
    const newWeek = addWeek(currentMonthKey);
    setCurrentWeek(newWeek);
    showToast('Đã thêm tuần mới thành công!', 'success');
    setIsMenuOpen(false);
  };

  return (
    <div className="space-y-4">
      {!currentWeek ? (
        <NoWorkoutInfo /> // Sử dụng component NoWorkoutInfo
      ) : (
      <>
      {/* Header */}
      <div className="card group relative z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="pr-8">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {monthData?.name}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {monthData?.description}
            </p>
            {monthData?.startDate && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                📅 Tháng {(monthData.month + 1)}/{monthData.year} • Bắt đầu: {new Date(monthData.startDate).toLocaleDateString('vi-VN')}
              </p>
            )}
          </div>
          
          <div className="flex gap-2 relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
              title="Quản lý lịch tập"
            >
              <Settings className="w-6 h-6" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-scaleIn origin-top-right">
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => { setIsEditMonthOpen(true); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                    Sửa thông tin tháng
                  </button>
                  <button 
                    onClick={handleAddWeek}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm tuần mới
                  </button>
                 
                  {Object.keys(program).length > 1 && (
                    <>
                      <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                      <button 
                        onClick={handleDeleteMonth}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa tháng này
                      </button>
                    </>
                  )}
                  <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                  <button 
                    onClick={handleResetProgram}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Khôi phục mặc định
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentWeek(Math.max(minWeek, currentWeek - 1))}
            disabled={currentWeek === minWeek}
            className="btn btn-secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <p className="font-semibold">Tuần {currentWeek}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(getCompletionPercentage())}% hoàn thành
            </p>
          </div>
          
          <button
            onClick={() => setCurrentWeek(Math.min(maxWeek, currentWeek + 1))}
            disabled={currentWeek === maxWeek}
            className="btn btn-secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
      </div>

      {/* Workout Days */}
      <div key={currentWeek} className="grid grid-cols-1 gap-3 pb-20 animate-fadeIn">
        {DAYS_OF_WEEK.map(day => {
          const workout = weekData?.schedule[day];
          const completed = isCompleted(day);
          
          // If no workout defined for this day, show empty slot with add button
          if (!workout) {
             return (
              <div key={day} className="card border-dashed border-2 border-gray-200 dark:border-gray-700 bg-transparent hover:border-primary-300 transition-colors flex items-center justify-center p-4">
                <button 
                  onClick={() => setEditingDay({ day, workout: { name: 'Bài tập mới', duration: '', exercises: [] } })}
                  className="flex items-center gap-2 text-gray-500 hover:text-primary-500"
                >
                  <Plus className="w-5 h-5" />
                  <span>Thêm bài tập cho {DAY_LABELS[day]}</span>
                </button>
              </div>
             );
          }

          return (
            <div
              key={day}
              className={`card cursor-pointer transition-all group relative ${
                completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                  : workout.rest
                  ? 'bg-gray-50 dark:bg-gray-800/50'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => !workout.rest && setSelectedDay({ day, workout })}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {DAY_LABELS[day]}
                    </span>
                    {completed && (
                      <Check className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {workout.name}
                  </h3>
                  {workout.duration && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ⏱️ {workout.duration}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingDay({ day, workout });
                    }}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {!workout.rest && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(day);
                      }}
                      className={`btn touch-target ${
                        completed ? 'btn-primary' : 'btn-secondary'
                      }`}
                    >
                      {completed ? 'Đã xong' : 'Hoàn thành'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workout Detail Modal */}
      {selectedDay && (
        <Modal
          isOpen={!!selectedDay}
          onClose={() => setSelectedDay(null)}
          title={`${DAY_LABELS[selectedDay.day]} - ${selectedDay.workout.name}`}
          size="lg"
        >
          <div className="space-y-4">
            {/* Duration */}
            {selectedDay.workout.duration && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">⏱️ Thời gian</p>
                  <p className="font-semibold">{selectedDay.workout.duration}</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingDay(selectedDay);
                    setSelectedDay(null);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Sửa
                </button>
              </div>
            )}

            {/* Warnings */}
            {selectedDay.workout.warnings && selectedDay.workout.warnings.length > 0 && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-danger rounded">
                <p className="font-semibold text-danger mb-2">⚠️ Lưu ý quan trọng:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {selectedDay.workout.warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exercises */}
            <div>
              <h4 className="font-semibold mb-3">Bài tập:</h4>
              <div className="space-y-3">
                {selectedDay.workout.exercises?.map((exercise, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {i + 1}. {exercise.name}
                      </h5>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Sets:</span>
                        <span className="ml-1 font-medium">{exercise.sets}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Reps:</span>
                        <span className="ml-1 font-medium">{exercise.reps}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Nghỉ:</span>
                        <span className="ml-1 font-medium">{exercise.rest}</span>
                      </div>
                    </div>
                    {exercise.notes && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 italic flex gap-2">
                          <span>💡</span>
                          <span>{exercise.notes}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Button */}
            <button
              onClick={() => {
                toggleComplete(selectedDay.day);
                setSelectedDay(null);
              }}
              className="btn btn-primary w-full"
            >
              <Check className="w-4 h-4 mr-2" />
              Đánh dấu hoàn thành
            </button>
          </div>
        </Modal>
      )}
      </>
      )}

      {/* Floating Action Button for Add Month */}
      <button
        onClick={handleAddMonth}
        className="fixed bottom-32 right-6 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-30 flex items-center gap-0 hover:gap-2 group animate-scaleIn"
        title="Thêm tháng mới"
      >
        <Plus className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium">
          Thêm tháng mới
        </span>
      </button>

      {/* Edit Workout Modal */}
      <EditWorkoutModal
        isOpen={!!editingDay}
        onClose={() => setEditingDay(null)}
        workout={editingDay?.workout}
        onSave={handleSaveWorkout}
      />

      {/* Edit Month Modal */}
      <EditMonthModal
        isOpen={isEditMonthOpen}
        onClose={() => setIsEditMonthOpen(false)}
        monthData={monthData}
        onSave={handleSaveMonth}
        onDelete={Object.keys(program).length > 1 ? handleDeleteMonth : undefined}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </div>
  );
};
