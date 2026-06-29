import re

# 1. Update HTML files
for filename in ['index.html', 'market.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Remove hreflang de
    text = re.sub(r'<link rel="alternate" hreflang="de" [^>]+>\n\s*', '', text)
    # Remove lang dropdown de
    text = re.sub(r'<div class="lang-opt"\s+data-lang="de" role="menuitem" tabindex="0">🇩🇪 &nbsp;Deutsch</div>\n\s*', '', text)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

# 2. Update app.v5.js
with open('app.v5.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

app_js = app_js.replace("['tr', 'en', 'ar', 'de']", "['tr', 'en', 'ar']")
app_js = app_js.replace("(lang === 'de' ? 'Danke!' : 'Thank you!')", "'Thank you!'")
app_js = app_js.replace("(lang === 'de' ? 'Eingereicht' : 'Submitted')", "'Submitted'")

with open('app.v5.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

# 3. Update i18n.js
with open('i18n.js', 'r', encoding='utf-8') as f:
    i18n_js = f.read()

# Remove the `de: { ... }` block at the end.
i18n_js = re.sub(r',\s*de:\s*\{.*?\}\s*(?=\}\s*;\s*$)', '', i18n_js, flags=re.DOTALL)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_js)

print("Reverted DE")
