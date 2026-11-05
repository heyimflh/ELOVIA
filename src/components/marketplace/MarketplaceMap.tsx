'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  Maximize2,
  Navigation,
  ShieldCheck,
  Star,
  CheckCircle2,
  X,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react';
import type { PartnerItem } from './partnerData';
import 'leaflet/dist/leaflet.css';

interface MarketplaceMapProps {
  partners: PartnerItem[];
  hoveredPartnerId: string | null;
  onHoverPartner: (id: string | null) => void;
  selectedPartnerId?: string | null;
  onSelectPartner: (partner: PartnerItem) => void;
  onViewDetail?: (partner: PartnerItem) => void;
  className?: string;
}

export default function MarketplaceMap({
  partners,
  hoveredPartnerId,
  onHoverPartner,
  selectedPartnerId,
  onSelectPartner,
  onViewDetail,
  className = '',
}: MarketplaceMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const leafletRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  // Determine which partner to preview in the bottom floating card
  const activePartner =
    partners.find((p) => p.id === hoveredPartnerId) ||
    partners.find((p) => p.id === selectedPartnerId) ||
    null;

  // Helper to create custom ELOVIA Leaf pin icon
  const createEloviaIcon = (L: any, partner: PartnerItem, isActive: boolean) => {
    const activeClasses = isActive
      ? 'scale-125 z-[999] shadow-[0_0_25px_rgba(34,197,94,0.8)] ring-4 ring-white animate-pulse'
      : 'hover:scale-110 shadow-[0_4px_14px_rgba(23,122,71,0.2)]';

    const pulseHalo = isActive
      ? `<span class="absolute -inset-2 rounded-full bg-green-400/40 animate-ping pointer-events-none"></span>`
      : '';

    const html = `
      <div class="relative flex flex-col items-center group/pin transition-all duration-300">
        ${pulseHalo}
        <div class="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white border-2 border-white transition-all duration-300 ${activeClasses}">
          <!-- Official ELOVIA Leaf Emblem Pin -->
          <img src="/logo/Minimalist Green Leaf Emblem.png" alt="ELOVIA Pin" class="w-8 h-8 object-contain drop-shadow-md" />
        </div>
        <!-- Pointer Tip -->
        <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-green-700 -mt-[1px]"></div>
        <!-- Mini Distance / Initial Pill -->
        <div class="mt-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-mint-200 text-[10px] font-bold font-mono text-green-800 shadow-xs whitespace-nowrap transition-transform duration-200 group-hover/pin:scale-105">
          ${partner.avatarText} · ${partner.distance.split(' ')[0]}km
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: `elovia-leaflet-pin-wrapper elovia-pin-${partner.id}`,
      iconSize: [44, 56],
      iconAnchor: [22, 52],
      popupAnchor: [0, -48],
    });
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    async function initLeaflet() {
      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      leafletRef.current = L;

      // Center around South Jakarta
      const map = L.map(mapContainerRef.current, {
        center: [-6.25, 106.84],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
      });

      // Esri World Light Gray Canvas Tile Layer (free, no API key required)
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          maxNativeZoom: 16,
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        }
      ).addTo(map);

      mapInstanceRef.current = map;
      setMapReady(true);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render and Sync Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = leafletRef.current;
    if (!map || !L || !mapReady) return;

    // Remove obsolete markers
    const currentPartnerIds = new Set(partners.map((p) => p.id));
    markersRef.current.forEach((marker, id) => {
      if (!currentPartnerIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    partners.forEach((partner) => {
      const isActive = partner.id === hoveredPartnerId;
      const icon = createEloviaIcon(L, partner, isActive);

      if (markersRef.current.has(partner.id)) {
        const marker = markersRef.current.get(partner.id);
        marker.setIcon(icon);
        marker.setZIndexOffset(isActive ? 1000 : 0);
      } else {
        const marker = L.marker([partner.coordinates.lat, partner.coordinates.lng], {
          icon,
          riseOnHover: true,
        }).addTo(map);

        // Hover events
        marker.on('mouseover', () => {
          onHoverPartner(partner.id);
        });

        marker.on('mouseout', () => {
          onHoverPartner(null);
        });

        // Click event
        marker.on('click', () => {
          onSelectPartner(partner);
        });

        markersRef.current.set(partner.id, marker);
      }
    });

    // Smooth pan when a partner is hovered
    if (hoveredPartnerId) {
      const activePartner = partners.find((p) => p.id === hoveredPartnerId);
      if (activePartner) {
        map.panTo([activePartner.coordinates.lat, activePartner.coordinates.lng], {
          animate: true,
          duration: 0.5,
        });
      }
    }
  }, [partners, hoveredPartnerId, mapReady, onHoverPartner, onSelectPartner]);

  // Handle map controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    const L = leafletRef.current;
    if (!map || !L || partners.length === 0) return;

    const bounds = L.latLngBounds(
      partners.map((p) => [p.coordinates.lat, p.coordinates.lng])
    );
    map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 0.6 });
  };

  return (
    <div className={`relative w-full h-full select-none rounded-3xl overflow-hidden ${className}`}>
      {/* Soft CSS Tile Filter Overlay for Dreamy Fresh Green Tech aesthetic */}
      <style jsx global>{`
        .elovia-map-tiles .leaflet-tile-container,
        .elovia-map-tiles .leaflet-tile-pane,
        .elovia-map-tiles .leaflet-tile {
          filter: contrast(95%) brightness(104%) saturate(60%) hue-rotate(10deg);
        }
        .elovia-leaflet-pin-wrapper {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      {/* Map DOM Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full elovia-map-tiles z-0 rounded-3xl overflow-hidden"
      />

      {/* ===================================================================
          1. TOP GLASS OVERLAY: Status Pill + Zoom & Fit Bounds Controls
          =================================================================== */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-2">
        {/* Status Pill */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(23,122,71,0.08)] text-xs font-semibold text-green-900 font-jakarta">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600" />
          </span>
          <span>{partners.length} Titik Mitra Aktif</span>
        </div>

        {/* Floating Zoom & Fit Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(23,122,71,0.08)] rounded-2xl p-1">
          <button
            type="button"
            onClick={handleZoomIn}
            title="Perbesar Peta"
            aria-label="Perbesar Peta"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-ink-700 hover:text-green-800 hover:bg-mint-100/60 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            title="Perkecil Peta"
            aria-label="Perkecil Peta"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-ink-700 hover:text-green-800 hover:bg-mint-100/60 transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-mint-200/80 my-auto" />
          <button
            type="button"
            onClick={handleFitBounds}
            title="Pusatkan Semua Mitra"
            aria-label="Pusatkan Semua Mitra"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-ink-700 hover:text-green-800 hover:bg-mint-100/60 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================
          2. BOTTOM FLOATING PREVIEW CARD: Interactive Feedback
          Shows currently hovered / clicked partner
          =================================================================== */}
      <AnimatePresence>
        {activePartner ? (
          <motion.div
            key={activePartner.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto bg-white/95 backdrop-blur-2xl rounded-2xl p-4 border border-white/90 shadow-[0_12px_36px_rgba(23,122,71,0.15)] font-jakarta"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-white/80 ring-2 ring-white">
                  <img
                    src={activePartner.headerImage || '/images/Marketplace/Aerial Recycling Plant.jpeg'}
                    alt={activePartner.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-bold text-sm text-ink-900 truncate">
                      {activePartner.name}
                    </h4>
                    {activePartner.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600 fill-mint-100 shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-ink-600 mt-0.5">
                    <span className="font-mono text-green-800 bg-mint-100/60 px-2 py-0.5 rounded-full font-medium text-[11px]">
                      {activePartner.distance}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-ink-900 font-semibold text-[11px]">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {activePartner.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="text-right shrink-0">
                <div className="font-mono text-xs font-bold text-green-800">
                  {activePartner.indicativePrice}
                </div>
                <div className="text-[10px] text-ink-500 font-jakarta">
                  {activePartner.priceTierBadge}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-mint-200/60">
              {onViewDetail && (
                <button
                  type="button"
                  onClick={() => onViewDetail(activePartner)}
                  className="flex-1 py-1.5 px-3 rounded-xl border border-mint-200 text-ink-800 hover:bg-mint-50 text-xs font-semibold transition-colors text-center cursor-pointer"
                >
                  Lihat Detail
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectPartner(activePartner)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pilih Mitra</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none text-center">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-xs text-ink-600 shadow-sm font-jakarta">
              💡 Arahkan kursor ke kartu mitra atau pin peta untuk sorotan langsung
            </span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

