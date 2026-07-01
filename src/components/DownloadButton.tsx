import { Download, Hand } from 'lucide-react';
import { motion } from 'motion/react';
import { Mascot } from './Mascot';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export function DownloadButton({ disabled, onClick }: Props) {
  if (disabled) {
    return (
      <div className="mt-10 mb-4 relative">
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="bg-slate-800 text-white text-sm font-black py-2 px-4 rounded-[20px] mb-2 relative tracking-wide">
            Önce paket seç
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-800"></div>
          </div>
          <Hand className="w-8 h-8 text-yellow-500 fill-yellow-100" />
        </motion.div>

        <button 
          disabled
          className="w-full bg-slate-200 text-slate-400 font-black text-[32px] py-6 rounded-[32px] flex flex-col items-center justify-center opacity-80"
        >
          <span className="mb-1 leading-none">ÖNCE SEÇ</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-4 relative">
      <motion.div 
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute -top-16 -right-2 flex flex-col items-center z-10"
      >
        <div className="bg-green-500 text-white text-sm font-black py-1.5 px-4 rounded-[20px] mb-1 relative shadow-md">
          Harika!
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-green-500"></div>
        </div>
        <Mascot className="w-14 h-14 drop-shadow-md" />
      </motion.div>

      <motion.button 
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0px 0px 0px 0px rgba(34, 197, 94, 0.4)', '0px 0px 0px 20px rgba(34, 197, 94, 0)'] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={onClick}
        className="w-full bg-gradient-to-b from-green-400 to-green-600 text-white font-black py-7 rounded-[32px] flex flex-col items-center justify-center shadow-xl shadow-green-200 border-b-[6px] border-green-700 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20 rounded-t-[32px]"></div>
        <div className="flex items-center space-x-3 mb-1.5 relative z-10">
          <Download className="w-12 h-12 drop-shadow-md" strokeWidth={3.5} />
          <span className="text-[40px] tracking-tight leading-none drop-shadow-md">İNDİR</span>
        </div>
        <span className="text-sm font-bold opacity-90 relative z-10 uppercase tracking-widest">En Güncel Paket</span>
      </motion.button>
    </div>
  );
}
