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
    directions: "Cómo llegar",
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
      "Hojalatería‑pintura y mecánica en una sola dirección — 99 E Railway Ave.",
    ],
  },
  process: {
    title: "Del reclamo a las llaves — camino claro",
    lead: "Seguros bienvenidos. Documentamos el daño, explicamos el estimado y mantenemos al tanto a ti y al ajustador.",
    steps: [
      {
        title: "Envía datos del reclamo",
        body: "WhatsApp con fotos, número de reclamo si lo tienes, y año/marca/modelo. Empezamos el expediente antes de que dejes el auto.",
      },
      {
        title: "Inspección y estimado",
        body: "Inspección completa, estimado claro y soporte en suplementos si aparece daño oculto — sin sorpresas en el deducible.",
      },
      {
        title: "Reparación y pintura",
        body: "Colisión, pintura y mecánica bajo un techo para que el reclamo quede coordinado y el auto menos tiempo en espera.",
      },
      {
        title: "Control y entrega",
        body: "Revisamos ajuste, acabado y función contigo. Fotos disponibles si el seguro o tu agenda lo piden.",
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
      whenToService:
        "Tras un golpe: paneles desalineados, huecos en puertas, testigo de airbag o cuando la aseguradora pide presupuesto por escrito.",
    },
    paint: {
      title: "Pintura y acabados",
      description:
        "Mezclas multi‑capas, fusión de paneles, re‑recubrimientos, corrección menor y barnices uniformes tras preparación controlada.",
      whenToService:
        "Barniz levantado, rayones profundos, color apagado o zona reparada que ya no coincide—suelen pedir mezcla o repintado total.",
    },
    engine: {
      title: "Motor reconstruye / rectifica",
      description:
        "Compresiones, juntas, culatas, distribución turbo/diesel y caminos antes de reposición total.",
      whenToService:
        "Golpeteo, humo, recalentamiento, gran pérdida de potencia o consumo de aceite—común con mantenimiento atrasado o muchos km.",
    },
    mechanics: {
      title: "Mecánica general",
      description:
        "Correas, radiadores tuberías, enfriamiento, escape, líquidos rutinarios.",
      whenToService:
        "Pérdidas de refrigerante o aceite, olor a quemado, escape ruidoso, correas chillando o fallos vagos entre servicios programados.",
    },
    brakes: {
      title: "Frenos",
      description:
        "Pastillas/zapatas, discos/tambores, calipers, pulsos ABS, sangrado líquidos.",
      whenToService:
        "Pedal esponjoso, rechinar o rechinido, tironeo al frenar, pedal que vibra o testigo de frenos que no se apaga.",
    },
    diagnostics: {
      title: "Diagnóstico & MIL",
      description:
        "Escaneos profundos, prueba componentes guiada, soporte codificaciones donde aplica.",
      whenToService:
        "Testigo de motor u otros avisos, ralentí brusco, caladas, rechazo en inspección o códigos que reaparecen tras cambiar piezas.",
    },
    transmission: {
      title: "Transmisión",
      description:
        "Servicios líquidos, ajustes, modos manuales, coordinación reconstructiva externa cuando justifica tiempo.",
      whenToService:
        "Patinado entre marchas, cambios bruscos, retardo al engranar, líquido con olor a quemado o goteo rojizo bajo el centro del auto.",
    },
    oil: {
      title: "Aceites & mantenimiento",
      description:
        "Sintético/convencional, cartuchos especiales inspecciones acumula kilometraje.",
      whenToService:
        "Aceite vencido por fecha o km, dipstick muy oscuro y denso, ruido de válvulas al arranque frío o antes de un viaje largo.",
    },
    suspension: {
      title: "Suspensión y dirección",
      description:
        "Amortiguadores homocinéticas, dirección axial, revisión paralelo colaborativo.",
      whenToService:
        "Golpes en baches, desgaste irregular de gomas, dirección inestable o un lado más bajo tras bache o berma.",
    },
    electrical: {
      title: "Electricidad vehicular",
      description:
        "Carga/partida diagnosticada, masa mala fusibles módulos ruidos fantasmas.",
      whenToService:
        "Arranque lento, luces tenues, batería muerta por las mañanas, testigos intermitentes o accesorios que fallan de vez en cuando.",
    },
    ac: {
      title: "Clima cabina",
      description:
        "Evac/recarga fugas compressor expansión núcleos calefactor.",
      whenToService:
        "Poco frío, solo calor cuando quieren aire, tarda en desempañar o olor a humedad al encender el ventilador.",
    },
    tires: {
      title: "Neumáticos & llantas",
      description:
        "Montaje/equilibrio TPMS consejo medida temporada.",
      whenToService:
        "Banda baja, corte en el flanco, vibración en ruta, TPMS encendido o cambio de temporada con montaje y balanceo.",
    },
  },
  testimonials: {
    title: "Voces cercanas",
    googleNote:
      "4.8★ en Google. Las citas de muestra abajo reflejan comentarios típicos locales — las reseñas completas están en Google Business.",
    mapsGalleryNote:
      "Sección siguiente puede mostrar fotos reales desde Places API después de ejecutar sincronización.",
    samples: [
      {
        name: "Sofia L.",
        location: "Totowa, NJ",
        stars: 5,
        quote:
          "Excelente experiencia en el body shop de Sanchez Auto. El equipo fue profesional, honesto y rápido. Cuidaron mi auto y el resultado fue excelente.",
      },
      {
        name: "Jonathan H.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Llevé el auto tras un golpe lateral — carrocería y pintura quedaron de fábrica. Precio justo y me actualizaban todo el tiempo.",
      },
      {
        name: "Maria G.",
        location: "Paterson, NJ",
        stars: 5,
        quote:
          "Igualaron la pintura después de un raspón lateral. El presupuesto coincidió con la factura final y comunicaron cada suplemento del seguro.",
      },
      {
        name: "Winston O.",
        location: "Clifton, NJ",
        stars: 5,
        quote:
          "Buen taller. Arreglaron frenos y alineación el mismo día. Sin ventas agresivas — solo lo que necesitaba.",
      },
      {
        name: "Carlos R.",
        location: "Clifton, NJ",
        stars: 5,
        quote:
          "Fallo intermitente del motor: su diagnóstico fue lógico y la factura mostró cada repuesto paso a paso.",
      },
      {
        name: "Robert R.",
        location: "Passaic, NJ",
        stars: 5,
        quote:
          "El reclamo del seguro era un dolor de cabeza hasta que este taller se encargó. Fotos, estimado y reparación alineados. Muy recomendado.",
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
    lead: "Dinos el auto y el problema — abrimos WhatsApp con un mensaje estructurado listo para el taller.",
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
    vehicleOptional: "Vehículo (año / marca / modelo)",
    message: "Cuéntenos el problema",
    submit: "Abrir WhatsApp con esta cotización",
    selectPlaceholder: "Seleccionar…",
    noEndpointLead:
      "Las cotizaciones van directo al WhatsApp del taller con cliente, vehículo y problema.",
    noEndpointFormspreeHint:
      "No hace falta Formspree — el canal principal es WhatsApp.",
    noEndpointPhoneCue: "¿Prefiere llamar?",
  },
  faq: {
    title: "FAQ rápidas",
    lead: "Preguntas comunes de conductores en Paterson antes de escribirnos por WhatsApp.",
    items: [
      {
        question: "¿Trabajan con todas las aseguradoras?",
        answer:
          "Sí — todos los seguros principales son bienvenidos. No necesitas un taller “preferido”. Envía # de reclamo, fotos y datos del auto por WhatsApp y ayudamos con el ajustador.",
      },
      {
        question: "¿Cómo funcionan las cotizaciones por WhatsApp?",
        answer:
          "Completa nombre, teléfono, año/marca/modelo, problema y opcionalmente el reclamo. WhatsApp abre un mensaje estructurado — toca Enviar y adjunta 3–6 fotos.",
      },
      {
        question: "¿Qué fotos debo enviar para un reclamo?",
        answer:
          "Las cuatro esquinas del auto, detalle de cada daño y el tablero si hay luces. Más ángulos = mejor estimado inicial.",
      },
      {
        question: "¿Pueden mezclar OEM y aftermarket?",
        answer:
          "Sí. Explicamos opciones según deducible, tiempo y cuánto piensas quedarte el auto — sin cargos misteriosos.",
      },
      {
        question: "¿Qué tan rápido puedo dejar el carro?",
        answer:
          "Escríbenos primero con fotos. Suele haber citas en la misma semana; urgencias dependen de bahías y partes. Domingos varían — llama o WhatsApp antes.",
      },
      {
        question: "¿Hay personal que hable español?",
        answer:
          "Usa el interruptor ES en el sitio. A menudo hay ayuda bilingüe — menciónalo en WhatsApp y te atendemos.",
      },
      {
        question: "¿Atienden flotas o vans comerciales?",
        answer:
          "Sí — flota ligera y trabajo comercial es bienvenido. Envía datos de la unidad por WhatsApp y pregunta por tiempos de flota.",
      },
      {
        question: "¿Qué formas de pago aceptan?",
        answer:
          "Tarjetas principales, efectivo y cheques certificados. Para flotas o pagos divididos, llama antes.",
      },
    ],
  },
  footer: {
    connected: "Conectar",
    facebook: "Facebook",
    directions: "Mapa direcciones",
    legalNote: "© {year} {name}. Atendemos Paterson y alrededores NJ.",
    servicesBrowseAria:
      "Ver la página de servicios — mecánica general, chapa y pintura, motor, frenos, diagnóstico y más.",
    stickyWhatsApp: "Chatear por WhatsApp",
    stickyWhatsAppAria: "Abrir chat de WhatsApp",
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
