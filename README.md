# Aguja y Vinilo — Tienda Web de Vinilos & Audio Analógico

> **Estándar Creativo**: Experiencia digital de nivel editorial / Awwwards para amantes de la música física, el coleccionismo y la artesanía analógica.  
> **Modelo**: Tienda 100% online con cobertura y despachos protegidos a toda Bolivia.  
> **Moneda Oficial**: Bolivianos (Bs).  
> **Contacto Oficial**: WhatsApp `+591 68610314` | Correo `jivo3534@gmail.com`.

---

## 1. Cómo Instalar y Ejecutar

### Requisitos Previos
- **Node.js**: v18.18+ o superior (recomendado v20+ o v24+).
- **npm**: v9+ o superior.

### Instalación de Dependencias
```bash
npm install
```

### Modo de Desarrollo
Inicia el servidor local en [http://localhost:3000](http://localhost:3000):
```bash
npm run dev
```

### Compilación para Producción (Build)
Ejecuta la verificación estricta de tipos de TypeScript y optimización de rutas:
```bash
npm run build
```

### Verificación de Calidad de Código (ESLint)
```bash
npm run lint
```

---

## 2. Estructura del Proyecto

El proyecto está organizado con arquitectura modular orientada a funcionalidades (`features`), separación estricta entre la UI y la capa de datos abstraída:

```text
AGUJAYVINILO/
├── public/                     # Favicons y activos estáticos
├── src/
│   ├── app/                    # Next.js App Router (Rutas y Páginas)
│   │   ├── bibliotecas/        # Bibliotecas Curadas (lógica de playlists físicas)
│   │   │   ├── page.tsx        # Listado de todas las bibliotecas
│   │   │   └── [slug]/page.tsx # Detalle de biblioteca con compra de caja completa (-10%)
│   │   ├── catalogo/           # Catálogo General
│   │   │   ├── page.tsx        # Batea con filtros por género, época, mood, formato y precio
│   │   │   └── [slug]/page.tsx # Ficha técnica de disco, tracklist interactivo y audio
│   │   ├── checkout/           # Checkout simulado (QR Simple Bolivia, tarjeta, transferencia)
│   │   ├── contacto/           # Consultas online y asesoría sonora por WhatsApp
│   │   ├── fundas/             # Fundas exteriores Mylar, interiores antiestáticas y kits de cuidado
│   │   ├── muebles/            # Muebles hechos a mano con vinilos reciclados y maderas nobles
│   │   ├── nosotros/           # Manifiesto del objeto físico y preservación sonora
│   │   ├── suscripcion/        # Onboarding de gustos + revelación teatral de 3 semanas
│   │   ├── tocadiscos/         # Showroom de tornamesas audiófilas calibradas
│   │   ├── globals.css         # Tokens de diseño, View Transitions de mancha de tinta y texturas
│   │   ├── layout.tsx          # Shell raíz con metadata SEO, fuentes y proveedores
│   │   └── page.tsx            # Portada editorial con Hero 3D interactivo
│   ├── components/             # Componentes de UI reutilizables
│   │   ├── layout/             # Navbar, Footer, AudioPlayerBar, CartDrawer, SmoothScroll
│   │   ├── theme/              # ThemeToggle con animación circular de mancha expansiva (Ink Ripple)
│   │   └── ui/                 # VinylDiscCover (carátula generativa + disco que asoma)
│   ├── data/                   # Capa de datos tipada y desacoplada
│   │   ├── mock-curated.ts     # Bibliotecas curadas temáticas
│   │   ├── mock-furniture.ts   # Muebles artesanales
│   │   ├── mock-hardware.ts    # Tocadiscos y especificaciones de laboratorio
│   │   ├── mock-records.ts     # 24 vinilos ficticios plausibles con tracklists y arte generativo
│   │   ├── mock-sleeves.ts     # Accesorios y fundas archivísticas
│   │   ├── types.ts            # Interfaces TypeScript estrictas
│   │   └── repositories/       # Servicios de datos abstraídos (Records, Products, Curated)
│   ├── features/               # Módulos especializados
│   │   └── hero3d/             # Three.js + R3F: Disco de vinilo 3D procedural y brazo de tocadiscos
│   ├── lib/                    # Utilidades y configuración
│   │   ├── audioEngine.ts      # Sintetizador Web Audio API: aguja, crujido de surco y acordes cálidos
│   │   └── fonts.ts            # Configuración tipográfica Fraunces + Plus Jakarta Sans
│   └── store/                  # Estado global con Zustand
│       ├── cartStore.ts        # Carrito, cálculo de totales en Bs y envío gratis (>400 Bs)
│       ├── playerStore.ts      # Reproductor analógico, control de aguja y crujido
│       └── subscriptionStore.ts# Cuestionario de onboarding y estado de desprecintado semanal
├── next.config.ts              # Configuración de Next.js
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración estricta de TypeScript
└── README.md                   # Esta documentación
```

---

## 3. Decisiones de Diseño y Dirección de Arte

### Identidad Editorial Táctil (Anti-Cliché)
Frente a los degradados violeta/azul genéricos, el neón y el glassmorphism predecible, **Aguja y Vinilo** toma inspiración de sellos discográficos de culto (Blue Note, ECM, Verve, Factory Records) y la imprenta analógica:

- **Tipografía con Carácter**:
  - Titulares & Display: **Fraunces** (Google Fonts con ejes variables ópticos, serifa cálida de corte editorial).
  - Cuerpo y Datos: **Plus Jakarta Sans** (grotesco geométrico de gran legibilidad, ideal para especificaciones técnicas y precios tabulares en Bs).
- **Paleta Cromática Analógica**:
  - **Negro Carbón (`#0E0E0C`)**: Tono de laca de vinilo profundo, sin frialdad digital.
  - **Papel Archivístico / Ecru (`#F7F4EC` / `#EDE6D8`)**: Calidez de celulosa envejecida y fundas gatefold mate.
  - **Latón Cepillado (`#C89D56`)**: Evoca contrapesos de brazos SME y controles de amplificadores Hi-Fi.
  - **Terracota (`#C05436`)**: Inspirado en sellos discográficos setenteros para puntos de atención cálidos.
  - **Musgo Botánico (`#5F6B50`)**: Para selecciones orgánicas y folk.
- **Transición de Tema (Efecto Mancha de Tinta Zoom)**:
  - Al pulsar el botón de cambio de modo (Sol / Luna), se dispara una animación de **gota de tinta expansiva** (`View Transitions API` con `clip-path` circular animado desde las coordenadas exactas del clic), tiñendo toda la interfaz como una mancha que hace zoom.

### Experiencia Sonora Web Audio API
- **Cero Enlaces Caídos a MP3**: Cuenta con un motor de audio procedural (`src/lib/audioEngine.ts`) que sintetiza mediante la **Web Audio API** el sonido mecánico del aterrizaje de la púa de diamante en el surco (*needle drop*), el crujido continuo de polvo/estática analógica y progresiones de acordes suaves en ondas triangulares filtradas a 1.8 kHz (emulando cinta cálida).

### Disco de Vinilo 3D Procedural en el Hero
- Desarrollado con **Three.js** y **React Three Fiber**.
- Texturas de surcos y sello central generadas proceduralmente en un lienzo HTML para máxima nitidez sin cargar imágenes pesadas.
- Reacciona de forma orgánica a las coordenadas del cursor del usuario (inclinación/tilt suave) y al botón de encendido del motor a 33 ⅓ RPM.
- Detección automática de `prefers-reduced-motion` para garantizar accesibilidad y rendimiento a 60 fps.

---

## 4. Créditos de Recursos, Fuentes e Iconografía

- **Tipografías**: [Fraunces](https://fonts.google.com/specimen/Fraunces) y [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) vía `next/font/google`.
- **Iconografía**: [Lucide React](https://lucide.dev/) (iconos vectoriales coherentes, sin emojis genéricos).
- **Animaciones y Efectos**:
  - [Lenis](https://lenis.darkroom.engineering/) para desplazamiento suave.
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) para la revelación teatral de la suscripción y confirmación de compra.
  - View Transitions API con interpolación circular radial para el cambio de tema.
- **Arte de Carátulas**: Diseños geométricos generativos SVG vectoriales (estilos constructivista, bauhaus, lente retro, minimal y ondas sonoras) con paletas personalizadas, garantizando total respeto a los derechos de autor.

---

## 5. Qué Falta para Conectar un Backend Real

La aplicación fue desarrollada con una **capa de datos desacoplada y tipada** (`/src/data/repositories/`). La UI nunca consume datos mock de forma acoplada, lo que permite sustituir los repositorios por servicios reales en pocas horas:

1. **Catálogo de Discos (API REST / Headless CMS / Discogs)**:
   - En `src/data/repositories/recordsRepository.ts`, sustituir las funciones estáticas (`getAll`, `getBySlug`, etc.) por llamadas `fetch(`${API_URL}/records?${queryParams}`)`.
2. **Autenticación y Perfil de Usuario**:
   - Integrar NextAuth.js, Supabase Auth o Clerk para persistir la colección personal del cliente y sus preferencias musicales del onboarding.
3. **Pasarela de Pagos**:
   - En `src/app/checkout/page.tsx`, conectar el flujo del botón "Confirmar y Pagar" a una pasarela boliviana activa (ej. PagosNet, Libélula, Multipago, o generación directa del payload QR Simple con API bancaria de Red Enlace / Banco BISA / BNB).
4. **Base de Datos y Manejo de Stock**:
   - Conectar PostgreSQL / Supabase con Prisma u ORM equivalente para actualizar el stock en tiempo real (`stock: number`) cada vez que se concreta un pedido.
5. **Gestión de Suscripciones Recurrentes**:
   - Conectar un worker o cron de backend (vía Stripe Billing, Paddle o débito bancario automático) para procesar el cobro recurrente mensual de 490 Bs y notificar las 3 semanas de entrega.
