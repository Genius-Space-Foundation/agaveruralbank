"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, FileCheck, ShieldAlert, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function StaffDashboard() {
  const { user } = useAuth();
  const stats = [
    { label: 'Pending KYC', value: '12', icon: <FileCheck className="text-orange-500" />, href: '/staff/kyc' },
    { label: 'Active Users', value: '1,240', icon: <Users className="text-blue-500" />, href: '/staff/users' },
    { label: 'Flagged Txns', value: '3', icon: <ShieldAlert className="text-red-500" />, href: '/staff/audit' },
    { label: 'Total Loans', value: 'GHS 4.2M', icon: <TrendingUp className="text-green-500" />, href: '/staff/reports' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Staff Dashboard</h1>
        <p className="text-neutral-500">Welcome back, {user?.firstName}. Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-neutral-50 rounded-xl group-hover:bg-neutral-100 transition-colors">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">{stat.value}</h3>
            <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-400 font-bold text-xs border border-neutral-100">JD</div>
                  <div>
                     <p className="text-sm font-bold text-neutral-900">John Doe submitted KYC</p>
                     <p className="text-xs text-neutral-500">2 minutes ago</p>
                  </div>
               </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
              <p className="text-white/70 text-sm mb-8">Common tasks for your role.</p>
              
              <div className="space-y-3">
                 <Link href="/staff/users" className="block bg-white/10 hover:bg-white/20 p-4 rounded-xl font-bold transition-all border border-white/5">
                    Search Customer
                 </Link>
                 <Link href="/staff/kyc" className="block bg-white/10 hover:bg-white/20 p-4 rounded-xl font-bold transition-all border border-white/5">
                    Review Documents
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
