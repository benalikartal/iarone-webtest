/* =====================================================
   IARONE — app.js v2.5
   Theme toggle, i18n, nav, animations, 3D preloader, 
   Drag & Drop, Search, Filters, Onboarding & Dashboard modules
   ===================================================== */
import { i18n } from './i18n.js';

/* ─── PREMIUM PRELOADER (GÜVENLİ) ─── */
function initPreloader() {
  const pl = document.getElementById('preloader');
  if (!pl) return;

  // Sayfayı en üste sabitle ve scroll'u kapat
  window.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';

  let isHidden = false;

  // Preloader'ı gizleyen ana fonksiyon
  const hidePreloader = () => {
    if (isHidden) return;
    isHidden = true;
    
    // Çıkış animasyonunu başlat ve scroll kilidini aç
    pl.classList.add('pl--exit');
    document.body.style.overflow = ''; 
    
    // Animasyon bitince DOM'dan tamamen gizle
    setTimeout(() => {
      pl.classList.add('pl--gone');
    }, 600); // CSS'teki 0.6s transition süresiyle aynı olmalı
  };

  // 1. Şart: Premium his için animasyon en az 1.2 saniye ekranda kalsın
  const minDisplayTime = new Promise(resolve => setTimeout(resolve, 1200));

  // 2. Şart: Sayfanın tam yüklenmesi
  const pageLoad = new Promise(resolve => {
    // Eğer sayfa zaten çoktan yüklendiyse (takılma sebebi genelde budur)
    if (document.readyState === 'complete') {
      resolve();
    } else {
      // Yüklenmediyse dinle
      window.addEventListener('load', resolve);
    }
  });

  // Her iki şart da sağlandığında ekranı aç
  Promise.all([minDisplayTime, pageLoad]).then(hidePreloader);

  // FAILSAFE (HATA KORUMASI): 
  // Sitede kırık bir resim vs. varsa load event'i hiç tetiklenmeyebilir.
  // Ne olursa olsun 5 saniye sonra yükleme ekranını ZORLA kapat.
  setTimeout(hidePreloader, 5000);
}

const THEME_KEY = 'iarone-theme';
const LANG_KEY  = 'iarone-lang';

/* ─── THEME ─── */
function getTheme() { return localStorage.getItem(THEME_KEY) || 'dark'; }

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const tog = document.getElementById('theme-toggle');
  if (tog) tog.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
}

function toggleTheme() { applyTheme(getTheme() === 'dark' ? 'light' : 'dark'); }

/* ─── LANGUAGE ─── */
function getLang() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang && ['tr', 'en', 'ar', 'de'].includes(urlLang)) {
    return urlLang;
  }
  return localStorage.getItem(LANG_KEY) || 'tr';
}

function deepGet(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function applyLang(lang) {
  if (typeof i18n === 'undefined') return;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const url = new URL(window.location);
  if (url.searchParams.get('lang') !== lang) {
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }

  const t = i18n[lang] || i18n['tr'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = deepGet(t, key);
    if (val === undefined) return;

    if (el.tagName === 'INPUT' && el.type !== 'submit' && el.type !== 'button') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Update lang button text
  const cur = document.getElementById('lang-current');
  if (cur) cur.textContent = lang.toUpperCase();

  // Highlight selected option
  document.querySelectorAll('.lang-opt').forEach(o =>
    o.classList.toggle('sel', o.dataset.lang === lang)
  );
}

/* ─── NAV SCROLL ─── */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const upd = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', upd, { passive: true });
  upd();
}

/* ─── MOBILE MENU ─── */
function initMobileMenu() {
  const burger = document.getElementById('nav-burger');
  const mobile = document.getElementById('nav-mobile');
  if (!burger || !mobile) return;

  burger.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobile.classList.remove('open'));
  });
}

