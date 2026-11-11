'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';

// Authentic Google Multi-Color G Icon
function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function DaftarPage() {
  const router = useRouter();

  // Role State: 'warga' (Standard User) or 'mitra' (Admin / Partner)
  const [role, setRole] = useState<'warga' | 'mitra'>('warga');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate account registration
    setTimeout(() => {
      setIsLoading(false);
      router.push('/masuk');
    }, 1000);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'warga') {
        router.push('/dompet');
      } else {
        router.push('/mitra');
      }
    }, 1000);
  };

  return (
    // 1. GLOBAL WRAPPER: Strict Full Screen with 100dvh
    <main className="relative w-full h-[100dvh] overflow-hidden flex flex-col lg:flex-row bg-slate-900">
      {/* 2. BACKGROUND IMAGE HANDLING with Responsive Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/login/background2.png"
          alt="ELOVIA Eco Night Background"
          fill
          priority
          className="w-full h-full object-cover"
        />
        {/* Mobile: dark translucent overlay & soft blur for pristine contrast; Desktop: crystal clear */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-none" />
      </div>

      {/* TOP NAVIGATION (Absolute Header) */}
      <header className="absolute top-4 left-6 lg:top-8 lg:left-12 z-20 flex items-center">
        <Link
          href="/"
          className="inline-flex items-center hover:opacity-90 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-lg"
          aria-label="ELOVIA Beranda"
        >
          <Image
            src="/images/logo/elovia-logo-white.png"
            alt="ELOVIA Logo"
            width={140}
            height={40}
            className="h-7 sm:h-8 lg:h-10 w-auto object-contain drop-shadow-md"
            priority
          />
        </Link>
      </header>

      <div className="absolute top-8 right-12 hidden md:flex items-center gap-4 text-white/80 text-sm font-light z-20 drop-shadow-sm">
        <div className="w-12 h-px bg-white/50" />
        <span className="tracking-wide">A New Value for Every Resource</span>
      </div>

      {/* MOBILE TOP: Concise Header (Visible only on mobile to save vertical space) */}
      <div className="lg:hidden relative z-10 w-full pt-14 pb-1 px-6 flex-shrink-0 text-center">
        <div className="inline-flex items-center gap-1.5 border border-white/25 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium text-white shadow-xs mb-1.5">
          <CheckCircle2 size={12} className="text-emerald-300 stroke-[2.2]" />
          <span>Mulai Perjalanan Hijau</span>
        </div>
        <h1 className="text-lg sm:text-xl font-light tracking-tight text-white drop-shadow-sm leading-snug">
          Ubah aksi kecilmu jadi <span className="font-serif italic font-normal text-emerald-200">nilai nyata</span>
        </h1>
      </div>

      {/* LEFT SIDE (Desktop Form) / BOTTOM-CENTER (Mobile Form) */}
      <div className="relative z-10 w-full lg:w-1/2 h-full flex items-center justify-center p-3 sm:p-6 lg:p-12 flex-1 min-h-0">
        {/* REFINED PRISTINE GLASS CONTAINER: bg-white/10 + Hidden Scrollbar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col max-h-[85dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
        >
          {/* Subtle white inner glow at top edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* Official Green Logo at Top Center */}
          <Image
            src="/images/logo/elovia-logo-green.png"
            alt="ELOVIA"
            width={44}
            height={44}
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain mx-auto mb-1 drop-shadow-xs"
            priority
          />

          {/* 1. HIGH CONTRAST TITLE: Pure white with drop-shadow */}
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md mb-2 text-center">
            Mulai Perjalanan Hijau
          </h2>

          {/* 1. HIGH CONTRAST SUBTITLE: Crisp white/85 with drop-shadow */}
          <p className="text-sm text-white/85 font-medium leading-relaxed drop-shadow-sm mb-6 text-center">
            {role === 'warga'
              ? 'Daftar sekarang dan ambil bagian dalam revolusi sirkular ELOVIA.'
              : 'Daftar sebagai mitra pengelola daur ulang dan kembangkan operasional hijau Anda.'}
          </p>

          {/* 3. VERTICAL COMPACTION: Segmented Control (mb-5) */}
          <div className="flex bg-slate-900/30 backdrop-blur-md p-1 rounded-2xl mb-5 border border-white/20 relative w-full flex-shrink-0">
            {/* Button 1: Warga */}
            <button
              type="button"
              onClick={() => setRole('warga')}
              className={`relative w-1/2 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center z-10 transition-colors duration-300 cursor-pointer outline-none ${
                role === 'warga' ? 'text-emerald-700' : 'text-white/80 hover:text-white'
              }`}
            >
              {role === 'warga' && (
                <motion.div
                  layoutId="activeRegisterRoleIndicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">Warga</span>
            </button>

            {/* Button 2: Mitra / Admin */}
            <button
              type="button"
              onClick={() => setRole('mitra')}
              className={`relative w-1/2 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center z-10 transition-colors duration-300 cursor-pointer outline-none ${
                role === 'mitra' ? 'text-emerald-700' : 'text-white/80 hover:text-white'
              }`}
            >
              {role === 'mitra' && (
                <motion.div
                  layoutId="activeRegisterRoleIndicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">Mitra / Admin</span>
            </button>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* 3. Input 1 (Nama Lengkap) - mb-3 spacing */}
            <div className="relative flex items-center bg-white/15 border border-white/25 rounded-xl mb-3 overflow-hidden focus-within:bg-white/20 focus-within:border-white/50 focus-within:ring-2 focus-within:ring-emerald-400/40 shadow-xs transition-all">
              <User size={16} className="text-white/70 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full bg-transparent pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-white/60 font-medium outline-none"
              />
            </div>

            {/* 3. Input 2 (Alamat Email) - mb-3 spacing */}
            <div className="relative flex items-center bg-white/15 border border-white/25 rounded-xl mb-3 overflow-hidden focus-within:bg-white/20 focus-within:border-white/50 focus-within:ring-2 focus-within:ring-emerald-400/40 shadow-xs transition-all">
              <Mail size={16} className="text-white/70 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat Email"
                className="w-full bg-transparent pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-white/60 font-medium outline-none"
              />
            </div>

            {/* 3. Input 3 (Password) - mb-3 spacing */}
            <div className="relative flex items-center bg-white/15 border border-white/25 rounded-xl mb-3 overflow-hidden focus-within:bg-white/20 focus-within:border-white/50 focus-within:ring-2 focus-within:ring-emerald-400/40 shadow-xs transition-all">
              <Lock size={16} className="text-white/70 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent pl-11 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-white/60 font-medium outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/70 absolute right-3 cursor-pointer hover:text-white transition p-1 focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            {/* 3. Agreement Checkbox - my-4 with high-contrast text-white/80 */}
            <div className="flex items-start gap-2 my-4 text-xs text-white/80 leading-snug">
              <input
                type="checkbox"
                id="agree"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="rounded border-white/40 text-emerald-500 focus:ring-emerald-400 bg-white/20 accent-emerald-500 cursor-pointer mt-0.5"
              />
              <label htmlFor="agree" className="cursor-pointer select-none text-white/80 font-medium">
                Saya menyetujui{' '}
                <span className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                  Syarat & Ketentuan
                </span>{' '}
                serta Kebijakan Privasi ELOVIA.
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#6A9A65] to-[#88B882] hover:opacity-90 active:scale-[0.99] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={12} className="text-white" />
                  </div>
                  <span>Daftar sebagai {role === 'warga' ? 'Warga' : 'Mitra'}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider - reduced margin my-3.5 */}
          <div className="flex items-center gap-3 my-3.5">
            <hr className="flex-1 border-white/20" />
            <span className="text-[11px] sm:text-xs font-semibold text-white/60">atau</span>
            <hr className="flex-1 border-white/20" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full py-3 bg-white/90 hover:bg-white text-slate-900 rounded-xl text-xs sm:text-sm font-semibold shadow-sm border border-white transition-all flex justify-center items-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-75"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Daftar dengan Google</span>
          </button>

          {/* Footer Link to Login - mt-4 with text-white/80 */}
          <p className="text-[11px] sm:text-xs font-medium text-white/80 mt-4 text-center">
            Sudah punya akun?{' '}
            <Link
              href="/masuk"
              className="font-bold cursor-pointer text-emerald-400 hover:text-emerald-300 transition ml-1"
            >
              Masuk di sini &rarr;
            </Link>
          </p>
        </motion.div>
      </div>

      {/* DESKTOP ONLY: Right Side Typography (Right-Aligned) */}
      <div className="hidden lg:flex relative z-10 w-1/2 h-full flex-col justify-center items-end text-right px-12 xl:px-24">
        {/* Ambient dark fade mask on the RIGHT to protect right-aligned typography */}
        <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/60 via-black/25 to-transparent -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-xl flex flex-col items-end w-full"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 w-max mb-6 text-xs sm:text-sm font-medium text-white shadow-sm">
            <CheckCircle2 size={16} className="text-emerald-300 stroke-[2.2]" />
            <span>Mulai Perjalanan Hijau</span>
          </div>

          {/* Sign Up Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-light leading-[1.18] tracking-tight text-white drop-shadow-lg mb-6 max-w-xl text-right ml-auto">
            Sirkularitas bermula, <br />
            dari <span className="font-serif italic font-normal text-white drop-shadow-xl">aksi kecilmu</span> <br />
            hari ini.
          </h1>

          {/* Sign Up Subtitle */}
          <p className="text-white/95 font-normal text-sm sm:text-base leading-relaxed max-w-md mb-8 text-right ml-auto [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
            Bergabung bersama ELOVIA. Ubah sampah menjadi nilai, dan wujudkan masa depan yang berkelanjutan.
          </p>

          {/* Explore Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 border border-white/40 bg-white/10 hover:bg-white/25 backdrop-blur-md rounded-full px-6 py-2.5 text-white font-medium text-sm shadow-md transition-all duration-300 active:scale-95 group w-max ml-auto"
          >
            <PlayCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span>Jelajahi ELOVIA</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
