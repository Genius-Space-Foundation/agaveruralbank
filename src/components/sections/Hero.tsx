import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-40 overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero.png" 
          alt="Banking with Agave Rural Bank" 
          fill 
          className="object-cover object-center brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-secondary/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <ShieldCheck size={16} />
            Trusted Financial Partner in Ghana
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
            Secure, Reliable Banking for <span className="text-secondary">Your Growth</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
            Empowering farmers, entrepreneurs, and families with innovative financial solutions tailored for the Ghanaian community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/personal/open-account" 
              className="btn-secondary text-lg flex items-center justify-center gap-2 group"
            >
              Open an Account
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/loans" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-white hover:text-primary transition-all text-lg flex items-center justify-center gap-2"
            >
              Apply for a Loan
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-lg">
            <div>
              <div className="text-3xl font-bold text-secondary">1985</div>
              <p className="text-sm text-gray-400">Established</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">20+</div>
              <p className="text-sm text-gray-400">Branches</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">50K+</div>
              <p className="text-sm text-gray-400">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute bottom-12 right-8 hidden lg:block animate-bounce-slow">
        <div className="glass p-6 rounded-2xl max-w-xs shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1">Agri-Loans</h4>
              <p className="text-xs text-gray-600">Special interest rates for cocoa and cashew farmers. Apply today!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
