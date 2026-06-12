import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(end);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return [count, ref];
};

const Landing = () => {
  const [co2Count, co2Ref] = useCountUp(1452890);

  const featuredBags = [
    { name: 'Green Earth Bakery', desc: 'Assorted breads and pastries from today\'s bake.', price: '$4.99', co2: '2.5', stock: '3 left', stockColor: 'bg-secondary-fixed/90 text-on-secondary-fixed', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop' },
    { name: 'Fresh Bowl Co.', desc: 'Signature salad bases and fresh toppings.', price: '$5.50', co2: '1.8', stock: 'Sold Out', stockColor: 'bg-surface-container-high/90 text-outline', soldOut: true, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' },
    { name: 'Luigi\'s Pizzeria', desc: 'End of day slices, mostly vegetarian options.', price: '$3.99', co2: '3.0', stock: 'Expiring Soon', stockColor: 'bg-tertiary-fixed-dim/90 text-on-tertiary-fixed', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
    { name: 'Sweet Tooth Cafe', desc: 'Surprise mix of daily cakes and tarts.', price: '$6.50', co2: '1.5', stock: '5 left', stockColor: 'bg-secondary-fixed/90 text-on-secondary-fixed', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative px-gutter py-xl md:py-[120px] max-w-container-max mx-auto w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center relative z-10">
          <div className="flex flex-col items-start gap-md">
            <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full text-label-md font-label-md">
              <span className="material-symbols-outlined text-[16px]">eco</span>
              Over 50,000 meals rescued
            </div>
            <h1 className="text-display-lg font-display-lg text-primary max-w-[600px] leading-tight">
              Save Food, <br/>Save the Planet.
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-[500px]">
              Join the movement to rescue delicious, unsold food from local eateries before it goes to waste. Good for your wallet, great for the earth.
            </p>
            <div className="flex flex-wrap gap-sm mt-sm">
              <Link to="/marketplace" className="bg-primary text-on-primary px-lg py-sm rounded-lg text-body-md font-body-md font-semibold shadow-btn hover:opacity-90 transition-opacity flex items-center gap-2">
                Browse Marketplace
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-sm h-[400px] md:h-[500px]">
            <img alt="Fresh food" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600&fit=crop" />
            <div className="absolute bottom-md left-md right-md bg-surface/90 backdrop-blur-sm p-md rounded-lg shadow-sm border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>restaurant</span>
                </div>
                <div>
                  <p className="text-body-md font-body-md font-semibold text-primary">Green Earth Bakery</p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">Just listed 3 Surprise Bags</p>
                </div>
              </div>
              <span className="bg-secondary-fixed text-on-secondary-fixed px-sm py-xs rounded-full text-label-md font-label-md">Available</span>
            </div>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-surface-container-low rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 -translate-x-1/3 translate-y-1/4" />
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-surface-container-lowest py-xl">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-xl">
            <h2 className="text-headline-lg font-headline-lg text-primary mb-sm">How it works</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">Three simple steps to fight food waste and enjoy delicious local food at a fraction of the price.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              { icon: 'search', title: '1. Find a Bag', desc: 'Browse the map to discover unsold surplus food from nearby restaurants and stores.', color: 'bg-primary-container text-on-primary-container', hoverColor: 'group-hover:bg-primary' },
              { icon: 'shopping_cart_checkout', title: '2. Reserve & Pay', desc: 'Secure your Surprise Bag right in the app. Payment is quick, safe, and entirely cashless.', color: 'bg-secondary-container text-on-secondary-container', hoverColor: 'group-hover:bg-secondary', offset: true },
              { icon: 'directions_walk', title: '3. Pickup & Enjoy', desc: 'Head to the store during the pickup window, show your receipt, and enjoy your food!', color: 'bg-tertiary-fixed text-on-tertiary-fixed', hoverColor: 'group-hover:bg-tertiary' },
            ].map((step, i) => (
              <div key={i} className={`flex flex-col items-center text-center p-md bg-surface rounded-xl shadow-sm border border-outline-variant/20 relative overflow-hidden group ${step.offset ? 'mt-0 md:mt-lg' : ''}`}>
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-md group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-[32px]">{step.icon}</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-primary mb-sm">{step.title}</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">{step.desc}</p>
                <div className={`absolute top-0 left-0 w-full h-1 bg-surface-container-high ${step.hoverColor} transition-colors duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SURPLUS BAGS ===== */}
      <section className="py-xl px-gutter max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-lg">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-primary mb-xs">Featured Surplus Bags</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant">Grab these before they're gone</p>
          </div>
          <Link to="/marketplace" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:text-surface-tint transition-colors">
            View all <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          {featuredBags.map((bag, i) => (
            <div key={i} className={`bg-surface rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300 ${i === 3 ? 'hidden lg:flex' : ''}`}>
              <div className="relative h-48">
                <img alt={bag.name} className="w-full h-full object-cover" src={bag.img} />
                <div className={`absolute top-sm right-sm ${bag.stockColor} backdrop-blur-sm px-sm py-xs rounded-full text-label-md font-label-md shadow-sm`}>
                  {bag.stock}
                </div>
              </div>
              <div className="p-md flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="text-headline-sm font-headline-sm text-primary leading-tight">{bag.name}</h3>
                  <div className={`bg-surface-container text-on-surface-variant px-2 py-1 rounded text-label-md font-label-md shrink-0 ${bag.soldOut ? 'line-through opacity-60' : ''}`}>
                    {bag.price}
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mb-md flex-grow">{bag.desc}</p>
                <div className="flex items-center gap-xs text-primary-container text-body-sm font-body-sm mb-md bg-surface-container-low px-sm py-xs rounded-lg inline-flex self-start">
                  <span className="material-symbols-outlined text-[16px]">co2</span>
                  <span>{bag.co2}kg CO2 saved</span>
                </div>
                <button className={`w-full py-sm rounded-lg text-body-md font-body-md font-semibold transition-opacity ${bag.soldOut ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' : 'bg-primary text-on-primary hover:opacity-90'}`} disabled={bag.soldOut}>
                  {bag.soldOut ? 'Unavailable' : 'Reserve Bag'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/marketplace" className="md:hidden mt-md w-full py-sm border border-outline text-primary font-semibold rounded-lg hover:bg-surface-container-low transition-colors block text-center">
          View all bags
        </Link>
      </section>

      {/* ===== IMPACT TICKER ===== */}
      <section className="bg-primary text-on-primary py-xl my-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}} />
        <div className="max-w-container-max mx-auto px-gutter text-center relative z-10">
          <h2 className="text-headline-md font-headline-md text-primary-fixed mb-lg">Our Collective Impact</h2>
          <div className="flex flex-col items-center justify-center" ref={co2Ref}>
            <div className="text-[64px] leading-none font-display-lg text-secondary-fixed font-bold mb-sm tracking-tight drop-shadow-md">
              {co2Count.toLocaleString()}
            </div>
            <p className="text-headline-sm font-headline-sm text-inverse-on-surface">Kilograms of CO2 emissions prevented</p>
          </div>
          <div className="mt-lg max-w-xl mx-auto w-full">
            <div className="flex justify-between text-body-sm font-body-sm text-primary-fixed-dim mb-xs">
              <span>Milestone Progress</span>
              <span>72% to 2M kg Goal</span>
            </div>
            <div className="h-3 w-full bg-primary-fixed-dim/30 rounded-full overflow-hidden">
              <div className="h-full bg-secondary-fixed w-[72%] rounded-full shadow-[0_0_10px_rgba(164,247,146,0.5)]" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MERCHANT CTA ===== */}
      <section className="py-xl px-gutter max-w-container-max mx-auto mb-xl">
        <div className="bg-surface-container-low rounded-2xl p-lg md:p-xl flex flex-col md:flex-row items-center justify-between gap-lg border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="max-w-lg relative z-10">
            <h2 className="text-headline-lg font-headline-lg text-primary mb-sm">Are you a restaurant owner?</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-md">
              Join the mission. Turn your daily surplus into revenue, reach new local customers, and actively reduce your environmental footprint.
            </p>
            <ul className="space-y-sm mb-lg">
              {['Zero upfront costs', 'Reach eco-conscious diners', 'Simple dashboard management'].map((item, i) => (
                <li key={i} className="flex items-center gap-sm text-body-md font-body-md text-on-surface">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/register" className="bg-on-surface text-surface py-sm px-lg rounded-lg text-body-md font-body-md font-semibold hover:opacity-90 transition-opacity inline-block">
              Join the mission
            </Link>
          </div>
          <div className="w-full max-w-sm relative z-10">
            <div className="bg-surface/80 backdrop-blur-md rounded-xl shadow-md border border-outline-variant/30 p-md transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-sm mb-md pb-sm border-b border-outline-variant/20">
                <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                </div>
                <span className="text-label-md font-label-md text-primary">Merchant Portal</span>
              </div>
              <div className="space-y-sm">
                <div className="h-16 bg-surface-container rounded-lg p-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Today's Revenue</span>
                    <span className="text-headline-sm font-headline-sm text-primary">$124.50</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary-container">trending_up</span>
                </div>
                <div className="h-16 bg-surface-container rounded-lg p-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Bags Sold</span>
                    <span className="text-headline-sm font-headline-sm text-primary">18</span>
                  </div>
                  <span className="material-symbols-outlined text-primary-container">shopping_bag</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
