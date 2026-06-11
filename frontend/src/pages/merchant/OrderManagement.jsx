import { useState } from 'react';
import { Badge, EmptyState } from '../../components/common';
import { mockMerchantOrders, formatCurrency, formatDateTime, getStatusColor, getStatusLabel, orderStatuses } from '../../utils/mockData';
import { HiFilter, HiClock, HiUser, HiShoppingBag } from 'react-icons/hi';

const OrderManagement = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? mockMerchantOrders : mockMerchantOrders.filter(o => o.status === filter);

  const statusCounts = {
    all: mockMerchantOrders.length,
    pending: mockMerchantOrders.filter(o => o.status === 'pending').length,
    confirmed: mockMerchantOrders.filter(o => o.status === 'confirmed').length,
    picked_up: mockMerchantOrders.filter(o => o.status === 'picked_up').length,
    cancelled: mockMerchantOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Order Management</h1>
        <p className="text-neutral-500 text-sm mt-1">{mockMerchantOrders.length} total orders</p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {orderStatuses.map(s => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === s.value
                ? 'bg-primary text-white shadow-md'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {s.label} ({statusCounts[s.value] || 0})
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <EmptyState icon="📋" title="No orders" description="No orders match this filter." />
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="card hover:shadow-card-hover transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-neutral-400">{order.order_number}</span>
                    <Badge color={getStatusColor(order.status)} dot>{getStatusLabel(order.status)}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-neutral-600">
                      <HiUser className="w-4 h-4 text-neutral-400" /> {order.customer_name}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-600">
                      <HiShoppingBag className="w-4 h-4 text-neutral-400" /> {order.product_name} × {order.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-neutral-500">
                      <HiClock className="w-3.5 h-3.5" /> Pickup: {order.pickup_time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <p className="text-lg font-bold text-neutral-900">{formatCurrency(order.total_price)}</p>
                  {order.status === 'confirmed' && (
                    <div className="bg-primary/5 px-3 py-1.5 rounded-lg">
                      <p className="text-xs text-neutral-500">Pickup Code</p>
                      <p className="font-mono font-bold text-primary">{order.pickup_code}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
