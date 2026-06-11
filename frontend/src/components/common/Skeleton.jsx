const Skeleton = ({ className = '', variant = 'rect', count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className="space-y-4">
        {items.map(i => (
          <div key={i} className="bg-white rounded-card p-6 shadow-card space-y-4">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
            <div className="skeleton h-32 w-full rounded-lg" />
            <div className="flex gap-2">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="space-y-3">
        {items.map(i => (
          <div key={i} className="flex gap-4 items-center">
            <div className="skeleton h-4 w-1/4 rounded" />
            <div className="skeleton h-4 w-1/4 rounded" />
            <div className="skeleton h-4 w-1/4 rounded" />
            <div className="skeleton h-4 w-1/4 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'product') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(i => (
          <div key={i} className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="skeleton h-48 w-full" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
              <div className="flex justify-between">
                <div className="skeleton h-5 w-20 rounded" />
                <div className="skeleton h-5 w-16 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(i => (
        <div key={i} className={`skeleton rounded ${className || 'h-4 w-full'}`} />
      ))}
    </div>
  );
};

export default Skeleton;
