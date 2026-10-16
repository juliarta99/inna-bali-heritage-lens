import { ButtonLink } from "@/components/ui/ButtonLink";

/** Halaman 404. */
export default function NotFound() {
  return (
    <div className="page-x section-y flex flex-col items-start gap-4">
      <h1 className="text-h1m lg:text-4xl">Halaman tidak ditemukan</h1>
      <p className="max-w-[52ch] text-muted">Mungkin tautannya sudah berubah. Coba mulai dari beranda atau tur 360°.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Ke beranda</ButtonLink>
        <ButtonLink href="/jelajahi" variant="secondary">
          Jelajahi 3D/360°
        </ButtonLink>
      </div>
    </div>
  );
}
