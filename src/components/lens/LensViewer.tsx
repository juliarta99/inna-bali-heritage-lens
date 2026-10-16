"use client";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { Viewer } from "@photo-sphere-viewer/core";
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { StereoPlugin } from "@photo-sphere-viewer/stereo-plugin";
import { useEffect, useRef } from "react";
import { StereoEffect } from "three/examples/jsm/effects/StereoEffect.js";
import type { Hotspot } from "@/data/types";
import { cn } from "@/lib/cn";

/** Kendali viewer yang diberikan ke komponen induk lewat `onReady`. */
export type LensApi = {
  /** Mengaktifkan/mematikan mode VR. Mengembalikan status baru. */
  toggleStereo: () => Promise<boolean>;
  /** Mengaktifkan/mematikan gerak ikut HP. Mengembalikan status baru, atau `null` bila tidak didukung. */
  toggleGyro: () => Promise<boolean | null>;
  /** Hitung ulang ukuran setelah kontainer berubah ukuran. */
  resize: () => void;
  /** Arahkan kamera ke hotspot. */
  focusHotspot: (id: string) => void;
};

type LensViewerProps = {
  panorama: string;
  /** Label aksesibel untuk area viewer. */
  label: string;
  hotspots?: Hotspot[];
  seenIds?: string[];
  startYaw?: number;
  /** `hero` = lensa beranda tanpa hotspot dan tanpa zoom roda mouse. */
  variant?: "full" | "hero";
  onSelect?: (id: string) => void;
  onReady?: (api: LensApi) => void;
  /** Dipanggil saat mode VR atau gerak HP berubah (termasuk keluar dengan ketukan). */
  onModeChange?: (mode: { stereo: boolean; gyro: boolean }) => void;
  className?: string;
};

/** SVG ikon Lucide "Info" untuk marker (marker PSV menerima HTML string). */
const INFO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';

const deg = (n: number) => `${n}deg`;

/**
 * Viewer panorama 360° berbasis Photo Sphere Viewer.
 * Wajib dimuat lewat `LensViewerLazy` (next/dynamic, ssr: false).
 * Marker hotspot berwarna primary dengan ikon Info; hotspot yang sudah dibuka berganti gaya.
 */
export function LensViewer({
  panorama,
  label,
  hotspots = [],
  seenIds = [],
  startYaw = 0,
  variant = "full",
  onSelect,
  onReady,
  onModeChange,
  className,
}: LensViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const onSelectRef = useRef(onSelect);
  const onReadyRef = useRef(onReady);
  const onModeRef = useRef(onModeChange);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onReadyRef.current = onReady;
    onModeRef.current = onModeChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isHero = variant === "hero";

    function mount(container: HTMLDivElement): Viewer {
      const viewer = new Viewer({
        container,
        panorama,
        navbar: false,
        loadingTxt: "Memuat panorama",
        defaultYaw: deg(startYaw),
        defaultPitch: isHero ? deg(-4) : 0,
        defaultZoomLvl: isHero ? 10 : 30,
        mousewheel: !isHero,
        mousewheelCtrlKey: false,
        touchmoveTwoFingers: false,
        keyboard: isHero ? false : "fullscreen",
        lang: {
          loadError: "Panorama gagal dimuat",
          twoFingers: "Gunakan dua jari untuk menggeser",
          ctrlZoom: "Tahan Ctrl dan gulir untuk zoom",
          stereoNotification: "Ketuk di mana saja untuk keluar dari mode VR.",
          pleaseRotate: "Putar HP ke posisi mendatar",
          tapToContinue: "(atau ketuk untuk lanjut)",
        } as never,
        plugins: isHero
          ? []
          : [
              [
                MarkersPlugin,
                {
                  markers: hotspots.map((h) => ({
                    id: h.id,
                    position: { yaw: deg(h.yaw), pitch: deg(h.pitch) },
                    html: `<span class="lens-hotspot">${INFO_SVG}</span>`,
                    size: { width: 44, height: 44 },
                    anchor: "center center",
                    tooltip: { content: h.title, position: "top center" },
                    data: { id: h.id },
                  })),
                },
              ],
              [GyroscopePlugin, { touchmove: true }],
              StereoPlugin,
            ],
      });
      viewerRef.current = viewer;

      const markers = isHero ? null : viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
      const gyro = isHero ? null : viewer.getPlugin<GyroscopePlugin>(GyroscopePlugin);
      const stereo = isHero ? null : viewer.getPlugin<StereoPlugin>(StereoPlugin);

      markers?.addEventListener("select-marker", ({ marker }) => {
        onSelectRef.current?.(marker.id);
      });

      const reportMode = () =>
        onModeRef.current?.({
          stereo: Boolean(stereo?.isEnabled()) || fallbackStereo,
          gyro: Boolean(gyro?.isEnabled()),
        });
      stereo?.addEventListener("stereo-updated", reportMode);
      gyro?.addEventListener("gyroscope-updated", reportMode);

      // Mode VR cadangan untuk perangkat tanpa giroskop (desktop): layar terbelah tanpa gerak sensor.
      let fallbackStereo = false;

      const api: LensApi = {
        async toggleStereo() {
          if (!stereo || !gyro) return false;
          if (stereo.isEnabled()) {
            stereo.stop();
            return false;
          }
          if (fallbackStereo) {
            viewer.renderer.setCustomRenderer(null);
            markers?.showAllMarkers();
            fallbackStereo = false;
            return false;
          }
          const supported = await gyro.isSupported();
          if (supported) {
            try {
              await stereo.start();
              return true;
            } catch {
              // lanjut ke mode cadangan
            }
          }
          viewer.renderer.setCustomRenderer((renderer) => new StereoEffect(renderer) as never);
          markers?.hideAllMarkers();
          fallbackStereo = true;
          return true;
        },
        async toggleGyro() {
          if (!gyro) return null;
          const supported = await gyro.isSupported();
          if (!supported) return null;
          if (gyro.isEnabled()) {
            gyro.stop();
            return false;
          }
          try {
            await gyro.start();
            return true;
          } catch {
            return null;
          }
        },
        resize() {
          viewer.autoSize();
        },
        focusHotspot(id) {
          markers?.gotoMarker(id, 1200);
        },
      };

      viewer.addEventListener("ready", () => onReadyRef.current?.(api), { once: true });
      return viewer;
    }

    // Dibuat satu tick kemudian: di mode dev, React StrictMode memasang lalu langsung
    // membongkar efek. Tanpa jeda, viewer kedua ikut menunggu unduhan panorama milik
    // viewer pertama yang sudah dibatalkan, sehingga macet di "Memuat panorama".
    let viewer: Viewer | null = null;
    const timer = window.setTimeout(() => {
      viewer = mount(container);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      viewer?.destroy();
      viewerRef.current = null;
    };
    // Viewer dibuat ulang hanya bila panorama atau varian berubah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panorama, variant]);

  // Perbarui tampilan marker yang sudah dilihat.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || variant === "hero") return;
    const markers = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
    if (!markers) return;
    for (const id of seenIds) {
      try {
        markers.updateMarker({ id, className: "lens-hotspot-seen" });
      } catch {
        // marker belum siap
      }
    }
  }, [seenIds, variant]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label={label}
      className={cn("h-full w-full touch-none", className)}
    />
  );
}
