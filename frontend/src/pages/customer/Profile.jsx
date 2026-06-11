import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/common';
import { HiUser, HiMail, HiPhone, HiLockClosed, HiPencil, HiCheck } from 'react-icons/hi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser(form);
    setEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirm) {
      addToast('Passwords do not match', 'error');
      return;
    }
    setPasswordForm({ current: '', newPassword: '', confirm: '' });
    addToast('Password changed successfully!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-heading font-bold text-neutral-900">Profile Settings</h1>

      {/* Avatar Section */}
      <div className="card flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {(user?.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{user?.name || 'User'}</h2>
          <p className="text-neutral-500 text-sm capitalize">{user?.role || 'Customer'} Account</p>
          <p className="text-xs text-neutral-400 mt-1">Member since Jan 2024</p>
        </div>
      </div>

      {/* Personal Info */}
      <form onSubmit={handleSaveProfile} className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-bold text-neutral-900">Personal Information</h2>
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1"
          >
            <HiPencil className="w-4 h-4" /> {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <HiUser className="w-4 h-4 inline mr-1" /> Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={!editing}
              className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <HiMail className="w-4 h-4 inline mr-1" /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={!editing}
              className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <HiPhone className="w-4 h-4 inline mr-1" /> Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={!editing}
              className="input w-full disabled:bg-neutral-50 disabled:text-neutral-500"
            />
          </div>
        </div>
        {editing && (
          <button type="submit" className="btn-primary mt-6 flex items-center gap-2">
            <HiCheck className="w-4 h-4" /> Save Changes
          </button>
        )}
      </form>

      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="card">
        <h2 className="text-lg font-heading font-bold text-neutral-900 mb-6">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              <HiLockClosed className="w-4 h-4 inline mr-1" /> Current Password
            </label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              className="input w-full"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="input w-full"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              className="input w-full"
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary mt-6 flex items-center gap-2">
          <HiLockClosed className="w-4 h-4" /> Update Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
