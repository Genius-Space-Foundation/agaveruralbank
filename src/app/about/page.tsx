import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Target, Eye, Heart, Shield, History, Users2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40">
        {/* Banner Section */}
        <section className="bg-primary py-24 relative overflow-hidden text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Journey & Purpose</h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              For over three decades, we've been more than just a bank. We're a partner in the growth of rural Ghana.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
        </section>

        {/* History Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm">
                  <History size={18} />
                  Est. 1985
                </div>
                <h2 className="text-4xl font-bold text-primary">A Legacy of Empowerment</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Agave Rural Bank PLC was established with a singular vision: to bridge the financial gap in rural and semi-urban communities. Since our first branch opened in Sogakope, we have focused on providing the capital and security needed for local businesses to thrive.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we serve thousands of customers across the Volta Region and beyond, maintaining our roots while embracing the future of digital banking.
                </p>
              </div>
              <div className="flex-1 relative">
                <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                   <Image 
                    src="/hero.png" 
                    alt="Legacy of Banking" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl max-w-[240px] border">
                  <p className="text-primary font-bold text-4xl mb-1">35+</p>
                  <p className="text-gray-500 font-medium">Years of Community Impact</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Values */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="p-10 bg-primary text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Eye size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Target className="text-accent" /> Our Mission
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  To provide innovative, cost-effective, and sustainable financial services that empower our customers and add value to our stakeholders.
                </p>
              </div>
              <div className="p-10 bg-secondary text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Target size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Eye className="text-accent" /> Our Vision
                </h3>
                <p className="text-xl text-green-100 leading-relaxed">
                  To be the leading rural bank in Ghana, recognized for excellence in community-focused financial solutions and digital innovation.
                </p>
              </div>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">Core Values</h2>
              <p className="text-gray-600">The principles that guide every decision we make.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Shield />, title: "Integrity", desc: "Honesty and transparency in all our dealings." },
                { icon: <Heart />, title: "Customer Centric", desc: "Putting our customers at the heart of everything." },
                { icon: <History />, title: "Accountability", desc: "Taking responsibility for our actions and results." },
                { icon: <Users2 />, title: "Teamwork", desc: "Collaborating to achieve excellence together." }
              ].map((value, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border hover:border-primary/20 hover:shadow-xl transition-all text-center">
                  <div className="inline-flex p-4 bg-primary/5 text-primary rounded-xl mb-6">
                    {React.cloneElement(value.icon, { size: 32 })}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Management & Board */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">Leadership</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Guided by a board of seasoned professionals with deep expertise in banking, finance, and community development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map((member) => (
                <div key={member} className="group">
                  <div className="aspect-[4/5] bg-gray-100 rounded-3xl mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all"></div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">Board Member Name</h4>
                  <p className="text-secondary font-semibold uppercase tracking-wider text-sm">Professional Title</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
