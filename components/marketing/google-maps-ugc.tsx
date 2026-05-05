import Image from "next/image";
import { Star } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";

import { Separator } from "@/components/ui/separator";
import type { MapsGalleryManifest } from "@/lib/maps-manifest";
import { site } from "@/lib/site-content";
import { MapsSyncHint } from "@/components/marketing/maps-sync-hint";

async function loadManifest(): Promise<MapsGalleryManifest | null> {
  const filePath = path.join(process.cwd(), "public/google-maps-gallery/manifest.json");
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as MapsGalleryManifest;
  } catch {
    return null;
  }
}

/** Live Google-synced visuals + review excerpts (populate via Places API sync script). */
export async function GoogleMapsUgCSection() {
  const data = await loadManifest();

  if (!data?.placePhotos?.length && !data?.reviews?.length) {
    return <MapsSyncHint />;
  }

  const listingUrl = data.googleMapsListingUri ?? site.mapSearchUrl;
  const summary =
    typeof data.rating === "number" && typeof data.userRatingCount === "number"
      ? `${data.displayName}: ${data.rating.toFixed(1)} ★ · ${data.userRatingCount} Google ratings (live sync ${new Date(data.fetchedAt).toLocaleDateString()})`
      : `${data.displayName} — synced ${new Date(data.fetchedAt).toLocaleDateString()}`;

  return (
    <section className="border-y bg-muted/20 py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight">From Google Maps</h2>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href={listingUrl}
              className="inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View listing on Google Maps
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              aria-label="Google Maps"
            >
              <span aria-hidden style={{ letterSpacing: "0.04em", fontWeight: 600 }}>
                Powered by&nbsp;Google
              </span>
            </a>
          </div>
          {data.sourceNote ? (
            <p className="text-xs text-muted-foreground leading-relaxed max-w-prose">{data.sourceNote}</p>
          ) : null}
        </div>

        {data.placePhotos.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">Listing photos</h3>
            <p className="text-sm text-muted-foreground">
              Imagery surfaced on Google Maps—often blends owner uploads and Photos shared by Maps users.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.placePhotos.map((photo) => (
                <li key={photo.file} className="overflow-hidden rounded-xl border bg-card shadow-sm">
                  <div className="relative aspect-[4/3] w-full bg-muted">
                    <Image
                      src={photo.file}
                      alt={photo.authorAttributions?.[0]?.displayName ?? "Google Maps contributor photo"}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-1 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    {(photo.authorAttributions ?? []).map((attr) =>
                      attr?.displayName ? (
                        <p key={attr.displayName + (attr.uri ?? "")}>
                          {attr.uri ? (
                            <a
                              href={attr.uri}
                              className="text-foreground underline-offset-4 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {attr.displayName}
                            </a>
                          ) : (
                            <span>{attr.displayName}</span>
                          )}
                        </p>
                      ) : null
                    )}
                    {photo.googleMapsPhotoUri ? (
                      <p>
                        <a
                          href={photo.googleMapsPhotoUri}
                          className="underline-offset-4 hover:underline text-foreground"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Maps
                        </a>
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.reviews.length > 0 ? (
          <>
            {data.placePhotos.length > 0 ? <Separator /> : null}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight">Recent Google reviewers</h3>
              <p className="text-sm text-muted-foreground">
                Excerpts are shortened for readability. Star ratings mirror Google when available. Faces are reviewer
                profile photos when Maps supplies them—they are{' '}
                <strong className="text-foreground">not</strong> the same thing as attached review photos shown inside
                the Maps app UI.
              </p>
              <ul className="grid gap-4 md:grid-cols-2">
                {data.reviews.map((r, idx) => (
                  <li
                    key={
                      `${r.authorName}:${r.relativePublishTimeDescription ?? ""}:${idx}:${r.textExcerpt.slice(0, 24)}`
                    }
                    className="rounded-xl border bg-card p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {r.avatarFile ? (
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-full border bg-muted">
                          <Image
                            src={r.avatarFile}
                            alt={`${r.authorName} reviewer profile`}
                            width={48}
                            height={48}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                          {(r.authorName ?? "?")[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-foreground">{r.authorName}</span>
                          {typeof r.rating === "number" ? (
                            <span className="inline-flex items-center gap-1 text-amber-500 text-xs font-semibold uppercase tracking-wide">
                              <Star className="size-3 fill-current text-amber-500" aria-hidden />
                              {r.rating.toFixed(1)} / 5
                            </span>
                          ) : null}
                          {r.relativePublishTimeDescription ? (
                            <span className="text-xs text-muted-foreground">{r.relativePublishTimeDescription}</span>
                          ) : null}
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          “{r.textExcerpt.replace(/^"+|"+$/g, "")}”
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                          {r.googleMapsReviewUri ? (
                            <a
                              href={r.googleMapsReviewUri}
                              className="font-medium text-foreground underline-offset-4 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read review on Maps
                            </a>
                          ) : (
                            <a
                              href={listingUrl}
                              className="font-medium text-foreground underline-offset-4 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open Google Maps
                            </a>
                          )}
                          {r.authorUri ? (
                            <a
                              href={r.authorUri}
                              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Author profile
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
