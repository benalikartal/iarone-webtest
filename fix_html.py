import re

with open('concept-g.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove inline style from ix-front and ix-back
html = re.sub(r'class="ix-face ix-front" style="[^"]+"', 'class="ix-face ix-front"', html)
html = re.sub(r'class="ix-face ix-back" style="[^"]+"', 'class="ix-face ix-back"', html)

with open('concept-g.html', 'w', encoding='utf-8') as f:
    f.write(html)
