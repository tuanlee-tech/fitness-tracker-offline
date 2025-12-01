import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for syncing state with localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value
 * @returns {[value, setValue]} - state and setter
 */
export const useLocalStorage = (key, initialValue) => {
    const isInternalUpdate = useRef(false);
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

            if (JSON.stringify(valueToStore) === JSON.stringify(storedValue)) return;

            // Mark this update as internal so we don't double-handle it
            isInternalUpdate.current = true;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            // Sync same-tab
            window.dispatchEvent(new CustomEvent("local-storage-sync", {
                detail: { key, value: valueToStore }
            }));

        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    // Sync same tab & cross tab updates
    useEffect(() => {
  const handler = (event) => {
            let newValue;

            if (event.type === "local-storage-sync") {
                if (event.detail.key !== key) return;
                newValue = event.detail.value;

                // Ignore internal updates
                if (isInternalUpdate.current) {
                    isInternalUpdate.current = false;
                    return;
                }
            }

            if (event.type === "storage") {
                if (event.key !== key) return;
                newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
            }

            // Update only when different
            if (JSON.stringify(newValue) !== JSON.stringify(storedValue)) {
                setStoredValue(newValue);
            }
        };

        window.addEventListener("local-storage-sync", handler);
        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("local-storage-sync", handler);
            window.removeEventListener("storage", handler);
        };
    }, [key, storedValue]);

    return [storedValue, setValue];
};