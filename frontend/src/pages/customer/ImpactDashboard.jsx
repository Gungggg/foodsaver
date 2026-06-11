import { StatCard } from '../../components/common';
import { mockImpact } from '../../utils/mockData';
import { HiGlobeAlt, HiCurrencyDollar, HiShoppingBag, HiShare, HiHeart, HiSparkles } from 'react-icons/hi';

const ImpactDashboard = () => {
  const impact = mockImpact.customer;

  const equivalences = [
    { icon: '🌳', label: 'Trees Equivalent', value: impact.trees_equivalent, suffix: ' trees', desc: 'CO₂ absorbed by trees annually' },
    { icon: '🍽️', label: 'Meals Rescued', value: impact.meals_rescued, suffix: ' meals', desc: 'That would have been wasted' },
    { icon: '💧', label: 'Water Saved', value: impact.water_saved_liters, suffix: ' L', desc: 'Water used in food production' },
    { icon: '🚗', label: 'Km Not Driven', value: Math.round(impact.co2_prevented_kg * 4), suffix: ' km', desc: 'Equivalent car emissions avoided' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-primary to-primary-dark p-8 text-white">
        <div className="absolute top-4 right-4 text-8xl opacity-10">🌍</div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <HiSparkles className="w-8 h-8 mb-3 text-secondary-light" />
          <h1 className="text-3xl font-heading font-bold mb-2">Your Environmental Impact</h1>
          <p className="text-white/80 max-w-lg">
            Every Surprise Bag you rescue makes a real difference. Here's the positive impact you've created so far!
          </p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiSparkles} label="Food Saved" value={impact.food_saved_kg} suffix=" kg" color="secondary" />
        <StatCard icon={HiGlobeAlt} label="CO₂ Prevented" value={impact.co2_prevented_kg} suffix=" kg" color="primary" />
        <StatCard icon={HiCurrencyDollar} label="Money Saved" value={impact.money_saved} prefix="Rp " color="accent" />
        <StatCard icon={HiShoppingBag} label="Bags Rescued" value={impact.total_bags} color="info" />
      </div>

      {/* Progress Section */}
      <div className="card">
        <h2 className="text-lg font-heading font-bold text-neutral-900 mb-6">Your Journey to 25 Bags 🎯</h2>
        <div className="relative">
          <div className="w-full bg-neutral-100 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((impact.total_bags / 25) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-neutral-500">{impact.total_bags} bags rescued</span>
            <span className="font-medium text-primary">{25 - impact.total_bags} more to go!</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[5, 10, 15, 20, 25].map((milestone) => (
            <div
              key={milestone}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                impact.total_bags >= milestone
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {impact.total_bags >= milestone ? '✅' : '🔒'} {milestone} bags
            </div>
          ))}
        </div>
      </div>

      {/* Equivalence Cards */}
      <div>
        <h2 className="text-lg font-heading font-bold text-neutral-900 mb-4">What Your Impact Means</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equivalences.map((eq) => (
            <div key={eq.label} className="card text-center group hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{eq.icon}</span>
              <p className="text-2xl font-bold text-neutral-900">
                {eq.value.toLocaleString()}{eq.suffix}
              </p>
              <p className="font-medium text-neutral-700 text-sm mt-1">{eq.label}</p>
              <p className="text-xs text-neutral-400 mt-1">{eq.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <HiHeart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-neutral-900 mb-1">Spread the Word!</h3>
            <p className="text-sm text-neutral-600">
              Share your impact with friends and inspire them to join the food-saving movement.
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2 flex-shrink-0">
            <HiShare className="w-4 h-4" /> Share My Impact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
