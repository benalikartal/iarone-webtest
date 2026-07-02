const fs = require('fs');
let i18n = fs.readFileSync('i18n.js', 'utf8');

const arHomeReplacements = {
  "usp_text:    'Know exactly if your model is usable. Iarone analyzes every generated model, checks its mobile AR compatibility, and clearly identifies any required optimizations.',": 
  "usp_text:    'اعرف بالضبط ما إذا كان نموذجك قابلاً للاستخدام. تحلل Iarone كل نموذج تم إنشاؤه، وتتحقق من توافقه مع الواقع المعزز للأجهزة المحمولة، وتحدد بوضوح أي تحسينات مطلوبة.',",
  
  "steps_sub:      'From a single image to a validated AR model.',": 
  "steps_sub:      'من صورة واحدة إلى نموذج واقع معزز معتمد.',",
  
  "step1_desc:     'Upload a product image or your existing 3D file.',": 
  "step1_desc:     'قم بتحميل صورة منتج أو ملف 3D الحالي الخاص بك.',",
  
  "step2_desc:     'Iarone analyzes the asset and optimizes structure.',": 
  "step2_desc:     'تقوم Iarone بتحليل الأصل وتحسين الهيكل.',",
  
  "step3_desc:     'A web and AR compatible model is generated.',": 
  "step3_desc:     'يتم إنشاء نموذج متوافق مع الويب والواقع المعزز.',",
  
  "step4_desc:     'Links, embeds, and download assets are ready to use.',": 
  "step4_desc:     'الروابط والتضمين وتنزيل الأصول جاهزة للاستخدام.',",
  
  "uc_sub:      'Better product perception, AR size confidence, and sales-ready integration.',": 
  "uc_sub:      'إدراك أفضل للمنتج، ثقة في حجم الواقع المعزز، وتكامل جاهز للبيع.',",
  
  "sr_sub:      'Public model links, embed iframes, GLB, USDZ, and AR fallbacks—all in one place.',": 
  "sr_sub:      'روابط النموذج العامة، إطارات التضمين، GLB، USDZ، وبدائل الواقع المعزز - كلها في مكان واحد.',",
  
  "market_sub: 'Iarone helps brands present their products more interactively across web, mobile, and AR environments.',": 
  "market_sub: 'تساعد Iarone العلامات التجارية على تقديم منتجاتها بشكل أكثر تفاعلية عبر بيئات الويب والجوال والواقع المعزز.',",
  
  "final_cta_title: 'Start publishing your products in 3D and AR today.',": 
  "final_cta_title: 'ابدأ بنشر منتجاتك بتقنية 3D والواقع المعزز اليوم.',"
};

for (const [eng, ar] of Object.entries(arHomeReplacements)) {
  const safeEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // We only replace the occurrences that happen AFTER 'ar: {'
  const arStartIndex = i18n.indexOf('ar: {');
  if (arStartIndex > -1) {
    const beforeAr = i18n.substring(0, arStartIndex);
    let afterAr = i18n.substring(arStartIndex);
    afterAr = afterAr.replace(new RegExp(safeEng, 'g'), ar);
    i18n = beforeAr + afterAr;
  }
}

// Let's also fix pricing demo_sub for Arabic which we know is English
i18n = i18n.replace(/demo_sub:\s*'Contact our expert team to bring your product catalog into 3D\/AR with Iarone\.',/g, (match, offset) => {
  if (offset > i18n.indexOf('ar: {')) {
    return "demo_sub:   'اتصل بفريق الخبراء لدينا لنقل كتالوج منتجاتك إلى ثلاثي الأبعاد / واقع معزز مع Iarone.',";
  }
  return match;
});

fs.writeFileSync('i18n.js', i18n, 'utf8');
console.log("Updated English strings to Arabic in ar: { ... } block.");
