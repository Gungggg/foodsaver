import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.getDashboard();
        setStats(data);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    load();
  }, []);

  const metrics = stats ? [
    { title: 'Active Merchants', value: stats.total_merchants?.toLocaleString() || '0', icon: 'storefront', trend: '12%', variant: 'primary' },
    { title: 'Rescued Meals', value: stats.total_orders?.toLocaleString() || '0', icon: 'shopping_bag', trend: '8.4%', variant: 'secondary' },
    { title: 'CO2 Averted (KG)', value: stats.total_co2_saved?.toLocaleString() || '0', icon: 'eco', trend: '15%', variant: 'tertiary' },
    { title: 'Platform Revenue', value: `Rp ${((stats.total_revenue || 0) / 1000000).toFixed(1)}M`, icon: 'payments', trend: '22%', highlighted: true },
  ] : [];

  const verificationQueue = [
    { name: 'The Crusty Loaf', location: 'Downtown Jakarta', type: 'Bakery', status: 'Documents Uploaded', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop' },
    { name: 'Green Valley Market', location: 'Bandung', type: 'Grocery', status: 'Missing Tax ID', statusError: true, img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop' },
    { name: 'Sushi Zen', location: 'Surabaya', type: 'Restaurant', status: 'In Review', img: null },
  ];

  const glowColors = ['bg-primary-fixed/20', 'bg-secondary-fixed/20', 'bg-tertiary-fixed/20'];
  const iconColors = ['text-primary', 'text-secondary', 'text-tertiary'];

  return (
    <div className="space-y-lg animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-on-background">Platform Overview</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-xs">High-level metrics and system health for FoodSaver.</p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="bg-surface-container-low hover:bg-surface-container-high text-primary px-md py-sm rounded-lg flex items-center gap-xs transition-colors shadow-btn-sm">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span className="text-label-md font-label-md">Last 30 Days</span>
          </button>
          <button className="bg-primary hover:bg-primary-container text-on-primary px-md py-sm rounded-lg flex items-center gap-xs transition-colors shadow-btn">
            <span className="material-symbols-outlined text-sm">download</span>
            <span className="text-label-md font-label-md">Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/10 h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          {metrics.map((m, i) => m.highlighted ? (
            <div key={i} className="bg-primary text-on-primary p-md rounded-xl shadow-[0_4px_24px_rgba(27,67,50,0.15)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              <div className="flex justify-between items-start mb-lg relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined">{m.icon}</span>
                </div>
                <span className="bg-white/20 text-on-primary text-label-md font-label-md px-2 py-1 rounded-full flex items-center gap-xs backdrop-blur-sm">
                  <span className="material-symbols-outlined" style={{fontSize: '14px'}}>trending_up</span> {m.trend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-label-md font-label-md text-on-primary/80 mb-xs">{m.title}</p>
                <p className="text-display-lg font-display-lg text-on-primary">{m.value}</p>
              </div>
            </div>
          ) : (
            <div key={i} className="bg-surface-container-lowest p-md rounded-xl shadow-card flex flex-col justify-between border border-outline-variant/10 relative overflow-hidden">
              <div className={`absolute -right-4 -top-4 w-24 h-24 ${glowColors[i]} rounded-full blur-2xl`} />
              <div className="flex justify-between items-start mb-lg relative z-10">
                <div className={`w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center ${iconColors[i]}`}>
                  <span className="material-symbols-outlined">{m.icon}</span>
                </div>
                <span className="bg-secondary-container text-on-secondary-container text-label-md font-label-md px-2 py-1 rounded-full flex items-center gap-xs">
                  <span className="material-symbols-outlined" style={{fontSize: '14px'}}>trending_up</span> {m.trend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-label-md font-label-md text-on-surface-variant mb-xs">{m.title}</p>
                <p className="text-display-lg font-display-lg text-on-background">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        {/* Platform Health Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 p-md flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="text-headline-sm font-headline-sm text-on-background">Platform Health</h3>
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </button>
          </div>
          {/* Pseudo Chart */}
          <div className="flex-1 min-h-[300px] relative flex flex-col justify-end gap-2 pb-8">
            <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-label-md font-label-md text-outline">
              <span>10k</span><span>7.5k</span><span>5k</span><span>2.5k</span><span>0</span>
            </div>
            <div className="absolute left-10 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
              {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-outline-variant/20" />)}
            </div>
            <div className="ml-10 flex-1 flex items-end justify-between gap-2 px-4 z-10">
              {[['Mon',40,60],['Tue',50,75],['Wed',30,45],['Thu',60,85],['Fri',80,95],['Sat',40,55],['Sun',35,40]].map(([day, h1, h2]) => (
                <div key={day} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full flex items-end gap-1 h-[200px]">
                    <div className={`flex-1 bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors`} style={{height: `${h1}%`}} />
                    <div className={`flex-1 bg-secondary rounded-t-sm group-hover:bg-secondary-container transition-colors`} style={{height: `${h2}%`}} />
                  </div>
                  <span className="text-label-md font-label-md text-outline">{day}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-lg mt-md">
            <div className="flex items-center gap-xs"><div className="w-3 h-3 rounded-full bg-secondary" /><span className="text-label-md font-label-md text-on-surface-variant">Transaction Volume</span></div>
            <div className="flex items-center gap-xs"><div className="w-3 h-3 rounded-full bg-primary/20" /><span className="text-label-md font-label-md text-on-surface-variant">User Growth</span></div>
          </div>
        </div>

        {/* Verification Queue */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 p-md flex flex-col">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="text-headline-sm font-headline-sm text-on-background">Verification Queue</h3>
            <span className="bg-error-container text-on-error-container text-label-md font-label-md px-2 py-1 rounded-full">12 Pending</span>
          </div>
          <div className="flex-1 flex flex-col gap-md overflow-y-auto pr-2">
            {verificationQueue.map((item, i) => (
              <div key={i} className="group bg-surface-container-low hover:bg-surface-container-high p-sm rounded-lg border border-transparent hover:border-outline-variant/30 transition-all cursor-pointer">
                <div className="flex items-start gap-sm">
                  {item.img ? (
                    <img alt={item.name} className="w-12 h-12 rounded-lg object-cover" src={item.img} />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center text-tertiary-container">
                      <span className="material-symbols-outlined">restaurant</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-body-md font-body-md font-semibold text-on-background group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-label-md font-label-md text-outline flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> {item.location}
                    </p>
                  </div>
                  <button className="text-primary hover:bg-primary/10 p-1 rounded-full transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="text-label-md font-label-md bg-surface text-on-surface-variant px-2 py-1 rounded-md border border-outline-variant/20">{item.type}</span>
                  <span className={`text-label-md font-label-md px-2 py-1 rounded-md border ${item.statusError ? 'bg-error-container text-on-error-container border-error-container' : 'bg-surface text-on-surface-variant border-outline-variant/20'}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-md w-full py-sm border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors">
            View All Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
