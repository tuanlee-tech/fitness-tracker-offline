import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit2, Trash2, Calendar, Scale, X, Save } from 'lucide-react';
import { useBodyStats } from '../../hooks/useBodyStats';
import { validateWeight, validateDate } from '../../utils/validation';
import { ConfirmDialog } from '../Shared/ConfirmDialog';

export const Timeline = () => {
  const { stats, deleteStat, updateStat } = useBodyStats();
  const [editingStat, setEditingStat] = useState(null);
  const [error, setError] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Sort stats by date descending (newest first)
  const sortedStats = [...stats].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => deleteStat(id)
    });
  };

  const handleEditClick = (stat) => {
    setEditingStat({ ...stat });
    setError('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    const weightError = validateWeight(editingStat.weight);
    if (weightError) {
      setError(weightError);
      return;
    }

    updateStat(editingStat.id, {
      date: editingStat.date,
      weight: Number(editingStat.weight),
      bodyFat: editingStat.bodyFat ? Number(editingStat.bodyFat) : null,
      waist: editingStat.waist ? Number(editingStat.waist) : null,
      notes: editingStat.notes
    });

    setEditingStat(null);
  };

  if (stats.length === 0) return null;

  return (
    <div className="card transition-all duration-300">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Lịch sử nhập liệu</h3>
        </div>
        <button className={`btn btn-ghost btn-sm rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-3 mt-6 animate-slideDown">
          {sortedStats.map((stat, index) => {
            const prevStat = sortedStats[index + 1];
            const weightChange = prevStat ? (stat.weight - prevStat.weight).toFixed(1) : 0;
            const isWeightUp = weightChange > 0;

            return (
              <div key={stat.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex flex-col gap-3 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(stat.date).toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' })}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {stat.weight} <span className="text-sm font-normal text-gray-500">kg</span>
                      </span>
                      {prevStat && (
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isWeightUp ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {isWeightUp ? '+' : ''}{weightChange}
                        </span>
                      )}
                    </div>
                    {(stat.bodyFat || stat.waist) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.bodyFat && `Fat: ${stat.bodyFat}%`}
                        {stat.bodyFat && stat.waist && ' • '}
                        {stat.waist && `Eo: ${stat.waist}cm`}
                      </p>
                    )}
                    {stat.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                        "{stat.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleEditClick(stat)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(stat.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal - Portaled to body */}
      {editingStat && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Chỉnh sửa số liệu</h3>
              <button 
                onClick={() => setEditingStat(null)} 
                className="btn btn-ghost btn-sm rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-4 space-y-4">
              <div>
                <label className="label">Ngày</label>
                <input
                  type="date"
                  required
                  value={editingStat.date}
                  onChange={e => setEditingStat({...editingStat, date: e.target.value})}
                  className="input"
                />
              </div>
              
              <div>
                <label className="label">Cân nặng (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={editingStat.weight}
                  onChange={e => setEditingStat({...editingStat, weight: e.target.value})}
                  className="input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">% Mỡ</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingStat.bodyFat || ''}
                    onChange={e => setEditingStat({...editingStat, bodyFat: e.target.value})}
                    className="input"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="label">Vòng eo (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingStat.waist || ''}
                    onChange={e => setEditingStat({...editingStat, waist: e.target.value})}
                    className="input"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="label">Ghi chú</label>
                <textarea
                  value={editingStat.notes || ''}
                  onChange={e => setEditingStat({...editingStat, notes: e.target.value})}
                  className="input resize-none"
                  rows="2"
                />
              </div>

              {error && <p className="text-sm text-danger-500">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setEditingStat(null)}
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
          </div>
        </div>,
        document.body
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, onConfirm: null })}
        onConfirm={confirmDialog.onConfirm}
        title="Xóa số liệu"
        message="Bạn có chắc chắn muốn xóa số liệu này không? Hành động này không thể hoàn tác."
      />
    </div>
  );
};
