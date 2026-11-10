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
      router.push('/');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col-reverse lg:flex-row overflow-hidden">
      {/* 1. ORGANIC EXPANDING CIRCLE REVEAL NIGHT BACKGROUND */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 80% 50%)' }}
        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/images/login/background2.png')" }}
      />

      {/* Ambient dark fade mask on the RIGHT to protect right-aligned typography */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-gradient-to-l from-black/60 via-black/25 to-transparent -z-10 pointer-events-none" />

      {/* TOP NAVIGATION (Absolute positioned, z-20) */}
      <header className="absolute top-8 left-8 z-20">
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
            className="h-9 md:h-10 w-auto object-contain drop-shadow-md"
            priority
          />
        </Link>
      </header>

      <div className="absolute top-8 right-8 hidden md:flex items-center gap-4 text-white/80 text-sm font-light z-20 drop-shadow-sm">
        <div className="w-12 h-px bg-white/50" />
        <span className="tracking-wide">A New Value for Every Resource</span>
      </div>

      {/* LEFT COLUMN (The Bright Frosted Glassmorphism Form) */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-16 relative z-10 pb-16 lg:pb-12"
      >
        <div className="w-full max-w-md bg-white/25 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(255,255,255,0.15)] rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden">
          {/* Subtle white inner glow at top edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* Official Green Logo at Top Center */}
          <Image
            src="/images/logo/elovia-logo-green.png"
            alt="ELOVIA"
            width={48}
            height={48}
            className="w-12 h-12 object-contain mx-auto mb-2 drop-shadow-xs"
            priority
          />

          {/* Title with High Contrast */}
          <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight mt-1">
            Mulai Perjalanan Hijau
          </h2>

          {/* Subtitle with Crisp Text */}
          <p className="text-sm font-medium text-slate-700 text-center mt-2 mb-6 leading-relaxed px-2">
            Daftar sekarang dan ambil bagian dalam revolusi sirkular ELOVIA.
          </p>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Input 1 (Nama Lengkap) */}
            <div className="relative flex items-center bg-white/70 border border-white/60 rounded-xl mb-3.5 overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/60 shadow-xs transition-all">
              <User size={18} className="text-slate-600 absolute left-4 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full bg-transparent px-12 py-3.5 text-sm text-slate-900 placeholder-slate-500 font-medium outline-none"
              />
            </div>

            {/* Input 2 (Alamat Email) */}
            <div className="relative flex items-center bg-white/70 border border-white/60 rounded-xl mb-3.5 overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/60 shadow-xs transition-all">
              <Mail size={18} className="text-slate-600 absolute left-4 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat Email"
                className="w-full bg-transparent px-12 py-3.5 text-sm text-slate-900 placeholder-slate-500 font-medium outline-none"
              />
            </div>

            {/* Input 3 (Password) */}
            <div className="relative flex items-center bg-white/70 border border-white/60 rounded-xl mb-4 overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/60 shadow-xs transition-all">
              <Lock size={18} className="text-slate-600 absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent px-12 py-3.5 text-sm text-slate-900 placeholder-slate-500 font-medium outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-600 absolute right-4 cursor-pointer hover:text-slate-900 transition p-1 focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-2 mb-6 text-xs text-slate-800 leading-snug">
              <input
                type="checkbox"
                id="agree"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="rounded border-slate-400 text-emerald-600 focus:ring-emerald-500 bg-white/70 accent-emerald-600 cursor-pointer mt-0.5"
              />
              <label htmlFor="agree" className="cursor-pointer select-none text-slate-800 font-medium">
                Saya menyetujui{' '}
                <span className="font-semibold text-emerald-800 hover:underline">
                  Syarat & Ketentuan
                </span>{' '}
                serta Kebijakan Privasi ELOVIA.
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#6A9A65] to-[#88B882] hover:opacity-90 active:scale-[0.99] text-white rounded-xl text-sm font-semibold shadow-lg transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight size={13} className="text-white" />
                  </div>
                  <span>Daftar Sekarang</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <hr className="flex-1 border-white/60" />
            <span className="text-xs font-semibold text-slate-700">atau</span>
            <hr className="flex-1 border-white/60" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full py-3.5 bg-white/90 hover:bg-white text-slate-900 rounded-xl text-sm font-semibold shadow-sm border border-white transition-all flex justify-center items-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-75"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Daftar dengan Google</span>
          </button>

          {/* Footer Link to Login */}
          <p className="text-xs font-medium text-slate-800 mt-6 text-center">
            Sudah punya akun?{' '}
            <Link
              href="/masuk"
              className="font-bold cursor-pointer text-emerald-800 hover:text-emerald-950 transition"
            >
              Masuk di sini &rarr;
            </Link>
          </p>
        </div>
      </motion.div>

      {/* RIGHT COLUMN (The Typography - Sign Up Focused & Right-Aligned) */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-1/2 flex flex-col justify-center items-start lg:items-end text-left lg:text-right p-8 lg:p-20 relative z-10 pt-28 lg:pt-12"
      >
        <div className="max-w-xl flex flex-col items-start lg:items-end w-full">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 w-max mb-6 text-xs sm:text-sm font-medium text-white shadow-sm">
            <CheckCircle2 size={16} className="text-emerald-300 stroke-[2.2]" />
            <span>Mulai Perjalanan Hijau</span>
          </div>

          {/* New Sign Up Headline (Symmetrical 3-line format) */}
          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-light leading-[1.18] tracking-tight text-white drop-shadow-lg mb-6 max-w-xl text-left lg:text-right ml-auto">
            Sirkularitas bermula, <br className="hidden sm:block" />
            dari <span className="font-serif italic font-normal text-white drop-shadow-xl">aksi kecilmu</span> <br className="hidden sm:block" />
            hari ini.
          </h1>

          {/* New Sign Up Subtitle */}
          <p className="text-white/95 font-normal text-sm sm:text-base leading-relaxed max-w-md mb-8 text-left lg:text-right ml-auto [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
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
        </div>
      </motion.div>
    </div>
  );
}
