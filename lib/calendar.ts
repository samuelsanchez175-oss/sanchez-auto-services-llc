import { formatAddressInline, site } from "@/lib/site-content";

export type AppointmentPayload = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  notes?: string;
  /** Local date YYYY-MM-DD */
  date: string;
  /** Local time HH:mm (24h) */
  time: string;
  /** Duration minutes (default 60) */
  durationMin?: number;
};

/** Pad for ICS / Google date strings */
function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Format as YYYYMMDDTHHMMSS (no Z — used with TZID=America/New_York) */
export function toLocalIcsStamp(date: string, time: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
}

export function addMinutesToTime(
  date: string,
  time: string,
  minutes: number,
): { date: string; time: string } {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const start = new Date(y, m - 1, d, hh, mm, 0);
  const end = new Date(start.getTime() + minutes * 60_000);
  return {
    date: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`,
    time: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
  };
}

export function appointmentSummary(p: AppointmentPayload, locale: "en" | "es" = "en") {
  return locale === "es"
    ? `Cita — ${site.name}: ${p.service}`
    : `Appointment — ${site.name}: ${p.service}`;
}

export function appointmentDescription(p: AppointmentPayload, locale: "en" | "es" = "en") {
  const lines =
    locale === "es"
      ? [
          `Cita en ${site.name}`,
          `Servicio: ${p.service}`,
          `Nombre: ${p.name}`,
          `Teléfono: ${p.phone}`,
          p.email ? `Email: ${p.email}` : null,
          p.notes ? `Notas: ${p.notes}` : null,
          "",
          `Dirección: ${formatAddressInline()}`,
          `Tel. taller: ${site.phones[0].display}`,
          "",
          "Confirme con el taller si necesita cambiar la hora.",
        ]
      : [
          `Appointment at ${site.name}`,
          `Service: ${p.service}`,
          `Name: ${p.name}`,
          `Phone: ${p.phone}`,
          p.email ? `Email: ${p.email}` : null,
          p.notes ? `Notes: ${p.notes}` : null,
          "",
          `Address: ${formatAddressInline()}`,
          `Shop phone: ${site.phones[0].display}`,
          "",
          "Please confirm with the shop if you need to change the time.",
        ];
  return lines.filter(Boolean).join("\n");
}

/** Download a .ics file the user can open in Apple Calendar, Outlook, etc. */
export function downloadIcs(p: AppointmentPayload, locale: "en" | "es" = "en") {
  const duration = p.durationMin ?? 60;
  const end = addMinutesToTime(p.date, p.time, duration);
  const dtStart = toLocalIcsStamp(p.date, p.time);
  const dtEnd = toLocalIcsStamp(end.date, end.time);
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@sanchez-auto`;
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const summary = appointmentSummary(p, locale).replace(/,/g, "\\,");
  const description = appointmentDescription(p, locale)
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,");
  const location = formatAddressInline().replace(/,/g, "\\,");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sanchez Auto Services LLC//Appointment//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=America/New_York:${dtStart}`,
    `DTEND;TZID=America/New_York:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sanchez-auto-appointment-${p.date}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Google Calendar “add event” template URL (opens in browser). */
export function googleCalendarUrl(p: AppointmentPayload, locale: "en" | "es" = "en"): string {
  const duration = p.durationMin ?? 60;
  const end = addMinutesToTime(p.date, p.time, duration);
  const dates = `${toLocalIcsStamp(p.date, p.time)}/${toLocalIcsStamp(end.date, end.time)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: appointmentSummary(p, locale),
    dates,
    details: appointmentDescription(p, locale),
    location: formatAddressInline(),
    ctz: "America/New_York",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
