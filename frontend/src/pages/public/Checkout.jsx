import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/common';
import { useToast } from '../../components/common/Toast';
import { mockProducts, formatCurrency } from '../../utils/mockData';
import { HiCheckCircle, HiShieldCheck, HiClock } from 'react-icons/hi';

const Checkout = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const product = mockProducts[0];

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
      toast.success('Payment successful! 🎉');
    }, 2000);
  };

  if (paid) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-card-lg p-10 animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiCheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="font-heading font-bold text-2xl mb-2">Payment Successful!</h1>
            <p className="text-neutral-500 mb-6">Your order has been confirmed. Show the pickup code at the store.</p>

            <div className="bg-neutral-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-neutral-500 mb-1">Pickup Code</p>
              <p className="font-heading font-bold text-3xl text-primary tracking-wider">FSV-A1B2C3</p>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Order</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Pickup</span>
                <span className="font-medium">{product.pickup_start} - {product.pickup_end}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Total Paid</span>
                <span className="font-bold text-primary">{formatCurrency(product.discounted_price)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/customer/orders" className="flex-1">
                <Button variant="primary" fullWidth>View Orders</Button>
              </Link>
              <Link to="/marketplace" className="flex-1">
                <Button variant="outline" fullWidth>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-heading font-bold text-3xl mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="font-heading font-semibold text-lg mb-4">Order Summary</h2>
              <div className="flex gap-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                  <p className="text-sm text-neutral-500">{product.merchant_name}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <HiClock className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-500">Pickup: {product.pickup_start} - {product.pickup_end}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="price-original text-xs">{formatCurrency(product.original_price)}</span>
                  <span className="price-tag text-lg block">{formatCurrency(product.discounted_price)}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="font-heading font-semibold text-lg mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['GoPay', 'OVO', 'DANA', 'Bank Transfer'].map((method, i) => (
                  <button
                    key={method}
                    className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${i === 0 ? 'border-primary bg-primary/5 text-primary' : 'border-neutral-200 text-neutral-600 hover:border-primary/50'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Payment Card */}
          <div>
            <Card className="sticky top-24">
              <h2 className="font-heading font-semibold text-lg mb-4">Payment Details</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>{formatCurrency(product.original_price)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(product.original_price - product.discounted_price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Service fee</span>
                  <span>{formatCurrency(2000)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 flex justify-between font-heading font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(product.discounted_price + 2000)}</span>
                </div>
              </div>

              <Button onClick={handlePayment} fullWidth size="lg" loading={loading}>
                Pay {formatCurrency(product.discounted_price + 2000)}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <HiShieldCheck className="w-4 h-4" />
                <span>Secured by Midtrans</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
