"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, Download, ExternalLink, MessageCircle } from "lucide-react";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { formatAddressInline, site } from "@/lib/site-content";
import {
  downloadIcs,
  googleCalendarUrl,
  type AppointmentPayload,
} from "@/lib/calendar";
import { openWhatsAppWithMessage } from "@/lib/whatsapp-quote";
import { trackEvent } from "@/lib/analytics";

const SERVICES_EN = [
  "Collision / drop-off",
  "Paint / refinish",
  "Mechanical",
  "Insurance visit",
  "Other",
];

const SERVICES_ES = [
  "Colisión / entrega",
  "Pintura",
  "Mecánica",
  "Visita seguro",
  "Otro",
];

function defaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Compact drop-off request — .ics + Google Calendar + WhatsApp notify.
 */
export function CleanBookAppointment() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const services = es ? SERVICES_ES : SERVICES_EN;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("10:00");
  const [done, setDone] = useState(false);
  const [gcalUrl, setGcalUrl] = useState("");

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const field =
    "h-10 w-full rounded-md border border-[#E2E8EF] bg-white px-2.5 text-[13px] outline-none focus:border-[#FB8C33] focus:ring-2 focus:ring-[#FB8C33]/20";
  const label = "mb-0.5 block text-[10px] font-bold uppercase tracking-wide";

  function buildPayload(): AppointmentPayload {
    return {
      name: name.trim(),
      phone: phone.trim(),
      service: service || (es ? "Otro" : "Other"),
      date,
      time,
      durationMin: 60,
    };
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = buildPayload();
    const loc = es ? "es" : "en";
    downloadIcs(p, loc);
    const gUrl = googleCalendarUrl(p, loc);
    setGcalUrl(gUrl);
    setDone(true);
    trackEvent("quote_open", { service: `appointment:${p.service}` });

    const wa = es
      ? [
          "📅 *ENTREGA / CITA — Sanchez Auto*",
          `Nombre: ${p.name}`,
          `Tel: ${p.phone}`,
          `Servicio: ${p.service}`,
          `Fecha: ${p.date} · ${p.time}`,
          `Lugar: ${formatAddressInline()}`,
        ]
      : [
          "📅 *DROP-OFF REQUEST — Sanchez Auto*",
          `Name: ${p.name}`,
          `Phone: ${p.phone}`,
          `Service: ${p.service}`,
          `Date: ${p.date} · ${p.time}`,
          `Location: ${formatAddressInline()}`,
        ];
    openWhatsAppWithMessage(wa.join("\n"), {
      source: "book_appointment",
      service: p.service,
    });
  }

  return (
    <section
      id="book"
      className="scroll-mt-28 py-6 sm:py-8"
      style={{ background: brand.white }}
    >
      <div className="nw-wrap">
        <div
          className="mx-auto max-w-xl border px-4 py-5 sm:px-5 sm:py-6"
          style={{
            borderColor: "#E6EAEF",
            background: brand.paper,
            borderRadius: "0.35rem",
          }}
        >
          <div className="mb-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: brand.orange }}>
              {es ? "Agenda" : "Schedule"}
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl" style={{ color: brand.navy }}>
              {es ? "Agendar entrega" : "Schedule a drop-off"}
            </h2>
            <p className="mt-1 text-xs leading-snug" style={{ color: brand.steel }}>
              {es
                ? "Solicitud — el taller confirma · .ics + Google Calendar"
                : "Request — shop confirms · .ics + Google Calendar"}
            </p>
          </div>

          {done ? (
            <div className="text-center">
              <CalendarPlus className="mx-auto size-8" style={{ color: brand.orange }} aria-hidden />
              <p className="mt-2 text-sm font-extrabold" style={{ color: brand.navy }}>
                {es ? "Calendario listo · WhatsApp abierto" : "Calendar ready · WhatsApp opened"}
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
                {gcalUrl ? (
                  <a
                    href={gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-xs font-bold text-white no-underline"
                    style={{ background: brand.navy }}
                  >
                    <ExternalLink className="size-3.5" aria-hidden />
                    Google Calendar
                  </a>
                ) : null}
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-md border px-4 py-2.5 text-xs font-bold"
                  style={{ borderColor: "#E6EAEF", color: brand.navy, background: "#fff" }}
                  onClick={() => downloadIcs(buildPayload(), es ? "es" : "en")}
                >
                  <Download className="size-3.5" aria-hidden />
                  .ics
                </button>
              </div>
              <button
                type="button"
                className="mt-3 text-xs font-bold underline"
                style={{ color: brand.orangeDeep }}
                onClick={() => setDone(false)}
              >
                {es ? "Otra hora" : "Another time"}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={label} style={{ color: brand.steel }} htmlFor="appt-name">
                    {es ? "Nombre" : "Name"}
                  </label>
                  <input
                    id="appt-name"
                    className={field}
                    style={{ color: brand.navy }}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className={label} style={{ color: brand.steel }} htmlFor="appt-phone">
                    {es ? "Tel" : "Phone"}
                  </label>
                  <input
                    id="appt-phone"
                    type="tel"
                    className={field}
                    style={{ color: brand.navy }}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div>
                <label className={label} style={{ color: brand.steel }} htmlFor="appt-service">
                  {es ? "Servicio" : "Service"}
                </label>
                <select
                  id="appt-service"
                  className={field}
                  style={{ color: brand.navy }}
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="" disabled>
                    {es ? "Seleccionar…" : "Select…"}
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={label} style={{ color: brand.steel }} htmlFor="appt-date">
                    {es ? "Fecha" : "Date"}
                  </label>
                  <input
                    id="appt-date"
                    type="date"
                    className={field}
                    style={{ color: brand.navy }}
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} style={{ color: brand.steel }} htmlFor="appt-time">
                    {es ? "Hora" : "Time"}
                  </label>
                  <input
                    id="appt-time"
                    type="time"
                    className={field}
                    style={{ color: brand.navy }}
                    required
                    min="09:00"
                    max="17:30"
                    step={900}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-[10px]" style={{ color: brand.steelLight }}>
                {site.address.line1}, Paterson · {es ? "confirma el taller" : "shop confirms"}
              </p>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md border-0 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-white"
                style={{ background: brandGradients.whatsappCta }}
              >
                <MessageCircle className="size-3.5" aria-hidden />
                {es ? "Agendar · calendario + WA" : "Schedule · calendar + WA"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
