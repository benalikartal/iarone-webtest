import re

html_file = 'concept-g.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Locate the premium-section
start_marker = '<section class="premium-section container-fluid" style="padding-top: 60px; padding-bottom: 30px; max-width: 1400px; margin: 0 auto;">'
end_marker = '</section>'
start_idx = html.find(start_marker)

if start_idx != -1:
    end_idx = html.find(end_marker, start_idx)
    if end_idx != -1:
        end_idx += len(end_marker)
        
        new_hero_html = """<section class="premium-section container-fluid" style="padding-top: 70px; padding-bottom: 40px; max-width: 1440px; margin: 0 auto;">
  
  <div class="hero-split">
    <!-- LEFT SIDE: TEXT -->
    <div class="hero-left reveal visible">
      <div style="display: flex; margin-bottom: 16px;"><span class="badge">CRAFTED PRODUCT DEPTH.</span></div>
      <h2 style="font-size:42px; line-height:1.15; margin-bottom: 20px; font-weight:800; text-align: left;">Ürün görsellerini etkileşimli <span style="color:#3b82f6;">3D</span> ve <span style="color:#3b82f6;">AR</span> deneyimlerine dönüştürün.</h2>
      <p style="font-size:16px; color:#64748b; margin-bottom: 32px; text-align: left;">Iarone, markaların ürünlerini web ve mobilde gerçekçi 3D ile sergilemesini ve AR ile anında deneyimletmesini sağlar.</p>
      <div style="display: flex; gap: 16px;">
        <a href="#demo" class="btn btn-primary btn-primary-lg" style="padding: 14px 28px; font-size: 15px;">Demo Talep Et</a>
        <a href="#" class="btn btn-ghost btn-ghost-lg" style="padding: 14px 28px; font-size: 15px;">Nasıl Çalışır?</a>
      </div>
      
      <!-- Features moved to left side under text to save space! -->
      <div class="fg-features-vertical">
        <div class="fg-feat-v"><div class="fg-feat-icon-v"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div><span>Gerçek Ölçekli AR Deneyimi</span></div>
        <div class="fg-feat-v"><div class="fg-feat-icon-v"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div><span>Detaylı 3D Modelleme</span></div>
        <div class="fg-feat-v"><div class="fg-feat-icon-v"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div><span>Hızlı Entegrasyon</span></div>
      </div>
    </div>

    <!-- RIGHT SIDE: GRID -->
    <div class="hero-right reveal visible">
      <div class="full-grid-showcase">
        
        <!-- Top Row: 3D Cards -->
        <div class="fg-row-grid">
          <!-- Card 1: Watch -->
          <div class="fg-card-3d-stacked">
             <div class="fg-img-box-stacked">
               <img src="slide_watch.png" alt="Watch">
               <div class="fg-next-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
             </div>
             <div class="fg-info-stacked">
               <div class="fg-cat-stacked"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/></svg> SAATLER</div>
               <h3 class="fg-title-stacked">IARONE LUXOR OTOMATİK SAAT</h3>
               <div class="fg-badge-stacked"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ÜSTÜN İŞÇİLİK</div>
             </div>
          </div>

          <!-- Card 2: Cake -->
          <div class="fg-card-3d-stacked">
             <div class="fg-img-box-stacked">
               <img src="slide_cake.png" alt="Cake">
               <div class="fg-next-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
             </div>
             <div class="fg-info-stacked">
               <div class="fg-cat-stacked"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13a7 7 0 0 1 14 0H5Z"/><path d="M12 9v4"/><line x1="2" y1="17" x2="22" y2="17"/></svg> TATLILAR</div>
               <h3 class="fg-title-stacked">IARONE ÇİKOLATALI PASTA</h3>
               <div class="fg-badge-stacked"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> GERÇEKÇİ GÖRÜNÜM</div>
             </div>
          </div>

          <!-- Card 3: Lamp -->
          <div class="fg-card-3d-stacked">
             <div class="fg-img-box-stacked">
               <img src="slide_lamp.png" alt="Lamp">
               <div class="fg-next-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
             </div>
             <div class="fg-info-stacked">
               <div class="fg-cat-stacked"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 10h8l2 6H6l2-6Z"/><path d="M12 4v6"/><path d="M10 22h4"/></svg> AYDINLATMA</div>
               <h3 class="fg-title-stacked">IARONE LUNA MASA LAMBASI</h3>
               <div class="fg-badge-stacked"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> FERAH</div>
             </div>
          </div>
        </div>

        <!-- Bottom Row: AR Cards -->
        <div class="fg-row-grid">
          <!-- Card 1: Watch AR -->
          <div class="fg-card-ar-small">
             <img src="slide_watch_ar.png" alt="Watch AR Mockup">
             <div class="fg-ar-overlay-top">
               <div class="fg-ar-back"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>
               <div class="fg-ar-options"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
             </div>
             <div class="fg-ar-controls-right">
               <div class="fg-ar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
             </div>
          </div>

          <!-- Card 2: Cake AR -->
          <div class="fg-card-ar-small">
             <img src="slide_cake_ar.png" alt="Cake AR Mockup">
             <div class="fg-ar-overlay-top">
               <div class="fg-ar-back"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>
               <div class="fg-ar-options"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
             </div>
             <div class="fg-ar-controls-right">
               <div class="fg-ar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
             </div>
          </div>

          <!-- Card 3: Lamp AR -->
          <div class="fg-card-ar-small">
             <img src="slide_lamp_ar.png" alt="Lamp AR Mockup">
             <div class="fg-ar-overlay-top">
               <div class="fg-ar-back"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></div>
               <div class="fg-ar-options"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
             </div>
             <div class="fg-ar-controls-right">
               <div class="fg-ar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>"""
        
        html = html[:start_idx] + new_hero_html + html[end_idx:]

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

