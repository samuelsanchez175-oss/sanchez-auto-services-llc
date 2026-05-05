import { whyUs } from "@/lib/site-content";
import {
  Users,
  Car,
  ShieldCheck,
  DollarSign,
  Clock,
  Star,
} from "lucide-react";

const icons: React.ElementType[] = [Users, Car, ShieldCheck, DollarSign, Clock, Star];

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ background: "#1a1520" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section label */}
        <div
          className="section-label-line mb-5"
          style={{ color: "#e04e28", borderColor: "rgba(255,255,255,0.08)" }}
          aria-hidden
        >
          <style>{`.section-label-line::after { background: rgba(255,255,255,0.08) !important; }`}</style>
          Why Choose Us
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          The Sanchez Difference
        </h2>
        <p className="text-base leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "520px" }}>
          We&apos;re not a chain shop. We&apos;re a family business that takes pride in every job
          and stands behind our work.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = icons[i] ?? Star;
            return (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(224,78,40,0.15)" }}
                >
                  <Icon className="size-5" style={{ color: "#e04e28" }} aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-1">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
