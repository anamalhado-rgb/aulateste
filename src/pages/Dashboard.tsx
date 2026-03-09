import React from 'react';
import { 
  Ship, 
  Users, 
  Box, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  MapPin,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const cargoData = [
  { name: 'Mon', volume: 4500 },
  { name: 'Tue', volume: 5200 },
  { name: 'Wed', volume: 4800 },
  { name: 'Thu', volume: 6100 },
  { name: 'Fri', volume: 5500 },
  { name: 'Sat', volume: 4200 },
  { name: 'Sun', volume: 3800 },
];

const containerStatusData = [
  { name: 'In Transit', value: 45, color: '#105577' },
  { name: 'Docked', value: 25, color: '#F49B2D' },
  { name: 'Customs', value: 20, color: '#ED6A2F' },
  { name: 'Delayed', value: 10, color: '#EF4444' },
];

const recentOperations = [
  { id: 1, type: 'Vessel Arrival', name: 'MSC Isabella', time: '10:45 AM', status: 'On Time', icon: Ship, color: 'blue' },
  { id: 2, type: 'Cargo Loading', name: 'Terminal 4 - Block B', time: '11:20 AM', status: 'In Progress', icon: Box, color: 'orange' },
  { id: 3, type: 'Security Check', name: 'Checkpoint Alpha', time: '11:45 AM', status: 'Verified', icon: ShieldCheck, color: 'green' },
  { id: 4, type: 'Passenger Boarding', name: 'Cruise Terminal 1', time: '12:15 PM', status: 'Scheduled', icon: Users, color: 'purple' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Port Overview</h1>
          <p className="text-slate-500">Real-time operational status and key performance indicators.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Clock size={18} />
            Last 24 Hours
          </button>
          <button className="rounded-xl bg-[#105577] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-105 transition-transform">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Vessels Docked', value: '42', trend: '+5%', up: true, icon: Ship, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Passengers', value: '12,450', trend: '+12%', up: true, icon: Users, color: 'bg-purple-50 text-purple-600' },
          { label: 'Containers Handled', value: '8,920', trend: '-2%', up: false, icon: Box, color: 'bg-orange-50 text-orange-600' },
          { label: 'Blockchain Verifications', value: '100%', trend: 'Stable', up: true, icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-3 ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">{kpi.label}</p>
              <p className="text-3xl font-black text-slate-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cargo Volume Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Cargo Volume Trend</h3>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cargoData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#105577" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#105577" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#105577', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="volume" stroke="#105577" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Container Status Pie Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Container Status</h3>
            <p className="text-sm text-slate-500">Distribution of active containers.</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={containerStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {containerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {containerStatusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Operations Feed & Map */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Real-time Operations Feed */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Real-time Operations</h3>
            <button className="text-sm font-bold text-[#105577] hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentOperations.map((op) => (
              <div key={op.id} className="flex items-start gap-4">
                <div className={`rounded-xl p-3 ${
                  op.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  op.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                  op.color === 'green' ? 'bg-green-50 text-green-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  <op.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{op.type}</p>
                    <span className="text-xs text-slate-400">{op.time}</span>
                  </div>
                  <p className="text-sm text-slate-500">{op.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${
                      op.status === 'On Time' || op.status === 'Verified' ? 'bg-green-500' :
                      op.status === 'In Progress' ? 'bg-blue-500' : 'bg-slate-300'
                    }`}></span>
                    <span className="text-xs font-semibold text-slate-600">{op.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Port View (Map Placeholder) */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Live Port View</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                LIVE
              </span>
            </div>
          </div>
          <div className="relative h-[350px] overflow-hidden rounded-xl bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
              alt="Port Map" 
              className="h-full w-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#105577]/10"></div>
            
            {/* Map Markers */}
            <div className="absolute left-1/4 top-1/3">
              <div className="relative">
                <div className="absolute h-4 w-4 animate-ping rounded-full bg-blue-500 opacity-75"></div>
                <div className="relative h-4 w-4 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
                <div className="absolute left-6 top-0 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[10px] font-bold shadow-md">
                  MSC Isabella
                </div>
              </div>
            </div>

            <div className="absolute right-1/3 bottom-1/4">
              <div className="relative">
                <div className="absolute h-4 w-4 animate-ping rounded-full bg-orange-500 opacity-75"></div>
                <div className="relative h-4 w-4 rounded-full bg-orange-600 border-2 border-white shadow-lg"></div>
                <div className="absolute left-6 top-0 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[10px] font-bold shadow-md">
                  Terminal 4 Loading
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="rounded-lg bg-white p-2 shadow-md hover:bg-slate-50 text-slate-700">+</button>
              <button className="rounded-lg bg-white p-2 shadow-md hover:bg-slate-50 text-slate-700">-</button>
              <button className="rounded-lg bg-white p-2 shadow-md hover:bg-slate-50 text-slate-700">
                <MapPin size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
