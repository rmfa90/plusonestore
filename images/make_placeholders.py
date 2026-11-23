import pathlib, re

base = pathlib.Path(__file__).resolve().parent / "placeholders"
if not (base / "style.css").exists():
    base = base.parent.parent / "images" / "placeholders"
base.mkdir(parents=True, exist_ok=True)

styles = {
    "blouse": ("#f3e8dc", "#8a5a3b"),
    "jubah": ("#eaf2f8", "#2f5f8f"),
    "kurung": ("#f4ead2", "#7a643a"),
    "kemeja": ("#e8eef4", "#4a6b8a"),
    "batik": ("#1f2a37", "#d4a53f"),
    "hijab": ("#faf0e8", "#b8860b"),
    "koszul": ("#eaf2f8", "#2f6f6a"),
    "plus": ("#fdf6ef", "#8a4a2b"),
    "kids": ("#e6f0e6", "#5a7d4a"),
    "accessories": ("#f2e8d8", "#a0522d"),
}

# name -> category mapping for 27 products
mapping = {
    "blouse-luna": "blouse", "blouse-adelia": "blouse", "blouse-rania": "batik", "blouse-lina": "blouse",
    "jubah-safiya": "jubah", "jubah-mira": "jubah", "jubah-nura": "jubah", "thobe-emirati": "jubah",
    "kurung-bella": "kurung", "kurung-adib": "kurung", "kebaya-dol": "kurung",
    "kemeja-adila": "kemeja", "kemeja-mini": "kemeja",
    "blouse-batik": "batik", "batik-sedondon": "batik",
    "hijab-lyra": "hijab", "hijab-zara": "hijab", "shawl-ansista": "hijab",
    "koszul-tenun": "koszul", "koszul-woven": "koszul",
    "abaya-dhalia": "jubah", "plus-size-1": "plus", "plus-size-2": "plus", "plus-size-3": "plus",
    "kids-batik": "kids", "kids-kebaya": "kids",
    "selendang-akbar": "accessories", "tudung-nikmat": "accessories",
}

def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

created = 0
for name, cat in mapping.items():
    bg, fg = styles[cat]
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
  <rect width="400" height="500" fill="{bg}"/>
  <g opacity="0.06" stroke="{fg}" stroke-width="2">
    {''.join(f'<line x1="{i*60}" y1="0" x2="{i*60}" y2="500"/>' for i in range(7))}
    {''.join(f'<line x1="0" y1="{i*60}" x2="400" y2="{i*60}"/>' for i in range(9))}
  </g>
  <g transform="translate(200,150)">
    <rect x="-14" y="0" width="28" height="40" rx="6" fill="{fg}"/>
    <path d="M-55,20 Q-55,80 0,95 Q55,80 55,20 Z" fill="{fg}"/>
    <rect x="-120" y="25" width="26" height="70" rx="8" fill="{fg}"/>
    <rect x="94" y="25" width="26" height="70" rx="8" fill="{fg}"/>
    <rect x="-30" y="95" width="60" height="60" rx="10" fill="{fg}"/>
    <path d="M-40,155 Q-40,180 40,180 Q40,155 0,155 Z" fill="{fg}"/>
  </g>
  <text x="200" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="{fg}" opacity="0.9">{name.replace('-',' ').title()}</text>
  <text x="200" y="455" text-anchor="middle" font-family="Arial" font-size="11" fill="#fff" opacity="0.85" font-weight="bold">{slug(name).upper()}</text>
  <text x="200" y="475" text-anchor="middle" font-family="Arial" font-size="9" fill="#d8cfc0" opacity="0.8">PLUS ONE STORE</text>
</svg>'''
    (base / f"{name}.svg").write_text(svg, encoding="utf-8")
    created += 1

print("Created", created, "placeholder images in", base)
