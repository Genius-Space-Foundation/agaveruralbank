import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Briefcase, Building2, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const businessProducts = [
  {
    title: "SME Current Account",
    icon: <Briefcase size={32} />,
    description: "Designed for small to medium enterprises with low transactional fees.",
    benefits: ["Business cheque book", "High transaction limits", "Dedicated account manager"],
  },
  {
    title: "Agro-Business Loans",
    icon: <TrendingUp size={32} />,
    description: "Flexible funding for agricultural inputs, equipment, and seasonal harvest.",
    benefits: ["Harvest-linked repayment", "Competitive rates", "Farmer group support"],
  },
  {
    title: "Cooperative Accounts",
    icon: <Building2 size={32} />,
    description: "Specialized accounts for associations and cooperative societies.",
    benefits: ["Dual-signature security", "Competitive interest", "Financial training"],
  },
];

export default function BusinessBanking() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40">
        {/* Hero Section */}
        <section className="bg-primary py-24 relative overflow-hidden text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-6 ">Partnering for <span className="text-accent bold">Business Success</span></h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Whether you're a small stall owner or a large commercial farm, we provide the financial power to scale your operations.
              </p>
              <div className="flex gap-4">
                <Link href="/business/apply" className="btn-secondary">Get a Business Account</Link>
                <Link href="/loans/agriculture" className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-md font-semibold transition-all">SME Loans</Link>
              </div>
            </div>
          </div>
          {/* <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 flex items-center justify-center transform translate-x-1/4">
             <Building2 size={400} />
          </div> */}
           <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
        </section>

        {/* Business Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Innovative products designed to help businesses manage cash flow and access growth capital.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessProducts.map((p, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col bg-gray-50/50">
                  
                  <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                    {p.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{p.description}</p>
                  <ul className="space-y-3 mb-8">
                    {p.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 size={16} className="text-secondary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="#" className="flex items-center gap-2 font-bold text-secondary group">
                    Learn More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trade Finance Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Specialized Services</h2>
                <h2 className="text-4xl font-bold mb-8">Trade Finance & Guarantees</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  We facilitate trade by providing letters of credit, bank guarantees, and overdraft facilities that ensure your business never stops moving.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-secondary" />
                    <span>Letters of Credit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-secondary" />
                    <span>Bank Guarantees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-secondary" />
                    <span>Cash Overdrafts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-secondary" />
                    <span>Import/Export Finance</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full flex items-center justify-center">
                 <div className="p-12 border border-white/10 rounded-3xl bg-white/5 text-center">
                    <TrendingUp size={64} className="text-accent mx-auto mb-6" />
                    <h4 className="text-2xl font-bold mb-4">Need Business Advice?</h4>
                    <p className="text-gray-400 mb-8">Our SME consultants are available to guide you through financial planning.</p>
                    <Link href="/support/contact" className="btn-secondary w-full inline-block">Book a Consultation</Link>
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
