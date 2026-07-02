const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');

const arStart = content.indexOf('ar: {');
const arEnd = content.length; // until the end of the file
const arContent = content.substring(arStart, arEnd);

// Find lines with english characters
const lines = arContent.split('\n');
const englishLines = lines.filter(l => /[a-zA-Z]{5,}/.test(l) && !l.includes('class=') && !l.includes('<svg') && !l.includes('style='));
console.log(englishLines.slice(0, 50));
