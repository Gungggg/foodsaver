import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Badge, useToast } from '../../components/common';
import { HiOfficeBuilding, HiLocationMarker, HiClock, HiPhone, HiPhotograph, HiDocumentText, HiCheck, HiPencil } from 'react-icons/hi';

const MerchantProfile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const merchant = user?.merchant || {
    business_name: 'Green Plate Bistro',
    address: 'Jl. Sudirman No. 45',
    city: 'Jakarta',
    category: 'restaurant',
    description: 'Farm-to-table restaurant specializing in sustainable cuisine',
    operating_hours: '08:00 - 22:00',
    phone: '+62 813 9876 5432',
    is_verified: true,
  };

  const [form, setForm] = useState({
    business_name: merchant.business_name,
    address: merchant.address,
    city: merchant.city,
    description: merchant.description,
    operating_hours: merchant.operating_hours,
    phone: merchant.phone,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const documents = [
    { name: 'Business License (SIUP/NIB)', status: 'approved', date: '15 Jan 2024' },
    { name: 'Food Safety Certificate', status: 'approved', date: '15 Jan 2024' },
    { name: 'Owner ID (KTP)', status: 'approved', date: '15 Jan 2024' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Merchant Profile</h1>
        <Badge color={merchant.is_verified ? 'success' : 'warning'} dot>
          {merchant.is_verified ? 'Verified' : 'Pending Verification'}
        </Badge>
      </div>

      {/* Store Banner */}
      <div className="card overflow-hidden p-0">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <HiPhotograph className="w-8 h-8 text-white/40" />
          </div>
        </div>
        <div className="px-6 pb-6 -mt-10 relative">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl border-4 border-white">
            🏪
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mt-3">{merchant.business_name}</h2>
          <p className="text-neutral-500 text-sm flex items-center gap-1 mt-1">
            <HiLocationMarker className="w-4 h-4" /> {merchant.address}, {merchant.city}
          </p>
        </div>
      </div>

      {/* Store Info */}
      <form onSubmit={handleSave} className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-bold text-neutral-900">Store Information</h2>
          <button type="button" onClick={() => setEditing(!editing)} className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1">
            <HiPencil className="w-4 h-4" /> {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <HiOfficeBuilding className="w-4 h-4 inline mr-1" /> Store Name
            </label>
            <input type="text" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} disabled={!editing} className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={!editing} className="input w-full h-20 resize-none disabled:bg-neutral-50 disabled:text-neutral-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <HiLocationMarker className="w-4 h-4 inline mr-1" /> Address
              </label>
              <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={!editing} className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">City</label>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} disabled={!editing} className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <HiClock className="w-4 h-4 inline mr-1" /> Operating Hours
              </label>
              <input type="text" value={form.operating_hours} onChange={(e) => setForm({ ...form, operating_hours: e.target.value })} disabled={!editing} className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                <HiPhone className="w-4 h-4 inline mr-1" /> Phone
              </label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500" />
            </div>
          </div>
        </div>
        {editing && (
          <button type="submit" className="btn-primary mt-6 flex items-center gap-2">
            <HiCheck className="w-4 h-4" /> Save Changes
          </button>
        )}
      </form>

      {/* Documents */}
      <div className="card">
        <h2 className="text-lg font-heading font-bold text-neutral-900 mb-4">
          <HiDocumentText className="w-5 h-5 inline mr-1" /> Verification Documents
        </h2>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
              <div>
                <p className="font-medium text-neutral-900 text-sm">{doc.name}</p>
                <p className="text-xs text-neutral-400">Uploaded {doc.date}</p>
              </div>
              <Badge color={doc.status === 'approved' ? 'success' : doc.status === 'rejected' ? 'error' : 'warning'} dot>
                {doc.status === 'approved' ? 'Approved' : doc.status === 'rejected' ? 'Rejected' : 'Under Review'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantProfile;
