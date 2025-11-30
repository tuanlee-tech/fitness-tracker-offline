import { Download, Upload, Settings, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const DataExport = ({ onImport }) => {
  const [importing, setImporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    // Gather all data from localStorage
    const data = {
      userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
      bodyStats: JSON.parse(localStorage.getItem('bodyStats') || '[]'),
      completedWorkouts: JSON.parse(localStorage.getItem('completedWorkouts') || '{}'),
      waterLog: JSON.parse(localStorage.getItem('waterLog') || '{}'),
      darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);
        
        // Restore data to localStorage
        if (data.userProfile) localStorage.setItem('userProfile', JSON.stringify(data.userProfile));
        if (data.bodyStats) localStorage.setItem('bodyStats', JSON.stringify(data.bodyStats));
        if (data.completedWorkouts) localStorage.setItem('completedWorkouts', JSON.stringify(data.completedWorkouts));
        if (data.waterLog) localStorage.setItem('waterLog', JSON.stringify(data.waterLog));
        if (data.darkMode !== undefined) localStorage.setItem('darkMode', JSON.stringify(data.darkMode));
        
        alert('✅ Đã khôi phục dữ liệu thành công! Trang sẽ tải lại.');
        window.location.reload();
      } catch (error) {
        alert('❌ Lỗi khi đọc file: ' + error.message);
      } finally {
        setImporting(false);
      }
    };
    
    reader.onerror = () => {
      alert('❌ Không thể đọc file');
      setImporting(false);
    };
    
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('⚠️ Bạn có chắc muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác!')) {
      localStorage.clear();
      alert('✅ Đã xóa toàn bộ dữ liệu. Trang sẽ tải lại.');
      window.location.reload();
    }
  };

  return (
    <div className="card transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-gray-700 dark:text-gray-200"
      >
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="font-semibold">Quản lý dữ liệu</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-3">
            {/* Export */}
            <button
              onClick={handleExport}
              className="btn bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 flex items-center justify-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Sao lưu
            </button>

            {/* Import */}
            <label className="btn bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 flex items-center justify-center gap-2 text-sm cursor-pointer">
              <Upload className="w-4 h-4" />
              {importing ? 'Đang tải...' : 'Khôi phục'}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                disabled={importing}
              />
            </label>
          </div>

          {/* Clear All */}
          <button
            onClick={handleClearData}
            className="btn w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Xóa toàn bộ dữ liệu
          </button>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
            Phiên bản 1.0 • Dữ liệu được lưu trên thiết bị này
          </p>
        </div>
      )}
    </div>
  );
};
