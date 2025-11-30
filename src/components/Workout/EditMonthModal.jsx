import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { createPortal } from 'react-dom';

export const EditMonthModal = ({ isOpen, onClose, monthData, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ name: '', description: '', startDate: '' });

  useEffect(() => {
    if (monthData) {
      setFormData({
        name: monthData.name || '',
        description: monthData.description || '',
        startDate: monthData.startDate || new Date().toISOString().split('T')[0]
      });
    }
  }, [monthData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate month and year from startDate
    const date = new Date(formData.startDate);
    const updates = {
      ...formData,
      month: date.getMonth(),
      year: date.getFullYear()
    };
    
    onSave(updates);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Chỉnh sửa thông tin tháng</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="label">Tên tháng / Giai đoạn</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="input"
              placeholder="Ví dụ: THÁNG 1 - NEWBIE"
            />
          </div>
          
          <div>
            <label className="label">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="input resize-none"
              rows="3"
              placeholder="Mô tả mục tiêu của giai đoạn này..."
            />
          </div>

          <div>
            <label className="label">Ngày bắt đầu</label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              className="input"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Chọn ngày bắt đầu để tự động điều hướng theo lịch
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            {onDelete && (
              <button 
                type="button" 
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="btn btn-ghost text-danger hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Xóa
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose}
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
  );
};