/* ─── LANGUAGE SWITCHER ─── */
function initLangSwitcher() {
  const sw  = document.getElementById('lang-sw');
  const btn = document.getElementById('lang-btn');
  if (!sw || !btn) return;

  btn.addEventListener('click', e => { e.stopPropagation(); sw.classList.toggle('open'); });
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      applyLang(opt.dataset.lang);
      sw.classList.remove('open');
    });
  });
  document.addEventListener('click', e => { if (!sw.contains(e.target)) sw.classList.remove('open'); });
}

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ─── BEFORE / AFTER SLIDER ─── */
function initBASlider() {
  const wrap   = document.getElementById('ba-container');
  const after  = document.getElementById('ba-after');
  const handle = document.getElementById('ba-handle');
  if (!wrap || !after || !handle) return;

  let dragging = false;

  const set = (cx) => {
    const r = wrap.getBoundingClientRect();
    let p = Math.max(0.04, Math.min(0.96, (cx - r.left) / r.width));
    after.style.width  = p * 100 + '%';
    handle.style.left  = p * 100 + '%';
  };

  wrap.addEventListener('mousedown',  e => { dragging = true; set(e.clientX); });
  wrap.addEventListener('touchstart', e => { dragging = true; set(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('mousemove',  e => { if (dragging) set(e.clientX); });
  window.addEventListener('touchmove',  e => { if (dragging) set(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('mouseup',  () => { dragging = false; });
  window.addEventListener('touchend', () => { dragging = false; });

  // Auto-animate once visible
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { autoAnimate(after, handle); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(wrap);
}

function autoAnimate(after, handle) {
  let p = 0.5, dir = 1, n = 0;
  const tick = () => {
    if (n > 110) return;
    p += dir * 0.012;
    if (p > 0.9) dir = -1;
    if (p < 0.1) { n = 200; return; }
    after.style.width = p * 100 + '%';
    handle.style.left = p * 100 + '%';
    n++;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ─── BETA FORM ─── */
function initBetaForm() {
  const form = document.getElementById('beta-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn   = form.querySelector('[type="submit"]');
    const nameInput = form.querySelector('#wait_name');
    const brandInput = form.querySelector('#wait_brand');
    const website = form.querySelector('input[name="website"]');
    if (!input || !input.value) return;

    const originalText = btn.textContent;
    const lang = getLang();
    btn.textContent = '...';
    btn.disabled = true;

    try {
      const payload = {
        name: nameInput ? nameInput.value : '',
        email: input.value,
        company: brandInput ? brandInput.value : '',
        intent: 'MARKET_WAITLIST',
        source: 'MARKET_WAITLIST',
        pageUrl: window.location.href,
        website: website ? website.value : ''
      };

      const res = await fetch((window.IARONE_API_URL || 'https://api.iarone.com/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error) {
           btn.textContent = 'Hata: ' + data.error;
           setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
           return;
        }
        throw new Error('API Unreachable');
      }

      btn.textContent = lang === 'tr' ? 'Teşekkürler!' : (lang === 'ar' ? 'شكراً لك!' : (lang === 'de' ? 'Danke!' : 'Thank you!'));
      form.reset();
    } catch (err) {
      console.warn('Lead capture net error:', err);
      btn.textContent = lang === 'tr' ? 'Gönderildi' : (lang === 'ar' ? 'تم الإرسال' : (lang === 'de' ? 'Eingereicht' : 'Submitted'));
      try {
        const payload = {
          name: nameInput ? nameInput.value : '', email: input.value, company: brandInput ? brandInput.value : '',
          intent: 'MARKET_WAITLIST', source: 'MARKET_WAITLIST',
          pageUrl: window.location.href, timestamp: Date.now()
        };
        const pending = JSON.parse(localStorage.getItem('pending_leads') || '[]');
        pending.push(payload);
        localStorage.setItem('pending_leads', JSON.stringify(pending));
      } catch (e) {}
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 5000);
  });
}

/* ─── UPLOAD ZONE ─── */
function initUploadZone() {
  const zone = document.getElementById('upload-zone');
  if (!zone) return;

  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    const h3 = zone.querySelector('h3');
    zone.style.borderColor = 'var(--success)';
    const original = h3.textContent;
    h3.textContent = '✅ Dosya hazır!';
    setTimeout(() => { zone.style.borderColor = ''; h3.textContent = original; }, 3000);
  });
  zone.addEventListener('click', () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.click();
  });
}

/* ─── SIDEBAR (DASHBOARD) ─── */
function initSidebar() {
  const sb      = document.getElementById('sidebar');
  const toggle  = document.getElementById('sb-toggle');
  const overlay = document.getElementById('sb-overlay');
  if (!sb) return;

  const open  = () => { sb.classList.add('open'); overlay?.classList.add('active'); };
  const close = () => { sb.classList.remove('open'); overlay?.classList.remove('active'); };

  toggle?.addEventListener('click', open);
  overlay?.addEventListener('click', close);
}

/* ─── PRICING TILT ─── */
function initPricingCards() {
  document.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) *  4;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) * -4;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ─── ACTIVE NAV LINK ─── */
function setActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .sb-item').forEach(a => {
    const href = a.getAttribute('href') || '';
    let active = false;
    if (page === '' || page === 'index.html') {
      if (href === 'index.html') active = true;
    } else if (page.includes('pricing')) {
      if (href.includes('pricing')) active = true;
    } else if (page.includes('market')) {
      if (href.includes('market')) active = true;
    } else if (page.includes('dashboard')) {
      if (href.includes('dashboard')) active = true;
    }
    a.classList.toggle('active', active);
  });
}

/* ─── PAGE EXIT TRANSITIONS ─── */
function initPageTransitions() {
  // Skip JS-driven navigation on file:// — causes browser security warnings
  if (location.protocol === 'file:') return;

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.includes('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.cssText = 'opacity:0;transform:translateY(-8px);transition:all .22s ease;';
      setTimeout(() => { location.href = href; }, 230);
    });
  });
}

