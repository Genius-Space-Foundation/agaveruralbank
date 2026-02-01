"use client";

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Landmark, User, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
  senderAccount?: { accountNumber: string };
  receiverAccount?: { accountNumber: string };
}

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-neutral-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-neutral-100 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mb-4">
          <Calendar size={32} />
        </div>
        <h3 className="text-lg font-bold text-neutral-900">No transactions yet</h3>
        <p className="text-neutral-500 mt-1">Your recent activity will appear here once you start banking with us.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden mb-20 lg:mb-0">
      <div className="p-5 md:p-6 border-b border-neutral-50 flex justify-between items-center">
        <h3 className="font-bold text-base md:text-lg text-neutral-900">Recent Transactions</h3>
        <button className="text-primary text-xs md:text-sm font-bold hover:underline">View All</button>
      </div>

      <div className="divide-y divide-neutral-50">
        {transactions.map((tx) => {
          const isDebit = tx.type === 'DEBIT' || tx.type === 'TRANSFER' || tx.type === 'WITHDRAWAL';
          const formattedDate = new Date(tx.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
          });

          return (
            <div key={tx.id} className="p-3.5 md:p-4 hover:bg-neutral-50 transition-colors flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors shrink-0 ${
                  isDebit ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'
                }`}>
                  {isDebit ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-neutral-900 group-hover:text-primary transition-colors text-sm truncate">
                    {tx.description}
                  </h4>
                  <p className="text-[10px] md:text-xs text-neutral-500 font-medium mt-0.5">
                    {formattedDate} • {tx.type}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className={`font-bold text-sm md:text-base ${isDebit ? 'text-neutral-900' : 'text-primary'}`}>
                  {isDebit ? '-' : '+'}
                  {new Intl.NumberFormat('en-GH', {
                    style: 'currency',
                    currency: tx.currency,
                    maximumFractionDigits: 0
                  }).format(tx.amount)}
                </p>
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-tighter mt-1">
                  Completed
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
