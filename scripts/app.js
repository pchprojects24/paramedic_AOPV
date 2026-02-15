/* Paramedic Aid Memoir — shared JS */
/* Offline-first: no external dependencies */

(function () {
  "use strict";

  /* ── Simple search filter ── */
  /* Used on pages with class="search-container" */
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
      results.textContent = 'Search for "' + input.value.trim() + '" — no data loaded yet.';
    });
  }

  /* ── Section carousel ── */
  function initCarousel() {
    var carousel = document.querySelector(".section-carousel");
    if (!carousel) return;

    var track = carousel.querySelector(".carousel-track");
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
    var prevBtn = carousel.querySelector("[data-action='prev']");
    var nextBtn = carousel.querySelector("[data-action='next']");
    var status = carousel.querySelector(".carousel-status");
    var dotsWrap = carousel.querySelector(".carousel-dots");
    if (!track || slides.length === 0) return;

    var dots = [];
    var currentIndex = 0;

    function setActive(index) {
      if (status) {
        status.textContent = "Section " + (index + 1) + " of " + slides.length;
      }
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index === slides.length - 1;
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute("aria-current", i === index ? "true" : "false");
      }
    }

    function scrollToIndex(index) {
      var target = slides[index];
      if (!target) return;
      currentIndex = index;
      track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      setActive(index);
    }

    slides.forEach(function (slide, idx) {
      if (!dotsWrap) return;
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", slide.getAttribute("data-title") || "Section " + (idx + 1));
      dot.addEventListener("click", function () {
        scrollToIndex(idx);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function handleScroll() {
      var width = track.clientWidth || 1;
      var index = Math.round(track.scrollLeft / width);
      if (index < 0) index = 0;
      if (index > slides.length - 1) index = slides.length - 1;
      if (index !== currentIndex) {
        currentIndex = index;
        setActive(index);
      }
    }

    track.addEventListener("scroll", function () {
      window.clearTimeout(track._scrollTimer);
      track._scrollTimer = window.setTimeout(handleScroll, 80);
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        scrollToIndex(Math.max(0, currentIndex - 1));
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        scrollToIndex(Math.min(slides.length - 1, currentIndex + 1));
      });
    }

    window.addEventListener("resize", function () {
      scrollToIndex(currentIndex);
    });

    setActive(currentIndex);
  }

  /* ── Accordion ── */
  function initAccordion() {
    var headers = document.querySelectorAll(".accordion-header");
    if (headers.length === 0) return;

    Array.prototype.forEach.call(headers, function (header) {
      header.addEventListener("click", function () {
        var isExpanded = header.getAttribute("aria-expanded") === "true";
        var content = header.nextElementSibling;

        if (!content || !content.classList.contains("accordion-content")) return;

        if (isExpanded) {
          // Collapse
          header.setAttribute("aria-expanded", "false");
          content.style.maxHeight = "0";
        } else {
          // Expand
          header.setAttribute("aria-expanded", "true");
          var inner = content.querySelector(".accordion-content-inner");
          if (inner) {
            // Use none to allow content to size naturally for large sections
            content.style.maxHeight = inner.scrollHeight + 40 + "px";
            // After transition, switch to none so nested content can resize
            content.addEventListener("transitionend", function handler() {
              if (header.getAttribute("aria-expanded") === "true") {
                content.style.maxHeight = "none";
              }
              content.removeEventListener("transitionend", handler);
            });
          }
        }
      });
    });
  }

  /* ── Init on DOM ready ── */
  function initPage() {
    initSearch();
    initCarousel();
    initAccordion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
