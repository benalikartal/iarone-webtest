import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

geo_html = """
<!-- SEO/GEO SEMANTIC SECTIONS -->
<section class="section z1" style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding-top: 60px; padding-bottom: 60px;">
  <div class="container" style="max-width: 800px; margin: 0 auto; color: #334155; line-height: 1.6;">
    
    <!-- Trust Paragraph -->
    <div style="margin-bottom: 40px; text-align: center;">
      <h2 style="font-size: 28px; margin-bottom: 16px; font-weight: 700; color: #0f172a;" data-i18n="geo.trust_title">Iarone</h2>
      <p style="font-size: 16px; color: #475569;" data-i18n="geo.trust_desc">
        Iarone, e-ticaret ürün görsellerini web uyumlu 3D ve AR deneyimlerine dönüştüren platformdur. Türkiye, MENA ve global e-ticaret ekipleri için ürün deneyimlerini daha etkileşimli hale getirmeyi hedefler.
      </p>
    </div>

    <!-- Iarone in Brief (Facts Block) -->
    <div style="margin-bottom: 40px;">
      <h3 style="font-size: 22px; margin-bottom: 16px; font-weight: 600; color: #0f172a;" data-i18n="geo.brief_title">Kısaca Iarone</h3>
      <dl style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px; background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
        <dt style="font-weight: 600; color: #1e293b;" data-i18n="geo.brief_target_label">Hedef Kitle</dt>
        <dd style="margin: 0; color: #475569;" data-i18n="geo.brief_target_val">E-ticaret markaları, ajanslar, 3D stüdyolar</dd>
        
        <dt style="font-weight: 600; color: #1e293b;" data-i18n="geo.brief_input_label">Desteklenen Girdiler</dt>
        <dd style="margin: 0; color: #475569;" data-i18n="geo.brief_input_val">Ürün fotoğrafları (.jpg, .png), mevcut 3D modeller (.obj, .fbx, .blend)</dd>
        
        <dt style="font-weight: 600; color: #1e293b;" data-i18n="geo.brief_output_label">Platform Çıktıları</dt>
        <dd style="margin: 0; color: #475569;" data-i18n="geo.brief_output_val">GLB, USDZ, Web AR Görüntüleyici, Paylaşılabilir Link</dd>
      </dl>
    </div>

    <!-- Glossary -->
    <div style="margin-bottom: 40px;">
      <h3 style="font-size: 22px; margin-bottom: 16px; font-weight: 600; color: #0f172a;" data-i18n="geo.glossary_title">Sözlük & Terimler</h3>
      <dl style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
        <dt style="font-weight: 700; color: #1e293b; margin-top: 12px; first-child: margin-top:0;">GLB</dt>
        <dd style="margin: 4px 0 16px 0; color: #475569;" data-i18n="geo.glossary_glb">Web tabanlı 3D görüntüleme için optimize edilmiş evrensel 3D dosya formatı.</dd>
        
        <dt style="font-weight: 700; color: #1e293b;">USDZ</dt>
        <dd style="margin: 4px 0 16px 0; color: #475569;" data-i18n="geo.glossary_usdz">Apple cihazlarda (iOS/iPadOS) Safari üzerinden yerleşik Artırılmış Gerçeklik (AR) deneyimi sunan 3D formatı.</dd>
        
        <dt style="font-weight: 700; color: #1e293b;">Web AR</dt>
        <dd style="margin: 4px 0 16px 0; color: #475569;" data-i18n="geo.glossary_webar">Kullanıcıların uygulama indirmeden, doğrudan web tarayıcıları üzerinden Artırılmış Gerçeklik deneyimlemesini sağlayan teknoloji.</dd>
        
        <dt style="font-weight: 700; color: #1e293b;" data-i18n="geo.glossary_embed_label">Embed (Gömülü Kod)</dt>
        <dd style="margin: 4px 0 16px 0; color: #475569;" data-i18n="geo.glossary_embed_val">Iarone 3D görüntüleyicisini e-ticaret sitenize eklemenizi sağlayan kısa HTML/JS kod parçacığı.</dd>
      </dl>
    </div>

    <!-- FAQ -->
    <div>
      <h3 style="font-size: 22px; margin-bottom: 16px; font-weight: 600; color: #0f172a;" data-i18n="geo.faq_title">Sıkça Sorulan Sorular</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <details style="background: #fff; padding: 16px 24px; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;">
          <summary style="font-weight: 600; color: #1e293b; outline: none;" data-i18n="geo.faq_q1">Iarone sadece 3D model mi üretiyor?</summary>
          <p style="margin-top: 12px; margin-bottom: 0; color: #475569;" data-i18n="geo.faq_a1">Hayır. Iarone sadece model değil, bu modellerin e-ticaret sitenizde çalışmasını sağlayan "Yayın Paketi"ni (Publish Package) hazırlar. Bu paket içerisinde AR görüntüleyici ve hazır kodlar bulunur.</p>
        </details>
        <details style="background: #fff; padding: 16px 24px; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;">
          <summary style="font-weight: 600; color: #1e293b; outline: none;" data-i18n="geo.faq_q2">Kendi ürettiğim 3D modelleri platforma yükleyebilir miyim?</summary>
          <p style="margin-top: 12px; margin-bottom: 0; color: #475569;" data-i18n="geo.faq_a2">Evet. Mevcut 3D modellerinizi (obj, fbx, blend vb.) sisteme yükleyerek Iarone'un kalite kontrol, optimizasyon ve web yayınlama altyapısından faydalanabilirsiniz.</p>
        </details>
        <details style="background: #fff; padding: 16px 24px; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;">
          <summary style="font-weight: 600; color: #1e293b; outline: none;" data-i18n="geo.faq_q3">Entegrasyon gerektiriyor mu?</summary>
          <p style="margin-top: 12px; margin-bottom: 0; color: #475569;" data-i18n="geo.faq_a3">İster Iframe/Embed kodu ile kodlama bilmeden anında e-ticaret sitenize ekleyebilir, isterseniz hedeflenen API entegrasyon çözümleriyle sisteminize bağlayabilirsiniz.</p>
        </details>
      </div>
    </div>

  </div>
</section>
"""

