const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  // TABS
  { search: 'onclick="switchSegment(\'corp\')">E-Ticaret Çözümleri', replace: 'onclick="switchSegment(\'corp\')" data-i18n="new_sections.tab_corp">E-Ticaret Çözümleri' },
  { search: 'onclick="switchSegment(\'personal\')">Kişisel Kullanım', replace: 'onclick="switchSegment(\'personal\')" data-i18n="new_sections.tab_personal">Kişisel Kullanım' },
  
  // CORP SECTION
  { search: '>E-Ticaret Çözümleri</span>', replace: ' data-i18n="new_sections.corp_badge">E-Ticaret Çözümleri</span>' },
  { search: '<h2 style="font-size: 46px; font-weight: 800; color: var(--t1); margin-bottom: 24px; letter-spacing: -1.5px; line-height: 1.1;">Fotoğraftan Etkileşimli<br><span style="background: linear-gradient(90deg, #2563eb, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">3D & AR Deneyimine</span></h2>',
    replace: '<h2 style="font-size: 46px; font-weight: 800; color: var(--t1); margin-bottom: 24px; letter-spacing: -1.5px; line-height: 1.1;"><span data-i18n="new_sections.corp_h2_1">Fotoğraftan Etkileşimli</span><br><span style="background: linear-gradient(90deg, #2563eb, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;" data-i18n="new_sections.corp_h2_2">3D & AR Deneyimine</span></h2>' },
  { search: 'E-ticaret vizyonunuzu baştan tanımlıyoruz. Yalnızca ürün fotoğraflarınızı kullanarak, markanıza değer katan hiper-gerçekçi 3D modellere ve doğrudan web üzerinden çalışan Artırılmış Gerçeklik (AR) tecrübesine dakikalar içinde ulaşın. Ürün sayfalarınızı lüks bir sergi alanına dönüştürün.',
    replace: '<span data-i18n="new_sections.corp_desc">E-ticaret vizyonunuzu baştan tanımlıyoruz. Yalnızca ürün fotoğraflarınızı kullanarak, markanıza değer katan hiper-gerçekçi 3D modellere ve doğrudan web üzerinden çalışan Artırılmış Gerçeklik (AR) tecrübesine dakikalar içinde ulaşın. Ürün sayfalarınızı lüks bir sergi alanına dönüştürün.</span>' },
  { search: '>\n          Kodlama Gerektirmez\n        </div>', replace: '>\n          <span data-i18n="new_sections.corp_feat_1">Kodlama Gerektirmez</span>\n        </div>' },
  { search: '>\n          Web ve Mobil Uyumlu\n        </div>', replace: '>\n          <span data-i18n="new_sections.corp_feat_2">Web ve Mobil Uyumlu</span>\n        </div>' },
  { search: '>\n          Premium Kalite\n        </div>', replace: '>\n          <span data-i18n="new_sections.corp_feat_3">Premium Kalite</span>\n        </div>' },
  
  // PERF SECTION
  { search: '>Performans & Uyumluluk</span>', replace: ' data-i18n="new_sections.perf_badge">Performans & Uyumluluk</span>' },
  { search: '>Web ve E-ticaret İçin Optimize</h2>', replace: ' data-i18n="new_sections.perf_title">Web ve E-ticaret İçin Optimize</h2>' },
  { search: 'IARONE, üretilen 3D modelleri yalnızca görsel olarak oluşturmakla kalmaz; web sitelerinde, ürün sayfalarında ve artırılmış gerçeklik deneyimlerinde sorunsuz kullanılabilecek hale getirir. Platform, AI ile oluşturulan 3D varlıkları performans, dosya boyutu, format uyumluluğu, görüntü kalitesi ve yayınlanabilirlik açısından optimize eder.<br><br>\n          Bu sayede markalar, teknik entegrasyon yüküyle uğraşmadan ürünlerini web üzerinde 360° görüntülenebilir, mobil uyumlu ve AR deneyimine hazır şekilde müşterilerine sunabilir. IARONE’un amacı, 3D ve AR ürün deneyimini ağır, yavaş ve teknik bir süreç olmaktan çıkarıp e-ticaret için yönetilebilir, hızlı ve ölçeklenebilir bir altyapıya dönüştürmektir.',
    replace: '<span data-i18n="new_sections.perf_desc_1">IARONE, üretilen 3D modelleri yalnızca görsel olarak oluşturmakla kalmaz; web sitelerinde, ürün sayfalarında ve artırılmış gerçeklik deneyimlerinde sorunsuz kullanılabilecek hale getirir. Platform, AI ile oluşturulan 3D varlıkları performans, dosya boyutu, format uyumluluğu, görüntü kalitesi ve yayınlanabilirlik açısından optimize eder.</span><br><br>\n          <span data-i18n="new_sections.perf_desc_2">Bu sayede markalar, teknik entegrasyon yüküyle uğraşmadan ürünlerini web üzerinde 360° görüntülenebilir, mobil uyumlu ve AR deneyimine hazır şekilde müşterilerine sunabilir. IARONE’un amacı, 3D ve AR ürün deneyimini ağır, yavaş ve teknik bir süreç olmaktan çıkarıp e-ticaret için yönetilebilir, hızlı ve ölçeklenebilir bir altyapıya dönüştürmektir.</span>' },
  
  { search: '>Öne Çıkan Özellikler</h3>', replace: ' data-i18n="new_sections.feat_list_title">Öne Çıkan Özellikler</h3>' },
  { search: '>Web siteleri ve e-ticaret ürün sayfaları için optimize edilmiş 3D çıktı</span>', replace: ' data-i18n="new_sections.feat_li_1">Web siteleri ve e-ticaret ürün sayfaları için optimize edilmiş 3D çıktı</span>' },
  { search: '>GLB ve USDZ gibi web ve AR uyumlu formatlara hazırlık</span>', replace: ' data-i18n="new_sections.feat_li_2">GLB ve USDZ gibi web ve AR uyumlu formatlara hazırlık</span>' },
  { search: '>Daha hızlı yüklenen, daha hafif ve daha kullanılabilir model yapısı</span>', replace: ' data-i18n="new_sections.feat_li_3">Daha hızlı yüklenen, daha hafif ve daha kullanılabilir model yapısı</span>' },
  { search: '>Mobil cihazlarda daha akıcı 3D görüntüleme deneyimi</span>', replace: ' data-i18n="new_sections.feat_li_4">Mobil cihazlarda daha akıcı 3D görüntüleme deneyimi</span>' },
  { search: '>Ürün sayfasına entegre edilebilir 360° görüntüleme altyapısı</span>', replace: ' data-i18n="new_sections.feat_li_5">Ürün sayfasına entegre edilebilir 360° görüntüleme altyapısı</span>' },
  { search: '>AR deneyimi için gerçek dünya kullanımına uygun varlık hazırlığı</span>', replace: ' data-i18n="new_sections.feat_li_6">AR deneyimi için gerçek dünya kullanımına uygun varlık hazırlığı</span>' },
  { search: '>Poster, thumbnail ve metadata gibi yayın destek çıktıları</span>', replace: ' data-i18n="new_sections.feat_li_7">Poster, thumbnail ve metadata gibi yayın destek çıktıları</span>' },
  { search: '>Teknik bilgi gerektirmeden publish edilebilir 3D/AR ürün paketi</span>', replace: ' data-i18n="new_sections.feat_li_8">Teknik bilgi gerektirmeden publish edilebilir 3D/AR ürün paketi</span>' },
  { search: '>E-ticaret markaları için daha güçlü ürün sunumu ve kullanıcı güveni</span>', replace: ' data-i18n="new_sections.feat_li_9">E-ticaret markaları için daha güçlü ürün sunumu ve kullanıcı güveni</span>' },
  { search: '>Tek üründen katalog ölçeğine büyüyebilen altyapı</span>', replace: ' data-i18n="new_sections.feat_li_10">Tek üründen katalog ölçeğine büyüyebilen altyapı</span>' },
  
  { search: 'IARONE’un farkı yalnızca 3D model üretmesi değil; bu modeli satışa hazır, web uyumlu ve e-ticaret içinde kullanılabilir bir 3D/AR varlığa dönüştürmesidir.', replace: '<span data-i18n="new_sections.quote_main">IARONE’un farkı yalnızca 3D model üretmesi değil; bu modeli satışa hazır, web uyumlu ve e-ticaret içinde kullanılabilir bir 3D/AR varlığa dönüştürmesidir.</span>' },
  { search: '>IARONE, AI ile üretilen 3D modelleri web ve e-ticaret için optimize ederek markaların ürünlerini hızlı, hafif, mobil uyumlu ve AR’ye hazır şekilde yayınlamasını sağlar.</p>', replace: ' data-i18n="new_sections.quote_sub">IARONE, AI ile üretilen 3D modelleri web ve e-ticaret için optimize ederek markaların ürünlerini hızlı, hafif, mobil uyumlu ve AR’ye hazır şekilde yayınlamasını sağlar.</p>' },
  
  // PROJE DETAYLARI
  { search: '>Proje Detayları</span>', replace: ' data-i18n="new_sections.proj_badge">Proje Detayları</span>' },
  { search: '>Iarone Projesinin Detayları ve Özellikleri</h2>', replace: ' data-i18n="new_sections.proj_title">Iarone Projesinin Detayları ve Özellikleri</h2>' },
  { search: 'Fiziksel mağaza deneyimini dijital ortama taşıyın. Iarone, ürünlerinizi pasif görseller yerine interaktif 3D modeller ve Artırılmış Gerçeklik (AR) ile sunmanızı sağlayan yenilikçi bir platformdur.', replace: '<span data-i18n="new_sections.proj_desc">Fiziksel mağaza deneyimini dijital ortama taşıyın. Iarone, ürünlerinizi pasif görseller yerine interaktif 3D modeller ve Artırılmış Gerçeklik (AR) ile sunmanızı sağlayan yenilikçi bir platformdur.</span>' },
  
  { search: '>Yüksek Performanslı 3D & AR</h3>', replace: ' data-i18n="new_sections.pc1_title">Yüksek Performanslı 3D & AR</h3>' },
  { search: '2D fotoğrafları yüksek kaliteli 3D modellere dönüştürür. Poligon sayısı ve dokular mobil cihazlar için optimize edilir, web sitenizde hız kaybı yaşanmaz.', replace: '<span data-i18n="new_sections.pc1_desc">2D fotoğrafları yüksek kaliteli 3D modellere dönüştürür. Poligon sayısı ve dokular mobil cihazlar için optimize edilir, web sitenizde hız kaybı yaşanmaz.</span>' },
  
  { search: '>Anında Yayın & Entegrasyon</h3>', replace: ' data-i18n="new_sections.pc2_title">Anında Yayın & Entegrasyon</h3>' },
  { search: 'Kodlama bilgisine ihtiyaç duymadan, otomatik oluşturulan Iframe/Embed kodu ile 3D modellerinizi e-ticaret sitenize kolayca entegre edin.', replace: '<span data-i18n="new_sections.pc2_desc">Kodlama bilgisine ihtiyaç duymadan, otomatik oluşturulan Iframe/Embed kodu ile 3D modellerinizi e-ticaret sitenize kolayca entegre edin.</span>' },
  
  { search: '>Kalite Analizi & Düşük İade</h3>', replace: ' data-i18n="new_sections.pc3_title">Kalite Analizi & Düşük İade</h3>' },
  { search: 'Oluşturulan her model mobil uyumluluk için test edilir ve raporlanır. Müşterileriniz bilinçli satın alır, ürün iade oranlarınız büyük ölçüde düşer.', replace: '<span data-i18n="new_sections.pc3_desc">Oluşturulan her model mobil uyumluluk için test edilir ve raporlanır. Müşterileriniz bilinçli satın alır, ürün iade oranlarınız büyük ölçüde düşer.</span>' },
  
  // CONTACT SECTION
  { search: '>Kurumsal Çözümler & İletişim</span>', replace: ' data-i18n="new_sections.contact_badge">Kurumsal Çözümler & İletişim</span>' },
  { search: '>Katalog dönüşümünüzü birlikte planlayalım.</h2>', replace: ' data-i18n="new_sections.contact_title">Katalog dönüşümünüzü birlikte planlayalım.</h2>' },
  { search: 'Ürün kataloğunuzu Iarone ile 3D/AR\'a taşımak, satışlarınızı artırmak ve iadeleri en aza indirmek için uzman ekibimizle iletişime geçin. Sizin için en uygun stratejiyi birlikte belirleyelim.', replace: '<span data-i18n="new_sections.contact_desc">Ürün kataloğunuzu Iarone ile 3D/AR\'a taşımak, satışlarınızı artırmak ve iadeleri en aza indirmek için uzman ekibimizle iletişime geçin. Sizin için en uygun stratejiyi birlikte belirleyelim.</span>' },
  
  { search: '>İşletmenize Özel Üretim Planı</h4>', replace: ' data-i18n="new_sections.c1_title">İşletmenize Özel Üretim Planı</h4>' },
  { search: 'Mevcut 2D görsel arşivinizi detaylıca analiz ediyor, ürün grubunuza ve sektörel standartlarınıza en uygun 3D modelleme süreçlerini haritalandırıyoruz.', replace: '<span data-i18n="new_sections.c1_desc">Mevcut 2D görsel arşivinizi detaylıca analiz ediyor, ürün grubunuza ve sektörel standartlarınıza en uygun 3D modelleme süreçlerini haritalandırıyoruz.</span>' },
  
  { search: '>Toplu Dönüştürme Hizmetleri</h4>', replace: ' data-i18n="new_sections.c2_title">Toplu Dönüştürme Hizmetleri</h4>' },
  { search: 'Yüzlerce ürünlük kataloglarınızı tek tek uğraşmadan, standartlara uygun olarak eş zamanlı şekilde AR ve 3D web görünümüne hazırlıyoruz.', replace: '<span data-i18n="new_sections.c2_desc">Yüzlerce ürünlük kataloglarınızı tek tek uğraşmadan, standartlara uygun olarak eş zamanlı şekilde AR ve 3D web görünümüne hazırlıyoruz.</span>' },
  
  { search: '>Hedefli Entegrasyon Alanları</h4>', replace: ' data-i18n="new_sections.c3_title">Hedefli Entegrasyon Alanları</h4>' },
  { search: 'Elde edilen web uyumlu modelleri Shopify, WooCommerce gibi altyapılarınıza veya kendi özel sisteminize Iframe/API üzerinden hızlıca bağlıyoruz.', replace: '<span data-i18n="new_sections.c3_desc">Elde edilen web uyumlu modelleri Shopify, WooCommerce gibi altyapılarınıza veya kendi özel sisteminize Iframe/API üzerinden hızlıca bağlıyoruz.</span>' },
  
  { search: '>Zaman ve Maliyet Optimizasyonu</h4>', replace: ' data-i18n="new_sections.c4_title">Zaman ve Maliyet Optimizasyonu</h4>' },
  { search: 'Geleneksel stüdyo ürün çekimlerinden ve karmaşık 3D ajans maliyetlerinden tasarruf ederek e-ticaretteki rekabet gücünüzü hızla artırın.', replace: '<span data-i18n="new_sections.c4_desc">Geleneksel stüdyo ürün çekimlerinden ve karmaşık 3D ajans maliyetlerinden tasarruf ederek e-ticaretteki rekabet gücünüzü hızla artırın.</span>' },
  
  { search: '>\n        Uzmanımızla İletişime Geçin\n      </a>', replace: '>\n        <span data-i18n="new_sections.contact_btn">Uzmanımızla İletişime Geçin</span>\n      </a>' },
  { search: '>Projeye dair bir ön değerlendirme yapmak için e-posta gönderebilirsiniz.</p>', replace: ' data-i18n="new_sections.contact_hint">Projeye dair bir ön değerlendirme yapmak için e-posta gönderebilirsiniz.</p>' }
];

let unfound = [];

replacements.forEach(rep => {
  if (html.includes(rep.search)) {
    html = html.replace(rep.search, rep.replace);
  } else {
    unfound.push(rep.search);
  }
});

fs.writeFileSync('index.html', html, 'utf8');

if (unfound.length > 0) {
  console.log("Could not find the following strings:");
  unfound.forEach(s => console.log(s));
} else {
  console.log("All replacements successful.");
}
