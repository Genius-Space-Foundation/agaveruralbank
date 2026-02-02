"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  Banknote, 
  LandPlot, 
  Briefcase, 
  User, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Percent,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function LoansLanding() {
  const loanTypes = [
    {
      id: 'PERSONAL',
      icon: <User size={32} />,
      title: "Personal Loans",
      description: "Quick funding for medical bills, school fees, or personal emergencies.",
      rate: "From 15% p.a.",
      features: ["Up to GHS 20,000", "Repayment up to 24 months", "No collateral for salary earners"]
    },
    {
      id: 'FARM',
      icon: <LandPlot size={32} />,
      title: "Agribusiness Loans",
      description: "Tailored for cocoa, cashew, and poultry farmers to boost production.",
      rate: "From 10% p.a.",
      features: ["Seasonal repayment plans", "Farmer group lending", "Quick input financing"]
    },
    {
      id: 'BUSINESS',
      icon: <Briefcase size={32} />,
      title: "SME Micro-Credit",
      description: "Scale your business with our flexible SME credit line.",
      rate: "From 12.5% p.a.",
      features: ["Inventory financing", "Flexible repayment", "Dedicated business advisor"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40">
        {/* Loan Hero */}
        <section className="bg-gray-50 py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Banknote size={14} /> Credit Solutions
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
                  Financial support <br />
                  <span className="text-primary underline decoration-secondary decoration-4 underline-offset-8">built for your growth.</span>
                </h1>
                <p className="text-xl text-neutral-500 mb-10 leading-relaxed">
                  Whether you're harvesting crops or expanding your shop, we provide the capital you need with rates you can afford.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register" className="btn-primary px-10 py-4 text-lg">
                    Start My Application
                  </Link>
                  <Link href="/support/contact" className="px-8 py-4 border-2 border-primary/20 hover:border-primary text-primary font-bold rounded-xl transition-all">
                    Talk to a Loan Officer
                  </Link>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 transform translate-y-8">
                       <Percent className="text-secondary mb-4" size={32} />
                       <h4 className="font-bold text-2xl">Competitive</h4>
                       <p className="text-sm text-neutral-400">Ghana's best rates</p>
                    </div>
                    <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
                       <Clock className="text-secondary mb-4" size={32} />
                       <h4 className="font-bold text-2xl">Fast</h4>
                       <p className="text-sm text-white/50">48-hour approvals</p>
                    </div>
                 </div>
                 <div className="space-y-4 pt-8">
                    <div className="bg-neutral-900 p-8 rounded-3xl text-white shadow-xl shadow-neutral-900/20">
                       <ShieldCheck className="text-secondary mb-4" size={32} />
                       <h4 className="font-bold text-2xl">Reliable</h4>
                       <p className="text-sm text-white/50">Transparent terms</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100">
                       <TrendingUp className="text-primary mb-4" size={32} />
                       <h4 className="font-bold text-2xl">Scalable</h4>
                       <p className="text-sm text-neutral-400">Grow your limits</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Products */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Loan Products</h2>
               <p className="text-neutral-500 max-w-2xl mx-auto italic">Transparent, fair, and flexible lending for the Agave Community.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {loanTypes.map((loan, i) => (
                 <div key={i} id={loan.id} className="group p-10 rounded-[2.5rem] border border-neutral-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 bg-white flex flex-col">
                    <div className="w-16 h-16 bg-neutral-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
                       {loan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2">{loan.title}</h3>
                    <p className="text-primary font-bold text-sm mb-4 leading-relaxed">{loan.rate}</p>
                    <p className="text-neutral-500 mb-8 flex-grow leading-relaxed font-medium">
                       {loan.description}
                    </p>
                    <div className="space-y-3 mb-10 pt-6 border-t border-neutral-50">
                       {loan.features.map((feat, j) => (
                         <div key={j} className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
                            <CheckCircle2 size={16} className="text-secondary" /> {feat}
                         </div>
                       ))}
                    </div>
                    <Link href="/register" className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                       Start Application <ArrowRight size={18} />
                    </Link>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Requirements Banner */}
        <section className="py-20 bg-neutral-900 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/2" />
           <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                 <h2 className="text-3xl font-bold mb-6">Simple Eligibility</h2>
                 <p className="text-lg text-neutral-400 mb-8">We believe in making credit accessible. Here is what you need to apply for any of our loan products.</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      "A valid national ID Card",
                      "3 months bank statement",
                      "Active Agave Bank Account",
                      "Ghana Post Digital Address"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 font-bold text-sm">
                        <CheckCircle2 size={18} className="text-secondary" /> {item}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-shrink-0">
                 <div className="bg-white p-10 rounded-[2.5rem] text-neutral-900 border-4 border-secondary shadow-2xl relative">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-primary rotate-12 shadow-lg">
                       <CheckCircle2 size={32} />
                    </div>
                    <h4 className="font-bold text-xl mb-2">Ready to Grow?</h4>
                    <p className="text-sm text-neutral-500 mb-8 max-w-[200px]">Initial limits start from GHS 500 up to GHS 50,000 depending on your kycLevel.</p>
                    <Link href="/register" className="btn-primary w-full text-center">Open My Account</Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
