/* Equipedia - client-side content protection (deterrent only).
   NOTE: Anything sent to the browser can still be viewed by a determined
   user (view-source, disabled JS, network tab, or direct URL fetch).
   This only stops casual right-click / shortcut copying. */

(function () {
  "use strict";

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  document.addEventListener("keydown", function (e) {
    const k = (e.key || "").toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;

    if (k === "f12") {
      e.preventDefault();
      return false;
    }
    if (ctrl && e.shiftKey && ["i", "j", "c"].indexOf(k) !== -1) {
      e.preventDefault();
      return false;
    }
    if (ctrl && ["u", "s"].indexOf(k) !== -1) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  document.addEventListener("selectstart", function (e) {
    if (!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
      e.preventDefault();
    }
  });

  document.addEventListener("copy", function (e) {
    if (!/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
    }
  });
})();
