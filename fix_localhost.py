import re

for filename in ['publish.html', 'embed.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    text = text.replace('"http://localhost:3000/api"', '"https://api.iarone.com/api"')
    text = text.replace("'http://localhost:3000/api'", "'https://api.iarone.com/api'")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

print("Fixed localhost fallbacks in publish.html and embed.html")
