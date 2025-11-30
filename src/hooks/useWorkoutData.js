import { useLocalStorage } from './useLocalStorage';
import { WORKOUT_PROGRAM } from '../data/workoutData';

export const useWorkoutData = () => {
    // Initialize with default program if empty
    const [program, setProgram] = useLocalStorage('workoutProgram', WORKOUT_PROGRAM);

    // Date calculation utilities
    const getCurrentMonthKey = () => {
        if (Object.keys(program).length === 0) {
            return null;  // Trả về null nếu không có khóa nào trong program
        }

        const today = new Date();
        let currentMonthKey = null;
        let minDiff = Infinity;

        Object.entries(program).forEach(([key, monthData]) => {
            if (!monthData.startDate) return;

            const start = new Date(monthData.startDate);
            const diff = Math.abs(today - start);

            if (diff < minDiff) {
                minDiff = diff;
                currentMonthKey = key;
            }
        });

        return currentMonthKey || 'month1';
    };

    const getCurrentWeekNumber = () => {
        const monthKey = getCurrentMonthKey();
        console.log(monthKey)
        if (!monthKey) return undefined;
        const monthData = program[monthKey];

        if (!monthData?.startDate) return monthData?.weeks[0]?.week || 1;

        const today = new Date();
        const startDate = new Date(monthData.startDate);
        const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        const weekNumber = Math.floor(daysDiff / 7);

        const weeks = monthData.weeks.map(w => w.week);
        const targetWeek = (monthData.weeks[0]?.week || 1) + weekNumber;

        // Find closest week
        return weeks.reduce((prev, curr) =>
            Math.abs(curr - targetWeek) < Math.abs(prev - targetWeek) ? curr : prev
        );
    };

    const updateWorkout = (month, week, day, updatedWorkout) => {
        setProgram(prevProgram => {
            const newProgram = { ...prevProgram };
            const weekIndex = newProgram[month].weeks.findIndex(w => w.week === week);

            if (weekIndex !== -1) {
                newProgram[month].weeks[weekIndex].schedule[day] = updatedWorkout;
            }

            return newProgram;
        });
    };

    const updateMonth = (monthKey, updates) => {
        setProgram(prev => ({
            ...prev,
            [monthKey]: { ...prev[monthKey], ...updates }
        }));
    };

    const addMonth = (name, description, startDate) => {
        const newKey = `month${Object.keys(program).length + 1}`;
        let lastWeek = 0;
        Object.values(program).forEach(m => {
            m.weeks.forEach(w => {
                if (w.week > lastWeek) lastWeek = w.week;
            });
        });

        const startWeek = lastWeek + 1;

        // Calculate date - default to next month
        const date = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() + Object.keys(program).length));

        setProgram(prev => ({
            ...prev,
            [newKey]: {
                name: name || `THÁNG ${Object.keys(prev).length + 1}`,
                description: description || 'Mô tả chương trình tập luyện',
                startDate: date.toISOString().split('T')[0],
                month: date.getMonth(),
                year: date.getFullYear(),
                weeks: [{ week: startWeek, schedule: {} }]
            }
        }));

        return { key: newKey, startWeek };
    };

    const deleteMonth = (monthKey) => {
        setProgram(prev => {
            const newProgram = { ...prev };
            delete newProgram[monthKey];
            return newProgram;
        });
    };

    const addWeek = (monthKey) => {
        const month = program[monthKey];
        const lastWeek = month.weeks[month.weeks.length - 1]?.week || 0;
        const newWeek = lastWeek + 1;

        setProgram(prev => ({
            ...prev,
            [monthKey]: {
                ...prev[monthKey],
                weeks: [
                    ...prev[monthKey].weeks,
                    { week: newWeek, schedule: {} }
                ]
            }
        }));

        return newWeek;
    };

    const deleteWeek = (monthKey, weekNumber) => {
        setProgram(prev => {
            const month = prev[monthKey];
            return {
                ...prev,
                [monthKey]: {
                    ...month,
                    weeks: month.weeks.filter(w => w.week !== weekNumber)
                }
            };
        });
    };

    const resetToDefault = (onConfirm) => {
        // Callback will be called by WorkoutCalendar with ConfirmDialog
        if (onConfirm) {
            onConfirm(() => setProgram(WORKOUT_PROGRAM));
        }
    };

    const getWorkout = (month, week, day) => {
        try {
            return program[month]?.weeks?.find(w => w.week === week)?.schedule[day];
        } catch {
            return null;
        }
    };

    return {
        program,
        updateWorkout,
        updateMonth,
        addMonth,
        deleteMonth,
        addWeek,
        deleteWeek,
        resetToDefault,
        getWorkout,
        getCurrentMonthKey,
        getCurrentWeekNumber
    };
};
