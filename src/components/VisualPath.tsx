import { PackageOpen, Download, Smartphone, Play } from 'lucide-react';

export function VisualPath() {
  const steps = [
    { num: 1, icon: PackageOpen, text: "Seç", color: "text-blue-500", bg: "bg-blue-100" },
    { num: 2, icon: Download, text: "İndir", color: "text-green-500", bg: "bg-green-100" },
    { num: 3, icon: Smartphone, text: "Kur", color: "text-purple-500", bg: "bg-purple-100" },
    { num: 4, icon: Play, text: "Oyna", color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-sm mx-auto my-8 px-2 relative">
      {/* Connecting line */}
      <div className="absolute top-6 left-8 right-8 h-1.5 bg-slate-200 -z-10 rounded-full"></div>
      
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div key={idx} className="flex flex-col items-center bg-slate-50 px-1 relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.bg} shadow-sm border-4 border-slate-50 relative`}>
              <Icon className={`w-5 h-5 ${step.color}`} strokeWidth={3} />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {step.num}
              </div>
            </div>
            <span className="font-black text-xs mt-2 text-slate-700 uppercase tracking-wide">{step.text}</span>
          </div>
        );
      })}
    </div>
  );
}
