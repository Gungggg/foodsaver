import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Skeleton } from '../../components/common';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { mockProducts, formatCurrency } from '../../utils/mockData';
import { HiArrowLeft, HiStar, HiClock, HiLocationMarker, HiShoppingCart, HiShieldCheck, HiMinus, HiPlus } from 'react-icons/hi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      const found = mockProducts.find(p => p.id === id) || mockProducts[0];
      setProduct(found);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleReserve = () => {
    if (!isAuthenticated) {
      toast.warning('Please log in to reserve a bag');
      navigate('/login');
      return;
    }
    toast.success('Bag reserved! Redirecting to checkout...');
    navigate(`/checkout/ord_new_${Date.now()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <Skeleton className="h-96 rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary mb-6 transition-colors">
          <HiArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-card-lg">
              <img src={product.image} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
              <div className="absolute top-4 right-4 bg-accent text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                Save {product.discount_percentage}%
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge color="primary">{product.category}</Badge>
                {product.stock <= 3 && <Badge color="error" dot>Low stock</Badge>}
              </div>
              <h1 className="font-heading font-bold text-3xl text-neutral-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <span className="flex items-center gap-1">
                  <HiStar className="w-4 h-4 text-accent" /> {product.merchant_rating}
                </span>
                <span>•</span>
                <span>{product.merchant_name}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-accent/5 to-secondary/5 rounded-xl p-5">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-neutral-400 line-through text-lg">{formatCurrency(product.original_price)}</span>
                  <span className="block text-3xl font-heading font-bold text-accent">{formatCurrency(product.discounted_price)}</span>
                </div>
                <div className="bg-accent text-white rounded-xl px-4 py-2 text-center">
                  <span className="text-2xl font-bold">{product.discount_percentage}%</span>
                  <span className="block text-xs">OFF</span>
                </div>
              </div>
              <p className="text-sm text-secondary-dark mt-2 font-medium">
                💰 You save {formatCurrency(product.original_price - product.discounted_price)} per bag
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">About this bag</h3>
              <p className="text-neutral-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Pickup Info */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HiClock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Pickup Window</p>
                  <p className="text-sm text-neutral-500">{product.pickup_date}, {product.pickup_start} - {product.pickup_end}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HiLocationMarker className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{product.merchant_name}</p>
                  <p className="text-sm text-neutral-500">Show on map</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <HiShieldCheck className="w-5 h-5 text-secondary-dark" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Quality Guaranteed</p>
                  <p className="text-sm text-neutral-500">Full refund if not satisfied</p>
                </div>
              </div>
            </div>

            {/* Quantity + Reserve */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-neutral-100 transition-colors">
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 font-semibold border-x border-neutral-300 min-w-[50px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-3 hover:bg-neutral-100 transition-colors">
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>
              <Button onClick={handleReserve} size="lg" className="flex-1" icon={HiShoppingCart}>
                Reserve Now — {formatCurrency(product.discounted_price * quantity)}
              </Button>
            </div>

            <p className="text-xs text-neutral-400 text-center">
              {product.stock} bags remaining · {product.pickup_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
