import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Primary stroke weight tuned for ~24–28px render (tile well). */
const SW = 2.5;
const SW_SOFT = 2.4;

function IconShell({ className, children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Collision: bold sedan front — body block, windshield wedge, two lamp dots, ground */
export function IconCollision(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M7 40h34" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" opacity={0.9} />
      <path
        d="M11 33.5C11 28 14.3 20 16.8 17c2.4-2.8 6.2-5 7.2-5s4.8 2.2 7.2 5c2.5 3 5.8 11 5.8 16.5H11z"
        fill="currentColor"
        fillOpacity={0.34}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M16.5 21.5L17.8 15h12.4l1.3 6.5-1.2 7.2h-12.6l-1.2-7.2z"
        fill="currentColor"
        fillOpacity={0.48}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinejoin="round"
      />
      <circle cx="15" cy="32" r="3.4" fill="currentColor" fillOpacity={0.4} stroke="currentColor" strokeWidth={SW} />
      <circle cx="33" cy="32" r="3.4" fill="currentColor" fillOpacity={0.4} stroke="currentColor" strokeWidth={SW} />
    </IconShell>
  );
}

/** Paint: simplified spray can — domed cap, cylinder, one spray stroke */
export function IconPaint(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M21 19.5h6l1.2 4.2H19.8l1.2-4.2z"
        fill="currentColor"
        fillOpacity={0.36}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M18 25.5c0-1.2 1-2.2 2.2-2.2h9.6c1.2 0 2.2 1 2.2 2.2v5.3c0 3.4-3.4 6.2-7 6.2h0c-3.6 0-7-2.8-7-6.2v-5.3z"
        fill="currentColor"
        fillOpacity={0.32}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M19.5 29h9" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" />
      <path
        d="M17.5 10.5C14 12 10.5 14.5 8 17.5"
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinecap="round"
        opacity={0.85}
      />
    </IconShell>
  );
}

/** Engine: bold V block — twin banks + center mass (minimal interior lines) */
export function IconEngine(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M24 37 9.5 25.5 13.5 14 22 18.2 24 20.5z"
        fill="currentColor"
        fillOpacity={0.34}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M24 37 38.5 25.5 34.5 14 26 18.2 24 20.5z"
        fill="currentColor"
        fillOpacity={0.34}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M17 17.5c4.2-3.8 9.8-3.8 14 0l1.4 5.2c-5.5 2.8-11.3 2.8-16.8 0l1.4-5.2z"
        fill="currentColor"
        fillOpacity={0.4}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

/** Mechanics: single large gear (outer ring + hub + four teeth) for small-size clarity */
export function IconMechanics(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle
        cx="24"
        cy="24"
        r="11.2"
        fill="currentColor"
        fillOpacity={0.28}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <circle
        cx="24"
        cy="24"
        r="5"
        fill="currentColor"
        fillOpacity={0.45}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
      <path
        d="M24 10.5L24 12.7M24 35.3L24 37.5M10.5 24L12.7 24M35.3 24L37.5 24"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
      />
    </IconShell>
  );
}

/** Brakes: capsule taillight — bezel + lit lens (no micro highlight arc) */
export function IconBrakes(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M9 14v20" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" opacity={0.75} />
      <path
        d="M11 17v14h14.5c6.2 0 11.5-3.8 11.5-7s-5.3-7-11.5-7H11z"
        fill="currentColor"
        fillOpacity={0.34}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M13.5 19v10h11.5c4.8 0 9-2.6 9-5s-4.2-5-9-5h-11.5z"
        fill="currentColor"
        fillOpacity={0.52}
      />
      <path
        d="M21 20c4.5 1 7.8 3.5 9.5 5.6l-1.8 1.6C26.8 25.5 24 23.5 20.5 22.5L21 20z"
        fill="currentColor"
        fillOpacity={0.72}
      />
    </IconShell>
  );
}

/** Diagnostics: scan tool — bold shell, 4-bar chart, thick cable, OBD plug */
export function IconDiagnostics(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect
        x="9"
        y="12"
        width="25"
        height="26"
        rx="4"
        fill="currentColor"
        fillOpacity={0.28}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <rect
        x="12.5"
        y="15.5"
        width="18"
        height="11"
        rx="2.2"
        fill="currentColor"
        fillOpacity={0.52}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
      <path
        d="M15.5 24.5v-5M18.8 24.5v-2.8M22 24.5v-4.2M25.3 24.5v-3.2"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
        opacity={0.88}
      />
      <path d="M13 30.5h17" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" opacity={0.85} />
      <path
        d="M34 38.5c6.5 0 6.5-6.5 6.5-10.5"
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinecap="round"
        fill="none"
        opacity={0.8}
      />
      <path d="M40.5 24.5v-6.5" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" opacity={0.8} />
      <rect
        x="36.5"
        y="14"
        width="7.5"
        height="6"
        rx="1.5"
        fill="currentColor"
        fillOpacity={0.38}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
    </IconShell>
  );
}

/** Transmission: gear + fluid puddle (fewer spokes) */
export function IconTransmission(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle
        cx="24"
        cy="22"
        r="12"
        fill="currentColor"
        fillOpacity={0.26}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <path
        d="M24 10v4.6M24 29.4v4.6M12 22h4.6M31.4 22h4.6"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
      />
      <circle
        cx="24"
        cy="22"
        r="5.2"
        fill="currentColor"
        fillOpacity={0.44}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
      <path d="M24 34v5.2" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" />
      <ellipse cx="24" cy="41.8" rx="4" ry="2" fill="currentColor" fillOpacity={0.48} />
    </IconShell>
  );
}

