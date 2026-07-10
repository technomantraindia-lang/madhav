/* ==========================================================================
   Madhav Polymers — Quality & Compliance Page Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==========================================
  // 1. FAQ ACCORDION LOGIC
  // ==========================================
  var accHeaders = document.querySelectorAll('.q-acc-header');

  accHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var item = this.parentElement;
      var content = this.nextElementSibling;
      var icon = this.querySelector('.q-acc-icon');
      var isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close all other accordion items
      document.querySelectorAll('.q-acc-item').forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          var otherHeader = otherItem.querySelector('.q-acc-header');
          var otherContent = otherHeader.nextElementSibling;
          otherHeader.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 2. TESTIMONIALS SLIDER LOGIC
  // ==========================================
  var slides = document.querySelectorAll('.q-testimonial-slide');
  var prevBtn = document.getElementById('slider-prev');
  var nextBtn = document.getElementById('slider-next');
  var currentSlideIndex = 0;

  if (slides.length > 0 && prevBtn && nextBtn) {
    var showSlide = function (index) {
      // Wrap-around index bounds
      if (index >= slides.length) {
        currentSlideIndex = 0;
      } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
      } else {
        currentSlideIndex = index;
      }

      // Hide all slides
      slides.forEach(function (slide, idx) {
        if (idx === currentSlideIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    prevBtn.addEventListener('click', function () {
      showSlide(currentSlideIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
      showSlide(currentSlideIndex + 1);
    });

    // Auto rotate every 8 seconds
    var autoPlayTimer = setInterval(function () {
      showSlide(currentSlideIndex + 1);
    }, 8000);

    // Pause autoplay on mouse enter / button clicks
    var pauseAutoplay = function () {
      clearInterval(autoPlayTimer);
    };

    prevBtn.addEventListener('mousedown', pauseAutoplay);
    nextBtn.addEventListener('mousedown', pauseAutoplay);
    var sliderWrap = document.getElementById('q-testimonial-slider');
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', pauseAutoplay);
    }
  }

  // ==========================================
  // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ==========================================
  var animatedElements = document.querySelectorAll(
    '.q-philosophy-card, .q-cert-card, .q-lab-col, .q-lab-center, .q-props-card, .q-flow-step, .q-detail-card, .q-table-wrap, .q-partner-card, .q-testimonial-slider, .q-accordion'
  );

  if ('IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    var revealCallback = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    };

    var observer = new IntersectionObserver(revealCallback, observerOptions);

    animatedElements.forEach(function (element) {
      // Add standard preparation style (hidden initially)
      element.style.opacity = '0';
      element.style.transform = 'translateY(24px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      
      observer.observe(element);
    });

    // CSS injection for animated states to avoid stylesheet clutter
    var styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = '.reveal-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(styleSheet);
  }
});
