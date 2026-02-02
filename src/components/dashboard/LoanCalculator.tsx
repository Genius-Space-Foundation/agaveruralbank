"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Info, 
  ArrowRight, 
  Banknote, 
  Calendar, 
  TrendingUp,
  LandPlot,
  Briefcase,
  User 
} from 'lucide-react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(12);
  const [type, setType] = useState('PERSONAL');
  
  // Simulated interest rates
  const rates: Record<string, number> = {
    PERSONAL: 15.0,
    BUSINESS: 12.5,
    FARM: 10.0
  };

  const currentRate = rates[type];
  const monthlyRate = currentRate / 100 / 12;
  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
  const totalRepayment = monthlyPayment * term;
  const totalInterest = totalRepayment - amount;

  const loanTypes = [
    { id: 'PERSONAL', icon: User, label: 'Personal', desc: 'Medical, Fees, Emergency' },
    { id: 'BUSINESS', icon: Briefcase, label: 'Business', desc: 'SME, Stock, Equipment' },
    { id: 'FARM', icon: LandPlot, label: 'Agave Farm', desc: 'Seeds, Tractor, Poultry' },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-neutral-100 shadow-2xl shadow-neutral-200/50">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Calculator size={30} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Loan Calculator</h2>
          <p className="text-neutral-400 font-medium text-sm italic">Get an estimate for your Agave Rural Bank loan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              Select Loan Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {loanTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    type === t.id 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-neutral-50 bg-neutral-50 text-neutral-400 hover:border-primary/20'
                  }`}
                >
                  <t.icon size={20} />
                  <span className="font-bold text-xs">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <span>Loan Amount</span>
              <span className="text-primary font-bold text-sm">GHS {amount.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="50000" 
              step="500" 
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <span>Term (Months)</span>
              <span className="text-primary font-bold text-sm">{term} Months</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="60" 
              step="3" 
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={120} className="-mr-10 -mt-10" />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Monthly Repayment</p>
              <h3 className="text-4xl font-bold">GHS {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Interest Rate</p>
                <p className="text-lg font-bold text-secondary">{currentRate}% p.a.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Total Interest</p>
                <p className="text-lg font-bold">GHS {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-xs text-neutral-400 leading-relaxed italic mb-8">
                *This is an estimated calculation. Final interest rates and terms depend on your kycLevel and credit history.
              </p>
              <button className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold hover:bg-secondary-dark transition-all flex items-center justify-center gap-2 group">
                Apply for this Loan <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
