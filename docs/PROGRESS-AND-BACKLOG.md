# Sanchez Auto LLC — Progress & Backlog

_Last updated: **2026-08-12** (tiers pushed) · Path: `~/dev/CLAUDE WORLD/08 sanchez-auto-llc`_

Use this file to resume work **ASAP**. Local verify: `npm run build && npm run preview:site` → http://127.0.0.1:4173/

---

## Status snapshot

| Track | State |
|-------|--------|
| **Last push to GitHub/Vercel** | **`1a79ff7`** — Tier 1–3 shipped (IG before/after, landings, FAQ, photos, after-hours, ES) |
| **Prior feature pack** | `1128379` — Anime.js, explainer video, maps, why-book, SEO |
| **Working tree** | Clean after push (docs may lag until this note is committed) |
| **Live URL** | https://sanchez-auto-llc.vercel.app/ (Vercel auto-deploys `main`) |
| **Custom domain** | None yet — guide in [[CUSTOM-DOMAIN.md]] |

---

## DONE (already on `main` / live after prior push)

### Conversion pack (`1128379`)
- [x] **Anime.js** hero entrance + CTA pulse (reduced-motion safe)
- [x] **How it works** section + `/videos/how-dropoff-works.mp4` (shop slideshow; not full Vox collage)
- [x] **CleanMapsProof** — shop photos + Google Maps embed + GBP / write-review links
- [x] **Why-book** service cards (most-booked collision, 3-step chips, clearer CTAs)
- [x] **SEO** — meta/OG shop image, JSON-LD aggregateRating + multi-image
- [x] `animejs` dependency; build script `next build --webpack`

### Tooling / vault (outside this repo)
- [x] **Claude-Mem** installed & healthy (`:37701`)
- [x] **Vox Director** skill cloned → `~/.claude/skills/vox-director/`
- [x] Activation queue + Top 5 notes in Obsidian AI Toolkit
- [x] UI Dashboard Command Center refresh pushed separately

---

## DONE & PUSHED — Tier 1–3 (`1a79ff7`)

### Tier 1
- [x] Reviews section: stronger “official Google” link / sample disclaimer
- [x] Estimate modal: **photo multi-select** + WA copy listing file names/count
- [x] **After-hours hero CTA** — “Text for tomorrow drop-off” when shop closed
- [x] Domain how-to: `docs/CUSTOM-DOMAIN.md`

### Tier 2
- [x] **Before/after gallery** from Instagram **@francisco4704** → `public/before-after/` + `CleanWorkGallery`
- [x] Service landings: `/services/collision`, `/paint`, `/mechanical`
- [x] **Insurance & claims FAQ** section (`CleanInsuranceFaq`)
- [x] Hero **EN / Español** chips + `?lang=es` boot
- [x] Service cards link “More about this service →”

### Tier 3
- [x] Compressed IG images · public clutter cleanup · analytics events · sitemap

---

## NOT DONE / open backlog (next ASAP)

### P0 — polish after deploy
- [ ] **Smoke live site** after Vercel finishes (home, work gallery, estimate photos, ES, service pages)
- [ ] **Re-check** before/after **pairs** on IG — only Amazon van pair was human-confirmed; re-pair if wrong

### P1 — content & trust
- [ ] **Real Google reviews sync** — `GOOGLE_PLACES_API_KEY` + `npm run gallery:pull` → fill `public/google-maps-gallery/` (still empty)
- [ ] **True Vox collage explainer** — set `ATLASCLOUD_API_KEY`, run vox-director skill, replace slideshow MP4
- [ ] **Curate IG captions** on work pairs (IG API returned empty captions)
- [ ] **Formspree / email list** for newsletter (footer still WhatsApp-only)

### P2 — product
- [ ] **Custom domain** — buy domain → Vercel Domains → `NEXT_PUBLIC_SITE_URL` → robots/sitemap Host (see CUSTOM-DOMAIN.md)
- [ ] **GBP website field** → point at final URL (Vercel or custom)
- [ ] **Lighthouse mobile** — hero LCP, gallery weight, optional WebP
- [ ] **Weekly CTA analytics** digest (or Dashboard X card)

### P3 — nice later
- [ ] Pake dock shell for shop owner (not customer-facing)
- [ ] More IG posts if account grows (re-run download script pattern)
- [ ] Spanish meta titles on service landings (EN SEO only today)

---

## Explicitly deferred / out of scope (unless reopened)

- Full Rocket/Lovable rebuild  
- 3DTuning / car configurator on marketing site  
- Chatbot before photo-estimate + reviews are solid  
- Buying a domain *for* the user (they said no domain yet)

---

## Related paths

| What | Where |
|------|--------|
| Code | `~/dev/CLAUDE WORLD/08 sanchez-auto-llc` |
| GitHub | `samuelsanchez175-oss/sanchez-auto-services-llc` |
| Vox skill | `~/.claude/skills/vox-director/` |
| Vault Command Center | `Pictures/OB CLAUDE vault/00_Project_Command_Center.md` |
| Activation queue | `…/Imported AI Clippings/Activation Queue — Skills & Banks 2026-08-12.md` |

---

## Jump-back-in prompt (paste next session)

```
Project: Sanchez Auto LLC (~/dev/CLAUDE WORLD/08 sanchez-auto-llc).
Read docs/PROGRESS-AND-BACKLOG.md first.
State: Tier 1–3 built locally (IG before/after, service landings, FAQ, photo estimate, after-hours, ES chips) but NOT committed/pushed. Live site still on 1128379.
Do next: (1) confirm local preview still OK; (2) commit + push main so Vercel matches; (3) if time, Places gallery pull or re-pair before/after from @francisco4704. Don't force-push.
```
