import { useState } from 'react';
import { Badge, Modal, EmptyState, useToast } from '../../components/common';
import { mockProducts, formatCurrency, productCategories } from '../../utils/mockData';
import { HiPlus, HiPencil, HiTrash, HiPhotograph, HiClock, HiCurrencyDollar, HiSearch } from 'react-icons/hi';

const initialForm = {
  name: '', description: '', category: 'bakery', original_price: '', discounted_price: '',
  daily_stock: '', pickup_start: '', pickup_end: '', estimated_weight_kg: '', photo_url: '',
};

const ProductManagement = () => {
  const { addToast } = useToast();
  const [products, setProducts] = useState(mockProducts.filter(p => ['mrc_001', 'mrc_002'].includes(p.merchant_id)));
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setForm(initialForm); setEditingProduct(null); setShowModal(true); };
  const openEdit = (product) => {
    setForm({
      name: product.name, description: product.description, category: product.category,
      original_price: product.original_price, discounted_price: product.discounted_price,
      daily_stock: product.stock, pickup_start: product.pickup_start, pickup_end: product.pickup_end,
      estimated_weight_kg: '0.5', photo_url: product.image,
    });
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...form, stock: Number(form.daily_stock) } : p));
      addToast('Product updated successfully!', 'success');
    } else {
      setProducts(prev => [...prev, { id: `prd_new_${Date.now()}`, ...form, stock: Number(form.daily_stock), merchant_name: 'Your Store', merchant_rating: 4.8, image: form.photo_url || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop', is_active: true }]);
      addToast('Product created successfully!', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
    addToast('Product deleted', 'success');
  };

  const updateStock = (id, delta) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Product Management</h1>
          <p className="text-neutral-500 text-sm mt-1">{products.length} surprise bags</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <HiPlus className="w-4 h-4" /> Create Bag
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full pl-10"
        />
      </div>

      {/* Product Table */}
      {filtered.length === 0 ? (
        <EmptyState icon="📦" title="No products found" description="Create your first Surprise Bag!" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 text-left">
                <th className="pb-3 text-sm font-semibold text-neutral-500">Product</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500 hidden sm:table-cell">Category</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500">Price</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500">Stock</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500 hidden md:table-cell">Pickup</th>
                <th className="pb-3 text-sm font-semibold text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((product) => (
                <tr key={product.id} className="group hover:bg-neutral-50/50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=🍽️'; }}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-900 truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-neutral-400 sm:hidden capitalize">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 hidden sm:table-cell">
                    <Badge color="primary">{product.category}</Badge>
                  </td>
                  <td className="py-4">
                    <p className="font-semibold text-neutral-900">{formatCurrency(product.discounted_price)}</p>
                    <p className="text-xs text-neutral-400 line-through">{formatCurrency(product.original_price)}</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStock(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold transition-colors"
                      >−</button>
                      <span className={`font-bold min-w-[24px] text-center ${product.stock <= 2 ? 'text-red-500' : 'text-neutral-900'}`}>
                        {product.stock}
                      </span>
                      <button
                        onClick={() => updateStock(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold transition-colors"
                      >+</button>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">
                    <p className="text-sm text-neutral-600 flex items-center gap-1">
                      <HiClock className="w-3.5 h-3.5" /> {product.pickup_start} - {product.pickup_end}
                    </p>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(product)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirm(product.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingProduct ? 'Edit Surprise Bag' : 'Create Surprise Bag'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input w-full" required placeholder="e.g. Surprise Bakery Bag" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input w-full h-20 resize-none" placeholder="Describe what might be in this bag..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input w-full">
                {productCategories.filter(c => c.value !== 'all').map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Daily Stock</label>
              <input type="number" value={form.daily_stock} onChange={(e) => setForm({ ...form, daily_stock: e.target.value })} className="input w-full" min="0" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Original Price (Rp)</label>
              <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="input w-full" min="0" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Discounted Price (Rp)</label>
              <input type="number" value={form.discounted_price} onChange={(e) => setForm({ ...form, discounted_price: e.target.value })} className="input w-full" min="0" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Pickup Start</label>
              <input type="time" value={form.pickup_start} onChange={(e) => setForm({ ...form, pickup_start: e.target.value })} className="input w-full" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Pickup End</label>
              <input type="time" value={form.pickup_end} onChange={(e) => setForm({ ...form, pickup_end: e.target.value })} className="input w-full" required />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">
            {editingProduct ? 'Update Bag' : 'Create Bag'}
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Product">
        <p className="text-neutral-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteConfirm(null)} className="btn-outline flex-1">Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManagement;
