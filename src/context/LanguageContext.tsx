"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

interface Translations {
  nav: {
    home: string;
    records: string;
    turntables: string;
    racks: string;
    extras: string;
    subscription: string;
    cart: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    title2: string;
    subtitle2: string;
  };
  editorial: {
    presents: string;
    subtitle: string;
    status: string;
  };
  footer: {
    society: string;
    manifesto: string;
    accountLogin: string;
    about: string;
    faq: string;
    blog: string;
    shippingPolicy: string;
    returnPolicy: string;
    privacyPolicy: string;
    terms: string;
    contact: string;
    companyInfo: string;
    wholesale: string;
    orderStatus: string;
    newsletterTitle: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    subscribeBtn: string;
    subscribedSuccess: string;
    copyright: string;
    motto: string;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: "INICIO",
      records: "DISCOS",
      turntables: "TOCADISCOS",
      racks: "RACKS",
      extras: "EXTRAS",
      subscription: "SUSCRIPCIÓN",
      cart: "CESTA",
    },
    catalog: {
      title: "Éxitos de la semana",
      subtitle: "Compra los discos más escuchados de la semana",
      title2: "Nuevos lanzamientos",
      subtitle2: "Descubre las últimas incorporaciones a nuestro archivo sonoro",
    },
    editorial: {
      presents: "180 Studios & Aguja y Vinilo presentan",
      subtitle: "Una exploración física de la acústica de datos en vinilo virgen pesado de 200g.",
      status: "EDICIÓN GATEFOLD LIMITADA • AUDIO VIRGEN 200G • DISPONIBLE AHORA",
    },
    footer: {
      society: "AGUJA & VINILO\nTIENDA FUNDADA EL 2026",
      manifesto:
        "Aguja & Vinilo crea y distribuye discos de vinilo, posters, tornamesas y medios físicos en colaboración con creadores de todo el mundo, como un recordatorio tangible de que el formato físico no ha muerto.",
      accountLogin: "INICIAR SESIÓN",
      about: "ACERCA DE",
      faq: "PREGUNTAS FRECUENTES",
      blog: "BLOG",
      shippingPolicy: "POLÍTICAS DE ENVÍO",
      returnPolicy: "POLÍTICAS DE DEVOLUCIÓN",
      privacyPolicy: "POLÍTICAS DE PRIVACIDAD",
      terms: "TÉRMINOS Y CONDICIONES",
      contact: "CONTACTO",
      companyInfo: "INFORMACIÓN DE LA EMPRESA",
      wholesale: "VENTAS AL POR MAYOR",
      orderStatus: "ESTADO DEL PEDIDO",
      newsletterTitle: "Boletín Informativo",
      firstName: "Nombre",
      lastName: "Apellido",
      emailAddress: "Correo Electrónico *",
      subscribeBtn: "SUSCRIBIRSE",
      subscribedSuccess: "GRACIAS POR SUSCRIBIRTE. BIENVENIDO A LA SOCIEDAD.",
      copyright: "© 2026 Aguja & Vinilo. Todos los derechos reservados.",
      motto: "El formato físico no ha muerto. Prensado en vinilo virgen de 180g.",
    },
  },
  en: {
    nav: {
      home: "HOME",
      records: "RECORDS",
      turntables: "TURNTABLES",
      racks: "RACKS",
      extras: "EXTRAS",
      subscription: "SUBSCRIPTION",
      cart: "CART",
    },
    catalog: {
      title: "Hits of the week",
      subtitle: "Shop this week's most listened to records",
      title2: "New releases",
      subtitle2: "Discover the latest additions to our physical sound archive",
    },
    editorial: {
      presents: "180 Studios & Aguja y Vinilo present",
      subtitle: "A physical exploration of data acoustics on heavy 200g virgin vinyl.",
      status: "LIMITED GATEFOLD LP • 200G VIRGIN AUDIO • OUT NOW",
    },
    footer: {
      society: "AGUJA & VINILO\nSTORE ESTABLISHED IN 2026",
      manifesto:
        "Aguja & Vinilo creates records, posters, turntables, and physical media in collaboration with artists and creators around the globe as a reminder that physical media is not dead.",
      accountLogin: "ACCOUNT LOGIN",
      about: "ABOUT",
      faq: "FAQ",
      blog: "BLOG",
      shippingPolicy: "SHIPPING POLICY",
      returnPolicy: "RETURN POLICY",
      privacyPolicy: "PRIVACY POLICY",
      terms: "TERMS OF SERVICE",
      contact: "CONTACT US",
      companyInfo: "COMPANY INFORMATION",
      wholesale: "WHOLESALE",
      orderStatus: "ORDER STATUS",
      newsletterTitle: "Newsletter",
      firstName: "First Name",
      lastName: "Last Name",
      emailAddress: "Email Address *",
      subscribeBtn: "SUBSCRIBE",
      subscribedSuccess: "THANK YOU FOR SUBSCRIBING. WELCOME TO THE SOCIETY.",
      copyright: "© 2026 Aguja & Vinilo. All rights reserved.",
      motto: "Physical media is not dead. Pressed on 180g virgin vinyl.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: translations.es,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("av-lang") as Language;
      if (saved === "es" || saved === "en") {
        setLanguageState(saved);
      }
    } catch (e) {
      // localStorage fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("av-lang", lang);
    } catch (e) {}
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
