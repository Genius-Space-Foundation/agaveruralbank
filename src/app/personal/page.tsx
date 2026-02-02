import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PiggyBank, Wallet, Clock, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "Savings Account",
    icon: <PiggyBank size={32} />,
    description: "Start your savings journey with competitive interest rates and low minimum balance.",
    benefits: ["Tiered interest rates", "Free monthly statements", "Mobile banking access"],
  },
  {
    title: "Current Account",
    icon: <Wallet size={32} />,
    description: "A flexible account for your daily banking needs with checking facilities.",
    benefits: ["Cheque book facility", "Standing orders", "Unlimited withdrawals"],
  },
  {
    title: "Susu Savings",
    icon: <Clock size={32} />,
    description: "Traditional daily savings modernized for your convenience and security.",
    benefits: ["Daily collections", "Flexible deposits", "Incentive bonuses"],
  },
];

export default function PersonalBanking() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Personal Banking</h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Tailored financial solutions to help you save, spend, and manage your money with confidence.
                </p>
                <div className="flex gap-4">
                  <Link href="/personal/open-account" className="btn-primary">Open an Account</Link>
                  <Link href="/support/faq" className="btn-outline">View FAQs</Link>
                </div>
              </div>
              <div className="flex-1 bg-primary/5 p-8 rounded-3xl border border-primary/10">
                <div className="bg-white p-6 rounded-2xl shadow-sm mb-4 flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Safe & Secure</h4>
                    <p className="text-sm text-gray-500">Your deposits are protected</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 text-primary rounded-lg">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Easy Access</h4>
                    <p className="text-sm text-gray-500">24/7 Digital Banking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Banking for Individuals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((p, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col">
                  <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
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
                  <Link href="#" className="flex items-center gap-2 font-bold text-primary group">
                    View Details
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start banking with us?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of satisfied customers who trust Agave Rural Bank for their personal financial growth.
            </p>
            <Link href="/personal/open-account" className="btn-secondary px-12 py-4 text-lg inline-block">
              Apply Online Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
