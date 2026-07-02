const fs = require('fs');

let mk = fs.readFileSync('market.html', 'utf8');

const reps = [
  { search: '>AR Destekli Alışveriş</h4>', replace: ' data-i18n="market.v5_title">AR Destekli Alışveriş</h4>' },
  { search: '>Müşterilerin kendi telefon kameralarıyla ürünü gerçek ortamda görmesini mümkün kılar.</p>', replace: ' data-i18n="market.v5_desc">Müşterilerin kendi telefon kameralarıyla ürünü gerçek ortamda görmesini mümkün kılar.</p>' },
  { search: '>Ölçeklenebilir SaaS</h4>', replace: ' data-i18n="market.v6_title">Ölçeklenebilir SaaS</h4>' },
  { search: '>Teknik uzmanlık ihtiyacını bitirerek, tek üründen katalog ölçeğine büyüyebilen bir altyapı sunar.</p>', replace: ' data-i18n="market.v6_desc">Teknik uzmanlık ihtiyacını bitirerek, tek üründen katalog ölçeğine büyüyebilen bir altyapı sunar.</p>' },
  { search: '>IARONE’un amacı, 3D ve AR ürün deneyimini yalnızca büyük markaların veya özel ajansların kullanabildiği pahalı bir hizmet olmaktan çıkarıp, her ölçekteki e-ticaret markası için erişilebilir ve ölçeklenebilir hale getirmektir.</p>', replace: ' data-i18n="market.v_bottom">IARONE’un amacı, 3D ve AR ürün deneyimini yalnızca büyük markaların veya özel ajansların kullanabildiği pahalı bir hizmet olmaktan çıkarıp, her ölçekteki e-ticaret markası için erişilebilir ve ölçeklenebilir hale getirmektir.</p>' },
  { search: 'IARONE; mobilyadan mücevhere, ayakkabıdan dekorasyona, teknolojiden premium ambalaj ürünlerine kadar birçok sektörde ürün fotoğraflarını satışa hazır 3D ve AR deneyimlerine dönüştürür. Markalar, teknik uzmanlık gerektirmeden ürünlerini web ve e-ticaret için optimize edilmiş, etkileşimli ve yayınlanabilir 3D/AR varlıklar olarak sunabilir.', replace: '<span data-i18n="market.cta_desc1">IARONE; mobilyadan mücevhere, ayakkabıdan dekorasyona, teknolojiden premium ambalaj ürünlerine kadar birçok sektörde ürün fotoğraflarını satışa hazır 3D ve AR deneyimlerine dönüştürür. Markalar, teknik uzmanlık gerektirmeden ürünlerini web ve e-ticaret için optimize edilmiş, etkileşimli ve yayınlanabilir 3D/AR varlıklar olarak sunabilir.</span>' },
  { search: '>Ürünlerinizi klasik fotoğraf sunumunun ötesine taşıyın.</h2>', replace: ' data-i18n="market.cta_title">Ürünlerinizi klasik fotoğraf sunumunun ötesine taşıyın.</h2>' },
  { search: 'IARONE ile ürün fotoğraflarınızı web ve AR için hazır 3D commerce deneyimlerine dönüştürün.', replace: '<span data-i18n="market.cta_desc2">IARONE ile ürün fotoğraflarınızı web ve AR için hazır 3D commerce deneyimlerine dönüştürün.</span>' },
  { search: '>Sistemi Ücretsiz Deneyin</a>', replace: ' data-i18n="market.cta_btn">Sistemi Ücretsiz Deneyin</a>' }
];

reps.forEach(rep => { mk = mk.replace(rep.search, rep.replace); });
fs.writeFileSync('market.html', mk, 'utf8');

