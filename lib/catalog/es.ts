import type { Catalog } from "@/lib/catalog/types";

/** Spanish UX — professional tone for Paterson / Passaic audience. */
export const esCatalog: Catalog = {
  locale: "es",
  htmlLang: "es-US",
  brand: {
    wordmarkPrimary: "SANCHEZ AUTO",
    wordmarkSecondary: "Services LLC · Paterson, NJ",
  },
  nav: {
    services: "Servicios",
    whyUs: "Por qué nosotros",
    reviews: "Reseñas",
    hours: "Horarios y ubicación",
    quote: "Cotización",
    faq: "Preguntas",
    pagesServices: "Servicios",
    privacy: "Privacidad",
    terms: "Términos",
    homeAria: "Sanchez Auto Services LLC — inicio",
  },
  language: {
    enShort: "EN",
    esShort: "ES",
    label: "Idioma",
  },
  hero: {
    kickerLine: "MECÁNICA & Hojalatería‑PINTURA — PATERSON, NJ",
    headlineLead: "Trabajo honesto.",
    headlineAccentLine1: "Resultados de calidad.",
    headlineTail: "Siempre.",
    subheadline:
      "Desde golpes y pintura hasta motor, diagnósticos y mantenimiento diario—somos el taller cercano donde explicamos costos claros antes de ordenar piezas.",
    callPrimary: "Llamar",
    viewServices: "Ver servicios",
    starsLabel: "4.8 en Google",
  },
  trustStrip: {
    title: "Por qué la gente regresa aquí primero",
    bullets: [
      "Estimados por escrito con lenguaje sencillo antes de trabajo mayor.",
      "Piezas homologadas contra el trabajo a realizar; pregunte por garantía cuando aplique.",
      "Hojalatería‑pintura y mecánica en una sola dirección — 101 E Railway Ave.",
    ],
  },
  process: {
    title: "Proceso sencillo",
    lead: "Menos papel sorpresa, más claridad mientras tu carro vuelva a estar seguro.",
    steps: [
      {
        title: "Recepción",
        body: "Escuchamos, documentamos golpes cuando aplica y alineamos expectativas (tiempos, seguro, OEM vs aftermarket).",
      },
      {
        title: "Diagnóstico y cotización",
        body: "Inspeccionamos, generamos cotización antes de iniciar trabajo no urgente.",
      },
      {
        title: "Reparación / pintura",
        body: "Coordinamos chapa‑pintura y mecánica para menos días ociosos en el taller.",
      },
      {
        title: "Control y entrega",
        body: "Validamos nivelación, funcionamiento final y revisamos puntos antes de cerrar cuenta.",
      },
    ],
  },
  whyUs: {
    title: "Hechos para vecinos — no métricas de call center",
    lead: "Aquí tratamos autos como proyecto compartido, no ticket anónimo. Especialmente en trámites de seguros.",
    cards: [
      {
        title: "Trato directo",
        description: "Sin aditamentos raros: solo lo necesario cuando lo necesitas.",
      },
      {
        title: "Amplia marca mix",
        description: "Nacional/importado—we diagnosticamos rutas rápidamente.",
      },
      {
        title: "Selección inteligente de piezas",
        description: "OEM/OE después de mercado con equilibrio costo/confiabilidad.",
      },
      {
        title: "Chapa y mezcla mecánica",
        description: "Un contacto menos vs saltar talleres distintos.",
      },
      {
        title: "Plazos realistas",
        description: "Llamamos temprano si aparece trabajo suplementario no visible al inicio.",
      },
      {
        title: "Reseña social fuerte",
        description: "Puntuaciones vivas están en Google; aquí destacamos proceso y fotos cuando Maps lo permite.",
      },
    ],
  },
  services: {
    title: "Servicios",
    leadTemplate:
      "{name} fusiona golpes estructurales, retrabajo de pintura y mecánica integral—from preventivo hasta componentes grandes.",
  },
  serviceCopy: {
    collision: {
      title: "Chapa y estructuras",
      description:
        "Alineaciones, reemplazo paneles externos, trabajo en paragolpes/unibody y protección anticorrosión.",
    },
    paint: {
      title: "Pintura y acabados",
      description:
        "Mezclas multi‑capas, fusión de paneles, re‑recubrimientos, corrección menor y barnices uniformes tras preparación controlada.",
    },
    engine: {
      title: "Motor reconstruye / rectifica",
      description:
        "Compresiones, juntas, culatas, distribución turbo/diesel y caminos antes de reposición total.",
    },
    mechanics: {
      title: "Mecánica general",
      description:
        "Correas, radiadores tuberías, enfriamiento, escape, líquidos rutinarios.",
    },
    brakes: {
      title: "Frenos",
      description:
        "Pastillas/zapatas, discos/tambores, calipers, pulsos ABS, sangrado líquidos.",
    },
    diagnostics: {
      title: "Diagnóstico & MIL",
      description:
        "Escaneos profundos, prueba componentes guiada, soporte codificaciones donde aplica.",
    },
    transmission: {
      title: "Transmisión",
      description:
        "Servicios líquidos, ajustes, modos manuales, coordinación reconstructiva externa cuando justifica tiempo.",
    },
    oil: {
      title: "Aceites & mantenimiento",
      description:
        "Sintético/convencional, cartuchos especiales inspecciones acumula kilometraje.",
    },
    suspension: {
      title: "Suspensión y dirección",
      description:
        "Amortiguadores homocinéticas, dirección axial, revisión paralelo colaborativo.",
    },
    electrical: {
      title: "Electricidad vehicular",
      description:
        "Carga/partida diagnosticada, masa mala fusibles módulos ruidos fantasmas.",
    },
    ac: {
      title: "Clima cabina",
      description:
        "Evac/recarga fugas compressor expansión núcleos calefactor.",
    },
    tires: {
      title: "Neumáticos & llantas",
      description:
        "Montaje/equilibrio TPMS consejo medida temporada.",
    },
  },
  testimonials: {
    title: "Voces cercanas",
    googleNote:
      "~4.8★ coincide con vistas públicas de Google—aún fluctúan con nuevos comentarios.",
    mapsGalleryNote:
      "Sección siguiente puede mostrar fotos reales desde Places API después de ejecutar sincronización.",
    samples: [
      {
        name: "Maria G.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Igualaron pintura después de raspón lateral—presupuesto alineado y fotos antes/después útiles.",
      },
      {
        name: "Carlos R.",
        location: "Clifton, NJ",
        stars: 5,
        quote:
          "Fallo motor intermitente: seguían checklists lógicos y mostraron repuestos reemplazados.",
      },
      {
        name: "Jasmine T.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Todo claro frenos+rótulas—priorizaron seguridad y no improvisaron tiempo prometido.",
      },
    ],
  },
  hours: {
    title: "Horario y ubicación",
    mapHeading: "Mapa",
    directionsLink: "Ver ruta en Google Maps",
    sundayNote: "Domingo varía fuentes públicas — llame antes para confirmación.",
  },
  scheduleRows: [
    ["Lunes a viernes", "9:00 a. m. – 6:00 p. m."],
    ["Sábado", "9:00 a. m. – 6:00 p. m."],
    ["Domingo", "Llame para confirmar — horario variable"],
  ],
  quote: {
    title: "Solicite cotización",
    lead: "Texto corto bastante—respondemos llamando rápido.",
    name: "Nombre",
    phone: "Teléfono",
    emailOptional: "Correo (opcional)",
    serviceNeeded: "Servicio solicitado",
    serviceOptions: [
      { value: "collision", label: "Choque / estructuras" },
      { value: "maintenance", label: "Mantenimiento mecánico" },
      { value: "diagnostics", label: "Diagnóstico / testigo motor" },
      { value: "paint", label: "Pintura / retoques" },
      { value: "other", label: "Otro / sin certeza" },
    ],
    vehicleOptional: "Vehículo (opcional)",
    message: "Cuéntenos el problema",
    submit: "Enviar",
    selectPlaceholder: "Seleccionar…",
    noEndpointLead:
      "Conecte un endpoint público tipo Formspree/Web3Forms para recibir estos envíos.",
    noEndpointFormspreeHint:
      "Defina NEXT_PUBLIC_FORM_ENDPOINT antes de lanzar público.",
    noEndpointPhoneCue: "¿Prefiere llamar?",
  },
  faq: {
    title: "FAQ rápidas",
    lead: "Ahorran una llamada común antes de llegar.",

    items: [
      {
        question: "¿Tramitan seguros de colisión?",
        answer:
          "Sí — traiga claim/adjuntos; coordinamos extensiones llamando antes de ejecutar trabajo no acordado.",
      },
      {
        question: "¿Pueden mezcla OEM aftermarket?",
        answer:
          "Explicamos balance costo/desempeño y queda reflejado en estimados.",
      },
      {
        question: "¿Remolques o rent?",
        answer:
          "Lista de socios cercanos cuando solicita soporte día mismo.",
      },
      {
        question: "¿Español en recepción?",
        answer:
          "Use interruptor idioma aquí — personal bilingüe varía por turnos; llamar ayuda garantizar disponibilidad.",
      },
      {
        question: "¿Formas de pago?",
        answer:
          "Tarjetas comunes efectivo cheque certificado — casos empresa consultar escritorio.",
      },
      {
        question: "¿Garantías?",
        answer:
          "Piezas llevan garantía proveedor — horas siguen tabla interna revisable en papel.",
      },
    ],
  },
  footer: {
    connected: "Conectar",
    facebook: "Facebook",
    directions: "Mapa direcciones",
    legalNote: "© {year} {name}. Atendemos Paterson y alrededores NJ.",
  },
  servicesPage: {
    title: "Catálogo completo",
    intro:
      "Mismos técnicos detrás de golpes grandes y filtros rutinarios—revise antes de llamar.",
    backHome: "Volver al inicio",
  },
  privacy: {
    title: "Privacidad",
    updated: "Actualizado mayo 2026",
    sections: [
      {
        heading: "Resumen",
        paragraphs: [
          "Usamos información solo cuando usted solicita comunicación.",
          "Fotos de Google Maps llevan políticas adicional de sus autores cuando API las expone.",
        ],
      },
      {
        heading: "Formularios",
        paragraphs: ["El procesador definido decide retenciones—consulte política aliada también."],
      },
      {
        heading: "Analítica",
        paragraphs: ["No hay rastreadores externos activados por este commit base."],
      },
      {
        heading: "Derechos locales",
        paragraphs: ["Puede preguntar qué registros mantenemos via teléfonos públicos."],
      },
    ],
  },
  terms: {
    title: "Términos de uso",
    updated: "Actualizado mayo 2026",
    sections: [
      {
        heading: "Estimados",
        paragraphs: ["Suplementación por daños ocultos o piezas tardías puede ajustar factura—we avisamos."],
      },
      {
        heading: "Pago / retención",
        paragraphs: ["Vehículo permanece garantía trabajo hasta cobro aplicable conforme estado NJ."],
      },
      {
        heading: "Límite texto web",
        paragraphs: ["Contenido solo orientativo; detalle legal final en papel firmado taller."],
      },
    ],
  },
  mapsSync: {
    title: "Medios desde Google Places",
    body:
      "Use API oficial—not scraping HTML. Una clave con billing descarga JPG + texto acortado reproducible aquí tras `npm run build`.",
    steps:
      '# 1) Habilitar "Places API (New)" + facturación\n# 2) En carpeta proyecto:\nGOOGLE_PLACES_API_KEY=TU_LLAVE npm run gallery:pull\n# Opcional fijar sitio:\n# GOOGLE_PLACE_ID="ChIJxxxxxxxx" npm run gallery:pull\nnpm run build',
    attribution: "Las atribuciones de fotografía deben mostrarse según campo authorAttributions.",
  },
};
