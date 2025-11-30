import { useState } from 'react';
import { Plus, Scale } from 'lucide-react';
import { useBodyStats } from '../../hooks/useBodyStats';
import { validateWeight, validateDate } from '../../utils/validation';

export const WeightEntryForm = () => {
  const { addStat } = useBodyStats();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: '',
    waist: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    const dateError = validateDate(formData.date);
    if (dateError) newErrors.date = dateError;
    
    const weightError = validateWeight(formData.weight);
    if (weightError) newErrors.weight = weightError;
    
    if (formData.bodyFat && (formData.bodyFat < 1 || formData.bodyFat > 50)) {
      newErrors.bodyFat = '% mỡ phải từ 1-50%';
    }
    
    if (formData.waist && (formData.waist < 40 || formData.waist > 200)) {
      newErrors.waist = 'Vòng eo phải từ 40-200cm';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      addStat({
        date: formData.date,
        weight: Number(formData.weight),
        bodyFat: formData.bodyFat ? Number(formData.bodyFat) : null,
        waist: formData.waist ? Number(formData.waist) : null,
        notes: formData.notes
      });
      
      // Reset form and collapse
      setFormData({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        bodyFat: '',
        waist: '',
        notes: ''
      });
      setIsExpanded(false);
    }
  };

  return (
    <div className="card transition-all duration-300">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl">
            <Scale className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chỉ số hôm nay</h3>
        </div>
        <button className={`btn btn-ghost btn-sm rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 animate-slideDown">
          {/* Date */}
          <div>
            <label className="label">
              Ngày <span className="text-danger-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={`input ${errors.date ? 'border-danger-500' : ''}`}
            />
            {errors.date && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.date}</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="label">
              Cân nặng (kg) <span className="text-danger-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              className={`input ${errors.weight ? 'border-danger-500' : ''}`}
              placeholder="70.5"
              autoFocus
            />
            {errors.weight && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.weight}</p>}
          </div>

          {/* Body Fat % */}
          <div>
            <label className="label">% Mỡ cơ thể (tùy chọn)</label>
            <input
              type="number"
              step="0.1"
              value={formData.bodyFat}
              onChange={(e) => setFormData(prev => ({ ...prev, bodyFat: e.target.value }))}
              className={`input ${errors.bodyFat ? 'border-danger-500' : ''}`}
              placeholder="20.5"
            />
            {errors.bodyFat && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.bodyFat}</p>}
          </div>

          {/* Waist */}
          <div>
            <label className="label">Vòng eo (cm) (tùy chọn)</label>
            <input
              type="number"
              step="0.1"
              value={formData.waist}
              onChange={(e) => setFormData(prev => ({ ...prev, waist: e.target.value }))}
              className={`input ${errors.waist ? 'border-danger-500' : ''}`}
              placeholder="80"
            />
            {errors.waist && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.waist}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="label">Ghi chú (tùy chọn)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="input resize-none"
              rows="2"
              placeholder="Cảm giác hôm nay..."
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            <Plus className="w-5 h-5 mr-2" />
            Lưu chỉ số
          </button>
        </form>
      )}
    </div>
  );
};
