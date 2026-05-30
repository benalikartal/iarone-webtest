# Phase 7B.0 — Web: Observability Config

## Overview

Phase 7B.0 prepares the public marketing/publish site for optional Sentry
observability. No behavioral changes are made in this phase — the approach is
documented so it can be added without risk to the live publish/embed pages.

The web repo has no build-time bundling for `publish.html` / `embed.html`
(they are static HTML scripts). Sentry integration follows the CDN/script-tag
approach so no npm dependency is required.

---

## Recommended Sentry setup for static HTML (when ready)

Add the Sentry CDN snippet **before** any page scripts. Replace the DSN with
your project's value — never commit a real DSN to the repo.

```html
<!-- publish.html / embed.html — add before closing </head> -->
<script
  src="https://browser.sentry-cdn.com/8.x.x/bundle.min.js"
  crossorigin="anonymous"
></script>
<script>
  // Phase 7B.0: Optional Sentry. No-ops if DSN not set.
  var sentryDsn = (typeof window !== 'undefined' && window.IARONE_SENTRY_DSN) || '';
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: window.IARONE_SENTRY_ENVIRONMENT || 'local_dev',
      tracesSampleRate: 0,
      sendDefaultPii: false,
      beforeSend: function(event) {
        // Strip sensitive headers
        var hdrs = event && event.request && event.request.headers;
        if (hdrs) {
          ['authorization', 'cookie', 'x-iarone-signature'].forEach(function(h) {
            if (hdrs[h]) hdrs[h] = '[REDACTED]';
          });
        }
        return event;
      }
    });
  }
</script>
```

---

## Runtime config injection

Set `window.IARONE_SENTRY_DSN` via a server-side injected config script
(never hardcoded in HTML files committed to the repo):

```html
<!-- Injected by server/deployment — NOT in git -->
<script>
  window.IARONE_SENTRY_DSN = "https://xxx@oXXXXXX.ingest.sentry.io/XXXXXXX";
  window.IARONE_SENTRY_ENVIRONMENT = "production";
</script>
```

---

## What should NOT be done

- Do not hardcode a real DSN in any HTML file in the repo.
- Do not capture: `slug` parameters, visitor IP, `Authorization` headers,
  or model content.
- The publish/embed pages do not handle authentication — no JWTs to redact.

---

## Current build status

```sh
cd iarone-web && npm run build
# ✓ built in ~104ms — no changes needed for Phase 7B.0
```

---

## What remains for Phase 7B.1

- Inject DSN via deployment config when Sentry project is created for web.
- Add CDN snippet to `publish.html` and `embed.html` following the pattern above.
- Test that the scale trust chip on `publish.html` errors (if any) surface in Sentry.
