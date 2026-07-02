const fs = require('fs');

let hw = fs.readFileSync('nasil-calisir.html', 'utf8');

const hwReps = [
  { search: '>Akış</span>', replace: ' data-i18n="how_it_works.badge_flow">Akış</span>' },
  { search: '<h1>Nasıl Çalışır?</h1>', replace: '<h1 data-i18n="how_it_works.hero_title">Nasıl Çalışır?</h1>' },
  { search: '<p>IARONE, ürün fotoğrafından başlayarak web ve artırılmış gerçeklikte kullanılabilecek satışa hazır 3D/AR varlıklar üretir. Marka yalnızca ürün görselini yükler; sistem arka planda 3D üretim, optimizasyon, kalite kontrol ve yayınlama süreçlerini tek akışta yönetir.</p>',
    replace: '<p data-i18n="how_it_works.hero_desc">IARONE, ürün fotoğrafından başlayarak web ve artırılmış gerçeklikte kullanılabilecek satışa hazır 3D/AR varlıklar üretir. Marka yalnızca ürün görselini yükler; sistem arka planda 3D üretim, optimizasyon, kalite kontrol ve yayınlama süreçlerini tek akışta yönetir.</p>' },
  { search: '</div> Ürün Fotoğrafını Yükle</h2>', replace: '</div> <span data-i18n="how_it_works.step1_title">Ürün Fotoğrafını Yükle</span></h2>' },
  { search: '<p>Marka, ürün fotoğrafını IARONE paneline yükler. Ürün adı, kategori, isteğe bağlı ölçü bilgisi veya referans nesne gibi detaylar eklenebilir.</p>',
    replace: '<p data-i18n="how_it_works.step1_desc1">Marka, ürün fotoğrafını IARONE paneline yükler. Ürün adı, kategori, isteğe bağlı ölçü bilgisi veya referans nesne gibi detaylar eklenebilir.</p>' },
  { search: '<p style="margin-bottom:24px;">Bu adımda kullanıcının teknik bilgiye ihtiyacı yoktur. Blender, 3D modelleme veya AR entegrasyon bilgisi gerekmez.</p>',
    replace: '<p style="margin-bottom:24px;" data-i18n="how_it_works.step1_desc2">Bu adımda kullanıcının teknik bilgiye ihtiyacı yoktur. Blender, 3D modelleme veya AR entegrasyon bilgisi gerekmez.</p>' },
  { search: '>Öne Çıkanlar</h4>', replace: ' data-i18n="how_it_works.step_highlights">Öne Çıkanlar</h4>' },
  
  { search: '</svg> Ürün fotoğrafı yükleme</li>', replace: '</svg> <span data-i18n="how_it_works.step1_li1">Ürün fotoğrafı yükleme</span></li>' },
  { search: '</svg> Kategori seçimi</li>', replace: '</svg> <span data-i18n="how_it_works.step1_li2">Kategori seçimi</span></li>' },
  { search: '</svg> Ölçü / referans bilgi ekleme</li>', replace: '</svg> <span data-i18n="how_it_works.step1_li3">Ölçü / referans bilgi ekleme</span></li>' },
  { search: '</svg> Teknik bilgi gerektirmeyen başlangıç</li>', replace: '</svg> <span data-i18n="how_it_works.step1_li4">Teknik bilgi gerektirmeyen başlangıç</span></li>' },

  { search: '</div> AI ile 3D Model Üretimi Başlar</h2>', replace: '</div> <span data-i18n="how_it_works.step2_title">AI ile 3D Model Üretimi Başlar</span></h2>' },
  { search: '<p>Yüklenen görsel, IARONE’un 3D üretim altyapısına aktarılır. Sistem, ürünün formunu, hacmini ve temel geometrisini analiz ederek 3D model üretim sürecini başlatır.</p>',
    replace: '<p data-i18n="how_it_works.step2_desc1">Yüklenen görsel, IARONE’un 3D üretim altyapısına aktarılır. Sistem, ürünün formunu, hacmini ve temel geometrisini analiz ederek 3D model üretim sürecini başlatır.</p>' },
  { search: '<p style="margin-bottom:24px;">Bu aşamada amaç yalnızca bir 3D dosya oluşturmak değil; e-ticaret kullanımına uygun bir ürün varlığı üretmektir.</p>',
    replace: '<p style="margin-bottom:24px;" data-i18n="how_it_works.step2_desc2">Bu aşamada amaç yalnızca bir 3D dosya oluşturmak değil; e-ticaret kullanımına uygun bir ürün varlığı üretmektir.</p>' },
  
  { search: '</svg> Görselden 3D model üretimi</li>', replace: '</svg> <span data-i18n="how_it_works.step2_li1">Görselden 3D model üretimi</span></li>' },
  { search: '</svg> Ürün formunun çıkarılması</li>', replace: '</svg> <span data-i18n="how_it_works.step2_li2">Ürün formunun çıkarılması</span></li>' },
  { search: '</svg> Geometri ve temel yüzey yapısının oluşturulması</li>', replace: '</svg> <span data-i18n="how_it_works.step2_li3">Geometri ve temel yüzey yapısının oluşturulması</span></li>' },
  { search: '</svg> E-ticaret odaklı 3D üretim akışı</li>', replace: '</svg> <span data-i18n="how_it_works.step2_li4">E-ticaret odaklı 3D üretim akışı</span></li>' },

  { search: '</div> Model Web ve E-ticaret İçin Optimize Edilir</h2>', replace: '</div> <span data-i18n="how_it_works.step3_title">Model Web ve E-ticaret İçin Optimize Edilir</span></h2>' },
  { search: '<p>AI ile üretilen ham model doğrudan müşteriye verilmez. IARONE, modeli web sitelerinde daha hızlı açılabilecek, ürün sayfalarında daha rahat görüntülenebilecek ve mobil cihazlarda daha akıcı çalışabilecek hale getirir.</p>',
    replace: '<p data-i18n="how_it_works.step3_desc1">AI ile üretilen ham model doğrudan müşteriye verilmez. IARONE, modeli web sitelerinde daha hızlı açılabilecek, ürün sayfalarında daha rahat görüntülenebilecek ve mobil cihazlarda daha akıcı çalışabilecek hale getirir.</p>' },
  { search: '<p style="margin-bottom:24px;">Bu aşamada modelin dosya yapısı, geometri yoğunluğu, dokuları ve yayınlanabilirliği iyileştirilir.</p>',
    replace: '<p style="margin-bottom:24px;" data-i18n="how_it_works.step3_desc2">Bu aşamada modelin dosya yapısı, geometri yoğunluğu, dokuları ve yayınlanabilirliği iyileştirilir.</p>' },

  { search: '</svg> Daha hafif 3D model yapısı</li>', replace: '</svg> <span data-i18n="how_it_works.step3_li1">Daha hafif 3D model yapısı</span></li>' },
  { search: '</svg> Web uyumlu çıktı</li>', replace: '</svg> <span data-i18n="how_it_works.step3_li2">Web uyumlu çıktı</span></li>' },
  { search: '</svg> Mobil görüntüleme için optimizasyon</li>', replace: '</svg> <span data-i18n="how_it_works.step3_li3">Mobil görüntüleme için optimizasyon</span></li>' },
  { search: '</svg> Ürün sayfasına entegre edilebilir 3D varlık</li>', replace: '</svg> <span data-i18n="how_it_works.step3_li4">Ürün sayfasına entegre edilebilir 3D varlık</span></li>' },

  { search: '</div> Kalite Kontrolünden Geçer</h2>', replace: '</div> <span data-i18n="how_it_works.step4_title">Kalite Kontrolünden Geçer</span></h2>' },
  { search: '<p>IARONE’un farkı, üretilen modeli doğrudan yayınlamaması ve önce kalite kontrolünden geçirmesidir.</p>',
    replace: '<p data-i18n="how_it_works.step4_desc1">IARONE’un farkı, üretilen modeli doğrudan yayınlamaması ve önce kalite kontrolünden geçirmesidir.</p>' },
  { search: '<p style="margin-bottom:24px;">Sistem; modelin açılıp açılmadığını, dokuların doğru gelip gelmediğini, ürünün zemine oturup oturmadığını, dosyanın web ve AR için uygun olup olmadığını kontrol eder. Uygun olmayan çıktılar doğrudan publish edilmez.</p>',
    replace: '<p style="margin-bottom:24px;" data-i18n="how_it_works.step4_desc2">Sistem; modelin açılıp açılmadığını, dokuların doğru gelip gelmediğini, ürünün zemine oturup oturmadığını, dosyanın web ve AR için uygun olup olmadığını kontrol eder. Uygun olmayan çıktılar doğrudan publish edilmez.</p>' },

  { search: '</svg> Model açılabilirlik kontrolü</li>', replace: '</svg> <span data-i18n="how_it_works.step4_li1">Model açılabilirlik kontrolü</span></li>' },
  { search: '</svg> Doku ve materyal kontrolü</li>', replace: '</svg> <span data-i18n="how_it_works.step4_li2">Doku ve materyal kontrolü</span></li>' },
  { search: '</svg> Ölçek ve hizalama kontrolü</li>', replace: '</svg> <span data-i18n="how_it_works.step4_li3">Ölçek ve hizalama kontrolü</span></li>' },
  { search: '</svg> Web / AR uygunluk kontrolü</li>', replace: '</svg> <span data-i18n="how_it_works.step4_li4">Web / AR uygunluk kontrolü</span></li>' },
  { search: '</svg> Publish öncesi kalite güveni</li>', replace: '</svg> <span data-i18n="how_it_works.step4_li5">Publish öncesi kalite güveni</span></li>' },

  { search: '</div> Publish Paketi Oluşturulur</h2>', replace: '</div> <span data-i18n="how_it_works.step5_title">Publish Paketi Oluşturulur</span></h2>' },
  { search: '<p>Kalite kontrolü geçen ürün için yayınlanabilir 3D/AR paketi hazırlanır. Bu paket; GLB, USDZ, poster, thumbnail, metadata ve web entegrasyonu için gerekli çıktıları içerebilir.</p>',
    replace: '<p data-i18n="how_it_works.step5_desc1">Kalite kontrolü geçen ürün için yayınlanabilir 3D/AR paketi hazırlanır. Bu paket; GLB, USDZ, poster, thumbnail, metadata ve web entegrasyonu için gerekli çıktıları içerebilir.</p>' },
  { search: '<p style="margin-bottom:24px;">Marka, ürünü kendi web sitesinde, ürün sayfasında veya paylaşılabilir bir IARONE sayfasında kullanabilir.</p>',
    replace: '<p style="margin-bottom:24px;" data-i18n="how_it_works.step5_desc2">Marka, ürünü kendi web sitesinde, ürün sayfasında veya paylaşılabilir bir IARONE sayfasında kullanabilir.</p>' },

  { search: '</svg> GLB / USDZ çıktıları</li>', replace: '</svg> <span data-i18n="how_it_works.step5_li1">GLB / USDZ çıktıları</span></li>' },
  { search: '</svg> Poster ve thumbnail üretimi</li>', replace: '</svg> <span data-i18n="how_it_works.step5_li2">Poster ve thumbnail üretimi</span></li>' },
  { search: '</svg> 360° ürün görüntüleme</li>', replace: '</svg> <span data-i18n="how_it_works.step5_li3">360° ürün görüntüleme</span></li>' },
  { search: '</svg> AR deneyimine hazırlık</li>', replace: '</svg> <span data-i18n="how_it_works.step5_li4">AR deneyimine hazırlık</span></li>' },
  { search: '</svg> Web sitesine eklenebilir publish paketi</li>', replace: '</svg> <span data-i18n="how_it_works.step5_li5">Web sitesine eklenebilir publish paketi</span></li>' },

  { search: '>Arka Planda Ne Olur?</h2>', replace: ' data-i18n="how_it_works.bg_title">Arka Planda Ne Olur?</h2>' },
  { search: '>Kullanıcı yalnızca ürününü yükler ve sonucu bekler. IARONE ise arka planda üretim sürecini kontrollü bir altyapı üzerinden yönetir.</p>',
    replace: ' data-i18n="how_it_works.bg_desc1">Kullanıcı yalnızca ürününü yükler ve sonucu bekler. IARONE ise arka planda üretim sürecini kontrollü bir altyapı üzerinden yönetir.</p>' },
  { search: '>Sistem; API, üretim kuyruğu, AI generation engine, kalite kontrol, asset registry ve publish akışından oluşur. Böylece süreç tek kişiye bağlı manuel bir hizmet gibi değil, modüler ve ölçeklenebilir bir teknoloji altyapısı gibi çalışır.</p>',
    replace: ' data-i18n="how_it_works.bg_desc2">Sistem; API, üretim kuyruğu, AI generation engine, kalite kontrol, asset registry ve publish akışından oluşur. Böylece süreç tek kişiye bağlı manuel bir hizmet gibi değil, modüler ve ölçeklenebilir bir teknoloji altyapısı gibi çalışır.</p>' },
  
  { search: '>Arka Plandaki Sistem Akışı</h4>', replace: ' data-i18n="how_it_works.bg_flow_title">Arka Plandaki Sistem Akışı</h4>' },
  { search: '>1. Kullanıcı ürün fotoğrafını yükler</span>', replace: ' data-i18n="how_it_works.bg_flow_1">1. Kullanıcı ürün fotoğrafını yükler</span>' },
  { search: '>2. API yeni üretim isteği oluşturur</span>', replace: ' data-i18n="how_it_works.bg_flow_2">2. API yeni üretim isteği oluşturur</span>' },
  { search: '>3. İşlem sıraya alınır (Queue)</span>', replace: ' data-i18n="how_it_works.bg_flow_3">3. İşlem sıraya alınır (Queue)</span>' },
  { search: '>4. Generation engine modeli üretir</span>', replace: ' data-i18n="how_it_works.bg_flow_4">4. Generation engine modeli üretir</span>' },
  { search: '>5. Ham model optimize edilir</span>', replace: ' data-i18n="how_it_works.bg_flow_5">5. Ham model optimize edilir</span>' },
  { search: '>6. Kalite kontrol (QA) yapılır</span>', replace: ' data-i18n="how_it_works.bg_flow_6">6. Kalite kontrol (QA) yapılır</span>' },
  { search: '>7. Asset paketi hazırlanır</span>', replace: ' data-i18n="how_it_works.bg_flow_7">7. Asset paketi hazırlanır</span>' },
  { search: '>8. Kullanıcı panelinde sonuç gösterilir</span>', replace: ' data-i18n="how_it_works.bg_flow_8">8. Kullanıcı panelinde sonuç gösterilir</span>' },
  { search: '>9. Publish linki veya embed çıktısı oluşturulur</span>', replace: ' data-i18n="how_it_works.bg_flow_9">9. Publish linki veya embed çıktısı oluşturulur</span>' },

  { search: '>Kısa Özet</span>', replace: ' data-i18n="how_it_works.summary_badge">Kısa Özet</span>' },
  { search: '>IARONE, ürün fotoğrafını alır; AI ile 3D modele dönüştürür, modeli web ve AR için optimize eder, kalite kontrolünden geçirir ve markanın e-ticaret sitesinde kullanabileceği yayınlanabilir bir 3D/AR pakete çevirir.</p>',
    replace: ' data-i18n="how_it_works.summary_desc">IARONE, ürün fotoğrafını alır; AI ile 3D modele dönüştürür, modeli web ve AR için optimize eder, kalite kontrolünden geçirir ve markanın e-ticaret sitesinde kullanabileceği yayınlanabilir bir 3D/AR pakete çevirir.</p>' },
  { search: '<span>Fotoğraf yükle</span>', replace: '<span data-i18n="how_it_works.sum_1">Fotoğraf yükle</span>' },
  { search: '<span>3D üret</span>', replace: '<span data-i18n="how_it_works.sum_2">3D üret</span>' },
  { search: '<span>Optimize et</span>', replace: '<span data-i18n="how_it_works.sum_3">Optimize et</span>' },
  { search: '<span>Kaliteyi kontrol et</span>', replace: '<span data-i18n="how_it_works.sum_4">Kaliteyi kontrol et</span>' },
  { search: '<span>Web & AR için yayınla</span>', replace: '<span data-i18n="how_it_works.sum_5">Web & AR için yayınla</span>' },
  { search: '>Sistemi Ücretsiz Deneyin</a>', replace: ' data-i18n="how_it_works.sum_cta">Sistemi Ücretsiz Deneyin</a>' }
];

