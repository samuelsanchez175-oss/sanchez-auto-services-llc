import fs from "node:fs";
import path from "node:path";

const REMOTE_FALLBACK =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=85&w=1920&auto=format&fit=crop";

const LOCAL_RELATIVE_ORDER = ["media/hero.jpg", "media/hero.webp"] as const;

/** Prefer a JPEG/WebP shipped to `/public/media/*` once you have storefront photos; else Unsplash stand-in. */
export function resolveHeroBackgroundSrc(): string {
  const cwd = process.cwd();

  for (const rel of LOCAL_RELATIVE_ORDER) {
    const abs = path.join(cwd, "public", ...rel.split("/"));
    if (fs.existsSync(abs)) {
      return `/${rel}`;
    }
  }

  return REMOTE_FALLBACK;
}
