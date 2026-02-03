"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import StaffSidebar from '@/components/staff/StaffSidebar';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Wait for auth to load
    if (loading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if user has staff role
    const staffRoles = ['TELLER', 'ADMIN', 'SUPERADMIN'];
    if (!user?.role || !staffRoles.includes(user.role)) {
      router.push('/dashboard'); // Redirect non-staff to customer dashboard
    }
  }, [user, loading, isAuthenticated, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // Show access denied if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Show access denied if not staff
  const staffRoles = ['TELLER', 'ADMIN', 'SUPERADMIN'];
  if (!user?.role || !staffRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Access Denied</h2>
          <p className="text-neutral-500">You do not have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      <StaffSidebar />
      <main className="flex-grow ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
