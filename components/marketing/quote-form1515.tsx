"use client";

import { useRef, useState } from "react";
import { MessageCircle, Phone, Camera, X, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site-content";
import { useCatalog } from "@/lib/locale";
import {
  buildStructuredWhatsAppMessage,
  formatVehicle,
  openWhatsAppWithMessage,
} from "@/lib/whatsapp-quote";

/** Build a RockAuto catalog URL from year/make/model */
function rockAutoUrl(year: string, make: string, model: string): string {
  const base = "https://www.rockauto.com/en/catalog";
  if (make && model && year) {
    return `${base}/${encodeURIComponent(make.toLowerCase())},${encodeURIComponent(year)},${encodeURIComponent(model.toLowerCase())}`;
  }
  if (make) return `${base}/${encodeURIComponent(make.toLowerCase())}`;
  return "https://www.rockauto.com";
}

export function QuoteSection() {
  const q = useCatalog().quote;
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [sent, setSent] = useState(false);

  const vehicleLabel = formatVehicle(year, make, model);
  const serviceLabel =
    q.serviceOptions.find((o) => o.value === service)?.label ?? service;

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setPhotos((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 6));
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const text = buildStructuredWhatsAppMessage({
      name,
      phone,
      email,
      year,
      make,
      model,
      service: serviceLabel,
      issue: serviceLabel,
      details: message,
      photoCount: photos.length,
    });
    openWhatsAppWithMessage(text);
    setSent(true);
  }

  return (
    <section
      id="quote"
      className="scroll-mt-20 py-14 sm:py-20"
      style={{ background: "#f5f0eb" }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Section label */}
        <p
          className="mb-5 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "#FB8C33" }}
          aria-hidden
        >
          WhatsApp lead
        </p>

        <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#07253F" }}>
          {q.title}
        </h2>
        <p className="mb-2 text-base leading-relaxed" style={{ color: "#6b6080" }}>
          {q.lead}
        </p>

        {/* WhatsApp badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
          style={{ background: "#dcfce7", color: "#15803d" }}>
          <MessageCircle className="size-3.5" aria-hidden />
          Opens WhatsApp with client · car · problem pre-filled
        </div>

        {sent ? (
          /* ── Success state ── */
          <div
            className="space-y-4 rounded-xl p-8 text-center"
            style={{ background: "#ffffff", border: "1.5px solid #e5ddd4" }}
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-full"
              style={{ background: "#dcfce7" }}>
              <MessageCircle className="size-7" style={{ color: "#16a34a" }} aria-hidden />
            </div>
            <h3 className="text-xl font-bold" style={{ color: "#07253F" }}>WhatsApp opened!</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6b6080" }}>
              Your quote request is pre-filled. Hit <strong>Send</strong> in WhatsApp, then attach any photos of your vehicle damage directly in the chat.
            </p>
            {year && make && (
              <a
                href={rockAutoUrl(year, make, model)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold no-underline transition-all hover:bg-gray-50"
                style={{ color: "#FB8C33", borderColor: "#FB8C33" }}
              >
                <ExternalLink className="size-4" aria-hidden />
                Browse parts for your {vehicleLabel} on RockAuto
              </a>
            )}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="block w-full pt-2 text-sm underline-offset-4 hover:underline"
              style={{ color: "#6b6080" }}
            >
              Start a new quote
            </button>
          </div>
        ) : (
          /* ── Quote form ── */
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl p-6 sm:p-8"
            style={{ background: "#ffffff", border: "1.5px solid #e5ddd4", boxShadow: "0 2px 12px rgba(26,21,32,0.06)" }}
          >
            {/* Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="name" style={{ color: "#2e2840" }}>{q.name}</Label>
              <Input
                id="name" required autoComplete="name"
                placeholder={q.name}
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Phone + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="phone" style={{ color: "#2e2840" }}>{q.phone}</Label>
                <Input
                  id="phone" type="tel" required autoComplete="tel"
                  placeholder="(973) 555‑0101"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email" style={{ color: "#2e2840" }}>{q.emailOptional}</Label>
                <Input
                  id="email" type="email" autoComplete="email"
                  placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Service */}
            <div className="grid gap-1.5">
              <Label htmlFor="service" style={{ color: "#2e2840" }}>{q.serviceNeeded}</Label>
              <select
                id="service" required
                value={service} onChange={(e) => setService(e.target.value)}
                className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="" disabled>{q.selectPlaceholder}</option>
                {q.serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Vehicle: year / make / model (structured for shop WhatsApp) */}
            <div className="grid gap-1.5">
              <Label style={{ color: "#2e2840" }}>{q.vehicleOptional}</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  id="year"
                  placeholder="Year"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                />
                <Input
                  id="make"
                  placeholder="Make"
                  required
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                />
                <Input
                  id="model"
                  placeholder="Model"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              {year && make && (
                <a
                  href={rockAutoUrl(year, make, model)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs no-underline hover:underline"
                  style={{ color: "#FB8C33" }}
                >
                  <ExternalLink className="size-3" aria-hidden />
                  Preview parts on RockAuto →
                </a>
              )}
            </div>

            {/* Details */}
            <div className="grid gap-1.5">
              <Label htmlFor="message" style={{ color: "#2e2840" }}>{q.message}</Label>
              <Textarea
                id="message" rows={4}
                placeholder="Describe what happened or what you need — bumper crack, check engine light, oil change, etc."
                value={message} onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Photo upload */}
            <div className="grid gap-2">
              <Label style={{ color: "#2e2840" }}>
                Photos <span className="font-normal" style={{ color: "#6b6080" }}>(optional — up to 6)</span>
              </Label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4 text-sm font-medium transition-colors hover:border-solid"
                style={{ borderColor: "#d4c8c0", color: "#6b6080" }}
              >
                <Camera className="size-4" aria-hidden />
                {photos.length === 0 ? "Tap to add photos of your vehicle" : `${photos.length} photo${photos.length > 1 ? "s" : ""} selected — tap to add more`}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotos}
              />
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((f, i) => (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(f)}
                        alt={f.name}
                        className="size-16 rounded-lg object-cover"
                        style={{ border: "1.5px solid #e5ddd4" }}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-white"
                        style={{ background: "#FB8C33" }}
                        aria-label="Remove photo"
                      >
                        <X className="size-3" aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {photos.length > 0 && (
                <p className="text-xs" style={{ color: "#6b6080" }}>
                  📎 After WhatsApp opens, attach these photos directly in the chat for the shop to review.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-lg py-3.5 text-base font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
                boxShadow: "0 4px 16px rgba(37,211,102,0.30)",
              }}
            >
              <MessageCircle className="size-5" aria-hidden />
              Send Quote via WhatsApp
            </button>

            {/* Call fallback */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: "#e5ddd4" }} />
              <span className="text-xs" style={{ color: "#a09cb0" }}>or call us directly</span>
              <div className="h-px flex-1" style={{ background: "#e5ddd4" }} />
            </div>
            <div className="flex flex-wrap gap-3">
              {site.phones.map((p) => (
                <a
                  key={p.tel}
                  href={p.tel}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white no-underline transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #FB8C33 0%, #E07020 100%)",
                    minWidth: "140px",
                  }}
                >
                  <Phone className="size-4" aria-hidden />
                  {p.display}
                </a>
              ))}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
