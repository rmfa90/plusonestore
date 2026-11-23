/* ============================================================
   PLUS ONE STORE — cart engine (client-side)
   ============================================================ */
(function () {
  "use strict";

  const STORAGE_KEY = "plusone_cart_v1";
  const QTY_STEP = 1;
  const MIN_QTY = 1;

  let cart = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) { /* ignore */ }
  }

  function findProduct(id) {
    return window.PRODUCTS.find(function (p) { return p.id === id; });
  }

  function addToCart(id, opts) {
    opts = opts || {};
    const qty = Math.max(MIN_QTY, Math.floor(opts.qty || 1));
    const color = (opts.color || "").trim();
    const size = (opts.size || "").trim();

    const existing = cart.find(function (item) { return item.id === id; });
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 99);
    } else {
      cart.push({
        id: id,
        name: findProduct(id).name,
        price: findProduct(id).price,
        color: color,
        size: size,
        qty: qty,
        image: findProduct(id).image
      });
    }
    save();
    return cart.length;
  }

  function setQty(id, qty) {
    qty = Math.max(MIN_QTY, Math.floor(qty));
    const item = cart.find(function (i) { return i.id === id; });
    if (item) {
      item.qty = qty;
      save();
    }
  }

  function removeItem(id) {
    cart = cart.filter(function (i) { return i.id !== id; });
    save();
  }

  function clearCart() {
    cart = [];
    save();
  }

  function getTotal() {
    return cart.reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);
  }

  function count() {
    return cart.reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  function totalItems() { return cart.reduce(function (sum, i) { return sum + i.qty; }, 0); }

  window.__cart = {
    addToCart: addToCart,
    setQty: setQty,
    removeItem: removeItem,
    clearCart: clearCart,
    getTotal: getTotal,
    count: count,
    totalItems: totalItems,
    getList: function () { return cart; }
  };

  // ---- update the floating cart badge ----
  function refreshBadge() {
    const el = document.getElementById("cart-count");
    if (el) {
      const n = totalItems();
      el.textContent = n;
      el.style.display = n ? "inline-block" : "none";
    }
  }

  // ---- re-render the cart list on the cart page ----
  function renderCartList() {
    const list = document.getElementById("cart-list");
    if (!list) return;
    if (cart.length === 0) {
      list.innerHTML = '<div class="summary-empty"><p>Your cart is empty.</p><a class="btn btn-ghost" href="/plusonestore/pages/shop.html">Start shopping</a></div>';
      document.getElementById("cart-summary").style.display = "none";
      refreshBadge();
      return;
    }
    list.innerHTML = cart.map(function (item) {
      return (
        '<div class="cart-item" data-id="' + item.id + '">' +
          '<img class="thumb" src="images/placeholders/' + item.image + '.svg" alt="">' +
          '<div class="body">' +
            '<div class="name">' + escapeHtml(item.name) + '</div>' +
            '<div class="meta">' + escapeHtml(item.color || "") + ' / ' + escapeHtml(item.size || "") + "</div>" +
            '<div class="price">' + formatPrice(item) + "</div>" +
            '<div class="qty-ctrl">' +
              '<button data-action="dec" data-id="' + item.id + '">−</button>' +
              '<span class="qty">' + item.qty + "</span>" +
              '<button data-action="inc" data-id="' + item.id + '">+</button>' +
              '<span class="remove-btn" data-action="rm" data-id="' + item.id + '">Hapus</span>' +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    // attach events
    list.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        if (action === "inc") { __cart.setQty(id, cart.find(function (i) { return i.id === id; }).qty + 1); renderCartList(); }
        else if (action === "dec") { __cart.setQty(id, cart.find(function (i) { return i.id === id; }).qty - 1); renderCartList(); }
        else if (action === "rm") { __cart.removeItem(id); renderCartList(); }
      });
    });

    const summary = document.getElementById("cart-summary");
    if (summary) {
      const rows = cart.map(function (i) {
        return '<div class="sum-row"><span>' + escapeHtml(i.name) + "</span><span>" + formatPrice(i) + "</span></div>";
      }).join("");
      summary.innerHTML =
        '<div class="sum-row"><span>Subtotal (' + count() + " item)" + "</span><span>" + formatPrice({ price: getTotal() }) + "</span></div>" +
        '<div class="sum-row total"><span>Total</span><span>' + formatPrice({ price: getTotal() }) + "</span></div>" +
        '<a class="btn btn-brand btn-block" href="/plusonestore/pages/checkout.html">Checkout</a>' +
        '<button class="btn btn-ghost" id="clear-cart-btn" style="margin-top:10px">Clear cart</button>';
      summary.querySelector("#clear-cart-btn").addEventListener("click", function () { __cart.clearCart(); renderCartList(); });
      document.getElementById("cart-summary").style.display = "block";
    }
    refreshBadge();
  }

  function formatPrice(p) {
    return "RM " + p.price.toFixed(2);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } [c];
    });
  }

  // ---- expose for cart.html after page load ----
  document.addEventListener("DOMContentLoaded", function () {
    renderCartList();
  });
})();
