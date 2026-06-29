import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_text = f.read()

index_text = index_text.replace(
    'Daha iyi ürün algısı, AR ile boyut güveni ve satışa hazır entegrasyon.',
    'Daha iyi ürün algısı, AR ile boyut güveni ve hedefli entegrasyon alanları.'
)
index_text = index_text.replace(
    'Toplu ürün dönüştürme ve API entegrasyon çözümleri.',
    'Toplu ürün dönüştürme ve hedefli entegrasyon alanları.'
)
index_text = index_text.replace(
    'Teknik API entegrasyonu',
    'Hedefli entegrasyon alanları'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_text)

# Update market.html
with open('market.html', 'r', encoding='utf-8') as f:
    market_text = f.read()

market_text = market_text.replace(
    'Ürünün tüm açılardan ve gerçek fiziksel yansımalarla incelenebilmesini sağlayan 3D web entegrasyonu sağlar.',
    'Ürünün tüm açılardan ve gerçek fiziksel yansımalarla incelenebilmesini sağlayan 3D deneyimler sağlar.'
)

with open('market.html', 'w', encoding='utf-8') as f:
    f.write(market_text)

# Update i18n.js
with open('i18n.js', 'r', encoding='utf-8') as f:
    i18n_text = f.read()

i18n_text = i18n_text.replace(
    "'Daha iyi ürün algısı, AR ile boyut güveni ve satışa hazır entegrasyon.'",
    "'Daha iyi ürün algısı, AR ile boyut güveni ve hedefli entegrasyon alanları.'"
)
i18n_text = i18n_text.replace(
    "'Toplu ürün dönüştürme ve API entegrasyon çözümleri.'",
    "'Toplu ürün dönüştürme ve hedefli entegrasyon alanları.'"
)
i18n_text = i18n_text.replace(
    "'Teknik API entegrasyonu'",
    "'Hedefli entegrasyon alanları'"
)
i18n_text = i18n_text.replace(
    "'Ürünün tüm açılardan ve gerçek fiziksel yansımalarla incelenebilmesini sağlayan 3D web entegrasyonu sağlar.'",
    "'Ürünün tüm açılardan ve gerçek fiziksel yansımalarla incelenebilmesini sağlayan 3D deneyimler sağlar.'"
)

# English updates
i18n_text = i18n_text.replace(
    "'Better product perception, size confidence with AR, and sales-ready integration.'",
    "'Better product perception, size confidence with AR, and targeted integration areas.'"
)
i18n_text = i18n_text.replace(
    "'Bulk product conversion and API integration solutions.'",
    "'Bulk product conversion and targeted integration areas.'"
)
i18n_text = i18n_text.replace(
    "'Technical API integration'",
    "'Targeted integration areas'"
)

# Arabic updates
i18n_text = i18n_text.replace(
    "'إدراك أفضل للمنتج، ثقة في الحجم مع الواقع المعزز، وتكامل جاهز للبيع.'",
    "'إدراك أفضل للمنتج، ثقة في الحجم مع الواقع المعزز، ومجالات التكامل المستهدفة.'"
)
i18n_text = i18n_text.replace(
    "'تحويل جماعي للمنتجات وحلول تكامل واجهة برمجة التطبيقات (API).'",
    "'تحويل جماعي للمنتجات ومجالات التكامل المستهدفة.'"
)
i18n_text = i18n_text.replace(
    "'تكامل تقني لواجهة برمجة التطبيقات (API)'",
    "'مجالات التكامل المستهدفة'"
)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_text)

print("Updated integration claims")
