import { schedule } from "@/lib/site-content";

/** Parse "9:00 AM – 6:00 PM" style range for a given day row. */
function parseHoursRange(hours: string): { openMin: number; closeMin: number } | null {
  // e.g. "9:00 AM – 6:00 PM" or "Call ahead — hours may vary"
  const m = hours.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i,
  );
  if (!m) return null;
  const toMin = (h: string, min: string, ap: string) => {
    let hh = parseInt(h, 10) % 12;
    if (ap.toUpperCase() === "PM") hh += 12;
    return hh * 60 + parseInt(min, 10);
  };
  return {
    openMin: toMin(m[1], m[2], m[3]),
    closeMin: toMin(m[4], m[5], m[6]),
  };
}

function dayIndex(d: Date): number {
  // 0 Sun … 6 Sat
  return d.getDay();
}

/**
 * Best-effort open status for Paterson shop (America/New_York).
 * Sunday is "call ahead" — never show as open.
 */
export function getShopOpenStatus(now = new Date()): {
  isOpen: boolean;
  labelEn: string;
  labelEs: string;
  detailEn: string;
  detailEs: string;
} {
  // Approximate ET offset without heavy deps: use locale string
  const et = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" }),
  );
  const dow = dayIndex(et);
  const mins = et.getHours() * 60 + et.getMinutes();

  if (dow === 0) {
    return {
      isOpen: false,
      labelEn: "Sunday — call ahead",
      labelEs: "Domingo — llame antes",
      detailEn: "Hours may vary. Message us on WhatsApp or call before you come.",
      detailEs: "Horario variable. Escríbenos por WhatsApp o llama antes de venir.",
    };
  }

  // Mon–Sat use first matching schedule row (Mon–Fri or Saturday)
  const row =
    dow >= 1 && dow <= 5
      ? schedule.find((s) => /monday|friday/i.test(s.days))
      : schedule.find((s) => /saturday/i.test(s.days));

  const range = row ? parseHoursRange(row.hours) : null;
  if (!range) {
    return {
      isOpen: false,
      labelEn: "Call for hours",
      labelEs: "Llame para horario",
      detailEn: row?.hours ?? "Contact the shop",
      detailEs: row?.hours ?? "Contacte el taller",
    };
  }

  const open = mins >= range.openMin && mins < range.closeMin;
  if (open) {
    return {
      isOpen: true,
      labelEn: "Open now",
      labelEs: "Abierto ahora",
      detailEn: `Today until ${row!.hours.split(/[–-]/).pop()?.trim() ?? "close"}`,
      detailEs: `Hoy hasta ${row!.hours.split(/[–-]/).pop()?.trim() ?? "cierre"}`,
    };
  }

  if (mins < range.openMin) {
    return {
      isOpen: false,
      labelEn: "Closed — opens later today",
      labelEs: "Cerrado — abre más tarde",
      detailEn: row!.hours,
      detailEs: row!.hours,
    };
  }

  return {
    isOpen: false,
    labelEn: "Closed for today",
    labelEs: "Cerrado por hoy",
    detailEn: "Message on WhatsApp anytime — we reply during shop hours.",
    detailEs: "Escribe por WhatsApp cuando quieras — respondemos en horario de taller.",
  };
}