/* ─── WAITLIST FORM (MARKET) ─── */
function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn   = form.querySelector('[type="submit"]');
    const inputEmail = form.querySelector('input[type="email"]');
    const inputName = form.querySelector('#wait_name');
    const inputBrand = form.querySelector('#wait_brand');
    const website = form.querySelector('input[name="website"]');
    const intentRadio = form.querySelector('input[name="wait_intent"]:checked');
    
    if (!inputEmail || !inputEmail.value) return;

    const originalText = btn.textContent;
    const lang = getLang();
    btn.textContent = '...';
    btn.disabled = true;

    try {
      const payload = {
        name: inputName ? inputName.value : '',
        email: inputEmail.value,
        company: inputBrand ? inputBrand.value : '',
        intent: intentRadio ? intentRadio.value : 'MARKET_WAITLIST',
        source: 'MARKET_WAITLIST',
        pageUrl: window.location.href,
        website: website ? website.value : ''
      };

      const res = await fetch((window.IARONE_API_URL || 'https://api.iarone.com/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error) {
           btn.textContent = 'Hata: ' + data.error;
           setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
           return;
        }
        throw new Error('API Unreachable');
      }

      btn.textContent = lang === 'tr' ? 'Teşekkürler!' : (lang === 'ar' ? 'شكراً لك!' : (lang === 'de' ? 'Danke!' : 'Thank you!'));
      form.reset();
    } catch (err) {
      console.warn('Market lead net error:', err);
      btn.textContent = lang === 'tr' ? 'Gönderildi' : (lang === 'ar' ? 'تم الإرسال' : (lang === 'de' ? 'Eingereicht' : 'Submitted'));
      
      try {
        const payload = {
          name: inputName ? inputName.value : '', email: inputEmail.value,
          company: inputBrand ? inputBrand.value : '', intent: intentRadio ? intentRadio.value : 'MARKET_WAITLIST',
          source: 'MARKET_WAITLIST', pageUrl: window.location.href, timestamp: Date.now()
        };
        const pending = JSON.parse(localStorage.getItem('pending_leads') || '[]');
        pending.push(payload);
        localStorage.setItem('pending_leads', JSON.stringify(pending));
      } catch (e) {}
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 5000);
  });
}

/* ─── DYNAMIC NAVBAR & PROFILE ─── */
function initDynamicNavbar() {
  const token = localStorage.getItem('iarone_token');
  const userStr = localStorage.getItem('iarone_user');
  const loginBtn = document.getElementById('nav-login');
  const registerBtn = document.getElementById('nav-register');
  
  if (token && userStr && loginBtn) {
    loginBtn.style.display = 'none';
    if(registerBtn) registerBtn.style.display = 'none';
    const user = JSON.parse(userStr);
    const initial = user.username ? user.username.charAt(0).toUpperCase() : 'U';
    
    // Dropdown yapısını oluştur (Styles.v5.css içindeki mevcut lang-drop mantığı ile benzer)
    const profileHTML = `
      <div class="lang-sw" id="profile-sw" style="margin-left: 8px;">
        <button class="lang-btn" id="profile-btn" style="padding: 6px 12px; gap: 8px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--ac); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">${initial}</div>
          <span>${user.username}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="lang-drop" id="profile-drop" role="menu" style="min-width: 150px;">
          <a href="/profile.html" class="lang-opt" role="menuitem" style="text-decoration: none; display:block;">👤 Profilim</a>
          <a href="#" id="logout-btn" class="lang-opt" role="menuitem" style="text-decoration: none; display:block; color: var(--danger, #ef4444);">🚪 Çıkış Yap</a>
        </div>
      </div>
    `;
    
    // ProfileHTML'yi nereye ekleyeceğimizi seçiyoruz (eğer nav-register varsa onun arkasına, yoksa nav-login'in)
    if(registerBtn) {
      registerBtn.insertAdjacentHTML('afterend', profileHTML);
    } else {
      loginBtn.insertAdjacentHTML('afterend', profileHTML);
    }
    
    // Toggle mantığı
    const pSw = document.getElementById('profile-sw');
    const pBtn = document.getElementById('profile-btn');
    pBtn.addEventListener('click', (e) => { e.stopPropagation(); pSw.classList.toggle('open'); });
    document.addEventListener('click', e => { if (!pSw.contains(e.target)) pSw.classList.remove('open'); });
    
    // Çıkış yap
    document.getElementById('logout-btn').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('iarone_token');
      localStorage.removeItem('iarone_user');
      window.location.href = '/index.html';
    });
  }
}

