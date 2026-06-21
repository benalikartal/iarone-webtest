import os
import re

restricted_terms = [
    r'10x', r'%100', r'%98', r'Mükemmel', r'saniyeler',
    r'perfect', r'guaranteed', r'Beta', r'early access',
    r'Fiyat Yakında', r'yakında aktif',
    r'[\U00010000-\U0010ffff]', # Emojis (basic)
]

allowed_strings = ['beta-form', 'beta-email', 'beta-submit', 'beta_label']

def check_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            for term in restricted_terms:
                matches = re.finditer(term, content, re.IGNORECASE)
                for match in matches:
                    text_matched = match.group()
                    # check if it's an allowed string
                    is_allowed = False
                    start_idx = max(0, match.start() - 15)
                    end_idx = min(len(content), match.end() + 15)
                    context = content[start_idx:end_idx].lower()
                    
                    for allowed in allowed_strings:
                        if allowed.lower() in context:
                            is_allowed = True
                            break
                    
                    if not is_allowed:
                        print(f"Match found in {filepath}: '{text_matched}' (context: {context.strip()})")
    except Exception as e:
        pass

for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.js') or file.endswith('.css'):
            check_file(os.path.join(root, file))

print("Check completed.")
