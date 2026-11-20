import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aguja-y-vinilo.vercel.app";
  const routes = [
    "",
    "/discos",
    "/tocadiscos",
    "/racks",
    "/extras",
    "/suscripcion",
    "/carrito",
    "/nosotros",
    "/blog",
    "/contacto",
    "/faq",
    "/envios",
    "/devoluciones",
    "/privacidad",
    "/terminos",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
