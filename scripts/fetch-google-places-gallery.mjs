#!/usr/bin/env node
/**
 * Downloads Google Maps listing photos + top reviews (Places API New) locally.
 *
 * Prerequisites:
 *   - Google Cloud project with Places API (New) + billing enabled
 *   - API key in env: GOOGLE_PLACES_API_KEY
 *
 * Optional: GOOGLE_PLACE_ID forces a specific listing (ChIJ…) so Text Search isn’t needed.
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=... node scripts/fetch-google-places-gallery.mjs
 *
 * Outputs:
 *   public/google-maps-gallery/manifest.json
 *   public/google-maps-gallery/place-photo-*.jpg
 *   public/google-maps-gallery/review-avatar-*.jpg (when available)
 */

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.join(process.cwd(), "public/google-maps-gallery");
const SEARCH_QUERY =
  process.env.PLACES_TEXT_QUERY?.trim() ||
  "Sanchez Auto Services LLC 99 E Railway Ave Paterson NJ 07503";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY?.trim();

function slug(s) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 16);
}

async function ensureDir() {
  await fs.mkdir(ROOT, { recursive: true });
}

async function postJson(url, headers, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const txt = await res.text();
  if (!res.ok) {
    throw new Error(`${url} failed ${res.status}: ${txt.slice(0, 800)}`);
  }
  try {
    return JSON.parse(txt);
  } catch {
    throw new Error(`${url}: expected JSON`);
  }
}

async function getJson(url, headers) {
  const res = await fetch(url, {
    headers,
  });
  const txt = await res.text();
  if (!res.ok) {
    throw new Error(`${url} failed ${res.status}: ${txt.slice(0, 800)}`);
  }
  try {
    return JSON.parse(txt);
  } catch {
    throw new Error(`${url}: expected JSON`);
  }
}

async function downloadBinary(urlBuffer) {
  const res = await fetch(urlBuffer);
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`binary download failed ${res.status}: ${t.slice(0, 240)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

async function downloadPlacePhoto(photoResourceName, maxWidthPx) {
  const u = new URL(
    `https://places.googleapis.com/v1/${encodeURIComponent(photoResourceName)}/media`
  );
  u.searchParams.set("maxWidthPx", String(maxWidthPx));
  u.searchParams.set("key", API_KEY);
  return downloadBinary(u);
}

async function resolvePlaceResourceName(placeIdCandidate) {
  const clean = placeIdCandidate?.trim();
  if (!clean) return null;
  if (clean.startsWith("places/")) return clean;
  return `places/${clean}`;
}

async function textSearchPlace() {
  return postJson(
    "https://places.googleapis.com/v1/places:searchText",
    {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.name,places.id,places.displayName,places.formattedAddress,places.types",
    },
    { textQuery: SEARCH_QUERY, languageCode: "en", regionCode: "US" }
  );
}

const FIELD_DETAILS_WITH_REVIEWS = [
  "id",
  "name",
  "displayName",
  "formattedAddress",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "photos",
  "reviews",
  "reviews.rating",
  "reviews.relativePublishTimeDescription",
  "reviews.text",
  "reviews.originalText",
  "reviews.publishTime",
  "reviews.authorAttribution",
  "reviews.googleMapsUri",
].join(",");

const FIELD_DETAILS_CORE = [
  "id",
  "name",
  "displayName",
  "formattedAddress",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "photos",
].join(",");

async function placeDetails(placeResourceName, fieldMask) {
  const encoded = encodeURIComponent(placeResourceName);
  const detailUrl = `https://places.googleapis.com/v1/${encoded}`;
  return getJson(detailUrl, {
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": fieldMask,
  });
}

function localizedText(pt) {
  if (!pt) return "";
  if (typeof pt === "string") return pt;
  return pt.text ?? "";
}

async function maybeDownloadReviewerAvatar(photoUri, idx) {
  if (!photoUri) return undefined;
  try {
    const buf = await downloadBinary(photoUri);
    const file = path.join(ROOT, `review-avatar-${idx}-${slug(photoUri)}.jpg`);
    await fs.writeFile(file, buf);
    return "/" + path.posix.join("google-maps-gallery", path.basename(file));
  } catch {
    return undefined;
  }
}

