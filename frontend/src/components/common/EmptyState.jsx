const EmptyState = ({ icon = 'inbox', title, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-xl text-center">
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-md">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h3 className="text-headline-sm font-headline-sm text-on-surface mb-xs">{title}</h3>
      {message && <p className="text-body-md font-body-md text-on-surface-variant max-w-md">{message}</p>}
      {action && <div className="mt-md">{action}</div>}
    </div>
  );
};

export default EmptyState;