/** Oil: jug + single teardrop */
export function IconOil(props: IconProps) {
  return (
    <IconShell {...props}>
      <path
        d="M11 16.5h14c1.1 0 2 .9 2 2v15c0 1.7-1.3 3-3 3H12c-1.7 0-3-1.3-3-3v-15c0-1.1.9-2 2-2z"
        fill="currentColor"
        fillOpacity={0.3}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d="M14 11.5h8v6h-8v-6z"
        fill="currentColor"
        fillOpacity={0.38}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinejoin="round"
      />
      <path
        d="M28.5 18.5c5.8 2.8 9.5 7.8 9.5 13a9 9 0 11-18 0c0-5 3.8-10 8.5-13z"
        fill="currentColor"
        fillOpacity={0.46}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

/** Suspension: strut + two-turn coil */
export function IconSuspension(props: IconProps) {
  return (
    <IconShell {...props}>
      <path d="M24 8v32" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" />
      <path d="M16.5 8h15M16.5 40h15" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" opacity={0.88} />
      <path
        d="M14.5 14c6.5 3.2 12.5 3.2 19 0M14.5 24c6.5 3.2 12.5 3.2 19 0M14.5 34c6.5 3.2 12.5 3.2 19 0"
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.88}
      />
      <path d="M32 22l7-6" stroke="currentColor" strokeWidth={SW_SOFT} strokeLinecap="round" opacity={0.9} />
    </IconShell>
  );
}

/** Electrical: tool body + bold zigzag bolt (no MIL / thin screen bars) */
export function IconElectrical(props: IconProps) {
  return (
    <IconShell {...props}>
      <rect
        x="9.5"
        y="10"
        width="22"
        height="29"
        rx="4.2"
        fill="currentColor"
        fillOpacity={0.3}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <rect
        x="12.5"
        y="13.5"
        width="16"
        height="13"
        rx="2.3"
        fill="currentColor"
        fillOpacity={0.52}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
      <path d="M14.5 25.5h12" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" opacity={0.75} />
      <path d="M14 33h13" stroke="currentColor" strokeWidth={SW_SOFT} strokeLinecap="round" opacity={0.85} />
      <path
        d="M31.5 6.5l-3 7h4l-6.5 10 2.5-7h-3.8l4.8-10z"
        fill="currentColor"
        fillOpacity={0.38}
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path d="M20 39.2h8" stroke="currentColor" strokeWidth={SW_SOFT} strokeLinecap="round" opacity={0.75} />
      <path
        d="M17 41.2h11l2.4 5.3h-16l2.6-5.3z"
        fill="currentColor"
        fillOpacity={0.36}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

/** A/C: fan disc + three blades + simple temp arcs */
export function IconAc(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle
        cx="24"
        cy="26"
        r="11.5"
        fill="currentColor"
        fillOpacity={0.26}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <path
        d="M24 16.5v19M15.5 20.5l17 11M32.5 20.5l-17 11"
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinecap="round"
        opacity={0.92}
      />
      <circle
        cx="24"
        cy="26"
        r="4.5"
        fill="currentColor"
        fillOpacity={0.44}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
      <path
        d="M6.5 27.5a11.8 11.8 0 0118-9"
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinecap="round"
        fill="none"
        opacity={0.78}
      />
      <path
        d="M41.5 27.5a11.8 11.8 0 01-18-9"
        stroke="currentColor"
        strokeWidth={SW}
        strokeLinecap="round"
        fill="none"
        opacity={0.78}
      />
    </IconShell>
  );
}

/** Tires: head-on wheel — outer tire ring, rim barrel, hub, four spokes, three tread ticks */
export function IconTires(props: IconProps) {
  return (
    <IconShell {...props}>
      <circle
        cx="24"
        cy="24"
        r="15.5"
        fill="currentColor"
        fillOpacity={0.28}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <circle
        cx="24"
        cy="24"
        r="10.2"
        fill="currentColor"
        fillOpacity={0.18}
        stroke="currentColor"
        strokeWidth={SW}
      />
      <path
        d="M24 13.8v8.4M24 25.8v8.4M13.8 24h8.4M25.8 24h8.4"
        stroke="currentColor"
        strokeWidth={SW_SOFT}
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle
        cx="24"
        cy="24"
        r="4.8"
        fill="currentColor"
        fillOpacity={0.46}
        stroke="currentColor"
        strokeWidth={SW_SOFT}
      />
      <path
        d="M11.5 17.5L15 31M24 12.5v23M36.5 17.5L33 31"
        stroke="currentColor"
        strokeWidth={2.8}
        strokeLinecap="round"
        opacity={0.88}
      />
    </IconShell>
  );
}

const SERVICE_TILE_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  collision: (p) => <IconCollision {...p} />,
  paint: (p) => <IconPaint {...p} />,
  engine: (p) => <IconEngine {...p} />,
  mechanics: (p) => <IconMechanics {...p} />,
  brakes: (p) => <IconBrakes {...p} />,
  diagnostics: (p) => <IconDiagnostics {...p} />,
  transmission: (p) => <IconTransmission {...p} />,
  oil: (p) => <IconOil {...p} />,
  suspension: (p) => <IconSuspension {...p} />,
  electrical: (p) => <IconElectrical {...p} />,
  ac: (p) => <IconAc {...p} />,
  tires: (p) => <IconTires {...p} />,
};

export function SeoServiceTileIcon({ serviceId, ...props }: IconProps & { serviceId: string }) {
  const Render = SERVICE_TILE_ICONS[serviceId] ?? SERVICE_TILE_ICONS.mechanics;
  return Render(props);
}
