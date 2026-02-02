"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function KYCPage() {
  const { user, refreshProfile } = useAuth();
  const [idType, setIdType] = useState('Ghana Card');
  const [idNumber, setIdNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idNumber) {
      setErrorMessage('Please enter your national ID number');
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    try {
      await api.post('/customers/kyc', { nationalId: idNumber });
      await refreshProfile();
      setStatus('success');
    } catch (error: any) {
      console.error('KYC Submission failed:', error);
      setErrorMessage(error.response?.data?.message || 'Verification failed. Please check your ID and try again.');
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.kycLevel && user.kycLevel >= 2) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4 pt-32">
          <div className="bg-white rounded-3xl p-10 border border-neutral-100 shadow-xl max-w-md text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={44} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">You're Verified!</h2>
            <p className="text-neutral-500 font-medium">Your identity has been verified. You now enjoy full access to all Agave Bank features and higher transfer limits.</p>
            <Link 
              href="/dashboard"
              className="block w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-0">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary font-bold transition-colors mb-8">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left Content */}
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-4xl font-bold text-neutral-900 leading-tight">Verify Your Identity</h1>
              <p className="text-neutral-500 font-medium leading-relaxed italic">
                Agave Rural Bank takes your security seriously. Verifying your identity helps us protect your funds and comply with Ghanaian banking regulations.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  'Daily transfer limits up to GHS 10,000',
                  'Priority customer support',
                  'Access to business loans',
                  'Seamless international transfers'
                ].map((perk, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <CheckCircle2 size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold text-neutral-700">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-orange-800">
                <AlertCircle className="shrink-0" size={20} />
                <p className="text-xs font-bold leading-relaxed tracking-tight">
                  Verification usually takes less than 2 minutes. Have your ID card ready.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-neutral-100 shadow-2xl shadow-neutral-200/50">
                {status === 'success' ? (
                  <div className="text-center py-10 space-y-6 animate-fadeIn">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">Verification Submitted!</h3>
                    <p className="text-neutral-500 font-medium">
                      Your ID has been submitted successfully. Your account status has been updated.
                    </p>
                    <Link 
                      href="/dashboard"
                      className="block w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg"
                    >
                      Return to Dashboard
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                        <CreditCard size={16} className="text-primary" />
                        Select ID Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Ghana Card', 'Passport', 'Voter ID', 'National ID'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setIdType(type)}
                            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                              idType === type 
                                ? 'border-primary bg-primary/5 text-primary active:scale-[0.98]' 
                                : 'border-neutral-100 bg-neutral-50 text-neutral-400 hover:border-primary/30 active:scale-[0.98]'
                            }`}
                          >
                            <span className="font-bold text-sm tracking-tight">{type}</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              idType === type ? 'border-primary bg-primary' : 'border-neutral-200 bg-white'
                            }`}>
                              {idType === type && <CheckCircle2 size={12} className="text-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="idNumber" className="text-sm font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                        <Lock size={16} className="text-primary" />
                        ID Number ({idType})
                      </label>
                      <input
                        id="idNumber"
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder={idType === 'Ghana Card' ? 'GHA-000000000-0' : 'Enter number...'}
                        className="w-full bg-neutral-50 border-2 border-neutral-100 p-5 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-mono text-lg font-bold placeholder:text-neutral-300"
                        required
                      />
                    </div>

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex gap-3 text-sm animate-shake">
                        <AlertCircle className="shrink-0" size={20} />
                        <span className="font-bold">{errorMessage}</span>
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.98]"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" size={24} />
                        ) : (
                          <>
                            <ShieldCheck size={24} />
                            Submit Verification
                          </>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-neutral-400 mt-6 font-bold uppercase tracking-widest">
                        SECURE ENCRYPTED VERIFICATION SYSTEM
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
