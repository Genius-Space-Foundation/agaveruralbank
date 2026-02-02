"use client";

import React, { useState, useEffect } from 'react';
import { 
  Banknote, 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  Calendar,
  Send,
  TrendingUp 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoanCalculator from '@/components/dashboard/LoanCalculator';

interface Loan {
  id: string;
  amount: string | number;
  type: string;
  status: string;
  interestRate: string | number;
  termMonths: number;
  purpose: string;
  createdAt: string;
}

export default function LoansPage() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('PERSONAL');
  const [term, setTerm] = useState('12');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fetchLoans = async () => {
    try {
      const response = await api.get('/transactions/loans');
      setLoans(response.data);
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/transactions/loans/apply', {
        amount: parseFloat(amount),
        type,
        termMonths: parseInt(term),
        purpose
      });
      setStatus('success');
      fetchLoans();
      setTimeout(() => {
        setShowForm(false);
        setStatus('idle');
        setAmount('');
        setPurpose('');
      }, 2000);
    } catch (error) {
      console.error('Loan application failed:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary font-bold transition-colors mb-4">
                <ArrowLeft size={18} />
                Dashboard
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 flex items-center gap-3">
                <Banknote size={36} className="text-primary" />
                Loans & Credit
              </h1>
            </div>
            
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-white px-6 md:px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2 active:scale-95"
            >
              {showForm ? <ArrowLeft size={20} /> : <Plus size={20} />}
              {showForm ? 'Cancel Application' : 'New Loan Application'}
            </button>
          </div>

          {showForm ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Form Column */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-neutral-100 shadow-xl">
                <h3 className="text-2xl font-bold text-neutral-900 mb-8">Loan Details</h3>
                
                {status === 'success' ? (
                  <div className="text-center py-20 px-8 bg-green-50 rounded-3xl border border-green-100 animate-pulse">
                    <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
                    <h4 className="text-2xl font-bold text-neutral-900">Application Received!</h4>
                    <p className="text-neutral-500 mt-2">A loan officer will review your request shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Amount (GHS)</label>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Min GHS 500"
                        className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-2xl focus:border-primary transition-all font-bold"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Loan Type</label>
                        <select 
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-2xl focus:border-primary transition-all font-bold"
                        >
                          <option value="PERSONAL">Personal</option>
                          <option value="BUSINESS">Business</option>
                          <option value="FARM">Agave Farm</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Term (Months)</label>
                        <select 
                          value={term}
                          onChange={(e) => setTerm(e.target.value)}
                          className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-2xl focus:border-primary transition-all font-bold"
                        >
                          {[3, 6, 12, 18, 24, 36, 48, 60].map(m => (
                            <option key={m} value={m}>{m} Months</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Purpose of Loan</label>
                      <textarea 
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="e.g. Buying equipment for my poultry farm..."
                        className="w-full bg-neutral-50 border-2 border-neutral-100 p-4 rounded-2xl focus:border-primary transition-all font-bold h-32"
                        required
                      />
                    </div>

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 text-sm font-bold">
                        <AlertCircle size={18} /> Application failed. Check your KYC status.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                      Submit Application
                    </button>
                    <p className="text-center text-[10px] text-neutral-400 font-bold uppercase italic">
                      *By submitting, you agree to Agave Bank's credit terms.
                    </p>
                  </form>
                )}
              </div>

              {/* Calculator Column */}
              <div className="space-y-8">
                <LoanCalculator />
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl text-orange-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-tighter text-xs">
                    <AlertCircle size={18} /> Required Documents
                  </div>
                  <ul className="text-xs space-y-2 list-disc pl-4 font-medium italic opacity-80">
                    <li>Copy of Ghana Card (verified KYC Level 2+)</li>
                    <li>3 Months Bank Statement</li>
                    <li>Passport-sized photograph</li>
                    <li>Proof of business/farm ownership (for business loans)</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Existing Loans List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-neutral-50 flex justify-between items-center">
                      <h3 className="font-bold text-xl text-neutral-900">Your Applications</h3>
                      <button className="text-primary text-sm font-bold hover:underline">Support</button>
                    </div>

                    <div className="divide-y divide-neutral-50">
                      {isLoading ? (
                        [1, 2].map(i => <div key={i} className="p-8 animate-pulse bg-neutral-50/50 h-24" />)
                      ) : loans.length === 0 ? (
                        <div className="p-20 text-center space-y-4">
                          <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-200">
                            <Banknote size={32} />
                          </div>
                          <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm">No loans found</p>
                          <button onClick={() => setShowForm(true)} className="text-primary font-bold text-sm hover:underline">Apply for your first loan →</button>
                        </div>
                      ) : (
                        loans.map((loan) => (
                          <div key={loan.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-colors">
                            <div className="flex items-center gap-6">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                                loan.status === 'PENDING' ? 'bg-orange-50 text-orange-500' : 
                                loan.status === 'APPROVED' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                              }`}>
                                <Banknote size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg text-neutral-900">{loan.type} LOAN</h4>
                                <p className="text-sm font-medium text-neutral-500 italic mt-0.5">{loan.purpose}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-8 md:gap-12 pl-16 md:pl-0">
                              <div className="text-right">
                                <p className="text-xl font-bold text-neutral-900">GHS {parseFloat(loan.amount.toString()).toLocaleString()}</p>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">{loan.termMonths} Months @ {loan.interestRate}%</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                  loan.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 
                                  loan.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                }`}>
                                  {loan.status}
                                </span>
                                <p className="text-[9px] text-neutral-400 mt-2 font-medium">
                                  {new Date(loan.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                  <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <TrendingUp size={120} className="-mr-10 -mt-10" />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-secondary font-bold text-xl italic uppercase">Agave Micro-Credit</h4>
                      <p className="text-white/70 text-sm font-medium leading-relaxed">Boost your business with our tailored micro-loans. Fast approval for verified customers.</p>
                      <ul className="space-y-2">
                        {['Competitive rates', 'No collatral for SME', 'Flexible repayments'].map((li, i) => (
                          <li key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle2 size={12} className="text-secondary" /> {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-neutral-200 p-8 rounded-[2.5rem] text-center space-y-4">
                    <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
                      <Calendar size={24} />
                    </div>
                    <h5 className="font-bold text-neutral-900">Need a bigger Loan?</h5>
                    <p className="text-xs text-neutral-500 font-medium italic">Schedule a meeting with our loan officers at your nearest Agave Rural Bank branch.</p>
                    <button className="text-primary font-bold text-sm hover:underline">Find a Branch →</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
