import { cn } from "@/lib/cn";

/** Avatar bulat Gek Inna berupa inisial (lingkaran penuh hanya untuk lensa dan avatar ini). */
export function GekAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-primary font-display text-surface",
        size === "md" ? "size-10 text-base" : "size-8 text-sm",
      )}
    >
      GI
    </span>
  );
}
