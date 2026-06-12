const variantStyles = {
  success: 'bg-secondary-container text-on-secondary-container',
  error: 'bg-error-container text-on-error-container',
  warning: 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
  info: 'bg-surface-container text-on-surface-variant',
  primary: 'bg-primary-fixed text-on-primary-fixed',
  default: 'bg-surface-container text-on-surface-variant',
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  return (
    <span className={`
      inline-flex items-center gap-xs px-2 py-1 rounded-full
      text-label-md font-label-md
      ${variantStyles[variant] || variantStyles.default}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
