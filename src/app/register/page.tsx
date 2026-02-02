"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Register
      await api.post('/auth/register', formData);
      
      // 2. Login automatically after registration
      const loginRes = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      login(loginRes.data.access_token, loginRes.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 py-20">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[120px] -ml-64 -mb-64" />
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-neutral-200/50 overflow-hidden relative z-10 border border-neutral-100">
        
        {/* Left Side: Brand/Info */}
        <div className="bg-primary p-10 text-white flex flex-col justify-between hidden md:flex">
          <div>
            <Link href="/" className="inline-block mb-12">
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-white/20 w-16 h-16 flex items-center justify-center mb-4">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              </div>
              <h2 className="font-bold text-xl tracking-tight">AGAVE BANK</h2>
            </Link>
            
            <h1 className="text-3xl font-bold mb-6 leading-tight">Start Your Financial Journey Today</h1>
            <p className="text-white/70 mb-8 leading-relaxed">Join thousands of Ghanians securing their future with Agave Rural Bank.</p>
            
            <div className="space-y-4">
              {[
                "Instant Mobile Banking Access",
                "Secure High-Interest Savings",
                "Community-Focused Support",
                "Easy KYC Verification"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-secondary" />
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-white/50 text-xs">
            © 2026 Agave Rural Bank. Partnering for your growth.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">Create Account</h2>
            <p className="text-neutral-500 mt-2 text-sm">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">First Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium"
                  placeholder="+233 XX XXX XXXX"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Create Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-medium"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:active:scale-100 shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    Open My Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-neutral-600 font-medium pt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-bold">
                Sign In
              </Link>
            </p>
          </form>

          {/* Trust Seal */}
          <div className="mt-8 flex items-center justify-center gap-2 text-neutral-300 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={14} />
            <span>Regulated by Bank of Ghana</span>
          </div>
        </div>

      </div>
    </div>
  );
}