/* ─── INTERACTIVE 3D VIDEO (CHROMA KEY + MOUSE SCRUB) ─── */
function initInteractiveVideo() {
  const container = document.getElementById('hero-3d-video-container');
  const canvas = document.getElementById('hero-3d-canvas');
  const video = document.getElementById('hero-hidden-video');
  if (!container || !canvas || !video) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let isDragging = false;
  let startX = 0;
  let startVidTime = 0;

  // Set canvas size when video metadata is loaded
  video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth || 600;
    canvas.height = video.videoHeight || 600;
    video.play().catch(e => console.log('Autoplay blocked:', e));
  });

  // Render loop for Chroma Key (Green Screen Removal)
  function renderFrame() {
    if (video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frameData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const r = data[i + 0];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green Screen detection logic
        // G is dominant, threshold tuned for typical green screens
        if (g > 80 && g > r * 1.2 && g > b * 1.2) {
          data[i + 3] = 0; // Transparent
        }
      }
      ctx.putImageData(frameData, 0, 0);
    }
    requestAnimationFrame(renderFrame);
  }

  renderFrame();

  // Interaction Logic (Drag to scrub)
  const onDragStart = (x) => {
    isDragging = true;
    startX = x;
    startVidTime = video.currentTime;
    video.pause(); // Stop auto-spin
    container.style.cursor = 'grabbing';
  };

  const onDragMove = (x) => {
    if (!isDragging) return;
    const deltaX = x - startX;
    
    // Scrub ratio: 150px drag = 1s of video
    const timeShift = (deltaX / 150); 
    let newTime = startVidTime - timeShift; // Subtract to make right-drag rotate left
    
    // Loop the video time
    if (video.duration > 0) {
      if (newTime < 0) newTime = video.duration + (newTime % video.duration);
      if (newTime > video.duration) newTime = newTime % video.duration;
      video.currentTime = newTime;
    }
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    container.style.cursor = 'grab';
    video.play().catch(e => {}); // Resume auto-spin
  };

  // Events
  container.addEventListener('mousedown', (e) => onDragStart(e.clientX));
  window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup', onDragEnd);

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) onDragStart(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) onDragMove(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', onDragEnd);
}

/* ─── FEATURE 1: HERO DRAG & DROP UPLOAD SIMULATION ─── */
function initHeroDragDrop() {
  const zone = document.getElementById('upload-zone');
  const preview = document.getElementById('upload-preview');
  const previewImg = document.getElementById('upload-preview-img');
  const progressFill = document.getElementById('upload-progress-fill');
  const statusText = document.getElementById('upload-status-text');
  const statusSub = document.getElementById('upload-status-sub');
  
  if (!zone || !preview || !previewImg || !progressFill) return;

  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('step-4')
  ];

  // Helper to update SVG progress circle dash offset (220 is full path length)
  const setProgress = (percent) => {
    const offset = 220 - (220 * percent) / 100;
    progressFill.style.strokeDashoffset = offset;
    statusSub.textContent = `%${Math.round(percent)}`;
  };

  const createParticles = () => {
    const parent = document.getElementById('upload-particles');
    if (!parent) return;
    parent.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 80;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.background = `hsl(${220 + Math.random() * 40}, 90%, 65%)`;
      parent.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  };

  const startSimulation = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      zone.classList.remove('state-uploading', 'state-processing', 'state-done');
      zone.classList.add('state-uploading');
      
      let progress = 0;
      setProgress(0);
      steps.forEach(s => s?.classList.remove('active', 'done'));
      steps[0]?.classList.add('active');

      const interval = setInterval(() => {
        progress += 2;
        setProgress(progress);

        if (progress === 30) {
          zone.classList.remove('state-uploading');
          zone.classList.add('state-processing');
          statusText.textContent = "3D Model Üretiliyor...";
          steps[0]?.classList.remove('active');
          steps[0]?.classList.add('done');
          steps[1]?.classList.add('active');
        } else if (progress === 60) {
          statusText.textContent = "Kalite Kontrolü Yapılıyor...";
          steps[1]?.classList.remove('active');
          steps[1]?.classList.add('done');
          steps[2]?.classList.add('active');
        } else if (progress === 85) {
          statusText.textContent = "Pürüzler Gideriliyor...";
          steps[2]?.classList.remove('active');
          steps[2]?.classList.add('done');
          steps[3]?.classList.add('active');
        } else if (progress >= 100) {
          clearInterval(interval);
          zone.classList.remove('state-processing');
          zone.classList.add('state-done');
          steps[3]?.classList.remove('active');
          steps[3]?.classList.add('done');
          createParticles();
        }
      }, 70);
    };
    reader.readAsDataURL(file);
  };

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('dragover');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      startSimulation(files[0]);
    }
  });

  zone.addEventListener('click', (e) => {
    // Prevent triggering upload on buttons click
    if (e.target.closest('.upload-try-btn') || zone.classList.contains('state-uploading') || zone.classList.contains('state-processing')) return;
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = () => {
      if (inp.files.length > 0) startSimulation(inp.files[0]);
    };
    inp.click();
  });
}

