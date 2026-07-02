const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix footer description
html = html.replace(
  /<p([^>]*)>E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu\.<\/p>/g,
  '<p$1 data-i18n="footer.f_desc">E-ticaret ürünlerini 3D ve AR deneyimlerine dönüştüren yayın platformu.</p>'
);

// Fix demo cta in footer
html = html.replace(
  /<a href="#demo">Demo Talep Et<\/a>/g,
  '<a href="#demo" data-i18n="footer.demo_cta">Demo Talep Et</a>'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html footer tags');
