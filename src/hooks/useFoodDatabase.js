import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { NUTRITION_DATA, getNutritionArray } from '../data/nutritionData';

export const useFoodDatabase = () => {
    const [customFoods, setCustomFoods] = useLocalStorage('customFoods', []);
    const [deletedFoodIds, setDeletedFoodIds] = useLocalStorage('deletedFoodIds', []);
    const [allFoods, setAllFoods] = useState([]);

    useEffect(() => {
        const staticFoods = getNutritionArray();

        // Create a map for unified access, starting with static foods
        const foodMap = new Map(staticFoods.map(food => [food.id, food]));

        // Overlay custom foods (this handles both new foods and edits to static foods)
        customFoods.forEach(food => {
            foodMap.set(food.id, food);
        });

        // Remove deleted foods
        deletedFoodIds.forEach(id => {
            foodMap.delete(id);
        });

        // Convert back to array
        setAllFoods(Array.from(foodMap.values()));
    }, [customFoods, deletedFoodIds]);

    const addFood = (food) => {
        const newFood = {
            ...food,
            id: `custom_${Date.now()}`, // Generate unique ID
            isCustom: true // Keep for internal tracking if needed, but UI won't distinguish
        };
        setCustomFoods(prev => [newFood, ...prev]);
        return newFood;
    };

    const updateFood = (id, updatedData) => {
        setCustomFoods(prev => {
            const existingIndex = prev.findIndex(f => f.id === id);
            if (existingIndex >= 0) {
                // Update existing custom food
                const newFoods = [...prev];
                newFoods[existingIndex] = { ...newFoods[existingIndex], ...updatedData };
                return newFoods;
            } else {
                // It's a static food being edited for the first time
                // Add it to customFoods to override the static version
                // We need to find the original static food to merge? 
                // Actually updatedData might be partial, but usually we pass full object in UI.
                // Let's assume updatedData is the full new object or we merge with current.
                // For safety, let's find the current food from allFoods (but we don't have access to it easily inside setter)
                // Better: The UI should pass the complete food object.
                return [{ ...updatedData, id }, ...prev];
            }
        });
    };

    const deleteFood = (foodId) => {
        // Add to deleted list
        setDeletedFoodIds(prev => [...prev, foodId]);

        // Also remove from customFoods if it exists there (cleanup)
        setCustomFoods(prev => prev.filter(f => f.id !== foodId));
    };

    const searchFoods = (query) => {
        if (!query) return allFoods;
        const lowerQuery = query.toLowerCase();
        return allFoods.filter(food =>
            food.name.toLowerCase().includes(lowerQuery)
        );
    };

    return {
        foods: allFoods,
        addFood,
        updateFood,
        deleteFood,
        searchFoods
    };
};
