import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXCircle, HiX } from 'react-icons/hi';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

const icons = {
  success: HiCheckCircle,
  error: HiXCircle,
  warning: HiExclamationCircle,
  info: HiInformationCircle,
};

const bgColors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-amber-600',
  info: 'bg-blue-600',
};

const Toast = ({ id, type, message, onClose }) => {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`toast ${bgColors[type]} mb-3`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      <button onClick={() => onClose(id)} className="p-1 hover:bg-white/20 rounded">
        <HiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    addToast,
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
    info: (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default Toast;