/* ─── FEATURE 2: BUTTON MICRO-INTERACTIONS ─── */
function initButtonMicroInteractions() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.classList.contains('btn-micro')) return;
    btn.classList.add('btn-micro');
    
    // Wrap current label
    const label = btn.innerHTML;
    btn.innerHTML = `
      <span class="btn-label">${label}</span>
      <span class="btn-spinner">
        <svg class="spin-ring" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
        </svg>
      </span>
      <span class="btn-checkmark">✓</span>
    `;

    btn.addEventListener('click', (e) => {
      // If it's a link or already loading/success, let it be
      if (btn.classList.contains('btn-loading') || btn.classList.contains('btn-success')) return;

      // Ripple Effect
      btn.classList.add('rippling');
      setTimeout(() => btn.classList.remove('rippling'), 400);

      // Submit buttons triggers loading sequence
      if (btn.closest('form')) {
        btn.classList.add('btn-loading');
        // Let the form handles actual submission, we just trigger micro visual
        setTimeout(() => {
          btn.classList.remove('btn-loading');
          btn.classList.add('btn-success');
          setTimeout(() => {
            btn.classList.remove('btn-success');
          }, 3000);
        }, 1800);
      }
    });
  });
}

/* ─── FEATURE 3: MARKET LAZY LOAD & SEARCH & ADVANCED FILTERS ─── */
function initMarketLazyLoad() {
  const realGrid = document.getElementById('market-real-grid');
  const skeletonGrid = document.getElementById('market-skeleton-grid');
  if (!realGrid || !skeletonGrid) return;

  // Simulate loading delay for skeleton loader
  setTimeout(() => {
    skeletonGrid.style.display = 'none';
    realGrid.style.display = 'grid';
    initMarketCardsOverlay();
  }, 1200);
}

function initMarketCardsOverlay() {
  document.querySelectorAll('.market-card').forEach(card => {
    const overlay = card.querySelector('.mc-3d-overlay');
    const imgWrap = card.querySelector('.mc-img');
    if (!overlay || !imgWrap) return;

    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      // Inject model-viewer when clicked
      overlay.style.display = 'none';
      const mv = document.createElement('model-viewer');
      mv.setAttribute('src', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb');
      mv.setAttribute('alt', 'Iarone 3D model preview');
      mv.setAttribute('auto-rotate', '');
      mv.setAttribute('camera-controls', '');
      mv.setAttribute('touch-action', 'none');
      mv.style.width = '100%';
      mv.style.height = '100%';
      mv.style.position = 'absolute';
      mv.style.inset = '0';
      mv.style.background = 'var(--bg-surface)';
      imgWrap.appendChild(mv);
    });
  });
}

function initMarketSearch() {
  const searchInput = document.getElementById('market-search-input');
  const clearBtn = document.getElementById('market-search-clear');
  const searchWrap = document.getElementById('market-search-wrap');
  
  if (!searchInput) return;

  const handleSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    searchWrap.classList.toggle('has-value', query.length > 0);
    applyMarketFilters();
  };

  // Debounced search logic
  let debounceTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(handleSearch, 300);
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    searchWrap.classList.remove('has-value');
    applyMarketFilters();
  });
}

function initMarketFilters() {
  const resetBtn = document.getElementById('filter-reset-btn');
  const filterPanel = document.getElementById('filter-panel');
  if (!filterPanel) return;

  // Toggle filter option selection
  document.querySelectorAll('.filter-opt, .market-filter-pill').forEach(opt => {
    opt.addEventListener('click', () => {
      // For categories only 1 can be selected
      if (opt.closest('#category-opts')) {
        opt.parentNode.querySelectorAll('.filter-opt, .market-filter-pill').forEach(sibling => {
          sibling.classList.remove('selected');
          const check = sibling.querySelector('.filter-opt-check');
          if (check) check.textContent = '';
        });
      }
      
      const selected = opt.classList.toggle('selected');
      const check = opt.querySelector('.filter-opt-check');
      if (check) check.textContent = selected ? '✓' : '';
      
      filterPanel.classList.add('filters-active');
      applyMarketFilters();
    });
  });

  // Price pills toggle
  document.querySelectorAll('.price-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.parentNode.querySelectorAll('.price-pill').forEach(sibling => sibling.classList.remove('active'));
      pill.classList.add('active');
      filterPanel.classList.add('filters-active');
      applyMarketFilters();
    });
  });

  resetBtn?.addEventListener('click', () => {
    document.querySelectorAll('.filter-opt, .market-filter-pill').forEach(opt => {
      opt.classList.remove('selected');
      const check = opt.querySelector('.filter-opt-check');
      if (check) check.textContent = '';
    });
    // Set default category to 'all'
    const defaultCat = document.querySelector('#category-opts [data-value="all"]');
    if (defaultCat) {
      defaultCat.classList.add('selected');
      const check = defaultCat.querySelector('.filter-opt-check');
      if (check) check.textContent = '✓';
    }

    document.querySelectorAll('.price-pill').forEach(pill => pill.classList.remove('active'));
    document.querySelector('.price-pill[data-value="all"]')?.classList.add('active');

    const searchInp = document.getElementById('market-search-input');
    if (searchInp) searchInp.value = '';
    document.getElementById('market-search-wrap')?.classList.remove('has-value');

    filterPanel.classList.remove('filters-active');
    applyMarketFilters();
  });
}

