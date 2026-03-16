import React, { useState, useEffect } from 'react';
import { 
  Ship, 
  Anchor, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  MoreHorizontal,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Vessel {
  id: string;
  vessel_id: string;
  name: string;
  type: string;
  eta: string;
  status: string;
  berth: string;
  progress: number;
}

const initialVessels = [
  { id: 'V-102', name: 'MSC Isabella', type: 'Container Ship', eta: '14:30', status: 'Approaching', berth: 'Berth 04', progress: 85 },
  { id: 'V-105', name: 'Ever Given', type: 'Container Ship', eta: '16:45', status: 'Scheduled', berth: 'Berth 01', progress: 0 },
  { id: 'V-108', name: 'Maersk Tallinn', type: 'Bulk Carrier', eta: '18:20', status: 'Delayed', berth: 'Berth 07', progress: 40 },
  { id: 'V-110', name: 'CMA CGM Antoine', type: 'Container Ship', eta: '20:15', status: 'Scheduled', berth: 'Berth 02', progress: 0 },
  { id: 'V-112', name: 'Ocean Legend', type: 'Oil Tanker', eta: '23:50', status: 'Scheduled', berth: 'Berth 09', progress: 0 },
];

export const VesselControl: React.FC = () => {
  const [vessels, setVessels] = useState<any[]>(initialVessels);
  const [isLoading, setIsLoading] = useState(false);
  const isSupabaseConfigured = !import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchVessels();
    }
  }, []);

  const fetchVessels = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vessels')
        .select('*, berths(name)')
        .order('eta', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setVessels(data.map(v => ({
          id: v.vessel_id,
          name: v.name,
          type: v.type,
          eta: v.eta ? new Date(v.eta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
          status: v.status,
          berth: v.berths?.name || 'Unassigned',
          progress: v.progress
        })));
      }
    } catch (err) {
      console.error('Error fetching vessels:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Vessel Control</h1>
          <p className="text-slate-500">Manage arrivals, departures, and berth allocations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#105577] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#105577]/20 hover:scale-105 transition-transform">
            <Anchor size={18} />
            Assign Berth
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-[#105577] p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-white/10 p-2">
              <Ship size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Active</span>
          </div>
          <p className="text-3xl font-black">18</p>
          <p className="text-sm opacity-80">Vessels currently in port</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Clock size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Next 24h</span>
          </div>
          <p className="text-3xl font-black text-slate-900">12</p>
          <p className="text-sm text-slate-500">Scheduled arrivals</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
              <AlertCircle size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attention</span>
          </div>
          <p className="text-3xl font-black text-slate-900">03</p>
          <p className="text-sm text-slate-500">Delayed vessels</p>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-slate-900">Arrival Schedule</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search vessel..." 
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
                <th className="px-6 py-4">Vessel Name</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">ETA</th>
                <th className="px-6 py-4">Berth</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vessels.map((vessel) => (
                <tr key={vessel.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#105577]">
                        <Ship size={16} />
                      </div>
                      <span className="font-bold text-slate-900">{vessel.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{vessel.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{vessel.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Clock size={14} className="text-slate-400" />
                      {vessel.eta}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {vessel.berth}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      vessel.status === 'Approaching' ? 'bg-blue-100 text-blue-700' :
                      vessel.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {vessel.status === 'Approaching' && <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>}
                      {vessel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
          <button className="flex w-full items-center justify-center gap-2 text-sm font-bold text-[#105577] hover:underline">
            View Full Schedule
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Timeline View */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Berth Allocation Timeline</h3>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50">Day</button>
            <button className="rounded-lg bg-[#105577] px-3 py-1.5 text-xs font-bold text-white shadow-md">Week</button>
          </div>
        </div>
        <div className="space-y-6">
          {['Berth 01', 'Berth 02', 'Berth 03', 'Berth 04'].map((berth, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-20 text-xs font-bold text-slate-400 uppercase tracking-wider">{berth}</div>
              <div className="relative h-10 flex-1 rounded-xl bg-slate-100">
                {i === 0 && (
                  <div className="absolute left-[10%] w-[40%] h-full rounded-xl bg-[#105577] border-2 border-white shadow-sm flex items-center px-3 text-[10px] font-bold text-white">
                    MSC Isabella (V-102)
                  </div>
                )}
                {i === 1 && (
                  <div className="absolute left-[55%] w-[30%] h-full rounded-xl bg-[#F49B2D] border-2 border-white shadow-sm flex items-center px-3 text-[10px] font-bold text-white">
                    Ever Given (V-105)
                  </div>
                )}
                {i === 3 && (
                  <div className="absolute left-[20%] w-[50%] h-full rounded-xl bg-slate-300 border-2 border-white shadow-sm flex items-center px-3 text-[10px] font-bold text-slate-600">
                    Maintenance Block
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between px-24 text-[10px] font-bold text-slate-400">
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>00:00</span>
        </div>
      </div>
    </div>
  );
};
