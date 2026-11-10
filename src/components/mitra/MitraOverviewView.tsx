'use client';

import { useMitra } from './MitraContext';
import { MitraDashboardHeader } from './MitraDashboardHeader';
import { MitraHeroBannerCard } from './MitraHeroBannerCard';
import { MitraQuickMetricsRow } from './MitraQuickMetricsRow';
import { MitraIncomingOrdersList } from './MitraIncomingOrdersList';
import { MaterialCompositionChart } from './MaterialCompositionChart';

export function MitraOverviewView() {
  const {
    profile,
    notifications,
    markAllAsRead,
    markAsRead,
    clearAllNotifications,
    addToast,
  } = useMitra();

  return (
    <>
      {/* 1. Header (Greeting, Subtitle, Search bar & Notification Bell) */}
      <MitraDashboardHeader
        profile={profile}
        notifications={notifications}
        onMarkAllAsRead={markAllAsRead}
        onMarkAsRead={markAsRead}
        onClearAllNotifications={clearAllNotifications}
      />

      {/* 2. Hero Banner Card (Top, 40% Photo + 60% Key Stats) */}
      <MitraHeroBannerCard profile={profile} />

      {/* 3. Quick Metrics Row (4 Columns) */}
      <MitraQuickMetricsRow />

      {/* 4. Bottom Grid (Actionable Data: Antrean Permintaan Masuk + Komposisi Material) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0 w-full items-stretch">
        {/* Left (Span 2): Antrean Permintaan Masuk */}
        <div className="lg:col-span-2">
          <MitraIncomingOrdersList
            onActionToast={(title, desc, type) =>
              addToast({ title, description: desc, type: type || 'info' })
            }
          />
        </div>

        {/* Right (Span 1): Komposisi Material Chart */}
        <div className="lg:col-span-1">
          <MaterialCompositionChart />
        </div>
      </div>
    </>
  );
}

