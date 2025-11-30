import { useState, useEffect } from 'react';
import { validateHeight, validateWeight, validateAge, validateRequired } from '../../utils/validation';
import { Save, User as UserIcon, Edit2, X } from 'lucide-react';

export const ProfileForm = ({ profile: initialProfile, onSave }) => {
  // Local state for form editing
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    currentWeight: '',
    targetWeight: '',
    activityLevel: 'sedentary'
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Sync with props when not editing or on initial load
  useEffect(() => {
    if (initialProfile && !isEditing) {
      setFormData(prev => ({ ...prev, ...initialProfile }));
    }
  }, [initialProfile, isEditing]);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return validateRequired(value, 'Tên');
      case 'age':
        return validateAge(value);
      case 'height':
        return validateHeight(value);
      case 'currentWeight':
        return validateWeight(value);
      case 'targetWeight':
        return validateWeight(value);
      default:
        return null;
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleBlur = (field) => {
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    const fieldsToValidate = ['name', 'age', 'height', 'currentWeight', 'targetWeight'];
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (onSave) onSave(formData);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="card space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-2xl">
              <UserIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{formData.name || 'Chưa cập nhật tên'}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formData.age ? `${formData.age} tuổi` : '-- tuổi'} • {formData.gender === 'male' ? 'Nam' : 'Nữ'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary !p-2.5 rounded-xl"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Chiều cao</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.height || '--'} <span className="text-xs font-normal text-gray-500">cm</span></p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800/30 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cân nặng</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.currentWeight || '--'} <span className="text-xs font-normal text-gray-500">kg</span></p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800/30 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mục tiêu</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.targetWeight || '--'} <span className="text-xs font-normal text-gray-500">kg</span></p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Mức độ vận động</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formData.activityLevel === 'sedentary' && 'Ít vận động (văn phòng)'}
            {formData.activityLevel === 'lightly_active' && 'Nhẹ (tập 1-2 ngày/tuần)'}
            {formData.activityLevel === 'moderately_active' && 'Trung bình (tập 3-5 ngày/tuần)'}
            {formData.activityLevel === 'very_active' && 'Cao (tập 6-7 ngày/tuần)'}
            {formData.activityLevel === 'extremely_active' && 'Rất cao (vận động viên)'}
            {!formData.activityLevel && 'Chưa chọn'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chỉnh sửa hồ sơ</h2>
        <button 
          type="button"
          onClick={() => setIsEditing(false)}
          className="btn btn-ghost !p-2 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Name */}
      <div>
        <label className="label">
          Họ tên <span className="text-danger-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`input ${errors.name ? 'border-danger-500' : ''}`}
          placeholder="Nhập họ tên"
        />
        {errors.name && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.name}</p>}
      </div>

      {/* Age & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            Tuổi <span className="text-danger-500">*</span>
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            onBlur={() => handleBlur('age')}
            className={`input ${errors.age ? 'border-danger-500' : ''}`}
            placeholder="25"
          />
          {errors.age && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.age}</p>}
        </div>

        <div>
          <label className="label">Giới tính</label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="input"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="label">
          Chiều cao (cm) <span className="text-danger-500">*</span>
        </label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => handleChange('height', e.target.value)}
          onBlur={() => handleBlur('height')}
          className={`input ${errors.height ? 'border-danger-500' : ''}`}
          placeholder="170"
        />
        {errors.height && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.height}</p>}
      </div>

      {/* Weights */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            Cân nặng (kg) <span className="text-danger-500">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.currentWeight}
            onChange={(e) => handleChange('currentWeight', e.target.value)}
            onBlur={() => handleBlur('currentWeight')}
            className={`input ${errors.currentWeight ? 'border-danger-500' : ''}`}
            placeholder="70"
          />
          {errors.currentWeight && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.currentWeight}</p>}
        </div>

        <div>
          <label className="label">
            Mục tiêu (kg) <span className="text-danger-500">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.targetWeight}
            onChange={(e) => handleChange('targetWeight', e.target.value)}
            onBlur={() => handleBlur('targetWeight')}
            className={`input ${errors.targetWeight ? 'border-danger-500' : ''}`}
            placeholder="65"
          />
          {errors.targetWeight && <p className="text-sm text-danger-500 mt-2">⚠️ {errors.targetWeight}</p>}
        </div>
      </div>

      {/* Activity Level */}
      <div>
        <label className="label">Mức độ vận động</label>
        <select
          value={formData.activityLevel}
          onChange={(e) => handleChange('activityLevel', e.target.value)}
          className="input"
        >
          <option value="sedentary">Ít vận động (văn phòng)</option>
          <option value="lightly_active">Nhẹ (tập 1-2 ngày/tuần)</option>
          <option value="moderately_active">Trung bình (tập 3-5 ngày/tuần)</option>
          <option value="very_active">Cao (tập 6-7 ngày/tuần)</option>
          <option value="extremely_active">Rất cao (vận động viên)</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        <Save className="w-5 h-5" />
        Lưu thay đổi
      </button>
    </form>
  );
};
