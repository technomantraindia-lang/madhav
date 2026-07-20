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
                '<li><a href="rp-compound-details.html" id="nav-rp">RP Compound</a></li>' +
                '<li><a href="pvc-masterbatches-details.html" id="nav-mb">PVC Masterbatches</a></li>' +
                '<li><a href="special-compounds-details.html" id="nav-sp">Special Compounds</a></li>' +
              '</ul>' +
            '</li>' +
            '<li class="has-dropdown">' +
              '<a href="applications.html" class="' + navClass('applications').trim() + '" id="nav-apps">Applications <span class="arrow">&#9662;</span></a>' +
              '<ul class="dropdown">' +
                '<li><a href="application-details.html?app=wire-cable" id="nav-app-wire">Wire &amp; Cable</a></li>' +
                '<li><a href="application-details.html?app=pipes-fittings" id="nav-app-pipe">PVC Pipes</a></li>' +
                '<li><a href="application-details.html?app=footwear" id="nav-app-foot">Footwear</a></li>' +
                '<li><a href="application-details.html?app=molding-others" id="nav-app-mold">Soft PVC Molding</a></li>' +
              '</ul>' +
            '</li>' +
            '<li><a href="resources.html" class="' + navClass('resources').trim() + '" id="nav-resources">Resources</a></li>' +
            '<li><a href="quality.html" class="' + navClass('quality').trim() + '" id="nav-quality">Quality</a></li>' +
            '<li><a href="contact-us.html" class="' + navClass('contact').trim() + '" id="nav-contact">Contact Us</a></li>' +
          '</ul>' +
        '</nav>' +
        '<button type="button" class="btn-quote" id="get-quote-btn" aria-haspopup="dialog" aria-controls="quote-modal">' +
          'Get a Quote' +
          '<span class="btn-quote-icon" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" width="14" height="14">' +
              '<path d="M5 12h12M13 8l4 4-4 4" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
          '</span>' +
        '</button>' +
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
            '<li><a href="contact-us.html" id="foot-contact">Contact Us</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>PRODUCTS</h4>' +
          '<ul>' +
            '<li><a href="product-details.html" id="foot-pvc">PVC Compound</a></li>' +
            '<li><a href="rp-compound-details.html" id="foot-rp">RP Compound</a></li>' +
            '<li><a href="pvc-masterbatches-details.html" id="foot-mb">PVC Masterbatches</a></li>' +
            '<li><a href="special-compounds-details.html" id="foot-sp">Special Compounds</a></li>' +
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

  var quoteModalHTML =
    '<div class="quote-modal" id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title" hidden>' +
      '<div class="quote-modal-backdrop" data-quote-close></div>' +
      '<div class="quote-modal-dialog" role="document">' +
        '<button type="button" class="quote-modal-close" data-quote-close aria-label="Close quote form">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<div class="quote-modal-head">' +
          '<span class="quote-modal-pill">Request a Quote</span>' +
          '<h2 id="quote-modal-title">Get a Quote</h2>' +
          '<p>Share your requirements and our team will get back to you within 24 hours.</p>' +
        '</div>' +
        '<form class="quote-form" id="quote-form" novalidate>' +
          '<div class="quote-form-row">' +
            '<label class="quote-field">' +
              '<span class="quote-label">Full Name <em>*</em></span>' +
              '<input type="text" name="fullName" placeholder="Enter your full name" required autocomplete="name" />' +
            '</label>' +
            '<label class="quote-field">' +
              '<span class="quote-label">Email Address <em>*</em></span>' +
              '<input type="email" name="email" placeholder="name@company.com" required autocomplete="email" />' +
            '</label>' +
          '</div>' +
          '<div class="quote-form-row">' +
            '<label class="quote-field">' +
              '<span class="quote-label">Phone Number <em>*</em></span>' +
              '<input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required autocomplete="tel" />' +
            '</label>' +
            '<label class="quote-field">' +
              '<span class="quote-label">Company Name <em>*</em></span>' +
              '<input type="text" name="company" placeholder="Your company name" required autocomplete="organization" />' +
            '</label>' +
          '</div>' +
          '<div class="quote-form-row">' +
            '<label class="quote-field">' +
              '<span class="quote-label">Product Interest <em>*</em></span>' +
              '<select name="product" required>' +
                '<option value="" disabled selected>Select product</option>' +
                '<option value="pvc-compound">PVC Compound</option>' +
                '<option value="rp-compound">RP Compound</option>' +
                '<option value="masterbatch">PVC Masterbatches</option>' +
                '<option value="special-compound">Special Compounds</option>' +
                '<option value="not-sure">Not sure / Need recommendation</option>' +
              '</select>' +
            '</label>' +
            '<label class="quote-field">' +
              '<span class="quote-label">Application / Industry <em>*</em></span>' +
              '<select name="industry" required>' +
                '<option value="" disabled selected>Select application</option>' +
                '<option value="wire-cable">Wire &amp; Cable</option>' +
                '<option value="pipes-fittings">Pipes &amp; Fittings</option>' +
                '<option value="footwear">Footwear</option>' +
                '<option value="profiles-building">Profiles &amp; Building</option>' +
                '<option value="roofing">Roofing</option>' +
                '<option value="molding">Soft PVC Molding</option>' +
                '<option value="medical">Medical</option>' +
                '<option value="agriculture">Agriculture</option>' +
                '<option value="other">Other</option>' +
              '</select>' +
            '</label>' +
          '</div>' +
          '<div class="quote-form-row">' +
            '<label class="quote-field">' +
              '<span class="quote-label">City / Location</span>' +
              '<input type="text" name="city" placeholder="City, State" autocomplete="address-level2" />' +
            '</label>' +
            '<label class="quote-field">' +
              '<span class="quote-label">Estimated Quantity</span>' +
              '<input type="text" name="quantity" placeholder="e.g. 5 MT / month" />' +
            '</label>' +
          '</div>' +
          '<label class="quote-field quote-field--full">' +
            '<span class="quote-label">Your Requirement <em>*</em></span>' +
            '<textarea name="requirement" rows="4" placeholder="Tell us about grades, specs, timeline, or any special needs..." required></textarea>' +
          '</label>' +
          '<button type="submit" class="quote-submit-btn">' +
            'Submit Quote Request' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="16" height="16" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</button>' +
          '<p class="quote-form-note">We typically respond within 24 business hours.</p>' +
          '<input type="text" name="website" class="quote-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
          '<p class="quote-form-status" id="quote-form-status" role="status" aria-live="polite" hidden></p>' +
        '</form>' +
      '</div>' +
    '</div>';

  var headerMount = document.getElementById('site-header');
  var footerMount = document.getElementById('site-footer');

  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;

  if (!document.getElementById('quote-modal')) {
    document.body.insertAdjacentHTML('beforeend', quoteModalHTML);
  }
})();
