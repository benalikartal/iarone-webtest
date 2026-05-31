# Phase 7B.1 — Public Artifact E2E (Web)

**Status:** implemented. **Branch:** `feat/phase-7b1-web-public-artifact-e2e`.
Cross-repo semantics: `iarone-api/docs/phase_7b1_public_artifact_e2e.md`.

## Publish / embed render real public model URL (Part G)

`publish.html` and `embed.html` fetch `GET /api/publish/:slug` and render the
package's `glbUrl` / `usdzUrl` / `posterImageUrl` in `<model-viewer>`.

The API already guarantees a publish package's `glbUrl` is a **public** URL
(publish creation rejects non-public artifacts), but both pages now enforce the
core invariant defensively on the client:

- A new `publicOrNull(u)` helper accepts **only** absolute `http(s)` URLs. Any
  `storage_key`, local path, or non-URL value is dropped to `null` and **never**
  becomes a `model-viewer` `src` / `ios-src` / `poster` or a download href.
- If neither a public GLB nor a public USDZ exists, the page shows a fallback
  ("yayın bağlantısı henüz hazır değil" / "Model source not ready") instead of a
  broken viewer.

No local filesystem paths are ever rendered. The API base remains
runtime-configurable (`window.IARONE_API_URL`) with a localhost dev fallback —
production must inject `window.IARONE_API_URL` (deployment concern, 7C).

## Build / smoke
`npm run build` ✓. Manual smoke: open
`publish.html?slug=<slug>` and `embed.html?slug=<slug>` against a running API
with a public-ready published model → the GLB renders; with an internal-ready /
no-artifact model → the fallback shows and nothing non-public is rendered.

## Remaining for 7B.2
USDZ/poster pipeline polish; presigned-URL expiry handling in the viewer;
production config injection of `window.IARONE_API_URL` (7C).
