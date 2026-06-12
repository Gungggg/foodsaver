const colorVariants = {
  primary: { bg: 'bg-primary-fixed/20', icon: 'text-primary', glow: 'bg-primary-fixed/20' },
  secondary: { bg: 'bg-surface-container-low', icon: 'text-secondary', glow: 'bg-secondary-fixed/20' },
  tertiary: { bg: 'bg-surface-container-low', icon: 'text-tertiary', glow: 'bg-tertiary-fixed/20' },
  accent: { bg: 'bg-surface-container-low', icon: 'text-on-tertiary-container', glow: 'bg-tertiary-fixed/20' },
};

const StatCard = ({ title, value, icon, trend, trendLabel, variant = 'primary', highlighted = false, className = '' }) => {
  if (highlighted) {
    return (
      <div className={`bg-primary text-on-primary p-md rounded-xl shadow-[0_4px_24px_rgba(27,67,50,0.15)] flex flex-col justify-between relative overflow-hidden ${className}`}>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="flex justify-between items-start mb-lg relative z-10">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          {trend && (
            <span className="bg-white/20 text-on-primary text-label-md font-label-md px-2 py-1 rounded-full flex items-center gap-xs backdrop-blur-sm">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span> {trend}
            </span>
          )}
        </div>
        <div className="relative z-10">
          <p className="text-label-md font-label-md text-on-primary/80 mb-xs">{title}</p>
          <p className="text-display-lg font-display-lg text-on-primary">{value}</p>
        </div>
      </div>
    );
  }

  const colors = colorVariants[variant] || colorVariants.primary;

  return (
    <div className={`bg-surface-container-lowest p-md rounded-xl shadow-card flex flex-col justify-between border border-outline-variant/10 relative overflow-hidden ${className}`}>
      <div className={`absolute -right-4 -top-4 w-24 h-24 ${colors.glow} rounded-full blur-2xl`} />
      <div className="flex justify-between items-start mb-lg relative z-10">
        <div className={`w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center ${colors.icon}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <span className="bg-secondary-container text-on-secondary-container text-label-md font-label-md px-2 py-1 rounded-full flex items-center gap-xs">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span> {trend}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-label-md font-label-md text-on-surface-variant mb-xs">{title}</p>
        <p className="text-display-lg font-display-lg text-on-background">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
