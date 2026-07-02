const fs = require('fs');

// --- UPDATE INDEX.HTML ---
let html = fs.readFileSync('index.html', 'utf8');

const visionStyles = `
<style>
  .vision-card {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    border-radius: 24px;
    padding: 60px 40px;
    box-shadow: 0 32px 64px rgba(15,23,42,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.05);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .vision-card-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 300px;
    background: radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .vision-badge {
    display: inline-block;
    padding: 8px 24px;
    background: rgba(56,189,248,0.1);
    color: #38bdf8;
    border-radius: 100px;
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    margin-bottom: 24px;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 2;
  }
  .vision-title {
    font-size: clamp(28px, 4vw, 36px);
    font-weight: 800;
    color: #fff;
    margin-bottom: 20px;
    line-height: 1.3;
    position: relative;
    z-index: 2;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .vision-desc {
    font-size: clamp(16px, 2vw, 18px);
    color: #94a3b8;
    max-width: 800px;
    margin: 0 auto 40px auto;
    line-height: 1.7;
    position: relative;
    z-index: 2;
  }
  .vision-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    position: relative;
    z-index: 2;
  }
  .vision-chip {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: #cbd5e1;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }
  @media (max-width: 767px) {
    .vision-card {
      padding: 40px 20px;
      border-radius: 20px;
    }
    .vision-card-glow {
      width: 100%;
    }
  }
</style>
`;

const visionHtml = `
<!-- FUTURE VISION SECTION -->
<section class="future-vision" style="padding: 40px 20px; max-width: 1200px; margin: 0 auto; margin-top: 40px;">
  <div class="vision-card">
    <div class="vision-card-glow"></div>
    <span class="vision-badge" data-i18n="vision.badge">5 Yıllık Ürün Vizyonu</span>
    <h2 class="vision-title" data-i18n="vision.title">Ürün fotoğrafından, geleceğin 3D ürün envanterine.</h2>
    <p class="vision-desc" data-i18n="vision.desc">IARONE, ürünleri yalnızca bugünkü web ve mobil AR deneyimleri için değil; yarının dijital showroomları, VR gözlükleri, oyun motorları ve yeni nesil 3D işletim sistemleri için de kullanılabilecek dijital ürün varlıklarına dönüştürmeyi hedefler.</p>
    <div class="vision-chips">
      <span class="vision-chip">Web & Mobil AR</span>
      <span class="vision-chip">Digital Showroom</span>
      <span class="vision-chip">VisionOS Roadmap</span>
      <span class="vision-chip">Meta / VR Roadmap</span>
      <span class="vision-chip">Game Engine Export</span>
    </div>
  </div>
</section>

`;

if (!html.includes('FUTURE VISION SECTION')) {
  html = html.replace('</head>', visionStyles + '\n</head>');
  html = html.replace('<!-- SEGMENT TABS -->', visionHtml + '<!-- SEGMENT TABS -->');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Added vision section to index.html');
} else {
  console.log('Vision section already exists in index.html');
}

// --- UPDATE i18n.js ---
let i18n = fs.readFileSync('i18n.js', 'utf8');

const visionTr = `    vision: {
      badge: '5 Yıllık Ürün Vizyonu',
      title: 'Ürün fotoğrafından, geleceğin 3D ürün envanterine.',
      desc: 'IARONE, ürünleri yalnızca bugünkü web ve mobil AR deneyimleri için değil; yarının dijital showroomları, VR gözlükleri, oyun motorları ve yeni nesil 3D işletim sistemleri için de kullanılabilecek dijital ürün varlıklarına dönüştürmeyi hedefler.'
    },
`;

const visionEn = `    vision: {
      badge: '5-Year Product Vision',
      title: 'From product photo to the future 3D product inventory.',
      desc: 'IARONE aims to transform products not only for today\\'s web and mobile AR experiences, but also into reusable digital product assets for tomorrow\\'s digital showrooms, VR headsets, game engines and next-generation 3D operating systems.'
    },
`;

const visionAr = `    vision: {
      badge: 'رؤية المنتج خلال 5 سنوات',
      title: 'من صورة المنتج إلى مخزون المنتجات ثلاثي الأبعاد في المستقبل.',
      desc: 'تهدف IARONE إلى تحويل المنتجات ليس فقط لتجارب الويب والواقع المعزز عبر الهاتف اليوم، بل أيضاً إلى أصول رقمية قابلة للاستخدام في صالات العرض الرقمية، ونظارات الواقع الافتراضي، ومحركات الألعاب، وأنظمة التشغيل ثلاثية الأبعاد المستقبلية.'
    },
`;

if (!i18n.includes('vision: {')) {
  // We use regex to carefully insert right after the language keys (e.g. tr: {)
  // Or before 'nav: {'
  i18n = i18n.replace(/(tr:\s*\{[\s\S]*?)(nav:\s*\{)/, '$1' + visionTr + '$2');
  i18n = i18n.replace(/(en:\s*\{[\s\S]*?)(nav:\s*\{)/, '$1' + visionEn + '$2');
  i18n = i18n.replace(/(ar:\s*\{[\s\S]*?)(nav:\s*\{)/, '$1' + visionAr + '$2');
  fs.writeFileSync('i18n.js', i18n, 'utf8');
  console.log('Added vision keys to i18n.js');
} else {
  console.log('Vision keys already exist in i18n.js');
}
