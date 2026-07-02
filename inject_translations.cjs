const fs = require('fs');

const new_keys_tr = {
  tab_corp: "E-Ticaret Çözümleri",
  tab_personal: "Kişisel Kullanım",
  
  corp_badge: "E-Ticaret Çözümleri",
  corp_h2_1: "Fotoğraftan Etkileşimli",
  corp_h2_2: "3D & AR Deneyimine",
  corp_desc: "E-ticaret vizyonunuzu baştan tanımlıyoruz. Yalnızca ürün fotoğraflarınızı kullanarak, markanıza değer katan hiper-gerçekçi 3D modellere ve doğrudan web üzerinden çalışan Artırılmış Gerçeklik (AR) tecrübesine dakikalar içinde ulaşın. Ürün sayfalarınızı lüks bir sergi alanına dönüştürün.",
  corp_feat_1: "Kodlama Gerektirmez",
  corp_feat_2: "Web ve Mobil Uyumlu",
  corp_feat_3: "Premium Kalite",
  
  perf_badge: "Performans & Uyumluluk",
  perf_title: "Web ve E-ticaret İçin Optimize",
  perf_desc_1: "IARONE, üretilen 3D modelleri yalnızca görsel olarak oluşturmakla kalmaz; web sitelerinde, ürün sayfalarında ve artırılmış gerçeklik deneyimlerinde sorunsuz kullanılabilecek hale getirir. Platform, AI ile oluşturulan 3D varlıkları performans, dosya boyutu, format uyumluluğu, görüntü kalitesi ve yayınlanabilirlik açısından optimize eder.",
  perf_desc_2: "Bu sayede markalar, teknik entegrasyon yüküyle uğraşmadan ürünlerini web üzerinde 360° görüntülenebilir, mobil uyumlu ve AR deneyimine hazır şekilde müşterilerine sunabilir. IARONE’un amacı, 3D ve AR ürün deneyimini ağır, yavaş ve teknik bir süreç olmaktan çıkarıp e-ticaret için yönetilebilir, hızlı ve ölçeklenebilir bir altyapıya dönüştürmektir.",
  
  feat_list_title: "Öne Çıkan Özellikler",
  feat_li_1: "Web siteleri ve e-ticaret ürün sayfaları için optimize edilmiş 3D çıktı",
  feat_li_2: "GLB ve USDZ gibi web ve AR uyumlu formatlara hazırlık",
  feat_li_3: "Daha hızlı yüklenen, daha hafif ve daha kullanılabilir model yapısı",
  feat_li_4: "Mobil cihazlarda daha akıcı 3D görüntüleme deneyimi",
  feat_li_5: "Ürün sayfasına entegre edilebilir 360° görüntüleme altyapısı",
  feat_li_6: "AR deneyimi için gerçek dünya kullanımına uygun varlık hazırlığı",
  feat_li_7: "Poster, thumbnail ve metadata gibi yayın destek çıktıları",
  feat_li_8: "Teknik bilgi gerektirmeden publish edilebilir 3D/AR ürün paketi",
  feat_li_9: "E-ticaret markaları için daha güçlü ürün sunumu ve kullanıcı güveni",
  feat_li_10: "Tek üründen katalog ölçeğine büyüyebilen altyapı",
  
  quote_main: "IARONE’un farkı yalnızca 3D model üretmesi değil; bu modeli satışa hazır, web uyumlu ve e-ticaret içinde kullanılabilir bir 3D/AR varlığa dönüştürmesidir.",
  quote_sub: "IARONE, AI ile üretilen 3D modelleri web ve e-ticaret için optimize ederek markaların ürünlerini hızlı, hafif, mobil uyumlu ve AR’ye hazır şekilde yayınlamasını sağlar.",
  
  proj_badge: "Proje Detayları",
  proj_title: "Iarone Projesinin Detayları ve Özellikleri",
  proj_desc: "Fiziksel mağaza deneyimini dijital ortama taşıyın. Iarone, ürünlerinizi pasif görseller yerine interaktif 3D modeller ve Artırılmış Gerçeklik (AR) ile sunmanızı sağlayan yenilikçi bir platformdur.",
  
  pc1_title: "Yüksek Performanslı 3D & AR",
  pc1_desc: "2D fotoğrafları yüksek kaliteli 3D modellere dönüştürür. Poligon sayısı ve dokular mobil cihazlar için optimize edilir, web sitenizde hız kaybı yaşanmaz.",
  pc2_title: "Anında Yayın & Entegrasyon",
  pc2_desc: "Kodlama bilgisine ihtiyaç duymadan, otomatik oluşturulan Iframe/Embed kodu ile 3D modellerinizi e-ticaret sitenize kolayca entegre edin.",
  pc3_title: "Kalite Analizi & Düşük İade",
  pc3_desc: "Oluşturulan her model mobil uyumluluk için test edilir ve raporlanır. Müşterileriniz bilinçli satın alır, ürün iade oranlarınız büyük ölçüde düşer.",
  
  contact_badge: "Kurumsal Çözümler & İletişim",
  contact_title: "Katalog dönüşümünüzü birlikte planlayalım.",
  contact_desc: "Ürün kataloğunuzu Iarone ile 3D/AR'a taşımak, satışlarınızı artırmak ve iadeleri en aza indirmek için uzman ekibimizle iletişime geçin. Sizin için en uygun stratejiyi birlikte belirleyelim.",
  
  c1_title: "İşletmenize Özel Üretim Planı",
  c1_desc: "Mevcut 2D görsel arşivinizi detaylıca analiz ediyor, ürün grubunuza ve sektörel standartlarınıza en uygun 3D modelleme süreçlerini haritalandırıyoruz.",
  c2_title: "Toplu Dönüştürme Hizmetleri",
  c2_desc: "Yüzlerce ürünlük kataloglarınızı tek tek uğraşmadan, standartlara uygun olarak eş zamanlı şekilde AR ve 3D web görünümüne hazırlıyoruz.",
  c3_title: "Hedefli Entegrasyon Alanları",
  c3_desc: "Elde edilen web uyumlu modelleri Shopify, WooCommerce gibi altyapılarınıza veya kendi özel sisteminize Iframe/API üzerinden hızlıca bağlıyoruz.",
  c4_title: "Zaman ve Maliyet Optimizasyonu",
  c4_desc: "Geleneksel stüdyo ürün çekimlerinden ve karmaşık 3D ajans maliyetlerinden tasarruf ederek e-ticaretteki rekabet gücünüzü hızla artırın.",
  
  contact_btn: "Uzmanımızla İletişime Geçin",
  contact_hint: "Projeye dair bir ön değerlendirme yapmak için e-posta gönderebilirsiniz."
};

