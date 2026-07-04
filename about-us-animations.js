/* About Us — scroll reveals, counters, hovers */
(function () {
  'use strict';

  if (!document.body.classList.contains('au-page')) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  function ready(cb) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cb);
    } else {
      cb();
    }
  }

  function parseCount(text) {
    const cleaned = text.replace(/,/g, '').trim();
    const match = cleaned.match(/^([\d.]+)(.*)$/);
    if (!match) return null;
    return { value: parseFloat(match[1]), suffix: match[2] || '' };
  }

  function formatCount(value, suffix, useComma) {
    const n = Math.round(value);
    const body = useComma ? n.toLocaleString('en-US') : String(n);
    return body + suffix;
  }

  function animateCount(el, target, suffix, duration, useComma) {
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = formatCount(target * eased, suffix, useComma);
      if (p < 1) requestAnimationFrame(tick);
      else el.closest('.au-impact-card')?.classList.add('is-counted');
    }
    requestAnimationFrame(tick);
  }

  function addReveal(el, type, delay) {
    el.classList.add('au-reveal', 'au-reveal--' + type);
    el.style.setProperty('--au-delay', delay + 's');
  }

  function setupReveals() {
    const heroContent = document.querySelector('.au-hero-content');
    if (heroContent) {
      Array.from(heroContent.children).forEach(function (el, i) {
        addReveal(el, 'up', i * 0.12);
      });
      document.querySelectorAll('.au-hero-card').forEach(function (el, i) {
        addReveal(el, 'scale', 0.5 + i * 0.1);
      });
    }

    const groups = [
      { root: '.au-mission-vision-grid', type: 'up', childSel: '.au-mv-card', stagger: 0.15 },
      { root: '.au-innovation-center', type: 'right', childSel: ':scope > *', stagger: 0.1 },
      { root: '.au-innovation-list', type: 'up', childSel: '.au-innovation-item', stagger: 0.12 },
      { root: '.au-values-head', type: 'up', childSel: ':scope > *', stagger: 0.08 },
      { root: '.au-values-grid', type: 'up', childSel: '.au-value-card', stagger: 0.07 },
      { root: '.au-manufacturing-left', type: 'left', childSel: ':scope > *', stagger: 0.1 },
      { root: '.au-process', type: 'up', childSel: '.au-process-step', stagger: 0.14 },
      { root: '.au-impact-left', type: 'left', childSel: ':scope > *', stagger: 0.1 },
      { root: '.au-impact-stats', type: 'scale', childSel: '.au-impact-card', stagger: 0.08 },
      { root: '.au-industries-head', type: 'up', childSel: ':scope > *', stagger: 0.1 },
      { root: '.au-industries-grid', type: 'up', childSel: '.au-industry-card', stagger: 0.06 },
      { root: '.au-quality-left', type: 'left', childSel: ':scope > *', stagger: 0.1 },
      { root: '.au-quality-cards', type: 'up', childSel: '.au-quality-item', stagger: 0.1 },
      { root: '.au-testimonial-bar', type: 'scale', childSel: ':scope > *', stagger: 0.12 },
      { root: '.au-cta-grid', type: 'up', childSel: ':scope > *', stagger: 0.15 }
    ];

    groups.forEach(function (g) {
      const root = document.querySelector(g.root);
      if (!root) return;
      const children = g.childSel.startsWith(':scope')
        ? Array.from(root.children)
        : root.querySelectorAll(g.childSel);
      children.forEach(function (el, i) {
        if (el.classList.contains('au-values-accent')) return;
        addReveal(el, g.type, i * g.stagger);
      });
    });

    const accent = document.querySelector('.au-values-accent');
    if (accent) accent.classList.add('au-reveal', 'au-reveal--scale');
  }

  function setupObserver() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    document.querySelectorAll('.au-reveal').forEach(function (el) {
      observer.observe(el);
    });

    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains('au-process')) {
            el.classList.add('is-line-drawn');
          }
          if (el.classList.contains('au-innovation')) {
            el.classList.add('is-parallax');
          }
          el.classList.add('is-visible');
          sectionObserver.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.au-process, .au-innovation, .au-cta-right, .au-testimonial-bar').forEach(function (el) {
      sectionObserver.observe(el);
    });
  }

  function setupCounters() {
    document.querySelectorAll('.au-impact-card .num').forEach(function (el) {
      const parsed = parseCount(el.textContent);
      if (!parsed) return;
      const useComma = el.textContent.includes(',');
      const obs = new IntersectionObserver(
        function (entries, o) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animateCount(el, parsed.value, parsed.suffix, 1800, useComma);
            o.unobserve(el);
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
    });
  }

  function setupHovers() {
    if (isMobile) return;
    const hoverSelectors = [
      '.au-mv-card',
      '.au-hero-card',
      '.au-innovation-item',
      '.au-value-card',
      '.au-process-step',
      '.au-impact-card',
      '.au-industry-card',
      '.au-quality-item',
      '.au-testimonial-bar',
      '.au-cta-right'
    ];
    hoverSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.addEventListener('mouseenter', function () { el.classList.add('is-hover'); }, { passive: true });
        el.addEventListener('mouseleave', function () { el.classList.remove('is-hover'); }, { passive: true });
      });
    });
  }

  function setupTestimonial() {
    const copy = document.querySelector('.au-testimonial-copy');
    const dots = document.querySelectorAll('.au-testimonial-dots span');
    const prev = document.querySelector('.au-testimonial-nav .prev');
    const next = document.querySelector('.au-testimonial-nav .next');
    if (!copy || !dots.length) return;

    let index = 1;
    const slides = [
      {
        lines: [
          'Madhav Polymers has been a reliable partner in our growth journey. Their quality, consistency,',
          'and commitment to timelines are truly commendable.'
        ],
        name: 'Rahul Mehta',
        role: 'Procurement Head',
        company: 'Leading PVC Pipe Manufacturer'
      },
      {
        lines: [
          'Their technical expertise and consistent compound quality have helped us scale production',
          'with confidence and meet strict industry standards every time.'
        ],
        name: 'Amit Sharma',
        role: 'Operations Director',
        company: 'Major Wire & Cable Manufacturer'
      },
      {
        lines: [
          'From sampling to bulk supply, Madhav Polymers delivers on time with compounds that perform',
          'exactly as promised — a partner we trust for the long term.'
        ],
        name: 'Priya Nair',
        role: 'Quality Manager',
        company: 'PVC Profiles & Fittings Co.'
      }
    ];

    function renderSlide(i) {
      const s = slides[i];
      const textEl = copy.querySelector('.au-testimonial-text');
      const nameEl = document.querySelector('.au-author-info h4');
      const roleEl = document.querySelector('.au-author-info p:not(.au-author-company)');
      const companyEl = document.querySelector('.au-author-company');
      if (!textEl) return;

      copy.classList.add('is-fading');
      setTimeout(function () {
        textEl.innerHTML =
          '<span class="au-testimonial-line">' + s.lines[0] + '</span>' +
          '<span class="au-testimonial-line">' + s.lines[1] + '</span>';
        if (nameEl) nameEl.textContent = s.name;
        if (roleEl) roleEl.textContent = s.role;
        if (companyEl) companyEl.textContent = s.company;
        dots.forEach(function (d, di) {
          d.classList.toggle('active', di === i);
          d.setAttribute('aria-current', di === i ? 'true' : 'false');
        });
        copy.classList.remove('is-fading');
      }, 320);
    }

    function go(dir) {
      index = (index + dir + slides.length) % slides.length;
      renderSlide(index);
    }

    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        index = i;
        renderSlide(index);
      });
    });
  }

  function setupHero() {
    const hero = document.querySelector('.au-hero');
    if (!hero) return;
    requestAnimationFrame(function () {
      hero.classList.add('is-hero-ready');
      hero.querySelectorAll('.au-reveal').forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('is-visible');
        }, 80 + i * 100);
      });
    });
  }

  function setupParallax() {
    if (prefersReducedMotion || isMobile) return;
    const hero = document.querySelector('.au-hero');
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const y = window.scrollY;
          if (hero && y < window.innerHeight) {
            hero.style.setProperty('--au-parallax', (y * 0.18) + 'px');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  ready(function () {
    document.body.classList.add('au-animations-on');

    if (prefersReducedMotion) {
      document.querySelectorAll('.au-reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    setupReveals();
    setupHero();
    setupObserver();
    setupCounters();
    setupHovers();
    setupTestimonial();
    setupParallax();
  });
})();
