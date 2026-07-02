/* ============================================
   MADHAV POLYMERS - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

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
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
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

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        scrollToTarget(target);
        if (navMenu) navMenu.classList.remove('open');
      }
    });
  });

});
