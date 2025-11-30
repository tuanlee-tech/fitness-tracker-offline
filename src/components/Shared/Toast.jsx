import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

export const Toast = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      borderColor: 'border-green-600',
      textColor: 'text-white',
      iconColor: 'text-white'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-500',
      borderColor: 'border-red-600',
      textColor: 'text-white',
      iconColor: 'text-white'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500',
      borderColor: 'border-yellow-600',
      textColor: 'text-white',
      iconColor: 'text-white'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-600',
      textColor: 'text-white',
      iconColor: 'text-white'
    }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className="fixed top-24 right-4 z-50 animate-slideInRight">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl min-w-[300px] max-w-md ${config.bgColor} text-white`}>
        <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0`} />
        <p className={`flex-1 text-sm font-semibold ${config.textColor}`}>{message}</p>
        <button
          onClick={onClose}
          className={`p-1 hover:bg-white/20 rounded-lg transition-colors text-white`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
