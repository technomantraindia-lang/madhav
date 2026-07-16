/* ============================================
   Product Details Page — Interactions
   ============================================ */

(function () {
  'use strict';

  /* ---- Tabs ---- */
  var tabBtns = document.querySelectorAll('.pd-tab-btn');
  var tabPanels = document.querySelectorAll('.pd-tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');

      tabBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---- Thumbnail gallery ---- */
  var thumbs = document.querySelectorAll('.pd-thumb');
  var mainImg = document.querySelector('.pd-overview-main-img img');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
      var src = thumb.querySelector('img');
      if (src && mainImg) mainImg.src = src.src;
    });
  });

  /* ---- Carousel helper ---- */
  function initCarousel(trackId, prevId, nextId, cardSelector) {
    var track = document.getElementById(trackId);
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);
    if (!track || !prevBtn || !nextBtn) return;

    var index = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1100) return 2;
      return 4;
    }

    function slide() {
      var cards = track.querySelectorAll(cardSelector);
      if (!cards.length) return;
      var cardWidth = cards[0].offsetWidth + 16;
      var maxIndex = Math.max(0, cards.length - getVisibleCount());
      index = Math.min(index, maxIndex);
      track.style.transform = 'translateX(-' + (index * cardWidth) + 'px)';
    }

    prevBtn.addEventListener('click', function () {
      index = Math.max(0, index - 1);
      slide();
    });
    nextBtn.addEventListener('click', function () {
      var cards = track.querySelectorAll(cardSelector);
      var maxIndex = Math.max(0, cards.length - getVisibleCount());
      index = Math.min(maxIndex, index + 1);
      slide();
    });

    window.addEventListener('resize', slide);
  }

  initCarousel('variant-track', 'variant-prev', 'variant-next', '.pd-variant-card');
  initCarousel('related-track', 'related-prev', 'related-next', '.pd-related-card');

  /* ---- Variant card click ---- */
  document.querySelectorAll('.pd-variant-card').forEach(function (card) {
    card.addEventListener('click', function () {
      document.querySelectorAll('.pd-variant-card').forEach(function (c) {
        c.classList.remove('active');
      });
      card.classList.add('active');
    });
  });

  /* ---- Inquiry form ---- */
  var form = document.getElementById('pd-inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your inquiry has been received. Our team will contact you shortly.');
      form.reset();
    });
  }

  /* ---- Animate progress bars on scroll ---- */
  var perfBars = document.querySelectorAll('.pd-perf-fill');
  if (perfBars.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target;
          var width = fill.style.width;
          fill.style.width = '0';
          requestAnimationFrame(function () {
            fill.style.width = width;
          });
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });
    perfBars.forEach(function (bar) { observer.observe(bar); });
  }
})();
