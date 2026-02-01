import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import { CheckCircle2, Award, Clock, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Trust Indicators Section */}
        <section className="py-16 bg-primary text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-secondary/20 text-secondary rounded-lg">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Regulated</h4>
                  <p className="text-sm text-gray-400">By Bank of Ghana</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-secondary/20 text-secondary rounded-lg">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Secure</h4>
                  <p className="text-sm text-gray-400">Multi-level Encryption</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-secondary/20 text-secondary rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold">24/7 Support</h4>
                  <p className="text-sm text-gray-400">Always here for you</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-secondary/20 text-secondary rounded-lg">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Community Focus</h4>
                  <p className="text-sm text-gray-400">Since 1985</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />

        {/* Why Choose Us Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/hero.png" 
                    alt="Community Banking" 
                    width={600} 
                    height={400} 
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full -z-10 animate-pulse"></div>
                <div className="absolute top-12 -left-12 w-24 h-24 bg-secondary rounded-2xl -z-10 rotate-12"></div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">Why Us</h2>
                <h2 className="text-4xl font-bold text-primary mb-8 leading-tight">
                  A Bank that Understands <br />
                  <span className="text-gray-900">Your Needs.</span>
                </h2>
                
                <div className="space-y-6">
                  {[
                    "Over 35 years of dedicated community service.",
                    "Specialized financial products for Agribusiness.",
                    "Modern digital tools with rural accessibility.",
                    "Transparent fee structure with no hidden charges."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-lg text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                
                <Link href="/about" className="mt-10 inline-flex items-center gap-2 btn-primary">
                  Learn More About Us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Latest Updates</h2>
                <h2 className="text-4xl font-bold text-gray-900 font-display">News & Insights</h2>
              </div>
              <Link href="/news" className="text-primary font-bold flex items-center gap-2 hover:underline">
                View All News <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Agave Rural Bank Launch New Mobile App",
                  date: "Oct 12, 2025",
                  category: "Digital Banking",
                  desc: "Experience seamless banking on your smartphone with our newly upgraded mobile application."
                },
                {
                  title: "Financial Literacy Workshop for Small Businesses",
                  date: "Sep 28, 2025",
                  category: "Community",
                  desc: "Join us this weekend for a free workshop on managing business finances and cash flow."
                },
                {
                  title: "New Branch Opening in North Sogakope",
                  date: "Sep 15, 2025",
                  category: "Announcement",
                  desc: "We are expanding! Visit our newest branch for all your banking and financial needs."
                }
              ].map((post, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-video bg-gray-100 rounded-2xl mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all"></div>
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {post.category}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {post.desc}
                  </p>
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
