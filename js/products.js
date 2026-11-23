/* ============================================================
   PLUS ONE STORE — product catalog
   Modest fashion, Malaysian pricing (RM). Bilingual labels.
   ============================================================ */
const PRODUCTS = [
  // ---- Labuh / Longgar (blouse & loose-fit) ----
  {
    id: "pr-001", name: "Blouse Luna — Poplin Ada", category: "labuh-longgar", price: 78, origPrice: 98,
    colors: ["Navy", "Midnight", "Kopi"], sizes: ["S","M","L","XL"], image: "blouse-luna",
    desc: "Cepat laras, polos dan segar. Bahagian khas MCC untuk sesehari harian.",
    badge: "Popular", features: ["Wowen", "Plus size", "Diesel"]
  },
  {
    id: "pr-002", name: "Blouse Adelia — Rayon", category: "labuh-longgar", price: 85,
    colors: ["Jade", "Teal", "Hijau Menting"], sizes: ["S","M","L","XL","XXL"], image: "blouse-adelia",
    desc: "Rambut yang lembut, hawa yang anggu. Rebat kayu musim semi.",
    badge: "New", features: ["Wowen", "Rayon", "Lengak"]
  },
  {
    id: "pr-003", name: "Blouse Rania — Batik", category: "labuh-longgar", price: 92, origPrice: 110,
    colors: ["Panther", "Awan"], sizes: ["S","M","L","XL","XXL"], image: "blouse-rania",
    desc: "Batik asli, rekat di tengah. Cocok untuk DUN / acara istimewa.",
    features: ["Batik", "Wowen", "Musim Panas"]
  },
  {
    id: "pr-004", name: "Lilo — Lina Blouse", category: "labuh-longgar", price: 110, origPrice: 135,
    colors: ["Merah", "Hijau", "Kuning"], sizes: ["S","M","L","XL"], image: "blouse-lina",
    desc: "Koleksi pre-order. Sentuh, pewarnaan hidup dan batik kontemporari.",
    badge: "Pre-Order", features: ["Pre-order", "Wowen", "Emas"]
  },
  // ---- Jubah ----
  {
    id: "pr-005", name: "Jubah Safiya — Embroidery", category: "jubah", price: 188,
    colors: ["Noir", "Mawar"], sizes: ["S","M","L","XL","XXL","3XL"], image: "jubah-safiya",
    desc: "Baju panjang khas untuk acara penting. Hiasan gentian di bahagian pinggang.",
    badge: "Bestseller"
  },
  {
    id: "pr-006", name: "Jubah Mira — Full Length", category: "jubah", price: 165,
    colors: ["Hitam", "Biru", "Coklat"], sizes: ["S","M","L","XL"], image: "jubah-mira",
    desc: "Lepas, padat dan anggun. Baju kerja untuk wanita hayat yang sibuk.",
    features: ["Modest", "Prima", "Lengak"]
  },
  {
    id: "pr-007", name: "Jubah Nura — Layered", category: "jubah", price: 152,
    colors: ["Coklat", "Hitam"], sizes: ["S","M","L","XL","XXL"], image: "jubah-nura",
    desc: "Strata pelan di dalam. Hiasan ekor dok di bahagian leher.",
    features: ["Comfort", "Classic"]
  },
  {
    id: "pr-008", name: "Thobe Emirati — Zip", category: "jubah", price: 140,
    colors: ["Abisko", "Ekspress", "Lavender"], sizes: ["S","M","L","XL","XXL"], image: "thobe-emirati",
    desc: "Menyambut bosan, hati perpaduan. Warna seperti mentimun pilihan.",
    badge: "Cergas"
  },
  // ---- Kurung ----
  {
    id: "pr-009", name: "Kurung Bella — Seroja", category: "kurung", price: 138,
    colors: ["Coklat", "Hijau"], sizes: ["S","M","L","XL","XXL"], image: "kurung-bella",
    desc: "Kurung semi formal. Batik seroja yang komoden untuk dewasa.",
    features: ["Kurung", "Batik", "Lepas"]
  },
  {
    id: "pr-010", name: "Kurung Adib — Shengyi", category: "kurung", price: 150,
    colors: ["Coklat", "Hitam"], sizes: ["S","M","L","XL","XXL"], image: "kurung-adib",
    desc: "Shengyi enak disinari. Bahagian leher terbuka, mantap untuk majlis.",
    badge: "Premium", features: ["Shengyi", "Kurung", "Lengak"]
  },
  {
    id: "pr-011", name: "Kebaya Dol — Batik", category: "kurung", price: 118,
    colors: ["Merah", "Perak", "Hijau"], sizes: ["S","M","L","XL"], image: "kebaya-dol",
    desc: "Kebaya tenang dengan tenunan batik. Pilihan untuk acara dan perayaan.",
    features: ["Kebaya", "Batik", "Khas"]
  },
  // ---- Kemeja ----
  {
    id: "pr-012", name: "Kemeja Adila — Cimbal", category: "kemeja", price: 88,
    colors: ["Tubig", "Biru", "Krem"], sizes: ["S","M","L","XL","XXL"], image: "kemeja-adila",
    desc: "Kemeja barat yang ringan untuk kerja dan kafe.",
    features: ["Kemeja", "Lengak", "Women"]
  },
  {
    id: "pr-013", name: "Kemeja_MINI — Nippon", category: "kemeja", price: 95,
    colors: ["Metal", "Litchen"], sizes: ["S","M","L","XL"], image: "kemeja-mini",
    desc: "Rambut cepat kering, sayap lembut. Tipikal rehat.",
    features: ["Senjata", "Lengak"]
  },
  // ---- Batik ----
  {
    id: "pr-014", name: "Blouse Batik Bahira — Serumpun", category: "batik", price: 96,
    colors: ["Pagar", "Awan"], sizes: ["S","M","L","XL"], image: "blouse-batik",
    desc: "Batik tenunan berciri khas, iconik untuk muslimah.",
    features: ["Batik", "Batik", "Fashion"]
  },
  {
    id: "pr-015", name: "Batik Sedondon — Nova", category: "batik", price: 125,
    colors: ["Merah", "Biru"], sizes: ["S","M","L","XL","XXL"], image: "batik-sedondon",
    desc: "Koleksi batik barat untuk wanita yang berani dan peka.",
    badge: "Antique", features: ["Batik", "Koleksi", "Museum"]
  },
  // ---- Hijab / Headscarf ----
  {
    id: "pr-016", name: "Hijab Lyra — Mohor", category: "hijab", price: 42,
    colors: ["Pink", "Biru", "Hitam"], sizes: ["S","M","L"], image: "hijab-lyra",
    desc: "Hijab jahitan halus, nyaman dipakai seharian.",
    features: ["Hijab", "Lengak", "Wowen"]
  },
  {
    id: "pr-017", name: "Hijab Zara — Two Piece", category: "hijab", price: 55,
    colors: ["Coklat", "Coklat"], sizes: ["S","M","L","XL"], image: "hijab-zara",
    desc: "Hijab dua seri, terbahagian rata. Awet dan halus.",
    features: ["Hijab", "Two-piece", "Lepas"]
  },
  {
    id: "pr-018", name: "Shawl Anisa — Emas", category: "hijab", price: 89,
    colors: ["Tembaga", "Merah"], sizes: ["M","L","XL"], image: "shawl-ansisa",
    desc: "Kain emas yang mulanya, dapatkan ketenangan.",
    features: ["Shawl", "Emas", "Acara"]
  },
  // ---- Kosung ----
  {
    id: "pr-019", name: "Kosong Tenun — Bugasan", category: "koszul", price: 98,
    colors: ["Oranye", "Coklat", "Hijau"], sizes: ["S","M","L","XL"], image: "koszul-tenun",
    desc: "Koszul tenun dalam, ramah untuk jari dan bahu.",
    features: ["Kosong", "Tenun", "Lepas"]
  },
  {
    id: "pr-020", name: "Kosong Woven — Sephora", category: "koszul", price: 85,
    colors: ["Coklat", "Biru", "Hitam"], sizes: ["S","M","L","XL","XXL"], image: "koszul-woven",
    desc: "Kosong terpilih dengan tenunan tenang. Cocok untuk sehari.",
    features: ["Tenun", "Comfort", "Lepas"]
  },
  // ---- Plus Size ----
  {
    id: "pr-021", name: "Blouse Luna — Plus", category: "plus-size", price: 80,
    colors: ["Navy", "Midnight"], sizes: ["2XL","3XL","4XL"], image: "blouse-luna",
    desc: "Rw. plus size yang anggun dan cepat laras.",
    features: ["Plus", "Wowen", "2XL-4XL"]
  },
  {
    id: "pr-022", name: "Jubah Nura — Plus", category: "plus-size", price: 160,
    colors: ["Hitam", "Coklat"], sizes: ["2XL","3XL","4XL"], image: "jubah-nura",
    desc: "Jubah plus size yang enak, pendek, dan disukai.",
    features: ["Plus", "Jubah", "Lepas"]
  },
  {
    id: "pr-023", name: "Abaya Dhalia — Embroidery", category: "plus-size", price: 240,
    colors: ["Noir", "Mawar"], sizes: ["2XL","3XL","4XL"], image: "abaya-dhalia",
    desc: "Abaya teras dalam dengan hiasan emas. Tangan.",
    badge: "Signature"
  },
  // ---- Anak-anak ----
  {
    id: "pr-024", name: "Badan Muda — Batik", category: "kids", price: 48,
    colors: ["Merah", "Biru"], sizes: ["3T","4T","6T"], image: "kids-batik",
    desc: "Pakaian anak lelaki yang ringan. Batik sebagai nilai warisan.",
    features: ["Anak", "Batik", "Lepas"]
  },
  {
    id: "pr-025", name: "Badan Dara — Kebaya", category: "kids", price: 52,
    colors: ["Kuning", "Merah"], sizes: ["3T","4T","6T"], image: "kids-kebaya",
    desc: "Kebaya anak perempuan yang cantik untuk perayaan.",
    features: ["Anak", "Kebaya", "Acara"]
  },
  // ---- Accessories ----
  {
    id: "pr-026", name: "Selendang Al-Muttaqin", category: "accessories", price: 55,
    colors: ["Perak", "Emas"], sizes: ["L","XL"], image: "selendang-akbar",
    desc: "Tudung rapi, nampak elegan dan lebih ringkas.",
    features: ["Hijab", "Lepas", "Tenun"]
  },
  {
    id: "pr-027", name: "Tudung Nikmat", category: "accessories", price: 45,
    colors: ["Coklat", "Hitam"], sizes: ["M","L"], image: "tudung-nikmat",
    desc: "Tudung duluan. Permeatan halus, kekal hangat.",
    features: ["Tudung", "Skin", "Lepas"]
  },
];

const PRODUCT_ROUTE = (id) => id.replace("pr-", "product-").replace(/-/g, "-");
const buildUrl = (p) => `/plusonestore/pages/product.html?id=${p.id}`;

/* ---- helpers ---- */
function categoryLabel(cat) {
  const labels = {
    "labuh-longgar": "Labuh & Longgar",
    "jubah": "Jubah & Thobe",
    "kurung": "Kurung",
    "kemeja": "Kemeja & Shirt",
    "batik": "Batik",
    "hijab": "Hijab & Longgar",
    "koszul": "Kosong",
    "plus-size": "Plus Size",
    "kids": "Anak-anak",
    "accessories": "Aksesori"
  };
  return labels[cat] || cat;
}

function formatPrice(p) { return "RM " + p.price.toFixed(2); }
function formatPriceOrig(p) { if (!p.origPrice) return ""; return "RM " + p.origPrice.toFixed(2); }

window.PRODUCTS = PRODUCTS;
window.PRODUCT_ROUTE = PRODUCT_ROUTE;
window.buildUrl = buildUrl;
window.categoryLabel = categoryLabel;
window.formatPrice = formatPrice;
window.formatPriceOrig = formatPriceOrig;
