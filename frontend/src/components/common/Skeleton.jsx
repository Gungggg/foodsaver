const Skeleton = ({ className = '', variant = 'rect' }) => {
  const base = 'animate-pulse bg-surface-container-high rounded';
  const variants = {
    rect: `${base} ${className}`,
    circle: `${base} rounded-full ${className}`,
    text: `${base} h-4 ${className}`,
  };
  return <div className={variants[variant] || variants.rect} />;
};

Skeleton.Card = () => (
  <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-md space-y-sm">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton className="h-10 w-full mt-md" />
    </div>
  </div>
);

Skeleton.Stat = () => (
  <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/10">
    <div className="flex justify-between items-start mb-lg">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
    <Skeleton variant="text" className="w-1/2 mb-xs" />
    <Skeleton className="h-12 w-3/4" />
  </div>
);

export default Skeleton;
