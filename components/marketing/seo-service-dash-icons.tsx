import type { ReactElement, SVGProps } from "react";
import type { ServiceDashKind } from "@/lib/catalog/types";

type DashProps = SVGProps<SVGSVGElement>;

/** Semantic dash-warning hues via Tailwind — strokes use `currentColor`. */
export const DASH_KIND_CLASS: Record<ServiceDashKind, string> = {
  airbag_srs: "text-amber-500",
  brake_warning: "text-red-600",
  check_engine: "text-amber-500",
  battery_charge: "text-red-600",
  tpms: "text-amber-500",
  oil_pressure: "text-red-600",
  maintenance: "text-amber-500",
  transmission_temp: "text-amber-500",
};

function DashShell({ className, children, ...rest }: DashProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className={className}
      aria-hidden
      {...rest}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

/** Seated occupant + front supplemental sphere — abstract, not OEM-specific. */
function DashAirbagSrs(props: DashProps) {
  return (
    <DashShell {...props}>
      <circle cx="10" cy="6.25" r="2" stroke="currentColor" strokeWidth={2.4} opacity={0.38} />
      <circle cx="10" cy="6.25" r="2" stroke="currentColor" strokeWidth={1.45} />
      <path
        d="M10 9.8v3.2l-2.6 5.6h9.2l-2.6-5.6V9.8"
        stroke="currentColor"
        strokeWidth={2.35}
        opacity={0.38}
      />
      <path
        d="M10 9.8v3.2l-2.6 5.6h9.2l-2.6-5.6V9.8"
        stroke="currentColor"
        strokeWidth={1.45}
      />
      <path d="M6.6 15.8h10.8" stroke="currentColor" strokeWidth={2.2} opacity={0.38} />
      <path d="M6.6 15.8h10.8" stroke="currentColor" strokeWidth={1.35} />
      <circle cx="16.25" cy="9.25" r="2.65" stroke="currentColor" strokeWidth={2.35} opacity={0.38} />
      <circle cx="16.25" cy="9.25" r="2.65" stroke="currentColor" strokeWidth={1.4} />
      <path d="M16.25 11.9v2.35" stroke="currentColor" strokeWidth={2.15} opacity={0.38} />
      <path d="M16.25 11.9v2.35" stroke="currentColor" strokeWidth={1.25} />
    </DashShell>
  );
}

/** Circle framed by parentheses — common brake-system warning motif. */
function DashBrakeWarning(props: DashProps) {
  return (
    <DashShell {...props}>
      <path d="M7.25 4.25C5.1 8.35 5.1 15.65 7.25 19.75" stroke="currentColor" strokeWidth={1.5} />
      <path d="M16.75 4.25C18.9 8.35 18.9 15.65 16.75 19.75" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="4.85" stroke="currentColor" strokeWidth={1.5} />
    </DashShell>
  );
}

/** Angled engine-block silhouette — abstract MIL / check-engine cue. */
function DashCheckEngine(props: DashProps) {
  return (
    <DashShell {...props}>
      <path
        d="M7.25 10.25l9.25-2.35 1.35 8.05-9.25 2.35-1.35-8.05z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d="M9 12.35h6M9.85 14.85h4.3" stroke="currentColor" strokeWidth={1.25} opacity={0.88} />
    </DashShell>
  );
}

function DashBatteryCharge(props: DashProps) {
  return (
    <DashShell {...props}>
      <rect x="5" y="7.75" width="12.25" height="9.25" rx="1.15" stroke="currentColor" strokeWidth={1.45} />
      <path d="M17.75 9.85h2.1v4.35h-2.1v-4.35z" stroke="currentColor" strokeWidth={1.35} />
      <path
        d="M8.35 11.1v2.05M7.35 12.12h2"
        stroke="currentColor"
        strokeWidth={1.1}
      />
      <path d="M15.65 14.6h2.2" stroke="currentColor" strokeWidth={1.1} />
    </DashShell>
  );
}

/** Tire cross-section arc + caution mark. */
function DashTpms(props: DashProps) {
  return (
    <DashShell {...props}>
      <path d="M5.5 17.5 Q12 9.75 18.5 17.5" stroke="currentColor" strokeWidth={1.45} />
      <path d="M5.5 17.5h13" stroke="currentColor" strokeWidth={1.45} />
      <path d="M12 10v5.35" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="12" cy="16.7" r="1.05" stroke="currentColor" strokeWidth={1.2} fill="none" />
    </DashShell>
  );
}

/** Simplified oil can (spout + body + drip). */
function DashOilPressure(props: DashProps) {
  return (
    <DashShell {...props}>
      <path d="M10 5.75l2.4-2.05M14.35 6.1l1.45-1.75" stroke="currentColor" strokeWidth={1.3} />
      <path
        d="M7.35 9.05c0-1.05.85-1.9 1.9-1.9h5.5c1.05 0 1.9.85 1.9 1.9v6.4c0 1.75-1.45 3.2-3.2 3.2h-2.9c-1.75 0-3.2-1.45-3.2-3.2V9.05z"
        stroke="currentColor"
        strokeWidth={1.45}
      />
      <path d="M12 18.9v1.65" stroke="currentColor" strokeWidth={1.2} />
      <ellipse cx="12" cy="21.35" rx="1.35" ry="0.95" stroke="currentColor" strokeWidth={1.15} />
    </DashShell>
  );
}

/** Open wrench + notification dot. */
function DashMaintenance(props: DashProps) {
  return (
    <DashShell {...props}>
      <path
        d="M5.5 18.6l9.1-9.6M15.5 8.05l1.75-1.8 2.15 2.15-1.75 1.8"
        stroke="currentColor"
        strokeWidth={1.45}
      />
      <circle cx="6.55" cy="19.05" r="1.65" stroke="currentColor" strokeWidth={1.35} />
      <circle cx="19.1" cy="5.65" r="1.15" stroke="currentColor" strokeWidth={1.25} fill="none" />
    </DashShell>
  );
}

/** Gear + thermometer — fluid / temperature cue. */
function DashTransmissionTemp(props: DashProps) {
  return (
    <DashShell {...props}>
      <circle cx="9.25" cy="15" r="3.35" stroke="currentColor" strokeWidth={1.35} />
      <path
        d="M9.25 11.1v2.15M9.25 16.75v2.15M5.8 15h2.3M10.4 15h2.35M7.05 12.9l1.65 1.65M9.8 14.95l1.65 1.65M7.05 17.1l1.65-1.65M9.8 15.05l1.65-1.65"
        stroke="currentColor"
        strokeWidth={1.15}
      />
      <path d="M16.75 5.85v10" stroke="currentColor" strokeWidth={1.35} />
      <circle cx="16.75" cy="17.5" r="2.25" stroke="currentColor" strokeWidth={1.35} />
      <path d="M16.75 9.2v5.8" stroke="currentColor" strokeWidth={1.05} opacity={0.45} />
    </DashShell>
  );
}

const DASH_RENDER: Record<ServiceDashKind, (p: DashProps) => ReactElement> = {
  airbag_srs: (p) => <DashAirbagSrs {...p} />,
  brake_warning: (p) => <DashBrakeWarning {...p} />,
  check_engine: (p) => <DashCheckEngine {...p} />,
  battery_charge: (p) => <DashBatteryCharge {...p} />,
  tpms: (p) => <DashTpms {...p} />,
  oil_pressure: (p) => <DashOilPressure {...p} />,
  maintenance: (p) => <DashMaintenance {...p} />,
  transmission_temp: (p) => <DashTransmissionTemp {...p} />,
};

export function SeoServiceDashBadge({
  kind,
  className = "",
}: {
  kind: ServiceDashKind;
  className?: string;
}) {
  const Render = DASH_RENDER[kind];
  const hueClass = DASH_KIND_CLASS[kind];
  return (
    <span
      className={`inline-flex size-[18px] shrink-0 items-center justify-center ${hueClass} ${className}`.trim()}
      aria-hidden
    >
      <Render />
    </span>
  );
}
