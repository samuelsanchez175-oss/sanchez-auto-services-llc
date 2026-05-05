"use client";

import {
  Car, Paintbrush, Settings, Wrench, CircleOff,
  Scan, Gauge, Droplets, ArrowUpDown, Zap, Wind, CircleDot,
} from "lucide-react";
import { services as serviceEntries } from "@/lib/site-content";
import type { ServiceId } from "@/lib/catalog/types";
import { useCatalog } from "@/lib/locale";

const iconMap: Record<string, React.ElementType> = {
  "car-front": Car,
  paintbrush: Paintbrush,
  cog: Settings,
  wrench: Wrench,
  "circle-stop": CircleOff,
  "scan-line": Scan,
  gauge: Gauge,
  droplets: Droplets,
  "arrow-up-down": ArrowUpDown,
  zap: Zap,
  wind: Wind,
  "circle-dot": CircleDot,
};

/** Shared dense grid — homepage & /services. */
export function ServicesGridDense() {
  const c = useCatalog();

  return (
    <div className="grid gap-3 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
      {serviceEntries.map((s) => {
        const localized = c.serviceCopy[s.id as ServiceId];
        const title = localized?.title ?? s.title;
        const description = localized?.description ?? s.description;
        const Icon = iconMap[s.icon] ?? Wrench;

        return (
          <div
            key={s.id}
            className="flex flex-col gap-3 rounded-xl p-5 transition-shadow hover:shadow-md"
            style={{
              background: "#ffffff",
              border: "1.5px solid #e5ddd4",
              boxShadow: "0 2px 8px rgba(26,21,32,0.04)",
            }}
          >
            <div
              className="flex size-10 items-center justify-center rounded-lg shrink-0"
              style={{ background: "rgba(192,57,43,0.08)" }}
            >
              <Icon className="size-5" style={{ color: "#C0392B" }} aria-hidden />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: "#1a1520" }}>{title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#6b6080" }}>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
