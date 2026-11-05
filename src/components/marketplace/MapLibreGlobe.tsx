'use client';

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import type { PartnerItem } from './partnerData';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface MapLibreGlobeRef {
  resetCenter: () => void;
}

interface MapLibreGlobeProps {
  partners: PartnerItem[];
  hoveredPartnerId: string | null;
  onHoverPartner: (id: string | null) => void;
  selectedPartnerId?: string | null;
  onSelectPartner: (partner: PartnerItem) => void;
  className?: string;
  autoSpin?: boolean;
  onResetCenter?: () => void;
}

// Realistic High-Definition Satellite Globe Style with Atmosphere and 3D Solar Light
const SATELLITE_GLOBE_STYLE: any = {
  version: 8,
  projection: { type: 'globe' },
  sources: {
    'satellite-imagery': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxzoom: 19,
    },
    'eox-cloudless': {
      type: 'raster',
      tiles: [
        'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://s2maps.eu">Sentinel-2 cloudless</a> by <a href="https://eox.at">EOX IT Services GmbH</a>',
      maxzoom: 16,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#06130b',
      },
    },
    {
      id: 'satellite-layer',
      type: 'raster',
      source: 'satellite-imagery',
      paint: {
        'raster-fade-duration': 300,
      },
    },
  ],
  sky: {
    'sky-color': '#020604',
    'fog-color': '#06130b',
    'fog-ground-blend': 0.6,
    'horizon-fog-blend': 0.6,
    'sky-horizon-blend': 0.6,
    'atmosphere-blend': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0,
      1,
      5,
      1,
      7,
      0,
    ],
  },
  light: {
    anchor: 'map',
    position: [1.5, 90, 80],
  },
};

const INDONESIA_CENTER: [number, number] = [118.0, -2.5];
const DEFAULT_ZOOM = 3.3;

