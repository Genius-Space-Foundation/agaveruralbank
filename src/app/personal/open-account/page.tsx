"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  FileText,
  UserCheck,
  CreditCard,
  Target
} from 'lucide-react';

export default function OpenAccountLanding() {
  const steps = [
    {
      icon: UserCheck,
      iconColor: "text-primary",
      title: "Register Online",
      desc: "Create your secure banking profile in under 2 minutes with basic personal details."
    },
    {
      icon: FileText,
      iconColor: "text-secondary",
      title: "KYC Verification",
      desc: "Upload a photo of your Ghana Card or Passport to verify your identity."
    },
    {
      icon: CreditCard,
      iconColor: "text-primary",
      title: "Choose Product",
      desc: "Select between Savings, Current, or Susu accounts tailored to your lifestyle."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40">
        {/* Onboarding Hero */}
        <section className="bg-neutral-900 py-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/2 z-0" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-secondary font-bold text-xs uppercase tracking-widest mb-8">
                <Target size={14} /> Digital Onboarding
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Open your account <br />
                <span className="text-secondary">entirely online.</span>
              </h1>
              <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl">
                Skip the queues. Joining Ghana's fastest-growing rural bank has never been easier. No paperwork, no stress.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="bg-secondary hover:bg-secondary-dark text-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-secondary/10 transition-all transform active:scale-95">
                  Start My Application
                </Link>
                <div className="flex items-center gap-3 px-6 text-sm text-neutral-400 font-medium italic">
                  <Clock size={18} /> Takes ~5 minutes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">What you'll need</h2>
                <p className="text-neutral-500 text-lg mb-10">Before you begin, ensure you have the following ready for a smooth experience.</p>
                
                <div className="space-y-6">
                  {[
                    { title: "Valid National ID", desc: "Ghana Card, Passport, or Voter ID." },
                    { title: "Internet Connection", desc: "For secure document upload and verification." },
                    { title: "Basic Information", desc: "Your contact details and digital address." }
                  ].map((req, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-neutral-900">{req.title}</h4>
                        <p className="text-neutral-500">{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-neutral-50 rounded-[3rem] p-12 border border-neutral-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-xl shadow-neutral-200 mb-8">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Secure & Regulated</h3>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Your data is protected by bank-grade AES-256 encryption and we are fully compliant with the Bank of Ghana digital banking regulations.
                </p>
                <Link href="/support" className="text-primary font-bold hover:underline">Learn about our security →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">The Journey to Your New Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm relative group hover:shadow-xl transition-all">
                  <div className="absolute top-8 right-8 text-6xl font-black text-neutral-50 group-hover:text-primary/5 transition-colors">0{i+1}</div>
                  <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 relative z-10 transition-transform group-hover:scale-110">
                    <step.icon size={28} className={step.iconColor} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 relative z-10">{step.title}</h3>
                  <p className="text-neutral-500 leading-relaxed font-medium relative z-10">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile App Teaser */}
        <section className="py-24 bg-white border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
              <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-white/5 blur-3xl rounded-full" />
              
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl font-bold">Bank on the go with <br /> <span className="text-secondary tracking-tighter">Agave Mobile</span></h2>
                <p className="text-white/70 text-lg leading-relaxed">Once your account is open, download our app for instant transfers, bill payments, and susu tracking.</p>
                <div className="flex gap-4">
                   <div className="px-6 py-3 border border-white/20 rounded-xl flex items-center gap-3 bg-white/5 grayscale opacity-50">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Coming Soon to</div>
                      <div className="font-bold">App Store</div>
                   </div>
                   <div className="px-6 py-3 border border-white/20 rounded-xl flex items-center gap-3 bg-white/5 grayscale opacity-50">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Coming Soon to</div>
                      <div className="font-bold">Google Play</div>
                   </div>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center relative">
                <div className="w-64 h-[500px] bg-neutral-800 rounded-[3rem] border-[8px] border-black shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 w-full h-8 bg-neutral-900" />
                   <div className="p-4 pt-12">
                      <div className="h-32 bg-primary/20 rounded-2xl mb-4 animate-pulse" />
                      <div className="space-y-3">
                        <div className="h-4 bg-white/10 rounded w-2/3" />
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                      </div>
                   </div>
                </div>
                <div className="absolute -bottom-10 -right-10 bg-secondary p-8 rounded-full shadow-2xl text-primary transform rotate-12">
                  <Smartphone size={40} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-neutral-900 mb-8">Invest in your community. <br />Grow with Agave.</h2>
            <Link href="/register" className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/20 transition-all transform active:scale-95">
              Start Application <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
