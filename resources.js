(function () {
  'use strict';
  if (document.body.getAttribute('data-page') !== 'resources') return;

  document.querySelectorAll('.res-search').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  });
})();
