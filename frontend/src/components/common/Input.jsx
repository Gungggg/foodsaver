import { forwardRef } from 'react';

const Input = forwardRef(({
  label, error, icon: Icon, type = 'text', className = '',
  helperText, required = false, ...props
}, ref) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-neutral-400" />
          </div>
        )}
        {type === 'textarea' ? (
          <textarea
            ref={ref}
            className={`input-field resize-none ${Icon ? 'pl-10' : ''} ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}`}
            rows={4}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            className={`input-field ${Icon ? 'pl-10' : ''} ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}`}
            {...props}
          />
        )}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      {helperText && !error && <p className="text-sm text-neutral-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
