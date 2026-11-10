'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
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

export default function MasukPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login authentication
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div
      className="min-h-screen relative flex flex-col lg:flex-row w-full bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: "url('/images/login/background.png')" }}
    >
      {/* Subtle atmospheric gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-0 pointer-events-none" />

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
        <span className="tracking-wide">A New Value for Every Resource</span>
        <div className="w-12 h-px bg-white/50" />
      </div>

      {/* LEFT COLUMN (Hero Text - z-10) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center pl-8 md:pl-16 lg:pl-20 pr-4 lg:pr-12 py-12 pt-28 lg:pt-12 relative z-10"
      >
        {/* Ambient dark fade strictly behind the text */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/50 via-black/25 to-transparent -z-10 pointer-events-none" />

        <div className="max-w-xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 w-max mb-6 text-xs sm:text-sm font-medium text-white shadow-sm">
            <Leaf size={14} className="text-emerald-300 stroke-[2.2]" />
            <span>Sustainable Future, Together</span>
          </div>

          {/* Headline Scaling & Clean 3-Line Breaks */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-light leading-[1.18] tracking-tight text-white drop-shadow-lg mb-6">
            Setiap perubahan kecil, <br className="hidden sm:block" />
            membawa <span className="font-serif italic font-normal text-white drop-shadow-xl">nilai baru</span> <br className="hidden sm:block" />
            bagi bumi.
          </h1>

          {/* Subtext Legibility & Spacing */}
          <p className="text-white/95 font-normal text-sm sm:text-base leading-relaxed max-w-lg mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
            Bersama ELOVIA, wujudkan masa depan lebih hijau melalui solusi daur ulang yang inovatif.
          </p>

          {/* Explore Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 border border-white/40 bg-white/10 hover:bg-white/25 backdrop-blur-md rounded-full px-6 py-2.5 text-white font-medium text-sm shadow-md transition-all duration-300 active:scale-95 group w-max"
          >
            <PlayCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span>Jelajahi ELOVIA</span>
          </Link>
        </div>
      </motion.div>

      {/* RIGHT COLUMN (The Glassmorphism Login Panel - z-10) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-16 z-10 pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.15)] rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden"
        >
          {/* Subtle white inner glow at top edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

          {/* Official Green Logo at Top Center */}
          <Image
            src="/images/logo/elovia-logo-green.png"
            alt="ELOVIA"
            width={48}
            height={48}
            className="w-12 h-12 object-contain mx-auto mb-2 drop-shadow-xs"
            priority
          />

          {/* Title */}
          <h2 className="text-2xl font-semibold text-slate-800 text-center tracking-tight mt-1">
            Selamat Datang Kembali
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-slate-600 text-center mt-2 mb-8 leading-relaxed px-4">
            Masuk untuk melanjutkan perjalanan menuju bumi yang lebih hijau.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Input 1 (Email) with Double-Layered Glass Effect */}
            <div className="relative flex items-center bg-white/50 border border-white/60 rounded-xl mb-4 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
              <Mail size={18} className="text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat Email"
                className="w-full bg-transparent px-12 py-3.5 text-sm text-slate-800 placeholder-slate-500 outline-none"
              />
            </div>

            {/* Input 2 (Password) with Double-Layered Glass Effect */}
            <div className="relative flex items-center bg-white/50 border border-white/60 rounded-xl mb-4 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
              <Lock size={18} className="text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent px-12 py-3.5 text-sm text-slate-800 placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-500 absolute right-4 cursor-pointer hover:text-slate-700 transition p-1 focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Options Row */}
            <div className="flex justify-between items-center mb-6 text-xs font-medium text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-400 text-emerald-600 focus:ring-emerald-500 bg-white/50 accent-emerald-600 cursor-pointer"
                />
                <span>Ingat saya</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  alert('Petunjuk pemulihan kata sandi telah dikirim ke email terdaftar Anda.');
                }}
                className="hover:text-emerald-700 cursor-pointer transition-colors bg-transparent border-0 p-0 text-xs font-medium text-slate-700"
              >
                Lupa password?
              </button>
            </div>

            {/* Primary Button */}
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
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-1 border-white/50" />
            <span className="text-xs font-medium text-slate-600">atau</span>
            <hr className="flex-1 border-white/50" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 bg-white/80 hover:bg-white text-slate-800 rounded-xl text-sm font-semibold shadow-sm border border-white transition-all flex justify-center items-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-75"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Masuk dengan Google</span>
          </button>

          {/* Footer Link */}
          <p className="text-xs font-medium text-slate-700 mt-8 text-center">
            Belum punya akun?{' '}
            <Link
              href="/daftar"
              className="font-bold cursor-pointer hover:text-emerald-700 transition"
            >
              Daftar di sini &rarr;
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
