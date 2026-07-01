import { Package } from '../types';
import { Gamepad2, MessageSquare, Check, X, Box, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  pkg: Package | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({ isOpen, pkg, onConfirm, onCancel }: Props) {
  if (!pkg) return null;

  const Icon = pkg.icon_type === 'gamepad' ? Gamepad2 : MessageSquare;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-8 sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-sm rounded-[40px] p-6 relative z-10 shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-blue-100 rounded-[32px] flex items-center justify-center mb-4 border-4 border-white shadow-lg -mt-16">
              <Icon className="w-12 h-12 text-blue-600" strokeWidth={2.5} />
            </div>

            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">İndirilsin mi?</h2>

            <div className="w-full bg-slate-50 rounded-[24px] p-4 flex justify-around mb-8 border border-slate-100">
              <div className="flex flex-col items-center">
                <Icon className="w-8 h-8 text-slate-400 mb-1" />
                <span className="font-bold text-slate-700 text-sm truncate w-20">{pkg.display_name}</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col items-center">
                <Box className="w-8 h-8 text-slate-400 mb-1" />
                <span className="font-bold text-slate-700 text-sm">{pkg.file_size}</span>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-slate-400 mb-1" />
                <span className="font-bold text-slate-700 text-sm truncate w-20">{pkg.version_name}</span>
              </div>
            </div>

            <div className="flex w-full space-x-4">
              <button 
                onClick={onCancel}
                className="flex-1 bg-slate-100 text-slate-400 font-black text-2xl py-6 rounded-[28px] flex flex-col items-center justify-center active:scale-95 transition-transform"
              >
                <X className="w-10 h-10 mb-1" strokeWidth={3} />
                HAYIR
              </button>
              <button 
                onClick={onConfirm}
                className="flex-1 bg-gradient-to-b from-green-400 to-green-500 text-white font-black text-2xl py-6 rounded-[28px] flex flex-col items-center justify-center active:scale-95 transition-transform shadow-lg shadow-green-200 border-b-4 border-green-700"
              >
                <Check className="w-10 h-10 mb-1" strokeWidth={4} />
                EVET
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