function applyMarketFilters() {
  const cards = document.querySelectorAll('#market-real-grid .market-card');
  const searchInput = document.getElementById('market-search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  // Get active filters
  const selectedCatOpt = document.querySelector('#category-opts .filter-opt.selected, #category-opts .market-filter-pill.selected');
  const categoryFilter = selectedCatOpt ? selectedCatOpt.getAttribute('data-value') : 'all';

  const formatFilters = Array.from(document.querySelectorAll('#format-opts .filter-opt.selected')).map(o => o.getAttribute('data-value'));
  
  const activePricePill = document.querySelector('#price-opts .price-pill.active');
  const priceFilter = activePricePill ? activePricePill.getAttribute('data-value') : 'all';

  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const cardFormats = card.getAttribute('data-format').split(',');
    const cardPrice = parseFloat(card.getAttribute('data-price'));
    const cardTitle = card.querySelector('.mc-title').textContent.toLowerCase();

    // Check query match
    const matchesQuery = query === '' || cardTitle.includes(query) || cardCat.includes(query);

    // Check category match
    const matchesCat = categoryFilter === 'all' || cardCat === categoryFilter;

    // Check formats match (if any format is selected, the card must support at least one of selected formats)
    const matchesFormat = formatFilters.length === 0 || formatFilters.some(f => cardFormats.includes(f));

    // Check price match
    let matchesPrice = true;
    if (priceFilter === 'free') {
      matchesPrice = cardPrice === 0;
    } else if (priceFilter === 'premium') {
      matchesPrice = cardPrice > 0;
    }

    if (matchesQuery && matchesCat && matchesFormat && matchesPrice) {
      card.style.display = 'block';
      card.classList.remove('filtered-out');
      card.classList.add('filtered-in');
      visibleCount++;
    } else {
      card.style.display = 'none';
      card.classList.remove('filtered-in');
      card.classList.add('filtered-out');
    }
  });

  // Empty state handling
  const emptyState = document.getElementById('market-empty-state');
  const resultsCount = document.getElementById('results-count');
  
  if (emptyState) {
    emptyState.classList.toggle('visible', visibleCount === 0);
  }

  if (resultsCount) {
    const lang = getLang();
    if (visibleCount === 0) {
      resultsCount.textContent = "";
    } else {
      resultsCount.textContent = lang === 'tr' ? `${visibleCount} model listeleniyor` : `${visibleCount} models found`;
    }
  }
}

