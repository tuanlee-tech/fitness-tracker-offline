import { useLocalStorage } from './useLocalStorage';
import { calculateWeightTrend } from '../utils/calculations';

export const useBodyStats = () => {
    const [stats, setStats] = useLocalStorage('bodyStats', []);

    const addStat = (newStat) => {
        setStats(prevStats => {
            // Check if entry for this date already exists
            const existingIndex = prevStats.findIndex(s => s.date === newStat.date);

            if (existingIndex >= 0) {
                // Update existing entry
                const updated = [...prevStats];
                updated[existingIndex] = { ...updated[existingIndex], ...newStat };
                return updated;
            } else {
                // Add new entry
                return [...prevStats, { ...newStat, id: Date.now() }];
            }
        });
    };

    const deleteStat = (id) => {
        setStats(prevStats => prevStats.filter(s => s.id !== id));
    };

    const updateStat = (id, updates) => {
        setStats(prevStats =>
            prevStats.map(s => s.id === id ? { ...s, ...updates } : s)
        );
    };

    const getStatsByDateRange = (days) => {
        if (!days) return stats;

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return stats.filter(s => new Date(s.date) >= cutoffDate);
    };

    const getStatistics = () => {
        if (stats.length === 0) {
            return {
                totalEntries: 0,
                latestWeight: 0,
                startWeight: 0,
                change: 0,
                avgPerWeek: 0
            };
        }

        const sorted = [...stats].sort((a, b) => new Date(a.date) - new Date(b.date));
        const { change, avgPerWeek } = calculateWeightTrend(stats);

        return {
            totalEntries: stats.length,
            latestWeight: sorted[sorted.length - 1].weight,
            startWeight: sorted[0].weight,
            change,
            avgPerWeek
        };
    };

    return {
        stats,
        addStat,
        deleteStat,
        updateStat,
        getStatsByDateRange,
        getStatistics
    };
};
