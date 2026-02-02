"use client";

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Plus, 
  MoreVertical, 
  TrendingUp, 
  ChevronRight,
  Loader2,
  Trophy,
  Trash2
} from 'lucide-react';
import api from '@/lib/api';

interface Goal {
  id: string;
  title: string;
  targetAmount: string | number;
  currentAmount: string | number;
  currency: string;
  deadline?: string;
}

export default function SavingsGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Goal Form State
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await api.get('/customers/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !target) return;

    try {
      await api.post('/customers/goals', {
        title,
        targetAmount: parseFloat(target),
      });
      setTitle('');
      setTarget('');
      setIsAdding(false);
      fetchGoals();
    } catch (error) {
      console.error('Failed to add goal:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/customers/goals/${id}`);
      fetchGoals();
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-neutral-100 flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Target size={20} />
          </div>
          <h3 className="font-bold text-neutral-900">Savings Goals</h3>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 bg-neutral-50 hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
        >
          {isAdding ? <MoreVertical size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddGoal} className="mb-6 p-4 bg-neutral-50 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4">
          <input 
            type="text" 
            placeholder="Goal Title (e.g. New Farm Tools)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20"
            required
          />
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Target GHS" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="flex-grow p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20"
              required
            />
            <button type="submit" className="bg-primary text-white px-4 py-3 rounded-xl font-bold text-sm">Save</button>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <div className="text-center py-10 px-4">
          <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
            <TrendingUp size={24} />
          </div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">No goals set yet</p>
          <p className="text-[10px] text-neutral-400 mt-1 italic">Start saving for your dreams today.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const current = parseFloat(goal.currentAmount.toString());
            const target = parseFloat(goal.targetAmount.toString());
            const progress = Math.min(Math.round((current / target) * 100), 100);
            
            return (
              <div key={goal.id} className="group relative">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 group-hover:text-primary transition-colors">{goal.title}</h4>
                    <p className="text-[10px] font-bold text-neutral-400 mt-0.5">
                      GHS {current.toLocaleString()} of GHS {target.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{progress}%</span>
                    <button 
                      onClick={() => handleDelete(goal.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-neutral-300 hover:text-red-500 transition-all font-bold"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      progress >= 100 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-primary'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {progress >= 100 && (
                  <div className="absolute -top-1 -right-1 animate-bounce">
                    <Trophy size={16} className="text-yellow-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button className="w-full mt-8 py-3 px-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 group">
        All Financial Targets
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
