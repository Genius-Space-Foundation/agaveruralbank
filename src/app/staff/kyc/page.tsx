"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Loader2, CheckCircle2, XCircle, FileIcon, Search } from 'lucide-react';
import Link from 'next/link';

export default function KycReviewPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users with PENDING kycStatus
  const fetchPendingKyc = async () => {
    try {
      // Reusing search endpoint but ideally should have a dedicated filter
      const response = await api.get('/staff/users?query='); 
      // Filter client-side for now as we don't have a specific filter endpoint yet
      const pending = response.data.filter((u: any) => u.profile?.kycStatus === 'PENDING');
      setUsers(pending);
    } catch (error) {
      console.error('Failed to fetch KYC queue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingKyc();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">KYC Review Queue</h1>
        <p className="text-neutral-500">Review and verify customer identity documents.</p>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-neutral-50 flex justify-between items-center">
            <h3 className="font-bold text-lg">Pending Requests ({users.length})</h3>
            <div className="flex gap-2">
               <button onClick={fetchPendingKyc} className="bg-neutral-50 hover:bg-neutral-100 p-2 rounded-lg text-neutral-600 transition-colors">
                  <Loader2 size={16} className={isLoading ? "animate-spin" : ""} />
               </button>
            </div>
         </div>

         {isLoading ? (
            <div className="p-20 flex justify-center">
               <Loader2 className="animate-spin text-primary" size={32} />
            </div>
         ) : users.length === 0 ? (
            <div className="p-20 text-center space-y-4">
               <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
               </div>
               <h4 className="font-bold text-lg text-neutral-900">All Caught Up!</h4>
               <p className="text-neutral-500">There are no pending KYC requests at the moment.</p>
               <Link href="/staff/users" className="btn-secondary inline-flex items-center gap-2 mt-4">
                  <Search size={16} /> Search All Users
               </Link>
            </div>
         ) : (
            <div className="divide-y divide-neutral-50">
               {users.map((user) => (
                  <div key={user.id} className="p-6 hover:bg-neutral-50 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="flex items-center gap-4 flex-grow">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                           {user.profile?.firstName?.[0]}
                        </div>
                        <div>
                           <h4 className="font-bold text-neutral-900">{user.profile?.firstName} {user.profile?.lastName}</h4>
                           <p className="text-sm text-neutral-500">{user.email}</p>
                           <div className="flex gap-2 mt-1">
                              <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                                 Nationality: Ghanaian
                              </span>
                              <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                                 ID: {user.profile?.nationalId || 'N/A'}
                              </span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-4">
                        <Link 
                           href={`/staff/users/${user.id}`}
                           className="px-6 py-3 bg-white border border-neutral-200 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2"
                        >
                           <FileIcon size={16} /> Review Details
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
