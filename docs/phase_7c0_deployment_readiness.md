# Phase 7C.0 — Web Deployment Readiness (Vercel)

**Status:** readiness audit + plan. No deploy, no secrets.
**Branch:** `feat/phase-7c0-web-deploy-readiness`.
**Target:** `iarone-web` (static marketing + publish/embed) → **Vercel**.

## Readiness findings (audited)

| Area | Status | Notes |
|---|---|---|
| Build | ✅ | `npm run build` (Vite static) → `dist/` |
| Pages | ✅ | `index.html`, market/pricing, `publish.html`, `embed.html` |
| API base config | ✅ | `src/config.js` `resolveApiBase()`: `window.IARONE_API_BASE_URL` → `<meta name="iarone-api-base">` → `http://localhost:3000` (dev fallback) |
| Hardcoded localhost | ✅ | only the dev fallback above (runtime-resolved, not baked) |
| Public model URL guard | ✅ | `isPublicReadyUrl()` — renders only absolute http(s) `public_url`/`presigned_url`; **never** treats a bare `storage_key` as public |
| Publish/embed fetch | ✅ | `publishApiUrl(slug)` → `GET {apiBase}/api/publish/:slug` |
| Assets/logo paths | ✅ | bundled by Vite (hashed) |
| Secrets | ✅ | none; the public site needs no secret |

### API base URL strategy (important)
The Web build is **static and runtime-configured** (no `VITE_*` rebuild needed).
Set the API base per-deployment by **either**:
- a `<meta name="iarone-api-base" content="https://api-staging.iarone.com">` tag
  in the deployed HTML, **or**
- an inline `window.IARONE_API_BASE_URL = "https://api-staging.iarone.com"`
  before `config.js` loads.

There is **no** `.env.example` for web (nothing is read at build time). This is
intentional — keep config at runtime so one static build works everywhere.

## Web staging URL / config plan

| Item | Staging value |
|---|---|
| Public web base | `https://staging.iarone.com` |
| API base (runtime) | `https://api-staging.iarone.com` (meta tag / window global) |
| Publish URL format | `https://staging.iarone.com/publish.html?slug=<slug>` |
| Embed URL format | `https://staging.iarone.com/embed.html?slug=<slug>` |

> These publish/embed formats must match what the API builds in
> `services/appConfig.js` `buildPublishUrls()` from `PUBLIC_WEB_BASE_URL`. Keep
> the API's `PUBLIC_WEB_BASE_URL` = the Web staging origin so links resolve.

## Vercel setup (manual, 7C.1)
- **Framework preset:** Vite / Other.
- **Build command:** `npm run build`.
- **Output directory:** `dist`.
- **Install command:** `npm ci`.
- Inject the API base via the meta tag / window global in the deployed HTML
  (or a Vercel rewrite/snippet). No build-time env required.

## Smoke test checklist (staging)
1. Homepage loads.
2. Market / pricing page loads.
3. `publish.html?slug=<public-ready>` renders the model viewer (public_url/presigned).
4. `embed.html?slug=<public-ready>` renders embedded viewer.
5. A `storage_key`-only / internal artifact does **not** render as public →
   shows the not-yet-public fallback (no leaked internal key).
6. No secrets / local paths in responses.

## URL / CORS / publish / embed plan
- The Web pages call the API cross-origin → the Web origin must be allowed by the
  API `CORS_ALLOW_ORIGINS` (publish/embed `GET /api/publish/:slug` is public but
  still subject to CORS for browser fetches).
- See cross-repo `phase_7c0_domain_cors_url_plan.md` (API repo) for the full map.

## Remaining blockers
- None web-internal. Depends on: API deployed + `PUBLIC_WEB_BASE_URL` aligned +
  Web origin in API CORS + API base injected into the static pages.
