'use client';

import { useEffect, useRef, useState } from 'react';
import { Navigation, Plus, Minus, Compass } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

export interface PickupLocationMapProps {
  initialLat?: number;
  initialLng?: number;
  onLocationChange?: (coords: { lat: number; lng: number }) => void;
  className?: string;
}

export default function PickupLocationMap({
  initialLat = -7.6698,
  initialLng = 109.6515,
  onLocationChange,
  className = '',
}: PickupLocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: initialLat,
    lng: initialLng,
  });
  const [isLocating, setIsLocating] = useState(false);
  const [, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;
    let isMounted = true;

    async function initMap() {
      try {
        const L = (await import('leaflet')).default;
        if (!isMounted || !mapContainerRef.current) return;

        // Initialize Leaflet map
        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 15,
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: true,
        });

        // Esri World Light Gray Canvas Tile Layer
        L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
            maxNativeZoom: 16,
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
          }
        ).addTo(map);

        // Official ELOVIA Leaf Emblem Custom Marker Icon
        const leafPinIcon = L.divIcon({
          html: `
            <div class="relative flex flex-col items-center group cursor-grab active:cursor-grabbing select-none">
              <!-- Animated halo / pulse for spatial feedback -->
              <div class="absolute -inset-1 rounded-2xl bg-green-500/30 blur-xs group-hover:bg-green-500/50 transition-colors"></div>
              <!-- Pin Emblem Container -->
              <div class="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 p-1 flex items-center justify-center text-white border-2 border-white/90 shadow-[0_10px_25px_rgba(23,122,71,0.5)] group-hover:scale-110 transition-transform duration-200">
                <img src="/logo/Minimalist Green Leaf Emblem.png" alt="ELOVIA Pin" class="w-7 h-7 object-contain drop-shadow" />
              </div>
              <!-- Pointer Tip Triangle -->
              <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-green-700 -mt-[1px]"></div>
              <!-- Floating Pill Indicator -->
              <div class="mt-1 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold text-green-300 shadow-md whitespace-nowrap pointer-events-none group-hover:scale-105 transition-transform font-jakarta">
                Titik Jemput
              </div>
            </div>
          `,
          className: 'elovia-pickup-pin',
          iconSize: [44, 62],
          iconAnchor: [22, 54],
        });

        // Create draggable marker
        const marker = L.marker([initialLat, initialLng], {
          icon: leafPinIcon,
          draggable: true,
          autoPan: true,
        }).addTo(map);

        markerRef.current = marker;

        // Sync coordinates when marker is dragged
        marker.on('dragend', (event: any) => {
          const latLng = event.target.getLatLng();
          const newCoords = { lat: latLng.lat, lng: latLng.lng };
          setCoords(newCoords);
          onLocationChange?.(newCoords);
        });

        // Also allow clicking anywhere on the map to place the marker
        map.on('click', (event: any) => {
          const latLng = event.latlng;
          marker.setLatLng(latLng);
          const newCoords = { lat: latLng.lat, lng: latLng.lng };
          setCoords(newCoords);
          onLocationChange?.(newCoords);
        });

        mapInstanceRef.current = map;
        setMapLoaded(true);

        // Invalidate size to handle Framer Motion animations & layout settling
        setTimeout(() => {
          if (isMounted && mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 300);
      } catch (err) {
        console.error('Failed to initialize Leaflet mini-map:', err);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [initialLat, initialLng, onLocationChange]);

  // Handle "Gunakan Lokasi Saat Ini"
  const handleGetCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Peramban Anda tidak mendukung fitur geolokasi GPS.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoords = { lat: latitude, lng: longitude };
        setCoords(newCoords);
        onLocationChange?.(newCoords);

        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        }
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 16, {
            duration: 1.2,
          });
        }
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation denied or failed, centering existing pin:', error);
        setIsLocating(false);
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([coords.lat, coords.lng], 16, {
            duration: 0.8,
          });
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div
      className={`w-full h-64 md:h-72 rounded-3xl overflow-hidden relative border border-white/20 shadow-inner mt-4 select-none ${className}`}
      suppressHydrationWarning
    >
      <style jsx global>{`
        .elovia-pickup-pin {
          background: transparent !important;
          border: none !important;
        }
        .elovia-mini-map-pane .leaflet-tile {
          filter: contrast(96%) brightness(96%) saturate(75%);
        }
      `}</style>

      {/* Actual Leaflet Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full elovia-mini-map-pane z-0"
      />

      {/* Top Left: Interactive Coordinates & Drag instruction badge */}
      <div className="absolute top-3.5 left-3.5 z-[1000] flex items-center gap-2 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 shadow-xs flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          <span className="text-[11px] font-mono font-semibold text-white">
            {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </span>
        </div>
        <div className="hidden sm:flex bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/15 text-[10px] font-semibold text-white items-center gap-1">
          <Compass className="w-3 h-3 text-green-400" />
          <span>Pin dapat digeser</span>
        </div>
      </div>

      {/* Top Right: Custom Subtle Zoom Controls */}
      <div className="absolute top-3.5 right-3.5 z-[1000] flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleZoomIn}
          aria-label="Perbesar Peta"
          className="w-8 h-8 rounded-xl bg-black/50 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          aria-label="Perkecil Peta"
          className="w-8 h-8 rounded-xl bg-black/50 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-black/70 flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Center Floating Glass Overlay Button: "Gunakan Lokasi Saat Ini" */}
      <button
        type="button"
        onClick={handleGetCurrentLocation}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/60 hover:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer border border-white/30 group"
      >
        <Navigation
          className={`w-4 h-4 text-green-400 transition-transform ${
            isLocating ? 'animate-spin' : 'group-hover:rotate-45'
          }`}
        />
        <span>{isLocating ? 'Mendeteksi GPS...' : 'Gunakan Lokasi Saat Ini'}</span>
      </button>
    </div>
  );
}
