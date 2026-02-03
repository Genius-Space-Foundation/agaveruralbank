"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Loader2, Plus, Shield, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ManageStaffPage() {
  const [staffUsers, setStaffUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  // Only SUPERADMIN can access this page
  if (user?.role !== 'SUPERADMIN') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Shield className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-2xl font-bold text-neutral-900">Access Denied</h2>
          <p className="text-neutral-500">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const fetchStaff = async () => {
    try {
      const response = await api.get('/superadmin/staff');
      setStaffUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreateStaff = async (formData: any) => {
    try {
      const response = await api.post('/superadmin/staff', formData);
      alert(`User created! Temporary password: ${response.data.temporaryPassword}`);
      fetchStaff();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create staff:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Manage Staff</h1>
          <p className="text-neutral-500">Create and manage staff user accounts.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Create Staff User
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="text-left p-6 text-xs font-bold uppercase tracking-wider text-neutral-600">User</th>
                  <th className="text-left p-6 text-xs font-bold uppercase tracking-wider text-neutral-600">Email</th>
                  <th className="text-left p-6 text-xs font-bold uppercase tracking-wider text-neutral-600">Role</th>
                  <th className="text-left p-6 text-xs font-bold uppercase tracking-wider text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {staffUsers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                          {staff.profile?.firstName?.[0]}{staff.profile?.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">{staff.profile?.firstName} {staff.profile?.lastName}</p>
                          <p className="text-xs text-neutral-500">{staff.profile?.phoneNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 font-mono text-sm text-neutral-600">{staff.email}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        staff.role === 'SUPERADMIN' ? 'bg-purple-100 text-purple-700' :
                        staff.role === 'ADMIN' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {staff.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                          <Edit2 size={16} className="text-neutral-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Deactivate">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal - Simple for now */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6">Create Staff User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateStaff({
                email: formData.get('email'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                phoneNumber: formData.get('phoneNumber'),
                role: formData.get('role'),
              });
            }} className="space-y-4">
              <input name="email" type="email" placeholder="Email" required className="w-full p-3 border border-neutral-200 rounded-xl" />
              <input name="firstName" type="text" placeholder="First Name" required className="w-full p-3 border border-neutral-200 rounded-xl" />
              <input name="lastName" type="text" placeholder="Last Name" required className="w-full p-3 border border-neutral-200 rounded-xl" />
              <input name="phoneNumber" type="tel" placeholder="Phone Number" required className="w-full p-3 border border-neutral-200 rounded-xl" />
              <select name="role" required className="w-full p-3 border border-neutral-200 rounded-xl">
                <option value="">Select Role</option>
                <option value="TELLER">Teller</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPERADMIN">Super Admin</option>
              </select>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-neutral-100 text-neutral-700 py-3 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
