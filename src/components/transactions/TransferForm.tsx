"use client";

import React, { useState } from 'react';
import { 
  Send, 
  User, 
  CreditCard, 
  Hash, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import api from '@/lib/api';
import { v4 as uuidv4 } from 'uuid';

interface TransferFormProps {
  accounts: any[];
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TransferForm({ accounts, onSuccess, onCancel }: TransferFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    senderAccountId: accounts[0]?.id || '',
    receiverAccountNumber: '',
    amount: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formData.receiverAccountNumber || !formData.amount) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/transactions/transfer', {
        ...formData,
        amount: parseFloat(formData.amount),
        idempotencyKey: uuidv4(),
      });
      setTransactionId(response.data.reference);
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Transfer failed. Please check balance and receiver details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="bg-primary p-8 text-white">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Send size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Fund Transfer</h2>
            <p className="text-white/60 text-sm font-medium italic">Secure Inter-bank movement</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex gap-3 text-sm animate-shake">
            <AlertCircle size={20} className="shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <CreditCard size={14} />
                From Account
              </label>
              <select
                name="senderAccountId"
                value={formData.senderAccountId}
                onChange={handleInputChange}
                className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold appearance-none"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.type} Account ({acc.accountNumber}) - GHS {parseFloat(acc.balance).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <Hash size={14} />
                Recipient Account Number
              </label>
              <input
                type="text"
                name="receiverAccountNumber"
                value={formData.receiverAccountNumber}
                onChange={handleInputChange}
                placeholder="0000 0000 0000"
                className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <span className="text-lg">₵</span>
                Amount (GHS)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-2xl font-bold"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={onCancel}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-neutral-500 hover:bg-neutral-50 transition-all border border-neutral-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] bg-primary text-white py-4 px-6 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                Continue Transfer
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100 space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-neutral-200 pb-3">
                <span className="text-neutral-500 font-medium">Recipient</span>
                <span className="font-bold text-neutral-900">{formData.receiverAccountNumber}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-neutral-200 pb-3">
                <span className="text-neutral-500 font-medium">Amount</span>
                <span className="text-xl font-bold text-primary">GHS {parseFloat(formData.amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500 font-medium">Fees</span>
                <span className="font-bold text-neutral-900">GHS 0.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} />
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[100px]"
                placeholder="e.g., School fees payment"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setStep(1)}
                className="p-4 rounded-2xl font-bold text-neutral-500 hover:bg-neutral-50 transition-all"
              >
                <ArrowLeft />
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-secondary text-primary py-4 px-6 rounded-2xl font-bold hover:bg-secondary-dark transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Lock size={20} />}
                Confirm & Send Money
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">Transfer Successful!</h3>
            <p className="text-neutral-500">
              The amount of <span className="text-neutral-900 font-bold">GHS {parseFloat(formData.amount).toFixed(2)}</span> has been sent successfully.
            </p>
            <div className="p-4 bg-neutral-50 rounded-2xl font-mono text-xs text-neutral-400 break-all">
              REF: {transactionId}
            </div>
            <button 
              onClick={onSuccess}
              className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
