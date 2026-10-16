import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./fieldClasses";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

/** Area teks multi-baris. */
export function Textarea({ className, invalid, id, ...props }: TextareaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-desc` : undefined}
      className={cn(fieldClasses, "min-h-28 py-3", className)}
      {...props}
    />
  );
}
