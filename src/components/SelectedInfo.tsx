import { Package } from '../types';
import { Gamepad2, MessageSquare, CheckCircle2, Box, Smartphone, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function SelectedInfo({ pkg }: { pkg: Package }) {
  const Icon = pkg.icon_type === 'gamepad' ? Gamepad2 : MessageSquare;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[32px] p-6 shadow-md border-2 border-green-100 mt-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 text-green-50 opacity-50 pointer-events-none">
        <Icon className="w-40 h-40" />
      </div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-2xl font-black text-slate-800">Seçildi</h3>
        <div className="bg-green-500 text-white font-black text-sm px-4 py-1.5 rounded-full flex items-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 mr-1.5" />
          Hazır
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6 relative z-10">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
          <Icon className="w-8 h-8" />
        </div>
        <div className="text-3xl font-black text-slate-900 leading-none">
          {pkg.display_name}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className="bg-slate-50 p-3 rounded-2xl flex items-center border border-slate-100">
          <Box className="w-6 h-6 text-slate-400 mr-2 shrink-0" />
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Boyut</div>
            <div className="font-bold text-slate-700 leading-tight">{pkg.file_size}</div>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl flex items-center border border-slate-100">
          <Smartphone className="w-6 h-6 text-slate-400 mr-2 shrink-0" />
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Android</div>
            <div className="font-bold text-slate-700 leading-tight">{pkg.android_min}</div>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl flex items-center col-span-2 border border-slate-100">
          <Star className="w-6 h-6 text-yellow-400 mr-2 shrink-0 fill-yellow-400" />
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Sürüm</div>
            <div className="font-bold text-slate-700 leading-tight">{pkg.version_name}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
