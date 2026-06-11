import { useEffect, useState, useRef } from 'react';

const StatCard = ({ icon: Icon, label, value, prefix = '', suffix = '', color = 'primary', trend, animate = true }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    if (!animate) {
      setDisplayValue(numericValue);
      return;
    }
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplayValue(numericValue);
    };
    requestAnimationFrame(tick);
  }, [numericValue, animate]);

  const colors = {
    primary: 'from-primary/10 to-primary/5 text-primary',
    secondary: 'from-secondary/10 to-secondary/5 text-secondary',
    accent: 'from-accent/10 to-accent/5 text-accent',
    info: 'from-blue-500/10 to-blue-500/5 text-blue-600',
    success: 'from-green-500/10 to-green-500/5 text-green-600',
    error: 'from-red-500/10 to-red-500/5 text-red-600',
  };

  const iconBg = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary-dark',
    accent: 'bg-accent/10 text-accent-dark',
    info: 'bg-blue-100 text-blue-600',
    success: 'bg-green-100 text-green-600',
    error: 'bg-red-100 text-red-600',
  };

  return (
    <div ref={ref} className="stat-card relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-30`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${iconBg[color]}`}>
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          {trend !== undefined && (
            <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-500 mb-1">{label}</p>
        <p className="counter-value text-2xl text-neutral-900">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
