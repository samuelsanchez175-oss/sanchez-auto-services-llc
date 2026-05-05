"use client";

import { useCatalog } from "@/lib/locale";

export function MapsSyncHint() {
  const c = useCatalog();

  return (
    <section className="border-y bg-muted/20 py-16">
      <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">{c.mapsSync.title}</h2>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">{c.mapsSync.body}</p>
        <pre className="overflow-x-auto rounded-lg border bg-zinc-950 p-4 text-xs text-zinc-100 md:text-sm">
          {c.mapsSync.steps}
        </pre>
        <p className="text-xs text-muted-foreground">{c.mapsSync.attribution}</p>
        <p className="text-xs text-muted-foreground">
          <a
            href="https://developers.google.com/maps/documentation/places/web-service/place-photos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Places photo docs
          </a>
        </p>
      </div>
    </section>
  );
}
