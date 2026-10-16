import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type PageHeaderProps = {
  title: string;
  intro?: ReactNode;
  back?: { href: string; label: string };
  children?: ReactNode;
};

/** Judul halaman (H1) dengan pengantar singkat dan tautan kembali opsional. */
export function PageHeader({ title, intro, back, children }: PageHeaderProps) {
  return (
    <div className="page-x pt-8 pb-8 lg:pt-14 lg:pb-12">
      {back && (
        <Link
          href={back.href}
          className="-ml-2 mb-4 inline-flex min-h-11 items-center gap-1 rounded-ui px-2 text-sm text-muted hover:text-primary"
        >
          <Icon icon={ChevronLeft} />
          {back.label}
        </Link>
      )}
      <h1 className="text-h1m lg:text-4xl">{title}</h1>
      {intro && <div className="mt-4 max-w-[68ch] text-base text-muted lg:text-lg">{intro}</div>}
      {children}
    </div>
  );
}
