import re

html_file = 'concept-g.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Locate the premium-section
start_marker = '<section class="premium-section container" style="padding-top: 100px;">'
end_marker = '</section>'
start_idx = html.find(start_marker)

# Find the matching closing tag
if start_idx != -1:
    end_idx = html.find(end_marker, start_idx)
    if end_idx != -1:
        end_idx += len(end_marker)
        
        new_hero_html = """<section class="premium-section container" style="padding-top: 100px; padding-bottom: 60px;">
  
  <!-- Top: Centered Hero Text -->
  <div class="hero-text-centered reveal visible" style="text-align: center; max-width: 800px; margin: 0 auto 60px;">
    <div style="display: flex; justify-content: center; margin-bottom: 20px;"><span class="badge">CRAFTED PRODUCT DEPTH.</span></div>
    <h2 style="font-size:46px; line-height:1.15; margin-bottom: 24px; font-weight:800;">Ürün görsellerini etkileşimli <span style="color:#3b82f6;">3D</span> ve <span style="color:#3b82f6;">AR</span> deneyimlerine dönüştürün.</h2>
    <p style="font-size:18px; color:#64748b; margin-bottom: 32px;">Iarone, markaların ürünlerini web ve mobilde gerçekçi 3D ile sergilemesini ve AR ile anında deneyimletmesini sağlar.</p>
    <div style="display: flex; gap: 16px; justify-content: center;">
      <a href="#demo" class="btn btn-primary btn-primary-lg" style="padding: 14px 28px; font-size: 16px;">Demo Talep Et</a>
      <a href="#" class="btn btn-ghost btn-ghost-lg" style="padding: 14px 28px; font-size: 16px;">Nasıl Çalışır?</a>
    </div>
  </div>

  <!-- Middle: 3x2 Full Showcase Grid -->
  <div class="full-grid-showcase reveal visible" style="display: flex; flex-direction: column; gap: 32px; margin-bottom: 60px;">
    
    <!-- Top Row: 3D Cards -->
    <div class="fg-row">
      <!-- Card 1: Watch -->
      <div class="fg-card-3d">
         <div class="fg-info">
           <div class="fg-cat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/></svg> SAATLER</div>
           <h3 class="fg-title">IARONE LUXOR OTOMATİK SAAT</h3>
           <ul class="fg-feats">
             <li>İsviçre otomatik mekanizma</li>
             <li>Safir kristal cam</li>
             <li>5 ATM su geçirmezlik</li>
           </ul>
           <div class="fg-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ÜSTÜN İŞÇİLİK</div>
         </div>
         <div class="fg-img-box">
           <img src="slide_watch.png" alt="Watch">
           <div class="fg-next-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
         </div>
      </div>

      <!-- Card 2: Cake -->
      <div class="fg-card-3d">
         <div class="fg-info">
           <div class="fg-cat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13a7 7 0 0 1 14 0H5Z"/><path d="M12 9v4"/><line x1="2" y1="17" x2="22" y2="17"/></svg> TATLILAR</div>
           <h3 class="fg-title">IARONE ÇİKOLATALI PASTA</h3>
           <ul class="fg-feats">
             <li>Gerçekçi malzeme dokusu</li>
             <li>Detaylı 3D görünüm</li>
             <li>Canlı renk ve ışık</li>
           </ul>
           <div class="fg-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> GERÇEKÇİ GÖRÜNÜM</div>
         </div>
         <div class="fg-img-box">
           <img src="slide_cake.png" alt="Cake">
           <div class="fg-next-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
         </div>
      </div>

      <!-- Card 3: Lamp -->
      <div class="fg-card-3d">
         <div class="fg-info">
           <div class="fg-cat"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 10h8l2 6H6l2-6Z"/><path d="M12 4v6"/><path d="M10 22h4"/></svg> AYDINLATMA</div>
           <h3 class="fg-title">IARONE LUNA MASA LAMBASI</h3>
           <ul class="fg-feats">
             <li>Minimal tasarım</li>
             <li>Yumuşak ortam aydınlatması</li>
             <li>İlham veren form</li>
           </ul>
           <div class="fg-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> FERAH AYDINLATMA</div>
         </div>
         <div class="fg-img-box">
           <img src="slide_lamp.png" alt="Lamp">
           <div class="fg-next-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
         </div>
      </div>
    </div>

    <!-- Bottom Row: AR Cards -->
    <div class="fg-row">
      <!-- Card 1: Watch AR -->
      <div class="fg-card-ar">
         <img src="slide_watch_ar.png" alt="Watch AR Mockup">
         <div class="fg-ar-overlay-top">
           <div class="fg-ar-back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>
           <div class="fg-ar-title">IARONE LUXOR OTOMATİK SAAT</div>
           <div class="fg-ar-options"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
         </div>
         <div class="fg-ar-overlay-bottom">
           <div class="fg-ar-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right:4px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Dokunarak kutu açılımı • Yakınlaştırmak için sıkıştırın</div>
         </div>
         <div class="fg-ar-controls-right">
           <div class="fg-ar-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><span>AR</span></div>
           <div class="fg-ar-btn" style="margin-top: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-8.4l2.75 3.33"></path></svg><span>360°</span></div>
         </div>
      </div>

      <!-- Card 2: Cake AR -->
      <div class="fg-card-ar">
         <img src="slide_cake_ar.png" alt="Cake AR Mockup">
         <div class="fg-ar-overlay-top">
           <div class="fg-ar-back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>
           <div class="fg-ar-title">IARONE ÇİKOLATALI PASTA</div>
           <div class="fg-ar-options"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
         </div>
         <div class="fg-ar-overlay-bottom">
           <div class="fg-ar-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right:4px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Görüntülemek için dokunun • Yakınlaştırmak için sıkıştırın</div>
         </div>
         <div class="fg-ar-controls-right">
           <div class="fg-ar-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><span>AR</span></div>
           <div class="fg-ar-btn" style="margin-top: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-8.4l2.75 3.33"></path></svg><span>360°</span></div>
         </div>
      </div>

      <!-- Card 3: Lamp AR -->
      <div class="fg-card-ar">
         <img src="slide_lamp_ar.png" alt="Lamp AR Mockup">
         <div class="fg-ar-overlay-top">
           <div class="fg-ar-back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>
           <div class="fg-ar-title">IARONE LUNA MASA LAMBASI</div>
           <div class="fg-ar-options"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
         </div>
         <div class="fg-ar-overlay-bottom">
           <div class="fg-ar-hint"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right:4px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Dokunarak kutu açılımı • Yakınlaştırmak için sıkıştırın</div>
         </div>
         <div class="fg-ar-controls-right">
           <div class="fg-ar-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><span>AR</span></div>
           <div class="fg-ar-btn" style="margin-top: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-8.4l2.75 3.33"></path></svg><span>360°</span></div>
         </div>
      </div>
    </div>
  </div>

  <!-- Bottom: 4 Feature highlights -->
  <div class="fg-features reveal visible">
    <div class="fg-feat">
       <div class="fg-feat-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
       <div class="fg-feat-text">
         <h4>GERÇEK ÖLÇEKLİ AR</h4>
         <p>Ürünleri kendi alanınızda gerçek ölçekte deneyimleyin.</p>
       </div>
    </div>
    <div class="fg-feat">
       <div class="fg-feat-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div>
       <div class="fg-feat-text">
         <h4>3D ÖNİZLEME</h4>
         <p>Her detayı yakından inceleyin, 360° döndürerek keşfedin.</p>
       </div>
    </div>
    <div class="fg-feat">
       <div class="fg-feat-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
       <div class="fg-feat-text">
         <h4>GÜVENLİ & OPTİMİZE</h4>
         <p>Verileriniz korunur, modeller hızlı yüklenir.</p>
       </div>
    </div>
    <div class="fg-feat">
       <div class="fg-feat-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>
       <div class="fg-feat-text">
         <h4>KOLAY ENTEGRASYON</h4>
         <p>E-ticaret sitenize hızla entegre edin.</p>
       </div>
    </div>
  </div>

</section>"""
        
        html = html[:start_idx] + new_hero_html + html[end_idx:]

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

