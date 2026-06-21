import re

with open('concept-g.html', 'r', encoding='utf-8') as f:
    html = f.read()

css = """  <style>
    /* --- CONCEPT G: TABS & 4 PREMIUM SECTIONS --- */
    .segment-wrap { display: flex; justify-content: center; margin: 80px 0 40px; z-index: 10; position: relative; }
    .segment-control { display: inline-flex; background: rgba(15,23,42,0.04); padding: 8px; border-radius: 100px; backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.05); }
    .segment-btn { padding: 14px 40px; border-radius: 100px; font-weight: 600; font-size: 15px; color: var(--t2); cursor: pointer; transition: all 0.3s ease; border: none; background: transparent; letter-spacing: 0.01em; }
    .segment-btn:hover { color: var(--t1); }
    .segment-btn.active { background: #fff; color: #0f172a; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

    /* Section 1 & Generic */
    .premium-section { padding: 0 0 40px 0; display: flex; flex-direction: column; }
    .sec-logo { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center; margin-bottom: 24px; }
    .logo-img-wrap { text-align: center; }
    .logo-img { width: 100%; height: 300px; object-fit: contain; border-radius: 24px; margin: 0 auto; display: block; }
    .feat-row { display: flex; gap: 20px; justify-content: space-between; }
    .feat-mini { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.9); backdrop-filter: blur(16px); padding: 16px 20px; border-radius: 20px; flex: 1; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
    .feat-icon-box { width: 44px; height: 44px; min-width: 44px; border-radius: 12px; background: #f0f4ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; }

    /* Section 2 */
    .sec-photo { text-align: center; margin-top: 60px; }
    .sec-photo h2 { font-size: 40px; margin-bottom: 16px; }
    .visual-stage { position: relative; max-width: 900px; margin: 60px auto; }
    .visual-stage img { width: 100%; border-radius: 32px; box-shadow: 0 24px 64px rgba(0,0,0,0.08); }
    .float-panel { position: absolute; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); padding: 16px 24px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 14px; color: #0f172a; }
    .float-panel.left { top: 20%; left: -40px; }
    .float-panel.center { bottom: -24px; left: 50%; transform: translateX(-50%); background: #fff; padding: 20px 32px; border-radius: 100px; }
    .float-panel.right { top: 40%; right: -40px; }
    .feat-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; text-align: left; margin-top: 40px; }
    .feat-box { background: rgba(255,255,255,0.6); padding: 32px; border-radius: 24px; border: 1px solid rgba(0,0,0,0.03); }

    /* Section 3 */
    .sec-ar { position: relative; max-width: 1100px; margin: 100px auto; border-radius: 40px; overflow: hidden; background: #000; display: flex; align-items: center; min-height: 600px; }
    .sec-ar-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
    .sec-ar-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 50%, transparent 100%); }
    .sec-ar-content { position: relative; z-index: 2; padding: 60px; color: #fff; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
    .sec-ar-content h2 { font-size: 48px; color: #fff; margin-bottom: 16px; }
    .sec-ar-content p { font-size: 18px; opacity: 0.8; line-height: 1.6; }
    .ui-layer { display: flex; flex-direction: column; gap: 16px; position: relative; justify-self: end; width: 320px; }
    .ui-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(24px); border-radius: 24px; padding: 20px; border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 32px 64px rgba(0,0,0,0.1); color: #0f172a; }
    .ui-card h5 { margin-bottom: 16px; font-size: 15px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .mat-item { display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 12px; margin-bottom: 8px; cursor: pointer; border: 1px solid transparent; }
    .mat-item:hover { background: rgba(0,0,0,0.03); }
    .mat-item.active { background: #fff; border-color: #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }

    /* Section 4 */
    .sec-web { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin: 100px 0; align-items: center; }
    .web-img { width: 100%; border-radius: 24px; box-shadow: 0 40px 100px rgba(0,0,0,0.15); }
    .web-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
    .web-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px; padding: 32px 24px; text-align: center; }

    /* GLOBAL BACKGROUND */
    body {
      background: radial-gradient(circle at 50% 0%, #ffffff 0%, #f4f7fb 60%, #eaeff6 100%) !important;
      background-attachment: fixed !important;
    }

    /* PREMIUM CARD HOVERS */
    .feat-mini, .feat-box, .ui-card, .web-card {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    .feat-mini:hover, .feat-box:hover, .ui-card:hover, .web-card:hover {
      transform: translateY(-6px) scale(1.02) !important;
      box-shadow: 0 24px 48px rgba(37,99,235,0.12), 0 4px 12px rgba(0,0,0,0.04) !important;
      border-color: rgba(59,130,246,0.3) !important;
    }

    /* Icon Glow on Hover */
    .feat-mini .icon, .feat-box .feat-mini, .web-card .icon {
      transition: all 0.4s ease !important;
    }
    
    .feat-mini:hover .icon, .feat-box:hover .feat-mini, .web-card:hover .icon {
      transform: scale(1.1) !important;
      box-shadow: 0 0 20px rgba(59,130,246,0.3) !important;
    }
  </style>
  <script>
    function switchSegment(tabId) {
      document.getElementById('tab-corp').style.display = tabId === 'corp' ? 'block' : 'none';
      document.getElementById('tab-personal').style.display = tabId === 'personal' ? 'block' : 'none';
      document.getElementById('btn-corp').classList.toggle('active', tabId === 'corp');
      document.getElementById('btn-personal').classList.toggle('active', tabId === 'personal');
    }
  </script>
</head>"""

