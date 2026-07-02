const fs = require('fs');

let mk = fs.readFileSync('market.html', 'utf8');
const mkReps = [
  { search: '<h3>Ürün Fotoğraf Ajansları ve Creative Production Ekipleri</h3>', replace: '<h3 data-i18n="market.sec8_title">Ürün Fotoğraf Ajansları ve Creative Production Ekipleri</h3>' },
  { search: '<p>IARONE yalnızca e-ticaret markaları için değil, ürün fotoğraf ajansları ve creative production ekipleri için de güçlü bir altyapı sunar.</p>', replace: '<p data-i18n="market.sec8_desc1">IARONE yalnızca e-ticaret markaları için değil, ürün fotoğraf ajansları ve creative production ekipleri için de güçlü bir altyapı sunar.</p>' },
  { search: '<p>Ajanslar, müşterileri için ürün fotoğrafından 3D/AR varlık üretimi, optimizasyon ve yayınlama süreçlerini daha hızlı yönetebilir. Böylece klasik fotoğraf çekimi hizmetlerine 3D commerce ve AR deneyimi gibi daha yüksek katma değerli hizmetler ekleyebilirler.</p>', replace: '<p data-i18n="market.sec8_desc2">Ajanslar, müşterileri için ürün fotoğrafından 3D/AR varlık üretimi, optimizasyon ve yayınlama süreçlerini daha hızlı yönetebilir. Böylece klasik fotoğraf çekimi hizmetlerine 3D commerce ve AR deneyimi gibi daha yüksek katma değerli hizmetler ekleyebilirler.</p>' },
  { search: '</svg> Ürün fotoğrafçılığı hizmetlerine 3D/AR ekleme</li>', replace: '</svg> <span data-i18n="market.sec8_li1">Ürün fotoğrafçılığı hizmetlerine 3D/AR ekleme</span></li>' },
  { search: '</svg> E-ticaret müşterileri için 3D ürün paketleri</li>', replace: '</svg> <span data-i18n="market.sec8_li2">E-ticaret müşterileri için 3D ürün paketleri</span></li>' },
  { search: '</svg> Katalog bazlı ürün dönüşümü</li>', replace: '</svg> <span data-i18n="market.sec8_li3">Katalog bazlı ürün dönüşümü</span></li>' },
  { search: '</svg> Ajans müşterilerine white-label hizmet</li>', replace: '</svg> <span data-i18n="market.sec8_li4">Ajans müşterilerine white-label hizmet</span></li>' },
  { search: '</svg> Daha hızlı ve ölçeklenebilir üretim süreci</li>', replace: '</svg> <span data-i18n="market.sec8_li5">Daha hızlı ve ölçeklenebilir üretim süreci</span></li>' },

  { search: '<h3>Marketplace ve E-ticaret Platformları</h3>', replace: '<h3 data-i18n="market.sec9_title">Marketplace ve E-ticaret Platformları</h3>' },
  { search: '<p>Marketplace’ler ve büyük e-ticaret altyapıları için ürün sayfalarında daha zengin deneyim sunmak önemli bir rekabet avantajı oluşturur.</p>', replace: '<p data-i18n="market.sec9_desc1">Marketplace’ler ve büyük e-ticaret altyapıları için ürün sayfalarında daha zengin deneyim sunmak önemli bir rekabet avantajı oluşturur.</p>' },
  { search: '<p>IARONE, marketplace satıcılarının veya kurumsal e-ticaret platformlarının ürünlerini 3D ve AR formatında yayınlamasına yardımcı olabilecek modüler bir altyapı sunar. API ve white-label yaklaşımı sayesinde platformlar kendi sistemleri içinde 3D/AR üretim akışını kullanabilir.</p>', replace: '<p data-i18n="market.sec9_desc2">IARONE, marketplace satıcılarının veya kurumsal e-ticaret platformlarının ürünlerini 3D ve AR formatında yayınlamasına yardımcı olabilecek modüler bir altyapı sunar. API ve white-label yaklaşımı sayesinde platformlar kendi sistemleri içinde 3D/AR üretim akışını kullanabilir.</p>' },
  { search: '</svg> Marketplace satıcıları için 3D ürün deneyimi</li>', replace: '</svg> <span data-i18n="market.sec9_li1">Marketplace satıcıları için 3D ürün deneyimi</span></li>' },
  { search: '</svg> Büyük katalogların 3D/AR dönüşümü</li>', replace: '</svg> <span data-i18n="market.sec9_li2">Büyük katalogların 3D/AR dönüşümü</span></li>' },
  { search: '</svg> API ile sistem entegrasyonu</li>', replace: '</svg> <span data-i18n="market.sec9_li3">API ile sistem entegrasyonu</span></li>' },
  { search: '</svg> White-label 3D commerce altyapısı</li>', replace: '</svg> <span data-i18n="market.sec9_li4">White-label 3D commerce altyapısı</span></li>' },
  { search: '</svg> Satıcı paneli içinde 3D model üretim akışı</li>', replace: '</svg> <span data-i18n="market.sec9_li5">Satıcı paneli içinde 3D model üretim akışı</span></li>' },

  { search: '>Her Sektör İçin Ortak Değer</h2>', replace: ' data-i18n="market.val_title">Her Sektör İçin Ortak Değer</h2>' },
  { search: '>IARONE’un sunduğu temel değer her sektör için aynıdır: ürünleri daha anlaşılır, daha etkileşimli ve daha güven veren bir dijital deneyime dönüştürmek.</p>', replace: ' data-i18n="market.val_desc">IARONE’un sunduğu temel değer her sektör için aynıdır: ürünleri daha anlaşılır, daha etkileşimli ve daha güven veren bir dijital deneyime dönüştürmek.</p>' },
  
  { search: '>Varlık Dönüşümü</h4>', replace: ' data-i18n="market.v1_title">Varlık Dönüşümü</h4>' },
  { search: '>Ürün fotoğraflarını dakikalar içinde 3D/AR varlıklara dönüştürür.</p>', replace: ' data-i18n="market.v1_desc">Ürün fotoğraflarını dakikalar içinde 3D/AR varlıklara dönüştürür.</p>' },
  { search: '>Web Optimizasyonu</h4>', replace: ' data-i18n="market.v2_title">Web Optimizasyonu</h4>' },
  { search: '>Web ve e-ticaret siteleri için özel olarak optimize edilmiş hafif çıktı sağlar.</p>', replace: ' data-i18n="market.v2_desc">Web ve e-ticaret siteleri için özel olarak optimize edilmiş hafif çıktı sağlar.</p>' },
  { search: '>Çoklu Format Desteği</h4>', replace: ' data-i18n="market.v3_title">Çoklu Format Desteği</h4>' },
  { search: '>GLB / USDZ formatlarının yanında yayın destekli poster ve thumbnail varlıkları üretir.</p>', replace: ' data-i18n="market.v3_desc">GLB / USDZ formatlarının yanında yayın destekli poster ve thumbnail varlıkları üretir.</p>' },
  { search: '>360° Görüntüleme</h4>', replace: ' data-i18n="market.v4_title">360° Görüntüleme</h4>' },
  { search: '>Klasik ürün sayfalarında modern, etkileşimli 360° görüntüleme deneyimi sunar.</p>', replace: ' data-i18n="market.v4_desc">Klasik ürün sayfalarında modern, etkileşimli 360° görüntüleme deneyimi sunar.</p>' }
];

