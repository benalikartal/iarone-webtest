# Phase 7B.0.5 — Audit (Web / Marketing + Publish)

**Type:** audit (doc only). **Branch:** `feat/phase-7b0-5-web-audit-hardening`.
Full cross-repo analysis + perf bands:
`iarone-api/docs/phase_7b0_5_security_modularity_performance_audit.md`.

## Findings

### A. Secrets / env — PASS
No tracked `.env`; no secrets in committed files. `.gitignore` covers `.env`.

### A/F. Hardcoded API base — low-risk, repeated
`app.v5.js`, `embed.html`, and `publish.html` each resolve the API base as:
```js
const API_BASE = (window.IARONE_API_URL) || 'http://localhost:3000/api';
```
- **Overridable at runtime** via `window.IARONE_API_URL` — acceptable as a dev
  fallback, **not** a secret leak.
- **Production risk:** if `window.IARONE_API_URL` is not injected in the
  production build/host, the page silently calls `localhost:3000`. Production
  **must** set it (build-time replace or a server-injected `<script>` config).
- **Modularity:** the snippet is duplicated 3×. Recommend a single
  `runtime-config.js` helper (`getApiBase()`) imported by all pages. Low-risk,
  deferred to keep this phase doc-only.

### B. Publish / embed artifact display — PASS
`publish.html` / `embed.html` fetch `GET /api/publish/:slug` and render
server-provided public URLs only. The API gates publish on a **public** artifact
(`evaluatePublishArtifact`), so a `storage_key` is never surfaced as a link.

### C. Observability — docs pattern only
Web has no bundled Sentry; if added, follow the App `src/sentry.js` runtime
pattern (`window.IARONE_SENTRY_DSN`, no PII, no-op without DSN).

### G. Performance — static assets
Web is static (CDN-friendly). The one heavy asset is `muscent.mp4` (~5 MB) — serve
via CDN. The lead-capture form posts to the API (`/api/leads`, in-memory IP rate
limited — per-process; replace with shared limiter at >1 instance, 7B.2). No
web-specific scaling blocker through the 1000-user band given CDN hosting.

## Applied
- This audit doc only.

## Deferred
- `runtime-config.js` `getApiBase()` helper to de-duplicate the API-base snippet.
- Ensure production injects `window.IARONE_API_URL` (and `IARONE_SENTRY_DSN` if
  used) — deployment concern (7C).

## Validation
`npm run build` — green.
