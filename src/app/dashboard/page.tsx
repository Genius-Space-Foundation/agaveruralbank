"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw,
  Plus,
  User,
  Settings,
  PieChart,
  ArrowRight,
  Banknote
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import BalanceCard from '@/components/dashboard/BalanceCard';
import TransactionList from '@/components/dashboard/TransactionList';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TransferForm from '@/components/transactions/TransferForm';
import BottomNav from '@/components/dashboard/BottomNav';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import SavingsGoals from '@/components/dashboard/SavingsGoals';

interface Account {
  id: string;
  type: string;
  accountNumber: string;
  balance: string;
  currency: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTransferForm, setShowTransferForm] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const accountsRes = await api.get('/accounts');
      setAccounts(accountsRes.data);
      
      if (accountsRes.data.length > 0) {
        const historyRes = await api.get(`/transactions/history/${accountsRes.data[0].id}`);
        setTransactions(historyRes.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50">
      <Header />
      
      <main className="flex-grow pt-24 md:pt-32 pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {showTransferForm ? (
            <div className="animate-fadeIn">
              <button 
                onClick={() => setShowTransferForm(false)}
                className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-primary font-bold transition-colors"
              >
                <ArrowDownLeft className="rotate-90" size={20} />
                Back to Overview
              </button>
              <TransferForm 
                accounts={accounts} 
                onSuccess={() => {
                  fetchData();
                  setShowTransferForm(false);
                }}
                onCancel={() => setShowTransferForm(false)}
              />
            </div>
          ) : (
            <>
              {/* Dashboard Header - Responsive */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                    Welcome, {user?.firstName}! 👋
                  </h1>
                  <p className="text-neutral-400 text-xs md:text-sm mt-1 font-medium italic">
                    Agave Rural Bank: Partnering for your growth.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <button onClick={fetchData} className="p-3 bg-white border border-neutral-100 rounded-2xl text-neutral-400 hover:text-primary transition-all shadow-sm group">
                    <RefreshCcw size={20} className="group-active:rotate-180 transition-transform duration-500" />
                  </button>
                  <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    Open New Account
                  </button>
                </div>
              </div>

              {/* KYC Status Banner */}
              {user && user.kycLevel < 2 && (
                <div className="mb-8 bg-gradient-to-r from-secondary/30 to-secondary/10 border border-secondary/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary shadow-inner">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">Verify your identity</h4>
                      <p className="text-neutral-500 text-sm italic">Unlock higher transfer limits and secure your account today.</p>
                    </div>
                  </div>
                  <Link 
                    href="/dashboard/kyc"
                    className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg active:scale-95 whitespace-nowrap"
                  >
                    Start Verification
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Accounts & Quick Actions */}
                <div className="lg:col-span-2 space-y-8 md:space-y-10">
                  
                  {/* Horizontal Scroll Accounts on Mobile, Grid on Desktop */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-4 md:hidden">
                      <h3 className="font-bold text-neutral-900 uppercase tracking-widest text-[10px]">Your Accounts</h3>
                      <button onClick={fetchData} className="text-primary text-[10px] font-bold">RELOAD</button>
                    </div>
                    
                    <div className="-mx-4 px-4 flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 md:grid md:grid-cols-2 lg:gap-6 md:mx-0 md:px-0">
                      {isLoading ? (
                        [1, 2].map(i => (
                          <div key={i} className="min-w-[85vw] md:min-w-0 h-48 md:h-64 bg-neutral-100 rounded-3xl animate-pulse shrink-0" />
                        ))
                      ) : (
                        accounts.map(acc => (
                          <BalanceCard 
                            key={acc.id}
                            type={acc.type}
                            accountNumber={acc.accountNumber}
                            balance={parseFloat(acc.balance)}
                            currency={acc.currency}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Transaction History */}
                  <TransactionList transactions={transactions} isLoading={isLoading} />
                </div>

                {/* Right Column: Profile & Insights (Hidden partially on mobile since BottomNav exists) */}
                <div className="hidden lg:block space-y-8">
                  {/* Profile Section */}
                  <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                        <User size={32} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-neutral-900">{user?.firstName} {user?.lastName}</h3>
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">{user?.role} Access</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button 
                        onClick={() => setShowTransferForm(true)}
                        className="w-full p-4 bg-neutral-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-neutral-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                            <ArrowUpRight size={18} />
                          </div>
                          <span className="font-bold text-sm text-neutral-700">Quick Transfer</span>
                        </div>
                        <ArrowRight size={16} className="text-neutral-300 group-hover:text-primary transition-colors" />
                      </button>

                      <Link 
                        href="/dashboard/loans"
                        className="p-4 bg-neutral-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-neutral-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                            <Banknote size={18} />
                          </div>
                          <span className="font-bold text-sm text-neutral-700">Apply for Loan</span>
                        </div>
                        <ArrowRight size={16} className="text-neutral-300 group-hover:text-primary transition-colors" />
                      </Link>

                      <div className="p-4 bg-neutral-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-neutral-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                            <LayoutDashboard size={18} />
                          </div>
                          <span className="font-bold text-sm text-neutral-700">Insights</span>
                        </div>
                        <ArrowRight size={16} className="text-neutral-300 group-hover:text-secondary transition-colors" />
                      </div>
                    </div>

                    <button 
                      onClick={logout}
                      className="w-full mt-8 py-4 px-6 border-2 border-neutral-100 hover:border-red-100 hover:text-red-500 rounded-2xl text-sm font-bold text-neutral-500 transition-all active:scale-95"
                    >
                      Sign Out of Portal
                    </button>
                  </div>

                  {/* Savings Goals Component */}
                  <SavingsGoals />

                  <div className="bg-secondary rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <PieChart size={120} className="-mr-10 -mt-10" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-primary font-bold text-xl uppercase italic">Agave Susu</h4>
                      <p className="text-primary/70 text-sm mt-2 font-medium">Earn up to 12% annual interest on your daily savings.</p>
                      <button className="mt-6 text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Learn More <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Persistent Bottom Nav on Mobile */}
      <BottomNav onTransferClick={() => setShowTransferForm(true)} />
      
      {/* Footer only on Desktop */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
