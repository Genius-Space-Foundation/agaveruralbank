"use client";

import React from 'react';
import { TrendingUp, Download, Calendar } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Financial Reports</h1>
        <p className="text-neutral-500">View performance metrics and download statements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
               <TrendingUp size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2">Loan Portfolio</h3>
            <p className="text-neutral-500 mb-6">Aggregate view of all active loans and repayment schedules.</p>
            <button className="btn-primary w-full max-w-xs flex items-center justify-center gap-2">
               <Download size={18} /> Download CSV
            </button>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
               <Calendar size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2">Daily Transactions</h3>
            <p className="text-neutral-500 mb-6">ledger record of all deposits, withdrawals, and transfers.</p>
            <button className="btn-primary w-full max-w-xs flex items-center justify-center gap-2">
               <Download size={18} /> Download PDF
            </button>
         </div>
      </div>
    </div>
  );
}
