from PIL import Image

def get_bounds(f):
    img = Image.open(f).convert('RGB')
    w, h = img.size
    row = [img.getpixel((x, h//2)) for x in range(w)]
    left = next(i for i, p in enumerate(row) if p[0]<200 and p[1]<200 and p[2]<200)
    right = next(w-1-i for i, p in enumerate(reversed(row)) if p[0]<200 and p[1]<200 and p[2]<200)
    
    top_col = [img.getpixel((w//2, y)) for y in range(h)]
    top = next((i for i, p in enumerate(top_col) if p[0]<200 and p[1]<200 and p[2]<200), 19)
    bot = next((h-1-i for i, p in enumerate(reversed(top_col)) if p[0]<200 and p[1]<200 and p[2]<200), 1005)
    
    return left, top, right, bot

print('Watch:', get_bounds('mockup-watch-ar.png'))
print('Lamp:', get_bounds('mockup-lamp-ar.jpg'))
print('Cake:', get_bounds('mockup-cake-ar.jpg'))
