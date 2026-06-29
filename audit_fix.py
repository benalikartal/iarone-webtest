import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace final CTA link
text = re.sub(
    r'<a href="https://app\.iarone\.com/auth\.html[^"]*" class="btn btn-primary btn-primary-lg"[^>]*>\s*<span data-i18n="home\.hero_cta_primary">[^<]*</span>\s*</a>',
    '<a href="#demo" class="btn btn-primary btn-primary-lg">\n          <span data-i18n="home.hero_cta_secondary">Demo Talep Et</span>\n        </a>',
    text
)

# Remove auth-intent script
text = re.sub(r'<script type="module" src="auth-intent\.js"></script>\n?', '', text)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)


# Update market.html
with open('market.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'<script type="module" src="auth-intent\.js"></script>\n?', '', text)

with open('market.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed navigation and auth-intent leftovers.")