# Replace the old GEO BLOCK with the new SEO/GEO SEMANTIC SECTIONS
if '<!-- GEO BLOCK -->' in html:
    html = re.sub(r'<!-- GEO BLOCK -->.*?</section>', geo_html, html, flags=re.DOTALL)
else:
    # Insert right before FINAL CTA
    html = html.replace('<!-- FINAL CTA -->', geo_html + '\n<!-- FINAL CTA -->')

# Add JSON-LD to index.html <head>
faq_jsonld = """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Iarone sadece 3D model mi üretiyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hayır. Iarone sadece model değil, bu modellerin e-ticaret sitenizde çalışmasını sağlayan Yayın Paketi'ni hazırlar. Bu paket içerisinde AR görüntüleyici ve hazır kodlar bulunur."
      }
    }, {
      "@type": "Question",
      "name": "Kendi ürettiğim 3D modelleri platforma yükleyebilir miyim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evet. Mevcut 3D modellerinizi sisteme yükleyerek Iarone'un kalite kontrol, optimizasyon ve web yayınlama altyapısından faydalanabilirsiniz."
      }
    }, {
      "@type": "Question",
      "name": "Entegrasyon gerektiriyor mu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "İster Embed kodu ile kodlama bilmeden anında e-ticaret sitenize ekleyebilir, isterseniz API entegrasyon çözümleriyle sisteminize bağlayabilirsiniz."
      }
    }]
  }
  </script>
"""

if '"@type": "FAQPage"' not in html:
    html = html.replace('</head>', faq_jsonld + '\n</head>')

