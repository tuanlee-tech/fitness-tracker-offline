# Fitness & Nutrition Tracker

A comprehensive Progressive Web App (PWA) for tracking fitness, nutrition, and health metrics built with React, Tailwind CSS, and Supabase.

## ✨ Features

### 📊 Profile & Stats
- Personal information management (age, height, weight, activity level)
- BMI calculator with visual indicator
- TDEE (Total Daily Energy Expenditure) calculator
- Calorie deficit recommendations for weight loss
- Macro nutrient recommendations (Protein, Carbs, Fat)

### 🏋️ Workout Schedule
- 12-week structured workout program
- Weekly progress tracking
- Detailed exercise instructions with sets, reps, and rest times
- Workout completion tracking
- Safety warnings and tips (especially for preventing varicocele)

### 📈 Body Tracker
- Daily weight entry
- Optional body fat percentage and waist measurements
- Progress charts with trend lines
- Statistics (total change, average per week, days to goal)
- Historical timeline with filters

### 🍽️ Meal Planner
- Vietnamese food nutrition database (USDA standards)
- Daily meal planning (Breakfast, Lunch, Dinner, Snacks)
- Calorie and macro tracking
- Circular progress indicator for daily calorie goal
- Macro breakdown visualization
- Food search and quick add functionality

### 💧 Additional Features
- Water intake tracker with daily goals
- Dark mode support
- Offline capability (PWA)
- Mobile-first responsive design
- Toast notifications
- Data persistence with localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials (optional):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## 📦 Tech Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **Storage**: localStorage (with Supabase support)
- **PWA**: Manifest & Service Worker ready

## 📱 PWA Installation

The app can be installed on mobile devices:

1. Open the app in your mobile browser
2. Tap "Add to Home Screen" (iOS) or "Install App" (Android)
3. The app will run like a native app with offline support

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Layout/          # Navbar, TabNavigation
│   ├── Profile/         # ProfileForm, BMI, TDEE calculators
│   ├── Workout/         # WorkoutCalendar
│   ├── BodyTracker/     # WeightEntry, Charts, Statistics
│   ├── MealPlanner/     # FoodSelector, MealPlan, MacroProgress
│   └── Shared/          # Modal, Toast, Loading, WaterTracker
├── data/
│   ├── nutritionData.js # Vietnamese food database
│   └── workoutData.js   # 12-week workout program
├── hooks/
│   ├── useLocalStorage.js
│   ├── useDarkMode.js
│   └── useBodyStats.js
├── utils/
│   ├── calculations.js  # BMI, BMR, TDEE, Macros
│   ├── validation.js    # Form validation
│   └── supabase.js      # Supabase client
├── App.jsx
└── main.jsx
```

## 🎨 Design Features

- **Mobile-First**: Optimized for mobile devices with touch-friendly UI
- **Dark Mode**: System-aware with manual toggle
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: 60fps transitions and micro-interactions
- **Accessibility**: WCAG AA compliant with proper ARIA labels

## 📊 Data Storage

Currently using localStorage for data persistence. All data is stored locally in the browser:

- `userProfile` - User information
- `bodyStats` - Weight tracking entries
- `completedWorkouts` - Workout completion status
- `meals-{date}` - Daily meal logs
- `waterLog` - Daily water intake
- `darkMode` - Theme preference

### Supabase Integration (Optional)

The app is ready for Supabase integration. See `src/utils/supabase.js` for the client setup.

## ⚠️ Health & Safety

This app includes important health warnings:

- **Varicocele Prevention**: Clear warnings during leg exercises about breathing techniques
- **Weight Loss Guidelines**: Safe calorie deficit recommendations (500 kcal/day max)
- **Professional Advice**: Disclaimers about consulting healthcare professionals

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### Other Platforms

Build the app and deploy the `dist` folder to any static hosting service.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Built with ❤️ for fitness enthusiasts

## 🙏 Acknowledgments

- Nutrition data based on USDA standards
- Workout programs designed for beginners to intermediate levels
- Icons by Lucide React
- UI inspiration from modern fitness apps
