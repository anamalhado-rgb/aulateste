import React from 'react';
import { 
  LayoutDashboard, 
  Ship, 
  Users, 
  Box, 
  Link as LinkIcon, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vessel-control', label: 'Vessel Control', icon: Ship },
    { id: 'passenger-movement', label: 'Passenger Movement', icon: Users },
    { id: 'cargo-management', label: 'Cargo Management', icon: Box },
    { id: 'blockchain-tracking', label: 'Blockchain Tracking', icon: LinkIcon },
    { id: 'user-management', label: 'User Management', icon: Users },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "relative z-50 flex flex-col bg-[#105577] text-white transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && "hidden")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Ship size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight">SmartPort</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-1.5 hover:bg-white/10"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                activePage === item.id 
                  ? "bg-[#F49B2D] text-white shadow-lg shadow-[#F49B2D]/20" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(activePage === item.id ? "text-white" : "group-hover:text-white")} />
              {isSidebarOpen && <span>{item.label}</span>}
              {isSidebarOpen && activePage === item.id && (
                <ChevronRight size={16} className="ml-auto opacity-50" />
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4 space-y-1">
          <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white">
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
          <button 
            onClick={() => onNavigate('landing')}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search operations..." 
                className="h-10 w-64 rounded-xl bg-slate-100 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#105577]/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">Port Supervisor</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" 
                alt="Profile" 
                className="h-10 w-10 rounded-full border-2 border-slate-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
