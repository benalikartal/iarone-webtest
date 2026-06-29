import re

def process_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # Logo alts
    text = text.replace('alt="Iarone"', 'alt="Iarone 3D and AR Commerce Platform Logo"')
    
    # Hero images
    text = text.replace('alt="Iarone 3D ve AR Ürün Görüntüleme - Ana Ekran"', 'alt="Iarone mobile AR preview showing an e-commerce product as an interactive 3D experience"')
    text = text.replace('alt="Iarone AR Deneyimi - Saat Önizleme"', 'alt="Iarone AR preview displaying a 3D watch model for e-commerce integration"')
    text = text.replace('alt="Iarone AR Deneyimi - Lamba Önizleme"', 'alt="Iarone AR preview displaying a 3D furniture lamp model for e-commerce integration"')
    
    # Other images
    text = text.replace('alt="Chair 3D Render"', 'alt="3D render of a chair showcasing Iarone\'s high-quality 3D modeling output for furniture e-commerce"')
    text = text.replace('alt="AR Preview"', 'alt="A smartphone displaying an Augmented Reality preview of a product in a real-world environment"')
    text = text.replace('alt="Laptop Preview"', 'alt="Iarone 3D web viewer interface converting 2D e-commerce photos into interactive experiences on a laptop"')
    text = text.replace('alt="Iarone Dashboard and Conversion Flow"', 'alt="Iarone dashboard interface showcasing the 4-step process of converting 2D images to 3D models"')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

process_html('index.html')
process_html('market.html')

print("Updated alt texts")