css_code = """
/* --- FULL GRID SHOWCASE (OPTION 2) --- */
.fg-row {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}

/* 3D Card */
.fg-card-3d {
  background: #fdfdfd;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.02);
  padding: 24px;
  display: flex; flex-direction: row; align-items: center; gap: 16px;
  transition: all 0.4s ease;
}
.fg-card-3d:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}
.fg-info {
  flex: 1.2; display: flex; flex-direction: column;
}
.fg-cat {
  font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 0.05em;
  display: flex; align-items: center; gap: 6px; margin-bottom: 12px;
}
.fg-title {
  font-size: 16px; font-weight: 700; line-height: 1.3; color: #0f172a; margin-bottom: 12px;
  font-family: var(--font);
}
.fg-feats {
  list-style: none; padding: 0; margin: 0 0 16px 0;
  font-size: 12px; color: #475569; line-height: 1.5;
}
.fg-feats li { margin-bottom: 4px; }
.fg-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(15,23,42,0.04); padding: 8px 10px; border-radius: 8px;
  font-size: 10px; font-weight: 700; color: #0f172a; width: max-content;
}
.fg-img-box {
  flex: 1;
  position: relative;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%);
  border-radius: 20px;
  height: 200px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.03);
}
.fg-img-box img {
  max-width: 90%; max-height: 90%; object-fit: contain;
  transition: transform 0.4s;
}
.fg-card-3d:hover .fg-img-box img { transform: scale(1.05); }
.fg-next-btn {
  position: absolute; right: 8px; bottom: 8px;
  background: #fff; width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s;
}
.fg-next-btn:hover { transform: scale(1.1) translateX(2px); box-shadow: 0 6px 14px rgba(37,99,235,0.15); }

/* AR Card */
.fg-card-ar {
  position: relative;
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  height: 240px;
  background: #000;
  transition: all 0.4s ease;
}
.fg-card-ar:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
.fg-card-ar img {
  width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: all 0.4s;
}
.fg-card-ar:hover img { opacity: 1; transform: scale(1.02); }
.fg-ar-overlay-top {
  position: absolute; top: 12px; left: 12px; right: 12px;
  display: flex; align-items: center; justify-content: space-between; z-index: 2;
}
.fg-ar-back, .fg-ar-options {
  background: rgba(255,255,255,0.2); backdrop-filter: blur(8px);
  width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff;
  border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.3s;
}
.fg-ar-back:hover, .fg-ar-options:hover { background: rgba(255,255,255,0.3); }
.fg-ar-title {
  color: #fff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.fg-ar-overlay-bottom {
  position: absolute; bottom: 12px; left: 12px; right: 12px; z-index: 2;
}
.fg-ar-hint {
  background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); color: #fff;
  font-size: 10px; font-weight: 500; text-align: center; padding: 10px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
}
.fg-ar-controls-right {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  display: flex; flex-direction: column; z-index: 2;
}
.fg-ar-btn {
  background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); color: #fff;
  width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; flex-direction: column; border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer; transition: all 0.3s; gap: 2px;
}
.fg-ar-btn svg { width: 16px; height: 16px; }
.fg-ar-btn:hover { background: rgba(0,0,0,0.6); transform: scale(1.1); }

/* Features Footer */
.fg-features {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  padding-top: 40px; border-top: 1px solid rgba(0,0,0,0.06);
}
.fg-feat {
  display: flex; gap: 16px; align-items: flex-start;
}
.fg-feat-icon {
  flex-shrink: 0; color: #1d1d1f;
  background: rgba(15,23,42,0.03); padding: 12px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s;
}
.fg-feat:hover .fg-feat-icon {
  background: #f1f5f9; transform: scale(1.1); color: #3b82f6;
}
.fg-feat-text h4 {
  font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 6px;
}
.fg-feat-text p {
  font-size: 13px; color: #64748b; line-height: 1.5; margin: 0;
}

@media (max-width: 1100px) {
  .fg-card-3d { flex-direction: column; text-align: center; }
  .fg-info { align-items: center; }
  .fg-img-box { width: 100%; height: 160px; margin-top: 16px; }
}
@media (max-width: 900px) {
  .fg-row { grid-template-columns: repeat(2, 1fr); }
  .fg-features { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .fg-row { grid-template-columns: 1fr; }
  .fg-features { grid-template-columns: 1fr; }
}
"""

with open('styles.v5.css', 'a', encoding='utf-8') as f:
    f.write(css_code)
