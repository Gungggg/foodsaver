import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { StatCard, Badge } from '../../components/common';
import { mockOrders, mockImpact, formatCurrency, formatDate, getStatusColor, getStatusLabel } from '../../utils/mockData';
import { HiShoppingBag, HiCurrencyDollar, HiGlobeAlt, HiArrowRight, HiClock, HiSparkles } from 'react-icons/hi';
import { Leaf } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const impact = mockImpact.customer;
  const recentOrders = mockOrders.slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <HiSparkles className="w-5 h-5 text-accent" />
            <span className="text-sm text-white/80">Welcome back!</span>
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2">
            Hello, {user?.name || 'Food Saver'}! 👋
          </h1>
          <p className="text-white/80 mb-6 max-w-lg">
            You've rescued <span className="font-bold text-accent">{impact.total_bags} surprise bags</span> so far. Keep making a difference — every bag counts!
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg"
          >
            Browse Marketplace <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Impact Quick Stats */}
      <div>
        <h2 className="text-lg font-heading font-bold text-neutral-900 mb-4">Your Impact</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Leaf}
            label="Food Saved"
            value={impact.food_saved_kg}
            suffix=" kg"
            color="secondary"
          />
          <StatCard
            icon={HiGlobeAlt}
            label="CO₂ Prevented"
            value={impact.co2_prevented_kg}
            suffix=" kg"
            color="primary"
          />
          <StatCard
            icon={HiCurrencyDollar}
            label="Money Saved"
            value={impact.money_saved}
            prefix="Rp "
            color="accent"
          />
          <StatCard
            icon={HiShoppingBag}
            label="Bags Rescued"
            value={impact.total_bags}
            color="info"
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold text-neutral-900">Recent Orders</h2>
          <Link to="/customer/orders" className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1">
            View All <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="card hover:shadow-card-hover transition-all duration-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 truncate">{order.product_name}</p>
                  <p className="text-sm text-neutral-500">{order.merchant_name}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge color={getStatusColor(order.status)} dot>
                  {getStatusLabel(order.status)}
                </Badge>
                <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1 justify-end">
                  <HiClock className="w-3.5 h-3.5" />
                  {formatDate(order.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Eco Tip */}
      <div className="card bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🌍</span>
          <div>
            <h3 className="font-heading font-bold text-neutral-900 mb-1">Eco Tip of the Day</h3>
            <p className="text-sm text-neutral-600">
              By rescuing {impact.total_bags} bags, you've saved the equivalent of {impact.trees_equivalent} trees worth of CO₂ emissions.
              That's like driving {Math.round(impact.co2_prevented_kg * 4)} km less in a car! 🚗💨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
