"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.access_token, response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-neutral-200/50 overflow-hidden relative z-10 border border-neutral-100">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex flex-col items-center mb-6">
              <div className="bg-white p-2 rounded-full mb-3 shadow-sm border border-neutral-100">
                <Image src="/logo.png" alt="Logo" width={60} height={60} />
              </div>
              <span className="text-primary font-bold text-2xl">AGAVE BANK</span>
              <span className="text-secondary font-semibold text-xs tracking-widest mt-1">SECURE PORTAL</span>
            </Link>
            <h1 className="text-2xl font-bold text-neutral-900 text-center">Login to your account</h1>
            <p className="text-neutral-500 text-center mt-2">Enter your credentials to access your banking dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                <>
                  Login to Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Proof/Trust */}
          <div className="mt-8 flex items-center justify-center gap-2 text-neutral-400 text-sm">
            <ShieldCheck size={16} />
            <span>Bank-grade security encryption active</span>
          </div>
        </div>

        <div className="bg-neutral-50 px-8 py-6 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-600 font-medium">
            Don't have an account yet?{' '}
            <Link href="#" className="text-secondary hover:underline font-bold">
              Join Agave Bank
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
