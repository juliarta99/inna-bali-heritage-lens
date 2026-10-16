"use client";

import { CircleCheck, Glasses, Info, Maximize, Minimize, Smartphone } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import type { Location } from "@/data/types";
import { cn } from "@/lib/cn";
import { HotspotPanel } from "./HotspotPanel";
import type { LensApi } from "./LensViewer";
import { LensViewerLazy } from "./LensViewerLazy";
import { PackageTeaser } from "./PackageTeaser";
import { VrToggle } from "./VrToggle";

type LocationExplorerProps = {
  location: Location;
  packageName: string;
  /** Konten server (judul, ringkasan) yang ditaruh di antara viewer dan daftar hotspot. */
  children?: ReactNode;
};

const TEASER_AFTER_HOTSPOTS = 3;
const TEASER_AFTER_MS = 45_000;

/**
 * Pengalaman satu lokasi: viewer 360°, kendali VR/gyroscope/layar penuh,
 * panel cerita hotspot, daftar hotspot dalam bentuk teks, dan teaser paket.
 */
export function LocationExplorer({ location, packageName, children }: LocationExplorerProps) {
  const toast = useToast();
  const stageRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<LensApi | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [stereo, setStereo] = useState(false);
  const [gyro, setGyro] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  const hotspots = location.hotspots;
  const activeIndex = hotspots.findIndex((h) => h.id === activeId);

  const open = useCallback((id: string) => {
    setActiveId(id);
    setSeen((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setTimeUp(true), TEASER_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onChange = () => {
      const active = document.fullscreenElement === stageRef.current;
      setFullscreen(active);
      window.setTimeout(() => api?.resize(), 50);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [api]);

  useEffect(() => {
    if (!fullscreen || document.fullscreenElement) return;
    // Mode layar penuh cadangan (iPhone): kunci scroll halaman.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFullscreen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  useEffect(() => {
    const t = window.setTimeout(() => api?.resize(), 50);
    return () => window.clearTimeout(t);
  }, [fullscreen, api]);

  async function toggleFullscreen() {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (fullscreen) {
      setFullscreen(false);
      return;
    }
    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
        return;
      } catch {
        // lanjut ke mode cadangan
      }
    }
    setFullscreen(true);
  }

  async function toggleStereo() {
    if (!api) return;
    const on = await api.toggleStereo();
    setStereo(on);
    if (on) {
      setActiveId(null);
      toast({ message: "Mode VR aktif. Pasang HP di kacamata VR.", tone: "info" });
    }
  }

  async function toggleGyro() {
    if (!api) return;
    const result = await api.toggleGyro();
    if (result === null) {
      toast({ message: "Perangkat ini tidak punya sensor gerak. Coba buka di HP.", tone: "info" });
      return;
    }
    setGyro(result);
  }

  function selectFromList(id: string) {
    open(id);
    api?.focusHotspot(id);
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const showTeaser = !teaserDismissed && (seen.length >= TEASER_AFTER_HOTSPOTS || timeUp);

  return (
    <>
      <div className={cn(!fullscreen && "md:page-x md:pt-6")}>
        <div
          ref={stageRef}
          className={cn(
            "relative w-full overflow-hidden bg-ink",
            fullscreen ? "fixed inset-0 z-[70] h-dvh" : "h-[calc(100svh-4rem)] md:aspect-video md:h-auto md:rounded-ui",
          )}
        >
          <LensViewerLazy
            panorama={location.panorama}
            label={`Panorama 360° ${location.name}. Geser untuk melihat sekeliling. Daftar titik cerita tersedia di bawah viewer.`}
            hotspots={hotspots}
            seenIds={seen}
            startYaw={location.startYaw}
            onSelect={open}
            onReady={setApi}
            onModeChange={(m) => {
              setStereo(m.stereo);
              setGyro(m.gyro);
            }}
          />

          {!stereo && (
            <div className="pointer-events-none absolute top-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-ui bg-surface px-3 py-2 text-sm">
              <Icon icon={Info} className="shrink-0 text-primary" />
              <span className="truncate">
                {seen.length}/{hotspots.length} titik cerita dibuka
              </span>
            </div>
          )}

          <div
            className={cn(
              "absolute bottom-3 left-3 z-10 flex gap-1.5 rounded-ui bg-ink/80 p-1.5",
              activeId && "max-sm:hidden",
            )}
          >
            <VrToggle
              icon={Glasses}
              label={stereo ? "Keluar VR" : "Mode VR"}
              active={stereo}
              disabled={!api}
              onClick={toggleStereo}
            />
            {!stereo && (
              <>
                <VrToggle icon={Smartphone} label="Gerakkan HP" active={gyro} disabled={!api} onClick={toggleGyro} />
                <VrToggle
                  icon={fullscreen ? Minimize : Maximize}
                  label={fullscreen ? "Keluar layar penuh" : "Layar penuh"}
                  active={fullscreen}
                  onClick={toggleFullscreen}
                />
              </>
            )}
          </div>

          {activeIndex >= 0 && !stereo && (
            <HotspotPanel
              hotspot={hotspots[activeIndex]}
              index={activeIndex}
              total={hotspots.length}
              onClose={() => setActiveId(null)}
              onStep={(d) => {
                const next = hotspots[(activeIndex + d + hotspots.length) % hotspots.length];
                open(next.id);
                api?.focusHotspot(next.id);
              }}
            />
          )}
        </div>
      </div>

      {children}

      <section aria-labelledby="hotspot-list" className="page-x pb-10">
        <h2 id="hotspot-list" className="text-xl">
          Titik cerita di lokasi ini
        </h2>
        <p className="mt-1 text-sm text-muted">Ketuk titik ungu di panorama, atau pilih dari daftar ini.</p>
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {hotspots.map((h, i) => {
            const isSeen = seen.includes(h.id);
            return (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => selectFromList(h.id)}
                  className="flex w-full items-start gap-4 py-4 text-left transition-colors hover:bg-surface-2 sm:px-2"
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold",
                      isSeen ? "border-primary bg-primary text-surface" : "border-line text-muted",
                    )}
                  >
                    {isSeen ? <Icon icon={CircleCheck} size={16} /> : i + 1}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-medium">{h.title}</span>
                    <span className="text-sm text-muted">{h.story}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {showTeaser && (
        <PackageTeaser
          packageName={packageName}
          href={`/paket/${location.relatedPackage}`}
          onDismiss={() => setTeaserDismissed(true)}
        />
      )}
    </>
  );
}
