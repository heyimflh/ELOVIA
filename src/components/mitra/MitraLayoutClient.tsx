'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MitraProvider, useMitra } from './MitraContext';
import { MitraSidebar } from './MitraSidebar';
import { OperationalStatusDialog } from './OperationalStatusDialog';
import { MitraToastContainer } from './MitraToast';
import { WeighInDrawer } from './WeighInDrawer';

function MitraLayoutInner({ children }: { children: React.ReactNode }) {
  const {
    profile,
    status,
    notifications,
    toasts,
    isDialogOpen,
    pendingStatus,
    isSubmitting,
    requestToggleStatus,
    confirmStatusChange,
    cancelStatusChange,
    dismissToast,
    handleLogout,
    isWeighInOpen,
    weighInTicket,
    closeWeighIn,
  } = useMitra();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center bg-fixed font-jakarta select-none"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2560&auto=format&fit=crop')`,
      }}
    >
      {/* Ambient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-emerald-900/30 via-sky-300/20 to-teal-800/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Inset Canvas Container */}
      <div className="relative z-10 w-full h-full p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
        {/* Giant Glassmorphism Panel */}
        <div className="w-full h-full max-w-[1720px] bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-[0_25px_70px_rgba(15,31,23,0.18)] flex overflow-hidden relative">
          {/* Desktop Sidebar (Left, Fixed inside glass panel) */}
          <div className="hidden md:flex h-full shrink-0">
            <MitraSidebar
              profile={profile}
              status={status}
              onRequestToggleStatus={requestToggleStatus}
              onLogout={handleLogout}
              unreadCount={notifications.filter((n) => !n.read).length}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <div className="fixed inset-0 z-50 md:hidden flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="relative w-72 h-full bg-white/95 backdrop-blur-2xl shadow-2xl z-10 flex flex-col justify-between"
                >
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800"
                    aria-label="Tutup menu"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <MitraSidebar
                    profile={profile}
                    status={status}
                    onRequestToggleStatus={() => {
                      setMobileSidebarOpen(false);
                      requestToggleStatus();
                    }}
                    onLogout={handleLogout}
                    unreadCount={notifications.filter((n) => !n.read).length}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Main Content Area (Right side, scrollable) */}
          <main className="flex-1 overflow-y-auto flex flex-col gap-8 p-6 md:p-8 lg:p-10 custom-scrollbar min-h-0">
            {children}

            {/* Minimal Partner Footer inside Main Area */}
            <div className="pt-4 border-t border-slate-200/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 shrink-0 pb-4">
              <span>ELOVIA Partner Portal • Standar SNI 19-3964-1994 & ISO 14001</span>
              <span>Bank Sampah Berkah Mandiri (Bandung Raya)</span>
            </div>
          </main>
        </div>
      </div>

      {/* Operational Status Confirmation Dialog */}
      <OperationalStatusDialog
        isOpen={isDialogOpen}
        targetStatus={pendingStatus}
        storeName={profile.name}
        isSubmitting={isSubmitting}
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
      />

      {/* Weigh-In Interface Drawer (Right Slide-Over Sheet) */}
      <WeighInDrawer
        isOpen={isWeighInOpen}
        onClose={closeWeighIn}
        ticket={weighInTicket}
      />

      {/* Toast Notification Container */}
      <MitraToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export function MitraLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <MitraProvider>
      <MitraLayoutInner>{children}</MitraLayoutInner>
    </MitraProvider>
  );
}