/* ─── FEATURE 4: ENHANCED AI CHAT VIDEO PLAYER & ONBOARDING MODAL ─── */
function initEnhancedAIChat() {
  const chatbot = document.getElementById('ai-widget');
  if (!chatbot) return;

  const chatBody = document.getElementById('ai-chat-body');
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const toggleBtn = document.getElementById('ai-toggle-btn');
  const closeBtn = document.getElementById('ai-close-btn');

  if (!chatBody || !input || !sendBtn || !toggleBtn || !closeBtn) return;

  let isInitialized = false;

  const optionsHTML = `
    <div class="ai-options" id="ai-options-container">
      <button class="ai-opt-btn">Sistem Nasıl Çalışır?</button>
      <button class="ai-opt-btn">Fiyatlandırma</button>
      <button class="ai-opt-btn">Örnek AR Gör</button>
    </div>
  `;

  const addMessage = (text, sender = 'bot', isVideo = false, rawHTML = false) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = isVideo ? 'ai-video-bubble' : 'ai-msg-bubble';

    if (isVideo) {
      bubble.innerHTML = `
        <div style="position: relative;">
          <video class="ai-video-player" id="ai-player">
            <source src="muscent.mp4" type="video/mp4">
          </video>
          <div class="ai-video-overlay-btn" id="ai-play-overlay">
            <div class="ai-video-play-ico">▶</div>
          </div>
        </div>
        <div class="ai-video-caption">Iarone Nasıl Çalışır? (Video Rehber)</div>
      `;
      msgDiv.appendChild(bubble);
      chatBody.appendChild(msgDiv);

      // Play video listener
      const player = bubble.querySelector('#ai-player');
      const overlay = bubble.querySelector('#ai-play-overlay');
      overlay.addEventListener('click', () => {
        if (player.paused) {
          player.play();
          overlay.classList.add('playing');
        } else {
          player.pause();
          overlay.classList.remove('playing');
        }
      });
      player.addEventListener('click', () => {
        player.pause();
        overlay.classList.remove('playing');
      });
    } else {
      if (rawHTML) {
        bubble.innerHTML = text;
      } else {
        bubble.textContent = text;
      }
      msgDiv.appendChild(bubble);
      chatBody.appendChild(msgDiv);
    }
    
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const addTypingIndicator = () => {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing';
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const removeTypingIndicator = () => {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  };

  const handleMessageSubmit = () => {
    const query = input.value.trim();
    if (query === '') return;

    addMessage(query, 'user');
    input.value = '';
    
    addTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      if (query.toLowerCase().includes('nası') || query.toLowerCase().includes('nasıl')) {
        addMessage('', 'bot', true);
      } else if (query.toLowerCase().includes('fiyat')) {
        addMessage('Aylık abonelik planlarımız Starter (Ücretsiz), Pro (₺499) ve Premium (Kurumsal) şeklindedir. Detaylar için üst menüden Fiyatlandırma sayfamıza göz atabilirsiniz.', 'bot');
      } else {
        addMessage('Sorunuzu aldım! Destek ekibimiz en kısa sürede yanıtlayacaktır. Dilerseniz menüdeki hazır başlıkları seçebilirsiniz.', 'bot');
      }
    }, 1200);
  };

  const handleOptionClick = (optionText) => {
    const opts = document.getElementById('ai-options-container');
    if (opts) opts.remove();

    addMessage(optionText, 'user');
    addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      if (optionText === 'Sistem Nasıl Çalışır?') {
        addMessage('', 'bot', true);
      } else if (optionText === 'Fiyatlandırma') {
        addMessage('Aylık abonelik planlarımız Starter (Ücretsiz), Pro (₺499) ve Premium (Kurumsal) şeklindedir. Detaylar için üst menüden Fiyatlandırma sayfamıza göz atabilirsiniz.', 'bot');
      } else if (optionText === 'Örnek AR Gör') {
        addMessage('Harika! Telefonunun kamerasıyla aşağıdaki QR kodu okutarak satışa hazır bir AR modelini anında deneyimleyebilirsin.<br><br><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://ar-code.com/NgU6gFv8p" alt="Iarone AR QR Kod" style="border-radius: var(--r-sm); margin-top: 10px; width: 160px; height: 160px;" />', 'bot', false, true);
      }

      setTimeout(() => {
        chatBody.insertAdjacentHTML('beforeend', optionsHTML);
        bindOptionEvents();
      }, 1000);
    }, 1000);
  };

  const bindOptionEvents = () => {
    document.querySelectorAll('.ai-opt-btn').forEach(btn => {
      btn.onclick = () => handleOptionClick(btn.textContent);
    });
  };

  toggleBtn.onclick = () => {
    chatbot.classList.add('open');
    if (!isInitialized) {
      isInitialized = true;
      addTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addMessage("Merhaba! Iarone'a hoş geldiniz. Size nasıl yardımcı olabilirim?", 'bot');
        chatBody.insertAdjacentHTML('beforeend', optionsHTML);
        bindOptionEvents();
      }, 800);
    }
  };

  closeBtn.onclick = () => chatbot.classList.remove('open');

  sendBtn.onclick = handleMessageSubmit;
  input.onkeydown = (e) => { if (e.key === 'Enter') handleMessageSubmit(); };
}

