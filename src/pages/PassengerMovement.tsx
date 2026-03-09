import React from 'react';
import { 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  MoreVertical,
  ArrowRight,
  Activity,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const passengerFlowData = [
  { time: '08:00', count: 450 },
  { time: '10:00', count: 1200 },
  { time: '12:00', count: 850 },
  { time: '14:00', count: 1500 },
  { time: '16:00', count: 950 },
  { time: '18:00', count: 600 },
  { time: '20:00', count: 300 },
];

const checkpoints = [
  { id: 'CP-01', name: 'Terminal 1 - Entrance', status: 'Optimal', load: 45, icon: MapPin, color: 'green' },
  { id: 'CP-02', name: 'Terminal 1 - Security', status: 'High Load', load: 85, icon: ShieldCheck, color: 'orange' },
  { id: 'CP-03', name: 'Terminal 2 - Immigration', status: 'Optimal', load: 30, icon: UserCheck, color: 'green' },
  { id: 'CP-04', name: 'Terminal 2 - Boarding', status: 'Critical', load: 95, icon: Users, color: 'red' },
];

export const PassengerMovement: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Passenger Movement</h1>
          <p className="text-slate-500">Monitor passenger flow, security checkpoints, and immigration status.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#105577] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-105 transition-transform">
            <Activity size={18} />
            Live Monitoring
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Passengers', value: '12,450', trend: '+12%', up: true, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Avg. Processing Time', value: '18 min', trend: '-2 min', up: true, icon: Clock, color: 'bg-green-50 text-green-600' },
          { label: 'Security Cleared', value: '9,820', trend: '98.5%', up: true, icon: ShieldCheck, color: 'bg-purple-50 text-purple-600' },
          { label: 'Active Alerts', value: '02', trend: 'Critical', up: false, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-3 ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
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
        {/* Passenger Flow Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Passenger Flow Trend</h3>
            <div className="flex gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50">Hourly</button>
              <button className="rounded-lg bg-[#105577] px-3 py-1.5 text-xs font-bold text-white shadow-md">Daily</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={passengerFlowData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#F1F5F9' }}
                />
                <Bar dataKey="count" fill="#105577" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Checkpoint Status */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Checkpoint Status</h3>
            <p className="text-sm text-slate-500">Real-time load and health monitoring.</p>
          </div>
          <div className="space-y-6">
            {checkpoints.map((cp) => (
              <div key={cp.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${
                      cp.color === 'green' ? 'bg-green-50 text-green-600' :
                      cp.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      <cp.icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{cp.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cp.id}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    cp.color === 'green' ? 'text-green-600' :
                    cp.color === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {cp.status}
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      cp.color === 'green' ? 'bg-green-500' :
                      cp.color === 'orange' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${cp.load}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Load: {cp.load}%</span>
                  <span>Cap: 100%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 flex w-full items-center justify-center gap-2 text-sm font-bold text-[#105577] hover:underline">
            View All Checkpoints
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Security Events</h3>
          <button className="text-sm font-bold text-[#105577] hover:underline">View History</button>
        </div>
        <div className="space-y-4">
          {[
            { id: 1, event: 'Passport Verification Success', user: 'Terminal 1 - CP-03', time: '2 mins ago', status: 'Verified' },
            { id: 2, event: 'Biometric Scan Completed', user: 'Terminal 2 - CP-01', time: '5 mins ago', status: 'Verified' },
            { id: 3, event: 'Security Alert: Unattended Bag', user: 'Terminal 1 - Gate B', time: '12 mins ago', status: 'Resolved' },
            { id: 4, event: 'Immigration Clearance Delay', user: 'Terminal 2 - CP-04', time: '15 mins ago', status: 'Pending' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-50 p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`h-2 w-2 rounded-full ${
                  item.status === 'Verified' ? 'bg-green-500' :
                  item.status === 'Resolved' ? 'bg-blue-500' : 'bg-orange-500'
                }`}></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.event}</p>
                  <p className="text-xs text-slate-500">{item.user} • {item.time}</p>
                </div>
              </div>
              <span className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                item.status === 'Verified' ? 'bg-green-100 text-green-700' :
                item.status === 'Resolved' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
