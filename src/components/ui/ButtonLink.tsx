import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./buttonClasses";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
};

/** Tautan internal dengan tampilan tombol. */
export function ButtonLink({ variant, size, full, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses(variant, size, full), className)} {...props} />;
}
