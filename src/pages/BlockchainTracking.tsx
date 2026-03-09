import React from 'react';
import { 
  Link as LinkIcon, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  Database,
  Share2
} from 'lucide-react';

const transactionHistory = [
  { id: 'TX-8821', vessel: 'MSC Isabella', action: 'Manifest Verified', time: '10:45 AM', hash: '0x7f2a...9b1c', status: 'Confirmed' },
  { id: 'TX-8819', vessel: 'Ever Given', action: 'Port Clearance Issued', time: '09:30 AM', hash: '0x4d1e...2a3f', status: 'Confirmed' },
  { id: 'TX-8815', vessel: 'Maersk Tallinn', action: 'Cargo Inspection Log', time: '08:15 AM', hash: '0x9c8b...5e4d', status: 'Confirmed' },
  { id: 'TX-8812', vessel: 'CMA CGM Antoine', action: 'Berth Allocation Signed', time: '07:45 AM', hash: '0x1a2b...3c4d', status: 'Confirmed' },
];

export const BlockchainTracking: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Blockchain Tracking</h1>
          <p className="text-slate-500">Immutable ledger for vessel movements and cargo documentation.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#105577] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-105 transition-transform">
            <ShieldCheck size={18} />
            Verify Document
          </button>
        </div>
      </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-[#105577] to-[#0a3a52] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-white/10 p-2">
              <Database size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Network Status</span>
          </div>
          <p className="text-3xl font-black">Active</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-xs opacity-80">14 Nodes Synchronized</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <LinkIcon size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Blocks</span>
          </div>
          <p className="text-3xl font-black text-slate-900">1.2M+</p>
          <p className="text-xs text-slate-500 mt-2">Avg. Block Time: 12s</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
              <Lock size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Security</span>
          </div>
          <p className="text-3xl font-black text-slate-900">100%</p>
          <p className="text-xs text-slate-500 mt-2">End-to-end Encryption</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Route Tracking Map */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Vessel Route Verification</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Vessel:</span>
              <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none">
                <option>MSC Isabella</option>
                <option>Ever Given</option>
              </select>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-xl bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
              alt="Route Map" 
              className="h-full w-full object-cover opacity-50 grayscale"
              referrerPolicy="no-referrer"
            />
            {/* SVG Overlay for Route */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 400">
              <path 
                d="M 100 300 Q 300 100 500 250 T 900 150" 
                fill="none" 
                stroke="#105577" 
                strokeWidth="3" 
                strokeDasharray="8 4"
                className="animate-[dash_20s_linear_infinite]"
              />
              <circle cx="100" cy="300" r="6" fill="#105577" />
              <circle cx="900" cy="150" r="6" fill="#F49B2D" />
            </svg>
            
            {/* Map Markers */}
            <div className="absolute left-[10%] bottom-[25%]">
              <div className="flex flex-col items-center gap-1">
                <div className="rounded-full bg-white p-1 shadow-md">
                  <MapPin size={12} className="text-[#105577]" />
                </div>
                <span className="text-[10px] font-bold text-slate-600">Origin</span>
              </div>
            </div>
            <div className="absolute right-[10%] top-[35%]">
              <div className="flex flex-col items-center gap-1">
                <div className="rounded-full bg-white p-1 shadow-md">
                  <MapPin size={12} className="text-[#F49B2D]" />
                </div>
                <span className="text-[10px] font-bold text-slate-600">SmartPort</span>
              </div>
            </div>

            {/* Verification Overlay */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 p-4 backdrop-blur-sm shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Route Authenticity Verified</p>
                    <p className="text-[10px] text-slate-500">Last verified: 2 mins ago via Node #42</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-bold text-[#105577] hover:underline">
                  View Proof
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <button className="text-slate-400 hover:text-slate-600"><Share2 size={18} /></button>
          </div>
          <div className="space-y-6">
            {transactionHistory.map((tx) => (
              <div key={tx.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-slate-100 last:before:hidden">
                <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-[#105577]"></div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">{tx.action}</p>
                    <span className="text-[10px] text-slate-400">{tx.time}</span>
                  </div>
                  <p className="text-xs text-slate-500">{tx.vessel} • {tx.id}</p>
                  <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 p-2">
                    <code className="text-[10px] text-[#105577] font-mono">{tx.hash}</code>
                    <CheckCircle2 size={12} className="text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 flex w-full items-center justify-center gap-2 text-sm font-bold text-[#105577] hover:underline">
            Explorer Dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Smart Contracts', desc: 'Automated execution of port agreements.', icon: Database },
          { title: 'Asset Tokenization', desc: 'Digital twins for every container.', icon: LinkIcon },
          { title: 'Zero Knowledge', desc: 'Privacy-preserving data sharing.', icon: ShieldCheck },
          { title: 'Multi-Sig Auth', desc: 'Secure multi-party approvals.', icon: Lock },
        ].map((feature, i) => (
          <div key={i} className="rounded-2xl bg-slate-50 p-6 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
            <div className="mb-4 rounded-xl bg-white p-3 text-[#105577] shadow-sm inline-block">
              <feature.icon size={20} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">{feature.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
