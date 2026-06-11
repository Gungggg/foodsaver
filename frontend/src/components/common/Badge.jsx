const colorMap = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-neutral-100 text-neutral-700',
  primary: 'bg-primary-50 text-primary',
  accent: 'bg-accent-50 text-accent-dark',
};

const Badge = ({ children, color = 'neutral', dot = false, className = '' }) => {
  return (
    <span className={`badge ${colorMap[color] || colorMap.neutral} ${className}`}>
      {dot && <span className={`status-dot mr-1.5 ${
        color === 'success' ? 'bg-green-500' :
        color === 'warning' ? 'bg-yellow-500' :
        color === 'error' ? 'bg-red-500' :
        color === 'info' ? 'bg-blue-500' : 'bg-neutral-400'
      }`} />}
      {children}
    </span>
  );
};

export default Badge;
