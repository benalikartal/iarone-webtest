import re

html_file = 'concept-g.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Locate the premium-section
start_marker = '<section class="premium-section container-fluid"'
end_marker = '</section>'
start_idx = html.find(start_marker)

if start_idx != -1:
    end_idx = html.find(end_marker, start_idx)
    if end_idx != -1:
        end_idx += len(end_marker)
        
        new_hero_html = """<section class="premium-section container-fluid" style="padding-top: 80px; padding-bottom: 60px; max-width: 1400px; margin: 0 auto;">
  
  <!-- Top: Centered Hero Text -->
  <div class="hero-text-centered reveal visible" style="text-align: center; max-width: 800px; margin: 0 auto 40px;">
    <div style="display: flex; justify-content: center; margin-bottom: 16px;"><span class="badge">CRAFTED PRODUCT DEPTH.</span></div>
    <h2 style="font-size:42px; line-height:1.15; margin-bottom: 16px; font-weight:800;">Ürün görsellerini etkileşimli <span style="color:#3b82f6;">3D</span> ve <span style="color:#3b82f6;">AR</span> deneyimlerine dönüştürün.</h2>
    <p style="font-size:16px; color:#64748b; margin-bottom: 24px;">Iarone, markaların ürünlerini web ve mobilde gerçekçi 3D ile sergilemesini ve AR ile anında deneyimletmesini sağlar.</p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <a href="#demo" class="btn btn-primary btn-primary-lg" style="padding: 12px 24px; font-size: 15px;">Demo Talep Et</a>
      <a href="#" class="btn btn-ghost btn-ghost-lg" style="padding: 12px 24px; font-size: 15px;">Nasıl Çalışır?</a>
    </div>
  </div>

  <!-- Middle: Interactive 3-Card Grid -->
  <div class="interactive-grid reveal visible">
    
    <!-- Card 1: Watch -->
    <div class="ix-card" id="ix-card-1">
       <div class="ix-toggle-pill">
          <button class="ix-btn active" onclick="ixToggle(1, '3d')">3D Görünüm</button>
          <button class="ix-btn" onclick="ixToggle(1, 'ar')">AR Deneyimi</button>
       </div>
       <div class="ix-card-inner">
          <!-- Front: 3D -->
          <div class="ix-face ix-front">
             <div class="ix-3d-content">
               <div class="ix-img-wrap">
                 <img src="slide_watch.png" alt="Watch">
               </div>
               <div class="ix-info">
                 <div class="ix-cat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/></svg> SAATLER</div>
                 <h3 class="ix-title">IARONE LUXOR OTOMATİK SAAT</h3>
                 <div class="ix-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ÜSTÜN İŞÇİLİK</div>
               </div>
             </div>
          </div>
          <!-- Back: AR -->
          <div class="ix-face ix-back">
             <div class="ix-ar-content">
               <img src="slide_watch_ar.png" alt="Watch AR">
               <div class="ix-ar-overlay-bottom">
                 <div class="ix-ar-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right:4px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Dokunarak açın • Yakınlaştırmak için sıkıştırın</div>
               </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Card 2: Cake -->
    <div class="ix-card" id="ix-card-2">
       <div class="ix-toggle-pill">
          <button class="ix-btn active" onclick="ixToggle(2, '3d')">3D Görünüm</button>
          <button class="ix-btn" onclick="ixToggle(2, 'ar')">AR Deneyimi</button>
       </div>
       <div class="ix-card-inner">
          <!-- Front: 3D -->
          <div class="ix-face ix-front">
             <div class="ix-3d-content">
               <div class="ix-img-wrap">
                 <img src="slide_cake.png" alt="Cake">
               </div>
               <div class="ix-info">
                 <div class="ix-cat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13a7 7 0 0 1 14 0H5Z"/><path d="M12 9v4"/><line x1="2" y1="17" x2="22" y2="17"/></svg> TATLILAR</div>
                 <h3 class="ix-title">IARONE ÇİKOLATALI PASTA</h3>
                 <div class="ix-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> GERÇEKÇİ DOKU</div>
               </div>
             </div>
          </div>
          <!-- Back: AR -->
          <div class="ix-face ix-back">
             <div class="ix-ar-content">
               <img src="slide_cake_ar.png" alt="Cake AR">
               <div class="ix-ar-overlay-bottom">
                 <div class="ix-ar-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right:4px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Etrafında gezin • Yakınlaştırmak için sıkıştırın</div>
               </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Card 3: Lamp -->
    <div class="ix-card" id="ix-card-3">
       <div class="ix-toggle-pill">
          <button class="ix-btn active" onclick="ixToggle(3, '3d')">3D Görünüm</button>
          <button class="ix-btn" onclick="ixToggle(3, 'ar')">AR Deneyimi</button>
       </div>
       <div class="ix-card-inner">
          <!-- Front: 3D -->
          <div class="ix-face ix-front">
             <div class="ix-3d-content">
               <div class="ix-img-wrap">
                 <img src="slide_lamp.png" alt="Lamp">
               </div>
               <div class="ix-info">
                 <div class="ix-cat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 10h8l2 6H6l2-6Z"/><path d="M12 4v6"/><path d="M10 22h4"/></svg> AYDINLATMA</div>
                 <h3 class="ix-title">IARONE LUNA MASA LAMBASI</h3>
                 <div class="ix-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> GERÇEK ÖLÇEK</div>
               </div>
             </div>
          </div>
          <!-- Back: AR -->
          <div class="ix-face ix-back">
             <div class="ix-ar-content">
               <img src="slide_lamp_ar.png" alt="Lamp AR">
               <div class="ix-ar-overlay-bottom">
                 <div class="ix-ar-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right:4px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Odaya yerleştir • Dokunarak açın</div>
               </div>
             </div>
          </div>
       </div>
    </div>
  </div>

  <script>
    function ixToggle(cardId, view) {
      const card = document.getElementById('ix-card-' + cardId);
      const btns = card.querySelectorAll('.ix-btn');
      btns.forEach(b => b.classList.remove('active'));
      
      if(view === 'ar') {
        card.classList.add('show-ar');
        btns[1].classList.add('active');
      } else {
        card.classList.remove('show-ar');
        btns[0].classList.add('active');
      }
    }
  </script>

</section>"""
        
        html = html[:start_idx] + new_hero_html + html[end_idx:]

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

