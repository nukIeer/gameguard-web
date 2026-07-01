import { Package } from '../types';
import { Gamepad2, MessageSquare, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  pkg: Package | null;
  onDownload: () => void;
}

export function StickyCTA({ pkg, onDownload }: Props) {
  return (
    <AnimatePresence>
      {pkg && (
        <motion.div 
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          exit={{ y: 150 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-40 sm:hidden"
        >
          <div className="flex items-center max-w-sm mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-[20px] flex items-center justify-center shrink-0 mr-4 border-2 border-white shadow-sm">
              {pkg.icon_type === 'gamepad' ? <Gamepad2 className="w-8 h-8 text-blue-600" /> : <MessageSquare className="w-8 h-8 text-blue-600" />}
            </div>
            <div className="flex-1 mr-3">
              <div className="text-sm font-black text-slate-400 tracking-wide uppercase">{pkg.short_type}</div>
              <div className="text-xl font-black text-slate-900 leading-tight truncate">{pkg.display_name}</div>
            </div>
            <button 
              onClick={onDownload}
              className="bg-gradient-to-b from-green-400 to-green-500 text-white font-black px-6 py-4 rounded-[24px] shadow-lg shadow-green-200 flex items-center active:scale-95 transition-transform border-b-[4px] border-green-700 text-lg tracking-wide"
            >
              <Download className="w-6 h-6 mr-1.5" strokeWidth={3.5} />
              İNDİR
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
