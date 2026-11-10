'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { ToastNotification } from './types';

interface MitraToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export function MitraToastContainer({ toasts, onDismiss }: MitraToastProps) {
  return (
    <aside
      aria-label="Notifikasi Sistem"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <MitraToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </aside>
  );
}

function MitraToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#238B57] shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    error: <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />,
  };

  const borders = {
    success: 'border-[#D3EBDB] bg-white/95 text-[#17251D]',
    warning: 'border-amber-200 bg-white/95 text-[#17251D]',
    error: 'border-rose-200 bg-white/95 text-[#17251D]',
    info: 'border-teal-200 bg-white/95 text-[#17251D]',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`pointer-events-auto relative p-4 rounded-2xl border shadow-[0_12px_36px_-6px_rgba(23,77,53,0.12),0_4px_12px_rgba(0,0,0,0.04)] backdrop-blur-md ${borders[toast.type]}`}
    >
      <div className="flex items-start gap-3">
        {icons[toast.type]}
        <div className="flex-1 pr-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold tracking-tight text-[#17251D]">
              {toast.title}
            </h4>
            <span className="text-[10px] font-mono text-[#84928A] shrink-0">
              {toast.timestamp}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#5D7065] leading-relaxed">
            {toast.description}
          </p>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="text-[#84928A] hover:text-[#17251D] p-1 rounded-md transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Subtle progress indicator */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4.5, ease: 'linear' }}
        className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl ${
          toast.type === 'success'
            ? 'bg-[#238B57]'
            : toast.type === 'warning'
            ? 'bg-amber-500'
            : toast.type === 'error'
            ? 'bg-rose-500'
            : 'bg-teal-500'
        }`}
      />
    </motion.div>
  );
}

