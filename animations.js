/* ============================================
   MADHAV POLYMERS — Native scroll animations
   No GSAP — Intersection Observer only
   ============================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  function whenReady(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb);
    } else {
      cb();
    }
  }

  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        const card = el.closest('.stat-card');
        if (card) card.classList.add('counted');
      }
    }
    requestAnimationFrame(tick);
  }

  whenReady(function () {
    document.documentElement.classList.add('animations-ready');

    if (prefersReducedMotion) return;

    const revealSelector = [
      '.product-card',
      '.iso-item',
      '.iso-inner',
      '.industry-list li',
      '.why-item',
      '.app-card',
      '.about-left',
      '.about-image-frame',
      '.stat-card',
      '.footer-brand',
      '.footer-col',
      '.footer-cert'
    ].join(', ');

    const revealEls = document.querySelectorAll(revealSelector);
    const staggerMap = new Map();

    revealEls.forEach(function (el) {
      const parent = el.parentElement;
      const key = parent ? parent.className : 'root';
      const index = staggerMap.get(key) || 0;
      staggerMap.set(key, index + 1);
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', Math.min(index * 0.07, 0.35) + 's');
    });

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    const industriesLeft = document.querySelector('.industries-left');
    if (industriesLeft) {
      const bgObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            industriesLeft.classList.add('is-bg-loaded');
            obs.disconnect();
          });
        },
        { rootMargin: '120px 0px' }
      );
      bgObserver.observe(industriesLeft);
    }

    document.querySelectorAll('.stat-num').forEach(function (el) {
      const text = el.textContent.trim();
      const num = parseInt(text, 10);
      const suffix = text.replace(String(num), '');
      if (isNaN(num)) return;

      const counterObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animateCounter(el, num, suffix, 1000);
            obs.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      counterObserver.observe(el);
    });

    if (!isMobile) {
      document.querySelectorAll('.product-card, .why-item, .app-card').forEach(function (el) {
        el.addEventListener('mouseenter', function () { el.classList.add('is-hover'); }, { passive: true });
        el.addEventListener('mouseleave', function () { el.classList.remove('is-hover'); }, { passive: true });
      });
    }
  });
})();
