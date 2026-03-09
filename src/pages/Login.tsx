import React from 'react';
import { Ship, ArrowRight, Mail, Lock, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div 
              onClick={() => onNavigate('landing')}
              className="flex cursor-pointer items-center gap-2 text-[#105577]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#105577] text-white">
                <Ship size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight">SmartPort</h2>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 pt-4">Welcome Back</h1>
            <p className="text-slate-500">Enter your credentials to access the platform.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm transition-all focus:border-[#105577] focus:outline-none focus:ring-4 focus:ring-[#105577]/10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-[#105577] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm transition-all focus:border-[#105577] focus:outline-none focus:ring-4 focus:ring-[#105577]/10"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-[#105577] focus:ring-[#105577]" />
              <label htmlFor="remember" className="text-sm font-medium text-slate-600">Remember me for 30 days</label>
            </div>

            <button 
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#105577] text-sm font-bold text-white shadow-lg shadow-[#105577]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In to Dashboard
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
              <span className="bg-white px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition-all hover:bg-slate-50">
              <Chrome size={18} />
              Google
            </button>
            <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition-all hover:bg-slate-50">
              <Github size={18} />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account? <a href="#" className="font-bold text-[#105577] hover:underline">Create an account</a>
          </p>
        </div>
      </div>

      {/* Right Side: Image/Branding */}
      <div className="relative hidden flex-1 lg:block">
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200" 
          alt="Port Operations" 
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#105577] via-[#105577]/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 space-y-4 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-black leading-tight">Optimizing Global <br/>Trade Intelligence</h2>
            <p className="max-w-md text-lg text-white/80">
              Join thousands of port operators using SmartPort to streamline logistics and secure maritime documentation.
            </p>
          </motion.div>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-black">2.5M</p>
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">Containers Tracked</p>
            </div>
            <div>
              <p className="text-2xl font-black">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">Blockchain Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
