// 12-Week Workout Program
export const WORKOUT_PROGRAM = {
    // month1: {
    //     name: 'THÁNG 1 - NEWBIE',
    //     description: 'Làm quen với tập luyện cơ bản',
    //     startDate: new Date().toISOString().split('T')[0], // Today's date
    //     month: new Date().getMonth(),
    //     year: new Date().getFullYear(),
    //     weeks: [
    //         {
    //             week: 1,
    //             schedule: {
    //                 monday: {
    //                     name: 'Full Body A',
    //                     duration: '40-50 phút',
    //                     exercises: [
    //                         {
    //                             name: 'Wall/Knee Push-up',
    //                             sets: 2,
    //                             reps: '6-8',
    //                             rest: '60s',
    //                             notes: 'Bắt đầu với wall push-up nếu chưa làm được knee push-up'
    //                         },
    //                         {
    //                             name: 'Xà đơn (treo người)',
    //                             sets: 2,
    //                             reps: '15-20s',
    //                             rest: '90s',
    //                             notes: 'Chỉ cần treo, giữ thẳng lưng'
    //                         },
    //                         {
    //                             name: 'Bodyweight Squat',
    //                             sets: 2,
    //                             reps: '10',
    //                             rest: '60s',
    //                             notes: '⚠️ Thở đều, không nhịn thở! Mặc quần lót hỗ trợ'
    //                         },
    //                         {
    //                             name: 'Plank',
    //                             sets: 2,
    //                             reps: '20-30s',
    //                             rest: '60s',
    //                             notes: 'Giữ lưng thẳng, không võng'
    //                         }
    //                     ],
    //                     warnings: ['Luôn thở đều, không nhịn thở', 'Dừng ngay nếu cảm thấy đau vùng bìu', 'Mặc quần lót hỗ trợ khi tập']
    //                 },
    //                 tuesday: {
    //                     name: 'Cardio nhẹ',
    //                     duration: '20-30 phút',
    //                     exercises: [
    //                         {
    //                             name: 'Đi bộ nhanh',
    //                             sets: 1,
    //                             reps: '20-30 phút',
    //                             rest: '0s',
    //                             notes: 'Tốc độ vừa phải, có thể nói chuyện được'
    //                         }
    //                     ]
    //                 },
    //                 wednesday: {
    //                     name: 'Nghỉ ngơi',
    //                     rest: true
    //                 },
    //                 thursday: {
    //                     name: 'Full Body B',
    //                     duration: '40-50 phút',
    //                     exercises: [
    //                         {
    //                             name: 'Incline Push-up',
    //                             sets: 2,
    //                             reps: '8-10',
    //                             rest: '60s',
    //                             notes: 'Tay lên ghế hoặc bậc thang'
    //                         },
    //                         {
    //                             name: 'Dumbbell Row (hoặc Band Row)',
    //                             sets: 2,
    //                             reps: '10',
    //                             rest: '60s',
    //                             notes: 'Có thể dùng chai nước nếu không có dumbbell'
    //                         },
    //                         {
    //                             name: 'Lunges',
    //                             sets: 2,
    //                             reps: '8 mỗi chân',
    //                             rest: '60s',
    //                             notes: '⚠️ Thở đều, giữ thăng bằng'
    //                         },
    //                         {
    //                             name: 'Dead Bug',
    //                             sets: 2,
    //                             reps: '10',
    //                             rest: '60s',
    //                             notes: 'Động tác cho core'
    //                         }
    //                     ],
    //                     warnings: ['Luôn thở đều, không nhịn thở', 'Dừng ngay nếu cảm thấy đau vùng bìu']
    //                 },
    //                 friday: {
    //                     name: 'Cardio nhẹ',
    //                     duration: '20-30 phút',
    //                     exercises: [
    //                         {
    //                             name: 'Đạp xe hoặc đi bộ',
    //                             sets: 1,
    //                             reps: '25 phút',
    //                             rest: '0s'
    //                         }
    //                     ]
    //                 },
    //                 saturday: {
    //                     name: 'Full Body C',
    //                     duration: '40-50 phút',
    //                     exercises: [
    //                         {
    //                             name: 'Push-up (regular hoặc knee)',
    //                             sets: 2,
    //                             reps: '8-10',
    //                             rest: '60s'
    //                         },
    //                         {
    //                             name: 'Inverted Row (hoặc Band Row)',
    //                             sets: 2,
    //                             reps: '8-10',
    //                             rest: '60s'
    //                         },
    //                         {
    //                             name: 'Step-ups',
    //                             sets: 2,
    //                             reps: '10 mỗi chân',
    //                             rest: '60s',
    //                             notes: '⚠️ Thở đều khi bước lên'
    //                         },
    //                         {
    //                             name: 'Bird Dog',
    //                             sets: 2,
    //                             reps: '10 mỗi bên',
    //                             rest: '60s'
    //                         }
    //                     ]
    //                 },
    //                 sunday: {
    //                     name: 'Nghỉ ngơi hoặc đi bộ nhẹ',
    //                     rest: true
    //                 }
    //             }
    //         },
    //         {
    //             week: 2,
    //             schedule: {
    //                 monday: {
    //                     name: 'Full Body A - Tăng volume',
    //                     duration: '45-55 phút',
    //                     exercises: [
    //                         { name: 'Push-up Progression', sets: 3, reps: '8-10', rest: '60s' },
    //                         { name: 'Xà đơn (treo)', sets: 3, reps: '20-30s', rest: '90s' },
    //                         { name: 'Squat', sets: 3, reps: '12', rest: '60s', notes: '⚠️ Thở đều!' },
    //                         { name: 'Plank', sets: 3, reps: '30-40s', rest: '60s' }
    //                     ],
    //                     warnings: ['Luôn thở đều, không nhịn thở', 'Dừng ngay nếu cảm thấy đau vùng bìu', 'Mặc quần lót hỗ trợ khi tập']
    //                 },
    //                 tuesday: { name: 'Cardio', duration: '25-30 phút', exercises: [{ name: 'Đi bộ nhanh/Chạy nhẹ', sets: 1, reps: '25-30 phút', rest: '0s' }] },
    //                 wednesday: { name: 'Nghỉ ngơi', rest: true },
    //                 thursday: {
    //                     name: 'Full Body B - Tăng volume',
    //                     duration: '45-55 phút',
    //                     exercises: [
    //                         { name: 'Incline Push-up', sets: 3, reps: '10-12', rest: '60s' },
    //                         { name: 'Dumbbell/Band Row', sets: 3, reps: '12', rest: '60s' },
    //                         { name: 'Lunges', sets: 3, reps: '10 mỗi chân', rest: '60s' },
    //                         { name: 'Dead Bug', sets: 3, reps: '12', rest: '60s' }
    //                     ]
    //                 },
    //                 friday: { name: 'Cardio', duration: '30 phút', exercises: [{ name: 'Cardio tự chọn', sets: 1, reps: '30 phút', rest: '0s' }] },
    //                 saturday: {
    //                     name: 'Full Body C - Tăng volume',
    //                     duration: '45-55 phút',
    //                     exercises: [
    //                         { name: 'Push-up', sets: 3, reps: '10-12', rest: '60s' },
    //                         { name: 'Inverted Row', sets: 3, reps: '10-12', rest: '60s' },
    //                         { name: 'Step-ups', sets: 3, reps: '12 mỗi chân', rest: '60s' },
    //                         { name: 'Bird Dog', sets: 3, reps: '12 mỗi bên', rest: '60s' }
    //                     ]
    //                 },
    //                 sunday: { name: 'Nghỉ ngơi', rest: true }
    //             }
    //         }
    //     ]
    // },
    // month2: {
    //     name: 'THÁNG 2 - INTERMEDIATE',
    //     description: 'Tăng cường độ và kỹ thuật',
    //     startDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    //     month: (new Date().getMonth() + 1) % 12,
    //     year: new Date().getMonth() === 11 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
    //     weeks: [
    //         // Weeks 5-8 structure (placeholder for user to fill)
    //         { week: 5, schedule: {} },
    //         { week: 6, schedule: {} }
    //     ]
    // },
    // month3: {
    //     name: 'THÁNG 3 - ADVANCED',
    //     description: 'Nâng cao sức mạnh và thể lực',
    //     startDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
    //     month: (new Date().getMonth() + 2) % 12,
    //     year: new Date().getMonth() >= 10 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
    //     weeks: [
    //         // Weeks 9-12 structure (placeholder for user to fill)
    //         { week: 9, schedule: {} },
    //         { week: 10, schedule: {} }
    //     ]
    // }
};

export const DAYS_OF_WEEK = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

export const DAY_LABELS = {
    monday: 'Thứ 2',
    tuesday: 'Thứ 3',
    wednesday: 'Thứ 4',
    thursday: 'Thứ 5',
    friday: 'Thứ 6',
    saturday: 'Thứ 7',
    sunday: 'Chủ nhật'
};

// Get workout for specific week and day
export const getWorkout = (month, week, day) => {
    try {
        return WORKOUT_PROGRAM[month]?.weeks?.find(w => w.week === week)?.schedule[day];
    } catch {
        return null;
    }
};
