"use client";

import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, TrendingUp, MoreVertical } from 'lucide-react';

interface AccountProps {
  type: string;
  accountNumber: string;
  balance: number;
  currency: string;
}

export default function BalanceCard({ type, accountNumber, balance, currency }: AccountProps) {
  const formattedBalance = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency,
  }).format(balance);

  const isSavings = type.toLowerCase().includes('savings');

  return (
    <div className={`relative overflow-hidden rounded-3xl p-5 md:p-6 transition-all transform hover:scale-[1.02] cursor-pointer shadow-lg snap-center shrink-0 w-[85vw] md:w-full ${
      isSavings 
        ? 'bg-gradient-to-br from-primary to-primary-dark text-white' 
        : 'bg-white border border-neutral-100 text-neutral-900 shadow-neutral-200/50'
    }`}>
      {/* Abstract Background pattern */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <TrendingUp size={100} className="-mr-8 -mt-8 md:size-[120px] md:-mr-10 md:-mt-10" />
      </div>

      <div className="relative z-10 space-y-6 md:space-y-8">
        <div className="flex justify-between items-start">
          <div className={`p-2.5 md:p-3 rounded-2xl ${isSavings ? 'bg-white/10' : 'bg-primary/5 text-primary'}`}>
            <CreditCard size={20} className="md:size-[24px]" />
          </div>
          <button className={`${isSavings ? 'text-white/60 hover:text-white' : 'text-neutral-400 hover:text-neutral-600'}`}>
            <MoreVertical size={18} className="md:size-[20px]" />
          </button>
        </div>

        <div>
          <p className={`text-xs md:text-sm font-medium mb-1 ${isSavings ? 'text-white/70' : 'text-neutral-500'}`}>
            {type} Account
          </p>
          <p className="text-2xl md:text-3xl font-bold tracking-tight">{formattedBalance}</p>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className={`text-[9px] md:text-[10px] uppercase tracking-widest font-bold ${isSavings ? 'text-white/50' : 'text-neutral-400'}`}>
              Account Number
            </p>
            <p className="font-mono text-xs md:text-sm tracking-wider">
              {accountNumber.replace(/(\d{4})/g, '$1 ').trim()}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className={`p-2 rounded-xl flex items-center gap-1 text-[10px] md:text-xs font-bold transition-colors ${
              isSavings ? 'bg-white/20 hover:bg-white/30' : 'bg-primary text-white hover:bg-primary-dark'
            }`}>
              <ArrowUpRight size={12} className="md:size-[14px]" />
              Send
            </button>
            <button className={`p-2 rounded-xl flex items-center gap-1 text-[10px] md:text-xs font-bold transition-colors ${
              isSavings ? 'bg-secondary text-primary hover:bg-secondary-dark' : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
            }`}>
              <ArrowDownLeft size={12} className="md:size-[14px]" />
              Receive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
