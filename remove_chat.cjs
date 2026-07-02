const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The floating widgets block is roughly:
// <div class="floating-widgets">
// ...
// </div>
// Let's just remove it using regex
html = html.replace(/<div class="floating-widgets">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
// Wait, the inner structure is:
// <div class="floating-widgets">
//   <div class="ai-widget" id="ai-widget">
//     <div class="ai-chat-window" id="ai-chat-window">
//       ...
//     </div>
//     <button class="ai-toggle-btn" id="ai-toggle-btn" aria-label="Asistanı Aç">
//       ...
//     </button>
//   </div>
// </div>

// Let's do a more robust string manipulation:
const startIdx = html.indexOf('<div class="floating-widgets">');
if (startIdx !== -1) {
  // we know it ends right before <script>
  const scriptIdx = html.indexOf('<script>', startIdx);
  if (scriptIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(scriptIdx);
  }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed chat widget from index.html');
