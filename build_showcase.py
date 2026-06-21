import re

# Update concept-g.html
html_file = 'concept-g.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Make the right column slightly larger
html = html.replace('.sec-logo { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center; margin-bottom: 24px; }', 
                    '.sec-logo { display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center; margin-bottom: 24px; }')

# Replace the logo-img-wrap with showcase
showcase_html = """    <div class="logo-img-wrap reveal visible" style="display: flex; flex-direction: column; width: 100%;">
      <div class="sc-wrapper">
        <!-- Slide 1: Watch -->
        <div class="sc-slide active" id="sc-slide-0">
          <div class="sc-flipper">
            <div class="sc-front">
              <div class="sc-card">
                <div class="sc-info">
                  <div class="sc-cat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/></svg> SAATLER</div>
                  <h3 class="sc-title">IARONE LUXOR OTOMATİK SAAT</h3>
                  <ul class="sc-feats">
                    <li>İsviçre otomatik mekanizma</li>
                    <li>Safir kristal cam</li>
                    <li>5 ATM su geçirmezlik</li>
                  </ul>
                  <div class="sc-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ÜSTÜN İŞÇİLİK</div>
                </div>
                <div class="sc-img-box">
                  <img src="slide_watch.png" alt="Watch">
                  <button class="sc-ar-btn" onclick="flipSlide(0)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></button>
                </div>
              </div>
            </div>
            <div class="sc-back">
              <div class="sc-phone-mockup">
                <img src="slide_watch_ar.png" alt="Watch AR">
                <button class="sc-close-btn" onclick="unflipSlide(0)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2: Cake -->
        <div class="sc-slide" id="sc-slide-1">
          <div class="sc-flipper">
            <div class="sc-front">
              <div class="sc-card">
                <div class="sc-info">
                  <div class="sc-cat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13a7 7 0 0 1 14 0H5Z"/><path d="M12 9v4"/><line x1="2" y1="17" x2="22" y2="17"/></svg> TATLILAR</div>
                  <h3 class="sc-title">IARONE ÇİKOLATALI PASTA</h3>
                  <ul class="sc-feats">
                    <li>Gerçekçi malzeme dokusu</li>
                    <li>Detaylı 3D görünüm</li>
                    <li>Canlı renk ve ışık</li>
                  </ul>
                  <div class="sc-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> GERÇEKÇİ GÖRÜNÜM</div>
                </div>
                <div class="sc-img-box">
                  <img src="slide_cake.png" alt="Cake">
                  <button class="sc-ar-btn" onclick="flipSlide(1)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></button>
                </div>
              </div>
            </div>
            <div class="sc-back">
              <div class="sc-phone-mockup">
                <img src="slide_cake_ar.png" alt="Cake AR">
                <button class="sc-close-btn" onclick="unflipSlide(1)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3: Lamp -->
        <div class="sc-slide" id="sc-slide-2">
          <div class="sc-flipper">
            <div class="sc-front">
              <div class="sc-card">
                <div class="sc-info">
                  <div class="sc-cat"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 10h8l2 6H6l2-6Z"/><path d="M12 4v6"/><path d="M10 22h4"/></svg> AYDINLATMA</div>
                  <h3 class="sc-title">IARONE LUNA MASA LAMBASI</h3>
                  <ul class="sc-feats">
                    <li>Minimal tasarım</li>
                    <li>Yumuşak ortam aydınlatması</li>
                    <li>İlham veren form</li>
                  </ul>
                  <div class="sc-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> FERAH AYDINLATMA</div>
                </div>
                <div class="sc-img-box">
                  <img src="slide_lamp.png" alt="Lamp">
                  <button class="sc-ar-btn" onclick="flipSlide(2)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></button>
                </div>
              </div>
            </div>
            <div class="sc-back">
              <div class="sc-phone-mockup">
                <img src="slide_lamp_ar.png" alt="Lamp AR">
                <button class="sc-close-btn" onclick="unflipSlide(2)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="sc-controls">
        <div class="sc-dot active" onclick="goToSlide(0)"></div>
        <div class="sc-dot" onclick="goToSlide(1)"></div>
        <div class="sc-dot" onclick="goToSlide(2)"></div>
      </div>
    </div>"""

# Replace in html
html = re.sub(r'<div class="logo-img-wrap reveal visible">\s*<img src="crafter_product_depth.webp.png" class="logo-img" alt="[^"]*">\s*</div>', showcase_html, html)

