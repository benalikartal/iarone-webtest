const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<span class="badge" data-i18n="pricing\.demo_badge"/g, '<span class="badge"');
html = html.replace(/<h2 class="gt-ac"([^>]*)data-i18n="home\.demo_h2"/g, '<h2 class="gt-ac"$1');
html = html.replace(/<p style="([^"]*)" data-i18n="pricing\.demo_sub">/g, '<p style="$1">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed duplicate data-i18n tags in index.html');
