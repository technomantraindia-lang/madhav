/* Applications page — GSAP + ScrollTrigger animations */
(function () {
  'use strict';

  if (document.body.getAttribute('data-page') !== 'applications') return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  var ctx = null;
  var EASE = 'power3.out';
  var DUR = 0.85;

  function isMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function dist(large, small) {
    return isMobile() ? small : large;
  }

  function scrollOnce(trigger, start) {
    return {
      trigger: trigger,
      start: start || 'top 82%',
      once: true,
      invalidateOnRefresh: true
    };
  }

  function initAnimations() {
    ctx = gsap.context(function () {
      var mobile = isMobile();
      var moveY = dist(36, 18);
      var moveYSm = dist(24, 14);
      var moveX = dist(40, 0);

      /* ---- Header (load) ---- */
      var header = document.getElementById('header');
      if (header) {
        gsap.from(header, {
          y: -18,
          opacity: 0,
          duration: 0.8,
          ease: EASE
        });

        var navLinks = gsap.utils.toArray(
          '.nav-list > li > a.nav-link, .nav-list > li.has-dropdown > a.nav-link'
        );
        gsap.from(navLinks, {
          y: -12,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          delay: 0.12,
          ease: EASE
        });

        var quoteBtn = document.getElementById('get-quote-btn');
        if (quoteBtn) {
          gsap.from(quoteBtn, {
            y: -12,
            opacity: 0,
            duration: 0.7,
            delay: 0.12 + navLinks.length * 0.06 + 0.08,
            ease: EASE
          });
        }
      }

      /* ---- Hero left content (load) ---- */
      var heroLeft = document.querySelector('.app-hero-left');
      if (heroLeft) {
        gsap.from(heroLeft.children, {
          y: moveY,
          opacity: 0,
          duration: DUR,
          stagger: 0.09,
          delay: 0.18,
          ease: EASE
        });
      }

      /* ---- Hero image area — background fade + light parallax ---- */
      var hero = document.querySelector('.app-hero');
      if (hero) {
        gsap.fromTo(
          hero,
          {
            backgroundPosition: mobile ? 'center center' : '58% center',
            opacity: 0.88
          },
          {
            backgroundPosition: 'center center',
            opacity: 1,
            duration: 1,
            delay: 0.1,
            ease: EASE
          }
        );

        if (!mobile) {
          gsap.to(hero, {
            backgroundPosition: '52% center',
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.55
            }
          });
        }
      }

      /* ---- Hero stats card (load) ---- */
      var heroStats = document.querySelector('.hero-stats-card');
      if (heroStats) {
        var heroStatsTl = gsap.timeline({ delay: 0.42 });
        heroStatsTl.from(heroStats, {
          x: mobile ? 0 : 28,
          y: moveYSm,
          opacity: 0,
          duration: DUR,
          ease: EASE
        });
        heroStatsTl.from(
          heroStats.querySelectorAll('.hero-stat-item'),
          {
            y: moveYSm,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: EASE
          },
          '-=0.45'
        );
      }

      /* ---- Section headings (scroll) ---- */
      gsap.utils.toArray('main .text-center').forEach(function (block) {
        gsap.from(block.children, {
          y: moveYSm,
          opacity: 0,
          duration: DUR,
          stagger: 0.09,
          ease: EASE,
          scrollTrigger: scrollOnce(block, 'top 84%'),
          clearProps: 'transform,opacity'
        });
      });

      /* ---- Application cards (scroll) ---- */
      var appGrid = document.querySelector('.app-differences .app-grid');
      if (appGrid) {
        gsap.from(appGrid.querySelectorAll('.app-card'), {
          y: moveY,
          opacity: 0,
          scale: 0.97,
          duration: DUR,
          stagger: 0.07,
          ease: EASE,
          scrollTrigger: scrollOnce(appGrid, 'top 80%'),
          clearProps: 'transform,opacity'
        });
      }

      /* ---- Process timeline (scroll) ---- */
      var processTimeline = document.querySelector('.process-timeline');
      if (processTimeline) {
        gsap.fromTo(
          processTimeline,
          { '--line-scale': 0 },
          {
            '--line-scale': 1,
            duration: 1,
            ease: EASE,
            scrollTrigger: scrollOnce(processTimeline, 'top 76%')
          }
        );

        gsap.from(processTimeline.querySelectorAll('.process-step'), {
          y: moveYSm,
          opacity: 0,
          scale: 0.96,
          duration: 0.78,
          stagger: 0.11,
          ease: EASE,
          scrollTrigger: scrollOnce(processTimeline, 'top 72%'),
          clearProps: 'transform,opacity'
        });
      }

      /* ---- Advantage cards (scroll) ---- */
      var advGrid = document.querySelector('.advantages-grid');
      if (advGrid) {
        gsap.from(advGrid.querySelectorAll('.adv-card'), {
          y: moveY,
          opacity: 0,
          duration: DUR,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: scrollOnce(advGrid, 'top 80%'),
          clearProps: 'transform,opacity'
        });

        if (!mobile) {
          advGrid.querySelectorAll('.adv-card').forEach(function (card) {
            var icon = card.querySelector('.adv-icon-wrap img, .adv-icon-wrap svg');
            if (!icon) return;
            card.addEventListener('mouseenter', function () {
              gsap.to(icon, { scale: 1.08, duration: 0.35, ease: EASE, overwrite: 'auto' });
            });
            card.addEventListener('mouseleave', function () {
              gsap.to(icon, { scale: 1, duration: 0.35, ease: EASE, overwrite: 'auto' });
            });
          });
        }
      }

      /* ---- Purple stats strip (scroll) ---- */
      var statsInner = document.querySelector('.app-stats-bar-inner');
      if (statsInner) {
        gsap.from(statsInner.querySelectorAll('.bar-stat-item'), {
          x: moveX,
          y: mobile ? moveYSm : 0,
          opacity: 0,
          duration: 0.78,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: scrollOnce(statsInner, 'top 86%'),
          clearProps: 'transform,opacity'
        });
      }

      /* ---- CTA (scroll) ---- */
      var ctaCard = document.querySelector('.app-cta-card');
      var ctaContent = document.querySelector('.app-cta-content');
      if (ctaCard) {
        gsap.fromTo(
          ctaCard,
          {
            backgroundPosition: mobile ? '72% center' : '62% center',
            opacity: 0.9
          },
          {
            backgroundPosition: 'center center',
            opacity: 1,
            duration: 1,
            ease: EASE,
            scrollTrigger: scrollOnce(ctaCard, 'top 84%')
          }
        );

        if (!mobile) {
          gsap.to(ctaCard, {
            backgroundPosition: '48% center',
            ease: 'none',
            scrollTrigger: {
              trigger: ctaCard,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.45
            }
          });
        }
      }

      if (ctaContent) {
        gsap.from(ctaContent.children, {
          y: moveYSm,
          opacity: 0,
          duration: DUR,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: scrollOnce(ctaContent, 'top 82%'),
          clearProps: 'transform,opacity'
        });
      }

      /* ---- Footer (scroll) ---- */
      var footerGrid = document.querySelector('.footer-grid');
      if (footerGrid) {
        gsap.from(
          gsap.utils.toArray('.footer-brand, .footer-col, .footer-cert'),
          {
            y: moveYSm,
            opacity: 0,
            duration: DUR,
            stagger: 0.1,
            ease: EASE,
            scrollTrigger: scrollOnce(footerGrid, 'top 90%'),
            clearProps: 'transform,opacity'
          }
        );
      }
    }, document.body);
  }

  function boot() {
    if (ctx) {
      ctx.revert();
      ctx = null;
    }
    ScrollTrigger.getAll().forEach(function (st) {
      st.kill();
    });
    initAnimations();
    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      ScrollTrigger.refresh();
    }, 200);
  });

  window.addEventListener('beforeunload', function () {
    if (ctx) ctx.revert();
  });
})();