mkReps.forEach(rep => { mk = mk.replace(rep.search, rep.replace); });
fs.writeFileSync('market.html', mk, 'utf8');

const t = {
  tr: {
    market: {
      sec8_title: "Ürün Fotoğraf Ajansları ve Creative Production Ekipleri",
      sec8_desc1: "IARONE yalnızca e-ticaret markaları için değil, ürün fotoğraf ajansları ve creative production ekipleri için de güçlü bir altyapı sunar.",
      sec8_desc2: "Ajanslar, müşterileri için ürün fotoğrafından 3D/AR varlık üretimi, optimizasyon ve yayınlama süreçlerini daha hızlı yönetebilir. Böylece klasik fotoğraf çekimi hizmetlerine 3D commerce ve AR deneyimi gibi daha yüksek katma değerli hizmetler ekleyebilirler.",
      sec8_li1: "Ürün fotoğrafçılığı hizmetlerine 3D/AR ekleme",
      sec8_li2: "E-ticaret müşterileri için 3D ürün paketleri",
      sec8_li3: "Katalog bazlı ürün dönüşümü",
      sec8_li4: "Ajans müşterilerine white-label hizmet",
      sec8_li5: "Daha hızlı ve ölçeklenebilir üretim süreci",
      sec9_title: "Marketplace ve E-ticaret Platformları",
      sec9_desc1: "Marketplace’ler ve büyük e-ticaret altyapıları için ürün sayfalarında daha zengin deneyim sunmak önemli bir rekabet avantajı oluşturur.",
      sec9_desc2: "IARONE, marketplace satıcılarının veya kurumsal e-ticaret platformlarının ürünlerini 3D ve AR formatında yayınlamasına yardımcı olabilecek modüler bir altyapı sunar. API ve white-label yaklaşımı sayesinde platformlar kendi sistemleri içinde 3D/AR üretim akışını kullanabilir.",
      sec9_li1: "Marketplace satıcıları için 3D ürün deneyimi",
      sec9_li2: "Büyük katalogların 3D/AR dönüşümü",
      sec9_li3: "API ile sistem entegrasyonu",
      sec9_li4: "White-label 3D commerce altyapısı",
      sec9_li5: "Satıcı paneli içinde 3D model üretim akışı",
      val_title: "Her Sektör İçin Ortak Değer",
      val_desc: "IARONE’un sunduğu temel değer her sektör için aynıdır: ürünleri daha anlaşılır, daha etkileşimli ve daha güven veren bir dijital deneyime dönüştürmek.",
      v1_title: "Varlık Dönüşümü",
      v1_desc: "Ürün fotoğraflarını dakikalar içinde 3D/AR varlıklara dönüştürür.",
      v2_title: "Web Optimizasyonu",
      v2_desc: "Web ve e-ticaret siteleri için özel olarak optimize edilmiş hafif çıktı sağlar.",
      v3_title: "Çoklu Format Desteği",
      v3_desc: "GLB / USDZ formatlarının yanında yayın destekli poster ve thumbnail varlıkları üretir.",
      v4_title: "360° Görüntüleme",
      v4_desc: "Klasik ürün sayfalarında modern, etkileşimli 360° görüntüleme deneyimi sunar."
    }
  },
  en: {
    market: {
      sec8_title: "Product Photography Agencies and Creative Production Teams",
      sec8_desc1: "IARONE provides a powerful infrastructure not only for e-commerce brands but also for product photography agencies and creative production teams.",
      sec8_desc2: "Agencies can manage the 3D/AR asset generation, optimization, and publishing processes from product photos faster for their clients. Thus, they can add higher value-added services such as 3D commerce and AR experiences to classic photography services.",
      sec8_li1: "Adding 3D/AR to product photography services",
      sec8_li2: "3D product packages for e-commerce clients",
      sec8_li3: "Catalog-based product conversion",
      sec8_li4: "White-label service for agency clients",
      sec8_li5: "Faster and scalable production process",
      sec9_title: "Marketplaces and E-commerce Platforms",
      sec9_desc1: "For marketplaces and large e-commerce infrastructures, providing a richer experience on product pages creates a significant competitive advantage.",
      sec9_desc2: "IARONE offers a modular infrastructure that can help marketplace sellers or corporate e-commerce platforms publish their products in 3D and AR formats. With the API and white-label approach, platforms can use the 3D/AR production flow within their own systems.",
      sec9_li1: "3D product experience for marketplace sellers",
      sec9_li2: "3D/AR conversion of large catalogs",
      sec9_li3: "System integration via API",
      sec9_li4: "White-label 3D commerce infrastructure",
      sec9_li5: "3D model production flow within the seller panel",
      val_title: "Common Value for Every Industry",
      val_desc: "The core value offered by IARONE is the same for every industry: transforming products into a clearer, more interactive, and more confidence-building digital experience.",
      v1_title: "Asset Conversion",
      v1_desc: "Transforms product photos into 3D/AR assets in minutes.",
      v2_title: "Web Optimization",
      v2_desc: "Provides lightweight output specifically optimized for web and e-commerce sites.",
      v3_title: "Multi-Format Support",
      v3_desc: "Generates publish-ready poster and thumbnail assets along with GLB / USDZ formats.",
      v4_title: "360° Viewing",
      v4_desc: "Offers a modern, interactive 360° viewing experience on classic product pages."
    }
  },
  ar: {
    market: {
      sec8_title: "وكالات تصوير المنتجات وفرق الإنتاج الإبداعي",
      sec8_desc1: "لا توفر IARONE بنية تحتية قوية للعلامات التجارية للتجارة الإلكترونية فحسب، بل توفر أيضًا لوكالات تصوير المنتجات وفرق الإنتاج الإبداعي.",
      sec8_desc2: "يمكن للوكالات إدارة عمليات إنشاء أصول ثلاثية الأبعاد / واقع معزز وتحسينها ونشرها من صور المنتجات بشكل أسرع لعملائها. وبالتالي، يمكنهم إضافة خدمات ذات قيمة مضافة أعلى مثل التجارة ثلاثية الأبعاد وتجربة الواقع المعزز لخدمات التصوير الفوتوغرافي الكلاسيكية.",
      sec8_li1: "إضافة 3D / AR إلى خدمات تصوير المنتجات",
      sec8_li2: "باقات منتجات ثلاثية الأبعاد لعملاء التجارة الإلكترونية",
      sec8_li3: "تحويل المنتج المستند إلى الكتالوج",
      sec8_li4: "خدمة التسمية البيضاء لعملاء الوكالة",
      sec8_li5: "عملية إنتاج أسرع وقابلة للتطوير",
      sec9_title: "الأسواق ومنصات التجارة الإلكترونية",
      sec9_desc1: "بالنسبة للأسواق والبنى التحتية الكبيرة للتجارة الإلكترونية، فإن توفير تجربة أكثر ثراءً على صفحات المنتجات يخلق ميزة تنافسية كبيرة.",
      sec9_desc2: "تقدم IARONE بنية تحتية معيارية يمكن أن تساعد بائعي السوق أو منصات التجارة الإلكترونية للشركات على نشر منتجاتهم بتنسيقات ثلاثية الأبعاد والواقع المعزز. بفضل واجهة برمجة التطبيقات ونهج التسمية البيضاء، يمكن للمنصات استخدام تدفق الإنتاج ثلاثي الأبعاد / الواقع المعزز داخل أنظمتها الخاصة.",
      sec9_li1: "تجربة منتج ثلاثية الأبعاد لبائعي السوق",
      sec9_li2: "تحويل 3D / AR للكتالوجات الكبيرة",
      sec9_li3: "تكامل النظام عبر API",
      sec9_li4: "البنية التحتية للتجارة ثلاثية الأبعاد ذات التسمية البيضاء",
      sec9_li5: "تدفق إنتاج نموذج ثلاثي الأبعاد داخل لوحة البائع",
      val_title: "قيمة مشتركة لكل صناعة",
      val_desc: "القيمة الأساسية التي تقدمها IARONE هي نفسها لكل صناعة: تحويل المنتجات إلى تجربة رقمية أكثر وضوحًا وتفاعلية وأكثر بناءً للثقة.",
      v1_title: "تحويل الأصول",
      v1_desc: "يحول صور المنتج إلى أصول ثلاثية الأبعاد / واقع معزز في دقائق.",
      v2_title: "تحسين الويب",
      v2_desc: "يوفر إخراجًا خفيف الوزن محسنًا خصيصًا للويب ومواقع التجارة الإلكترونية.",
      v3_title: "دعم تنسيقات متعددة",
      v3_desc: "يولد أصول ملصقات وصور مصغرة جاهزة للنشر إلى جانب تنسيقات GLB / USDZ.",
      v4_title: "عرض 360 درجة",
      v4_desc: "يقدم تجربة مشاهدة حديثة وتفاعلية بزاوية 360 درجة على صفحات المنتجات الكلاسيكية."
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
console.log("Pages updated completely.");