const new_keys_en = {
  tab_corp: "E-Commerce Solutions",
  tab_personal: "Personal Use",
  
  corp_badge: "E-Commerce Solutions",
  corp_h2_1: "From Photo to Interactive",
  corp_h2_2: "3D & AR Experience",
  corp_desc: "We are redefining your e-commerce vision. Using just your product photos, achieve hyper-realistic 3D models that add value to your brand and an Augmented Reality (AR) experience that works directly on the web within minutes. Transform your product pages into a luxurious exhibition space.",
  corp_feat_1: "No Coding Required",
  corp_feat_2: "Web & Mobile Compatible",
  corp_feat_3: "Premium Quality",
  
  perf_badge: "Performance & Compatibility",
  perf_title: "Optimized for Web & E-Commerce",
  perf_desc_1: "IARONE does not just visually create the generated 3D models; it makes them seamlessly usable on websites, product pages, and augmented reality experiences. The platform optimizes AI-generated 3D assets in terms of performance, file size, format compatibility, visual quality, and publishability.",
  perf_desc_2: "This allows brands to present their products to customers as 360° viewable, mobile-compatible, and AR-ready on the web without dealing with technical integration burdens. IARONE's goal is to transform the 3D and AR product experience from being a heavy, slow, and technical process into a manageable, fast, and scalable infrastructure for e-commerce.",
  
  feat_list_title: "Highlighted Features",
  feat_li_1: "Optimized 3D output for websites and e-commerce product pages",
  feat_li_2: "Preparation for web and AR compatible formats like GLB and USDZ",
  feat_li_3: "Faster loading, lighter, and more usable model structure",
  feat_li_4: "Smoother 3D viewing experience on mobile devices",
  feat_li_5: "360° viewing infrastructure that can be integrated into the product page",
  feat_li_6: "Asset preparation suitable for real-world use for AR experience",
  feat_li_7: "Publishing support outputs like poster, thumbnail, and metadata",
  feat_li_8: "Publishable 3D/AR product package without requiring technical knowledge",
  feat_li_9: "Stronger product presentation and user trust for e-commerce brands",
  feat_li_10: "Infrastructure that can scale from a single product to catalog scale",
  
  quote_main: "IARONE's difference is not just producing a 3D model; it is transforming this model into a sales-ready, web-compatible, and usable 3D/AR asset in e-commerce.",
  quote_sub: "IARONE enables brands to publish their products in a fast, lightweight, mobile-compatible, and AR-ready manner by optimizing AI-generated 3D models for web and e-commerce.",
  
  proj_badge: "Project Details",
  proj_title: "Iarone Project Details and Features",
  proj_desc: "Bring the physical store experience to the digital environment. Iarone is an innovative platform that allows you to present your products with interactive 3D models and Augmented Reality (AR) instead of passive visuals.",
  
  pc1_title: "High Performance 3D & AR",
  pc1_desc: "Transforms 2D photos into high-quality 3D models. Polygon count and textures are optimized for mobile devices, so there is no speed loss on your website.",
  pc2_title: "Instant Publishing & Integration",
  pc2_desc: "Easily integrate your 3D models into your e-commerce site with auto-generated Iframe/Embed code, without needing any coding knowledge.",
  pc3_title: "Quality Analysis & Low Returns",
  pc3_desc: "Every generated model is tested and reported for mobile compatibility. Your customers buy consciously, and your product return rates drop significantly.",
  
  contact_badge: "Corporate Solutions & Contact",
  contact_title: "Let's plan your catalog transformation together.",
  contact_desc: "Contact our expert team to move your product catalog to 3D/AR with Iarone, increase your sales, and minimize returns. Let's determine the best strategy for you together.",
  
  c1_title: "Custom Production Plan for Your Business",
  c1_desc: "We analyze your existing 2D visual archive in detail and map out the most suitable 3D modeling processes for your product group and industry standards.",
  c2_title: "Bulk Conversion Services",
  c2_desc: "We prepare your catalogs of hundreds of products for AR and 3D web view simultaneously in accordance with standards, without dealing with them one by one.",
  c3_title: "Targeted Integration Areas",
  c3_desc: "We quickly connect the resulting web-compatible models to your infrastructures like Shopify, WooCommerce, or your own custom system via Iframe/API.",
  c4_title: "Time and Cost Optimization",
  c4_desc: "Rapidly increase your competitive edge in e-commerce by saving on traditional studio product shoots and complex 3D agency costs.",
  
  contact_btn: "Contact Our Expert",
  contact_hint: "You can send an email to make a preliminary assessment of the project."
};

