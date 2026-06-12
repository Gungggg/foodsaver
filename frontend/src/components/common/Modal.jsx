const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-on-background/40" onClick={onClose} />
      <div className={`relative bg-surface-container-lowest rounded-2xl shadow-card-hover p-md w-full ${sizes[size]} animate-scale-in`}>
        <div className="flex items-center justify-between mb-md">
          <h3 className="text-headline-sm font-headline-sm text-on-background">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
