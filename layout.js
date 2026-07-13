/* ============================================
   Shared header & footer — all pages
   ============================================ */

(function () {
  'use strict';

  var page = document.body.getAttribute('data-page') || 'home';

  function navClass(name) {
    if (name === 'products' && page === 'product-details') return ' nav-link active';
    return page === name ? ' nav-link active' : ' nav-link';
  }

  var headerHTML =
    '<header class="header" id="header">' +
      '<div class="container nav-container">' +
        '<a href="index.html" class="logo" id="logo-link">' +
          '<img src="header section logo.png" alt="Madhav Polymers" class="logo-img" />' +
        '</a>' +
        '<nav class="nav-menu" id="nav-menu">' +
          '<ul class="nav-list">' +
            '<li><a href="index.html" class="' + navClass('home').trim() + '" id="nav-home">Home</a></li>' +
            '<li><a href="about-us.html" class="' + navClass('about').trim() + '" id="nav-about">About Us</a></li>' +
            '<li class="has-dropdown">' +
              '<a href="products.html" class="' + navClass('products').trim() + '" id="nav-products">Products <span class="arrow">&#9662;</span></a>' +
              '<ul class="dropdown">' +
                '<li><a href="product-details.html" id="nav-pvc">PVC Compound</a></li>' +
                '<li><a href="products.html?cat=rp-compound" id="nav-rp">RP Compound</a></li>' +
                '<li><a href="products.html?cat=masterbatch" id="nav-mb">PVC Masterbatches</a></li>' +
                '<li><a href="products.html?cat=special-compound" id="nav-sp">Special Compounds</a></li>' +
              '</ul>' +
            '</li>' +
            '<li class="has-dropdown">' +
              '<a href="applications.html" class="' + navClass('applications').trim() + '" id="nav-apps">Applications <span class="arrow">&#9662;</span></a>' +
              '<ul class="dropdown">' +
                '<li><a href="applications.html#wire-cable" id="nav-app-wire">Wire &amp; Cable</a></li>' +
                '<li><a href="applications.html#pipes-fittings" id="nav-app-pipe">PVC Pipes</a></li>' +
                '<li><a href="applications.html#footwear" id="nav-app-foot">Footwear</a></li>' +
                '<li><a href="applications.html#molding-others" id="nav-app-mold">Soft PVC Molding</a></li>' +
              '</ul>' +
            '</li>' +
            '<li><a href="resources.html" class="' + navClass('resources').trim() + '" id="nav-resources">Resources</a></li>' +
            '<li><a href="quality.html" class="' + navClass('quality').trim() + '" id="nav-quality">Quality</a></li>' +
            '<li><a href="index.html#contact" class="nav-link" id="nav-contact">Contact Us</a></li>' +
          '</ul>' +
        '</nav>' +
        '<a href="index.html#contact" class="btn-quote" id="get-quote-btn">' +
          'Get a Quote' +
          '<span class="btn-quote-icon" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" width="14" height="14">' +
              '<path d="M5 12h12M13 8l4 4-4 4" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
          '</span>' +
        '</a>' +
        '<button class="hamburger" id="hamburger" aria-label="Toggle menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</header>';

  var footerHTML =
    '<footer class="footer" id="contact">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a href="index.html" class="footer-logo" id="footer-logo-link">' +
            '<img src="footer logo.png" alt="Madhav Polymers" class="footer-logo-img" loading="lazy" decoding="async" />' +
          '</a>' +
          '<div class="social-links">' +
            '<a href="#" class="social-btn" id="social-fb" aria-label="Facebook">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>' +
            '</a>' +
            '<a href="#" class="social-btn" id="social-ig" aria-label="Instagram">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' +
            '</a>' +
            '<a href="#" class="social-btn" id="social-li" aria-label="LinkedIn">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>QUICK LINKS</h4>' +
          '<ul>' +
            '<li><a href="about-us.html" id="foot-about">About Us</a></li>' +
            '<li><a href="products.html" id="foot-products">Our Products</a></li>' +
            '<li><a href="applications.html" id="foot-apps">Applications</a></li>' +
            '<li><a href="quality.html" id="foot-quality">Quality</a></li>' +
            '<li><a href="resources.html" id="foot-resources">Resources</a></li>' +
            '<li><a href="index.html#contact" id="foot-contact">Contact Us</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>PRODUCTS</h4>' +
          '<ul>' +
            '<li><a href="product-details.html" id="foot-pvc">PVC Compound</a></li>' +
            '<li><a href="products.html?cat=rp-compound" id="foot-rp">RP Compound</a></li>' +
            '<li><a href="products.html?cat=masterbatch" id="foot-mb">PVC Masterbatches</a></li>' +
            '<li><a href="products.html?cat=special-compound" id="foot-sp">Special Compounds</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col contact-col">' +
          '<h4>CONTACT US</h4>' +
          '<ul>' +
            '<li>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.62-1.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg>' +
              '7827791911 | 9910411361' +
            '</li>' +
            '<li>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
              'madhavpoly7827@gmail.com' +
            '</li>' +
            '<li>' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
              '148, Gopal Charan Estate-2, Bakrol-Bujarang, Ahmedabad - 382433, Gujarat, India' +
            '</li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-cert">' +
          '<h4>CERTIFICATION</h4>' +
          '<img src="Untitled design - 3 icon.png" alt="ISO 9001:2015 Certification" class="footer-cert-img" loading="lazy" decoding="async" />' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="footer-bottom-inner">' +
          '<p>&#169; 2025 Madhav Polymers. All Rights Reserved.</p>' +
          '<div class="footer-links">' +
            '<a href="#" id="privacy-link">Privacy Policy</a>' +
            '<span>|</span>' +
            '<a href="#" id="terms-link">Terms &amp; Conditions</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var headerMount = document.getElementById('site-header');
  var footerMount = document.getElementById('site-footer');

  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;
})();
