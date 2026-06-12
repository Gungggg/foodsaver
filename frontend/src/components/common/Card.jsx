const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10
        ${hover ? 'hover:shadow-card-hover transition-all duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
