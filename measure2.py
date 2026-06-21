from PIL import Image

def get_bounds(f):
    img = Image.open(f).convert('RGB')
    w, h = img.size
    row = [img.getpixel((x, h//2)) for x in range(w)]
    left = next((i for i, p in enumerate(row) if p[0]<240), 0)
    right = next((w-1-i for i, p in enumerate(reversed(row)) if p[0]<240), w-1)
    return left, right

for f in ['new-1.png', 'new-2.png', 'new-3.png', 'new-4.png', 'new-5.png']:
    try:
        print(f, get_bounds(f))
    except Exception as e:
        print(f, e)
