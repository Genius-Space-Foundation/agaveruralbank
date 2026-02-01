"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  History, 
  Settings, 
  User 
} from 'lucide-react';

interface BottomNavProps {
  onTransferClick?: () => void;
}

export default function BottomNav({ onTransferClick }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
    { icon: ArrowUpRight, label: 'Transfer', href: '#' }, // Will trigger form
    { icon: History, label: 'History', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-neutral-100 px-6 py-3 pb-8 z-50 flex justify-between items-center shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <button 
            key={item.label} 
            onClick={item.label === 'Transfer' ? onTransferClick : undefined}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary' : 'text-neutral-400'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${
              isActive ? 'bg-primary/10 shadow-sm' : ''
            }`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
