for i, line in enumerate(open('styles.v5.css', encoding='utf-8')):
    if 'ix-card' in line or 'ix-face' in line:
        print(i+1, line.strip())
