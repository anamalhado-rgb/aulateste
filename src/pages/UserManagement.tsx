import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  X,
  Check,
  ChevronRight,
  Mail,
  User,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

type Role = 'Admin' | 'Supervisor' | 'Operator' | 'Guest';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  avatar: string;
}

const initialUsers: UserData[] = [
  { id: 'USR-001', name: 'Ana Malhado', email: 'anamalhado@gmail.com', role: 'Admin', status: 'Active', lastLogin: '2 mins ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'USR-002', name: 'John Doe', email: 'john.doe@smartport.com', role: 'Supervisor', status: 'Active', lastLogin: '1 hour ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: 'USR-003', name: 'Sarah Smith', email: 's.smith@smartport.com', role: 'Operator', status: 'Inactive', lastLogin: '2 days ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 'USR-004', name: 'Mike Johnson', email: 'mike.j@smartport.com', role: 'Operator', status: 'Active', lastLogin: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 'USR-005', name: 'Elena Rodriguez', email: 'elena.r@smartport.com', role: 'Guest', status: 'Pending', lastLogin: 'Never', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSupabaseConfigured = !import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');

  // Form state
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '',
    email: '',
    role: 'Operator',
    status: 'Active'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!isSupabaseConfigured) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      if (data) {
        setUsers(data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status,
          lastLogin: u.last_login ? new Date(u.last_login).toLocaleDateString() : 'Never',
          avatar: u.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random`
        })));
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users from database.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (user?: UserData) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'Operator', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured. Please add your credentials in Settings.');
      }

      if (editingUser) {
        const { error: supabaseError } = await supabase
          .from('users')
          .update({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status
          })
          .eq('id', editingUser.id);

        if (supabaseError) throw supabaseError;
      } else {
        const { error: supabaseError } = await supabase
          .from('users')
          .insert([{
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=random`
          }]);

        if (supabaseError) throw supabaseError;
      }
      await fetchUsers();
      handleCloseModal();
    } catch (err: any) {
      console.error('Error saving user:', err);
      setError(err.message || 'Failed to save user to database.');
      
      // Local fallback for demo purposes if Supabase fails
      if (!isSupabaseConfigured) {
        if (editingUser) {
          setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } as UserData : u));
        } else {
          const newUser: UserData = {
            id: `USR-00${users.length + 1}`,
            name: formData.name || '',
            email: formData.email || '',
            role: formData.role as Role || 'Operator',
            status: formData.status as any || 'Active',
            lastLogin: 'Never',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=random`
          };
          setUsers([...users, newUser]);
        }
        handleCloseModal();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmation) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', deleteConfirmation);

        if (error) throw error;
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        setUsers(users.filter(u => u.id !== deleteConfirmation));
      } finally {
        setDeleteConfirmation(null);
        setIsLoading(false);
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'Admin': return <ShieldCheck className="text-red-500" size={16} />;
      case 'Supervisor': return <Shield className="text-[#105577]" size={16} />;
      case 'Operator': return <ShieldAlert className="text-[#F49B2D]" size={16} />;
      default: return <User className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage administrative access, roles, and user permissions.</p>
        </div>
        <div className="flex items-center gap-4">
          {!isSupabaseConfigured && (
            <div className="hidden lg:flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700 border border-amber-100">
              <ShieldAlert size={14} />
              Demo Mode (Supabase not configured)
            </div>
          )}
          <button 
            disabled={isLoading}
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 rounded-xl bg-[#105577] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <UserPlus size={18} />}
            Add New User
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600 border border-red-100 flex items-center gap-3">
          <ShieldAlert size={18} />
          {error}
          <button onClick={() => setError(null)} className="ml-auto hover:text-red-800">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#105577]/20 border border-slate-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            Filter
          </button>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <p className="text-sm font-bold text-slate-500">{filteredUsers.length} Users Found</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-10 w-10 rounded-full border-2 border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className="text-sm font-bold text-slate-700">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                      user.status === 'Active' ? 'bg-green-100 text-green-700' :
                      user.status === 'Inactive' ? 'bg-slate-100 text-slate-600' :
                      'bg-orange-100 text-orange-700'
                    )}>
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        user.status === 'Active' ? 'bg-green-500' :
                        user.status === 'Inactive' ? 'bg-slate-400' :
                        'bg-orange-500 animate-pulse'
                      )}></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-[#105577]"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmation(user.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
                <h3 className="text-xl font-black text-slate-900">
                  {editingUser ? 'Edit User Details' : 'Add New Team Member'}
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-[#105577] focus:outline-none focus:ring-4 focus:ring-[#105577]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@smartport.com"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-[#105577] focus:outline-none focus:ring-4 focus:ring-[#105577]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Role</label>
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-[#105577] focus:outline-none focus:ring-4 focus:ring-[#105577]/10 transition-all appearance-none"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Operator">Operator</option>
                        <option value="Guest">Guest</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-[#105577] focus:outline-none focus:ring-4 focus:ring-[#105577]/10 transition-all appearance-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Permissions Section */}
                <div className="rounded-2xl bg-slate-50 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Shield size={16} className="text-[#105577]" />
                    Role Permissions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Can manage vessels', enabled: formData.role !== 'Guest' },
                      { label: 'Can access financial reports', enabled: formData.role === 'Admin' || formData.role === 'Supervisor' },
                      { label: 'Can modify user roles', enabled: formData.role === 'Admin' },
                    ].map((perm, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-slate-600">{perm.label}</span>
                        {perm.enabled ? (
                          <Check className="text-green-500" size={16} />
                        ) : (
                          <X className="text-slate-300" size={16} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                  <button 
                    type="button"
                    disabled={isLoading}
                    onClick={handleCloseModal}
                    className="flex-1 h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 rounded-xl bg-[#105577] text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                    {editingUser ? 'Save Changes' : 'Create User'}
                  </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmation(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 size={32} />
              </div>
              <h3 className="mb-2 text-xl font-black text-slate-900">Delete User</h3>
              <p className="mb-8 text-sm text-slate-500">
                Are you sure you want to delete this user? This action cannot be undone and they will lose all access.
              </p>
              <div className="flex gap-3">
                <button 
                  disabled={isLoading}
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-1 h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  disabled={isLoading}
                  onClick={handleDelete}
                  className="flex-1 h-12 rounded-xl bg-red-500 text-sm font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
