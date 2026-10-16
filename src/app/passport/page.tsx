import type { Metadata } from "next";
import { PassportBook } from "@/components/passport/PassportBook";
import { PageHeader } from "@/components/ui/PageHeader";
import { passportCopy } from "@/data/site";

export const metadata: Metadata = { title: "Passport" };

/** Halaman passport digital. */
export default function PassportPage() {
  return (
    <>
      <PageHeader title="Passport" intro={passportCopy.intro} />
      <div className="page-x pb-16 lg:pb-28">
        <PassportBook />
      </div>
    </>
  );
}
