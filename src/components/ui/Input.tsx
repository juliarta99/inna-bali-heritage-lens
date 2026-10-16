import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./fieldClasses";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

/** Input teks atau tanggal dengan gaya token. Set `invalid` untuk menandai error. */
export function Input({ className, invalid, id, ...props }: InputProps) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-desc` : undefined}
      className={cn(fieldClasses, className)}
      {...props}
    />
  );
}
