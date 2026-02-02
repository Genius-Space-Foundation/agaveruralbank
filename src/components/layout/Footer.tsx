import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ShieldCheck, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Personal Banking",
      links: [
        { name: "Savings Accounts", href: "/personal/savings" },
        { name: "Current Accounts", href: "/personal/current" },
        { name: "Fixed Deposits", href: "/personal/fixed-deposits" },
        { name: "Mobile Banking", href: "/digital/mobile" },
      ],
    },
    {
      title: "Business & Loans",
      links: [
        { name: "SME Accounts", href: "/business" },
        { name: "Agricultural Loans", href: "/loans#FARM" },
        { name: "Personal Loans", href: "/loans#PERSONAL" },
        { name: "Business Micro-Credit", href: "/loans#BUSINESS" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Branch Locations", href: "/support/branches" },
        { name: "Careers", href: "/careers" },
        { name: "News & Insights", href: "/news" },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Bank Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-white p-2 rounded-full">
                <Image 
                  src="/logo.png" 
                  alt="Agave Rural Bank Logo" 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl leading-none">AGAVE RURAL</span>
                <span className="text-secondary font-bold text-2xl leading-none">BANK PLC</span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Empowering communities with secure, reliable, and innovative banking solutions since 1985. Your growth is our priority.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary hover:text-primary transition-all">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (section.links && (
            <div key={section.title}>
              <h3 className="text-xl font-bold mb-6 text-secondary">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"
                    >
                      <ExternalLink size={14} className="opacity-50" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )))}
        </div>

        {/* Contact Info Row */}
        <div className="border-t border-white/10 pt-8 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-secondary text-primary rounded-xl transition-transform group-hover:scale-110">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-gray-400">Call Us</p>
              <p className="font-semibold">+233 (0) 30 123 4567</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-secondary rounded-xl transition-transform group-hover:scale-110">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-gray-400">Email Support</p>
              <p className="font-semibold">customercare@agaveruralbank.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-secondary rounded-xl transition-transform group-hover:scale-110">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-gray-400">Head Office</p>
              <p className="font-semibold">Sogakope, Volta Region, Ghana</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Agave Rural Bank PLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/security" className="hover:text-white">Security</Link>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white text-primary px-3 py-1.5 rounded font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            Regulated by Bank of Ghana
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
