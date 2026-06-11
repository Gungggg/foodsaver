const EmptyState = ({ icon = '📭', title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-xl font-heading font-semibold text-neutral-700 mb-2">{title}</h3>
      {description && <p className="text-neutral-500 mb-6 max-w-md">{description}</p>}
      {action && action}
    </div>
  );
};

export default EmptyState;
