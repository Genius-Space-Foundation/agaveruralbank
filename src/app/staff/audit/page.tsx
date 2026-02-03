"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { ShieldAlert, Loader2, Calendar, User, LayoutList } from 'lucide-react';

export default function AuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/staff/audit?limit=100');
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch audit logs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">System Audit Logs</h1>
        <p className="text-neutral-500">Monitor system-wide events and security alerts.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-50 flex justify-between items-center">
          <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
             <ShieldAlert className="text-secondary" /> Activity Stream
          </h3>
          <span className="text-xs font-bold bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full">
            Last 100 Events
          </span>
        </div>

        {isLoading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="divide-y divide-neutral-50">
             {logs.length === 0 ? (
                <div className="p-12 text-center text-neutral-400 italic">No audit events found.</div>
             ) : (
                logs.map((log) => (
                   <div key={log.id} className="p-6 hover:bg-neutral-50 transition-colors flex flex-col md:flex-row gap-4 items-start">
                      <div className="p-3 bg-neutral-100 rounded-xl text-neutral-500">
                         <LayoutList size={20} />
                      </div>
                      <div className="flex-grow">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-neutral-900">{log.action}</span>
                            <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-mono">
                               {log.resource}
                            </span>
                         </div>
                         <div className="flex items-center gap-3 text-sm text-neutral-500">
                            <span className="flex items-center gap-1">
                               <User size={14} /> 
                               {log.user?.email || 'System'}
                            </span>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span className="flex items-center gap-1">
                               <Calendar size={14} />
                               {new Date(log.createdAt).toLocaleString()}
                            </span>
                         </div>
                         {log.metadata && (
                            <pre className="mt-2 bg-neutral-900 text-neutral-300 p-3 rounded-lg text-xs font-mono overflow-x-auto max-w-2xl">
                               {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                         )}
                      </div>
                   </div>
                ))
             )}
          </div>
        )}
      </div>
    </div>
  );
}
