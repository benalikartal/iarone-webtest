import re

# Update concept-g.html
with open('concept-g.html', 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

content = content.replace('saniyeler iinde', 'hızlıca')
content = content.replace('Saniyeler iinde', 'Hızlıca')
# The original text might have proper chars or weird chars. 
# Let's read and write bytes instead to be safe, or just use regex with the surrounding words.
