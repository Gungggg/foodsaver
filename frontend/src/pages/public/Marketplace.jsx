import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../components/common';
import { mockProducts, productCategories, formatCurrency } from '../../utils/mockData';
import { HiSearch, HiAdjustments, HiLocationMarker, HiStar, HiX } from 'react-icons/hi';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.merchant_name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      const matchPrice = p.discounted_price >= priceRange[0] && p.discounted_price <= priceRange[1];
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, search, category, priceRange]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-2">Marketplace</h1>
          <p className="text-white/70">Discover surplus food bags near you</p>

          {/* Search */}
          <div className="mt-6 flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search bags, restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 backdrop-blur text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-white/20 backdrop-blur text-white rounded-xl hover:bg-white/30 transition-colors lg:hidden"
            >
              <HiAdjustments className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform lg:static lg:z-auto lg:transform-none lg:w-64 lg:shrink-0
            ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            shadow-xl lg:shadow-none overflow-y-auto
          `}>
            <div className="p-6 lg:p-0">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-heading font-semibold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}><HiX className="w-5 h-5" /></button>
              </div>

              <div className="bg-white rounded-card shadow-card p-5 space-y-6 lg:sticky lg:top-24">
                <div>
                  <h4 className="font-heading font-semibold text-sm text-neutral-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {productCategories.map(cat => (
                      <label key={cat.value} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={category === cat.value}
                          onChange={() => setCategory(cat.value)}
                          className="w-4 h-4 text-primary focus:ring-primary border-neutral-300"
                        />
                        <span className="text-sm text-neutral-600 group-hover:text-primary transition-colors">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm text-neutral-900 mb-3">Max Price</h4>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>Rp 10k</span>
                    <span className="font-medium text-primary">{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-900">{filtered.length}</span> bags found
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {showFilters && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setShowFilters(false)} />}

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <Skeleton variant="product" count={8} />
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="font-heading font-semibold text-xl text-neutral-700 mb-2">No bags found</h3>
                <p className="text-neutral-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <Link key={product.id} to={`/marketplace/${product.id}`} className="group">
                    <div className="bg-white rounded-card shadow-card overflow-hidden card-hover h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          -{product.discount_percentage}%
                        </div>
                        {product.stock <= 3 && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            🔥 {product.stock} left
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-neutral-500">{product.merchant_name}</span>
                          <div className="flex items-center gap-0.5">
                            <HiStar className="w-3 h-3 text-accent" />
                            <span className="text-xs text-neutral-500">{product.merchant_rating}</span>
                          </div>
                        </div>
                        <h3 className="font-heading font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mb-3 line-clamp-2 flex-1">{product.description}</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="price-original text-xs">{formatCurrency(product.original_price)}</span>
                            <span className="price-tag text-xl block">{formatCurrency(product.discounted_price)}</span>
                          </div>
                          <div className="text-right">
                            <span className={`badge text-xs ${product.stock > 5 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-error'}`}>
                              {product.stock} left
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                          <HiLocationMarker className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Pick up {product.pickup_start} - {product.pickup_end}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
