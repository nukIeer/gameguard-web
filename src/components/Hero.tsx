import { Mascot } from './Mascot';
import { VisualPath } from './VisualPath';
import { Smartphone, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="text-center px-4 py-8 bg-white border-b border-slate-100 rounded-b-3xl shadow-sm mb-6">
      <div className="flex justify-center items-end space-x-2 mb-6">
        <Smartphone className="w-16 h-16 text-slate-700" strokeWidth={1.5} />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-10 h-10 text-green-500 mb-2" strokeWidth={3.5} />
        </motion.div>
        <Mascot className="w-16 h-16" />
      </div>
      
      <h1 className="text-[40px] leading-none font-black text-slate-900 tracking-tight">Paketi Seç</h1>
      <p className="text-xl font-bold text-slate-400 mt-2">Sonra indir ve kur</p>
      
      <VisualPath />
    </div>
  );
}
