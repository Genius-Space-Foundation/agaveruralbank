import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Smartphone, Laptop, SmartphoneIcon as Ussd, ShieldCheck, Lock, Wifi, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const channels = [
  {
    title: "Mobile App",
    icon: <Smartphone size={40} />,
    desc: "The bank in your pocket. Check balances, transfer funds, and pay bills anywhere.",
    features: ["Biometric Login", "Instant Transfers", "Utility Bill Payments", "Airtime Top-up"],
  },
  {
    title: "Internet Banking",
    icon: <Laptop size={40} />,
    desc: "Secure banking from your desktop. Perfect for business transfers and bulk payments.",
    features: ["E-Statements", "Bulk Salary Payments", "Standing Orders", "International Transfers"],
  },
  {
    title: "USSD (*123#)",
    icon: <Ussd size={40} />,
    desc: "No internet? No problem. Bank conveniently on any mobile phone using USSD.",
    features: ["Works on all phones", "No Data Required", "Quick Balance Check", "Mini Statements"],
  },
];

export default function DigitalBanking() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40 text-foreground">
        {/* Banner */}
        <section className="bg-indigo-900 py-24 relative overflow-hidden text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-bold mb-6">
                <Wifi size={16} />
                Banking Without Boundaries
              </div>
              <h1 className="text-5xl font-bold mb-6">Bank Anytime, <br /> <span className="text-accent">Anywhere.</span></h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Experience the convenience of modern banking with Agave Rural Bank's suite of digital channels. Secure, fast, and accessible 24/7.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                   App Store
                </button>
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
                   Google Play
                </button>
              </div>
            </div>
            <div className="flex-1 relative w-full h-[400px]">
               <div className="absolute inset-x-0 bottom-0 bg-white/5 backdrop-blur-3xl rounded-t-3xl border-t border-x border-white/10 p-8 h-full">
                  <div className="flex flex-col gap-6">
                    <div className="p-4 bg-white/10 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-secondary rounded-lg text-white">
                        <ShieldCheck />
                      </div>
                      <div>
                        <p className="font-bold">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-400">Your security is our priority</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-xl flex items-center gap-4">
                      <div className="p-3 bg-accent rounded-lg text-primary">
                        <Lock />
                      </div>
                      <div>
                        <p className="font-bold">End-to-End Encryption</p>
                        <p className="text-xs text-gray-400">Safe and private transactions</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {channels.map((chan, idx) => (
                <div key={idx} className="group p-10 rounded-3xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all">
                  <div className="text-primary mb-8 group-hover:scale-110 transition-transform inline-block">
                    {chan.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{chan.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{chan.desc}</p>
                  <div className="space-y-4 mb-8">
                    {chan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Get Started <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Tips */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="bg-white p-12 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1">
                 <h2 className="text-3xl font-bold text-primary mb-6">Stay Safe Online</h2>
                 <p className="text-gray-600 mb-10 text-lg">
                   At Agave Rural Bank, we want you to have a secure banking experience. Follow these tips to protect your accounts:
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   {[
                     { title: "Passwords", desc: "Never share your PIN or password with anyone, including bank staff." },
                     { title: "Links", desc: "Beware of suspicious emails or SMS links claiming to be from the bank." },
                     { title: "Wi-Fi", desc: "Avoid using public Wi-Fi for your digital banking transactions." },
                     { title: "Reports", desc: "Report any lost cards or suspicious activity immediately." }
                   ].map((tip, idx) => (
                     <div key={idx}>
                       <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                         <ShieldCheck size={18} className="text-secondary" /> {tip.title}
                       </h4>
                       <p className="text-sm text-gray-500">{tip.desc}</p>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="flex-1 w-full flex justify-center">
                  <div className="p-10 border-4 border-dashed border-gray-100 rounded-3xl text-center">
                    <Ussd size={80} className="mx-auto mb-6 text-gray-300" />
                    <h4 className="text-2xl font-bold mb-4">Emergency Support?</h4>
                    <p className="text-gray-500 mb-6">Call our 24/7 fraud hotline if you suspect any compromise.</p>
                    <p className="text-3xl font-bold text-secondary">+233 (0) 30 123 9999</p>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
