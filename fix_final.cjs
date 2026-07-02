const fs = require('fs');

let mk = fs.readFileSync('market.html', 'utf8');
mk = mk.replace(
  /<h2([^>]*)>\s*Ürünlerinizi klasik fotoğraf sunumunun ötesine taşıyın\.\s*<\/h2>/g,
  '<h2$1 data-i18n="market.cta_title">\n        Ürünlerinizi klasik fotoğraf sunumunun ötesine taşıyın.\n      </h2>'
);

mk = mk.replace(
  /<p([^>]*)>E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu\.<\/p>/g,
  '<p$1 data-i18n="footer.f_desc">E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu.</p>'
);

mk = mk.replace(
  /<a href="#demo">Demo Talep Et<\/a>/g,
  '<a href="#demo" data-i18n="footer.demo_cta">Demo Talep Et</a>'
);

// Fix title tag
mk = mk.replace(
  /<title>Iarone — Solutions for 3D & AR Commerce<\/title>/g,
  '<title data-i18n="market.page_title">Iarone — Çözümler | 3D & AR Commerce</title>'
);

fs.writeFileSync('market.html', mk, 'utf8');

let hw = fs.readFileSync('nasil-calisir.html', 'utf8');
hw = hw.replace(
  /<p([^>]*)>E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu\.<\/p>/g,
  '<p$1 data-i18n="footer.f_desc">E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu.</p>'
);

hw = hw.replace(
  /<a href="#demo">Demo Talep Et<\/a>/g,
  '<a href="#demo" data-i18n="footer.demo_cta">Demo Talep Et</a>'
);

hw = hw.replace(
  /<title>Iarone — How It Works<\/title>/g,
  '<title data-i18n="how_it_works.page_title">Iarone — Nasıl Çalışır?</title>'
);
fs.writeFileSync('nasil-calisir.html', hw, 'utf8');

// Inject into i18n.js
let i18n = fs.readFileSync('i18n.js', 'utf8');
const t = {
  tr: {
    market: {
      page_title: "Iarone — Çözümler | 3D & AR Commerce"
    },
    how_it_works: {
      page_title: "Iarone — Nasıl Çalışır?"
    },
    footer: {
      f_desc: "E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu.",
      demo_cta: "Demo Talep Et"
    }
  },
  en: {
    market: {
      page_title: "Iarone — Solutions | 3D & AR Commerce"
    },
    how_it_works: {
      page_title: "Iarone — How It Works?"
    },
    footer: {
      f_desc: "A publishing platform that transforms e-commerce products into 3D and AR experiences.",
      demo_cta: "Request a Demo"
    }
  },
  ar: {
    market: {
      page_title: "Iarone — حلول | 3D & AR Commerce"
    },
    how_it_works: {
      page_title: "Iarone — كيف يعمل؟"
    },
    footer: {
      f_desc: "منصة نشر تحول منتجات التجارة الإلكترونية إلى تجارب ثلاثية الأبعاد والواقع المعزز.",
      demo_cta: "طلب عرض توضيحي"
    }
  }
};

for (const lang of ['tr', 'en', 'ar']) {
  const m = t[lang].market;
  for (const key in m) {
    const val = m[key].replace(/"/g, '\\"');
    const regex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?market:\\s*\\{)`);
    i18n = i18n.replace(regex, `$1\n      ${key}: "${val}",`);
  }
  
  const hwObj = t[lang].how_it_works;
  for (const key in hwObj) {
    const val = hwObj[key].replace(/"/g, '\\"');
    const regex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?how_it_works:\\s*\\{)`);
    i18n = i18n.replace(regex, `$1\n      ${key}: "${val}",`);
  }
  
  const foot = t[lang].footer;
  for (const key in foot) {
    const val = foot[key].replace(/"/g, '\\"');
    const regex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?footer:\\s*\\{)`);
    i18n = i18n.replace(regex, `$1\n      ${key}: "${val}",`);
  }
}
fs.writeFileSync('i18n.js', i18n, 'utf8');

console.log('Fixed final missing keys');
