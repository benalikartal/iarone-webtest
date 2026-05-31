# Phase 7B.2 — Queue-Aware Publish Notes (Web)

**Status:** docs only (no behavior change). **Branch:**
`feat/phase-7b2-web-queue-publish-docs`.

## Scope

The generation **queue is an API + App concern**. The Web publish/embed pages are
unaffected by queueing: they render a **published package** (which only exists once
a job has COMPLETED and produced a public artifact). A queued/processing job has
no publish package yet.

## Behavior (unchanged from 7B.1, reconfirmed)

`publish.html` / `embed.html` fetch `GET /api/publish/:slug` and render only
absolute `http(s)` URLs (`publicOrNull` guard) — a `storage_key` or local path is
**never** rendered as a viewer `src`/`href`. When no public artifact exists the
page shows a fallback ("yayın bağlantısı henüz hazır değil" / "Model source not
ready"). This already covers the queue case: a not-yet-completed job simply has no
public package, so the fallback shows.

## Build
`npm run build` ✓. No source change this phase.

## Remaining for 7C
- Optional "generation in progress / queued" friendly state on a publish URL that
  resolves before completion (currently shows the generic not-ready fallback).
- Production must inject `window.IARONE_API_URL` (deployment concern).
