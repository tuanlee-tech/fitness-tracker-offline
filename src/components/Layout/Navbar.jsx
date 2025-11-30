import { Moon, Sun, Dumbbell } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";

export const Navbar = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  const handleToggle = () => {
    console.log("Toggle clicked! Current darkMode:", darkMode);
    toggleDarkMode();
    console.log("After toggle");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/20">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                FitTracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Theo dõi sức khỏe
              </p>
            </div>
          </div>

          {/* Dark Mode Toggle - Added debug */}
          <button
            onClick={handleToggle}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 active:scale-95 border-2 border-gray-300 dark:border-gray-600"
            aria-label="Toggle dark mode"
            type="button"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
