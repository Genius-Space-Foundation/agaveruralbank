"use client";

import React, { useState } from 'react';
import { Search, Loader2, ChevronRight, User } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function UserSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await api.get(`/staff/users?query=${encodeURIComponent(query)}`);
      setResults(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
        <p className="text-neutral-500">Search and manage customer accounts.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or account number..."
              className="block w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all disabled:opacity-70 flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Search'}
          </button>
        </form>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-neutral-50">
            <h3 className="font-bold text-lg text-neutral-900">Search Results ({results.length})</h3>
          </div>
          
          <div className="divide-y divide-neutral-50">
            {results.length === 0 ? (
              <div className="p-12 text-center text-neutral-500">
                No users found matching "{query}"
              </div>
            ) : (
              results.map((user) => (
                <Link 
                  key={user.id} 
                  href={`/staff/users/${user.id}`}
                  className="p-6 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 font-bold text-lg">
                      {user.profile?.firstName?.[0] || <User size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900">
                        {user.profile?.firstName} {user.profile?.lastName}
                      </h4>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-right hidden md:block">
                      <p className="text-neutral-500 text-xs uppercase tracking-wider font-bold">KYC Level</p>
                      <p className="font-bold text-neutral-900">{user.profile?.kycLevel || 0}</p>
                    </div>
                    <div className="text-right hidden md:block">
                       <p className="text-neutral-500 text-xs uppercase tracking-wider font-bold">Accounts</p>
                       <p className="font-bold text-neutral-900">{user.accounts?.length || 0}</p>
                    </div>
                    <ChevronRight className="text-neutral-300 group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
