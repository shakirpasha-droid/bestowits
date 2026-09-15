/*
 * Bestow IT Services - non-intrusive content protection.
 * Browser-side deterrent only; does not alter page layout, images, forms,
 * navigation, SEO markup, or existing functionality.
 */
(function () {
  'use strict';

  function addBestowSiteProtection() {
    if (document.documentElement.dataset.bestowProtection === '1') return;
    document.documentElement.dataset.bestowProtection = '1';

    document.addEventListener('contextmenu', function (event) {
      var tag = (event.target && event.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      event.preventDefault();
    }, { capture: true });

    document.addEventListener('dragstart', function (event) {
      if (event.target && event.target.tagName === 'IMG') {
        event.preventDefault();
      }
    }, { capture: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBestowSiteProtection, { once: true });
  } else {
    addBestowSiteProtection();
  }
})();
