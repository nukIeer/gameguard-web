import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-center py-4 bg-white shadow-sm px-4 sticky top-0 z-10 border-b border-slate-100">
      <div className="flex items-center space-x-2">
        <ShieldCheck className="w-8 h-8 text-blue-500" />
        <div className="flex flex-col">
          <span className="font-black text-xl leading-none text-slate-800 tracking-tight">Oyun Kalkanı</span>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mt-0.5">Kurulum Merkezi</span>
        </div>
      </div>
    </header>
  );
}
