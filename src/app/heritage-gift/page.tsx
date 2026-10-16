import type { Metadata } from "next";
import { Suspense } from "react";
import { GiftBuilder } from "@/components/commerce/GiftBuilder";
import { PageHeader } from "@/components/ui/PageHeader";
import { giftCopy } from "@/data/gift";

export const metadata: Metadata = { title: "Heritage Gift" };

/** Halaman Heritage Gift: alur 3 langkah membuat voucher hadiah. */
export default function HeritageGiftPage() {
  return (
    <>
      <PageHeader title="Heritage Gift" intro={giftCopy.intro} />
      <div className="page-x pb-16 lg:pb-28">
        <div className="max-w-3xl">
          <Suspense fallback={<p className="text-muted">Memuat</p>}>
            <GiftBuilder />
          </Suspense>
        </div>
      </div>
    </>
  );
}
