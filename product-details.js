/* ============================================
   Product Details Page — Interactions
   ============================================ */

(function () {
  'use strict';

  /* ---- Product-specific page content ---- */
  var productKey = new URLSearchParams(window.location.search).get('product');

  function checkIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" fill="#3D1F8C"/><path d="M8 12l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function applyRpCompoundPage() {
    if (productKey !== 'rp-compound') return;

    document.body.classList.add('pd-rp-page');
    document.title = 'RP Compound – Madhav Polymers | Pressure-Resistant Polymer Compounds';

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'Explore pressure-resistant RP Compounds from Madhav Polymers for pipes, fittings, tanks, irrigation, and demanding industrial applications.';
    }

    var breadcrumbCurrent = document.querySelector('.pd-breadcrumb span:last-child');
    var grade = document.querySelector('.pd-grade-badge');
    var heroTitle = document.querySelector('.pd-hero-title');
    var heroDesc = document.querySelector('.pd-hero-desc');
    var heroFeatures = document.querySelector('.pd-hero-features');
    var heroBackground = document.querySelector('.pd-hero-bg');
    var benefits = document.querySelector('.pd-benefits-box ul');
    var forms = document.querySelector('.pd-forms-box');

    if (heroBackground) {
      heroBackground.src = 'RP compund banner section.png';
      heroBackground.alt = 'RP compound pellets, pipes, and fittings';
    }
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'RP Compound';
    if (grade) grade.textContent = 'PREMIUM GRADE';
    if (heroTitle) heroTitle.textContent = 'RP Compound';
    if (heroDesc) {
      heroDesc.textContent = 'High-quality RP compounds designed for pressure applications, offering excellent flow properties, dimensional accuracy, and long-term durability for pipes, fittings, tanks, and pressure systems.';
    }
    if (heroFeatures) {
      heroFeatures.innerHTML =
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_product_hero_icons_svg/consistent_quality.svg" alt="" /></div><span>Superior<br>Durability</span></div>' +
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_product_hero_icons_svg/advanced_technology.svg" alt="" /></div><span>Excellent<br>Flowability</span></div>' +
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_quality_icons_svg_pack/consistent_quality_shield.svg" alt="" /></div><span>High-Pressure<br>Resistance</span></div>' +
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_product_hero_icons_svg/tailored_for_every_need.svg" alt="" /></div><span>Wide Range of<br>Applications</span></div>';
    }
    if (benefits) {
      benefits.innerHTML = [
        'Excellent Pressure Resistance',
        'High Impact Strength',
        'Corrosion & Chemical Resistant',
        'Low Maintenance',
        'Smooth Surface Finish'
      ].map(function (item) {
        return '<li>' + checkIcon() + item + '</li>';
      }).join('');
    }
    if (forms) forms.innerHTML = '<strong>Available Forms:</strong> Granules | Pellets';

    var overviewLabel = document.querySelector('#tab-overview .section-label');
    var overviewTitle = document.querySelector('#tab-overview h2');
    var overviewDesc = document.querySelector('#tab-overview .pd-overview-desc');
    var overviewChecks = document.querySelector('#tab-overview .pd-check-list');
    var mainImage = document.querySelector('.pd-overview-main-img img');
    var gallery = document.querySelector('.pd-thumb-gallery');

    if (overviewLabel) overviewLabel.textContent = 'ABOUT RP COMPOUND';
    if (overviewTitle) overviewTitle.innerHTML = 'Engineered for Pressure.<br><span class="purple">Built for Reliability.</span>';
    if (overviewDesc) {
      overviewDesc.textContent = 'Our RP Compounds are specially formulated to withstand high internal pressure and harsh environments. With excellent mechanical properties, superior processing, and long service life, they are the ideal choice for demanding pressure applications.';
    }
    if (overviewChecks) {
      overviewChecks.innerHTML = [
        'High Pressure Performance',
        'Excellent Dimensional Stability',
        'Corrosion & Chemical Resistant',
        'Smooth & Leak-Proof Finish',
        'RoHS & REACH Compliant'
      ].map(function (item) {
        return '<li>' + checkIcon() + item + '</li>';
      }).join('');
    }
    if (mainImage) {
      mainImage.src = 'Wide Range of Applications 1.png';
      mainImage.alt = 'RP compound pressure pipes and fittings';
    }
    if (gallery) {
      gallery.innerHTML =
        '<button class="pd-thumb active" aria-label="View pressure pipes and fittings"><img src="Wide Range of Applications 1.png" alt="" /></button>' +
        '<button class="pd-thumb" aria-label="View industrial pipes"><img src="pipe 7 fitting.png" alt="" /></button>' +
        '<button class="pd-thumb" aria-label="View pipe fittings"><img src="Untitled design/2.png" alt="" /></button>' +
        '<button class="pd-thumb" aria-label="View RP pellets"><img src="white_pvc_pellets_card_cut_1024x1536.png" alt="" /></button>';
    }

    var specIntro = document.querySelector('#tab-specifications .pd-overview-desc');
    if (specIntro) {
      specIntro.textContent = 'Our RP compounds are available in pressure-rated grades engineered for pipes, fittings, tanks, irrigation, and industrial fluid-handling applications.';
    }
    var specCards = document.querySelector('#tab-specifications .pd-spec-grid');
    if (specCards) {
      specCards.innerHTML =
        '<div class="pd-spec-card"><strong>Pressure Performance</strong><span>High-pressure grades available</span></div>' +
        '<div class="pd-spec-card"><strong>Density Range</strong><span>1.45 – 1.55 g/cm³</span></div>' +
        '<div class="pd-spec-card"><strong>Processing</strong><span>Extrusion &amp; Injection Molding</span></div>' +
        '<div class="pd-spec-card"><strong>Applications</strong><span>Pipes, Fittings, Tanks &amp; Irrigation</span></div>' +
        '<div class="pd-spec-card"><strong>Packaging</strong><span>25 kg Bags, Custom Bulk</span></div>' +
        '<div class="pd-spec-card"><strong>Available Forms</strong><span>Granules &amp; Pellets</span></div>';
    }

    var variants = document.getElementById('variant-track');
    if (variants) {
      variants.innerHTML =
        '<article class="pd-variant-card active"><h3>RP-U High-Pressure Compound</h3><p>Engineered for high-pressure pipes and industrial applications.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>' +
        '<article class="pd-variant-card"><h3>RP-C Chemical Resistant Compound</h3><p>Ideal for transporting chemicals with superior fatigue and pressure resistance.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>' +
        '<article class="pd-variant-card"><h3>RP-T Tank &amp; Fitting Compound</h3><p>Designed for pressure tanks, fittings, and heavy-duty assemblies.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>' +
        '<article class="pd-variant-card"><h3>RP-S Special Application Compound</h3><p>Custom-engineered for unique pressure-system requirements.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>';
    }

    var appItems = [
      ['madhav_applications_process_icons_svg_pack/pipes_fittings.svg', 'Pressure Pipes'],
      ['madhav_applications_process_icons_svg_pack/molding_others.svg', 'Fittings & Connectors'],
      ['madhav_applications_process_icons_svg_pack/roofing.svg', 'Water Tank Systems'],
      ['madhav_applications_process_icons_svg_pack/agriculture.svg', 'Irrigation Systems'],
      ['madhav_applications_process_icons_svg_pack/profile_building.svg', 'Industrial Piping'],
      ['madhav_applications_process_icons_svg_pack/consistent_performance.svg', 'Storage Tanks']
    ];
    var inlineApps = document.querySelector('.pd-app-grid-inline');
    var appGrid = document.querySelector('.pd-triple-section .pd-app-grid');
    if (inlineApps) {
      inlineApps.innerHTML = appItems.map(function (item) {
        return '<div class="pd-app-item"><img src="' + item[0] + '" alt="" width="40" height="40" /><span>' + item[1] + '</span></div>';
      }).join('');
    }
    if (appGrid) {
      appGrid.innerHTML = appItems.map(function (item) {
        return '<div class="pd-app-pill"><div class="pd-app-pill-icon"><img src="' + item[0] + '" alt="" /></div><span>' + item[1] + '</span></div>';
      }).join('');
    }

    var performance = document.querySelector('.pd-performance-bars');
    if (performance) {
      performance.innerHTML = [
        ['Pressure Resistance', 95],
        ['Dimensional Stability', 94],
        ['Impact Strength', 92],
        ['Chemical Resistance', 95],
        ['Surface Finish Quality', 93]
      ].map(function (item, index) {
        var gradientClass = index === 1 || index === 4 ? ' pd-perf-fill--gradient' : '';
        return '<div class="pd-perf-item"><div class="pd-perf-label"><span>' + item[0] + '</span><span>' + item[1] + '%</span></div><div class="pd-perf-bar"><div class="pd-perf-fill' + gradientClass + '" style="width:' + item[1] + '%"></div></div></div>';
      }).join('');
    }

    var technicalRows = [
      ['Density', 'ASTM D792', 'g/cm³', '1.45 – 1.55'],
      ['Tensile Strength', 'ASTM D638', 'MPa', '45 – 55'],
      ['Tensile Elongation at Break', 'ASTM D638', '%', '80 – 120'],
      ['Flexural Strength', 'ASTM D790', 'MPa', '70 – 90'],
      ['Impact Strength (Notched)', 'ASTM D256', 'J/m', '50 – 80'],
      ['Vicat Softening Temperature', 'ASTM D1525', '°C', '75 – 90'],
      ['Hydrostatic Pressure Resistance', 'Internal Method', 'MPa', '10 – 25']
    ];
    document.querySelectorAll('.pd-data-table tbody').forEach(function (tbody) {
      tbody.innerHTML = technicalRows.map(function (row) {
        return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td><td>' + row[3] + '</td></tr>';
      }).join('');
    });

    var relatedCards = document.querySelectorAll('.pd-related-card');
    if (relatedCards[0]) {
      relatedCards[0].querySelector('img').src = 'PVC Compound.jpg';
      relatedCards[0].querySelector('img').alt = 'PVC Compound';
      relatedCards[0].querySelector('h4').textContent = 'PVC Compound';
      relatedCards[0].querySelector('a').href = 'product-details.html';
    }

    var ctaTitle = document.querySelector('.pd-cta-text h2');
    var ctaCopy = document.querySelector('.pd-cta-text p');
    if (ctaTitle) ctaTitle.textContent = 'Need a Custom RP Compound?';
    if (ctaCopy) ctaCopy.textContent = 'Our experts will help you develop the right solution for your application.';

    var brochureLinks = document.querySelectorAll('.pd-download-item');
    if (brochureLinks[0]) brochureLinks[0].lastChild.textContent = ' RP Compound Product Brochure (PDF)';
  }

  function applyMasterbatchPage() {
    if (productKey !== 'pvc-masterbatches') return;

    document.body.classList.add('pd-masterbatch-page');
    document.title = 'PVC Masterbatches – Madhav Polymers | Vibrant, Consistent Colour';

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'Explore high-quality PVC masterbatches with vibrant colour, excellent dispersion, UV stability, and consistent processing performance.';
    }

    var breadcrumbCurrent = document.querySelector('.pd-breadcrumb span:last-child');
    var grade = document.querySelector('.pd-grade-badge');
    var heroTitle = document.querySelector('.pd-hero-title');
    var heroDesc = document.querySelector('.pd-hero-desc');
    var heroFeatures = document.querySelector('.pd-hero-features');
    var heroBackground = document.querySelector('.pd-hero-bg');
    var benefits = document.querySelector('.pd-benefits-box ul');
    var forms = document.querySelector('.pd-forms-box');

    if (heroBackground) {
      heroBackground.src = 'PVC masterbatches banner.png';
      heroBackground.alt = 'Bowls of vibrant PVC masterbatch granules';
    }
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'PVC Masterbatches';
    if (grade) grade.textContent = 'PREMIUM GRADE';
    if (heroTitle) heroTitle.textContent = 'PVC Masterbatches';
    if (heroDesc) {
      heroDesc.textContent = 'High-quality PVC masterbatches offering vibrant colors, excellent dispersion, UV stability, and consistent performance for a wide range of extrusion and molding applications.';
    }
    if (heroFeatures) {
      heroFeatures.innerHTML =
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_product_hero_icons_svg/consistent_quality.svg" alt="" /></div><span>Vibrant &amp;<br>Consistent Color</span></div>' +
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_product_hero_icons_svg/advanced_technology.svg" alt="" /></div><span>Excellent<br>Dispersion</span></div>' +
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_quality_icons_svg_pack/consistent_quality_shield.svg" alt="" /></div><span>UV Weather<br>Resistant</span></div>' +
        '<div class="pd-hero-feat"><div class="pd-feat-icon"><img src="madhav_product_hero_icons_svg/tailored_for_every_need.svg" alt="" /></div><span>Wide Range of<br>Applications</span></div>';
    }
    if (benefits) {
      benefits.innerHTML = [
        'Brilliant & Consistent Colors',
        'Excellent Heat Stability',
        'Superior Dispersion',
        'UV & Weather Resistance',
        'Cost Effective Solutions'
      ].map(function (item) {
        return '<li>' + checkIcon() + item + '</li>';
      }).join('');
    }
    if (forms) forms.innerHTML = '<strong>Available Forms:</strong> Granules';

    var overviewLabel = document.querySelector('#tab-overview .section-label');
    var overviewTitle = document.querySelector('#tab-overview h2');
    var overviewDesc = document.querySelector('#tab-overview .pd-overview-desc');
    var overviewChecks = document.querySelector('#tab-overview .pd-check-list');
    var mainImage = document.querySelector('.pd-overview-main-img img');
    var gallery = document.querySelector('.pd-thumb-gallery');

    if (overviewLabel) overviewLabel.textContent = 'ABOUT PVC MASTERBATCHES';
    if (overviewTitle) overviewTitle.innerHTML = 'Color That Enhances.<br><span class="purple">Quality That Lasts.</span>';
    if (overviewDesc) {
      overviewDesc.textContent = 'Our PVC Masterbatches are concentrated mixtures of pigments and additives encapsulated in PVC resin, designed to impart excellent color, performance, and durability to your final products.';
    }
    if (overviewChecks) {
      overviewChecks.innerHTML = [
        'Brilliant Color Strength',
        'Excellent Dispersion',
        'High & Light Stability',
        'UV & Weather Resistance',
        'Non-Toxic & RoHS Compliant'
      ].map(function (item) {
        return '<li>' + checkIcon() + item + '</li>';
      }).join('');
    }
    if (mainImage) {
      mainImage.src = 'ABOUT PVC MASTERBATCHES.jpg';
      mainImage.alt = 'PVC masterbatches in vibrant colours';
    }
    if (gallery) {
      gallery.innerHTML =
        '<button class="pd-thumb active" aria-label="View coloured masterbatches"><img src="ABOUT PVC MASTERBATCHES.jpg" alt="" /></button>' +
        '<button class="pd-thumb" aria-label="View green masterbatches"><img src="ABOUT PVC MASTERBATCHES 2.jpg" alt="" /></button>' +
        '<button class="pd-thumb" aria-label="View mixed colour masterbatches"><img src="ABOUT PVC MASTERBATCHES 3.jpg" alt="" /></button>' +
        '<button class="pd-thumb" aria-label="View blue speciality masterbatches"><img src="ABOUT PVC MASTERBATCHES 4.jpg" alt="" /></button>';
    }

    var specIntro = document.querySelector('#tab-specifications .pd-overview-desc');
    if (specIntro) {
      specIntro.textContent = 'Our PVC masterbatches are available in standard, special-effect, additive, and custom colour grades for consistent results across demanding processing applications.';
    }
    var specCards = document.querySelector('#tab-specifications .pd-spec-grid');
    if (specCards) {
      specCards.innerHTML =
        '<div class="pd-spec-card"><strong>Colour Range</strong><span>Standard, Custom &amp; Special Effects</span></div>' +
        '<div class="pd-spec-card"><strong>Pigment Content</strong><span>10 – 40%</span></div>' +
        '<div class="pd-spec-card"><strong>Processing</strong><span>Extrusion &amp; Injection Molding</span></div>' +
        '<div class="pd-spec-card"><strong>Light Fastness</strong><span>Rating 7 – 8</span></div>' +
        '<div class="pd-spec-card"><strong>Packaging</strong><span>25 kg Bags, Custom Bulk</span></div>' +
        '<div class="pd-spec-card"><strong>Available Form</strong><span>Granules</span></div>';
    }

    var variants = document.getElementById('variant-track');
    if (variants) {
      variants.innerHTML =
        '<article class="pd-variant-card active"><h3>Standard Color Masterbatches</h3><p>Wide range of standard colors with excellent performance.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>' +
        '<article class="pd-variant-card"><h3>Special Effect Masterbatches</h3><p>Metallic, fluorescent, and special effects for premium finishes.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>' +
        '<article class="pd-variant-card"><h3>Additive Masterbatches</h3><p>Functional masterbatches for enhanced properties and performance.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>' +
        '<article class="pd-variant-card"><h3>Custom Color Masterbatches</h3><p>Tailor-made colors to match your unique requirements.</p><a href="#" class="pd-learn-more">Learn More <span>&#8594;</span></a></article>';
    }

    var appItems = [
      ['madhav_applications_process_icons_svg_pack/pipes_fittings.svg', 'Pipes & Fittings'],
      ['madhav_applications_process_icons_svg_pack/wire_cable.svg', 'Wire & Cable'],
      ['madhav_applications_process_icons_svg_pack/profile_building.svg', 'Profiles & Building'],
      ['madhav_applications_process_icons_svg_pack/medical.svg', 'Sheet & Film'],
      ['madhav_applications_process_icons_svg_pack/roofing.svg', 'Flooring'],
      ['madhav_applications_process_icons_svg_pack/molding_others.svg', 'Injection Molding'],
      ['madhav_applications_process_icons_svg_pack/footwear.svg', 'Footwear'],
      ['madhav_applications_process_icons_svg_pack/consistent_performance.svg', 'Blow Molding']
    ];
    var inlineApps = document.querySelector('.pd-app-grid-inline');
    var appGrid = document.querySelector('.pd-triple-section .pd-app-grid');
    if (inlineApps) {
      inlineApps.innerHTML = appItems.slice(0, 6).map(function (item) {
        return '<div class="pd-app-item"><img src="' + item[0] + '" alt="" width="40" height="40" /><span>' + item[1] + '</span></div>';
      }).join('');
    }
    if (appGrid) {
      appGrid.innerHTML = appItems.map(function (item) {
        return '<div class="pd-app-pill"><div class="pd-app-pill-icon"><img src="' + item[0] + '" alt="" /></div><span>' + item[1] + '</span></div>';
      }).join('');
    }

    var processFlow = document.querySelector('.pd-process-flow');
    if (processFlow) {
      var processItems = [
        ['madhav_applications_process_icons_svg_pack/carefully_sourced_raw_materials.svg', 'Pigment Selection'],
        ['madhav_applications_process_icons_svg_pack/advanced_compounding.svg', 'Batch Compatibility'],
        ['madhav_applications_process_icons_svg_pack/precision_formulation.svg', 'Precise Dispersion'],
        ['madhav_applications_process_icons_svg_pack/rigorous_quality_checks.svg', 'Quality Testing'],
        ['madhav_applications_process_icons_svg_pack/consistent_performance.svg', 'Consistent Performance']
      ];
      processFlow.innerHTML = processItems.map(function (item, index) {
        var step = '<div class="pd-process-step"><div class="pd-process-icon"><img src="' + item[0] + '" alt="" /></div><span>' + item[1] + '</span></div>';
        var arrow = index < processItems.length - 1
          ? '<div class="pd-process-arrow" aria-hidden="true"><img src="madhav_applications_process_icons_svg_pack/process_arrow.svg" alt="" /></div>'
          : '';
        return step + arrow;
      }).join('');
    }

    var performance = document.querySelector('.pd-performance-bars');
    if (performance) {
      performance.innerHTML = [
        ['Color Strength', 95],
        ['Heat Stability', 93],
        ['Light Fastness', 90],
        ['Weather Resistance', 92],
        ['Dispersion Quality', 95]
      ].map(function (item, index) {
        var gradientClass = index === 3 || index === 4 ? ' pd-perf-fill--gradient' : '';
        return '<div class="pd-perf-item"><div class="pd-perf-label"><span>' + item[0] + '</span><span>' + item[1] + '%</span></div><div class="pd-perf-bar"><div class="pd-perf-fill' + gradientClass + '" style="width:' + item[1] + '%"></div></div></div>';
      }).join('');
    }

    var technicalRows = [
      ['Pigment Content', 'ASTM D5630', '%', '10 – 40'],
      ['Heat Stability', 'Internal Method', '°C', '180 – 200'],
      ['Light Fastness', 'ISO 105-B02', 'Rating', '7 – 8'],
      ['Weather Resistance', 'ASTM G154', 'Hours', '500+'],
      ['Melt Flow Index', 'ASTM D1238', 'g/10 min', '2 – 5'],
      ['Density', 'ASTM D792', 'g/cm³', '1.20 – 1.80']
    ];
    document.querySelectorAll('.pd-data-table tbody').forEach(function (tbody) {
      tbody.innerHTML = technicalRows.map(function (row) {
        return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td><td>' + row[3] + '</td></tr>';
      }).join('');
    });

    var relatedData = [
      ['PVC Compound.jpg', 'PVC Compound', 'product-details.html'],
      ['Untitled design-3.png', 'RP Compound', 'rp-compound-details.html'],
      ['Pipes & Fittings Compounds.jpg', 'Pipes & Fittings Compounds', 'product-details.html'],
      ['Special Compounds.jpg', 'Special Compounds', 'products.html?cat=special-compound']
    ];
    document.querySelectorAll('.pd-related-card').forEach(function (card, index) {
      if (!relatedData[index]) return;
      card.querySelector('img').src = relatedData[index][0];
      card.querySelector('img').alt = relatedData[index][1];
      card.querySelector('h4').textContent = relatedData[index][1];
      card.querySelector('a').href = relatedData[index][2];
    });

    var ctaImage = document.querySelector('.pd-cta-img');
    var ctaTitle = document.querySelector('.pd-cta-text h2');
    var ctaCopy = document.querySelector('.pd-cta-text p');
    if (ctaImage) {
      ctaImage.src = 'Untitled design.png';
      ctaImage.alt = 'Colour PVC masterbatches';
    }
    if (ctaTitle) ctaTitle.textContent = 'Need a Custom PVC Masterbatch?';
    if (ctaCopy) ctaCopy.textContent = 'Our experts will help you develop the right color and performance solution for your application.';

    var brochureLinks = document.querySelectorAll('.pd-download-item');
    if (brochureLinks[0]) brochureLinks[0].lastChild.textContent = ' PVC Masterbatches Product Brochure (PDF)';
  }

  applyRpCompoundPage();
  applyMasterbatchPage();

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

  /* ---- Scroll reveal motion system ---- */
  document.body.classList.add('pd-motion-ready');

  var revealGroups = [
    { selector: '.pd-stat-item', step: 70 },
    { selector: '.pd-tabs-wrap', step: 0 },
    { selector: '.pd-variants-section .section-label', step: 0 },
    { selector: '.pd-variant-card', step: 75 },
    { selector: '.pd-triple-col', step: 110 },
    { selector: '.pd-info-grid > .pd-info-col', step: 110 },
    { selector: '.pd-related-section .section-label', step: 0 },
    { selector: '.pd-related-card', step: 75 },
    { selector: '.pd-cta-wrap', step: 0 }
  ];

  var revealTargets = [];
  revealGroups.forEach(function (group) {
    document.querySelectorAll(group.selector).forEach(function (element, index) {
      element.classList.add('pd-reveal');
      element.style.setProperty('--pd-reveal-delay', (index * group.step) + 'ms');

      if (group.selector === '.pd-info-grid > .pd-info-col' && index === 0) {
        element.classList.add('pd-reveal-left');
      }
      if (group.selector === '.pd-info-grid > .pd-info-col' && index === 2) {
        element.classList.add('pd-reveal-right');
      }

      revealTargets.push(element);
    });
  });

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (target) {
      target.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px'
    });

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
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
