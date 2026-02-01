"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Lock, Phone, MapPin, Search, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Personal", href: "/personal" },
    { name: "Business", href: "/business" },
    { name: "Digital", href: "/digital" },
    { name: "About Us", href: "/about" },
    { name: "Support", href: "/support" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Bar (Only visible when not scrolled) */}
      <div className={`bg-primary text-white py-2 px-4 md:px-8 hidden md:flex justify-between items-center text-sm border-b border-white/10 transition-all duration-300 ${isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-secondary" />
            +233 (0) 30 123 4567
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-secondary" />
            Find a Branch
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-secondary transition-colors">News</Link>
          <Link href="#" className="hover:text-secondary transition-colors">Careers</Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 px-4 md:px-8 py-4 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3 translate-y-[-38px]" : "bg-white/90 backdrop-blur-sm"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Agave Rural Bank Logo" 
              width={isScrolled ? 50 : 60} 
              height={isScrolled ? 50 : 60} 
              className="object-contain transition-all"
              priority
            />
            <div className="flex flex-col">
              <span className="text-primary font-bold text-lg md:text-xl leading-none">AGAVE RURAL BANK</span>
              <span className="text-secondary font-semibold text-[10px] md:text-xs tracking-widest mt-0.5">PARTNERING FOR GROWTH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-neutral-700 font-bold hover:text-primary transition-colors relative group text-sm uppercase tracking-wider"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-l border-neutral-200 pl-8 ml-4">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <User size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors">{user?.firstName}</span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Manage Account</span>
                  </div>
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 text-sm"
              >
                <Lock size={16} />
                Internet Banking
              </Link>
            )}
          </div>

          {/* Action Buttons & Mobile Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link 
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="bg-primary text-white p-2.5 rounded-xl shadow-md"
            >
              {isAuthenticated ? <User size={22} /> : <Lock size={22} />}
            </Link>
            <button 
              className="p-2 text-primary bg-neutral-100 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden border-t border-neutral-100 ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-xl font-bold text-neutral-800 hover:text-primary transition-colors flex justify-between items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
              <ChevronDown size={20} className="-rotate-90 text-neutral-300" />
            </Link>
          ))}
          
          <div className="pt-6 border-t border-neutral-50 flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-primary font-bold">Portal Dashboard</p>
                  </div>
                </Link>
                <button 
                  onClick={logout}
                  className="w-full py-4 text-center text-red-500 font-bold border-2 border-red-50 rounded-2xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock size={20} />
                Login to Portal
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
