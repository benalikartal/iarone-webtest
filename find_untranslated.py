import re
import sys

def find_text_nodes(html):
    # Remove script and style content
    html = re.sub(r'<script.*?>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # We will look for tags without data-i18n that contain text.
    # Actually, a simpler way is just to manually read the file and look at the new sections.
    pass

if __name__ == "__main__":
    with open('index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        if 'data-i18n' not in line:
            # find text between > and <
            matches = re.findall(r'>([^<]+)<', line)
            for m in matches:
                m = m.strip()
                if m and any(c.isalpha() for c in m):
                    print(f"Line {i+1}: {m}")
