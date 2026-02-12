/* ================================================================
   Paramedic Aid Memoir — Shared JS v2
   Offline-first · No external dependencies
   ================================================================ */

(function () {
  "use strict";

  /* ── Dark Mode Toggle ── */
  function initDarkMode() {
    var btn = document.querySelector(".btn-dark-mode");
    if (!btn) return;

    // Restore saved preference
    var saved = localStorage.getItem("pam-dark-mode");
    if (saved === "true") {
      document.body.classList.add("dark-mode");
      btn.textContent = "Light";
    }

    btn.addEventListener("click", function () {
      var isDark = document.body.classList.toggle("dark-mode");
      btn.textContent = isDark ? "Light" : "Dark";
      localStorage.setItem("pam-dark-mode", isDark);
    });
  }

  /* ── Collapsible Sections ── */
  function initCollapsibles() {
    var toggles = document.querySelectorAll(".collapsible-toggle");
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        toggle.addEventListener("click", function () {
          var parent = toggle.parentElement;
          var isOpen = parent.classList.contains("open");
          parent.classList.toggle("open");
          toggle.setAttribute("aria-expanded", !isOpen);
          var body = parent.querySelector(".collapsible-body");
          if (body) {
            body.setAttribute("aria-hidden", isOpen);
          }
        });
      })(toggles[i]);
    }
  }

  /* ── Expand / Collapse All ── */
  function initExpandAll() {
    var btnExpand = document.querySelector(".btn-expand-all");
    var btnCollapse = document.querySelector(".btn-collapse-all");

    if (btnExpand) {
      btnExpand.addEventListener("click", function () {
        var sections = document.querySelectorAll(".collapsible");
        for (var i = 0; i < sections.length; i++) {
          sections[i].classList.add("open");
          var toggle = sections[i].querySelector(".collapsible-toggle");
          if (toggle) toggle.setAttribute("aria-expanded", "true");
          var body = sections[i].querySelector(".collapsible-body");
          if (body) body.setAttribute("aria-hidden", "false");
        }
      });
    }

    if (btnCollapse) {
      btnCollapse.addEventListener("click", function () {
        var sections = document.querySelectorAll(".collapsible");
        for (var i = 0; i < sections.length; i++) {
          sections[i].classList.remove("open");
          var toggle = sections[i].querySelector(".collapsible-toggle");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
          var body = sections[i].querySelector(".collapsible-body");
          if (body) body.setAttribute("aria-hidden", "true");
        }
      });
    }
  }

  /* ── Simple Search Filter ── */
  function initSearch() {
    var input = document.querySelector(".search-container input[type='search']");
    if (!input) return;

    var results = document.querySelector(".search-results");
    if (!results) return;

    input.addEventListener("input", function () {
      var query = input.value.trim().toLowerCase();
      if (query.length === 0) {
        results.textContent = "No data loaded yet.";
        return;
      }
      results.textContent =
        'Search for "' + input.value.trim() + '" \u2014 no data loaded yet.';
    });
  }

  /* ── Smooth scroll for on-page anchor links ── */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  /* ── Back to Top button ── */
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.textContent = "\u2191 Top";
    btn.setAttribute("aria-label", "Back to top");
    btn.style.cssText =
      "position:fixed;bottom:1.5rem;right:1.5rem;z-index:99;" +
      "background:#003366;color:#fff;border:none;border-radius:8px;" +
      "padding:0.6rem 1rem;font-size:0.85rem;font-family:inherit;" +
      "cursor:pointer;opacity:0;transition:opacity 0.3s;pointer-events:none;" +
      "min-height:44px;min-width:44px;box-shadow:0 4px 12px rgba(0,0,0,0.2);";
    document.body.appendChild(btn);

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      }
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Init on DOM ready ── */
  function init() {
    initDarkMode();
    initCollapsibles();
    initExpandAll();
    initSearch();
    initSmoothScroll();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
