import React from "react";
import Link from "next/link";
import { Landmark, PiggyBank, Briefcase, Smartphone, ArrowRight } from "lucide-react";

const products = [
  {
    icon: <PiggyBank size={32} />,
    title: "Personal Savings",
    description: "Secure your future with our range of savings accounts designed for every stage of life.",
    href: "/personal/savings",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <Briefcase size={32} />,
    title: "Business Banking",
    description: "Fuel your SME growth with flexible current accounts and trade finance solutions.",
    href: "/business",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: <Landmark size={32} />,
    title: "Loan Facilities",
    description: "Fast-tracked personal, agricultural, and salary loans to help you achieve your goals.",
    href: "/loans",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Digital Banking",
    description: "Manage your money on the go with our USSD, mobile App, and internet banking.",
    href: "/digital",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Our Solutions</h2>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
            Banking Built for <span className="text-secondary">Everyone</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            We offer a comprehensive suite of financial products designed to meet the unique needs of rural and urban Ghanaians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 bg-white"
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.description}
              </p>
              <Link 
                href={item.href}
                className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all"
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-3xl bg-primary relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-secondary/20 transition-all duration-700"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <h3 className="text-3xl font-bold mb-4">Are you a Cocoa or Cashew Farmer?</h3>
              <p className="text-gray-300 text-lg">
                Agave Rural Bank specializes in agricultural financing. Get seasonal loans with flexible repayment plans tailored to your harvest cycle.
              </p>
            </div>
            <Link href="/loans#FARM" className="btn-secondary whitespace-nowrap shadow-lg">
              Get Agriculture Loan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