css_code = """
/* --- ASYMMETRIC HERO SPLIT --- */
.hero-split {
  display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 40px;
}
.hero-left {
  flex: 0 0 36%;
  display: flex; flex-direction: column; justify-content: center;
}
.hero-right {
  flex: 0 0 62%;
}

.fg-features-vertical {
  margin-top: 40px; display: flex; flex-direction: column; gap: 16px;
  border-top: 1px solid rgba(0,0,0,0.05); padding-top: 32px;
}
.fg-feat-v {
  display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; color: #334155;
}
.fg-feat-icon-v {
  background: #f1f5f9; padding: 10px; border-radius: 12px; color: #3b82f6; display: flex;
}

.fg-row-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;
}

/* Stacked 3D Card */
.fg-card-3d-stacked {
  background: #fdfdfd; border: 1px solid rgba(0,0,0,0.04); border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.02); padding: 12px;
  display: flex; flex-direction: column; gap: 12px; transition: all 0.4s ease;
}
.fg-card-3d-stacked:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
.fg-img-box-stacked {
  position: relative; background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%);
  border-radius: 14px; height: 140px; display: flex; align-items: center; justify-content: center;
}
.fg-img-box-stacked img { max-width: 90%; max-height: 90%; object-fit: contain; transition: transform 0.4s; }
.fg-card-3d-stacked:hover .fg-img-box-stacked img { transform: scale(1.05); }
.fg-info-stacked { display: flex; flex-direction: column; gap: 8px; padding: 4px 8px 8px 8px; }
.fg-cat-stacked { font-size: 9px; font-weight: 700; color: #64748b; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px; }
.fg-title-stacked { font-size: 13px; font-weight: 700; line-height: 1.3; color: #0f172a; margin: 0; }
.fg-badge-stacked { display: inline-flex; align-items: center; gap: 4px; background: rgba(15,23,42,0.04); padding: 6px 8px; border-radius: 6px; font-size: 9px; font-weight: 700; color: #0f172a; width: max-content; margin-top: 4px;}

/* Small AR Card */
.fg-card-ar-small {
  position: relative; border-radius: 20px; overflow: hidden; height: 160px; background: #000; transition: all 0.4s ease;
}
.fg-card-ar-small:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
.fg-card-ar-small img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: all 0.4s; transform: scale(1.65); }
.fg-card-ar-small:hover img { opacity: 1; transform: scale(1.7); }

@media (max-width: 1200px) {
  .hero-split { flex-direction: column; text-align: center; gap: 40px; }
  .hero-left, .hero-right { flex: 0 0 100%; width: 100%; }
  .hero-left h2, .hero-left p { text-align: center !important; }
  .fg-features-vertical { flex-direction: row; justify-content: center; flex-wrap: wrap; }
}
@media (max-width: 900px) {
  .fg-row-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .fg-row-grid { grid-template-columns: 1fr; }
}
"""

with open('styles.v5.css', 'a', encoding='utf-8') as f:
    f.write(css_code)
