import { useState } from 'react';
import { Badge, Modal, EmptyState, useToast } from '../../components/common';
import { mockPendingVerifications, formatDateTime } from '../../utils/mockData';
import { HiCheckCircle, HiXCircle, HiDocumentText, HiLocationMarker, HiMail, HiEye } from 'react-icons/hi';

const MerchantVerification = () => {
  const { addToast } = useToast();
  const [merchants, setMerchants] = useState(mockPendingVerifications);
  const [selected, setSelected] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (id) => {
    setMerchants(prev => prev.filter(m => m.id !== id));
    setSelected(null);
    addToast('Merchant approved successfully!', 'success');
  };

  const handleReject = (id) => {
    if (!rejectReason.trim()) {
      addToast('Please provide a rejection reason', 'error');
      return;
    }
    setMerchants(prev => prev.filter(m => m.id !== id));
    setRejectModal(null);
    setRejectReason('');
    setSelected(null);
    addToast('Merchant rejected', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Merchant Verification</h1>
        <p className="text-neutral-500 text-sm mt-1">{merchants.length} pending applications</p>
      </div>

      {merchants.length === 0 ? (
        <EmptyState icon="✅" title="All caught up!" description="No pending merchant verifications." />
      ) : (
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="card hover:shadow-card-hover transition-all duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-xl">🏪</div>
                    <div>
                      <h3 className="font-bold text-neutral-900">{merchant.business_name}</h3>
                      <p className="text-sm text-neutral-500">{merchant.owner_name}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
                    <span className="flex items-center gap-1"><HiMail className="w-4 h-4" /> {merchant.email}</span>
                    <span className="flex items-center gap-1"><HiLocationMarker className="w-4 h-4" /> {merchant.city}</span>
                    <Badge color="primary">{merchant.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiDocumentText className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm text-neutral-500">Documents:</span>
                    {merchant.documents.map((doc) => (
                      <Badge key={doc} color="info">{doc}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400">Submitted: {formatDateTime(merchant.submitted_at)}</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button onClick={() => setSelected(merchant)} className="btn-outline flex items-center gap-2 text-sm">
                    <HiEye className="w-4 h-4" /> Review
                  </button>
                  <button onClick={() => handleApprove(merchant.id)} className="px-4 py-2.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 text-sm">
                    <HiCheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => setRejectModal(merchant)} className="px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2 text-sm">
                    <HiXCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Merchant Review">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Business Name</p>
                <p className="font-medium">{selected.business_name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Owner</p>
                <p className="font-medium">{selected.owner_name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Category</p>
                <p className="font-medium capitalize">{selected.category}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">City</p>
                <p className="font-medium">{selected.city}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-neutral-500">Address</p>
                <p className="font-medium">{selected.address}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">Uploaded Documents</p>
              {selected.documents.map((doc) => (
                <div key={doc} className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-sm flex items-center gap-2"><HiDocumentText className="w-4 h-4 text-neutral-400" /> {doc}</span>
                  <button className="text-primary text-sm hover:underline">View</button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={() => handleApprove(selected.id)} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <HiCheckCircle className="w-4 h-4" /> Approve
              </button>
              <button onClick={() => { setRejectModal(selected); setSelected(null); }} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <HiXCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal isOpen={!!rejectModal} onClose={() => { setRejectModal(null); setRejectReason(''); }} title="Reject Merchant">
        {rejectModal && (
          <div className="space-y-4">
            <p className="text-neutral-600">Please provide a reason for rejecting <strong>{rejectModal.business_name}</strong>:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="input w-full h-24 resize-none"
              placeholder="Enter rejection reason..."
              required
            />
            <div className="flex gap-3">
              <button onClick={() => { setRejectModal(null); setRejectReason(''); }} className="btn-outline flex-1">Cancel</button>
              <button onClick={() => handleReject(rejectModal.id)} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">Confirm Reject</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MerchantVerification;