css_code = """
/* --- INTERACTIVE 3-CARD GRID --- */
.interactive-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
}
.ix-card {
  position: relative; perspective: 1200px; height: 420px;
}
.ix-toggle-pill {
  position: absolute; top: 16px; left: 50%; transform: translateX(-50%); z-index: 10;
  display: flex; background: rgba(255,255,255,0.7); backdrop-filter: blur(20px);
  padding: 4px; border-radius: 100px; box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid rgba(255,255,255,0.5);
}
.ix-btn {
  border: none; background: transparent; padding: 8px 16px; font-size: 11px; font-weight: 700; color: #64748b; border-radius: 100px; cursor: pointer; transition: all 0.3s;
}
.ix-btn.active {
  background: #fff; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.ix-card-inner {
  position: relative; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d;
}
.ix-card.show-ar .ix-card-inner {
  transform: rotateY(180deg);
}
.ix-face {
  position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 32px; overflow: hidden;
}

/* Front Face */
.ix-front {
  background: #fdfdfd; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 16px 40px rgba(0,0,0,0.03);
}
.ix-3d-content {
  display: flex; flex-direction: column; height: 100%; padding: 24px; padding-top: 64px; /* Space for pill */
}
.ix-img-wrap {
  flex: 1; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%); border-radius: 20px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
}
.ix-img-wrap img {
  max-width: 85%; max-height: 85%; object-fit: contain; transition: transform 0.5s ease;
}
.ix-card:hover .ix-img-wrap img { transform: scale(1.08) translateY(-4px); }
.ix-info {
  margin-top: 20px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center;
}
.ix-cat { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px; }
.ix-title { font-size: 16px; font-weight: 800; line-height: 1.3; color: #0f172a; margin: 0; font-family: var(--font); }
.ix-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(15,23,42,0.04); padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 700; color: #0f172a; margin-top: 4px; }

/* Back Face */
.ix-back {
  background: #000; transform: rotateY(180deg); box-shadow: 0 16px 40px rgba(0,0,0,0.1);
}
.ix-ar-content {
  position: relative; width: 100%; height: 100%;
}
.ix-ar-content img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transform: scale(1.65); transition: transform 0.6s ease;
}
.ix-card:hover .ix-ar-content img { opacity: 1; transform: scale(1.7); }
.ix-ar-overlay-bottom {
  position: absolute; bottom: 20px; left: 20px; right: 20px; display: flex; justify-content: center; z-index: 2;
}
.ix-ar-hint {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); color: #fff; font-size: 11px; font-weight: 500; text-align: center; padding: 10px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1);
}

@media (max-width: 1024px) {
  .interactive-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .interactive-grid { grid-template-columns: 1fr; }
}
"""

with open('styles.v5.css', 'a', encoding='utf-8') as f:
    f.write(css_code)
