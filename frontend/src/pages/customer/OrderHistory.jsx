import { useState } from 'react';
import { Badge, EmptyState, Modal } from '../../components/common';
import { mockOrders, formatCurrency, formatDate, formatDateTime, getStatusColor, getStatusLabel, orderStatuses } from '../../utils/mockData';
import { HiShoppingBag, HiClock, HiLocationMarker, HiQrcode, HiDownload, HiFilter } from 'react-icons/hi';

const OrderHistory = () => {
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = filter === 'all' ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Order History</h1>
          <p className="text-neutral-500 text-sm mt-1">{mockOrders.length} total orders</p>
        </div>
        <div className="flex items-center gap-2">
          <HiFilter className="w-4 h-4 text-neutral-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input py-2 text-sm min-w-[140px]"
          >
            {orderStatuses.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="📦" title="No orders found" description="No orders match the selected filter." />
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="card hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <HiShoppingBag className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">{order.product_name}</p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1 mt-0.5">
                      <HiLocationMarker className="w-3.5 h-3.5" />
                      {order.merchant_name}
                    </p>
                    <p className="text-sm text-neutral-400 flex items-center gap-1 mt-0.5">
                      <HiClock className="w-3.5 h-3.5" />
                      {formatDateTime(order.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <Badge color={getStatusColor(order.status)} dot>
                    {getStatusLabel(order.status)}
                  </Badge>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900">{formatCurrency(order.total_price)}</p>
                    <p className="text-sm text-green-600 font-medium">Save {formatCurrency(order.savings)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Receipt"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* QR Code Section */}
            <div className="flex flex-col items-center py-6 bg-gradient-to-b from-primary/5 to-transparent rounded-xl">
              <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 border-2 border-dashed border-primary/20">
                <div className="text-center">
                  <HiQrcode className="w-24 h-24 text-primary mx-auto" />
                  <p className="text-xs text-neutral-400 mt-2">QR Code</p>
                </div>
              </div>
              <p className="font-mono font-bold text-lg text-primary tracking-wider">{selectedOrder.pickup_code}</p>
              <p className="text-sm text-neutral-500 mt-1">Show this to the merchant at pickup</p>
            </div>

            {/* Order Details */}
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Order ID</span>
                <span className="font-mono text-sm font-medium">{selectedOrder.order_number}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Product</span>
                <span className="font-medium">{selectedOrder.product_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Merchant</span>
                <span className="font-medium">{selectedOrder.merchant_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Pickup Time</span>
                <span className="font-medium">{selectedOrder.pickup_time}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Quantity</span>
                <span className="font-medium">{selectedOrder.quantity}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Status</span>
                <Badge color={getStatusColor(selectedOrder.status)} dot>
                  {getStatusLabel(selectedOrder.status)}
                </Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-500">Payment</span>
                <span className="font-medium capitalize">{selectedOrder.payment_method || 'Pending'}</span>
              </div>
              <div className="flex justify-between py-3 bg-primary/5 rounded-xl px-4 -mx-1">
                <span className="font-bold text-neutral-900">Total Paid</span>
                <span className="font-bold text-primary text-lg">{formatCurrency(selectedOrder.total_price)}</span>
              </div>
            </div>

            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <HiDownload className="w-4 h-4" /> Download Receipt
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;
