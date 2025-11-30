import { User, Calendar, TrendingUp, UtensilsCrossed } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Hồ sơ', icon: User },
  { id: 'workout', label: 'Lịch tập', icon: Calendar },
  { id: 'tracker', label: 'Cân nặng', icon: TrendingUp },
  { id: 'meal', label: 'Thực đơn', icon: UtensilsCrossed }
];

export const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50">
      <div className="max-w-md mx-auto glass rounded-3xl p-2 shadow-2xl shadow-blue-900/20 border-white/40 dark:border-gray-600/40">
        <div className="grid grid-cols-4 gap-1 relative">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                {/* Active Background Pill */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl shadow-lg shadow-blue-500/30 animate-pulse-slow -z-10" />
                )}
                
                <Icon className={`w-6 h-6 mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} />
                <span className={`text-[10px] font-bold tracking-wide transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
