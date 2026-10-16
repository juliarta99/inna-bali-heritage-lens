import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./buttonClasses";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
};

/** Tombol dasar. Varian: primary (aksi utama), secondary, ghost, inverse (di atas latar gelap). */
export function Button({ variant, size, full, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClasses(variant, size, full), className)} {...props} />;
}