function initOnboardingModal() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;

  // Check localStorage flag
  if (localStorage.getItem('iarone-onboarded') === 'true') return;

  const title = document.getElementById('ob-title');
  const sub = document.getElementById('ob-sub');
  const badge = document.getElementById('ob-step-badge');
  const container = document.getElementById('onboarding-tips-container');
  const prevBtn = document.getElementById('ob-prev-btn');
  const nextBtn = document.getElementById('ob-next-btn');
  const stepText = document.getElementById('ob-step-text');
  const dots = document.querySelectorAll('.ob-dots .ob-dot');

  let step = 1;

  const stepsData = {
    1: {
      title: "Iarone Market'e Hoş Geldiniz",
      sub: "Platformu maksimum verimlilikle nasıl kullanacağınızı öğrenin.",
      badge: "Adım 1 / 3",
      stepText: "Adım 1/3: Başlarken",
      tips: [
        { icon: "🔍", title: "Gelişmiş Arama & Filtreleme", desc: "Aradığınız 3D modele anında ulaşmak için sol taraftaki filtre panelini ve debounced aramayı kullanın." },
        { icon: "✨", title: "Etkileşimli 3D Gösterim", desc: "Her karttaki '3D Model Yükle' butonuna tıklayarak modelin tarayıcı içinde dönmesini sağlayın." }
      ]
    },
    2: {
      title: "Kendi Fotoğraflarınızı Yükleyin",
      sub: "Fotoğraflarınızı satışa hazır 3D model haline getirmek çok kolay.",
      badge: "Adım 2 / 3",
      stepText: "Adım 2/3: Fotoğraf Yükleme",
      tips: [
        { icon: "📸", title: "Fotoğraf Kalite Analizi", desc: "Sistemimiz fotoğrafın ışıklandırmasını ve açısını otomatik denetleyerek hataları minimize eder." },
        { icon: "⚡", title: "Akıllı İyileştirme", desc: "Ham modelinizi tek tıkla pürüzsüzleştirin ve premium AR çıktısı elde edin." }
      ]
    },
    3: {
      title: "Hazırsınız!",
      sub: "Artırılmış Gerçeklik deneyimine başlamak için bekleme listemize katılın.",
      badge: "Adım 3 / 3",
      stepText: "Adım 3/3: Pazar Yeri",
      tips: [
        { icon: "🛒", title: "Bekleme Listesi Avantajı", desc: "Pazar yerinde yer alacak ilk satıcılardan biri olarak öncelikli görünürlük elde edin." },
        { icon: "💼", title: "Ticari Entegrasyon", desc: "Üretilen embed kodlarını web sitenize kopyalayıp hemen satış yapmaya başlayın." }
      ]
    }
  };

  const renderStep = (s) => {
    const data = stepsData[s];
    title.textContent = data.title;
    sub.textContent = data.sub;
    badge.textContent = data.badge;
    stepText.textContent = data.stepText;

    dots.forEach((d, idx) => {
      d.className = 'ob-dot';
      if (idx === s - 1) d.classList.add('active');
      else if (idx < s - 1) d.classList.add('done');
    });

    container.innerHTML = data.tips.map(t => `
      <div class="onboarding-tip">
        <div class="onboarding-tip-ico">${t.icon}</div>
        <div class="onboarding-tip-text">
          <strong>${t.title}</strong>
          <p>${t.desc}</p>
        </div>
      </div>
    `).join('');

    prevBtn.style.display = s === 1 ? 'none' : 'block';
    nextBtn.textContent = s === 3 ? 'Hemen Başla' : 'Devam Et';
  };

  const closeOnboarding = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    overlay.classList.remove('visible');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400); // match transition time
    try {
      localStorage.setItem('iarone-onboarded', 'true');
    } catch (err) {
      console.warn('Could not save onboarding state:', err);
    }
  };

  nextBtn.onclick = () => {
    if (step < 3) {
      step++;
      renderStep(step);
    } else {
      closeOnboarding();
    }
  };

  prevBtn.onclick = () => {
    if (step > 1) {
      step--;
      renderStep(step);
    }
  };

  const closeBtnEl = document.getElementById('onboarding-close');
  if (closeBtnEl) closeBtnEl.addEventListener('click', closeOnboarding);
  
  const skipBtnEl = document.getElementById('ob-skip-btn');
  if (skipBtnEl) skipBtnEl.addEventListener('click', closeOnboarding);

  // Start with 3 seconds delay
  setTimeout(() => {
    if (localStorage.getItem('iarone-onboarded') === 'true') return;
    try {
      renderStep(1);
      overlay.classList.add('visible');
    } catch (err) {
      console.error('Onboarding render error:', err);
    }
  }, 3000);
}

/* ─── FEATURE 5: DASHBOARD TABS, CODE SNIPPETS, SIDEBAR ─── */
function initDashboardTabs() {
  const tabs = document.querySelectorAll('#dash-tabs .dash-tab');
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      document.querySelectorAll('.dash-panel').forEach(p => {
        p.classList.remove('active');
        if (p.id === target) p.classList.add('active');
      });
    });
  });
}

function initCodeSnippets() {
  const copyBtn = document.querySelector('.copy-btn');
  const toast = document.getElementById('copy-toast');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const code = document.getElementById('code-html')?.textContent;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
      copyBtn.classList.add('copied');
      copyBtn.textContent = "Kopyalandı ✓";
      toast.classList.add('visible');

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.textContent = "Kopyala";
        toast.classList.remove('visible');
      }, 2500);
    }).catch(err => console.error("Clipboard copy failed: ", err));
  });
}

function initCollapsibleSidebar() {
  const btn = document.getElementById('sb-collapse-btn');
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.app-main');

  if (!btn || !sidebar || !main) return;

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('sidebar-collapsed');
  });
}

/* ─── INIT ─── */
const initApp = () => {
  // Preloader must run first (before theme so it respects current theme)
  initPreloader();

  applyTheme(getTheme());
  applyLang(getLang());

  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  initNavScroll();
  initMobileMenu();
  initLangSwitcher();
  initDynamicNavbar();
  initScrollReveal();
  setActiveLink();
  initBASlider();
  initBetaForm();
  initUploadZone();
  initSidebar();
  initPricingCards();
  initPageTransitions();
  initInteractiveVideo();
  initWaitlistForm();

  // Next-Level Upgrade Initializers
  initHeroDragDrop();
  initButtonMicroInteractions();
  initMarketLazyLoad();
  initMarketSearch();
  initMarketFilters();
  initEnhancedAIChat();
  initOnboardingModal();
  initDashboardTabs();
  initCodeSnippets();
  initCollapsibleSidebar();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
