/**
 * Sanchez Auto brand — colors sampled from the official logo.
 *
 * - Navy: SANCHEZ wordmark + car silhouette (~#07253F)
 * - Orange: speed lines + hexagon (~#FB8C33)
 * - Steel grey: “AUTO SERVICES LLC” (~#878D93)
 * - White: logo field
 *
 * WhatsApp green is kept only for chat CTAs (not on the logo).
 */
export const brand = {
  navy: "#07253F",
  navyDeep: "#001830",
  navyMid: "#0F2C45",
  navySoft: "rgba(7, 37, 63, 0.08)",

  orange: "#FB8C33",
  orangeHot: "#FC9560",
  orangeDeep: "#E07020",
  orangeSoft: "rgba(251, 140, 51, 0.14)",
  orangeBorder: "rgba(251, 140, 51, 0.4)",

  steel: "#878D93",
  steelLight: "#B0B6BC",
  mist: "#F2F4F6",
  paper: "#FAFBFC",
  white: "#FFFFFF",

  whatsapp: "#25D366",
  whatsappDeep: "#128C7E",

  star: "#F5B400",
} as const;

export const brandGradients = {
  heroOverlay: `
    linear-gradient(105deg,
      rgba(0, 24, 48, 0.97) 0%,
      rgba(7, 37, 63, 0.94) 38%,
      rgba(7, 37, 63, 0.58) 64%,
      rgba(7, 37, 63, 0.28) 100%
    )
  `,
  heroOverlayMobile: `
    linear-gradient(to bottom,
      rgba(0, 24, 48, 0.5) 0%,
      rgba(0, 24, 48, 0.78) 42%,
      rgba(0, 24, 48, 0.97) 100%
    )
  `,
  whatsappCta: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
  navyCta: "linear-gradient(135deg, #0F2C45 0%, #07253F 100%)",
  orangeCta: "linear-gradient(135deg, #FB8C33 0%, #E07020 100%)",
  navyPanel: "linear-gradient(135deg, #07253F 0%, #0F2C45 100%)",
} as const;
