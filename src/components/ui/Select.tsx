import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./fieldClasses";
import { Icon } from "./Icon";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

/** Select bawaan browser dengan ikon panah Lucide. */
export function Select({ className, invalid, id, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={id ? `${id}-desc` : undefined}
        className={cn(fieldClasses, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <Icon icon={ChevronDown} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted" />
    </div>
  );
}