js_logic = """  <script>
    function switchSegment(tabId) {
      document.getElementById('tab-corp').style.display = tabId === 'corp' ? 'block' : 'none';
      document.getElementById('tab-personal').style.display = tabId === 'personal' ? 'block' : 'none';
      document.getElementById('btn-corp').classList.toggle('active', tabId === 'corp');
      document.getElementById('btn-personal').classList.toggle('active', tabId === 'personal');
    }

    /* SHOWCASE CAROUSEL LOGIC */
    let scCurrent = 0;
    let scInterval;
    
    function scStart() {
      scInterval = setInterval(() => {
        goToSlide((scCurrent + 1) % 3);
      }, 5000);
    }
    
    function scStop() {
      clearInterval(scInterval);
    }

    function goToSlide(idx) {
      document.querySelectorAll('.sc-slide').forEach((s, i) => {
        if (i === idx) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
          s.classList.remove('flipped');
        }
      });
      document.querySelectorAll('.sc-dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
      scCurrent = idx;
      scStop();
      scStart();
    }

    function flipSlide(idx) {
      document.getElementById('sc-slide-' + idx).classList.add('flipped');
      scStop(); // Pause auto-rotate
    }

    function unflipSlide(idx) {
      document.getElementById('sc-slide-' + idx).classList.remove('flipped');
      scStart(); // Resume
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      scStart();
    });
  </script>"""

html = re.sub(r'<script>\s*function switchSegment.*?</script>', js_logic, html, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

css_code = """
/* --- SHOWCASE CAROUSEL --- */
.sc-wrapper {
  position: relative;
  width: 100%;
  height: 380px;
  perspective: 2000px;
}
.sc-slide {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.sc-slide.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  z-index: 2;
}
.sc-flipper {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.sc-slide.flipped .sc-flipper {
  transform: rotateY(180deg);
}
.sc-front, .sc-back {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  backface-visibility: hidden;
  border-radius: 28px;
}
.sc-back {
  transform: rotateY(180deg);
}

/* Front Card */
.sc-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(0,0,0,0.04);
  display: flex;
  height: 100%;
  padding: 24px;
  gap: 20px;
}
.sc-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.sc-cat {
  font-size: 11px; font-weight: 600; color: #64748b; letter-spacing: 0.1em;
  display: flex; align-items: center; gap: 8px; margin-bottom: 12px; text-transform: uppercase;
}
.sc-title {
  font-size: 22px; font-weight: 700; line-height: 1.2; color: #0f172a; margin-bottom: 16px;
  font-family: var(--font);
}
.sc-feats {
  list-style: none; padding: 0; margin: 0 0 auto 0;
  font-size: 13px; color: #475569; line-height: 1.6;
}
.sc-feats li {
  margin-bottom: 6px;
}
.sc-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(15,23,42,0.04); padding: 8px 12px; border-radius: 12px;
  font-size: 11px; font-weight: 700; color: #0f172a; letter-spacing: 0.05em;
  width: max-content;
}
.sc-img-box {
  flex: 1.2;
  position: relative;
  border-radius: 20px;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f8fafc 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.03);
}
.sc-img-box img {
  max-width: 90%; max-height: 90%; object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.sc-card:hover .sc-img-box img {
  transform: scale(1.05);
}
.sc-ar-btn {
  position: absolute; bottom: 12px; right: 12px;
  background: #fff; width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  cursor: pointer; transition: all 0.3s;
}
.sc-ar-btn:hover { transform: scale(1.1) rotate(90deg); box-shadow: 0 8px 24px rgba(37,99,235,0.15); }

/* Back AR View */
.sc-phone-mockup {
  width: 100%; height: 100%;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  background: #000;
  box-shadow: 0 24px 48px rgba(0,0,0,0.15);
}
.sc-phone-mockup img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.95;
}
.sc-close-btn {
  position: absolute; top: 16px; right: 16px;
  background: rgba(0,0,0,0.4); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff; width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  transition: all 0.3s;
}
.sc-close-btn:hover { background: rgba(0,0,0,0.6); transform: scale(1.1) rotate(-90deg); }

/* Controls */
.sc-controls {
  display: flex; justify-content: center; gap: 8px; margin-top: 24px;
}
.sc-dot {
  width: 8px; height: 8px; border-radius: 50%; background: rgba(15,23,42,0.1); cursor: pointer; transition: all 0.3s;
}
.sc-dot.active {
  background: #1d1d1f; transform: scale(1.3);
}

@media (max-width: 900px) {
  .sc-card { flex-direction: column; padding: 16px; gap: 16px; }
  .sc-wrapper { height: auto; min-height: 500px; }
  .sc-img-box { min-height: 200px; }
  .sec-logo { grid-template-columns: 1fr !important; }
}
"""

with open('styles.v5.css', 'a', encoding='utf-8') as f:
    f.write(css_code)
