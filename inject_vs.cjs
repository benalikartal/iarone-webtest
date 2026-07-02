const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const vsHtml = `
<section class="iarone-vs-section" style="padding: 0 20px; max-width: 1200px; margin: 40px auto 100px auto; text-align: center;">
  <img src="iarone-vs.png" alt="Iarone vs Traditional 3D Production" style="width: 100%; height: auto; border-radius: 24px; box-shadow: 0 32px 64px rgba(15,23,42,0.15); border: 1px solid rgba(0,0,0,0.05);" loading="lazy" />
</section>
`;

// Insert the new section immediately after the future-vision section
html = html.replace('</section>\n\n<!-- SEGMENT TABS -->', '</section>\n' + vsHtml + '\n<!-- SEGMENT TABS -->');
html = html.replace('</section>\n<!-- SEGMENT TABS -->', '</section>\n' + vsHtml + '\n<!-- SEGMENT TABS -->');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added iarone-vs.png section to index.html');
