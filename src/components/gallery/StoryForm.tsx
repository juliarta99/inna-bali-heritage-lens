"use client";

import { CircleCheck, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { storyCopy } from "@/data/gallery";

type Errors = Partial<Record<"name" | "story", string>>;

/** Form dummy "Kirim cerita" untuk 100 Tahun, 100 Cerita (nama, foto, cerita). */
export function StoryForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<string>("");
  const [story, setStory] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Tulis nama Anda.";
    if (story.trim().length < 20) e.story = "Ceritakan minimal 20 karakter.";
    setErrors(e);
    if (e.name) return document.getElementById("story-name")?.focus();
    if (e.story) return document.getElementById("story-text")?.focus();
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-ui border border-primary bg-primary-soft p-6"
      >
        <Icon icon={CircleCheck} size={32} className="text-primary" />
        <p className="font-display text-2xl">{storyCopy.success}</p>
        <p className="text-sm text-muted">{storyCopy.successDetail}</p>
        <Button
          variant="secondary"
          onClick={() => {
            setSent(false);
            setName("");
            setStory("");
            setFile("");
          }}
        >
          Kirim cerita lain
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-ui border border-line p-5 sm:p-6"
      aria-labelledby="kirim-cerita"
    >
      <h3 id="kirim-cerita" className="text-xl">
        Kirim cerita
      </h3>
      <p className="text-sm text-muted">{storyCopy.intro}</p>
      <Field id="story-name" label="Nama" error={errors.name}>
        <Input
          id="story-name"
          autoComplete="name"
          value={name}
          invalid={!!errors.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      <Field id="story-photo" label="Foto" optional hint={file ? `Terpilih: ${file}` : "JPG atau PNG, maks. 5 MB."}>
        <input
          id="story-photo"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")}
          className="min-h-12 w-full rounded-ui border border-dashed border-line px-3 py-2.5 text-sm file:mr-3 file:min-h-9 file:rounded-[4px] file:border-0 file:bg-primary-soft file:px-3 file:text-sm file:font-medium file:text-primary"
        />
      </Field>
      <Field id="story-text" label="Cerita" error={errors.story}>
        <Textarea
          id="story-text"
          rows={5}
          value={story}
          invalid={!!errors.story}
          onChange={(e) => setStory(e.target.value)}
        />
      </Field>
      <div>
        <Button type="submit">
          <Icon icon={Send} />
          Kirim cerita
        </Button>
      </div>
    </form>
  );
}
