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
  "Collision estimate / drop-off",
  "Paint / refinish",
  "Mechanical / diagnostics",
  "Insurance claim visit",
  "General consultation",
];

const SERVICES_ES = [
  "Estimado de colisión / entrega",
  "Pintura / acabado",
  "Mecánica / diagnóstico",
  "Visita por reclamo de seguro",
  "Consulta general",
];

/** Next 14 days of slots (shop Mon–Sat style: 9–17). */
function defaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Book an appointment — generates iCal (.ics) + Google Calendar link for the user,
 * and pings the shop on WhatsApp with the same details.
 */
export function CleanBookAppointment() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const services = es ? SERVICES_ES : SERVICES_EN;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);
  const [gcalUrl, setGcalUrl] = useState("");

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const field =
    "h-11 w-full rounded-md border border-[#E2E8EF] bg-white px-3 text-sm outline-none transition focus:border-[#FB8C33] focus:ring-2 focus:ring-[#FB8C33]/25";
  const label = "mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]";
  const labelStyle = { color: brand.steel };

  function buildPayload(): AppointmentPayload {
    return {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      service: service || (es ? "Consulta general" : "General consultation"),
      notes: notes.trim() || undefined,
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
          "📅 *SOLICITUD DE CITA — Sanchez Auto*",
          `Nombre: ${p.name}`,
          `Tel: ${p.phone}`,
          p.email ? `Email: ${p.email}` : null,
          `Servicio: ${p.service}`,
          `Fecha: ${p.date}`,
          `Hora: ${p.time} (hora NJ)`,
          p.notes ? `Notas: ${p.notes}` : null,
          `Lugar: ${formatAddressInline()}`,
        ]
      : [
          "📅 *APPOINTMENT REQUEST — Sanchez Auto*",
          `Name: ${p.name}`,
          `Phone: ${p.phone}`,
          p.email ? `Email: ${p.email}` : null,
          `Service: ${p.service}`,
          `Date: ${p.date}`,
          `Time: ${p.time} (NJ time)`,
          p.notes ? `Notes: ${p.notes}` : null,
          `Location: ${formatAddressInline()}`,
        ];
    openWhatsAppWithMessage(wa.filter(Boolean).join("\n"), {
      source: "book_appointment",
      service: p.service,
    });
  }

  return (
    <section
      id="book"
      className="nw-section scroll-mt-28"
      style={{ background: brand.white }}
    >
      <div className="nw-wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="nw-kicker">{es ? "Citas" : "Appointments"}</p>
          <h2 className="nw-h2">
            {es ? "Agendar entrega o visita" : "Schedule a drop-off"}
          </h2>
          <p className="nw-lead">
            {es
              ? "Solicitud de hora — el taller confirma por WhatsApp. Recibes .ics + Google Calendar."
              : "Request a time — the shop confirms on WhatsApp. You get .ics + Google Calendar."}
          </p>
        </div>

        <div
          className="mx-auto mt-10 max-w-xl border p-5 sm:p-7"
          style={{
            borderColor: "#E6EAEF",
            background: brand.paper,
            borderRadius: "0.35rem",
          }}
        >
          {done ? (
            <div className="text-center">
              <CalendarPlus
                className="mx-auto size-10"
                style={{ color: brand.orange }}
                aria-hidden
              />
              <h3 className="mt-3 text-lg font-extrabold" style={{ color: brand.navy }}>
                {es ? "¡Cita lista para tu calendario!" : "Appointment ready for your calendar!"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: brand.steel }}>
                {es
                  ? "Se descargó un archivo .ics. Ábrelo en Apple Calendar, Outlook o Google. WhatsApp se abrió para avisar al taller."
                  : "An .ics file downloaded. Open it in Apple Calendar, Outlook, or Google. WhatsApp opened so the shop is notified."}
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                {gcalUrl ? (
                  <a
                    href={gcalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-white no-underline"
                    style={{ background: brand.navy }}
                  >
                    <ExternalLink className="size-4" aria-hidden />
                    {es ? "Abrir en Google Calendar" : "Open in Google Calendar"}
                  </a>
                ) : null}
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-bold"
                  style={{ borderColor: "#E6EAEF", color: brand.navy, background: "#fff" }}
                  onClick={() => {
                    downloadIcs(buildPayload(), es ? "es" : "en");
                  }}
                >
                  <Download className="size-4" aria-hidden />
                  {es ? "Descargar .ics otra vez" : "Download .ics again"}
                </button>
              </div>
              <button
                type="button"
                className="mt-4 text-sm font-bold underline"
                style={{ color: brand.orangeDeep }}
                onClick={() => setDone(false)}
              >
                {es ? "Reservar otra cita" : "Book another time"}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={label} style={labelStyle} htmlFor="appt-name">
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
                  <label className={label} style={labelStyle} htmlFor="appt-phone">
                    {es ? "Teléfono" : "Phone"}
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
                <label className={label} style={labelStyle} htmlFor="appt-email">
                  {es ? "Email (opcional)" : "Email (optional)"}
                </label>
                <input
                  id="appt-email"
                  type="email"
                  className={field}
                  style={{ color: brand.navy }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className={label} style={labelStyle} htmlFor="appt-service">
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
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={label} style={labelStyle} htmlFor="appt-date">
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
                  <label className={label} style={labelStyle} htmlFor="appt-time">
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
              <div>
                <label className={label} style={labelStyle} htmlFor="appt-notes">
                  {es ? "Notas (opcional)" : "Notes (optional)"}
                </label>
                <input
                  id="appt-notes"
                  className={field}
                  style={{ color: brand.navy }}
                  placeholder={es ? "Ej. traigo el auto con seguro…" : "e.g. bringing car with insurance…"}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: brand.steelLight }}>
                {es
                  ? `Citas tentativas · ${site.address.line1}, Paterson. El taller confirma por WhatsApp o teléfono.`
                  : `Requested times are tentative · ${site.address.line1}, Paterson. Shop confirms by WhatsApp or phone.`}
              </p>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md border-0 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white"
                style={{ background: brandGradients.whatsappCta }}
              >
                <MessageCircle className="size-4" aria-hidden />
                {es
                  ? "Reservar · calendario + WhatsApp"
                  : "Book · calendar + WhatsApp"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
