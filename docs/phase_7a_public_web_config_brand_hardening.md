# Phase 7A — Web: Config Hardening + Brand Cleanup + Publish Scale Trust

The public marketing/publish site (`iarone-web`) is brought in line with the
four-repo Phase 7A freeze: no hardcoded local API endpoints on public flows, the
hero brand copy reflects the actual product (AI product-photo → 3D/AR commerce),
and the publish viewer shows an **honest** scale trust label.

## Part A — Config-driven API base

All public fetches resolve the API base from a runtime global with a local-dev
fallback (`window.IARONE_API_URL || 'http://localhost:3000/api'`):

- `publish.html`: `const API_BASE = …`; `GET {API_BASE}/publish/:slug`.
- `embed.html`: same `API_BASE`; `GET {API_BASE}/publish/:slug`.
- `app.v5.js` lead/apply POSTs already used the same global (unchanged).

Local dev still works out of the box (the fallback is the old local default).
Production sets `window.IARONE_API_URL` (e.g. via an injected config script).

## Part B — Brand copy cleanup (`index.html` hero)

Replaced the stale agency positioning with the product positioning that already
existed in `i18n.js` (`home.badge_hero` / `home.hero_h1` / `home.hero_h2`):

| Element | Before | After |
|---------|--------|-------|
| badge   | "Creative Web Studio 💻" | "AI Destekli 3D Üretim Platformu" |
| h1      | "Yenilikçi ve modern web siteleri inşa ediyoruz." | "Fotoğraf yükle. 3D modelini oluştur. Kalitesini gör. Gerekirse iyileştir." |
| sub     | "⚙️ High Performance & Clean Design" | "Ürün görsellerinden satışa hazır 3D deneyimler üretin. Iarone, modeli sadece oluşturmaz; kullanılabilirlik, kalite ve iyileştirme süreciyle birlikte sunar." |

The hero elements now carry the matching `data-i18n` bindings, so the localized
copy applies on load (TR/EN) and the static fallback is also product-correct (no
agency wording remains even with JS disabled).

## Part C5 — Publish scale trust display

`publish.html` now renders an honest scale chip below the title, derived **only**
from a backend-verified `scale_metadata` block:

- `Doğrulanmış ölçek` (green) — **only** when `scale_verified === true` AND
  `scale_source ∈ {reference_object, user_input, sensor_depth}` AND a valid
  3-length positive `bbox_meters`.
- `Yaklaşık ölçek (doğrulanmadı)` (amber) — a known-but-unverified source.
- `Ölçek bilinmiyor` (muted) — default / no scale info.

The logic mirrors the app's `src/dashboard/scale-display.js` (inlined since the
static site has no bundler). A client/declared value can never read as verified.
`embed.html` stays intentionally chrome-free (no chip) — only its API base was
hardened.

## Invariants preserved

- iOS-only AR publish path untouched (`IOS_AR_ONLY` GLB-missing fallback intact).
- Public pages backward compatible (graceful "Package Not Found" on error).
- No internal storage keys surfaced; the viewer only uses backend-provided
  `glbUrl` / `usdzUrl`.
- Scale claims are honest; the web layer can never self-verify scale.
