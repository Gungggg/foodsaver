import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-secondary-container text-on-secondary-container',
    error: 'bg-error-container text-on-error-container',
    warning: 'bg-tertiary-fixed text-on-tertiary-fixed',
    info: 'bg-surface-container-high text-on-surface',
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <div className={`
      fixed top-4 right-4 z-[100] flex items-center gap-sm px-md py-sm rounded-xl shadow-card-hover
      ${styles[type]}
      transition-all duration-300
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}>
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icons[type]}</span>
      <span className="text-body-md font-body-md font-semibold">{message}</span>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="ml-sm p-1 rounded-full hover:opacity-70 transition-opacity">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};

export default Toast;
