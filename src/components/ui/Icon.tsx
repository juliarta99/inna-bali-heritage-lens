import type { LucideIcon } from "lucide-react";

type IconProps = {
  icon: LucideIcon;
  /** 20 untuk UI, 24 untuk navigasi. */
  size?: 16 | 20 | 24 | 32 | 40;
  className?: string;
};

/** Ikon Lucide dengan ketebalan garis 1.5 dan tersembunyi dari pembaca layar. */
export function Icon({ icon: LucideComponent, size = 20, className }: IconProps) {
  return <LucideComponent size={size} strokeWidth={1.5} aria-hidden="true" className={className} />;
}
