# Fitness Tracker - Danh Sách Screen & Components

## 📱 Cấu Trúc Ứng Dụng

Ứng dụng có **4 tab chính** với bottom navigation (iOS-style):

---

## 🎯 1. TAB HỒ SƠ (Profile)
**Route:** `activeTab === 'profile'`

### A. ProfileForm Component
- **Location:** [src/components/Profile/ProfileForm.jsx](file:///e:/fitness-tracker/src/components/Profile/ProfileForm.jsx)
- **Chức năng:** Form nhập thông tin cá nhân
- **Fields:**
  - Họ tên (text input)
  - Tuổi (number input)
  - Giới tính (select: Nam/Nữ)
  - Chiều cao cm (number input)
  - Cân nặng hiện tại kg (number input)
  - Cân nặng mục tiêu kg (number input)
  - Mức độ vận động (select: 5 options)
  - Button "Lưu thông tin" (gradient primary)
- **Validation:** Real-time với error messages tiếng Việt

### B. BMICalculator Component
- **Location:** [src/components/Profile/BMICalculator.jsx](file:///e:/fitness-tracker/src/components/Profile/BMICalculator.jsx)
- **Chức năng:** Hiển thị BMI với visual scale
- **UI Elements:**
  - BMI number (calculated)
  - Classification text (Thiếu cân/Bình thường/Thừa cân/Béo phì)
  - Color-coded horizontal scale bar
  - Position indicator

### C. TDEECalculator Component
- **Location:** [src/components/Profile/TDEECalculator.jsx](file:///e:/fitness-tracker/src/components/Profile/TDEECalculator.jsx)
- **Chức năng:** Hiển thị tính toán calories và macros
- **UI Elements:**
  - BMR (Basal Metabolic Rate)
  - TDEE (Total Daily Energy Expenditure)
  - Calorie recommendation for weight loss
  - Macro breakdown với progress bars:
    - Protein (g) - blue bar
    - Fat (g) - yellow bar
    - Carbs (g) - green bar

### D. WaterTracker Component
- **Location:** [src/components/Shared/WaterTracker.jsx](file:///e:/fitness-tracker/src/components/Shared/WaterTracker.jsx)
- **Chức năng:** Theo dõi lượng nước uống hàng ngày
- **UI Elements:**
  - Progress bar (2500ml goal)
  - Quick add buttons: +250ml, +500ml, +1L
  - Current amount / Goal
  - Reset button

### E. DataExport Component
- **Location:** [src/components/Shared/DataExport.jsx](file:///e:/fitness-tracker/src/components/Shared/DataExport.jsx)
- **Chức năng:** Xuất/nhập/xóa dữ liệu
- **UI Elements:**
  - "Xuất dữ liệu (JSON)" button
  - "Nhập dữ liệu" button (file picker)
  - "Xóa toàn bộ dữ liệu" button (danger)

---

## 🏋️ 2. TAB LỊCH TẬP (Workout)
**Route:** `activeTab === 'workout'`

### WorkoutCalendar Component
- **Location:** [src/components/Workout/WorkoutCalendar.jsx](file:///e:/fitness-tracker/src/components/Workout/WorkoutCalendar.jsx)
- **Chức năng:** Lịch tập 12 tuần với chi tiết bài tập
- **UI Elements:**
  - **Header:**
    - Week selector (← Week 1/12 →)
    - Progress percentage ring
  - **Calendar Grid:**
    - 7 cards (Thứ 2 → Chủ nhật)
    - Each card shows:
      - Day name
      - Workout name or "Nghỉ ngơi"
      - Duration
      - Checkmark for completed
  - **Modal (khi click vào ngày):**
    - Workout title
    - Duration
    - Exercise list với:
      - Exercise name
      - Sets × Reps
      - Rest time
      - Notes/form cues
    - Warning messages (breathing, safety)
    - "Đánh dấu hoàn thành" button

---

## 📈 3. TAB CÂN NẶNG (Body Tracker)
**Route:** `activeTab === 'tracker'`

### A. Statistics Component
- **Location:** [src/components/BodyTracker/Statistics.jsx](file:///e:/fitness-tracker/src/components/BodyTracker/Statistics.jsx)
- **Chức năng:** Thống kê tổng quan
- **UI Elements:** 4 stat cards
  - Tổng thay đổi (kg với ↓/↑ icon)
  - Cân nặng hiện tại (kg)
  - Trung bình/tuần (kg/week)
  - Dự đoán đạt mục tiêu (days)

### B. WeightEntryForm Component
- **Location:** [src/components/BodyTracker/WeightEntryForm.jsx](file:///e:/fitness-tracker/src/components/BodyTracker/WeightEntryForm.jsx)
- **Chức năng:** Nhập số liệu hàng ngày
- **UI Elements:**
  - Date picker (default today)
  - Weight input (kg) *required
  - Body fat % input (optional)
  - Waist measurement (cm) (optional)
  - Notes textarea
  - "Thêm số liệu" button

### C. ProgressChart Component
- **Location:** [src/components/BodyTracker/ProgressChart.jsx](file:///e:/fitness-tracker/src/components/BodyTracker/ProgressChart.jsx)
- **Chức năng:** Biểu đồ đường theo dõi cân nặng
- **UI Elements:**
  - Date range filters (7 days, 1 month, 3 months, All)
  - Line chart (Recharts):
    - X-axis: dates
    - Y-axis: weight (kg)
    - Color: green (loss) / red (gain)
  - Custom tooltip on hover
  - Empty state message

---

## 🍽️ 4. TAB THỰC ĐƠN (Meal Planner)
**Route:** `activeTab === 'meal'`

### A. MacroProgress Component
- **Location:** [src/components/MealPlanner/MacroProgress.jsx](file:///e:/fitness-tracker/src/components/MealPlanner/MacroProgress.jsx)
- **Chức năng:** Vòng tròn tiến độ calories và macro breakdown
- **UI Elements:**
  - **Large circular progress ring:**
    - Consumed calories (center)
    - Target calories
    - Percentage
    - "Còn lại" text
  - **Macro breakdown bars:**
    - Protein (g) - blue
    - Carbs (g) - green
    - Fat (g) - yellow
    - Each with percentage

### B. Meal Type Selector (trong App.jsx)
- **Location:** [src/App.jsx](file:///e:/fitness-tracker/src/App.jsx) (lines 131-154)
- **UI Elements:**
  - 4 buttons với emoji:
    - 🌅 Sáng (Breakfast)
    - ☀️ Trưa (Lunch)
    - 🌙 Tối (Dinner)
    - 🍎 Vặt (Snack)
  - Active state: gradient blue + shadow
  - Inactive: gray background

### C. DailyMealPlan Component
- **Location:** [src/components/MealPlanner/DailyMealPlan.jsx](file:///e:/fitness-tracker/src/components/MealPlanner/DailyMealPlan.jsx)
- **Chức năng:** Hiển thị thực đơn trong ngày
- **UI Elements:**
  - 4 sections (Breakfast/Lunch/Dinner/Snacks):
    - Section header với total macros
    - Food list (name, grams, calories, P/C/F)
    - Remove button (X) cho từng item
    - "Xóa bữa ăn" button
  - **Daily totals card:**
    - Total calories
    - Total protein/carbs/fat

### D. FoodSelector Component
- **Location:** [src/components/MealPlanner/FoodSelector.jsx](file:///e:/fitness-tracker/src/components/MealPlanner/FoodSelector.jsx)
- **Chức năng:** Tìm kiếm và thêm thực phẩm
- **UI Elements:**
  - Search input (🔍 icon)
  - Food dropdown (16 Vietnamese foods)
  - Gram input (number)
  - **Nutrition preview card:**
    - Calories
    - Protein/Carbs/Fat
  - "Thêm vào bữa ăn" button

---

## 🎨 SHARED COMPONENTS

### 1. Navbar
- **Location:** [src/components/Layout/Navbar.jsx](file:///e:/fitness-tracker/src/components/Layout/Navbar.jsx)
- **UI Elements:**
  - Logo (Dumbbell icon + gradient)
  - App name "FitTracker"
  - Subtitle "Theo dõi sức khỏe"
  - Dark mode toggle button (Moon/Sun icon)

### 2. TabNavigation
- **Location:** [src/components/Layout/TabNavigation.jsx](file:///e:/fitness-tracker/src/components/Layout/TabNavigation.jsx)
- **UI Elements:**
  - 4 tabs (bottom navigation):
    - 👤 Hồ sơ
    - 📅 Lịch tập
    - 📊 Cân nặng
    - 🍽️ Thực đơn
  - Active state: blue background + scale up
  - Bottom indicator line

### 3. Modal
- **Location:** [src/components/Shared/Modal.jsx](file:///e:/fitness-tracker/src/components/Shared/Modal.jsx)
- **Props:** title, children, onClose, size

### 4. Toast
- **Location:** [src/components/Shared/Toast.jsx](file:///e:/fitness-tracker/src/components/Shared/Toast.jsx)
- **Types:** success, error, warning, info
- **Auto-dismiss:** 3 seconds

### 5. ErrorBoundary
- **Location:** [src/components/Shared/ErrorBoundary.jsx](file:///e:/fitness-tracker/src/components/Shared/ErrorBoundary.jsx)
- **Fallback UI:** Error icon + message + reload button

---

## 🎨 DESIGN TOKENS

### Colors (từ tailwind.config.js)
```javascript
Primary Blue: #3B82F6 (50-900 scale)
Success Green: #10B981
Warning Orange: #F59E0B
Danger Red: #EF4444
Gray: 50-900 scale
```

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, 18-24px
- **Body:** Regular, 14-16px
- **Small:** 12px

### Spacing
- **Card padding:** 24px (1.5rem)
- **Gap between cards:** 24px
- **Input padding:** 12px 16px
- **Button padding:** 12px 24px

### Borders & Shadows
- **Border radius:** 16px (rounded-2xl) cho cards
- **Shadow:** soft (subtle), soft-lg (elevated)
- **Border:** 1px gray-200 (light) / gray-700 (dark)

---

## 📊 DATA MODELS

### Profile Data
```javascript
{
  name: string,
  age: number,
  gender: 'male' | 'female',
  height: number, // cm
  currentWeight: number, // kg
  targetWeight: number, // kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
}
```

### Body Stats Entry
```javascript
{
  date: string, // ISO date
  weight: number, // kg
  bodyFat?: number, // %
  waist?: number, // cm
  notes?: string
}
```

### Meal Entry
```javascript
{
  name: string,
  grams: number,
  totalCalories: number,
  totalProtein: number,
  totalCarbs: number,
  totalFat: number,
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}
```

### Workout Data
```javascript
{
  name: string,
  duration: string,
  exercises: [{
    name: string,
    sets: number,
    reps: string,
    rest: string,
    notes?: string
  }],
  warnings?: string[]
}
```

---

## 🔗 NAVIGATION FLOW

```
App Launch
    ↓
[Bottom Tabs Always Visible]
    ↓
┌─────────────────────────────────────┐
│ Tab 1: Profile                      │
│  - ProfileForm                      │
│  - BMICalculator                    │
│  - TDEECalculator                   │
│  - WaterTracker                     │
│  - DataExport                       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Tab 2: Workout                      │
│  - WorkoutCalendar                  │
│    └→ Click Day → Modal             │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Tab 3: Body Tracker                 │
│  - Statistics                       │
│  - WeightEntryForm                  │
│  - ProgressChart                    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Tab 4: Meal Planner                 │
│  - MacroProgress                    │
│  - Meal Type Selector               │
│  - DailyMealPlan                    │
│  - FoodSelector                     │
└─────────────────────────────────────┘
```

---

## 📱 RESPONSIVE BREAKPOINTS

- **Mobile:** < 768px (1 column)
- **Tablet:** 768px - 1024px (2 columns cho grids)
- **Desktop:** > 1024px (2-3 columns)

**Layout Grid:**
- Profile: 2 columns (lg:grid-cols-2)
- Body Tracker: 2 columns for form + chart
- Meal Planner: 3 columns (2 for meals, 1 for selector)

---

## 🎯 DESIGN PRIORITIES

1. **Mobile-First:** Mọi screen phải hoạt động tốt trên mobile
2. **Touch-Friendly:** Buttons tối thiểu 44×44px
3. **Clear Hierarchy:** Headings rõ ràng, spacing nhất quán
4. **Visual Feedback:** Hover states, active states, loading states
5. **Accessibility:** Contrast ratio WCAG AA, labels cho inputs
6. **Dark Mode:** Hỗ trợ cả light và dark theme

---

**Tổng cộng:** 4 tabs chính, 15+ components, 50+ UI elements

Bạn có thể gửi document này cho designer để họ thiết kế mockup/prototype! 🎨