async function main() {
  await ensureDir();
  if (!API_KEY) {
    console.error(
      "Missing GOOGLE_PLACES_API_KEY. Set it for this terminal session, then re-run:\n  GOOGLE_PLACES_API_KEY=... node scripts/fetch-google-places-gallery.mjs\n"
    );
    process.exit(1);
  }

  let resourceName =
    process.env.GOOGLE_PLACE_ID?.trim().length > 0
      ? await resolvePlaceResourceName(process.env.GOOGLE_PLACE_ID.trim())
      : null;

  if (!resourceName) {
    console.log(`Searching: ${SEARCH_QUERY}`);
    const searched = await textSearchPlace();
    const places = searched.places ?? [];
    const match =
      places.find((p) =>
        localizedText(p.displayName)?.toLowerCase().includes("sanchez")
      ) ?? places[0];
    resourceName =
      typeof match?.name === "string" && match.name.length > 0 ? match.name : null;
    if (!resourceName) {
      console.error(JSON.stringify(searched, null, 2));
      throw new Error("Could not resolve a listing from Places Text Search.");
    }
    console.log(`Using place resource: ${resourceName}`);
    if (!process.env.GOOGLE_PLACE_ID) {
      const idHint = typeof match?.id === "string" ? match.id : "";
      console.log(
        `Tip: verify this listing in Google Maps, then pin it with GOOGLE_PLACE_ID=${idHint}`
      );
    }
  }

  console.log(`Place Details GET for ${resourceName}`);
  let details;
  try {
    details = await placeDetails(resourceName, FIELD_DETAILS_WITH_REVIEWS);
  } catch (e) {
    console.warn(
      "Full Details (with reviews) failed — retrying without `reviews`. Some GCP projects deny review fields unless Enterprise / Atmosphere is enabled.\n",
      e.message ?? e
    );
    details = await placeDetails(resourceName, FIELD_DETAILS_CORE);
  }

  const displayName =
    localizedText(details.displayName) || "Listing";
  const googleMapsUri = details.googleMapsUri ?? "";
  const placeId = typeof details.id === "string" ? details.id : resourceName.replace(/^places\//, "");

  const placePhotos = [];
  let i = 0;
  const photosArr = Array.isArray(details.photos) ? details.photos : [];
  for (const photo of photosArr.slice(0, 10)) {
    if (!photo?.name) continue;
    try {
      const buf = await downloadPlacePhoto(photo.name, 1600);
      const file = path.join(
        ROOT,
        `place-photo-${i}-${slug(photo.name)}.jpg`
      );
      await fs.writeFile(file, buf);
      const authorAttributions = Array.isArray(photo.authorAttributions)
        ? photo.authorAttributions
        : [];
      placePhotos.push({
        file:
          "/" + path.posix.join("google-maps-gallery", path.basename(file)),
        widthPx: photo.widthPx,
        heightPx: photo.heightPx,
        authorAttributions: authorAttributions.map((a) => ({
          displayName: a?.displayName,
          uri: a?.uri,
        })),
        googleMapsPhotoUri:
          typeof photo.googleMapsUri === "string" ? photo.googleMapsUri : undefined,
      });
      i += 1;
    } catch (err) {
      console.warn(`Skip photo ${photo.name}:`, err.message ?? err);
    }
  }

  const reviewsOut = [];
  const reviewsArr = Array.isArray(details.reviews) ? details.reviews : [];
  let rIdx = 0;
  for (const r of reviewsArr.slice(0, 5)) {
    const text =
      localizedText(r.text)?.trim() ||
      localizedText(r.originalText)?.trim() ||
      "";
    const excerpt =
      text.length > 380 ? `${text.slice(0, 380)}…`.replace(/\s+\S*$/, "…") : text;
    const author = r.authorAttribution ?? {};
    const avatarLocal = await maybeDownloadReviewerAvatar(
      typeof author.photoUri === "string" ? author.photoUri : undefined,
      rIdx
    );

    reviewsOut.push({
      rating: typeof r.rating === "number" ? r.rating : undefined,
      relativePublishTimeDescription:
        typeof r.relativePublishTimeDescription === "string"
          ? r.relativePublishTimeDescription
          : undefined,
      textExcerpt: excerpt,
      originalTextChars: text.length,
      authorName:
        typeof author.displayName === "string" ? author.displayName : "Google user",
      authorUri: typeof author.uri === "string" ? author.uri : undefined,
      googleMapsReviewUri:
        typeof r.googleMapsUri === "string" ? r.googleMapsUri : undefined,
      avatarFile: avatarLocal,
    });
    rIdx += 1;
  }

  const manifest = {
    fetchedAt: new Date().toISOString(),
    sourceNote:
      "Images are synced from Google Maps Platform (Places API) for this business listing — not scraped from Maps HTML. Listing photos often include imagery submitted by Maps users; reviewer profile photos appear when Google returns authorAttribution.photoUri.",
    placeId,
    googleMapsListingUri: googleMapsUri || undefined,
    displayName,
    rating: typeof details.rating === "number" ? details.rating : undefined,
    userRatingCount:
      typeof details.userRatingCount === "number" ? details.userRatingCount : undefined,
    placePhotos,
    reviews: reviewsOut,
  };

  const manifestPath = path.join(ROOT, "manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Wrote ${manifestPath}`);
  console.log(`Place photos saved: ${placePhotos.length}`);
  console.log(`Review highlights saved: ${reviewsOut.length}`);
}

await main();
