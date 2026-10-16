import type { Metadata } from "next";
import { BoxOrder } from "@/components/commerce/BoxOrder";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { PriceTag } from "@/components/ui/PriceTag";
import { heritageBox } from "@/data/box";

export const metadata: Metadata = { title: "Heritage Box" };

/** Halaman produk Heritage Box beserta isi box dan cerita UMKM pembuatnya. */
export default function HeritageBoxPage() {
  return (
    <>
      <PageHeader title={heritageBox.name} intro={heritageBox.description} />
      <div className="page-x pb-16 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-12">
            <Photo
              image={heritageBox.cover}
              ratio="aspect-square sm:aspect-[4/3]"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
            <section aria-labelledby="isi-box">
              <h2 id="isi-box" className="text-2xl">
                Isi box
              </h2>
              <ul className="mt-5 border-t border-line">
                {heritageBox.items.map((item) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[7rem_1fr] sm:gap-6"
                  >
                    <Photo image={item.image} ratio="aspect-square" sizes="112px" compact />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg">{item.name}</h3>
                      <p className="text-sm text-muted">Dibuat oleh {item.maker}</p>
                      <p className="text-sm">{item.story}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside aria-labelledby="pesan-box" className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6 rounded-ui border border-line p-5 sm:p-6">
              <div>
                <h2 id="pesan-box" className="sr-only">
                  Pesan Heritage Box
                </h2>
                <PriceTag amount={heritageBox.price} suffix="per box" size="lg" />
              </div>
              <BoxOrder />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
