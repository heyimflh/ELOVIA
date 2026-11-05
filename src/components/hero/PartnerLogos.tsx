'use client';

export function PartnerLogos() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 text-center">
      {/* Bottom Kicker / Text Area in Pure White / Light Mint */}
      <p className="text-xs sm:text-sm font-semibold text-[#E8F4EC] tracking-wider uppercase mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        Partnered with certified recycling centers &amp; eco-initiatives
      </p>

      {/* 4 Brand / Partner Logos in Pure White / Light Mint */}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-18 opacity-90 hover:opacity-100 transition-opacity">
        {/* Partner 1: Waste4Change */}
        <div className="group flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
          <svg
            className="w-5 h-5 text-[#E8F4EC] group-hover:text-white transition-colors drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="font-fraunces font-bold text-lg sm:text-xl tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-[#E8F4EC] transition-colors">
            Waste4Change
          </span>
        </div>

        {/* Partner 2: Rekosistem */}
        <div className="group flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
          <div className="w-4.5 h-4.5 rounded-full border-2 border-[#E8F4EC] group-hover:border-white flex items-center justify-center transition-colors shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#E8F4EC] group-hover:bg-white rounded-full" />
          </div>
          <span className="font-sans font-extrabold text-base sm:text-lg tracking-wider uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-[#E8F4EC] transition-colors">
            Rekosistem
          </span>
        </div>

        {/* Partner 3: EcoBali */}
        <div className="group flex items-center gap-1.5 cursor-pointer transition-transform duration-300 hover:scale-105">
          <span className="font-fraunces italic font-medium text-xl sm:text-2xl tracking-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-[#E8F4EC] transition-colors">
            ecoBali
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#E8F4EC] font-bold border-b border-[#E8F4EC] pb-0.5 drop-shadow-sm">
            Recycle
          </span>
        </div>

        {/* Partner 4: Bank Sampah Berseri */}
        <div className="group flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
          <svg
            className="w-5 h-5 text-[#E8F4EC] group-hover:text-white transition-colors drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 10h16M4 14h16M7 6v12M17 6v12" />
          </svg>
          <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-[#E8F4EC] transition-colors">
            BankSampah
            <span className="font-semibold text-[#E8F4EC]">.id</span>
          </span>
        </div>
      </div>
    </div>
  );
}
