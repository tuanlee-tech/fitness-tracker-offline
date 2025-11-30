/**
 * Validation utilities with Vietnamese error messages
 */

export const validateHeight = (value) => {
    const height = Number(value);
    if (isNaN(height)) return 'Vui lòng nhập số hợp lệ';
    if (height < 100) return 'Chiều cao phải từ 100cm trở lên';
    if (height > 250) return 'Chiều cao phải dưới 250cm';
    return null;
};

export const validateWeight = (value) => {
    const weight = Number(value);
    if (isNaN(weight)) return 'Vui lòng nhập số hợp lệ';
    if (weight < 30) return 'Cân nặng phải từ 30kg trở lên';
    if (weight > 300) return 'Cân nặng phải dưới 300kg';
    return null;
};

export const validateAge = (value) => {
    const age = Number(value);
    if (isNaN(age)) return 'Vui lòng nhập số hợp lệ';
    if (age < 10) return 'Tuổi phải từ 10 trở lên';
    if (age > 100) return 'Tuổi phải dưới 100';
    return null;
};

export const validateGrams = (value) => {
    const grams = Number(value);
    if (isNaN(grams)) return 'Vui lòng nhập số hợp lệ';
    if (grams < 1) return 'Số gram phải từ 1g trở lên';
    if (grams > 5000) return 'Số gram phải dưới 5000g';
    return null;
};

export const validateRequired = (value, fieldName = 'Trường này') => {
    if (!value || value.toString().trim() === '') {
        return `${fieldName} không được để trống`;
    }
    return null;
};

export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email không được để trống';
    if (!emailRegex.test(value)) return 'Email không hợp lệ';
    return null;
};

export const validateDate = (value) => {
    if (!value) return 'Vui lòng chọn ngày';
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Ngày không hợp lệ';
    return null;
};