export default function MapLibreGlobe({
  partners,
  hoveredPartnerId,
  onHoverPartner,
  selectedPartnerId,
  onSelectPartner,
  className = '',
  autoSpin = true,
}: MapLibreGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, { marker: any; element: HTMLElement }>>(new Map());
  const userInteractingRef = useRef(false);
  const hoveredRef = useRef<string | null>(hoveredPartnerId);
  const animationFrameRef = useRef<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sync ref with hovered state
  useEffect(() => {
    hoveredRef.current = hoveredPartnerId;
  }, [hoveredPartnerId]);

  // 1. Initialize MapLibre GL 3D Realistic Satellite Globe
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let isMounted = true;

    async function initGlobe() {
      const maplibregl = await import('maplibre-gl');
      if (!isMounted || !containerRef.current) return;

      // Set worker URL to locally-served copy in /public
      maplibregl.setWorkerUrl('/maplibre-gl-worker.mjs');

      // Create MapLibre map centered on the Indonesian Archipelago
      const map = new maplibregl.Map({
        container: containerRef.current,
        style: SATELLITE_GLOBE_STYLE,
        center: INDONESIA_CENTER,
        zoom: DEFAULT_ZOOM,
        minZoom: 1.5,
        maxZoom: 16,
        pitch: 22,
        bearing: 0,
        maxPitch: 80,
        attributionControl: false,
      });

      // Gracefully switch to secondary EOX satellite source if Esri fails
      map.on('error', (e) => {
        const msg = e.error?.message || '';
        if (msg.includes('tile') || msg.includes('Failed to fetch')) {
          try {
            if (map.getLayer('satellite-layer') && !map.getLayer('eox-layer')) {
              map.setLayoutProperty('satellite-layer', 'visibility', 'none');
              map.addLayer({
                id: 'eox-layer',
                type: 'raster',
                source: 'eox-cloudless',
              });
            }
          } catch (_) {}
        }
      });

      map.on('load', () => {
        if (!isMounted) return;

        // Apply 3D Globe projection
        try {
          map.setProjection({ type: 'globe' });
        } catch (err) {
          console.warn('setProjection error:', err);
        }

        // Apply Atmosphere Sky Glow with soft mint/white blending
        if (typeof (map as any).setSky === 'function') {
          (map as any).setSky({
            'sky-color': '#e8f5ec',
            'fog-color': '#d8efe0',
            'fog-ground-blend': 0.8,
            'horizon-fog-blend': 0.8,
            'sky-horizon-blend': 0.8,
            'atmosphere-blend': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              5,
              1,
              7,
              0,
            ],
          });
        }

        if (typeof (map as any).setFog === 'function') {
          (map as any).setFog({
            color: '#07180e',
            'high-color': '#020704',
            'horizon-blend': 0.15,
            'space-color': '#000000',
            'star-intensity': 0.6,
          });
        }

        setMapLoaded(true);
      });

      // Interaction listeners to pause auto-spin during user engagement
      const handleStartInteraction = () => {
        userInteractingRef.current = true;
      };

      const handleEndInteraction = () => {
        setTimeout(() => {
          userInteractingRef.current = false;
        }, 3000);
      };

      map.on('mousedown', handleStartInteraction);
      map.on('touchstart', handleStartInteraction);
      map.on('dragstart', handleStartInteraction);
      map.on('mouseup', handleEndInteraction);
      map.on('touchend', handleEndInteraction);

      mapRef.current = map;

      // Start idle auto-rotation loop with smooth delta-time interpolation
      let lastTime = performance.now();
      function spin(now: number) {
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        if (
          mapRef.current &&
          autoSpin &&
          !userInteractingRef.current &&
          !hoveredRef.current
        ) {
          const zoom = mapRef.current.getZoom();
          if (zoom < 5.5) {
            const center = mapRef.current.getCenter();
            center.lng = (center.lng + 1.6 * delta) % 360;
            mapRef.current.setCenter(center);
          }
        }
        animationFrameRef.current = requestAnimationFrame(spin);
      }

      animationFrameRef.current = requestAnimationFrame(spin);
    }

    initGlobe();

    return () => {
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [autoSpin]);

  // 2. Render & Update Archipelago Glowing Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    let isMounted = true;

    async function syncMarkers() {
      const maplibregl = await import('maplibre-gl');
      if (!isMounted) return;

      const currentIds = new Set(partners.map((p) => p.id));

      // Remove obsolete markers
      markersRef.current.forEach(({ marker }, id) => {
        if (!currentIds.has(id)) {
          marker.remove();
          markersRef.current.delete(id);
        }
      });

      // Add or update markers with animated teal/mint aura
      partners.forEach((partner) => {
        const isActive = partner.id === hoveredPartnerId || partner.id === selectedPartnerId;

        if (markersRef.current.has(partner.id)) {
          const { element } = markersRef.current.get(partner.id)!;
          if (isActive) {
            element.classList.add('is-active');
          } else {
            element.classList.remove('is-active');
          }
        } else {
          // Create custom glowing beacon DOM element
          const el = document.createElement('div');
          el.className = `elovia-globe-marker-pin ${isActive ? 'is-active' : ''}`;
          el.innerHTML = `
            <div class="beacon-halo"></div>
            <div class="beacon-pulse"></div>
            <div class="beacon-core">
              <img src="/logo/Minimalist Green Leaf Emblem.png" alt="ELOVIA Pin" class="w-8 h-8 object-contain drop-shadow-md" />
            </div>
            <div class="beacon-label">
              <span class="label-name">${partner.name}</span>
              <span class="label-price">${partner.indicativePrice.split('/')[0]}</span>
            </div>
          `;

          el.addEventListener('mouseenter', () => {
            onHoverPartner(partner.id);
          });

          el.addEventListener('mouseleave', () => {
            onHoverPartner(null);
          });

          el.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelectPartner(partner);
          });

          const marker = new maplibregl.Marker({
            element: el,
            anchor: 'center',
          })
            .setLngLat([partner.coordinates.lng, partner.coordinates.lat])
            .addTo(map);

          markersRef.current.set(partner.id, { marker, element: el });
        }
      });

      // Smooth camera pan (easeTo) when a partner is hovered
      if (hoveredPartnerId) {
        const target = partners.find((p) => p.id === hoveredPartnerId);
        if (target) {
          map.easeTo({
            center: [target.coordinates.lng, target.coordinates.lat],
            zoom: 6.2,
            pitch: 35,
            duration: 1400,
          });
        }
      }
    }

    syncMarkers();

    return () => {
      isMounted = false;
    };
  }, [partners, hoveredPartnerId, selectedPartnerId, mapLoaded, onHoverPartner, onSelectPartner]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* Custom Styles for 3D Realistic Satellite Globe Markers & Glowing Aura */}
      <style jsx global>{`
        .elovia-globe-marker-pin {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .elovia-globe-marker-pin .beacon-halo {
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .elovia-globe-marker-pin .beacon-pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          background: rgba(34, 197, 94, 0.3);
          animation: eloviaPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          pointer-events: none;
        }

        .elovia-globe-marker-pin .beacon-core {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 2px solid #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), 0 0 10px rgba(34, 197, 94, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .elovia-globe-marker-pin .leaf-icon {
          width: 15px;
          height: 15px;
          color: #177a47;
          transition: transform 0.3s ease;
        }

        .elovia-globe-marker-pin .beacon-label {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%) scale(0.9);
          opacity: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(211, 235, 219, 0.9);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          white-space: nowrap;
          transition: all 0.25s ease;
          z-index: 10;
        }

        .elovia-globe-marker-pin .label-name {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #0f1f17;
        }

        .elovia-globe-marker-pin .label-price {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          color: #177a47;
          background: #e8f4ec;
          padding: 1px 5px;
          border-radius: 4px;
        }

        /* Hover & Active States: Animated Teal / Mint Aura */
        .elovia-globe-marker-pin:hover,
        .elovia-globe-marker-pin.is-active {
          transform: scale(1.4);
          z-index: 50 !important;
        }

        .elovia-globe-marker-pin:hover .beacon-halo,
        .elovia-globe-marker-pin.is-active .beacon-halo {
          inset: -14px;
          background: radial-gradient(circle, rgba(45, 212, 191, 0.6) 0%, rgba(16, 185, 129, 0.3) 50%, transparent 80%);
          animation: auraPulse 2s ease-in-out infinite alternate;
        }

        .elovia-globe-marker-pin:hover .beacon-pulse,
        .elovia-globe-marker-pin.is-active .beacon-pulse {
          border-color: #5eead4;
          background: rgba(45, 212, 191, 0.4);
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.9), 0 0 35px rgba(16, 185, 129, 0.6);
        }

        .elovia-globe-marker-pin:hover .beacon-core,
        .elovia-globe-marker-pin.is-active .beacon-core {
          background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
          border-color: #ffffff;
          box-shadow: 0 0 25px rgba(45, 212, 191, 0.9), 0 0 40px rgba(16, 185, 129, 0.6);
        }

        .elovia-globe-marker-pin:hover .leaf-icon,
        .elovia-globe-marker-pin.is-active .leaf-icon {
          color: #ffffff;
          transform: scale(1.15);
        }

        .elovia-globe-marker-pin:hover .beacon-label,
        .elovia-globe-marker-pin.is-active .beacon-label {
          opacity: 1;
          transform: translateX(-50%) scale(1);
          top: -34px;
        }

        @keyframes auraPulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes eloviaPing {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* MapLibre WebGL Canvas Container with Deep Outer Space Atmosphere */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          background: '#000000',
        }}
      />
    </div>
  );
}

