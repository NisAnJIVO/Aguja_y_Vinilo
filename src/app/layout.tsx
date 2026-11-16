import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Aguja & Vinilo — Tienda & Club de Vinilos",
  description:
    "Tienda y suscripción mensual de vinilos curados. Inspirado en Mutant, Bleep, The Vinyl Factory y Mondo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-white text-[#111111] antialiased">
      <body className="min-h-screen flex flex-col bg-white text-[#111111] font-sans selection:bg-black selection:text-white">
        <LanguageProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1 w-full bg-white">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
