'use client';

import { motion } from 'framer-motion';

export function CircularLoopsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Base Fresh Green Tech Gradient: Pure White (#FFFFFF) to Soft Mint (#E8F4EC) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F8FCF9] to-[#E8F4EC]" />

      {/* Soft Ambient Radial Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(232,244,236,0.85)_0%,rgba(246,250,247,0.4)_50%,transparent_75%)] blur-2xl" />
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(211,235,219,0.35)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-1/4 -right-48 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(232,244,236,0.45)_0%,transparent_70%)] blur-3xl" />

      {/* Micro dot grid for Green Tech precision (3-4% opacity) */}
      <div className="absolute inset-0 bg-eco-grid opacity-35" />

      {/* Subtle Thin Circular Loop Motifs (SVG Vector Art) */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mintLoopGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#177A47" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#2FA866" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#A9D3B8" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient id="mintLoopGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E7C7B" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#177A47" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#E8F4EC" stopOpacity="0.02" />
          </linearGradient>

          <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#177A47" stopOpacity="0" />
            <stop offset="100%" stopColor="#177A47" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        {/* Central Circular Loop Orbital System (Symbolizing Resource Cycle) */}
        <g className="origin-center" transform="translate(720, 410)">
          {/* Subtle Outer Concentric Ring */}
          <circle
            r="440"
            stroke="url(#mintLoopGrad1)"
            strokeWidth="0.85"
            strokeDasharray="4 6"
            className="opacity-60"
          />

          {/* Primary Circular Orbital Ring */}
          <circle
            r="350"
            stroke="url(#mintLoopGrad2)"
            strokeWidth="1.2"
            strokeDasharray="8 8"
            className="opacity-70"
          />

          {/* Inner Closed Loop Ring */}
          <circle
            r="260"
            stroke="#177A47"
            strokeWidth="0.75"
            strokeOpacity="0.12"
          />

          {/* Thin Delicate Elliptical Orbit Loop 1 */}
          <ellipse
            rx="490"
            ry="290"
            stroke="url(#mintLoopGrad1)"
            strokeWidth="1"
            transform="rotate(-18)"
            className="opacity-55"
          />

          {/* Thin Delicate Elliptical Orbit Loop 2 */}
          <ellipse
            rx="510"
            ry="260"
            stroke="url(#mintLoopGrad2)"
            strokeWidth="0.85"
            transform="rotate(24)"
            className="opacity-45"
          />

          {/* Floating Subtle Value Nodes (Resource Transfer Nodes) */}
          <circle cx="340" cy="-80" r="3.5" fill="#177A47" fillOpacity="0.25" />
          <circle cx="-330" cy="110" r="3" fill="#2FA866" fillOpacity="0.2" />
          <circle cx="210" cy="220" r="2.5" fill="#0E7C7B" fillOpacity="0.2" />
          <circle cx="-240" cy="-190" r="2.5" fill="#177A47" fillOpacity="0.18" />
        </g>

        {/* Top-Right Secondary Ambient Loop Motif */}
        <g transform="translate(1320, 80)">
          <circle
            r="220"
            stroke="#2FA866"
            strokeWidth="0.8"
            strokeOpacity="0.14"
            strokeDasharray="6 6"
          />
          <circle
            r="160"
            stroke="#177A47"
            strokeWidth="0.75"
            strokeOpacity="0.1"
          />
        </g>

        {/* Bottom-Left Secondary Ambient Loop Motif */}
        <g transform="translate(100, 780)">
          <circle
            r="280"
            stroke="#177A47"
            strokeWidth="0.75"
            strokeOpacity="0.12"
            strokeDasharray="5 7"
          />
          <ellipse
            rx="320"
            ry="190"
            stroke="#A9D3B8"
            strokeWidth="0.9"
            strokeOpacity="0.25"
            transform="rotate(-28)"
          />
        </g>
      </svg>

      {/* Gentle Bottom Transition Fog */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#E8F4EC]/60 to-transparent" />
    </div>
  );
}

