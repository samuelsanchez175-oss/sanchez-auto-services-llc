"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, ChevronDown } from "lucide-react";

const WA_NUMBER = "19736094586";

interface Props {
  service: string | null;
  onClose: () => void;
}

const DAMAGE_TYPES = [
  "Front-end collision",
  "Rear-end collision",
  "Side impact / door damage",
  "Bumper scratch / crack",
  "Paint chip / scratch",
  "Full repaint needed",
  "Dent (no paint damage)",
  "Check engine / warning light",
  "Brake issue",
  "Transmission problem",
  "Oil change / maintenance",
  "A/C not working",
  "Suspension / steering",
  "Electrical issue",
  "Other — I'll describe below",
];

const AVAILABILITY = [
  "As soon as possible",
  "This week",
  "Next week",
  "Flexible / just contact me",
  "Weekend only",
];

function buildMessage(data: {
  service: string;
  name: string;
  phone: string;
  year: string;
  make: string;
  model: string;
  damageType: string;
  description: string;
  availability: string;
}): string {
  const lines = [
    "🔧 *SERVICE QUOTE REQUEST — Sanchez Auto Services*",
    "",
    `👤 Name: ${data.name || "—"}`,
    `📞 Phone/WhatsApp: ${data.phone || "—"}`,
    "",
    `🚗 Vehicle: ${[data.year, data.make, data.model].filter(Boolean).join(" ") || "—"}`,
    `🔩 Service Needed: ${data.service || "—"}`,
    `💥 Damage / Issue: ${data.damageType || "—"}`,
    data.description ? `📝 Details: ${data.description}` : "",
    `📅 Availability: ${data.availability || "—"}`,
    "",
    "_Sent via sanchezauto.com quote form_",
  ];
  return lines.filter((l) => l !== "").join("\n").trim();
}

export function ServiceQuoteModal({ service, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [damageType, setDamageType] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = buildMessage({ service: service ?? "", name, phone, year, make, model, damageType, description, availability });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const inputClass = "w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition focus:ring-2";
  const inputStyle = {
    background: "#1a1730",
    borderColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider";
  const labelStyle = { color: "rgba(255,255,255,0.45)" };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80]"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
        aria-hidden
      />

      {/* Bottom sheet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Quote request for ${service}`}
        className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[92svh] flex-col overflow-hidden rounded-t-3xl"
        style={{ background: "#120f1e" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1" aria-hidden>
          <div className="h-1 w-10 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Sheet header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#e04e28" }}>
              Quote Request
            </p>
            <h2 className="text-base font-black text-white">{service}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
            aria-label="Close"
          >
            <X className="size-4 text-white" />
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4">
          {sent ? (
            /* ── Success ── */
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div
                className="flex size-16 items-center justify-center rounded-full"
                style={{ background: "rgba(37,211,102,0.12)" }}
              >
                <MessageCircle className="size-8" style={{ color: "#25d366" }} aria-hidden />
              </div>
              <h3 className="text-lg font-black text-white">WhatsApp opened!</h3>
              <p className="max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Your quote request is pre-filled. Tap <strong className="text-white">Send</strong> in WhatsApp, then attach any photos of your vehicle for us to review.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-sm underline"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={labelStyle} htmlFor="q-name">Your Name</label>
                  <input id="q-name" className={inputClass} style={inputStyle} placeholder="Maria G." required value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle} htmlFor="q-phone">Phone / WhatsApp</label>
                  <input id="q-phone" className={inputClass} style={inputStyle} type="tel" placeholder="(973) 555-0101" required value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
                </div>
              </div>

              {/* Vehicle */}
              <div>
                <label className={labelClass} style={labelStyle}>Vehicle</label>
                <div className="grid grid-cols-3 gap-2">
                  <input className={inputClass} style={inputStyle} placeholder="Year" maxLength={4} value={year} onChange={e => setYear(e.target.value)} />
                  <input className={inputClass} style={inputStyle} placeholder="Make" value={make} onChange={e => setMake(e.target.value)} />
                  <input className={inputClass} style={inputStyle} placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
                </div>
              </div>

              {/* Damage type */}
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="q-damage">Damage / Issue Type</label>
                <div className="relative">
                  <select
                    id="q-damage"
                    required
                    value={damageType}
                    onChange={e => setDamageType(e.target.value)}
                    className="w-full appearance-none rounded-xl border px-3.5 py-3 pr-10 text-sm outline-none"
                    style={{ ...inputStyle, borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <option value="" disabled>Select type…</option>
                    {DAMAGE_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 opacity-40 text-white" aria-hidden />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="q-desc">Describe the Issue <span className="normal-case font-normal opacity-50">(optional)</span></label>
                <textarea
                  id="q-desc"
                  rows={3}
                  placeholder="Any extra details — how it happened, what you hear/see, etc."
                  className="w-full resize-none rounded-xl border px-3.5 py-3 text-sm outline-none transition"
                  style={inputStyle}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              {/* Availability */}
              <div>
                <label className={labelClass} style={labelStyle}>Preferred Availability</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY.map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvailability(a)}
                      className="rounded-xl px-3 py-2 text-xs font-semibold transition-all"
                      style={{
                        background: availability === a ? "#e04e28" : "rgba(255,255,255,0.06)",
                        color: availability === a ? "#fff" : "rgba(255,255,255,0.55)",
                        border: availability === a ? "1px solid #e04e28" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-black text-white transition-all active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
                  boxShadow: "0 6px 24px rgba(37,211,102,0.30)",
                  marginTop: "8px",
                }}
              >
                <MessageCircle className="size-5" aria-hidden />
                Send Quote via WhatsApp
              </button>

              <p className="text-center text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                Opens WhatsApp with your details pre-filled — hit Send to submit.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