const t = {
  tr: {
    market: {
      v5_title: "AR Destekli Alışveriş",
      v5_desc: "Müşterilerin kendi telefon kameralarıyla ürünü gerçek ortamda görmesini mümkün kılar.",
      v6_title: "Ölçeklenebilir SaaS",
      v6_desc: "Teknik uzmanlık ihtiyacını bitirerek, tek üründen katalog ölçeğine büyüyebilen bir altyapı sunar.",
      v_bottom: "IARONE’un amacı, 3D ve AR ürün deneyimini yalnızca büyük markaların veya özel ajansların kullanabildiği pahalı bir hizmet olmaktan çıkarıp, her ölçekteki e-ticaret markası için erişilebilir ve ölçeklenebilir hale getirmektir.",
      cta_desc1: "IARONE; mobilyadan mücevhere, ayakkabıdan dekorasyona, teknolojiden premium ambalaj ürünlerine kadar birçok sektörde ürün fotoğraflarını satışa hazır 3D ve AR deneyimlerine dönüştürür. Markalar, teknik uzmanlık gerektirmeden ürünlerini web ve e-ticaret için optimize edilmiş, etkileşimli ve yayınlanabilir 3D/AR varlıklar olarak sunabilir.",
      cta_title: "Ürünlerinizi klasik fotoğraf sunumunun ötesine taşıyın.",
      cta_desc2: "IARONE ile ürün fotoğraflarınızı web ve AR için hazır 3D commerce deneyimlerine dönüştürün.",
      cta_btn: "Sistemi Ücretsiz Deneyin"
    }
  },
  en: {
    market: {
      v5_title: "AR-Supported Shopping",
      v5_desc: "Allows customers to see the product in a real environment using their phone cameras.",
      v6_title: "Scalable SaaS",
      v6_desc: "Eliminates the need for technical expertise, offering an infrastructure that can scale from a single product to a full catalog.",
      v_bottom: "IARONE's goal is to turn the 3D and AR product experience from an expensive service only available to large brands or custom agencies into an accessible and scalable reality for e-commerce brands of all sizes.",
      cta_desc1: "IARONE transforms product photos into sales-ready 3D and AR experiences across many industries, from furniture to jewelry, from footwear to decoration, from technology to premium packaging. Brands can present their products as interactive, publishable 3D/AR assets optimized for web and e-commerce without requiring technical expertise.",
      cta_title: "Take your products beyond classic photo presentation.",
      cta_desc2: "Transform your product photos into 3D commerce experiences ready for web and AR with IARONE.",
      cta_btn: "Try the System for Free"
    }
  },
  ar: {
    market: {
      v5_title: "تسوق مدعوم بالواقع المعزز",
      v5_desc: "يتيح للعملاء رؤية المنتج في بيئة حقيقية باستخدام كاميرات هواتفهم.",
      v6_title: "برمجيات كخدمة قابلة للتطوير",
      v6_desc: "يلغي الحاجة إلى الخبرة الفنية، ويقدم بنية تحتية يمكن أن تتوسع من منتج واحد إلى كتالوج كامل.",
      v_bottom: "هدف IARONE هو تحويل تجربة المنتج ثلاثية الأبعاد والواقع المعزز من خدمة باهظة الثمن لا تتوفر إلا للعلامات التجارية الكبيرة أو الوكالات المخصصة إلى حقيقة يمكن الوصول إليها وتوسيع نطاقها لعلامات التجارة الإلكترونية من جميع الأحجام.",
      cta_desc1: "تحول IARONE صور المنتجات إلى تجارب ثلاثية الأبعاد وواقع معزز جاهزة للبيع في العديد من الصناعات، من الأثاث إلى المجوهرات، ومن الأحذية إلى الديكور، ومن التكنولوجيا إلى التغليف المتميز. يمكن للعلامات التجارية تقديم منتجاتها كأصول تفاعلية وقابلة للنشر ثلاثية الأبعاد / واقع معزز مُحسّنة للويب والتجارة الإلكترونية دون الحاجة إلى خبرة فنية.",
      cta_title: "خذ منتجاتك إلى ما هو أبعد من عرض الصور الكلاسيكي.",
      cta_desc2: "قم بتحويل صور منتجك إلى تجارب تجارة ثلاثية الأبعاد جاهزة للويب والواقع المعزز باستخدام IARONE.",
      cta_btn: "جرب النظام مجانًا"
    }
  }
};

let content = fs.readFileSync('i18n.js', 'utf8');

for (const lang of ['tr', 'en', 'ar']) {
  const obj = t[lang].market;
  for (const key in obj) {
    const val = obj[key].replace(/"/g, '\\"');
    const regex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?market:\\s*\\{)`);
    content = content.replace(regex, `$1\n      ${key}: "${val}",`);
  }
}

fs.writeFileSync('i18n.js', content, 'utf8');
console.log("Remaining sections injected.");
