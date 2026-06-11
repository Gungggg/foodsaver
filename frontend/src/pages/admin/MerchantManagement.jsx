import { useState } from 'react';
import { Badge, Modal, useToast } from '../../components/common';
import { mockMerchants, formatCurrency } from '../../utils/mockData';
import { HiSearch, HiPencil, HiBan, HiTrash, HiLocationMarker, HiStar, HiShoppingBag } from 'react-icons/hi';

const MerchantManagement = () => {
  const { addToast } = useToast();
  const [merchants, setMerchants] = useState(mockMerchants);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editModal, setEditModal] = useState(null);

  const filtered = merchants
    .filter(m => m.business_name.toLowerCase().includes(search.toLowerCase()) || m.owner_name.toLowerCase().includes(search.toLowerCase()))
    .filter(m => statusFilter === 'all' || m.status === statusFilter);

  const toggleSuspend = (id) => {
    setMerchants(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'active' ? 'suspended' : 'active' } : m));
    addToast('Merchant status updated', 'success');
  };

  const deleteMerchant = (id) => {
    setMerchants(prev => prev.filter(m => m.id !== id));
    addToast('Merchant deleted', 'success');
  };

  const getStatusBadge = (status) => {
    const map = { active: 'success', pending: 'warning', suspended: 'error' };
    return <Badge color={map[status] || 'neutral'} dot>{status}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Merchant Management</h1>
        <p className="text-neutral-500 text-sm mt-1">{merchants.length} registered merchants</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input type="text" placeholder="Search merchants..." value={search} onChange={(e) => setSearch(e.target.value)} className="input w-full pl-10" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input min-w-[140px]">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Merchant Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="pb-3 text-sm font-semibold text-neutral-500">Merchant</th>
              <th className="pb-3 text-sm font-semibold text-neutral-500 hidden md:table-cell">City</th>
              <th className="pb-3 text-sm font-semibold text-neutral-500 hidden lg:table-cell">Orders</th>
              <th className="pb-3 text-sm font-semibold text-neutral-500 hidden lg:table-cell">Revenue</th>
              <th className="pb-3 text-sm font-semibold text-neutral-500">Status</th>
              <th className="pb-3 text-sm font-semibold text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((m) => (
              <tr key={m.id} className="group hover:bg-neutral-50/50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg flex-shrink-0">🏪</div>
                    <div>
                      <p className="font-medium text-neutral-900">{m.business_name}</p>
                      <p className="text-xs text-neutral-400">{m.owner_name} · {m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 hidden md:table-cell">
                  <span className="text-sm text-neutral-600 flex items-center gap-1">
                    <HiLocationMarker className="w-3.5 h-3.5" /> {m.city}
                  </span>
                </td>
                <td className="py-4 hidden lg:table-cell">
                  <span className="text-sm font-medium text-neutral-900 flex items-center gap-1">
                    <HiShoppingBag className="w-3.5 h-3.5 text-neutral-400" /> {m.total_orders}
                  </span>
                </td>
                <td className="py-4 hidden lg:table-cell">
                  <span className="text-sm font-medium text-neutral-900">{formatCurrency(m.revenue)}</span>
                </td>
                <td className="py-4">{getStatusBadge(m.status)}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditModal(m)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="Edit">
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => toggleSuspend(m.id)} className="p-2 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title={m.status === 'active' ? 'Suspend' : 'Activate'}>
                      <HiBan className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteMerchant(m.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={!!editModal} onClose={() => setEditModal(null)} title="Merchant Details">
        {editModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Business Name', editModal.business_name],
                ['Owner', editModal.owner_name],
                ['Category', editModal.category],
                ['City', editModal.city],
                ['Email', editModal.email],
                ['Rating', editModal.rating > 0 ? `⭐ ${editModal.rating}` : 'N/A'],
                ['Total Orders', editModal.total_orders],
                ['Revenue', formatCurrency(editModal.revenue)],
                ['Joined', editModal.joined_at],
                ['Status', editModal.status],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-sm text-neutral-500">{label}</p>
                  <p className="font-medium capitalize">{val}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setEditModal(null)} className="btn-primary w-full">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MerchantManagement;
