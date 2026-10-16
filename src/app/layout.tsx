import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/commerce/CartProvider";
import { GekInnaWidget } from "@/components/gek-inna/GekInnaWidget";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Inna Bali Heritage Lens", template: "%s | Inna Bali Heritage Lens" },
  description:
    "Jelajahi Bali Hotel, hotel internasional pertama di Bali sejak 1928, lewat tur 3D/360°, paket heritage, Heritage Box, dan Heritage Gift.",
};

export const viewport: Viewport = {
  themeColor: "#5b2e5e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${bodoni.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ToastProvider>
          <CartProvider>
            <SiteHeader />
            <main id="konten" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <GekInnaWidget />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
