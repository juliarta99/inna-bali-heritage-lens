"use client";

import { Box, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";

type ArViewerProps = {
  model: { src: string; name: string; alt: string; note: string };
};

/**
 * Tombol "Lihat di ruanganmu (AR)" yang membuka model 3D di <model-viewer>.
 * Di HP yang mendukung, tombol AR bawaan model-viewer menempatkan model di ruangan.
 */
export function ArViewer({ model }: ArViewerProps) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open || ready) return;
    import("@google/model-viewer").then(() => setReady(true));
  }, [open, ready]);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <Icon icon={Box} />
        Lihat di ruanganmu (AR)
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title={model.name} description={model.note} size="lg">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-ui bg-surface-2 sm:aspect-[4/3]">
            {ready ? (
              <model-viewer
                src={model.src}
                alt={model.alt}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                touch-action="pan-y"
                shadow-intensity="1"
                style={{ width: "100%", height: "100%" }}
              >
                <button
                  slot="ar-button"
                  type="button"
                  className="absolute right-3 bottom-3 flex min-h-11 items-center gap-2 rounded-ui bg-primary px-4 text-sm font-medium text-surface"
                >
                  <Icon icon={Box} />
                  Tempatkan di ruangan
                </button>
              </model-viewer>
            ) : (
              <div className="grid h-full place-items-center text-sm text-muted">
                <span className="flex items-center gap-2">
                  <Icon icon={Loader} className="animate-spin" />
                  Memuat model 3D
                </span>
              </div>
            )}
          </div>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted">
            <li>Geser untuk memutar, cubit untuk memperbesar.</li>
            <li>
              Di HP Android atau iPhone yang mendukung AR, tekan &quot;Tempatkan di ruangan&quot; lalu arahkan kamera ke
              lantai.
            </li>
            <li>Di laptop, model hanya bisa dilihat dalam 3D.</li>
          </ul>
        </div>
      </Dialog>
    </>
  );
}
