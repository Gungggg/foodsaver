import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts, productCategories, formatCurrency } from '../../utils/mockData';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setTimeout(() => { setProducts(mockProducts); setLoading(false); }, 800);
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.merchant_name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  const getStockBadge = (stock) => {
    if (stock <= 0) return { text: 'Sold Out', cls: 'bg-surface-variant/90 text-on-surface-variant' };
    if (stock <= 2) return { text: `${stock} left today`, cls: 'bg-tertiary-fixed-dim/90 text-on-tertiary-fixed' };
    return { text: `${stock} left today`, cls: 'bg-secondary-fixed/90 text-on-secondary-fixed' };
  };

  return (
    <main className="max-w-container-max mx-auto px-gutter py-md min-h-screen">
      {/* Search & Filter */}
      <div className="mb-lg space-y-md">
        <h1 className="text-headline-lg font-headline-lg text-primary">Discover Rescued Food</h1>
        <div className="flex flex-col md:flex-row gap-sm items-center bg-surface-container-low p-sm rounded-xl shadow-sm">
          <div className="relative w-full md:flex-1">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-xl pr-sm py-sm bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md outline-none placeholder:text-outline"
              placeholder="Search by food type or store..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex w-full md:w-auto gap-sm">
            <button className="flex items-center gap-xs px-sm py-sm bg-surface border border-outline-variant rounded-lg text-body-sm font-body-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>location_on</span>
              Near Me (5km)
            </button>
            <button className="flex items-center gap-xs px-sm py-sm bg-primary text-on-primary rounded-lg text-body-sm font-body-sm whitespace-nowrap hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>map</span>
              Map View
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-sm overflow-x-auto pb-2 hide-scrollbar">
          <button
            onClick={() => setCategory('all')}
            className={`px-md py-xs rounded-full text-label-md font-label-md transition-colors border ${category === 'all' ? 'bg-secondary text-on-secondary border-transparent' : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/30'}`}
          >All</button>
          {(productCategories || ['Bakery', 'Restaurant', 'Grocery', 'Cafe', 'Hotel']).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-md py-xs rounded-full text-label-md font-label-md transition-colors border whitespace-nowrap ${category === cat ? 'bg-secondary text-on-secondary border-transparent' : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/30'}`}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/10 overflow-hidden">
              <div className="h-48 bg-surface-container animate-pulse" />
              <div className="p-md space-y-sm">
                <div className="h-5 bg-surface-container animate-pulse rounded w-3/4" />
                <div className="h-4 bg-surface-container animate-pulse rounded w-1/2" />
                <div className="h-10 bg-surface-container animate-pulse rounded mt-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {filtered.map(product => {
            const badge = getStockBadge(product.stock);
            const isSoldOut = product.stock <= 0;
            return (
              <div key={product.id} className={`bg-surface rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-card-hover transition-all duration-300 group flex flex-col h-full ${isSoldOut ? 'opacity-75' : ''}`}>
                <div className={`relative h-48 overflow-hidden bg-surface-container ${isSoldOut ? 'grayscale-[50%]' : ''}`}>
                  <img
                    alt={product.name}
                    className={`w-full h-full object-cover ${!isSoldOut ? 'group-hover:scale-105' : ''} transition-transform duration-500`}
                    src={product.image || `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop`}
                  />
                  <div className={`absolute top-sm left-sm ${badge.cls} backdrop-blur-sm px-sm py-xs rounded-full text-label-md font-label-md flex items-center gap-xs`}>
                    <span className={`w-2 h-2 rounded-full ${isSoldOut ? 'bg-outline' : 'bg-secondary'}`} />
                    {badge.text}
                  </div>
                  <button className="absolute top-sm right-sm w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-error transition-colors">
                    <span className="material-symbols-outlined" style={{fontSize: '20px'}}>favorite</span>
                  </button>
                </div>
                <div className="p-md flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-xs">
                    <h3 className={`text-headline-sm font-headline-sm ${isSoldOut ? 'text-on-surface-variant' : 'text-primary'} line-clamp-1`}>{product.name}</h3>
                    <div className="flex items-center gap-xs text-secondary font-bold">
                      <span className="material-symbols-outlined" style={{fontSize: '16px'}}>eco</span>
                      <span className="text-label-md font-label-md">{(product.co2_saved || 2.5).toFixed(1)}kg CO₂</span>
                    </div>
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mb-sm">{product.merchant_name} • 1.2km</p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-2 mb-md flex-grow">{product.description}</p>
                  <div className="flex justify-between items-center mt-auto pt-sm border-t border-outline-variant/20">
                    <div className="flex items-baseline gap-xs">
                      <span className={`text-headline-md font-headline-md ${isSoldOut ? 'text-on-surface-variant' : 'text-primary'}`}>{formatCurrency(product.discounted_price)}</span>
                      <span className="text-body-sm font-body-sm text-outline line-through">{formatCurrency(product.original_price)}</span>
                    </div>
                    {isSoldOut ? (
                      <button className="bg-surface-variant text-on-surface-variant px-md py-sm rounded-lg text-label-md font-label-md cursor-not-allowed" disabled>Sold Out</button>
                    ) : (
                      <Link to={`/marketplace/${product.id}`} className="bg-primary hover:bg-primary-container text-on-primary px-md py-sm rounded-lg text-label-md font-label-md transition-colors">
                        Reserve
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-xl text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-md">
            <span className="material-symbols-outlined text-[32px]">search_off</span>
          </div>
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-xs">No bags found</h3>
          <p className="text-body-md font-body-md text-on-surface-variant">Try adjusting your search or filters</p>
        </div>
      )}
    </main>
  );
};

export default Marketplace;
