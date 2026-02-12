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

  /* ── Init on DOM ready ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})();
