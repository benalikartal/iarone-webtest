import re

with open('concept-g.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('object-fit: cover;', 'object-fit: contain;')

with open('concept-g.html', 'w', encoding='utf-8') as f:
    f.write(html)
