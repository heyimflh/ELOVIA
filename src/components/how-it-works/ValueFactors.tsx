/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/purity */
'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
  useSpring,
  AnimatePresence,
  useMotionTemplate,
} from 'framer-motion';
import {
  Layers,
  Sparkles,
  Droplets,
  Scale,
  TrendingUp,
  Truck,
  Play,
  X,
  ArrowUpRight,
  Leaf,
} from 'lucide-react';
import Image from 'next/image';

interface ChartProps {
  isHovered: boolean;
  color: string;
}

const MiniBarChart = ({ isHovered, color }: ChartProps) => (
  <div className="flex items-end gap-1.5 sm:gap-2 h-10 mt-4 transform-gpu">
    {[40, 70, 50, 90, 60].map((height, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{
          height: isHovered ? [`${height}%`, `${Math.random() * 50 + 50}%`, `${height}%`] : `${height}%`,
          backgroundColor: isHovered ? '#FFFFFF' : color,
        }}
        transition={{
          duration: isHovered ? 0.3 : 1,
          delay: isHovered ? i * 0.05 : 0.5 + i * 0.1,
          repeat: isHovered ? Infinity : 0,
          ease: isHovered ? 'circInOut' : 'easeOut',
        }}
        className="w-3 sm:w-4 rounded-t-sm transform-gpu will-change-transform"
      />
    ))}
  </div>
);

