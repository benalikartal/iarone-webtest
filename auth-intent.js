/* =====================================================
   IARONE WEB — AUTH INTENT MODAL  (fix(launch))
   -----------------------------------------------------
   Improves the public-web → app-auth handoff UX WITHOUT
   any insecure token transfer.

   Web (iarone.com) and app (app.iarone.com) are different
   origins. The web side NEVER logs in, NEVER calls
   /api/auth/login, NEVER stores a JWT, and NEVER passes a
   token in the URL. It only shows a polished intent modal
   and then performs a normal SAME-TAB navigation to the
   app's auth page, where the real login/register happens.

   Reusable for three CTA intents via data-auth-intent:
     - "login"    → Giriş Yap
     - "register" → Kayıt Ol
     - "create"   → Model Oluştur  (login is required first)

   Progressive enhancement: every trigger keeps a working
   href, so if JS is disabled the click just navigates
   same-tab to the app auth page (requirement #10).
   ===================================================== */

(function () {
  'use strict';

  // Single source of truth for the app auth destination.
  var APP_AUTH_BASE = 'https://app.iarone.com/auth.html';
  var RETURN_URL = '/dashboard.html';

  /** Build the same-tab app auth URL for a given mode. */
  function authUrl(mode) {
    return APP_AUTH_BASE +
      '?mode=' + encodeURIComponent(mode) +
      '&returnUrl=' + encodeURIComponent(RETURN_URL);
  }

  var LOGIN_URL = authUrl('login');
  var REGISTER_URL = authUrl('register');

  var modal = null;          // root overlay element
  var dialog = null;         // focusable dialog
  var lastFocused = null;    // element focused before opening (restored on close)

  // --- Modal markup (injected once) ---------------------------------------
  function buildModal() {
    var el = document.createElement('div');
    el.className = 'auth-modal';
    el.id = 'auth-intent-modal';
    el.setAttribute('hidden', '');
    el.innerHTML =
      '<div class="auth-modal__backdrop" data-auth-close></div>' +
      '<div class="auth-modal__dialog" role="dialog" aria-modal="true"' +
      ' aria-labelledby="auth-modal-title" aria-describedby="auth-modal-desc" tabindex="-1">' +
        '<button type="button" class="auth-modal__close" data-auth-close aria-label="Kapat">&times;</button>' +
        '<div class="auth-modal__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
          ' stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="11" width="18" height="11" rx="2"/>' +
          '<path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
        '</div>' +
        '<h2 class="auth-modal__title" id="auth-modal-title">Iarone Paneline Giriş</h2>' +
        '<p class="auth-modal__desc" id="auth-modal-desc">Model oluşturmak ve varlıklarınızı yönetmek için güvenli uygulama paneline devam edin.</p>' +
        '<div class="auth-modal__actions">' +
          '<a class="btn btn-primary" data-auth-go="login" href="' + LOGIN_URL + '">Panele Giriş Yap</a>' +
          '<a class="btn btn-ghost" data-auth-go="register" href="' + REGISTER_URL + '">Hesap Oluştur</a>' +
        '</div>' +
        '<p class="auth-modal__note">Giriş işlemi app.iarone.com üzerinde tamamlanır.</p>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function ensureModal() {
    if (modal) return;
    modal = document.getElementById('auth-intent-modal') || buildModal();
    dialog = modal.querySelector('.auth-modal__dialog');

    // Close on any element flagged data-auth-close (backdrop + X button).
    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-auth-close]')) {
        e.preventDefault();
        closeModal();
      }
    });
  }

  function focusableInDialog() {
    return Array.prototype.slice.call(
      dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
  }

  // ESC closes; Tab is trapped inside the dialog while open.
  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      var f = focusableInDialog();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal(intent) {
    ensureModal();
    lastFocused = document.activeElement;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown, true);

    // Register intent emphasises the "Hesap Oluştur" action; everything else
    // (login / create) starts on the primary "Panele Giriş Yap" action.
    var preferred = intent === 'register' ? 'register' : 'login';
    var target = dialog.querySelector('[data-auth-go="' + preferred + '"]') || dialog;
    // Defer focus so the open animation can start first.
    window.requestAnimationFrame(function () { target.focus(); });
  }

  function closeModal() {
    if (!modal || modal.hasAttribute('hidden')) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown, true);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  // --- Wire triggers -------------------------------------------------------
  // Any element with data-auth-intent opens the modal instead of navigating.
  // The element's href remains the no-JS fallback (same-tab navigation).
  function bindTriggers() {
    document.querySelectorAll('[data-auth-intent]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        // Respect new-tab / modified clicks — let the browser handle them.
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey ||
            e.shiftKey || e.altKey) {
          return;
        }
        e.preventDefault();
        openModal(trigger.getAttribute('data-auth-intent'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTriggers);
  } else {
    bindTriggers();
  }
})();
