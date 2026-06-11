for i, line in enumerate(open('concept-g.html', encoding='utf-8', errors='replace')):
    if 'saniye' in line.lower():
        print(i+1, line.strip())
