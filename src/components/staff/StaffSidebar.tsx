"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  LayoutDashboard, 
  FileCheck, 
  ShieldAlert, 
  LogOut,
  Settings 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function StaffSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  
  // Define all possible links with role restrictions
  const allLinks = [
    { name: 'Overview', href: '/staff', icon: <LayoutDashboard size={20} />, roles: ['TELLER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'User Management', href: '/staff/users', icon: <Users size={20} />, roles: ['TELLER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'KYC Reviews', href: '/staff/kyc', icon: <FileCheck size={20} />, roles: ['TELLER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Audit Logs', href: '/staff/audit', icon: <ShieldAlert size={20} />, roles: ['ADMIN', 'SUPERADMIN'] },
    { name: 'Manage Staff', href: '/staff/manage', icon: <Settings size={20} />, roles: ['SUPERADMIN'] },
  ];

  // Filter links based on user role
  const links = allLinks.filter(link => user?.role && link.roles.includes(user.role));

  return (
    <div className="w-64 bg-neutral-900 min-h-screen text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold">Agave Staff</h2>
        <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">{user?.role} Portal</p>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
         <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-xs">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
            </div>
         </div>
         <button 
           onClick={logout} 
           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold"
         >
           <LogOut size={18} />
           Logout
         </button>
      </div>
    </div>
  );
}
