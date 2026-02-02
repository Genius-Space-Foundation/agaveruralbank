import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Globe } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-40">
        {/* Contact Banner */}
        <section className="bg-primary py-24 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">How Can We <span className="text-accent">Help You?</span></h1>
            <p className="text-xl text-gray-300">
              Our team is dedicated to providing you with the best banking experience. Reach out to us through any of the channels below.
            </p>
          </div>
           <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
        </section>

        {/* Contact Cards */}
        <section className="py-16 -mt-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center text-center border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="p-4 bg-secondary/10 text-secondary rounded-2xl mb-6">
                  <Phone size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Call Us</h3>
                <p className="text-gray-500 mb-6">Speak directly with our customer service team.</p>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-primary">+233 (0) 30 123 4567</p>
                  <p className="text-lg font-bold text-primary">+233 (0) 24 123 4567</p>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center text-center border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="p-4 bg-primary/10 text-primary rounded-2xl mb-6">
                  <Mail size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Email Us</h3>
                <p className="text-gray-500 mb-6">Send us an inquiry and we'll reply within 24 hours.</p>
                <p className="text-lg font-bold text-primary">customercare@agaveruralbank.com</p>
                <p className="text-lg font-bold text-primary">info@agaveruralbank.com</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center text-center  border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="p-4 bg-accent/20 text-primary rounded-2xl mb-6">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <p className="text-gray-500 mb-6">Visit our branches during these times.</p>
                <div className="space-y-2 text-primary font-medium">
                  <p>Mon - Fri: 8:00 AM - 4:00 PM</p>
                  <p>Sat: 9:00 AM - 1:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form & Map */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Contact Form */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
                  <MessageSquare className="text-secondary" /> Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subject</label>
                    <select className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                      <option>General Inquiry</option>
                      <option>Open an Account</option>
                      <option>Loan Application</option>
                      <option>Digital Banking Support</option>
                      <option>Business Banking</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-40" placeholder="How can we help you today?"></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>

              {/* Locations */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
                  <Globe className="text-secondary" /> Our Offices
                </h2>
                <div className="space-y-8">
                  {[
                    { name: "Head Office - Sogakope", addr: "Main Road, Sogakope, Volta Region", phones: "+233 30 123 4567" },
                    { name: "Dabala Branch", addr: "Opposite Market Square, Dabala", phones: "+233 30 123 4568" },
                    { name: "Akatsi Branch", addr: "Torgbui Gbewa Street, Akatsi", phones: "+233 30 123 4569" },
                    { name: "Adidome Branch", addr: "Central Adidome, North Tongu", phones: "+233 30 123 4570" }
                  ].map((loc, idx) => (
                    <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-secondary/30 transition-all group">
                      <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-secondary group-hover:text-white transition-all h-fit">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{loc.name}</h4>
                        <p className="text-gray-500 mb-2">{loc.addr}</p>
                        <p className="text-primary font-semibold">{loc.phones}</p>
                      </div>
                    </div>
                  ))}
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
