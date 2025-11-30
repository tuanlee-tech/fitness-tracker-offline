export const NUTRITION_DATA = {
    ma_dui_ga: {
        id: 'ma_dui_ga',
        name: 'Má đùi gà (không da, xương)',
        calories: 119,
        protein: 21.3,
        carbs: 0,
        fat: 3.5
    },
    uc_ga: {
        id: 'uc_ga',
        name: 'Ức gà',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
    },
    trung: {
        id: 'trung',
        name: 'Trứng gà',
        calories: 155,
        protein: 13,
        carbs: 1.1,
        fat: 11
    },
    whey: {
        id: 'whey',
        name: 'Whey Protein',
        calories: 400,
        protein: 80,
        carbs: 8,
        fat: 8
    },
    tom: {
        id: 'tom',
        name: 'Tôm',
        calories: 99,
        protein: 24,
        carbs: 0.2,
        fat: 0.3
    },
    thit_bo: {
        id: 'thit_bo',
        name: 'Thịt bò nạc',
        calories: 250,
        protein: 26,
        carbs: 0,
        fat: 15
    },
    thit_heo: {
        id: 'thit_heo',
        name: 'Thịt heo nạc',
        calories: 242,
        protein: 27,
        carbs: 0,
        fat: 14
    },
    ca_thu: {
        id: 'ca_thu',
        name: 'Cá thu',
        calories: 205,
        protein: 19,
        carbs: 0,
        fat: 14
    },
    cha_ca: {
        id: 'cha_ca',
        name: 'Chả cá thu',
        calories: 180,
        protein: 15,
        carbs: 10,
        fat: 8
    },
    rau_xanh: {
        id: 'rau_xanh',
        name: 'Rau xanh (trung bình)',
        calories: 25,
        protein: 2,
        carbs: 5,
        fat: 0.3
    },
    gao_trang: {
        id: 'gao_trang',
        name: 'Gạo trắng (chín)',
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3
    },
    khoai_lang: {
        id: 'khoai_lang',
        name: 'Khoai lang',
        calories: 86,
        protein: 1.6,
        carbs: 20,
        fat: 0.1
    },
    chuoi: {
        id: 'chuoi',
        name: 'Chuối',
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3
    },
    sua_tuoi: {
        id: 'sua_tuoi',
        name: 'Sữa tươi',
        calories: 61,
        protein: 3.4,
        carbs: 4.8,
        fat: 3.3
    },
    dau_olive: {
        id: 'dau_olive',
        name: 'Dầu olive',
        calories: 884,
        protein: 0,
        carbs: 0,
        fat: 100
    },
    hat_hanh_nhan: {
        id: 'hat_hanh_nhan',
        name: 'Hạt hạnh nhân',
        calories: 579,
        protein: 21,
        carbs: 22,
        fat: 50
    }
};

// Convert to array for easier mapping
export const getNutritionArray = () => {
    return Object.values(NUTRITION_DATA);
};

// Search foods by name
export const searchFoods = (query) => {
    if (!query) return getNutritionArray();

    const lowerQuery = query.toLowerCase();
    return getNutritionArray().filter(food =>
        food.name.toLowerCase().includes(lowerQuery)
    );
};
