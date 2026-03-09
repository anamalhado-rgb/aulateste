import React from 'react';
import { Ship, ArrowRight, TrendingUp, Shield, Activity, CheckCircle2, Share2, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#105577] text-white">
              <Ship size={24} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">SmartPort</h2>
          </div>
          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
              <li><button onClick={() => onNavigate('landing')} className="text-[#105577] font-bold hover:text-[#F49B2D]">Home</button></li>
              <li><button onClick={() => onNavigate('vessel-control')} className="hover:text-[#105577]">Vessel Control</button></li>
              <li><button onClick={() => onNavigate('passenger-movement')} className="hover:text-[#105577]">Passenger Movement</button></li>
              <li><button onClick={() => onNavigate('cargo-management')} className="hover:text-[#105577]">Cargo Movement</button></li>
              <li><button onClick={() => onNavigate('blockchain-tracking')} className="hover:text-[#105577]">Blockchain Tracking</button></li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('login')} className="hidden text-sm font-semibold text-slate-700 hover:text-[#105577] sm:block">Login</button>
            <button onClick={() => onNavigate('dashboard')} className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#105577] text-white">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-8 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F49B2D]/10 px-4 py-1.5 text-sm font-semibold text-[#ED6A2F]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F49B2D] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F49B2D]"></span>
                </span>
                Next-Gen Maritime Tech
              </div>
              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 lg:text-7xl">
                Smart Port <br/>
                <span className="bg-gradient-to-r from-[#105577] via-[#F49B2D] to-[#ED6A2F] bg-clip-text text-transparent">Operations</span> Platform
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 lg:text-xl">
                Digital platform to manage vessels, cargo, passengers and container tracking with enterprise-grade blockchain integration.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => onNavigate('dashboard')} className="rounded-xl bg-[#105577] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#105577]/25 transition-all hover:scale-105 active:scale-95">
                  Login to Dashboard
                </button>
                <button onClick={() => onNavigate('login')} className="rounded-xl bg-[#FCC218] px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-[#FCC218]/30 transition-all hover:scale-105 active:scale-95">
                  Register Now
                </button>
                <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:border-[#105577] hover:text-[#105577]">
                  Explore Platform
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 flex-1 lg:mt-0"
            >
              <div className="relative rounded-3xl bg-slate-100 p-4 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern cargo port"
                  className="aspect-[4/3] w-full overflow-hidden rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 max-w-[200px] rounded-2xl bg-white p-6 shadow-xl lg:-bottom-10 lg:-left-10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#F49B2D]/20 p-2 text-[#ED6A2F]">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Efficiency</p>
                      <p className="text-xl font-bold text-slate-900">+35%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-2 rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Vessels Managed</p>
                <p className="text-4xl font-extrabold text-slate-900">12,000+</p>
                <p className="flex items-center gap-1 text-sm font-bold text-green-600">
                  <TrendingUp size={14} />
                  +12% vs last year
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Containers Tracked</p>
                <p className="text-4xl font-extrabold text-slate-900">2.5M</p>
                <p className="flex items-center gap-1 text-sm font-bold text-green-600">
                  <TrendingUp size={14} />
                  +8% monthly growth
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md border border-slate-100 sm:col-span-2 lg:col-span-1">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Security Events</p>
                <p className="text-4xl font-extrabold text-slate-900">100%</p>
                <p className="text-sm font-bold text-[#105577]">Blockchain Verified</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 space-y-4 text-center">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">Advanced Maritime Solutions</h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">Optimizing port efficiency through real-time data visualization and immutable blockchain ledger security.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Vessel Control', desc: 'Real-time monitoring of ship docking, departures, and automated berth allocation.', img: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=400' },
                { title: 'Cargo Movement', desc: 'Efficient logistics management for bulk, break-bulk, and liquid cargo operations.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400' },
                { title: 'Container Management', desc: 'Automated tracking, stacking optimization, and yard crane orchestration.', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400' },
                { title: 'Blockchain Tracking', desc: 'Immutable ledger for secure, end-to-end supply chain visibility and document handling.', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400' },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer space-y-4">
                  <div className="overflow-hidden rounded-2xl">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#105577]">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-[#105577] py-24 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-24">
            <div className="mb-12 flex-1 lg:mb-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                  <Shield className="text-[#FCC218]" size={40} />
                  <h4 className="text-lg font-bold">Secure Transactions</h4>
                  <p className="text-sm text-slate-400">All maritime documents are cryptographically signed and stored.</p>
                </div>
                <div className="mt-8 space-y-4 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                  <Activity className="text-[#F49B2D]" size={40} />
                  <h4 className="text-lg font-bold">Live Monitoring</h4>
                  <p className="text-sm text-slate-400">Real-time GPS and IoT telemetry for every vessel in the bay.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-black leading-tight text-white lg:text-5xl">Revolutionizing Port Logistics with Blockchain</h2>
              <p className="text-lg text-slate-300">
                Our platform eliminates paperwork bottlenecks and reduces fraud risk through a decentralized trust layer. Ensure your port operates at peak efficiency with automated smart contracts.
              </p>
              <ul className="space-y-4">
                {[
                  'Automated Billing and Payments',
                  'Real-time Customs Clearance',
                  'Predictive Port Maintenance'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#FCC218]" size={20} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#105577] text-white">
                <Ship size={18} />
              </div>
              <span className="text-xl font-bold text-slate-900">SmartPort</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
              <a className="hover:text-[#F49B2D]" href="#">Terms of Service</a>
              <a className="hover:text-[#F49B2D]" href="#">Privacy Policy</a>
              <a className="hover:text-[#F49B2D]" href="#">Contact Support</a>
              <a className="hover:text-[#F49B2D]" href="#">API Documentation</a>
            </div>
            <div className="flex gap-4">
              <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-white transition-colors hover:bg-[#105577]">
                <Share2 size={20} />
              </button>
              <button className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-white transition-colors hover:bg-[#105577]">
                <Globe size={20} />
              </button>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
            © 2024 SmartPort Operations Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
