# Sanchez Auto LLC — Progress & Backlog

_Last updated: **2026-08-12** · Path: `~/dev/CLAUDE WORLD/08 sanchez-auto-llc`_

Use this file to resume work **ASAP**. Local verify: `npm run build && npm run preview:site` → http://127.0.0.1:4173/

---

## Status snapshot

| Track | State |
|-------|--------|
| **Last push to GitHub/Vercel** | `1128379` — 5 conversion upgrades (Anime.js, explainer video, maps, why-book, SEO) |
| **Tier 1–3 batch (local)** | **Built & previewed** · **NOT committed / NOT pushed** (~27 dirty paths) |
| **Live URL** | https://sanchez-auto-llc.vercel.app/ (does **not** include Tier 1–3 until push) |
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

## DONE LOCALLY — not committed (verify then push)

### Tier 1
- [x] Reviews section: stronger “official Google” link / sample disclaimer
- [x] Estimate modal: **photo multi-select** + WA copy listing file names/count (web can’t auto-attach to WhatsApp)
- [x] **After-hours hero CTA** — “Text for tomorrow drop-off” when shop closed
- [x] Domain how-to: `docs/CUSTOM-DOMAIN.md`

### Tier 2
- [x] **Before/after gallery** from Instagram **@francisco4704** → `public/before-after/` (12 images) + `CleanWorkGallery` drag-compare
- [x] Service landings: `/services/collision`, `/paint`, `/mechanical`
- [x] **Insurance & claims FAQ** section (`CleanInsuranceFaq`)
- [x] Hero **EN / Español** chips + `?lang=es` boot in `lib/locale.tsx`
- [x] Service cards link “More about this service →”

### Tier 3
- [x] Compressed IG images (~2.3MB set)
- [x] Removed public clutter (default SVGs, logo `.bak`, `__photo_preview.html`)
- [x] Analytics events: `gallery_compare`, `photo_attach`, `locale_toggle`, `after_hours_cta`, …
- [x] Sitemap entries for service landings

### Key files (uncommitted)
```
app/services/[slug]/page.tsx
components/marketing/clean/CleanWorkGallery.tsx
components/marketing/clean/CleanInsuranceFaq.tsx
components/marketing/service-landing-view.tsx
components/marketing/clean/CleanHero.tsx          (modified)
components/marketing/service-quote-modal1515.tsx  (photos)
lib/work-gallery.ts
lib/service-landings.ts
public/before-after/*
docs/CUSTOM-DOMAIN.md
docs/PROGRESS-AND-BACKLOG.md   (this file)
public/sitemap.xml
```

### ASAP resume command
```bash
cd ~/dev/CLAUDE\ WORLD/08\ sanchez-auto-llc
git status -sb
# if local looks good:
git add -A && git commit -m "feat: tiers 1–3 — IG before/after, service landings, FAQ, photos, after-hours"
git push origin main
# Vercel auto-deploys
```

---

## NOT DONE / open backlog (do ASAP)

### P0 — ship the local batch
- [ ] **User verify** local preview (home, work gallery pairs, estimate photos, ES, service pages)
- [ ] **Commit + push** Tier 1–3 so Vercel matches localhost
- [ ] **Re-check** before/after **pairs** on IG — only Amazon van pair was human-confirmed; other pairs are sequential stage guesses (re-pair if wrong)

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