html = html.replace('</head>', css)

hero = """<!-- UNIVERSAL HERO (Old Section 1) -->
<section class="premium-section container" style="padding-top: 100px;">
  <div class="sec-logo">
    <div class="reveal visible">
      <span class="badge">CRAFTED PRODUCT DEPTH.</span>
      <h2 style="font-size:42px; line-height:1.1; margin-bottom: 16px;">Ürün görsellerini etkileşimli <span style="color:#3b82f6;">3D</span> ve <span style="color:#3b82f6;">AR</span> deneyimlerine dönüştürün.</h2>
      <p style="font-size:18px; color:#64748b; margin-bottom: 32px;">Iarone, markaların ürünlerini web ve mobilde gerçekçi 3D ile sergilemesini ve AR ile anında deneyimletmesini sağlar.</p>
      <div style="display: flex; gap: 16px;">
        <a href="#demo" class="btn btn-primary btn-primary-lg">Demo Talep Et</a>
        <a href="#" class="btn btn-ghost btn-ghost-lg">Nasıl Çalışır?</a>
      </div>
    </div>
    <div class="logo-img-wrap reveal visible">
      <img src="crafter_product_depth.webp.png" class="logo-img" alt="Iarone Crafted Product Depth">
    </div>
  </div>
  <div class="feat-row reveal visible">
    <div class="feat-mini">
      <div class="feat-icon-box"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
      <div><h4 style="font-weight:700; font-size:15px; margin-bottom:4px;">Gerçekçi 3D</h4><p style="font-size:13px; color:#64748b; margin:0;">Güven veren gerçekçi kalite.</p></div>
    </div>
    <div class="feat-mini">
      <div class="feat-icon-box"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
      <div><h4 style="font-weight:700; font-size:15px; margin-bottom:4px;">Web AR</h4><p style="font-size:13px; color:#64748b; margin:0;">Uygulamasız anında AR deneyimi.</p></div>
    </div>
    <div class="feat-mini">
      <div class="feat-icon-box"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div>
      <div><h4 style="font-weight:700; font-size:15px; margin-bottom:4px;">Satışa Hazır</h4><p style="font-size:13px; color:#64748b; margin:0;">Etkileşimli alışveriş ile satışı artırın.</p></div>
    </div>
  </div>
</section>

<!-- SEGMENT TABS -->
<div class="segment-wrap">
  <div class="segment-control">
    <button class="segment-btn active" id="btn-corp" onclick="switchSegment('corp')">E-Ticaret Çözümleri</button>
    <button class="segment-btn" id="btn-personal" onclick="switchSegment('personal')">Kişisel Kullanım</button>
  </div>
</div>

<!-- E-COMMERCE (CORPORATE) TAB -->
<div id="tab-corp" class="tab-content" style="display:block;">
  
  <!-- Section 2: Photo to 3D -->
  <section class="premium-section container">
    <div class="sec-photo reveal">
      <h2>1. Fotoğraftan Etkileşimli 3D Modele</h2>
      <p style="font-size: 18px; color: #64748b; max-width: 600px; margin: 0 auto;">
        Ürün fotoğraflarınızı yükleyin, saniyeler içinde e-ticaret sitenizde sergilemeye hazır 3D modellere dönüştürelim.
      </p>
    </div>
    <div class="visual-stage reveal">
      <img src="chair_render_1781017627524.png" alt="Chair 3D Render">
      <div class="float-panel left">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        Original Photo
      </div>
      <div class="float-panel right">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
        3D Model
      </div>
      <div class="float-panel center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" style="margin-right:8px;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        Generate in 15s
      </div>
    </div>
  </section>

  <!-- Section 3: AR Preview -->
  <section class="premium-section container">
    <div class="sec-ar reveal">
      <img src="ar_hand_phone_1781017648831.png" alt="AR Preview" class="sec-ar-bg">
      <div class="sec-ar-overlay"></div>
      <div class="sec-ar-content">
        <div>
          <h2>2. Mekanınızda Deneyimleyin</h2>
          <p>Müşterilerinizin ürünleri kendi ortamlarında gerçek boyutlarında görmelerini sağlayarak iade oranlarını düşürün ve satın alma kararını hızlandırın.</p>
        </div>
        <div class="ui-layer">
          <div class="ui-card">
            <h5>Product Details</h5>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px;"><span>Size</span> <span>W 72cm x D 68cm</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:16px; font-size:14px;"><span>Material</span> <span>Premium Linen</span></div>
            <button class="btn btn-primary" style="width:100%; border-radius:12px;">Place in Room</button>
          </div>
          <div class="ui-card">
            <h5>Variants</h5>
            <div class="mat-item active">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:24px; height:24px; border-radius:50%; background:#f1f5f9; border:2px solid #e2e8f0;"></div>
                <span>Bouclé White</span>
              </div>
            </div>
            <div class="mat-item">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:24px; height:24px; border-radius:50%; background:#1e293b; border:2px solid #e2e8f0;"></div>
                <span>Velvet Black</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: Web Ready -->
  <section class="premium-section container">
    <div class="sec-web">
      <div class="reveal">
        <h2 style="font-size:40px; margin-bottom:16px;">3. Web ve E-ticaret İçin Optimize</h2>
        <p style="font-size:18px; color:#64748b; margin-bottom:32px;">Saniyeler içinde web sitenize ekleyebileceğiniz hazır kod snippet'i. Herhangi bir e-ticaret altyapısına kolayca entegre edin.</p>
        <div class="web-cards">
          <div class="web-card">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" style="margin-bottom:16px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <h4 style="font-size:16px; margin-bottom:8px;">Web Ready</h4>
            <p style="font-size:13px; color:#64748b;">Doğrudan tarayıcıda çalışır.</p>
          </div>
          <div class="web-card">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="margin-bottom:16px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h4 style="font-size:16px; margin-bottom:8px;">Optimized GLB</h4>
            <p style="font-size:13px; color:#64748b;">Hızlı yükleme için sıkıştırılmış 3D dosya.</p>
          </div>
        </div>
      </div>
      <div class="reveal d1">
        <img src="laptop_phone_mockup_1781017660549.png" alt="Laptop Preview" class="web-img">
      </div>
    </div>
  </section>

</div>

<!-- PERSONAL TAB (Original Content) -->
<div id="tab-personal" class="tab-content" style="display:none;">
"""

html = re.sub(r'<section class="hero" id="hero" aria-labelledby="hero-h1">.*?</section>', hero, html, flags=re.DOTALL)
html = html.replace('<!-- FOOTER -->', '</div>\n<!-- FOOTER -->')

with open('concept-g.html', 'w', encoding='utf-8') as f:
    f.write(html)
