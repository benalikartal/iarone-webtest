const fs = require('fs');

// 1. Fix i18n.js
let i18n = fs.readFileSync('i18n.js', 'utf8');

// We know my `market: {` has `badge_sector:` right after it.
// Replace `market: {\n      badge_sector:` with `solutions: {\n      badge_sector:`
// We should use regex to handle any whitespace.
i18n = i18n.replace(/market:\s*\{\s*badge_sector:/g, 'solutions: {\n      badge_sector:');
// Wait, `badge_sector` is at the beginning of the object?
// Let's just do a more flexible regex:
i18n = i18n.replace(/market:\s*\{([\s\S]*?badge_sector:)/g, 'solutions: {$1');

// Also need to rename the key in my latest fix_final.cjs where I added page_title:
i18n = i18n.replace(/market:\s*\{\s*page_title:/g, 'solutions: {\n      page_title:');
// Actually, earlier I added page_title to `market: {` via replace, which might have added another `market: {` block, or modified one. Let's check.

fs.writeFileSync('i18n.js', i18n, 'utf8');

// 2. Fix market.html
let html = fs.readFileSync('market.html', 'utf8');
// The tags I added are like `data-i18n="market.sec1_title"`.
// The ONLY valid `market.` that existed before was `nav.market` and `footer.f_market`, which don't start with `market.`.
// Wait, what if there is `data-i18n="market.badge"`? That was the OLD one, but it was on index.html. 
// market.html didn't have ANY data-i18n before I touched it except in navbar/footer.
// Let's replace `data-i18n="market.` with `data-i18n="solutions.`
html = html.replace(/data-i18n="market\./g, 'data-i18n="solutions.');
fs.writeFileSync('market.html', html, 'utf8');

console.log('Fixed overlapping market keys!');
