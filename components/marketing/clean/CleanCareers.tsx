"use client";

import { useState } from "react";
import { Briefcase, MessageCircle } from "lucide-react";
import { brand, brandGradients } from "@/lib/brand";
import { useCatalog } from "@/lib/locale";
import { openWhatsAppWithMessage } from "@/lib/whatsapp-quote";
import { trackEvent } from "@/lib/analytics";

const ROLES_EN = [
  "Body technician",
  "Painter / refinish",
  "Mechanical / diagnostics",
  "Estimator / front office",
  "General / other",
];

const ROLES_ES = [
  "Técnico de carrocería",
  "Pintor / acabado",
  "Mecánica / diagnóstico",
  "Estimador / oficina",
  "General / otro",
];

/**
 * Careers — short application that notifies the shop on WhatsApp.
 */
export function CleanCareers() {
  const { locale } = useCatalog();
  const es = locale === "es";
  const roles = es ? ROLES_ES : ROLES_EN;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const field =
    "h-11 w-full rounded-md border border-[#E2E8EF] bg-white px-3 text-sm outline-none transition focus:border-[#FB8C33] focus:ring-2 focus:ring-[#FB8C33]/25";
  const label = "mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = es
      ? [
          "👷 *SOLICITUD DE EMPLEO — Sanchez Auto*",
          `Nombre: ${name.trim()}`,
          `Tel: ${phone.trim()}`,
          email.trim() ? `Email: ${email.trim()}` : null,
          `Puesto: ${role}`,
          experience.trim() ? `Experiencia: ${experience.trim()}` : null,
          message.trim() ? `Mensaje: ${message.trim()}` : null,
        ]
      : [
          "👷 *JOB APPLICATION — Sanchez Auto*",
          `Name: ${name.trim()}`,
          `Phone: ${phone.trim()}`,
          email.trim() ? `Email: ${email.trim()}` : null,
          `Role: ${role}`,
          experience.trim() ? `Experience: ${experience.trim()}` : null,
          message.trim() ? `Message: ${message.trim()}` : null,
        ];
    openWhatsAppWithMessage(lines.filter(Boolean).join("\n"), {
      source: "careers",
      service: role,
    });
    trackEvent("quote_open", { service: `careers:${role}` });
    setSent(true);
  }

  return (
    <section
      id="careers"
      className="nw-section scroll-mt-28"
      style={{ background: "#F8F8F8" }}
    >
      <div className="nw-wrap">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="nw-kicker">{es ? "Empleo" : "Careers"}</p>
            <h2 className="nw-h2">
              {es ? "Trabaja con nosotros" : "Work with us"}
            </h2>
            <p className="nw-lead" style={{ maxWidth: "100%" }}>
              {es
                ? "Buscamos gente seria para carrocería, pintura, mecánica y oficina en Paterson. Envía una solicitud corta — llega al taller por WhatsApp."
                : "We’re looking for solid people in body, paint, mechanical, and front office in Paterson. Send a short application — it goes to the shop on WhatsApp."}
            </p>
            <ul className="mt-6 space-y-2 text-sm" style={{ color: brand.steel }}>
              {(es
                ? [
                    "Taller familiar en 99 E Railway Ave",
                    "Colisión, pintura y mecánica",
                    "Habla inglés o español — ambos ayudan",
                  ]
                : [
                    "Family shop at 99 E Railway Ave",
                    "Collision, paint, and mechanical work",
                    "English or Spanish — both help",
                  ]
              ).map((line) => (
                <li key={line} className="flex gap-2">
                  <Briefcase
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: brand.orange }}
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="border p-5 sm:p-6"
            style={{
              background: brand.white,
              borderColor: "#E6EAEF",
              borderRadius: "0.35rem",
            }}
          >
            {sent ? (
              <div className="py-8 text-center">
                <MessageCircle
                  className="mx-auto size-10"
                  style={{ color: brand.whatsapp }}
                  aria-hidden
                />
                <h3 className="mt-3 text-lg font-extrabold" style={{ color: brand.navy }}>
                  {es ? "Solicitud enviada a WhatsApp" : "Application sent to WhatsApp"}
                </h3>
                <p className="mt-2 text-sm" style={{ color: brand.steel }}>
                  {es
                    ? "Toca Enviar en WhatsApp. El taller te contactará si hay una vacante."
                    : "Tap Send in WhatsApp. The shop will reach out if there’s an opening."}
                </p>
                <button
                  type="button"
                  className="mt-4 text-sm font-bold underline"
                  style={{ color: brand.orangeDeep }}
                  onClick={() => setSent(false)}
                >
                  {es ? "Enviar otra" : "Submit another"}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={label} style={{ color: brand.steel }}>
                      {es ? "Nombre" : "Name"}
                    </label>
                    <input
                      className={field}
                      style={{ color: brand.navy }}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={label} style={{ color: brand.steel }}>
                      {es ? "Teléfono" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      className={field}
                      style={{ color: brand.navy }}
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={label} style={{ color: brand.steel }}>
                    {es ? "Email (opcional)" : "Email (optional)"}
                  </label>
                  <input
                    type="email"
                    className={field}
                    style={{ color: brand.navy }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} style={{ color: brand.steel }}>
                    {es ? "Puesto de interés" : "Role of interest"}
                  </label>
                  <select
                    className={field}
                    style={{ color: brand.navy }}
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>
                      {es ? "Seleccionar…" : "Select…"}
                    </option>
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} style={{ color: brand.steel }}>
                    {es ? "Experiencia (opcional)" : "Experience (optional)"}
                  </label>
                  <input
                    className={field}
                    style={{ color: brand.navy }}
                    placeholder={es ? "Años / talleres anteriores" : "Years / previous shops"}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} style={{ color: brand.steel }}>
                    {es ? "Mensaje (opcional)" : "Message (optional)"}
                  </label>
                  <textarea
                    className="min-h-[72px] w-full resize-none rounded-md border border-[#E2E8EF] px-3 py-2.5 text-sm outline-none focus:border-[#FB8C33] focus:ring-2 focus:ring-[#FB8C33]/25"
                    style={{ color: brand.navy }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-md border-0 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] text-white"
                  style={{ background: brandGradients.whatsappCta }}
                >
                  <MessageCircle className="size-4" aria-hidden />
                  {es ? "Enviar solicitud por WhatsApp" : "Send application on WhatsApp"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
