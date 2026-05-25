/* =====================================================
   IARONE — app.js v2.1
   Theme toggle, i18n, nav, animations, 3D preloader
   ===================================================== */

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
function getLang() { return localStorage.getItem(LANG_KEY) || 'tr'; }

function deepGet(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function applyLang(lang) {
  if (typeof i18n === 'undefined') return;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.setAttribute('lang', lang === 'tr' ? 'tr' : 'en');

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
    const input = form.querySelector('input[type="email"]');
    const website = form.querySelector('input[name="website"]');
    if (!input || !input.value) return;

    const originalText = btn.textContent;
    const lang = getLang();
    btn.textContent = '...';
    btn.disabled = true;

    try {
      const payload = {
        email: input.value,
        intent: 'EARLY_ACCESS',
        source: 'LANDING_PRICING_BETA',
        pageUrl: window.location.href,
        website: website ? website.value : ''
      };

      const res = await fetch((window.IARONE_API_URL || 'http://localhost:3000/api') + '/leads', {
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

      btn.textContent = (lang === 'tr') ? '✅ Eklendi!' : '✅ Added!';
      btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
      input.value  = '';
    } catch (err) {
      console.error('Lead Capture Error:', err);
      btn.textContent = (lang === 'tr') ? 'Hata! Tekrar deneyin.' : 'Error! Try again.';
      btn.style.background = 'var(--err)';
      
      // Kaydedilemeyenleri localStorage'a at
      try {
        const payload = {
          email: input.value, intent: 'EARLY_ACCESS', source: 'LANDING_PRICING_BETA',
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
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.cssText = 'opacity:0;transform:translateY(-8px);transition:all .22s ease;';
      setTimeout(() => { location.href = href; }, 230);
    });
  });
}

/* ─── AI CHATBOT WIDGET ─── */
function initAIChatbot() {
  const widget = document.getElementById('ai-widget');
  const toggleBtn = document.getElementById('ai-toggle-btn');
  const closeBtn = document.getElementById('ai-close-btn');
  const chatBody = document.getElementById('ai-chat-body');
  
  if (!widget || !toggleBtn || !closeBtn || !chatBody) return;

  let isInitialized = false;

  const responses = {
    'Sistem Nasıl Çalışır?': 'Iarone, yüklediğiniz herhangi bir 2D ürün fotoğrafını analiz eder, ışıklandırma ve dokularını iyileştirerek saniyeler içinde 3D modele dönüştürür. Üstelik herhangi bir teknik bilgiye ihtiyacınız yoktur.',
    'Fiyatlandırma': 'Fiyatlandırma planlarımız aylık abonelik şeklindedir. İhtiyaçlarınıza göre Starter, Pro veya Enterprise planlarından birini seçebilirsiniz. Detaylar için üst menüdeki Fiyatlandırma sayfasına göz atabilirsiniz.',
    'Örnek AR Gör': 'Harika! Telefonunun kamerasıyla aşağıdaki QR kodu okutarak satışa hazır bir AR modelini anında deneyimleyebilirsin.<br><br><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://ar-code.com/NgU6gFv8p" alt="Iarone AR QR Kod" style="border-radius: var(--r-sm); margin-top: 10px; width: 160px; height: 160px;" />'
  };

  const optionsHTML = `
    <div class="ai-options" id="ai-options-container">
      <button class="ai-opt-btn">Sistem Nasıl Çalışır?</button>
      <button class="ai-opt-btn">Fiyatlandırma</button>
      <button class="ai-opt-btn">Örnek AR Gör</button>
    </div>
  `;

  function addMessage(text, sender = 'bot', rawHTML = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    if (rawHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }
    msgDiv.appendChild(bubble);
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing';
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  }

  function handleOptionClick(optionText) {
    // Remove options
    const optionsContainer = document.getElementById('ai-options-container');
    if (optionsContainer) optionsContainer.remove();

    // User message
    addMessage(optionText, 'user');

    // Show typing
    addTypingIndicator();

    // Bot reply
    setTimeout(() => {
      removeTypingIndicator();
      addMessage(responses[optionText], 'bot', true);
      
      // Bring back options after a short delay
      setTimeout(() => {
        chatBody.insertAdjacentHTML('beforeend', optionsHTML);
        bindOptionEvents();
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 800);
    }, 1000);
  }

  function bindOptionEvents() {
    const btns = chatBody.querySelectorAll('.ai-opt-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => handleOptionClick(btn.textContent));
    });
  }

  function openChat() {
    widget.classList.add('open');
    if (!isInitialized) {
      isInitialized = true;
      addTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addMessage('Merhaba! Iarone\'a hoş geldin. Sana nasıl yardımcı olabilirim?', 'bot');
        chatBody.insertAdjacentHTML('beforeend', optionsHTML);
        bindOptionEvents();
      }, 800);
    }
  }

  function closeChat() {
    widget.classList.remove('open');
  }

  toggleBtn.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
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

      const res = await fetch((window.IARONE_API_URL || 'http://localhost:3000/api') + '/leads', {
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

      btn.textContent = (lang === 'tr') ? '✅ Başvurunuz alındı!' : '✅ Application received!';
      btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
      
      form.querySelectorAll('input').forEach(i => {
        if (i.type !== 'radio' && i.type !== 'checkbox' && i.type !== 'submit') i.value = '';
      });
    } catch (err) {
      console.error('Lead Capture Error:', err);
      btn.textContent = (lang === 'tr') ? 'Hata! Tekrar deneyin.' : 'Error! Try again.';
      btn.style.background = 'var(--err)';
      
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

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
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
  initAIChatbot();
  initInteractiveVideo();
  initWaitlistForm();
});
