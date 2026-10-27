import type { Metadata } from "next";
import { fontDisplay, fontSans } from "@/lib/fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AudioPlayerBar } from "@/components/layout/AudioPlayerBar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Aguja y Vinilo - Tienda Online de Vinilos, Tocadiscos & Muebles | Bolivia (Bs)",
  description:
    "Tienda 100% online especializada para coleccionistas y amantes de la música física en Bolivia. Vinilos de 180g, tocadiscos audiófilos calibrados a mano, fundas y suscripción mensual sorpresa. WhatsApp: 68610314 - jivo3534@gmail.com.",
  keywords: [
    "vinilos bolivia",
    "tienda de vinilos bolivia online",
    "tocadiscos bolivia",
    "musica fisica bolivia",
    "muebles para vinilos",
    "suscripcion vinilos sorpresa bolivia"
  ],
  authors: [{ name: "Aguja y Vinilo" }],
  openGraph: {
    title: "Aguja y Vinilo - Tienda Online de Vinilos en Bolivia",
    description: "Vinilos de colección, tocadiscos audiófilos y mobiliario artesanal con envíos asegurados a toda Bolivia. Contacto: 68610314.",
    locale: "es_BO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased light`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try { var s = localStorage.getItem('av-theme'); if (s === 'dark') { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light'); } else { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark'); } } catch (e) {}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] bg-grain">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <AudioPlayerBar />
          <CartDrawer />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
