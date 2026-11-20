import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { GlobalProductModal } from "@/components/ui/GlobalProductModal";
import { FloatingWhatsAppTab } from "@/components/ui/FloatingWhatsAppTab";
import { CartAddedToast } from "@/components/ui/CartAddedToast";

export const metadata: Metadata = {
  metadataBase: new URL("https://aguja-y-vinilo.vercel.app"),
  title: {
    default: "Aguja & Vinilo — Tienda & Club de Vinilos en Bolivia",
    template: "%s | Aguja & Vinilo",
  },
  description:
    "Tienda especializada de vinilos originales, tocadiscos de alta fidelidad, muebles racks y club de membresía mensual en Sucre y toda Bolivia.",
  keywords: [
    "vinilos Bolivia",
    "tienda de vinilos Sucre",
    "tocadiscos Bolivia",
    "muebles para vinilos",
    "LP Bolivia",
    "Aguja y Vinilo",
    "música analógica",
    "Miembro Plus vinilos",
  ],
  authors: [{ name: "Aguja & Vinilo" }],
  creator: "Aguja & Vinilo",
  publisher: "Aguja & Vinilo",
  alternates: {
    canonical: "https://aguja-y-vinilo.vercel.app",
  },
  openGraph: {
    title: "Aguja & Vinilo — Tienda & Club de Vinilos en Bolivia",
    description: "Tienda y suscripción mensual de vinilos curados, tocadiscos y racks en Bolivia.",
    url: "https://aguja-y-vinilo.vercel.app",
    siteName: "Aguja & Vinilo",
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aguja & Vinilo — Tienda & Club de Vinilos en Bolivia",
    description: "Tienda y suscripción mensual de vinilos curados, tocadiscos y racks en Bolivia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className="bg-white text-[#111111] antialiased">
      <head>
        {/* Google Analytics Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-AGUJAYVINILO"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-AGUJAYVINILO', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#111111] font-sans selection:bg-black selection:text-white">
        <LanguageProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1 w-full bg-white">{children}</main>
            <Footer />
            <GlobalProductModal />
            <FloatingWhatsAppTab />
            <CartAddedToast />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
