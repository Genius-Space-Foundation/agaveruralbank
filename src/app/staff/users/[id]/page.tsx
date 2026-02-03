"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Banknote,
  Calendar,
  CreditCard 
} from 'lucide-react';
import Link from 'next/link';

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/staff/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const handleKycUpdate = async (status: string) => {
    if (!confirm(`Are you sure you want to mark this user as ${status}?`)) return;
    
    setIsUpdating(true);
    try {
      await api.put(`/staff/users/${id}/kyc`, { status });
      fetchUser();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/staff/users" className="p-3 bg-white rounded-xl shadow-sm border border-neutral-100 hover:bg-neutral-50 text-neutral-500 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{user.profile?.firstName} {user.profile?.lastName}</h1>
          <p className="text-neutral-500 font-mono text-sm">{user.id}</p>
        </div>
        <div className={`ml-auto px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
          user.profile?.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : 
          user.profile?.kycStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
        }`}>
          KYC: {user.profile?.kycStatus || 'PENDING'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Profile & KYC */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-lg mb-6">Personal Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase font-bold text-neutral-400">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-neutral-400">Phone</label>
                <p className="font-medium">{user.profile?.phoneNumber}</p>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-neutral-400">National ID</label>
                <p className="font-medium">{user.profile?.nationalId || 'N/A'}</p>
              </div>
              <div>
                 <label className="text-xs uppercase font-bold text-neutral-400">Address</label>
                 <p className="font-medium">{user.profile?.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-lg mb-6">KYC Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleKycUpdate('VERIFIED')}
                disabled={isUpdating}
                className="flex flex-col items-center justify-center gap-2 p-6 bg-green-50 text-green-700 rounded-2xl hover:bg-green-100 transition-colors font-bold disabled:opacity-50"
              >
                <CheckCircle2 size={24} />
                Approve
              </button>
              <button 
                onClick={() => handleKycUpdate('REJECTED')}
                disabled={isUpdating}
                className="flex flex-col items-center justify-center gap-2 p-6 bg-red-50 text-red-700 rounded-2xl hover:bg-red-100 transition-colors font-bold disabled:opacity-50"
              >
                <XCircle size={24} />
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Accounts & Activity */}
        <div className="lg:col-span-2 space-y-8">
           {/* Accounts */}
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                 <Banknote className="text-primary" /> Accounts ({user.accounts?.length || 0})
              </h3>
              <div className="grid gap-4">
                 {user.accounts?.map((acc: any) => (
                    <div key={acc.id} className="p-6 bg-neutral-50 rounded-2xl flex items-center justify-between">
                       <div>
                          <p className="font-bold text-neutral-900">{acc.type} Account</p>
                          <p className="font-mono text-xs text-neutral-500">{acc.accountNumber}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-bold text-neutral-900">
                             {acc.currency} {parseFloat(acc.balance).toLocaleString()}
                          </p>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                             acc.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                             {acc.status}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Loans */}
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-neutral-100">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                 <CreditCard className="text-secondary" /> Loans ({user.loans?.length || 0})
              </h3>
              <div className="grid gap-4">
                 {user.loans?.length === 0 && <p className="text-neutral-400 italic">No loan history.</p>}
                 {user.loans?.map((loan: any) => (
                    <div key={loan.id} className="p-6 border border-neutral-100 rounded-2xl flex items-center justify-between">
                       <div>
                          <p className="font-bold text-neutral-900">{loan.type} Loan</p>
                          <p className="text-xs text-neutral-500">{loan.purpose}</p>
                       </div>
                       <div className="text-right">
                          <p className="font-bold">GHS {parseFloat(loan.amount).toLocaleString()}</p>
                          <span className="text-xs font-bold text-orange-500">{loan.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Audit Logs */}
           <div className="bg-neutral-900 p-8 rounded-[2rem] text-white">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                 <ShieldAlert className="text-secondary" /> Recent Audit Logs
              </h3>
              <div className="space-y-4">
                 {user.auditLogs?.map((log: any) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                       <Calendar size={16} className="text-neutral-400 mt-1" />
                       <div>
                          <p className="font-bold text-sm">{log.action}</p>
                          <p className="text-xs text-neutral-400">{new Date(log.createdAt).toLocaleString()}</p>
                       </div>
                    </div>
                 ))}
                 {user.auditLogs?.length === 0 && <p className="text-neutral-500 italic">No logs available.</p>}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