const MiniRingChart = ({ isHovered, color }: ChartProps) => (
  <motion.div
    animate={{ rotate: isHovered ? 360 : 0 }}
    transition={{ duration: isHovered ? 1.5 : 1, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
    className="relative w-10 h-10 sm:w-12 sm:h-12 mt-2 transform-gpu will-change-transform"
  >
    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
      <path
        className="text-white/20"
        strokeWidth="4"
        stroke="currentColor"
        fill="none"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <motion.path
        animate={{
          strokeDasharray: isHovered ? ['10, 100', '90, 100', '10, 100'] : '75, 100',
          color: isHovered ? '#FFFFFF' : color,
        }}
        transition={{ duration: isHovered ? 1 : 1.5, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
        className="text-[#0F172A] transform-gpu will-change-transform"
        strokeWidth="4"
        strokeLinecap="round"
        stroke="currentColor"
        fill="none"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
  </motion.div>
);

const MiniTrendLine = ({ isHovered }: ChartProps) => (
  <div className="w-20 h-8 sm:w-24 sm:h-10 mt-4 relative transform-gpu">
    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
      <motion.path
        animate={{
          pathLength: isHovered ? [0.2, 1, 0.2] : 1,
          stroke: isHovered ? '#FFFFFF' : '#0F172A',
        }}
        transition={{ duration: isHovered ? 0.8 : 1.5, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
        d="M0,40 Q20,30 40,35 T80,15 T100,0"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="transform-gpu will-change-transform"
      />
      <motion.circle
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
          fill: isHovered ? '#FFFFFF' : '#10B981',
        }}
        transition={{ duration: isHovered ? 0.4 : 2, repeat: isHovered ? Infinity : 0 }}
        cx="100"
        cy="0"
        r="4"
        className="transform-gpu will-change-transform"
      />
    </svg>
  </div>
);

const MiniGaugeChart = ({ isHovered }: ChartProps) => (
  <div className="relative w-14 h-7 sm:w-16 sm:h-8 mt-4 overflow-visible transform-gpu">
    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
      <path
        d="M 10 50 A 40 40 0 0 1 90 50"
        fill="none"
        stroke={isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(16,185,129,0.2)'}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <motion.path
        animate={{
          stroke: isHovered ? '#FFFFFF' : '#10B981',
          pathLength: isHovered ? [0.4, 0.9, 0.4] : 0.85,
        }}
        transition={{ duration: isHovered ? 0.5 : 1.5, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
        d="M 10 50 A 40 40 0 0 1 90 50"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        className="transform-gpu will-change-transform"
      />
      <motion.line
        animate={{
          rotate: isHovered ? [20, 100, 20] : 60,
          stroke: isHovered ? '#FFFFFF' : '#0F172A',
        }}
        transition={{
          duration: isHovered ? 0.3 : 1.5,
          repeat: isHovered ? Infinity : 0,
          type: isHovered ? 'tween' : 'spring',
          bounce: 0.4,
        }}
        style={{ transformOrigin: '50px 50px' }}
        x1="50"
        y1="50"
        x2="20"
        y2="20"
        strokeWidth="3"
        strokeLinecap="round"
        className="transform-gpu will-change-transform"
      />
      <motion.circle cx="50" cy="50" r="6" animate={{ fill: isHovered ? '#FFFFFF' : '#0F172A' }} />
    </svg>
  </div>
);

export const eloviaCardData = [
  {
    id: 1,
    title: 'Kemurnian Material',
    value: 35,
    unit: '% Bobot',
    description: 'Monomaterial dihargai tertinggi.',
    fullExplanation:
      'Polimer murni (PET bening/kardus kraft) bernilai tinggi karena mudah dilebur tanpa pemisahan kimiawi yang rumit.',
    bgImage: '/images/materials/plastic.jpg',
    color: '#10B981', // Emerald
    icon: <Layers size={24} />,
    pos: { left: '2%', top: '4%' },
    rotation: -4,
    floatDelay: 0,
    Visual: MiniBarChart,
    cablePath: 'M 200 150 C 400 200, 500 500, 600 500',
    nodeX: 200,
    nodeY: 150,
  },
  {
    id: 2,
    title: 'Kondisi Fisik',
    value: 20,
    unit: '% Bobot',
    description: 'Utuh, kering, tidak robek.',
    fullExplanation:
      'Kardus utuh dan tidak basah menjaga kekuatan serat alami, menghemat tenaga sortir manual di fasilitas daur ulang.',
    bgImage: '/images/materials/paper_cardboard.jpg',
    color: '#0F172A', // Dark
    icon: <Sparkles size={24} />,
    pos: { right: '2%', top: '4%' },
    rotation: 5,
    floatDelay: 0.5,
    Visual: MiniRingChart,
    cablePath: 'M 1000 150 C 800 200, 700 500, 600 500',
    nodeX: 1000,
    nodeY: 150,
  },
  {
    id: 3,
    title: 'Standar Kebersihan',
    value: 20,
    unit: '% Bobot',
    description: 'Bebas residu minyak/makanan.',
    fullExplanation:
      'Material yang dibilas bersih menghemat jutaan liter air pencucian di pabrik, sehingga langsung dihargai tarif tertinggi.',
    bgImage: '/images/materials/glass.jpg',
    color: '#10B981',
    icon: <Droplets size={24} />,
    pos: { left: '0%', top: '42%' },
    rotation: 2,
    floatDelay: 1,
    Visual: MiniGaugeChart,
    cablePath: 'M 150 500 C 350 500, 500 500, 600 500',
    nodeX: 150,
    nodeY: 500,
  },
  {
    id: 4,
    title: 'Kuantitas & Berat',
    value: 15,
    unit: 'Kg Optimal',
    description: 'Skala besar lebih efisien.',
    fullExplanation:
      'Setoran dalam jumlah besar mempercepat operasional dan mengurangi jejak karbon transportasi per kilogram material.',
    bgImage: '/images/materials/metal.jpg',
    color: '#0F172A',
    icon: <Scale size={24} />,
    pos: { right: '0%', top: '42%' },
    rotation: -2,
    floatDelay: 1.2,
    Visual: MiniTrendLine,
    cablePath: 'M 1050 500 C 850 500, 700 500, 600 500',
    nodeX: 1050,
    nodeY: 500,
  },
  {
    id: 5,
    title: 'Indeks Pasar',
    value: 14.8,
    unit: '% Naik',
    description: 'Fluktuasi harga B2B aktual.',
    fullExplanation:
      'Harga ELOVIA tersinkronisasi otomatis dengan indeks permintaan pabrik off-taker skala nasional secara transparan.',
    bgImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800',
    color: '#059669',
    icon: <TrendingUp size={24} />,
    pos: { left: '3%', bottom: '4%' },
    rotation: -5,
    floatDelay: 1.5,
    Visual: MiniBarChart,
    cablePath: 'M 250 850 C 400 800, 500 500, 600 500',
    nodeX: 250,
    nodeY: 850,
  },
  {
    id: 6,
    title: 'Biaya Logistik',
    value: 1.2,
    unit: 'Km Jarak',
    description: 'Drop-off vs Jemput Armada.',
    fullExplanation:
      'Pengguna yang melakukan drop-off mandiri menerima 100% nilai bersih, tanpa potongan biaya bensin armada penjemput.',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
    color: '#0F172A',
    icon: <Truck size={24} />,
    pos: { right: '3%', bottom: '4%' },
    rotation: 4,
    floatDelay: 1.8,
    Visual: MiniRingChart,
    cablePath: 'M 950 850 C 800 800, 700 500, 600 500',
    nodeX: 950,
    nodeY: 850,
  },
];

const reelImages1 = [
  '/images/materials/plastic.jpg',
  '/images/materials/paper_cardboard.jpg',
  '/images/materials/metal.jpg',
  '/images/materials/glass.jpg',
];
const repeatedReel1 = [...reelImages1, ...reelImages1, ...reelImages1, ...reelImages1];

const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    value % 1 === 0 ? Math.floor(latest).toLocaleString() : latest.toFixed(1)
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

const TiltCard = ({
  children,
  className = '',
  isDesktop,
}: {
  children: React.ReactNode;
  className?: string;
  isDesktop: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isDesktop ? ['12deg', '-12deg'] : ['0deg', '0deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isDesktop ? ['-12deg', '12deg'] : ['0deg', '0deg']);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['100%', '0%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['100%', '0%']);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.7) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative overflow-hidden group transform-gpu will-change-transform ${className}`}
    >
      {/* Light sheen glare using standard opacity instead of high-cost mix-blend-overlay */}
      <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/25 to-transparent w-[300%] h-[300%] -rotate-45 translate-x-[-60%] pointer-events-none opacity-40 transform-gpu" />
      {isDesktop && (
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-40 transition-opacity duration-300 transform-gpu"
          style={{ background: glareBackground }}
        />
      )}
      {children}
    </motion.div>
  );
};

export function ValueFactors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const smileyContainerRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(true);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const smoothMagnetX = useSpring(magnetX, { stiffness: 100, damping: 15, mass: 0.5 });
  const smoothMagnetY = useSpring(magnetY, { stiffness: 100, damping: 15, mass: 0.5 });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSpringX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  // Parallax progress scoped naturally to this section without scroll-locking
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const reel1X = useTransform(springScroll, [0, 1], ['0%', '-30%']);
  const reel2X = useTransform(springScroll, [0, 1], ['-30%', '0%']);

  const sec2Scale = useTransform(springScroll, [0.35, 0.8], [0.9, 1]);
  const sec2Rotate = useTransform(springScroll, [0.35, 0.8], [4, 0]);

  useEffect(() => {
    const checkDevice = () => setIsDesktop(window.innerWidth >= 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Throttled GSAP eye-tracking to avoid redundant recalculations per frame
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        if (smileyContainerRef.current) {
          const rect = smileyContainerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distX = e.clientX - centerX;
          const distY = e.clientY - centerY;
          const distance = Math.hypot(distX, distY);

          if (distance < 300) {
            magnetX.set(distX * 0.35);
            magnetY.set(distY * 0.35);
          } else {
            magnetX.set(0);
            magnetY.set(0);
          }

          const angle = Math.atan2(distY, distX);
          const eyeDist = Math.min(7, distance / 14);
          const eyeX = Math.cos(angle) * eyeDist;
          const eyeY = Math.sin(angle) * eyeDist;

          // Pure GPU translation with GSAP overwrite - no React state updates
          if (leftEyeRef.current) {
            gsap.to(leftEyeRef.current, {
              x: eyeX,
              y: eyeY,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
          if (rightEyeRef.current) {
            gsap.to(rightEyeRef.current, {
              x: eyeX,
              y: eyeY,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop, magnetX, magnetY, cursorX, cursorY]);

  return (
    <section
      id="transparansi"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center overflow-clip bg-slate-50 font-jakarta"
    >
      {/* Floating Interactive Play Cursor for Video Hover */}
      {isDesktop && (
        <motion.div
          style={{ x: cursorSpringX, y: cursorSpringY, translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: isHoveringVideo && !showModal ? 1 : 0,
            opacity: isHoveringVideo && !showModal ? 1 : 0,
          }}
          className="fixed top-0 left-0 z-150 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex flex-col items-center justify-center text-white shadow-[0_10px_30px_rgba(16,185,129,0.5)] pointer-events-none transform-gpu will-change-transform"
        >
          <Play fill="white" size={32} className="ml-1" />
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Play</span>
        </motion.div>
      )}

      {/* Background Parallax Reels and Hardware-Accelerated Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex flex-col justify-center gap-10"
        >
          <motion.div style={{ x: reel1X }} className="flex gap-6 w-max max-w-none -rotate-6 transform-gpu will-change-transform">
            {repeatedReel1.map((src, idx) => (
              <div
                key={`reel1-${idx}`}
                className="w-75 md:w-100 h-50 md:h-62.5 rounded-3xl overflow-hidden shrink-0 shadow-sm border border-[#10B981]/15 max-w-none"
              >
                <img src={src} alt="Background Material Reel" className="w-full h-full object-cover max-w-none" />
              </div>
            ))}
          </motion.div>
          <motion.div style={{ x: reel2X }} className="flex gap-6 w-max max-w-none -rotate-3 transform-gpu will-change-transform">
            {repeatedReel1.map((src, idx) => (
              <div
                key={`reel2-${idx}`}
                className="w-75 md:w-100 h-50 md:h-62.5 rounded-3xl overflow-hidden shrink-0 shadow-sm border border-[#10B981]/15 max-w-none"
              >
                <img src={src} alt="Background Material Reel" className="w-full h-full object-cover max-w-none" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-[#F6FAF7]/85 z-0" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Blobs with Standard Opacity & GPU Optimization (No mix-blend-overlay) */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[5%] right-[5%] w-72 lg:w-120 h-72 lg:h-120 bg-[#10B981] rounded-full blur-[90px] lg:blur-[120px] opacity-15 transform-gpu will-change-transform pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] left-[5%] w-72 lg:w-100 h-72 lg:h-100 bg-[#0F172A] rounded-full blur-[90px] lg:blur-[120px] opacity-10 transform-gpu will-change-transform pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="hidden lg:block absolute top-[30%] left-[25%] text-[#10B981]/15 z-0 pointer-events-none transform-gpu"
        >
          <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <Leaf size={80} />
          </motion.div>
        </motion.div>
      </div>

      {/* Top Header Block: TRANSPARANSI PENUH · ENAM FAKTOR NILAI KAMI */}
      <div className="relative w-full flex flex-col items-center justify-center text-center z-30 mb-8 lg:mb-12 select-none px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.8 }}
          className="bg-[#0F172A] text-white text-[9px] sm:text-xs font-black uppercase tracking-[0.3em] px-3.5 py-1.5 rounded-md shadow-md mb-2 inline-flex items-center gap-1.5 transform-gpu will-change-transform"
        >
          <span>TRANSPARANSI PENUH</span>
        </motion.div>

        <h2 className="relative font-black uppercase tracking-tighter leading-[0.85] flex flex-col items-center">
          <motion.span
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="text-[38px] sm:text-[60px] md:text-[75px] lg:text-[85px] text-[#0F172A] block tracking-tight font-fraunces transform-gpu will-change-transform"
          >
            ENAM FAKTOR
          </motion.span>

          <motion.span
            initial={{ scale: 0.4, opacity: 0, rotate: 15, y: 30 }}
            whileInView={{ scale: 1, opacity: 1, rotate: -1.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 150, damping: 12 }}
            className="text-[20px] sm:text-[32px] md:text-[40px] lg:text-[44px] mt-2 px-4 py-1 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg drop-shadow-sm font-black tracking-wider transform-gpu will-change-transform"
          >
            NILAI KAMI
          </motion.span>
        </h2>

        <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] mt-3 max-w-xl mx-auto leading-relaxed px-4">
          Tidak semua sampah otomatis bernilai sama. ELOVIA menerapkan 6 faktor objektif agar penentuan harga adil, presisi, dan terbuka:
        </p>
      </div>

      {/* Orbit Stage: SVG Animated Cables + Central Smiley + 6 Interactive TiltCards */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:block h-auto lg:h-[960px] justify-center z-20 overflow-visible px-4 lg:px-0">
        {/* Animated SVG Cables with Pulse Effect (Desktop Only) */}
        {isDesktop && (
          <svg viewBox="0 0 1200 1000" className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              {eloviaCardData.map((card) => (
                <linearGradient key={`grad-${card.id}`} id={`cableGrad-${card.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor={card.color} stopOpacity="1" />
                </linearGradient>
              ))}
            </defs>

            {eloviaCardData.map((card) => {
              const isHovered = hoveredCard === card.id;
              return (
                <motion.g
                  key={`cable-group-${card.id}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: card.floatDelay }}
                >
                  {/* Background faint cable path */}
                  <path d={card.cablePath} fill="none" stroke="#0F172A" strokeWidth="2" strokeOpacity="0.12" />

                  {/* Active glowing gradient cable path */}
                  <motion.path
                    d={card.cablePath}
                    fill="none"
                    stroke={`url(#cableGrad-${card.id})`}
                    strokeWidth={isHovered ? '4' : '0'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isHovered ? 1 : 0, strokeDasharray: isHovered ? '10, 5' : '0' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transform-gpu will-change-transform"
                  />

                  {/* Pulsing light bead when card is hovered */}
                  {isHovered && (
                    <motion.path
                      d={card.cablePath}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeDasharray="15, 150"
                      animate={{ strokeDashoffset: [-165, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="transform-gpu will-change-transform"
                    />
                  )}

                  {/* Terminal connection node */}
                  <circle cx={card.nodeX} cy={card.nodeY} r="8" fill="#0F172A" fillOpacity="0.1" />
                  <motion.circle
                    cx={card.nodeX}
                    cy={card.nodeY}
                    r="4"
                    fill={isHovered ? card.color : '#0F172A'}
                    animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? 1 : 0.3 }}
                    transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    className="transform-gpu will-change-transform"
                  />
                </motion.g>
              );
            })}
          </svg>
        )}

        {/* Central Interactive Smiley Face with GSAP Eye-Tracking & Full 360-degree Orbiting Text */}
        <motion.div
          ref={smileyContainerRef}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5, delay: 0.3 }}
          style={isDesktop ? { x: smoothMagnetX, y: smoothMagnetY } : {}}
          className="relative lg:absolute lg:left-1/2 lg:top-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 flex items-center justify-center mb-16 sm:mb-20 lg:mb-0 mt-8 sm:mt-12 lg:mt-0 transform-gpu will-change-transform"
        >
          {/* Spinning Circular Text Ring - Complete 360-degree Circumference */}
          {isDesktop && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-72 h-72 pointer-events-none opacity-30 transform-gpu will-change-transform"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-[#0F172A]">
                <path id="textPath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                <text className="text-[12.5px] font-black uppercase tracking-[0.16em]">
                  <textPath href="#textPath" startOffset="0%">RECYCLE • REUSE • REDUCE • SUSTAIN • RECYCLE • REUSE • REDUCE • SUSTAIN • </textPath>
                </text>
              </svg>
            </motion.div>
          )}

          {/* Central Animated Face */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-48 xl:h-48 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] shadow-[0_25px_50px_rgba(16,185,129,0.35)] flex flex-col items-center justify-center border-4 sm:border-[5px] border-white backdrop-blur-md cursor-default z-20 transition-transform duration-300 transform-gpu">
            {/* Eyes with GSAP Cursor Tracking */}
            <div className="flex gap-4 sm:gap-5 xl:gap-6 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 xl:w-10 xl:h-10 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-black/5">
                <div ref={leftEyeRef} className="flex items-center justify-center w-full h-full transform-gpu will-change-transform">
                  <motion.div
                    animate={{ scale: hoveredCard ? 2.5 : 1 }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.5 }}
                    className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 bg-[#0F172A] rounded-full transform-gpu will-change-transform"
                  />
                </div>
              </div>
              <div className="w-7 h-7 sm:w-9 sm:h-9 xl:w-10 xl:h-10 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-black/5">
                <div ref={rightEyeRef} className="flex items-center justify-center w-full h-full transform-gpu will-change-transform">
                  <motion.div
                    animate={{ scale: hoveredCard ? 2.5 : 1 }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.5 }}
                    className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 xl:w-4 bg-[#0F172A] rounded-full transform-gpu will-change-transform"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Mouth Shape */}
            <motion.div
              animate={{
                width: hoveredCard ? '1.25rem' : '2.5rem',
                height: hoveredCard ? '1.75rem' : '0.65rem',
                borderRadius: hoveredCard ? '50%' : '9999px',
              }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0.5 }}
              className="mt-1.5 opacity-80 xl:h-3.5 sm:h-3 bg-[#0F172A] transform-gpu will-change-transform"
            />
          </div>
        </motion.div>

        {/* 6 Orbiting Factor Cards: Desktop Absolute Orbit, Mobile Responsive Grid */}
        <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:block relative z-30 px-4 sm:px-6 lg:px-0 h-full pb-4 overflow-visible">
          {eloviaCardData.map((card, idx) => {
            const isHovered = hoveredCard === card.id;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  isDesktop
                    ? {
                        position: 'absolute',
                        ...card.pos,
                        zIndex: isHovered ? 40 : 30,
                        width: '100%',
                        maxWidth: '300px',
                        perspective: '1000px',
                      }
                    : {}
                }
                className="w-full relative lg:absolute transform-gpu will-change-transform"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: isDesktop ? card.rotation : 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{
                    duration: 0.8,
                    delay: isDesktop ? 0.3 + idx * 0.12 : 0.2,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  className="transform-gpu will-change-transform"
                >
                  <motion.div
                    animate={isDesktop ? { y: [0, -12, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: card.floatDelay }}
                    className="transform-gpu will-change-transform"
                  >
                    <TiltCard isDesktop={isDesktop} className="w-full rounded-[20px] sm:rounded-[28px] transform-gpu will-change-transform">
                      <motion.div
                        animate={{
                          backgroundColor: isHovered ? card.color : '#FFFFFF',
                          borderColor: isHovered ? card.color : '#E2E8F0',
                          scale: isHovered ? 1.03 : 1,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex flex-col h-full relative border-2 p-4 sm:p-5 rounded-[20px] sm:rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden transform-gpu will-change-transform"
                      >
                        <motion.div
                          animate={{ color: isHovered ? '#FFFFFF' : '#0F172A' }}
                          style={{ transform: isDesktop ? 'translateZ(40px)' : 'none' }}
                          className="flex flex-col h-full relative z-10"
                        >
                          {/* Card Top Row: Icon badge & Mini Animated Chart */}
                          <div className="flex items-start justify-between mb-2">
                            <motion.div
                              animate={{
                                backgroundColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(246,250,247,1)',
                                color: isHovered ? '#FFFFFF' : card.color,
                                rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                              }}
                              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                              className="p-2 sm:p-2.5 rounded-xl shadow-inner border border-black/5 transform-gpu will-change-transform"
                            >
                              {card.icon}
                            </motion.div>
                            <div className="h-8 sm:h-10 flex items-center">
                              <card.Visual isHovered={isHovered} color={card.color} />
                            </div>
                          </div>

                          {/* Card Content & Metrics */}
                          <div className="mt-1 relative">
                            <motion.h3
                              animate={{ color: isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.55)' }}
                              className="text-[10px] font-black uppercase tracking-[0.15em] mb-0.5"
                            >
                              {card.title}
                            </motion.h3>

                            <div className="flex items-baseline gap-1 mb-0.5">
                              <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none drop-shadow-xs font-fraunces">
                                <AnimatedNumber value={card.value} />
                              </span>
                            </div>

                            <motion.p
                              animate={{ color: isHovered ? '#FFFFFF' : '#10B981' }}
                              className="text-[9px] font-bold uppercase tracking-wider mb-1.5"
                            >
                              {card.unit}
                            </motion.p>

                            <motion.div
                              animate={{
                                background: isHovered
                                  ? 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                                  : 'linear-gradient(90deg, rgba(15,23,42,0.1) 0%, transparent 100%)',
                              }}
                              className="w-full h-px mb-1.5"
                            />

                            <motion.p
                              animate={{ color: isHovered ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.7)' }}
                              className="text-xs font-medium leading-relaxed"
                            >
                              {card.description}
                            </motion.p>

                            {/* Arrow button icon in lower right corner */}
                            <motion.div
                              animate={{ opacity: isHovered ? 0 : 1 }}
                              transition={{ duration: 0.2 }}
                              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#0F172A]/5 backdrop-blur-xs flex items-center justify-center text-[#0F172A]/60 transition-colors group-hover:bg-transparent"
                            >
                              <ArrowUpRight size={16} />
                            </motion.div>

                            {/* Expanded Explanation on Hover with Picture */}
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{
                                height: isHovered ? 'auto' : 0,
                                opacity: isHovered ? 1 : 0,
                                marginTop: isHovered ? 12 : 0,
                              }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden flex flex-col gap-2.5"
                            >
                              <p className="text-[12px] leading-relaxed text-white/95 font-medium bg-black/15 p-2.5 rounded-xl border border-white/10 backdrop-blur-xs">
                                {card.fullExplanation}
                              </p>
                              <div className="w-full h-24 rounded-xl overflow-hidden shadow-md relative border border-white/20">
                                <Image
                                  width={400}
                                  height={200}
                                  src={card.bgImage}
                                  alt={card.title}
                                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </TiltCard>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: 3D ROTATING INTERACTIVE VIDEO BANNER (In natural document flow) */}
      <motion.div
        style={isDesktop ? { scale: sec2Scale, rotate: sec2Rotate, transformOrigin: 'bottom center' } : {}}
        className="relative z-10 w-full max-w-full overflow-hidden flex items-center justify-center px-4 md:px-6 pt-16 pb-12 lg:py-20 transform-gpu will-change-transform"
      >
        <TiltCard isDesktop={isDesktop} className="w-full max-w-6xl mx-auto aspect-4/3 sm:aspect-video rounded-3xl sm:rounded-4xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-white/60">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            onMouseEnter={() => setIsHoveringVideo(true)}
            onMouseLeave={() => setIsHoveringVideo(false)}
            onClick={() => setShowModal(true)}
            className="w-full h-full lg:cursor-none transition-transform hover:scale-[1.01] duration-500 relative transform-gpu will-change-transform"
          >
            <div className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500">
              <iframe
                className="w-full h-full pointer-events-none scale-105"
                src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=1&loop=1&playlist=ishA6kry8nc&controls=0&modestbranding=1&rel=0"
                allow="autoplay; encrypted-media"
                title="ELOVIA Circular Economy Education"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-6 md:bottom-24 left-6 md:left-12 right-6 md:right-12 z-20 text-white pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center gap-3 mb-4 md:mb-5"
              >
                <div className="h-1.5 w-10 md:w-14 bg-[#10B981] rounded-full" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-white/80">
                  Click to Play with Sound
                </span>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] font-fraunces"
              >
                Sirkularitas Nyata,<br />
                <span className="text-[#10B981]">Nilai Berkelanjutan.</span>
              </motion.h3>
            </div>

            {!isDesktop && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg pointer-events-none z-20">
                <Play fill="white" size={24} className="ml-1" />
              </div>
            )}
          </motion.div>
        </TiltCard>
      </motion.div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-[#0F172A]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#0F172A] hover:text-[#10B981] transition-colors z-210 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl cursor-pointer"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl sm:rounded-4xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.35)] border border-white/50"
            >
              <iframe
                className="w-full h-full bg-[#0F172A]"
                src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1&mute=0&controls=1&rel=0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="ELOVIA Circular Economy Education Video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ValueFactors;
