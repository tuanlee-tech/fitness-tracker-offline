/**
 * Calculate Body Mass Index
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} BMI value
 */
export const calculateBMI = (weight, height) => {
    if (!weight || !height || weight <= 0 || height <= 0) return 0;
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
};

/**
 * Get BMI classification
 * @param {number} bmi - BMI value
 * @returns {object} Classification with label and color
 */
export const getBMIClassification = (bmi) => {
    if (bmi < 18.5) return { label: 'Thiếu cân', color: 'text-warning' };
    if (bmi < 25) return { label: 'Bình thường', color: 'text-success' };
    if (bmi < 30) return { label: 'Thừa cân', color: 'text-warning' };
    return { label: 'Béo phì', color: 'text-danger' };
};

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories
 */
export const calculateBMR = (weight, height, age, gender) => {
    if (!weight || !height || !age) return 0;

    const bmr = 10 * weight + 6.25 * height - 5 * age;

    if (gender === 'male') {
        return bmr + 5;
    } else {
        return bmr - 161;
    }
};

/**
 * Calculate Total Daily Energy Expenditure
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key
 * @returns {number} TDEE in calories
 */
export const calculateTDEE = (bmr, activityLevel) => {
    const activityFactors = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extremely_active: 1.9
    };

    return bmr * (activityFactors[activityLevel] || 1.2);
};

/**
 * Calculate calorie deficit for weight loss
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {number} deficit - Calorie deficit (default: 500)
 * @returns {number} Target calories for weight loss
 */
export const calculateCalorieDeficit = (tdee, deficit = 500) => {
    return Math.max(tdee - deficit, 1200); // Minimum 1200 calories
};

/**
 * Calculate recommended macros
 * @param {number} calories - Target calories
 * @param {number} weight - Weight in kg
 * @returns {object} Macro recommendations
 */
export const calculateMacros = (calories, weight) => {
    // Protein: 1.6-2g per kg
    const protein = Math.round(weight * 1.8);
    const proteinCalories = protein * 4;

    // Fat: 25% of total calories
    const fatCalories = calories * 0.25;
    const fat = Math.round(fatCalories / 9);

    // Carbs: remaining calories
    const carbCalories = calories - proteinCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4);

    return {
        protein,
        fat,
        carbs,
        proteinCalories,
        fatCalories,
        carbCalories
    };
};

/**
 * Calculate total macros from food items
 * @param {Array} foods - Array of food items with quantity
 * @returns {object} Total macros
 */
export const calculateTotalMacros = (foods) => {
    return foods.reduce((total, food) => {
        const multiplier = food.grams / 100;
        return {
            calories: total.calories + (food.nutrition.calories * multiplier),
            protein: total.protein + (food.nutrition.protein * multiplier),
            carbs: total.carbs + (food.nutrition.carbs * multiplier),
            fat: total.fat + (food.nutrition.fat * multiplier)
        };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
};

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

/**
 * Calculate weight change trend
 * @param {Array} stats - Array of body stats entries
 * @returns {object} Trend data
 */
export const calculateWeightTrend = (stats) => {
    if (!stats || stats.length < 2) return { change: 0, avgPerWeek: 0 };

    const sorted = [...stats].sort((a, b) => new Date(a.date) - new Date(b.date));
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    const change = last.weight - first.weight;
    const days = (new Date(last.date) - new Date(first.date)) / (1000 * 60 * 60 * 24);
    const weeks = days / 7;
    const avgPerWeek = weeks > 0 ? change / weeks : 0;

    return { change, avgPerWeek };
};
