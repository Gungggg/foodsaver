import { useState } from 'react';
import { Badge, Modal, EmptyState, useToast } from '../../components/common';
import { mockComplaints, formatDateTime, getStatusColor, getStatusLabel } from '../../utils/mockData';
import { HiFilter, HiChatAlt2, HiUser, HiShoppingBag, HiExclamationCircle } from 'react-icons/hi';

const ComplaintManagement = () => {
  const { addToast } = useToast();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [resolution, setResolution] = useState('');

  const filtered = filter === 'all' ? complaints : complaints.filter(c => c.status === filter);
  const statuses = ['all', 'open', 'in_progress', 'resolved'];

  const updateStatus = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    addToast(`Complaint marked as ${newStatus.replace('_', ' ')}`, 'success');
  };

  const handleResolve = (id) => {
    if (!resolution.trim()) {
      addToast('Please add resolution notes', 'error');
      return;
    }
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved', resolution } : c));
    setSelected(null);
    setResolution('');
    addToast('Complaint resolved!', 'success');
  };

  const getPriorityColor = (p) => p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'info';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-neutral-900">Complaint Management</h1>
          <p className="text-neutral-500 text-sm mt-1">{complaints.filter(c => c.status === 'open').length} open complaints</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize ${
              filter === s ? 'bg-primary text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {s === 'all' ? 'All' : s.replace('_', ' ')} ({s === 'all' ? complaints.length : complaints.filter(c => c.status === s).length})
          </button>
        ))}
      </div>

      {/* Complaints */}
      {filtered.length === 0 ? (
        <EmptyState icon="✅" title="No complaints" description="No complaints match this filter." />
      ) : (
        <div className="space-y-4">
          {filtered.map((complaint) => (
            <div key={complaint.id} onClick={() => setSelected(complaint)} className="card hover:shadow-card-hover transition-all duration-200 cursor-pointer group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <HiExclamationCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">{complaint.subject}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge color={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                        <Badge color={getStatusColor(complaint.status)} dot>{getStatusLabel(complaint.status)}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 line-clamp-2 pl-[52px]">{complaint.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-neutral-400 pl-[52px]">
                    <span className="flex items-center gap-1"><HiUser className="w-3 h-3" /> {complaint.customer_name}</span>
                    <span className="flex items-center gap-1"><HiShoppingBag className="w-3 h-3" /> {complaint.merchant_name}</span>
                    <span>{formatDateTime(complaint.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail + Resolve Modal */}
      <Modal isOpen={!!selected} onClose={() => { setSelected(null); setResolution(''); }} title="Complaint Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-sm text-neutral-500">Subject</p><p className="font-medium">{selected.subject}</p></div>
              <div><p className="text-sm text-neutral-500">Priority</p><Badge color={getPriorityColor(selected.priority)}>{selected.priority}</Badge></div>
              <div><p className="text-sm text-neutral-500">Customer</p><p className="font-medium">{selected.customer_name}</p></div>
              <div><p className="text-sm text-neutral-500">Merchant</p><p className="font-medium">{selected.merchant_name}</p></div>
              <div><p className="text-sm text-neutral-500">Status</p><Badge color={getStatusColor(selected.status)} dot>{getStatusLabel(selected.status)}</Badge></div>
              <div><p className="text-sm text-neutral-500">Order ID</p><p className="font-mono text-sm">{selected.order_id}</p></div>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">Description</p>
              <p className="text-neutral-700 bg-neutral-50 p-3 rounded-xl text-sm">{selected.description}</p>
            </div>
            {selected.resolution && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">Resolution</p>
                <p className="text-green-700 bg-green-50 p-3 rounded-xl text-sm">{selected.resolution}</p>
              </div>
            )}
            {selected.status !== 'resolved' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Resolution Notes</label>
                  <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} className="input w-full h-24 resize-none" placeholder="Describe how this was resolved..." />
                </div>
                <div className="flex gap-3">
                  {selected.status === 'open' && (
                    <button onClick={() => { updateStatus(selected.id, 'in_progress'); setSelected(null); }} className="btn-outline flex-1">
                      Mark In Progress
                    </button>
                  )}
                  <button onClick={() => handleResolve(selected.id)} className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <HiChatAlt2 className="w-4 h-4" /> Resolve
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComplaintManagement;
