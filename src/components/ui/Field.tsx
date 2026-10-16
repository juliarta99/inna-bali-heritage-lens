import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

/**
 * Pembungkus label, petunjuk, dan pesan error untuk satu kontrol form.
 * Input/Select/Textarea otomatis merujuk elemen keterangan `{id}-desc`.
 */
export function Field({ id, label, hint, error, optional, children }: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> (opsional)</span>}
      </label>
      {children}
      <div id={`${id}-desc`} aria-live="polite">
        {error ? (
          <p className="flex items-start gap-1.5 text-xs font-medium text-primary">
            <Icon icon={CircleAlert} size={16} className="mt-px shrink-0" />
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-muted">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
