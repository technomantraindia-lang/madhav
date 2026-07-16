/* ============================================
   MADHAV POLYMERS - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const currentPage = document.body.getAttribute('data-page') || 'home';

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    document.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 640) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let scrollTicking = false;

  function currentFile() {
    const path = window.location.pathname.split('/').pop();
    return path || 'index.html';
  }

  function isSamePage(linkPath) {
    if (!linkPath) return true;
    const file = currentFile();
    return linkPath === file || (linkPath === 'index.html' && file === '');
  }

  function setPageActiveNav() {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      if (href.indexOf('#') !== -1) return;
      link.classList.remove('active');
      if (currentPage === 'home' && (href === 'index.html' || href === './index.html' || href === '/')) {
        link.classList.add('active');
      }
      if (currentPage === 'about' && href.indexOf('about-us.html') !== -1) {
        link.classList.add('active');
      }
      if (currentPage === 'products' && href.indexOf('products.html') !== -1) {
        link.classList.add('active');
      }
      if (currentPage === 'applications' && href.indexOf('applications.html') !== -1) {
        link.classList.add('active');
      }
      if (currentPage === 'resources' && href.indexOf('resources.html') !== -1) {
        link.classList.add('active');
      }
      if (currentPage === 'quality' && href.indexOf('quality.html') !== -1) {
        link.classList.add('active');
      }
      if (currentPage === 'contact' && href.indexOf('contact-us.html') !== -1) {
        link.classList.add('active');
      }
    });
  }

  function onScroll() {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle('header-scrolled', y > 20);
    }

    let current = '';
    sections.forEach(function (section) {
      if (y >= section.offsetTop - 110) {
        current = section.getAttribute('id');
      }
    });

    setPageActiveNav();

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      if (href.indexOf('#') === -1) return;

      const parts = href.split('#');
      const linkPath = parts[0];
      const hash = parts[1];

      if (!isSamePage(linkPath)) return;

      if (hash && hash === current) {
        link.classList.add('active');
      } else if (hash) {
        link.classList.remove('active');
      }
    });

    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();

  function scrollToTarget(target) {
    const offset = 110;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const parts = href.split('#');
      const linkPath = parts[0];
      const hash = parts[1];

      if (linkPath && !isSamePage(linkPath)) return;

      if (!hash) return;

      const target = document.getElementById(hash);
      if (target) {
        e.preventDefault();
        scrollToTarget(target);
        if (navMenu) navMenu.classList.remove('open');
      }
    });
  });

  /* ---- Get a Quote modal (header button only) ---- */
  var quoteModal = document.getElementById('quote-modal');
  var quoteBtn = document.getElementById('get-quote-btn');
  var quoteForm = document.getElementById('quote-form');
  var quoteStatus = document.getElementById('quote-form-status');
  var lastFocus = null;

  function openQuoteModal() {
    if (!quoteModal) return;
    lastFocus = document.activeElement;
    quoteModal.hidden = false;
    requestAnimationFrame(function () {
      quoteModal.classList.add('is-open');
    });
    document.body.classList.add('quote-modal-open');
    var firstInput = quoteModal.querySelector('input, select, textarea, button');
    if (firstInput) firstInput.focus();
  }

  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.classList.remove('is-open');
    document.body.classList.remove('quote-modal-open');
    setTimeout(function () {
      if (!quoteModal.classList.contains('is-open')) {
        quoteModal.hidden = true;
      }
    }, 250);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  if (quoteBtn && quoteModal) {
    quoteBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openQuoteModal();
    });
  }

  if (quoteModal) {
    quoteModal.querySelectorAll('[data-quote-close]').forEach(function (el) {
      el.addEventListener('click', closeQuoteModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && quoteModal.classList.contains('is-open')) {
        closeQuoteModal();
      }
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var fields = quoteForm.querySelectorAll('[required]');
      var valid = true;

      fields.forEach(function (field) {
        var wrap = field.closest('.quote-field');
        var ok = !!String(field.value || '').trim();
        if (field.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        }
        if (wrap) wrap.classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        if (quoteStatus) {
          quoteStatus.hidden = false;
          quoteStatus.style.color = '#b91c1c';
          quoteStatus.textContent = 'Please fill in all required fields correctly.';
        }
        return;
      }

      if (!window.MadhavMail || typeof window.MadhavMail.sendFormMail !== 'function') {
        if (quoteStatus) {
          quoteStatus.hidden = false;
          quoteStatus.style.color = '#b91c1c';
          quoteStatus.textContent = 'Mail script not loaded. Please refresh and try again.';
        }
        return;
      }

      var submitBtn = quoteForm.querySelector('.quote-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      if (quoteStatus) {
        quoteStatus.hidden = false;
        quoteStatus.style.color = '#5a5a6a';
        quoteStatus.textContent = 'Sending your quote request...';
      }

      var fd = new FormData(quoteForm);
      window.MadhavMail.sendFormMail({
        formType: 'quote',
        fullName: fd.get('fullName') || '',
        email: fd.get('email') || '',
        phone: fd.get('phone') || '',
        company: fd.get('company') || '',
        product: fd.get('product') || '',
        industry: fd.get('industry') || '',
        city: fd.get('city') || '',
        quantity: fd.get('quantity') || '',
        requirement: fd.get('requirement') || '',
        website: fd.get('website') || '',
      }).then(function () {
        if (quoteStatus) {
          quoteStatus.style.color = '#15803d';
          quoteStatus.textContent = 'Thank you! Your quote request has been emailed to us. We will contact you soon.';
        }
        quoteForm.reset();
        quoteForm.querySelectorAll('.is-invalid').forEach(function (el) {
          el.classList.remove('is-invalid');
        });
        setTimeout(closeQuoteModal, 1800);
      }).catch(function (err) {
        if (quoteStatus) {
          quoteStatus.style.color = '#b91c1c';
          quoteStatus.textContent = (err && err.message) ? err.message : 'Could not send. Please try again or email madhavpoly7827@gmail.com.';
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Quote Request<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        }
      });
    });
  }

});
