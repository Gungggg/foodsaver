const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-btn',
  secondary: 'border border-outline-variant text-primary hover:bg-surface-container-low shadow-btn-sm',
  tonal: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed',
  text: 'text-primary hover:bg-surface-container-low',
  danger: 'bg-error text-on-error hover:opacity-90',
  ghost: 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary',
  outline: 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary',
};

const sizes = {
  sm: 'px-sm py-xs text-label-md font-label-md rounded-lg',
  md: 'px-md py-sm text-body-md font-body-md rounded-lg',
  lg: 'px-lg py-sm text-body-lg font-body-lg rounded-lg',
};

const Button = ({ children, variant = 'primary', size = 'md', fullWidth, disabled, className = '', icon, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        font-semibold inline-flex items-center justify-center gap-xs transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
