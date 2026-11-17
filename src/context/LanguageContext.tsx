"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

export interface Translations {
  nav: {
    home: string;
    records: string;
    turntables: string;
    racks: string;
    extras: string;
    subscription: string;
    cart: string;
    searchPlaceholder: string;
  };
  hero: {
    title: string;
    description: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    title2: string;
    subtitle2: string;
  };
  discos: {
    title: string;
    subtitle: string;
    section1Title: string;
    section1Subtitle: string;
    section2Title: string;
    section2Subtitle: string;
    searchResults: string;
    recordsFound: string;
    noResults: string;
    clearFilter: string;
  };
  tocadiscos: {
    title: string;
    subtitle: string;
    searchResults: string;
    itemsFound: string;
    noResults: string;
    clearFilter: string;
  };
  racks: {
    title: string;
    subtitle: string;
    searchResults: string;
    itemsFound: string;
    noResults: string;
    clearFilter: string;
  };
  extras: {
    title: string;
    subtitle: string;
    polerasTitle: string;
    cuadrosTitle: string;
    extrasPlusTitle: string;
    searchResults: string;
    itemsFound: string;
    noResults: string;
    clearFilter: string;
  };
  suscripcion: {
    badge: string;
    title: string;
    pricePerMonth: string;
    frequencyText: string;
    membershipTitle: string;
    planName: string;
    monthlyPrice: string;
    perMonthSuffix: string;
    formatLabel: string;
    formatValue: string;
    frequencyLabel: string;
    frequencyValue: string;
    shippingLabel: string;
    shippingValue: string;
    commitmentLabel: string;
    commitmentValue: string;
    badgeLabel: string;
    badgeValue: string;
    boxTitle: string;
    boxDesc: string;
    proceedBtn: string;
    configSubtitle: string;
    configTitle: string;
    configDesc: string;
    likesLabel: string;
    exclusionsLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    destinationLabel: string;
    nameLabel: string;
    cityLabel: string;
    addressLabel: string;
    phoneLabel: string;
    plusActiveBadge: string;
    since: string;
    hello: string;
    dashboardSubtitle: string;
    editPrefsBtn: string;
    cancelBtn: string;
    upcomingDeliveriesTitle: string;
    completedStatus: string;
    inProcessStatus: string;
    scheduledStatus: string;
    soundProfileTitle: string;
    priorityGenres: string;
    activeExclusions: string;
    noExclusions: string;
    curatorNotes: string;
    vipSupportTitle: string;
    vipSupportDesc: string;
    vipWhatsAppBtn: string;
    cancelModalTitle: string;
    cancelModalDesc: string;
    keepMembershipBtn: string;
    confirmCancelBtn: string;
    editModalTitle: string;
    cancelEditBtn: string;
    saveChangesBtn: string;
  };
  homeManifesto: {
    title: string;
    badge: string;
    p1: string;
    p2: string;
    btn: string;
  };
  homeShipping: {
    title: string;
    destsTitle: string;
    destsText: string;
    timeTitle: string;
    timeText: string;
    packTitle: string;
    packText: string;
    trackTitle: string;
    trackText: string;
  };
  homePayment: {
    title: string;
    storeTitle: string;
    storeText: string;
    methodsTitle: string;
    methodsText: string;
    qualityTitle: string;
    qualityText: string;
    whatsappTitle: string;
    whatsappText: string;
  };
  homeSocial: {
    title: string;
    line1: string;
    line2: string;
    line3: string;
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
  cart: {
    title: string;
    continueShopping: string;
    emptyTitle: string;
    emptyText: string;
    subtotal: string;
    shipping: string;
    shippingFree: string;
    packaging: string;
    packagingIncluded: string;
    total: string;
    payBtn: string;
    viewHistory: string;
    hideHistory: string;
    historyTitle: string;
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
      cart: "CARRITO",
      searchPlaceholder: "Buscar vinilos, tocadiscos, racks...",
    },
    hero: {
      title: "Aguja & Vinilo",
      description:
        "En este sitio puedes encontrar tu catálogo favorito de discos de vinilo, tornamesas y tocadiscos analógicos, muebles de diseño para tus equipos y objetos de colección musical.",
    },
    catalog: {
      title: "Éxitos de la semana",
      subtitle: "Compra los discos más escuchados de la semana",
      title2: "Nuevos lanzamientos",
      subtitle2: "Descubre las últimas incorporaciones a nuestro archivo sonoro",
    },
    discos: {
      title: "Discos de Vinilo",
      subtitle: "Catálogo Exclusivo • Prensados Originales en Vinilo Virgen 180g",
      section1Title: "Bleep Exclusives",
      section1Subtitle: "Prensados de colección y primeras tiradas",
      section2Title: "Limited Editions",
      section2Subtitle: "Ediciones de lujo, portadas alternativas y tiradas limitadas",
      searchResults: "Resultados de búsqueda en Discos",
      recordsFound: "discos encontrados",
      noResults: "No se encontraron vinilos que coincidan con tu búsqueda.",
      clearFilter: "Limpiar filtro",
    },
    tocadiscos: {
      title: "Tocadiscos & Equipos Analógicos",
      subtitle: "Catálogo Analógico • Ediciones Seleccionadas",
      searchResults: "Resultados en Tocadiscos",
      itemsFound: "equipos encontrados",
      noResults: "No se encontraron tocadiscos que coincidan con tu búsqueda.",
      clearFilter: "Limpiar filtro",
    },
    racks: {
      title: "Muebles & Racks de Vinilo",
      subtitle: "Mobiliario Acústico • Carpintería & Diseño de Autor",
      searchResults: "Resultados en Muebles & Racks",
      itemsFound: "muebles encontrados",
      noResults: "No se encontraron muebles que coincidan con tu búsqueda.",
      clearFilter: "Limpiar filtro",
    },
    extras: {
      title: "Extras & Curaduría",
      subtitle: "Poleras • Cuadros • Pines & Curaduría Musical",
      polerasTitle: "Poleras Gráficas",
      cuadrosTitle: "Cuadros de Vinilo Enmarcados",
      extrasPlusTitle: "Accesorios & Piezas de Colección",
      searchResults: "Resultados en Extras",
      itemsFound: "artículos encontrados",
      noResults: "No se encontraron extras que coincidan con tu búsqueda.",
      clearFilter: "Limpiar filtro",
    },
    suscripcion: {
      badge: "Club de Vinilos • Aguja & Vinilo",
      title: "Suscripción Miembro Plus",
      pricePerMonth: "Bs. 500 / mes",
      frequencyText: "3 vinilos al mes • 1 entrega cada semana",
      membershipTitle: "Membresía Mensual",
      planName: "Plan Miembro Plus",
      monthlyPrice: "Bs. 500",
      perMonthSuffix: "/ mensualidad",
      formatLabel: "Formato:",
      formatValue: "3 vinilos de 180g al mes",
      frequencyLabel: "Frecuencia:",
      frequencyValue: "1 entrega cada semana",
      shippingLabel: "Envíos:",
      shippingValue: "A toda Bolivia incluidos",
      commitmentLabel: "Permanencia:",
      commitmentValue: "Sin contratos. Pausa o cancela",
      badgeLabel: "Distintivo:",
      badgeValue: "Corona Dorada en tu perfil",
      boxTitle: "Caja Coleccionista Semanal",
      boxDesc: "Prensados originales sellados según tus gustos y dirección.",
      proceedBtn: "Proceder al Pago — Bs. 500",
      configSubtitle: "Configuración",
      configTitle: "Tus Preferencias & Destino de Envío",
      configDesc: "Personaliza qué géneros te gustan, cuáles excluir y dónde recibirás tus 3 paquetes del mes.",
      likesLabel: "1. Géneros que te gustan:",
      exclusionsLabel: "2. Géneros que NUNCA queremos enviarte (Exclusiones):",
      notesLabel: "3. Nota para el Curador (Opcional):",
      notesPlaceholder: "Ej: Álbumes de los 90s, portadas minimalistas, etc.",
      destinationLabel: "4. Destino de Envío (Los 9 departamentos de Bolivia):",
      nameLabel: "Nombre y Apellidos",
      cityLabel: "Ciudad de Destino",
      addressLabel: "Dirección o Retiro en Terminal",
      phoneLabel: "Teléfono / WhatsApp",
      plusActiveBadge: "Miembro Plus Activo",
      since: "Desde",
      hello: "Hola,",
      dashboardSubtitle: "Suscripción activa de 3 vinilos mensuales con envíos semanales.",
      editPrefsBtn: "Editar Preferencias & Envío",
      cancelBtn: "Cancelar Suscripción",
      upcomingDeliveriesTitle: "Próximos Despachos del Mes (1 cada semana)",
      completedStatus: "Completado",
      inProcessStatus: "En Proceso",
      scheduledStatus: "Programado",
      soundProfileTitle: "Tu Perfil Sonoro Actual",
      priorityGenres: "Géneros Prioritarios:",
      activeExclusions: "Exclusiones Activas:",
      noExclusions: "Ninguna exclusión",
      curatorNotes: "Notas para el curador:",
      vipSupportTitle: "Canal VIP Miembro Plus",
      vipSupportDesc: "¿Quieres cambiar la fecha de una entrega o pedir un título específico para esta semana?",
      vipWhatsAppBtn: "WhatsApp de Atención VIP",
      cancelModalTitle: "¿Cancelar Suscripción?",
      cancelModalDesc: "Si cancelas, los discos correspondientes a este mes que ya fueron programados se te entregarán con normalidad. No se te volverá a cobrar ningún monto el próximo ciclo.",
      keepMembershipBtn: "Mantener Membresía",
      confirmCancelBtn: "Sí, Cancelar",
      editModalTitle: "Actualizar Preferencias & Envío",
      cancelEditBtn: "Cancelar",
      saveChangesBtn: "Guardar Cambios",
    },
    homeManifesto: {
      title: "Aguja & Vinilo",
      badge: "Tienda Virtual de Formato Físico • Sucre, Bolivia",
      p1: "Aguja & Vinilo es una tienda online boliviana creada en 2026 para los amantes de la música que valoran la experiencia táctil, visual y sonora del formato físico. Seleccionamos cuidadosamente ediciones originales, reediciones en vinilo virgen pesado de 180g, tornamesas analógicas de alta fidelidad, mobiliario acústico y accesorios de colección.",
      p2: "Operamos de forma 100% virtual con base y despachos diarios a toda Bolivia. Empacamos cada artículo de manera profesional en cartón rígido multicapa para garantizar que tus discos y equipos lleguen en perfecto estado hasta tu puerta o terminal de encomiendas.",
      btn: "Explorar Catálogo de Discos",
    },
    homeShipping: {
      title: "Envíos & Cobertura Nacional",
      destsTitle: "Destinos a toda Bolivia:",
      destsText:
        "Realizamos despachos continuos a La Paz, Cochabamba, Santa Cruz, Sucre, Tarija, Oruro, Potosí, Beni y Pando.",
      timeTitle: "Tiempos de entrega:",
      timeText:
        "De 24 a 48 horas hábiles hasta tu domicilio o agencia de encomiendas de tu preferencia.",
      packTitle: "Embalaje reforzado:",
      packText:
        "Empaque en cajas de cartón corrugado rígido con protectores de esquinas para evitar abolladuras en las carátulas.",
      trackTitle: "Seguimiento garantizado:",
      trackText:
        "Te proporcionamos el código de orden y seguimiento para que consultes el estado de tu paquete en cualquier momento.",
    },
    homePayment: {
      title: "Compras, Pagos & Garantía",
      storeTitle: "100% Tienda Virtual:",
      storeText:
        "Agrega tus discos, tocadiscos o muebles favoritos directamente a tu carrito y finaliza tu pedido en pocos pasos.",
      methodsTitle: "Métodos de pago aceptados:",
      methodsText:
        "Transferencia bancaria, QR Simple inmediato y tarjetas de débito o crédito (Visa / Mastercard).",
      qualityTitle: "Autenticidad & Calidad:",
      qualityText:
        "Productos nuevos sellados de fábrica con prensados originales y garantía física de sonido sin defectos.",
      whatsappTitle: "Atención directa por WhatsApp:",
      whatsappText:
        "Si buscas un disco en particular o necesitas asesoría técnica, te atendemos de forma directa y personalizada.",
    },
    homeSocial: {
      title: "Redes & Conexión",
      line1: "Aguja & Vinilo — Tienda Virtual de Colección",
      line2: "Envíos seguros a los 9 departamentos de Bolivia",
      line3: "Est. 2026 • El formato físico no ha muerto",
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
    cart: {
      title: "Carrito de Compras",
      continueShopping: "Continuar comprando",
      emptyTitle: "Tu carrito está vacío",
      emptyText: "Explora vinilos, tocadiscos analógicos y muebles de autor.",
      subtotal: "Subtotal",
      shipping: "Envío a toda Bolivia",
      shippingFree: "Gratis",
      packaging: "Embalaje protector multicapa",
      packagingIncluded: "Incluido",
      total: "Total a Pagar",
      payBtn: "Pagar",
      viewHistory: "Ver historial de compras",
      hideHistory: "Ocultar historial de compras",
      historyTitle: "Historial de Compras & Códigos de Pedido",
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
      searchPlaceholder: "Search records, turntables, racks...",
    },
    hero: {
      title: "Aguja & Vinilo",
      description:
        "Discover your favorite catalog of vinyl records, analog turntables, designer audio furniture, and musical collectors' items.",
    },
    catalog: {
      title: "Hits of the week",
      subtitle: "Shop this week's most listened to records",
      title2: "New releases",
      subtitle2: "Discover the latest additions to our physical sound archive",
    },
    discos: {
      title: "Vinyl Records",
      subtitle: "Exclusive Catalog • Original Pressings on 180g Virgin Vinyl",
      section1Title: "Bleep Exclusives",
      section1Subtitle: "Collector pressings and first edition runs",
      section2Title: "Limited Editions",
      section2Subtitle: "Deluxe editions, alternate sleeves and limited runs",
      searchResults: "Search Results in Records",
      recordsFound: "records found",
      noResults: "No vinyl records matched your search.",
      clearFilter: "Clear filter",
    },
    tocadiscos: {
      title: "Turntables & Analog Audio",
      subtitle: "Analog Catalog • Curated Hi-Fi Hardware",
      searchResults: "Results in Turntables",
      itemsFound: "systems found",
      noResults: "No turntables matched your search.",
      clearFilter: "Clear filter",
    },
    racks: {
      title: "Vinyl Furniture & Racks",
      subtitle: "Acoustic Furniture • Designer Woodcraft & Audio Consoles",
      searchResults: "Results in Furniture & Racks",
      itemsFound: "pieces found",
      noResults: "No furniture matched your search.",
      clearFilter: "Clear filter",
    },
    extras: {
      title: "Extras & Curated Gear",
      subtitle: "Graphic Tees • Framed Art • Pins & Musical Merch",
      polerasTitle: "Graphic Tees",
      cuadrosTitle: "Framed Vinyl Artwork",
      extrasPlusTitle: "Collector Accessories & Pieces",
      searchResults: "Results in Extras",
      itemsFound: "items found",
      noResults: "No extras matched your search.",
      clearFilter: "Clear filter",
    },
    suscripcion: {
      badge: "Vinyl Club • Aguja & Vinilo",
      title: "Plus Member Subscription",
      pricePerMonth: "Bs. 500 / month",
      frequencyText: "3 vinyls per month • 1 shipment every week",
      membershipTitle: "Monthly Membership",
      planName: "Plus Member Plan",
      monthlyPrice: "Bs. 500",
      perMonthSuffix: "/ monthly",
      formatLabel: "Format:",
      formatValue: "3 × 180g vinyls per month",
      frequencyLabel: "Frequency:",
      frequencyValue: "1 delivery each week",
      shippingLabel: "Shipping:",
      shippingValue: "Included nationwide across Bolivia",
      commitmentLabel: "Commitment:",
      commitmentValue: "No contracts. Pause or cancel anytime",
      badgeLabel: "Badge:",
      badgeValue: "Golden Crown on your profile",
      boxTitle: "Weekly Collector's Box",
      boxDesc: "Original sealed pressings tailored to your musical tastes and address.",
      proceedBtn: "Proceed to Checkout — Bs. 500",
      configSubtitle: "Configuration",
      configTitle: "Your Preferences & Shipping Destination",
      configDesc: "Customize which genres you love, which to exclude, and where to receive your 3 packages each month.",
      likesLabel: "1. Genres you like:",
      exclusionsLabel: "2. Genres you NEVER want to receive (Exclusions):",
      notesLabel: "3. Note for the Curator (Optional):",
      notesPlaceholder: "E.g. 90s albums, minimal covers, etc.",
      destinationLabel: "4. Shipping Destination (All 9 departments of Bolivia):",
      nameLabel: "Full Name",
      cityLabel: "Destination City",
      addressLabel: "Street Address or Terminal Pickup",
      phoneLabel: "Phone / WhatsApp",
      plusActiveBadge: "Active Plus Member",
      since: "Since",
      hello: "Hello,",
      dashboardSubtitle: "Active subscription of 3 monthly vinyls with weekly deliveries.",
      editPrefsBtn: "Edit Preferences & Shipping",
      cancelBtn: "Cancel Subscription",
      upcomingDeliveriesTitle: "Upcoming Deliveries of the Month (1 each week)",
      completedStatus: "Delivered",
      inProcessStatus: "In Progress",
      scheduledStatus: "Scheduled",
      soundProfileTitle: "Your Current Sound Profile",
      priorityGenres: "Priority Genres:",
      activeExclusions: "Active Exclusions:",
      noExclusions: "No exclusions",
      curatorNotes: "Notes for curator:",
      vipSupportTitle: "VIP Plus Member Channel",
      vipSupportDesc: "Need to adjust a delivery date or request a specific title for this week?",
      vipWhatsAppBtn: "VIP WhatsApp Support",
      cancelModalTitle: "Cancel Subscription?",
      cancelModalDesc: "If you cancel, scheduled records for the current billing cycle will still be delivered normally. You will not be charged again on the next cycle.",
      keepMembershipBtn: "Keep Membership",
      confirmCancelBtn: "Yes, Cancel",
      editModalTitle: "Update Preferences & Shipping",
      cancelEditBtn: "Cancel",
      saveChangesBtn: "Save Changes",
    },
    homeManifesto: {
      title: "Aguja & Vinilo",
      badge: "Physical Format Online Store • Sucre, Bolivia",
      p1: "Aguja & Vinilo is an online record shop founded in 2026 for music lovers who cherish the tactile, visual, and acoustic experience of physical media. We curate original pressings, 180g heavy virgin vinyl reissues, audiophile turntables, acoustic furniture, and collector accessories.",
      p2: "We operate 100% online with daily nationwide shipping across Bolivia. Every package is packed in reinforced multilayer rigid cardboard to ensure your records and equipment arrive in pristine condition.",
      btn: "Explore Vinyl Catalog",
    },
    homeShipping: {
      title: "Shipping & Nationwide Coverage",
      destsTitle: "Deliveries across Bolivia:",
      destsText:
        "We ship continuously to La Paz, Cochabamba, Santa Cruz, Sucre, Tarija, Oruro, Potosí, Beni, and Pando.",
      timeTitle: "Delivery times:",
      timeText:
        "24 to 48 business hours to your doorstep or your preferred parcel agency.",
      packTitle: "Reinforced packaging:",
      packText:
        "Packed in heavy-duty corrugated cardboard boxes with corner guards to prevent any dings or creases on sleeves.",
      trackTitle: "Guaranteed tracking:",
      trackText:
        "We provide an order code and tracking status so you can follow your parcel at any time.",
    },
    homePayment: {
      title: "Orders, Payments & Warranty",
      storeTitle: "100% Online Store:",
      storeText:
        "Add your favorite records, turntables, or furniture directly to your cart and check out in a few easy steps.",
      methodsTitle: "Accepted payment methods:",
      methodsText:
        "Bank transfer, instant QR Simple, and debit/credit cards (Visa / Mastercard).",
      qualityTitle: "Authenticity & Quality:",
      qualityText:
        "Factory-sealed brand-new products with original pressings and flawless physical audio playback warranty.",
      whatsappTitle: "Direct WhatsApp support:",
      whatsappText:
        "Looking for a specific album or need turntable calibration advice? We assist you directly.",
    },
    homeSocial: {
      title: "Social & Connection",
      line1: "Aguja & Vinilo — Physical Collectors' Online Shop",
      line2: "Secure shipments to all 9 departments of Bolivia",
      line3: "Est. 2026 • Physical media is not dead",
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
    cart: {
      title: "Shopping Cart",
      continueShopping: "Continue shopping",
      emptyTitle: "Your cart is currently empty",
      emptyText: "Explore our catalog of vinyl records, analog turntables, and designer audio racks.",
      subtotal: "Subtotal",
      shipping: "Nationwide Shipping (Bolivia)",
      shippingFree: "Free",
      packaging: "Multilayer Rigid Packaging",
      packagingIncluded: "Included",
      total: "Total",
      payBtn: "Pay",
      viewHistory: "View purchase history",
      hideHistory: "Hide purchase history",
      historyTitle: "Purchase History & Order Tracking",
    },
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("av-lang") as Language;
      if (saved === "es" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("av-lang", lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
