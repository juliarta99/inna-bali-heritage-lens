type QuickRepliesProps = {
  options: string[];
  onPick: (text: string) => void;
  disabled?: boolean;
};

/** Deretan pertanyaan cepat yang bisa digulir horizontal. */
export function QuickReplies({ options, onPick, disabled }: QuickRepliesProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Pertanyaan cepat">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          disabled={disabled}
          onClick={() => onPick(option)}
          className="min-h-11 shrink-0 rounded-ui border border-line bg-surface px-3 text-sm whitespace-nowrap text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