hwReps.forEach(rep => { hw = hw.replace(rep.search, rep.replace); });
fs.writeFileSync('nasil-calisir.html', hw, 'utf8');

let mk = fs.readFileSync('market.html', 'utf8');
const mkReps = [
  { search: '>Sektörel Çözümler</span>', replace: ' data-i18n="market.badge_sector">Sektörel Çözümler</span>' },
  { search: '>Çözümler</h1>', replace: ' data-i18n="market.hero_title">Çözümler</h1>' },
  { search: '>IARONE, farklı sektörlerdeki e-ticaret markalarının ürünlerini yalnızca fotoğrafla sergilemek yerine, müşteriye daha anlaşılır, etkileşimli ve güven veren 3D/AR deneyimleriyle sunmasını sağlar.</p>',
    replace: ' data-i18n="market.hero_desc">IARONE, farklı sektörlerdeki e-ticaret markalarının ürünlerini yalnızca fotoğrafla sergilemek yerine, müşteriye daha anlaşılır, etkileşimli ve güven veren 3D/AR deneyimleriyle sunmasını sağlar.</p>' },
  
  { search: '<h3>Mobilya ve Dekorasyon</h3>', replace: '<h3 data-i18n="market.sec1_title">Mobilya ve Dekorasyon</h3>' },
  { search: '<p>Mobilya ürünlerinde müşterinin kararını en çok etkileyen unsurlar; boyut, hacim, renk, materyal ve ürünün ortam içindeki duruşudur.</p>', replace: '<p data-i18n="market.sec1_desc1">Mobilya ürünlerinde müşterinin kararını en çok etkileyen unsurlar; boyut, hacim, renk, materyal ve ürünün ortam içindeki duruşudur.</p>' },
  { search: '<p>IARONE, koltuk, sandalye, masa, kitaplık, sehpa, dolap ve dekoratif ürünlerin 3D/AR deneyimine dönüştürülmesini sağlar. Böylece müşteri ürünü yalnızca fotoğraftan görmekle kalmaz; 360° inceleyebilir, detaylarını görebilir ve kendi yaşam alanında nasıl duracağını daha iyi hayal edebilir.</p>', replace: '<p data-i18n="market.sec1_desc2">IARONE, koltuk, sandalye, masa, kitaplık, sehpa, dolap ve dekoratif ürünlerin 3D/AR deneyimine dönüştürülmesini sağlar. Böylece müşteri ürünü yalnızca fotoğraftan görmekle kalmaz; 360° inceleyebilir, detaylarını görebilir ve kendi yaşam alanında nasıl duracağını daha iyi hayal edebilir.</p>' },
  { search: '</svg> Koltuk, sandalye, masa ve sehpa ürünleri</li>', replace: '</svg> <span data-i18n="market.sec1_li1">Koltuk, sandalye, masa ve sehpa ürünleri</span></li>' },
  { search: '</svg> Kitaplık, dolap ve raf sistemleri</li>', replace: '</svg> <span data-i18n="market.sec1_li2">Kitaplık, dolap ve raf sistemleri</span></li>' },
  { search: '</svg> Dekoratif objeler ve ev aksesuarları</li>', replace: '</svg> <span data-i18n="market.sec1_li3">Dekoratif objeler ve ev aksesuarları</span></li>' },
  { search: '</svg> AR ile ortamda ürün yerleştirme</li>', replace: '</svg> <span data-i18n="market.sec1_li4">AR ile ortamda ürün yerleştirme</span></li>' },
  { search: '</svg> Ürün sayfasında 360° görüntüleme</li>', replace: '</svg> <span data-i18n="market.sec1_li5">Ürün sayfasında 360° görüntüleme</span></li>' },

  { search: '<h3>Ayakkabı ve Moda Ürünleri</h3>', replace: '<h3 data-i18n="market.sec2_title">Ayakkabı ve Moda Ürünleri</h3>' },
  { search: '<p>Ayakkabı ve moda ürünlerinde müşterinin ürünü farklı açılardan görmesi, detayları incelemesi ve ürün formunu daha iyi anlaması satın alma kararını güçlendirir.</p>', replace: '<p data-i18n="market.sec2_desc1">Ayakkabı ve moda ürünlerinde müşterinin ürünü farklı açılardan görmesi, detayları incelemesi ve ürün formunu daha iyi anlaması satın alma kararını güçlendirir.</p>' },
  { search: '<p>IARONE, ayakkabı, çanta, aksesuar ve premium moda ürünlerini 3D görüntülemeye uygun hale getirerek markaların ürün sayfalarında daha etkileşimli bir deneyim sunmasına yardımcı olur.</p>', replace: '<p data-i18n="market.sec2_desc2">IARONE, ayakkabı, çanta, aksesuar ve premium moda ürünlerini 3D görüntülemeye uygun hale getirerek markaların ürün sayfalarında daha etkileşimli bir deneyim sunmasına yardımcı olur.</p>' },
  { search: '</svg> Spor ayakkabı ve günlük ayakkabılar</li>', replace: '</svg> <span data-i18n="market.sec2_li1">Spor ayakkabı ve günlük ayakkabılar</span></li>' },
  { search: '</svg> Çanta ve deri aksesuarlar</li>', replace: '</svg> <span data-i18n="market.sec2_li2">Çanta ve deri aksesuarlar</span></li>' },
  { search: '</svg> Premium moda ürünleri</li>', replace: '</svg> <span data-i18n="market.sec2_li3">Premium moda ürünleri</span></li>' },
  { search: '</svg> Ürün detaylarının 360° gösterimi</li>', replace: '</svg> <span data-i18n="market.sec2_li4">Ürün detaylarının 360° gösterimi</span></li>' },
  { search: '</svg> Koleksiyon bazlı ürün deneyimleri</li>', replace: '</svg> <span data-i18n="market.sec2_li5">Koleksiyon bazlı ürün deneyimleri</span></li>' },

  { search: '<h3>Saat ve Mücevher</h3>', replace: '<h3 data-i18n="market.sec3_title">Saat ve Mücevher</h3>' },
  { search: '<p>Saat ve mücevher gibi premium ürünlerde detay, malzeme hissi ve güven çok önemlidir. Müşteri ürünü ne kadar yakından ve net incelerse satın alma kararı o kadar güçlenir.</p>', replace: '<p data-i18n="market.sec3_desc1">Saat ve mücevher gibi premium ürünlerde detay, malzeme hissi ve güven çok önemlidir. Müşteri ürünü ne kadar yakından ve net incelerse satın alma kararı o kadar güçlenir.</p>' },
  { search: '<p>IARONE, saat, yüzük, kolye, bileklik ve benzeri ürünlerin dijital ortamda daha etkileyici şekilde sunulmasını sağlar. Ürünler 3D olarak incelenebilir, farklı açılardan görüntülenebilir ve web üzerinde daha premium bir deneyimle sergilenebilir.</p>', replace: '<p data-i18n="market.sec3_desc2">IARONE, saat, yüzük, kolye, bileklik ve benzeri ürünlerin dijital ortamda daha etkileyici şekilde sunulmasını sağlar. Ürünler 3D olarak incelenebilir, farklı açılardan görüntülenebilir ve web üzerinde daha premium bir deneyimle sergilenebilir.</p>' },
  { search: '</svg> Saat modelleri</li>', replace: '</svg> <span data-i18n="market.sec3_li1">Saat modelleri</span></li>' },
  { search: '</svg> Yüzük, kolye ve bileklikler</li>', replace: '</svg> <span data-i18n="market.sec3_li2">Yüzük, kolye ve bileklikler</span></li>' },
  { search: '</svg> Mücevher koleksiyonları</li>', replace: '</svg> <span data-i18n="market.sec3_li3">Mücevher koleksiyonları</span></li>' },
  { search: '</svg> Premium ürün detay gösterimi</li>', replace: '</svg> <span data-i18n="market.sec3_li4">Premium ürün detay gösterimi</span></li>' },
  { search: '</svg> Web üzerinde yüksek algılı ürün sunumu</li>', replace: '</svg> <span data-i18n="market.sec3_li5">Web üzerinde yüksek algılı ürün sunumu</span></li>' },

  { search: '<h3>Aydınlatma ve Ev Aksesuarları</h3>', replace: '<h3 data-i18n="market.sec4_title">Aydınlatma ve Ev Aksesuarları</h3>' },
  { search: '<p>Lamba, avize ve dekoratif aydınlatma ürünlerinde ürünün formu, boyutu ve mekân içindeki duruşu müşterinin kararını doğrudan etkiler.</p>', replace: '<p data-i18n="market.sec4_desc1">Lamba, avize ve dekoratif aydınlatma ürünlerinde ürünün formu, boyutu ve mekân içindeki duruşu müşterinin kararını doğrudan etkiler.</p>' },
  { search: '<p>IARONE, aydınlatma ürünlerinin 3D ve AR deneyimlerine dönüştürülmesini sağlayarak müşterinin ürünü daha iyi anlamasına yardımcı olur. Böylece kullanıcı, ürünün yalnızca görselini değil, mekânla olan ilişkisini de değerlendirebilir.</p>', replace: '<p data-i18n="market.sec4_desc2">IARONE, aydınlatma ürünlerinin 3D ve AR deneyimlerine dönüştürülmesini sağlayarak müşterinin ürünü daha iyi anlamasına yardımcı olur. Böylece kullanıcı, ürünün yalnızca görselini değil, mekânla olan ilişkisini de değerlendirebilir.</p>' },
  { search: '</svg> Masa lambaları</li>', replace: '</svg> <span data-i18n="market.sec4_li1">Masa lambaları</span></li>' },
  { search: '</svg> Avize ve sarkıt aydınlatmalar</li>', replace: '</svg> <span data-i18n="market.sec4_li2">Avize ve sarkıt aydınlatmalar</span></li>' },
  { search: '</svg> Dekoratif ışık ürünleri</li>', replace: '</svg> <span data-i18n="market.sec4_li3">Dekoratif ışık ürünleri</span></li>' },
  { search: '</svg> Ev ve ofis aksesuarları</li>', replace: '</svg> <span data-i18n="market.sec4_li4">Ev ve ofis aksesuarları</span></li>' },
  { search: '</svg> AR ile mekân içinde görüntüleme</li>', replace: '</svg> <span data-i18n="market.sec4_li5">AR ile mekân içinde görüntüleme</span></li>' },

  { search: '<h3>Elektronik Aksesuarlar ve Teknoloji Ürünleri</h3>', replace: '<h3 data-i18n="market.sec5_title">Elektronik Aksesuarlar ve Teknoloji Ürünleri</h3>' },
  { search: '<p>Teknoloji ürünlerinde kullanıcılar ürünün tasarımını, bağlantı noktalarını, boyutunu ve kullanım detaylarını net şekilde görmek ister.</p>', replace: '<p data-i18n="market.sec5_desc1">Teknoloji ürünlerinde kullanıcılar ürünün tasarımını, bağlantı noktalarını, boyutunu ve kullanım detaylarını net şekilde görmek ister.</p>' },
  { search: '<p>IARONE, kulaklık, hoparlör, telefon aksesuarları, küçük elektronik ürünler ve teknoloji ekipmanları için 3D ürün deneyimi sunulmasını sağlar. Bu yapı, ürünün teknik ve fiziksel detaylarını daha anlaşılır hale getirir.</p>', replace: '<p data-i18n="market.sec5_desc2">IARONE, kulaklık, hoparlör, telefon aksesuarları, küçük elektronik ürünler ve teknoloji ekipmanları için 3D ürün deneyimi sunulmasını sağlar. Bu yapı, ürünün teknik ve fiziksel detaylarını daha anlaşılır hale getirir.</p>' },
  { search: '</svg> Kulaklık, hoparlör ve küçük elektronik ürünler</li>', replace: '</svg> <span data-i18n="market.sec5_li1">Kulaklık, hoparlör ve küçük elektronik ürünler</span></li>' },
  { search: '</svg> Telefon ve bilgisayar aksesuarları</li>', replace: '</svg> <span data-i18n="market.sec5_li2">Telefon ve bilgisayar aksesuarları</span></li>' },
  { search: '</svg> Akıllı cihaz ekipmanları</li>', replace: '</svg> <span data-i18n="market.sec5_li3">Akıllı cihaz ekipmanları</span></li>' },
  { search: '</svg> Ürün detaylarının etkileşimli gösterimi</li>', replace: '</svg> <span data-i18n="market.sec5_li4">Ürün detaylarının etkileşimli gösterimi</span></li>' },
  { search: '</svg> Web uyumlu 3D ürün sunumu</li>', replace: '</svg> <span data-i18n="market.sec5_li5">Web uyumlu 3D ürün sunumu</span></li>' },

  { search: '<h3>Kozmetik, Ambalaj ve Premium Ürünler</h3>', replace: '<h3 data-i18n="market.sec6_title">Kozmetik, Ambalaj ve Premium Ürünler</h3>' },
  { search: '<p>Ambalaj tasarımı güçlü olan ürünlerde 3D sunum, ürün algısını yükseltir ve markanın premium görünmesini sağlar.</p>', replace: '<p data-i18n="market.sec6_desc1">Ambalaj tasarımı güçlü olan ürünlerde 3D sunum, ürün algısını yükseltir ve markanın premium görünmesini sağlar.</p>' },
  { search: '<p>IARONE, parfüm şişesi, kozmetik ambalajı, kutulu ürünler ve özel tasarım paketlerin 3D olarak sergilenmesine yardımcı olur. Böylece marka, ürününü klasik fotoğraf sunumunun ötesine taşıyarak daha dikkat çekici bir deneyim oluşturabilir.</p>', replace: '<p data-i18n="market.sec6_desc2">IARONE, parfüm şişesi, kozmetik ambalajı, kutulu ürünler ve özel tasarım paketlerin 3D olarak sergilenmesine yardımcı olur. Böylece marka, ürününü klasik fotoğraf sunumunun ötesine taşıyarak daha dikkat çekici bir deneyim oluşturabilir.</p>' },
  { search: '</svg> Parfüm ve kozmetik ambalajları</li>', replace: '</svg> <span data-i18n="market.sec6_li1">Parfüm ve kozmetik ambalajları</span></li>' },
  { search: '</svg> Premium kutulu ürünler</li>', replace: '</svg> <span data-i18n="market.sec6_li2">Premium kutulu ürünler</span></li>' },
  { search: '</svg> Hediye setleri</li>', replace: '</svg> <span data-i18n="market.sec6_li3">Hediye setleri</span></li>' },
  { search: '</svg> Ürün lansman görselleri</li>', replace: '</svg> <span data-i18n="market.sec6_li4">Ürün lansman görselleri</span></li>' },
  { search: '</svg> Etkileşimli ürün tanıtımları</li>', replace: '</svg> <span data-i18n="market.sec6_li5">Etkileşimli ürün tanıtımları</span></li>' },

  { search: '>Farklı bir sektör mü?</h2>', replace: ' data-i18n="market.sec7_title">Farklı bir sektör mü?</h2>' },
  { search: '>Eğer ürün grubunuz bu listede yoksa, markanıza özel 3D modelleme olanakları hakkında konuşabiliriz.</p>', replace: ' data-i18n="market.sec7_desc">Eğer ürün grubunuz bu listede yoksa, markanıza özel 3D modelleme olanakları hakkında konuşabiliriz.</p>' },
  { search: '>Bizimle İletişime Geçin</a>', replace: ' data-i18n="market.sec7_cta">Bizimle İletişime Geçin</a>' }
];

mkReps.forEach(rep => { mk = mk.replace(rep.search, rep.replace); });
fs.writeFileSync('market.html', mk, 'utf8');

console.log("Pages updated.");
