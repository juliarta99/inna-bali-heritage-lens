"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { Icon } from "@/components/ui/Icon";

/** Viewer 360° yang dimuat hanya di browser (next/dynamic, ssr: false). */
export const LensViewerLazy = dynamic(() => import("./LensViewer").then((m) => m.LensViewer), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-ink text-surface">
      <span className="flex items-center gap-2 text-sm">
        <Icon icon={Loader} className="animate-spin" />
        Memuat lensa
      </span>
    </div>
  ),
});
