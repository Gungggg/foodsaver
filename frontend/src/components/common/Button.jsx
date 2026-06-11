import { forwardRef } from 'react';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary-dark focus:ring-primary/50',
  secondary: 'bg-secondary text-white hover:bg-secondary-light active:bg-secondary-dark focus:ring-secondary/50',
  accent: 'bg-accent text-white hover:bg-accent-light active:bg-accent-dark focus:ring-accent/50',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50',
  ghost: 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-300',
  danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-400/50',
  success: 'bg-success text-white hover:bg-green-600 active:bg-green-700 focus:ring-green-400/50',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

const Button = forwardRef(({
  children, variant = 'primary', size = 'md', className = '',
  loading = false, disabled = false, icon: Icon, iconRight,
  fullWidth = false, ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-button
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {iconRight && !loading && <span className="ml-1">{iconRight}</span>}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