const new_keys_ar = {
  tab_corp: "حلول التجارة الإلكترونية",
  tab_personal: "استخدام شخصي",
  
  corp_badge: "حلول التجارة الإلكترونية",
  corp_h2_1: "من الصورة إلى التفاعل",
  corp_h2_2: "تجربة ثلاثية الأبعاد والواقع المعزز",
  corp_desc: "نحن نعيد تعريف رؤية التجارة الإلكترونية الخاصة بك. باستخدام صور منتجاتك فقط، احصل على نماذج ثلاثية الأبعاد واقعية للغاية تضيف قيمة إلى علامتك التجارية وتجربة واقع معزز تعمل مباشرة على الويب في غضون دقائق. حوّل صفحات منتجاتك إلى مساحة عرض فاخرة.",
  corp_feat_1: "لا يتطلب معرفة بالبرمجة",
  corp_feat_2: "متوافق مع الويب والموبايل",
  corp_feat_3: "جودة فائقة",
  
  perf_badge: "الأداء والتوافق",
  perf_title: "مُحسّن للويب والتجارة الإلكترونية",
  perf_desc_1: "لا تقوم منصة IARONE بإنشاء النماذج ثلاثية الأبعاد بصريًا فحسب؛ بل تجعلها قابلة للاستخدام بسلاسة على مواقع الويب وصفحات المنتجات وتجارب الواقع المعزز. تعمل المنصة على تحسين الأصول ثلاثية الأبعاد التي تم إنشاؤها بواسطة الذكاء الاصطناعي من حيث الأداء وحجم الملف وتوافق التنسيق والجودة المرئية وقابلية النشر.",
  perf_desc_2: "يتيح ذلك للعلامات التجارية تقديم منتجاتها للعملاء قابلة للعرض بزاوية 360 درجة، ومتوافقة مع الأجهزة المحمولة، وجاهزة للواقع المعزز على الويب دون التعامل مع أعباء التكامل التقني. هدف IARONE هو تحويل تجربة المنتج ثلاثي الأبعاد والواقع المعزز من عملية ثقيلة وبطيئة وتقنية إلى بنية تحتية يمكن إدارتها وسريعة وقابلة للتطوير للتجارة الإلكترونية.",
  
  feat_list_title: "الميزات البارزة",
  feat_li_1: "إخراج ثلاثي الأبعاد مُحسّن لمواقع الويب وصفحات منتجات التجارة الإلكترونية",
  feat_li_2: "التحضير لتنسيقات متوافقة مع الويب والواقع المعزز مثل GLB و USDZ",
  feat_li_3: "بنية نموذج أسرع في التحميل، أخف وزناً، وأكثر قابلية للاستخدام",
  feat_li_4: "تجربة عرض ثلاثية الأبعاد أكثر سلاسة على الأجهزة المحمولة",
  feat_li_5: "بنية تحتية للعرض بزاوية 360 درجة يمكن دمجها في صفحة المنتج",
  feat_li_6: "تجهيز الأصول المناسبة للاستخدام في العالم الحقيقي لتجربة الواقع المعزز",
  feat_li_7: "دعم مخرجات النشر مثل الملصق، والصورة المصغرة، والبيانات الوصفية",
  feat_li_8: "حزمة منتج ثلاثية الأبعاد / واقع معزز قابلة للنشر دون الحاجة إلى معرفة فنية",
  feat_li_9: "تقديم منتج أقوى وثقة المستخدم للعلامات التجارية للتجارة الإلكترونية",
  feat_li_10: "بنية تحتية يمكن توسيعها من منتج واحد إلى مستوى الكتالوج",
  
  quote_main: "اختلاف IARONE لا يقتصر فقط على إنتاج نموذج ثلاثي الأبعاد؛ بل هو تحويل هذا النموذج إلى أصل ثلاثي الأبعاد / واقع معزز جاهز للمبيعات ومتوافق مع الويب وقابل للاستخدام في التجارة الإلكترونية.",
  quote_sub: "تُمكّن IARONE العلامات التجارية من نشر منتجاتها بطريقة سريعة وخفيفة الوزن ومتوافقة مع الأجهزة المحمولة وجاهزة للواقع المعزز من خلال تحسين النماذج ثلاثية الأبعاد التي تم إنشاؤها بواسطة الذكاء الاصطناعي للويب والتجارة الإلكترونية.",
  
  proj_badge: "تفاصيل المشروع",
  proj_title: "تفاصيل وميزات مشروع Iarone",
  proj_desc: "انقل تجربة المتجر الفعلي إلى البيئة الرقمية. Iarone هي منصة مبتكرة تسمح لك بتقديم منتجاتك بنماذج تفاعلية ثلاثية الأبعاد والواقع المعزز بدلاً من المرئيات السلبية.",
  
  pc1_title: "أداء عالٍ ثلاثي الأبعاد وواقع معزز",
  pc1_desc: "يحول الصور ثنائية الأبعاد إلى نماذج ثلاثية الأبعاد عالية الجودة. تم تحسين عدد المضلعات والأنسجة للأجهزة المحمولة، لذلك لا يوجد فقدان للسرعة على موقع الويب الخاص بك.",
  pc2_title: "نشر وتكامل فوري",
  pc2_desc: "قم بدمج النماذج ثلاثية الأبعاد الخاصة بك بسهولة في موقع التجارة الإلكترونية الخاص بك باستخدام كود Iframe/Embed المُنشأ تلقائيًا، دون الحاجة إلى أي معرفة بالبرمجة.",
  pc3_title: "تحليل الجودة وانخفاض المرتجعات",
  pc3_desc: "يتم اختبار كل نموذج تم إنشاؤه والإبلاغ عنه لتوافقه مع الأجهزة المحمولة. يشتري عملاؤك بوعي، وتنخفض معدلات إرجاع منتجاتك بشكل كبير.",
  
  contact_badge: "حلول الشركات والاتصال",
  contact_title: "دعونا نخطط لتحول الكتالوج الخاص بك معًا.",
  contact_desc: "اتصل بفريق الخبراء لدينا لنقل كتالوج منتجاتك إلى ثلاثي الأبعاد / واقع معزز مع Iarone، وزيادة مبيعاتك، وتقليل المرتجعات. دعونا نحدد أفضل استراتيجية لك معًا.",
  
  c1_title: "خطة إنتاج مخصصة لعملك",
  c1_desc: "نقوم بتحليل أرشيفك المرئي ثنائي الأبعاد الحالي بالتفصيل ونرسم عمليات النمذجة ثلاثية الأبعاد الأكثر ملاءمة لمجموعة منتجاتك ومعايير الصناعة.",
  c2_title: "خدمات التحويل الجماعي",
  c2_desc: "نقوم بإعداد كتالوجات مئات المنتجات لعرض الويب للواقع المعزز وثلاثي الأبعاد في وقت واحد وفقًا للمعايير، دون التعامل معها واحدًا تلو الآخر.",
  c3_title: "مناطق التكامل المستهدفة",
  c3_desc: "نقوم بتوصيل النماذج المتوافقة مع الويب الناتجة بسرعة بالبنية التحتية الخاصة بك مثل Shopify أو WooCommerce أو نظامك المخصص عبر Iframe/API.",
  c4_title: "تحسين الوقت والتكلفة",
  c4_desc: "قم بزيادة ميزتك التنافسية بسرعة في التجارة الإلكترونية من خلال التوفير في لقطات منتجات الاستوديو التقليدية وتكاليف وكالات التصميم ثلاثي الأبعاد المعقدة.",
  
  contact_btn: "تواصل مع خبرائنا",
  contact_hint: "يمكنك إرسال بريد إلكتروني لإجراء تقييم أولي للمشروع."
};

let content = fs.readFileSync('i18n.js', 'utf8');

function inject(langCode, obj) {
    const jsonStr = JSON.stringify(obj, null, 6);
    const innerJson = jsonStr.substring(1, jsonStr.length - 1); // remove outer braces
    
    // find langCode: {
    const regex = new RegExp(`(${langCode}:\\s*\\{)`);
    const match = content.match(regex);
    if (match) {
        const replacement = `\n    new_sections: {${innerJson}},\n`;
        content = content.replace(regex, `$1${replacement}`);
    } else {
        console.log(`Could not find language code: ${langCode}`);
    }
}

inject('tr', new_keys_tr);
inject('en', new_keys_en);
if (content.includes('ar: {')) {
    inject('ar', new_keys_ar);
}

fs.writeFileSync('i18n.js', content, 'utf8');
console.log('Done injecting.');
