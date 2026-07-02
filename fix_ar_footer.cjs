const fs = require('fs');
let i18n = fs.readFileSync('i18n.js', 'utf8');

const arFooterReplacements = {
  "tagline: 'Sales-ready 3D and AR models from product photos.',": "tagline: 'نماذج 3D و AR جاهزة للبيع من صور المنتجات.',",
  "f_api: 'API Docs',": "f_api: 'مستندات API',",
  "c_about: 'About',": "c_about: 'حول',",
  "c_blog: 'Blog',": "c_blog: 'مدونة',",
  "c_career: 'Careers',": "c_career: 'الوظائف',",
  "l_terms: 'Terms of Service',": "l_terms: 'شروط الخدمة',",
  "copy: '© 2026 Iarone. All rights reserved.'": "copy: '© 2026 Iarone. جميع الحقوق محفوظة.'"
};

for (const [eng, ar] of Object.entries(arFooterReplacements)) {
  const safeEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const arStartIndex = i18n.indexOf('ar: {');
  if (arStartIndex > -1) {
    const beforeAr = i18n.substring(0, arStartIndex);
    let afterAr = i18n.substring(arStartIndex);
    afterAr = afterAr.replace(new RegExp(safeEng, 'g'), ar);
    i18n = beforeAr + afterAr;
  }
}

fs.writeFileSync('i18n.js', i18n, 'utf8');
console.log("Updated English strings to Arabic in footer block.");
