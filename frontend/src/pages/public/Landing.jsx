import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Button } from '../../components/common';
import { mockProducts, mockTestimonials, mockImpact, formatCurrency } from '../../utils/mockData';
import { HiArrowRight, HiSearch, HiShoppingBag, HiLocationMarker, HiStar, HiCheckCircle } from 'react-icons/hi';

// Animated counter hook
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
  const impact = mockImpact.platform;
  const [foodCount, foodRef] = useCountUp(impact.food_saved_kg);
  const [co2Count, co2Ref] = useCountUp(impact.co2_prevented_kg);
  const [usersCount, usersRef] = useCountUp(impact.total_users);
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Floating shapes */}
        <div className="floating-shape w-72 h-72 top-10 -right-20 animate-float" />
        <div className="floating-shape w-96 h-96 -bottom-20 -left-32 animate-float-slow" />
        <div className="floating-shape w-48 h-48 top-1/3 right-1/4 animate-float-slower" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(116,195,101,0.15),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/90 border border-white/10">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Join 8,500+ food rescuers
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
                Rescue Food,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">
                  Save Money
                </span>
                <br />& the Planet 🌍
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                Get surprise bags of surplus food from local restaurants and stores
                at up to <span className="text-accent font-semibold">60% off</span>.
                Less waste, more taste.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace">
                  <Button variant="accent" size="xl" className="shadow-lg shadow-accent/20">
                    Browse Food Bags <HiArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost" size="xl" className="text-white border border-white/20 hover:bg-white/10 hover:text-white">
                    Become a Partner
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {['😊', '🥰', '😄', '🤩'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-lg border-2 border-white/30">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <HiStar key={i} className="w-4 h-4 text-accent" />)}
                  </div>
                  <p className="text-white/60 text-sm">Loved by 8,500+ users</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main card */}
                <div className="glass rounded-3xl p-6 shadow-card-lg animate-float">
                  <div className="rounded-2xl overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=350&fit=crop"
                      alt="Delicious food"
                      className="w-full h-56 object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-neutral-900">Surprise Delight Bag</h3>
                    <p className="text-sm text-neutral-500">Green Plate Bistro</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-neutral-400 line-through text-sm">Rp 85.000</span>
                        <span className="text-accent font-bold text-xl ml-2">Rp 35.000</span>
                      </div>
                      <span className="bg-secondary/10 text-secondary-dark text-xs font-bold px-3 py-1 rounded-full">-59%</span>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-lg animate-bounce-soft">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <p className="text-xs text-neutral-500">CO₂ Saved</p>
                      <p className="font-bold text-primary text-sm">2.5 kg</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-lg animate-float-slow">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-xs text-neutral-500">You Save</p>
                      <p className="font-bold text-accent text-sm">Rp 50.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 40C672 50 768 70 864 75C960 80 1056 70 1152 60C1248 50 1344 40 1392 35L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Simple & Easy</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              How FoodSaver Works
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              Three simple steps to rescue delicious food and make a positive impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <HiSearch className="w-8 h-8" />, title: 'Browse & Discover', desc: 'Find surprise bags from nearby restaurants, bakeries, and stores at up to 60% off.' },
              { step: '02', icon: <HiShoppingBag className="w-8 h-8" />, title: 'Reserve & Pay', desc: 'Reserve your favorite bag and pay securely. Quick and hassle-free checkout.' },
              { step: '03', icon: <HiLocationMarker className="w-8 h-8" />, title: 'Pick Up & Enjoy', desc: 'Collect your surprise bag during the pickup window. Enjoy delicious food!' },
            ].map((item, index) => (
              <div key={index} className="relative bg-white rounded-card p-8 shadow-card card-hover text-center group">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-sm">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mt-4 mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg mb-3 text-neutral-900">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT COUNTER ===== */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(116,195,101,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Impact</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-white">
              Together, We're Making a Difference
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {[
              { ref: foodRef, value: foodCount, suffix: ' kg', label: 'Food Rescued', icon: '🍱' },
              { ref: co2Ref, value: co2Count, suffix: ' kg', label: 'CO₂ Prevented', icon: '🌿' },
              { ref: usersRef, value: usersCount, suffix: '+', label: 'Happy Users', icon: '😊' },
              { ref: null, value: impact.total_merchants, suffix: '+', label: 'Partner Merchants', icon: '🏪' },
            ].map((item, index) => (
              <div key={index} ref={item.ref} className="text-center">
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <p className="counter-value text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                  {item.value?.toLocaleString()}{item.suffix}
                </p>
                <p className="text-white/60 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED BAGS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Today's Picks</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-neutral-900">
                Available Now 🔥
              </h2>
            </div>
            <Link to="/marketplace" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:text-primary-light transition-colors">
              View All <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/marketplace/${product.id}`} className="group">
                <div className="bg-white rounded-card shadow-card overflow-hidden card-hover">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{product.discount_percentage}%
                    </div>
                    {product.stock <= 3 && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        Only {product.stock} left!
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 mb-1">{product.merchant_name}</p>
                    <h3 className="font-heading font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="price-original">{formatCurrency(product.original_price)}</span>
                        <span className="price-tag text-lg ml-1.5">{formatCurrency(product.discounted_price)}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                      <HiLocationMarker className="w-3.5 h-3.5" />
                      <span>Pick up {product.pickup_start} - {product.pickup_end}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/marketplace">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              What Our Community Says
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-card p-8 shadow-card card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <HiStar key={i} className={`w-4 h-4 ${i <= t.rating ? 'text-accent' : 'text-neutral-200'}`} />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
        <div className="floating-shape w-64 h-64 -top-32 -right-16 animate-float" />
        <div className="floating-shape w-48 h-48 -bottom-24 -left-12 animate-float-slow" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of food rescuers making a difference. Every bag saves food, money, and the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="accent" size="xl" className="shadow-lg shadow-accent/30">
                Get Started Free <HiArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="ghost" size="xl" className="text-white border border-white/20 hover:bg-white/10 hover:text-white">
                Explore Marketplace
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-white/60 text-sm">
            <span className="flex items-center gap-1"><HiCheckCircle className="w-4 h-4 text-secondary" /> Free to join</span>
            <span className="flex items-center gap-1"><HiCheckCircle className="w-4 h-4 text-secondary" /> No commitment</span>
            <span className="flex items-center gap-1"><HiCheckCircle className="w-4 h-4 text-secondary" /> Instant access</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
