# Custom domain — when you don’t have one yet

You can ship and rank on **`https://sanchez-auto-llc.vercel.app`** today. A custom domain is optional; add it when you buy one.

## Why add a domain later

- Looks more professional than `*.vercel.app`
- Matches Google Business Profile website field
- Cleaner ads / business cards
- You control branding (e.g. `sanchezautoservices.com`)

## How to do it (step-by-step)

### 1. Buy a domain
Registrar options: **Namecheap**, **Google Domains / Squarespace**, **Cloudflare Registrar**, **Porkbun**, **GoDaddy**.

Pick a name that matches GBP when possible (shop name + city is fine).

### 2. Point the domain at Vercel
1. Open [Vercel Dashboard](https://vercel.com) → project **sanchez-auto-services-llc** (or your project name).
2. **Settings → Domains → Add**.
3. Enter `www.yourdomain.com` and apex `yourdomain.com`.
4. Vercel shows DNS records to create:

| Type | Name | Value (example) |
|------|------|-----------------|
| **A** | `@` | `76.76.21.21` (Vercel’s IP — confirm in dashboard) |
| **CNAME** | `www` | `cname.vercel-dns.com` |

5. In your registrar DNS panel, add those records. Propagation: minutes to 48h.

### 3. Tell the Next.js site the new URL
In Vercel → **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

Redeploy. Then update:

- `public/robots.txt` — `Host` + `Sitemap` lines  
- `public/sitemap.xml` — every `<loc>` to the new host  

(Or regenerate them after the env is set if you switch to a build script later.)

### 4. Google Business Profile
Google Business → edit website → paste `https://www.yourdomain.com`.  
Keep **NAP** (name, address, phone) identical to the site footer.

### 5. Optional extras
- Redirect apex → `www` (or reverse) in Vercel Domains.
- Free HTTPS is automatic on Vercel.
- Add domain to Google Search Console → submit sitemap.

## Until you buy one

- Keep using `https://sanchez-auto-llc.vercel.app`
- Put that URL on GBP, Instagram bio, and ads
- Local SEO still works if NAP + reviews + map are consistent

## Do not

- Don’t point the domain at Hostinger/Netlify while the site is on Vercel unless you know dual-hosting.
- Don’t change NAP wording between site and Google (hurts local pack).
