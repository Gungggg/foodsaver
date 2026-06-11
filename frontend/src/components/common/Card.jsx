const Card = ({ children, className = '', hover = false, padding = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-card shadow-card
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${padding ? 'p-6' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
