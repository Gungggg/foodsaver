const Input = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-label-md font-label-md text-on-surface-variant mb-xs uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full bg-surface border border-outline-variant rounded-lg
            ${icon ? 'pl-xl' : 'px-sm'} pr-sm py-sm
            text-body-md font-body-md text-on-surface
            focus:border-primary focus:ring-1 focus:ring-primary
            outline-none transition-colors placeholder:text-outline
            ${error ? 'border-error focus:border-error focus:ring-error' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-xs text-label-md font-label-md text-error flex items-center gap-xs">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
