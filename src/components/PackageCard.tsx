import { Package } from '../types';
import { Gamepad2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  pkg: Package;
  isSelected: boolean;
  onClick: () => void;
}

export function PackageCard({ pkg, isSelected, onClick }: Props) {
  const Icon = pkg.icon_type === 'gamepad' ? Gamepad2 : MessageSquare;
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative w-full rounded-[32px] p-6 flex items-center shadow-md transition-all duration-300 min-h-[140px] text-left border-4 overflow-hidden
        ${isSelected 
          ? 'bg-green-50 border-green-500 shadow-green-200' 
          : 'bg-white border-transparent hover:border-slate-200'}`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 left-4 bg-green-100 text-green-700 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
        {pkg.updated_label}
      </div>

      <div className="flex items-center w-full mt-4">
        <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${isSelected ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
          <Icon className="w-10 h-10" strokeWidth={2.5} />
        </div>
        
        <div className="ml-5 flex-1">
          <h2 className="text-3xl font-black text-slate-900 leading-none">{pkg.display_name}</h2>
          <p className="text-lg font-bold text-slate-500 mt-1">{pkg.short_type}</p>
        </div>

        {isSelected && (
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="shrink-0 ml-2"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500 fill-green-100" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
