import { Download, Smartphone, Pointer, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Mascot } from './Mascot';

export function DownloadStarted({ onReset }: { onReset: () => void }) {
  return (
    <div className="px-4 py-8 flex flex-col items-center max-w-md mx-auto min-h-screen pb-32">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg relative"
      >
        <CheckCircle2 className="w-14 h-14 text-green-500" strokeWidth={2.5} />
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute -right-6 -bottom-4"
        >
          <Mascot className="w-20 h-20 drop-shadow-md" />
        </motion.div>
      </motion.div>

      <h1 className="text-[40px] leading-none font-black text-slate-900 mb-3 text-center tracking-tight">İndirme Başladı</h1>
      <p className="text-xl font-bold text-slate-500 mb-10 text-center">Bitince dosyaya dokun</p>

      {/* Visual install steps */}
      <div className="w-full space-y-4 relative">
        {/* Connecting line */}
        <div className="absolute left-10 top-10 bottom-10 w-2 bg-slate-200 rounded-full -z-10"></div>

        <StepCard num="1" icon={Download} text="İndir" color="blue" delay={0.1} />
        <StepCard num="2" icon={Pointer} text="Dosyaya Dokun" color="yellow" delay={0.3} />
        <StepCard num="3" icon={Smartphone} text="Kur" color="purple" delay={0.5} />
        <StepCard num="4" icon={Play} text="Oyuna Dön" color="green" delay={0.7} />
      </div>

      <div className="mt-12 w-full">
        <a 
          href="oyunkalkani://return"
          className="w-full bg-gradient-to-b from-blue-500 to-blue-600 text-white font-black text-2xl py-6 rounded-[32px] flex items-center justify-center shadow-xl shadow-blue-200 border-b-[6px] border-blue-800 active:scale-95 transition-transform tracking-wide"
        >
          UYGULAMAYA DÖN
        </a>
        <button 
          onClick={onReset}
          className="w-full mt-6 text-slate-400 font-bold text-lg py-4 active:scale-95 transition-transform"
        >
          Başka paket seç
        </button>
      </div>
    </div>
  );
}

function StepCard({ num, icon: Icon, text, color, delay }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-white rounded-[32px] p-4 flex items-center shadow-sm border-2 border-slate-100"
    >
      <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-2xl shrink-0 mr-4 border-4 border-white shadow-sm">
        {num}
      </div>
      <div className={`w-16 h-16 rounded-[24px] ${colors[color]} flex items-center justify-center shrink-0 mr-4 border-2 border-white shadow-sm`}>
        <Icon className="w-8 h-8" strokeWidth={2.5} />
      </div>
      <div className="text-[26px] font-black text-slate-800 tracking-tight">
        {text}
      </div>
    </motion.div>
  );
}
