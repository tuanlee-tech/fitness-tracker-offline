import { useState, useEffect } from 'react';

/**
 * Custom hook for syncing state with localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value
 * @returns {[value, setValue]} - state and setter
 */
export const useLocalStorage = (key, initialValue) => {
    // Get initial value from localStorage or use provided initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    // Update localStorage when value changes
    const setValue = (value) => {
        try {
            // Allow value to be a function like useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            // Dispatch custom event for same-tab sync
            window.dispatchEvent(new Event('local-storage'));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    // Listen for changes from other components/tabs
    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const item = window.localStorage.getItem(key);
                setStoredValue(item ? JSON.parse(item) : initialValue);
            } catch (error) {
                console.error(`Error syncing ${key}:`, error);
            }
        };

        // Listen for custom event (same tab) and storage event (cross tab)
        window.addEventListener('local-storage', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('local-storage', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue];
};
