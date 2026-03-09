import React from 'react';
import { 
  Box, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowRight,
  Activity,
  MapPin,
  Truck,
  Package,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';

const cargoVolumeTrend = [
  { day: 'Mon', volume: 4500 },
  { day: 'Tue', volume: 5200 },
  { day: 'Wed', volume: 4800 },
  { day: 'Thu', volume: 6100 },
  { day: 'Fri', volume: 5500 },
  { day: 'Sat', volume: 4200 },
  { day: 'Sun', volume: 3800 },
];

const activeManifest = [
  { id: 'M-1024', vessel: 'MSC Isabella', type: 'Container', weight: '12,450 kg', status: 'In Progress', progress: 65 },
  { id: 'M-1026', vessel: 'Ever Given', type: 'Container', weight: '8,920 kg', status: 'Scheduled', progress: 0 },
  { id: 'M-1028', vessel: 'Maersk Tallinn', type: 'Bulk', weight: '24,500 kg', status: 'Completed', progress: 100 },
  { id: 'M-1030', vessel: 'CMA CGM Antoine', type: 'Container', weight: '15,200 kg', status: 'Delayed', progress: 20 },
];

export const CargoManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Cargo Management</h1>
          <p className="text-slate-500">Logistics, yard optimization, and manifest tracking.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#105577] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-105 transition-transform">
            <Package size={18} />
            New Manifest
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Daily Volume', value: '5,240 t', trend: '+8%', up: true, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
          { label: 'Active Manifests', value: '124', trend: '+12', up: true, icon: Box, color: 'bg-purple-50 text-purple-600' },
          { label: 'Yard Capacity', value: '82%', trend: 'High', up: false, icon: MapPin, color: 'bg-orange-50 text-orange-600' },
          { label: 'Truck Turnaround', value: '45 min', trend: '-5 min', up: true, icon: Truck, color: 'bg-green-50 text-green-600' },
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cargo Volume Trend Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Cargo Volume Trend</h3>
            <div className="flex gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50">Weekly</button>
              <button className="rounded-lg bg-[#105577] px-3 py-1.5 text-xs font-bold text-white shadow-md">Monthly</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cargoVolumeTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="volume" stroke="#105577" strokeWidth={3} dot={{ r: 4, fill: '#105577', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yard Map Placeholder */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Yard Map</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Section A-4</span>
          </div>
          <div className="grid grid-cols-4 gap-2 h-[300px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className={`rounded-lg border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold transition-all hover:scale-105 cursor-pointer ${
                  i % 5 === 0 ? 'bg-red-100 text-red-600' :
                  i % 3 === 0 ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-[#105577]'
                }`}
              >
                {i % 5 === 0 ? 'FULL' : i % 3 === 0 ? '75%' : 'EMPTY'}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span>Full</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Manifest Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-slate-900">Active Manifests</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search manifest..." 
                  className="h-9 w-48 rounded-lg bg-slate-50 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#105577]/20"
                />
              </div>
              <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                <Filter size={14} />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Manifest ID</th>
                <th className="px-6 py-4">Vessel</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Weight</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeManifest.map((manifest) => (
                <tr key={manifest.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#105577]">
                        <Package size={16} />
                      </div>
                      <span className="font-bold text-slate-900">{manifest.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{manifest.vessel}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{manifest.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{manifest.weight}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      manifest.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      manifest.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      manifest.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {manifest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            manifest.status === 'Completed' ? 'bg-green-500' :
                            manifest.status === 'Delayed' ? 'bg-red-500' : 'bg-[#105577]'
                          }`}
                          style={{ width: `${manifest.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{manifest.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
          <button className="flex w-full items-center justify-center gap-2 text-sm font-bold text-[#105577] hover:underline">
            View All Manifests
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
