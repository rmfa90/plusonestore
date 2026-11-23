/* ============================================================
   PLUS ONE STORE — shared interactivity
   ============================================================ */
(function () {
  "use strict";

  // ---- mobile menu ----
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () { menu.classList.toggle("open"); });
    // close on link click (mobile)
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  // ---- back to top ----
  const backTop = document.getElementById("back-to-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.style.display = window.scrollY > 500 ? "flex" : "none";
    });
    backTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  // ---- ─── SHOP PAGE RENDER ───────────
  const shopGrid = document.getElementById("shop-grid");
  const shopCount = document.getElementById("shop-count");
  if (shopGrid && shopCount) {
    function renderAll() {
      const list = window.PRODUCTS;
      shopCount.textContent = list.length + " products";
      shopGrid.innerHTML = list.map(function (p) {
        const orig = formatPriceOrig(p);
        const origHtml = orig ? '<span class="orig">' + orig + "</span>" : "";
        return (
          '<article class="card" data-cat="' + p.category + '">' +
            '<div class="card-img">' +
              '<img src="images/placeholders/' + p.image + '.svg" alt="' + escapeAttr(p.name) + '" loading="lazy">' +
              (p.badge ? '<span class="badge">' + escapeHtml(p.badge) + "</span>" : "") +
            "</div>" +
            '<div class="card-content">' +
              '<h3>' + escapeHtml(p.name) + "</h3>" +
              '<div class="price">' + formatPrice(p) + origHtml + "</div>" +
              '<div class="stars">★★★★★</div>' +
              '<button class="cart-add" data-add="' + p.id + '">Tambah ke beli</button>' +
            "</div>" +
          "</article>"
        );
      }).join("");
      shopGrid.querySelectorAll("[data-add]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          window.__cart.addToCart(btn.dataset.add, { qty: 1 });
          // show brief feedback
          const orig = btn.textContent;
          btn.textContent = "✓ Ditambah";
          setTimeout(function () { btn.textContent = orig; }, 1200);
        });
      });
    }
    renderAll();

    // category filter
    document.querySelectorAll(".filter-cat").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-cat").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        const items = shopGrid.querySelectorAll(".card");
        items.forEach(function (card) {
          card.style.display = (cat === "all") ? "" : (card.dataset.cat === cat ? "" : "none");
        });
      });
    });

    // search
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const q = searchInput.value.toLowerCase();
        const items = shopGrid.querySelectorAll(".card");
        items.forEach(function (card) {
          const name = card.querySelector("h3").textContent.toLowerCase();
          card.style.display = name.includes(q) ? "" : "none";
        });
      });
    }
  }

  // ---- ─── PRODUCT DETAIL PAGE RENDER ───────
  const params = new URLSearchParams(window.location.search);
  const pid = params.get("id");
  if (pid) {
    const p = window.PRODUCTS.find(function (pr) { return pr.id === pid; });
    if (p) {
      // small details used by this page
      window._current = p;

      // thumbnails
      document.querySelectorAll("[data-thumb]").forEach(function (t) {
        t.addEventListener("click", function () {
          document.querySelectorAll("[data-thumb]").forEach(function (x) { x.classList.remove("active"); });
          t.classList.add("active");
          const img = document.getElementById("main-image");
          if (img) {
            img.src = "/plusonestore/images/placeholders/" + p.image + ".svg";
            img.alt = p.name;
          }
        });
      });

      // size / color init
      const sizesEl = document.getElementById("size-list");
      const colorsEl = document.getElementById("color-row");
      if (sizesEl && p.sizes) {
        sizesEl.innerHTML = p.sizes.map(function (s) {
          return '<button class="size-btn" data-size="' + s + '">' + s + "</button>";
        }).join("");
        sizesEl.querySelectorAll(".size-btn").forEach(function (b) { b.addEventListener("click", function () { b.classList.add("active"); }); });
      }
      if (colorsEl && p.colors) {
        colorsEl.innerHTML = p.colors.map(function (c) {
          return '<span class="color-swatch" style="background:' + colorToHex(c) + '" data-color="' + escapeAttr(c) + '"></span>';
        }).join("");
        colorsEl.querySelectorAll(".color-swatch").forEach(function (s) {
          s.addEventListener("click", function () { s.classList.add("active"); });
        });
      }

      // add to cart
      const addBtn = document.getElementById("add-to-cart");
      if (addBtn) {
        addBtn.addEventListener("click", function () {
          const size = document.querySelector("#size-list .size-btn.active");
          const color = document.querySelector("#color-row .color-swatch.active");
          const qty = parseInt(document.getElementById("qty").value, 10) || 1;
          window.__cart.addToCart(p.id, {
            qty: qty,
            color: color ? color.dataset.color : "",
            size: size ? size.dataset.size : ""
          });
          const orig = addBtn.textContent;
          addBtn.textContent = "✓ Ditambah ke beli";
          setTimeout(function () { addBtn.textContent = orig; }, 1200);
        });
      }

      // tab switching
      document.querySelectorAll(".tab").forEach(function (t) {
        t.addEventListener("click", function () {
          document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
          t.classList.add("active");
          document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
          const panel = document.getElementById(t.dataset.tab);
          if (panel) panel.classList.add("active");
        });
      });
      // open first tab
      const first = document.querySelector(".tab.active");
      if (first) {
        document.querySelectorAll(".tab-panel")[0].classList.add("active");
      }
    }
  }

  // ---- escape helper used above ----
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } [c];
    });
  }
  function escapeAttr(s) { return escapeHtml(s); }
  function colorToHex(name) {
    const map = {
      "Navy": "#1f2a37", "Midnight": "#1b2430", "Kopi": "#4a4f58",
      "Jade": "#2f8f7e", "Teal": "#2f6f6a", "Hijau Menting": "#a8c9a6",
      "Panther": "#3a3a3a", "Awan": "#b9b3a8",
      "Merah": "#c6493a", "Hijau": "#4a7c59", "Kuning": "#d4a53f",
      "Noir": "#1f2a37", "Mawar": "#c6493a",
      "Hitam": "#1f2a37", "Biru": "#2f5f8f", "Coklat": "#7a4f2a",
      "Abisko": "#2f6f6a", "Ekspress": "#b8860b", "Lavender": "#8e7cc3",
      "Turquoise": "#1f7a8c", "Perak": "#9aa5b1", "Kelauk": "#b8860b",
      "Pink": "#d96e8a", "Coklat": "#7a4f2a", "Hitam": "#1f2a37",
      "Coklat": "#7a4f2a", "Merah": "#c6493a", "Perak": "#9aa5b1",
      "Oranye": "#d47920", "Hijau": "#4a7c59",
      "Metal": "#9aa5b1", "Litchen": "#3a6b8a",
      "Coklat": "#7a4f2a", "Merah": "#c6493a", "Biru": "#2f5f8f",
      "Hijau": "#4a7c59", "Hitam": "#1f2a37", "Coklat": "#7a4f2a",
      "Merah": "#c6493a", "Biru": "#2f5f8f", "Kuning": "#d4a53f",
      "Coklat": "#7a4f2a", "Hijau": "#4a7c59",
      "Pink": "#d96e8a", "Coklat": "#7a4f2a", "Hitam": "#1f2a37",
      "Perak": "#9aa5b1", "Emas": "#b8860b",
      "Oranye": "#d47920", "Coklat": "#7a4f2a", "Hijau": "#4a7c59",
      "Coklat": "#7a4f2a", "Biru": "#2f5f8f", "Hitam": "#1f2a37"
    };
    return map[name] || "#cccccc";
  }

  // ---- global functions used by product.html ----
  window.formatPrice = window.formatPrice || function (p) { return "RM " + (p || 0).toFixed(2); };
  window.formatPriceOrig = window.formatPriceOrig || function (p) { return p ? "RM " + p.toFixed(2) : ""; };
  window.escapeHtml = escapeHtml;
  window.escapeAttr = escapeAttr;
})();
