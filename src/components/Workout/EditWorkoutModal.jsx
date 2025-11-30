import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { createPortal } from 'react-dom';

export const EditWorkoutModal = ({ isOpen, onClose, workout, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (workout) {
      setFormData(JSON.parse(JSON.stringify(workout))); // Deep copy
    }
  }, [workout]);

  if (!isOpen || !formData) return null;

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setFormData({ ...formData, exercises: newExercises });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { name: '', sets: 3, reps: '10', rest: '60s', notes: '' }
      ]
    });
  };

  const removeExercise = (index) => {
    const newExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-scaleIn">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-10">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Chỉnh sửa bài tập</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <form id="edit-workout-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Tên buổi tập</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Ví dụ: Full Body A"
                />
              </div>
              <div>
                <label className="label">Thời gian (phút)</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  className="input"
                  placeholder="Ví dụ: 45-60 phút"
                />
              </div>
            </div>

            {/* Exercises List */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-900 dark:text-white">Danh sách bài tập</h4>
                <button type="button" onClick={addExercise} className="btn btn-secondary btn-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Thêm bài
                </button>
              </div>

              {formData.exercises.map((exercise, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 relative group">
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Xóa bài tập"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Tên bài tập</label>
                      <input
                        type="text"
                        required
                        value={exercise.name}
                        onChange={e => handleExerciseChange(index, 'name', e.target.value)}
                        className="input bg-white dark:bg-gray-800"
                        placeholder="Tên bài tập"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Sets</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={e => handleExerciseChange(index, 'sets', e.target.value)}
                          className="input bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Reps</label>
                        <input
                          type="text"
                          value={exercise.reps}
                          onChange={e => handleExerciseChange(index, 'reps', e.target.value)}
                          className="input bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Nghỉ</label>
                        <input
                          type="text"
                          value={exercise.rest}
                          onChange={e => handleExerciseChange(index, 'rest', e.target.value)}
                          className="input bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Ghi chú</label>
                      <input
                        type="text"
                        value={exercise.notes || ''}
                        onChange={e => handleExerciseChange(index, 'notes', e.target.value)}
                        className="input bg-white dark:bg-gray-800"
                        placeholder="Lưu ý kỹ thuật..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warnings */}
            <div>
              <label className="label">Lưu ý chung (mỗi dòng một ý)</label>
              <textarea
                value={formData.warnings ? formData.warnings.join('\n') : ''}
                onChange={e => setFormData({ ...formData, warnings: e.target.value.split('\n') })}
                className="input"
                rows="3"
                placeholder="Nhập các lưu ý quan trọng..."
              />
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Hủy
          </button>
          <button type="submit" form="edit-workout-form" className="btn btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
