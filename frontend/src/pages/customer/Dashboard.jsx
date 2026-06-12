import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders, formatCurrency } from '../../utils/mockData';

const CustomerDashboard = () => {
  const [stats, setStats] = useState({ orders: 0, saved: 0, co2: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({ orders: 12, saved: 360000, co2: 30 });
      setRecentOrders(mockOrders?.slice(0, 3) || []);
    }, 500);
  }, []);

  const metrics = [
    { title: 'Total Orders', value: stats.orders, icon: 'shopping_bag', trend: '+3 this month', variant: 'primary' },
    { title: 'Money Saved', value: formatCurrency(stats.saved), icon: 'savings', trend: '+12%', variant: 'secondary' },
    { title: 'CO₂ Prevented', value: `${stats.co2}kg`, icon: 'eco', trend: '+15%', variant: 'tertiary' },
  ];

  const statusBadge = (status) => {
    const map = {
      completed: 'bg-secondary-container text-on-secondary-container',
      pending: 'bg-tertiary-fixed text-on-tertiary-fixed',
      cancelled: 'bg-error-container text-on-error-container',
      confirmed: 'bg-primary-fixed text-on-primary-fixed',
    };
    return map[status] || 'bg-surface-container text-on-surface-variant';
  };

  return (
    <div className="space-y-lg animate-fade-in">
      <div>
        <h2 className="text-headline-lg font-headline-lg text-on-background">Dashboard</h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-xs">Welcome back! Here's your food rescue summary.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {metrics.map((m, i) => (
          <div key={i} className="bg-surface-container-lowest p-md rounded-xl shadow-card flex flex-col justify-between border border-outline-variant/10 relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${i === 0 ? 'bg-primary-fixed/20' : i === 1 ? 'bg-secondary-fixed/20' : 'bg-tertiary-fixed/20'} rounded-full blur-2xl`} />
            <div className="flex justify-between items-start mb-lg relative z-10">
              <div className={`w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center ${i === 0 ? 'text-primary' : i === 1 ? 'text-secondary' : 'text-tertiary'}`}>
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

      {/* Quick Actions + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        {/* Quick Actions */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 p-md">
          <h3 className="text-headline-sm font-headline-sm text-on-background mb-md">Quick Actions</h3>
          <div className="space-y-sm">
            {[
              { to: '/marketplace', icon: 'storefront', label: 'Browse Marketplace', desc: 'Find surprise bags near you' },
              { to: '/customer/orders', icon: 'receipt_long', label: 'View Orders', desc: 'Check your order history' },
              { to: '/customer/impact', icon: 'eco', label: 'My Impact', desc: 'See your environmental impact' },
            ].map((a, i) => (
              <Link key={i} to={a.to} className="group flex items-center gap-sm p-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high border border-transparent hover:border-outline-variant/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined">{a.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-md font-body-md font-semibold text-on-background group-hover:text-primary transition-colors">{a.label}</p>
                  <p className="text-label-md font-label-md text-outline">{a.desc}</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 p-md">
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-headline-sm font-headline-sm text-on-background">Recent Orders</h3>
            <Link to="/customer/orders" className="text-primary text-label-md font-label-md hover:text-surface-tint flex items-center gap-xs">
              View all <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="space-y-sm">
            {recentOrders.length > 0 ? recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </div>
                  <div>
                    <p className="text-body-md font-body-md font-semibold text-on-background">{order.product_name || 'Surprise Bag'}</p>
                    <p className="text-label-md font-label-md text-outline">{order.merchant_name || 'Local Merchant'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-body-md font-body-md font-semibold text-on-background">{formatCurrency(order.total_price || 25000)}</p>
                  <span className={`inline-flex text-label-md font-label-md px-2 py-0.5 rounded-full ${statusBadge(order.status)}`}>{order.status}</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-lg">
                <span className="material-symbols-outlined text-[48px] text-outline mb-sm block">inbox</span>
                <p className="text-body-md font-body-md text-on-surface-variant">No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