# Add WebSite and Organization schema
org_jsonld = """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Iarone",
    "url": "https://iarone.com",
    "logo": "https://iarone.com/00_iarone_logo_exact_transparent_white_glow.png"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Iarone",
    "url": "https://iarone.com"
  }
  </script>
"""
if '"@type": "Organization"' not in html:
    html = html.replace('</head>', org_jsonld + '\n</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html with Semantic Sections and JSON-LD")

# Update i18n.js
with open('i18n.js', 'r', encoding='utf-8') as f:
    i18n = f.read()

geo_tr = """
    geo: {
      trust_title: 'Iarone',
      trust_desc: 'Iarone, e-ticaret ürün görsellerini web uyumlu 3D ve AR deneyimlerine dönüştüren platformdur. Türkiye, MENA ve global e-ticaret ekipleri için ürün deneyimlerini daha etkileşimli hale getirmeyi hedefler.',
      brief_title: 'Kısaca Iarone',
      brief_target_label: 'Hedef Kitle',
      brief_target_val: 'E-ticaret markaları, ajanslar, 3D stüdyolar',
      brief_input_label: 'Desteklenen Girdiler',
      brief_input_val: 'Ürün fotoğrafları (.jpg, .png), mevcut 3D modeller (.obj, .fbx, .blend)',
      brief_output_label: 'Platform Çıktıları',
      brief_output_val: 'GLB, USDZ, Web AR Görüntüleyici, Paylaşılabilir Link',
      glossary_title: 'Sözlük & Terimler',
      glossary_glb: 'Web tabanlı 3D görüntüleme için optimize edilmiş evrensel 3D dosya formatı.',
      glossary_usdz: 'Apple cihazlarda (iOS/iPadOS) Safari üzerinden yerleşik Artırılmış Gerçeklik (AR) deneyimi sunan 3D formatı.',
      glossary_webar: 'Kullanıcıların uygulama indirmeden, doğrudan web tarayıcıları üzerinden Artırılmış Gerçeklik deneyimlemesini sağlayan teknoloji.',
      glossary_embed_label: 'Embed (Gömülü Kod)',
      glossary_embed_val: 'Iarone 3D görüntüleyicisini e-ticaret sitenize eklemenizi sağlayan kısa HTML/JS kod parçacığı.',
      faq_title: 'Sıkça Sorulan Sorular',
      faq_q1: 'Iarone sadece 3D model mi üretiyor?',
      faq_a1: 'Hayır. Iarone sadece model değil, bu modellerin e-ticaret sitenizde çalışmasını sağlayan "Yayın Paketi"ni (Publish Package) hazırlar. Bu paket içerisinde AR görüntüleyici ve hazır kodlar bulunur.',
      faq_q2: 'Kendi ürettiğim 3D modelleri platforma yükleyebilir miyim?',
      faq_a2: 'Evet. Mevcut 3D modellerinizi (obj, fbx, blend vb.) sisteme yükleyerek Iarone\\'un kalite kontrol, optimizasyon ve web yayınlama altyapısından faydalanabilirsiniz.',
      faq_q3: 'Entegrasyon gerektiriyor mu?',
      faq_a3: 'İster Iframe/Embed kodu ile kodlama bilmeden anında e-ticaret sitenize ekleyebilir, isterseniz hedeflenen API entegrasyon çözümleriyle sisteminize bağlayabilirsiniz.'
    },"""

geo_en = """
    geo: {
      trust_title: 'Iarone',
      trust_desc: 'Iarone is a platform that converts e-commerce product visuals into web-ready 3D and AR experiences. It aims to make product experiences more interactive for e-commerce teams in Turkey, MENA, and globally.',
      brief_title: 'Iarone in Brief',
      brief_target_label: 'Target Audience',
      brief_target_val: 'E-commerce brands, agencies, 3D studios',
      brief_input_label: 'Supported Inputs',
      brief_input_val: 'Product photos (.jpg, .png), existing 3D models (.obj, .fbx, .blend)',
      brief_output_label: 'Platform Outputs',
      brief_output_val: 'GLB, USDZ, Web AR Viewer, Shareable Link',
      glossary_title: 'Glossary & Terms',
      glossary_glb: 'A universal 3D file format optimized for web-based 3D viewing.',
      glossary_usdz: 'A 3D format that provides native Augmented Reality (AR) experiences on Apple devices (iOS/iPadOS) via Safari.',
      glossary_webar: 'Technology that allows users to experience Augmented Reality directly through their web browsers without downloading an app.',
      glossary_embed_label: 'Embed',
      glossary_embed_val: 'A short HTML/JS code snippet that allows you to add the Iarone 3D viewer to your e-commerce site.',
      faq_title: 'Frequently Asked Questions',
      faq_q1: 'Does Iarone only generate 3D models?',
      faq_a1: 'No. Iarone prepares a "Publish Package" that allows these models to work on your e-commerce site. This package includes an AR viewer and ready-to-use codes.',
      faq_q2: 'Can I upload my own 3D models to the platform?',
      faq_a2: 'Yes. You can upload your existing 3D models (obj, fbx, blend, etc.) to the system and benefit from Iarone\\'s quality control, optimization, and web publishing infrastructure.',
      faq_q3: 'Does it require integration?',
      faq_a3: 'You can instantly add it to your e-commerce site without coding using an Iframe/Embed code, or connect it to your system with targeted API integration solutions.'
    },"""

geo_ar = """
    geo: {
      trust_title: 'Iarone',
      trust_desc: 'Iarone هي منصة تحول صور منتجات التجارة الإلكترونية إلى تجارب ثلاثية الأبعاد وواقع معزز جاهزة للويب. تهدف إلى جعل تجارب المنتجات أكثر تفاعلية لفرق التجارة الإلكترونية في تركيا والشرق الأوسط وشمال إفريقيا والأسواق العالمية.',
      brief_title: 'Iarone باختصار',
      brief_target_label: 'الجمهور المستهدف',
      brief_target_val: 'العلامات التجارية للتجارة الإلكترونية، الوكالات، استوديوهات 3D',
      brief_input_label: 'المدخلات المدعومة',
      brief_input_val: 'صور المنتجات (.jpg, .png)، النماذج ثلاثية الأبعاد الحالية (.obj, .fbx, .blend)',
      brief_output_label: 'مخرجات المنصة',
      brief_output_val: 'GLB، USDZ، عارض Web AR، رابط قابل للمشاركة',
      glossary_title: 'القاموس والمصطلحات',
      glossary_glb: 'تنسيق ملف ثلاثي الأبعاد عالمي مُحسّن للعرض ثلاثي الأبعاد على الويب.',
      glossary_usdz: 'تنسيق ثلاثي الأبعاد يوفر تجارب واقع معزز (AR) أصلية على أجهزة Apple عبر Safari.',
      glossary_webar: 'تقنية تتيح للمستخدمين تجربة الواقع المعزز مباشرة من خلال متصفحات الويب الخاصة بهم دون تنزيل تطبيق.',
      glossary_embed_label: 'تضمين (Embed)',
      glossary_embed_val: 'مقتطف رمز HTML/JS قصير يتيح لك إضافة عارض Iarone ثلاثي الأبعاد إلى موقع التجارة الإلكترونية الخاص بك.',
      faq_title: 'الأسئلة الشائعة',
      faq_q1: 'هل تقوم Iarone بإنشاء نماذج ثلاثية الأبعاد فقط؟',
      faq_a1: 'لا. تقوم Iarone بإعداد "حزمة نشر" تتيح لهذه النماذج العمل على موقع التجارة الإلكترونية الخاص بك. تتضمن هذه الحزمة عارض واقع معزز ورموز جاهزة للاستخدام.',
      faq_q2: 'هل يمكنني تحميل نماذج 3D الخاصة بي إلى المنصة؟',
      faq_a2: 'نعم. يمكنك تحميل نماذج 3D الحالية (obj، fbx، blend، إلخ) إلى النظام والاستفادة من البنية التحتية لـ Iarone لمراقبة الجودة والتحسين ونشر الويب.',
      faq_q3: 'هل يتطلب تكاملًا؟',
      faq_a3: 'يمكنك إضافته على الفور إلى موقع التجارة الإلكترونية الخاص بك دون تشفير باستخدام رمز Iframe/Embed، أو ربطه بنظامك من خلال حلول تكامل API المستهدفة.'
    },"""

if 'geo: {' not in i18n:
    # insert into TR
    i18n = re.sub(r'(tr: \{)', r'\1\n' + geo_tr, i18n, count=1)
    # insert into EN
    i18n = re.sub(r'(en: \{)', r'\1\n' + geo_en, i18n, count=1)
    # insert into AR
    i18n = re.sub(r'(ar: \{)', r'\1\n' + geo_ar, i18n, count=1)
    with open('i18n.js', 'w', encoding='utf-8') as f:
        f.write(i18n)
    print("Updated i18n.js with GEO strings")

