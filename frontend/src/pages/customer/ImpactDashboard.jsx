import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, dur = 2000) => {
  const [c, setC] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const st = performance.now();
        const tick = (now) => {
          const p = Math.min((now - st) / dur, 1);
          setC(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(tick); else setC(end);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, dur]);
  return [c, ref];
};

const ImpactDashboard = () => {
  const [meals, mealsRef] = useCountUp(42);
  const [co2, co2Ref] = useCountUp(126);
  const [saved, savedRef] = useCountUp(840000);

  const milestones = [
    { title: 'First Rescue', desc: 'Saved your first meal', date: 'Jan 15, 2024', done: true },
    { title: '10 Meals', desc: 'Rescued 10 meals', date: 'Mar 2, 2024', done: true },
    { title: '25 Meals', desc: 'Quarter century of rescues', date: 'Jun 10, 2024', done: true },
    { title: '50 Meals', desc: 'Half century milestone', date: '', done: false },
    { title: '100 Meals', desc: 'Century club member', date: '', done: false },
  ];

  return (
    <div className="space-y-lg animate-fade-in">
      <div>
        <h2 className="text-headline-lg font-headline-lg text-on-background">My Impact</h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-xs">Track your contribution to fighting food waste.</p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div ref={mealsRef} className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-md relative z-10">
            <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined text-[28px]">restaurant</span>
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-label-md font-label-md text-on-surface-variant mb-xs">Meals Rescued</p>
            <p className="text-display-lg font-display-lg text-primary">{meals}</p>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-xs">meals saved from going to waste</p>
          </div>
        </div>

        <div ref={co2Ref} className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-fixed/20 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-md relative z-10">
            <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[28px]">eco</span>
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-label-md font-label-md text-on-surface-variant mb-xs">CO₂ Prevented</p>
            <p className="text-display-lg font-display-lg text-secondary">{co2} kg</p>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-xs">equivalent to planting 6 trees</p>
          </div>
        </div>

        <div ref={savedRef} className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed/20 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-md relative z-10">
            <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[28px]">savings</span>
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-label-md font-label-md text-on-surface-variant mb-xs">Money Saved</p>
            <p className="text-display-lg font-display-lg text-tertiary">Rp {(saved / 1000).toFixed(0)}K</p>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-xs">compared to original prices</p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 p-md">
        <h3 className="text-headline-sm font-headline-sm text-on-background mb-md">Milestones</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-outline-variant/30" />
          <div className="space-y-md">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-md relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${m.done ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-outline border border-outline-variant/30'}`}>
                  <span className="material-symbols-outlined" style={m.done ? {fontVariationSettings: "'FILL' 1"} : {}}>{m.done ? 'check_circle' : 'radio_button_unchecked'}</span>
                </div>
                <div className={`flex-1 ${!m.done ? 'opacity-50' : ''}`}>
                  <h4 className="text-body-md font-body-md font-semibold text-on-background">{m.title}</h4>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">{m.desc}</p>
                  {m.date && <p className="text-label-md font-label-md text-outline mt-xs">{m.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Equivalents */}
      <div className="bg-primary text-on-primary rounded-xl p-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}} />
        <div className="relative z-10 text-center">
          <h3 className="text-headline-md font-headline-md text-primary-fixed mb-md">Your Impact Equivalents</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            {[
              { icon: 'park', value: '6', label: 'Trees planted' },
              { icon: 'directions_car', value: '315', label: 'KM of driving offset' },
              { icon: 'water_drop', value: '4,200', label: 'Liters of water saved' },
              { icon: 'energy_savings_leaf', value: '168', label: 'kWh of energy saved' },
            ].map((eq, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-sm">
                  <span className="material-symbols-outlined text-[28px]">{eq.icon}</span>
                </div>
                <p className="text-headline-md font-headline-md text-secondary-fixed">{eq.value}</p>
                <p className="text-body-sm font-body-sm text-on-primary/80">{eq.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
