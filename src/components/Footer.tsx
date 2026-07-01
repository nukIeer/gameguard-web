export function Footer() {
  return (
    <footer className="mt-12 mb-24 px-6 text-center">
      <p className="text-[10px] leading-relaxed text-slate-400 font-bold mb-4 px-2">
        Bu site bağımsız bir kurulum yardımcısıdır. Resmi Roblox veya Discord uygulaması değildir. Marka adları kendi sahiplerine aittir. Kurulum kullanıcının kendi onayıyla gerçekleşir.
      </p>
      <div className="flex justify-center space-x-6 text-[11px] font-black text-slate-300 uppercase tracking-widest">
        <a href="#" className="hover:text-slate-500">Gizlilik</a>
        <a href="#" className="hover:text-slate-500">Kullanım</a>
        <a href="#" className="hover:text-slate-500">Yardım</a>
      </div>
    </footer>
  );
}
