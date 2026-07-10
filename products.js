/* ============================================
   MADHAV POLYMERS - Products Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Element Selectors ---
  const catTabs = document.querySelectorAll('.cat-tab');
  const productCards = Array.from(document.querySelectorAll('.prod-card'));
  const cardsGrid = document.getElementById('prod-cards-grid');

  // Sidebar Filters
  const sidebarCheckboxes = document.querySelectorAll('.sidebar-checkbox input[type="checkbox"]');
  const catCheckboxes = {
    'pvc-compound': document.getElementById('filter-pvc'),
    'rp-compound': document.getElementById('filter-rp'),
    'masterbatch': document.getElementById('filter-mb2'),
    'special-compound': document.getElementById('filter-sp2')
  };

  const appCheckboxes = [
    { id: 'app-wire2', value: 'wire' },
    { id: 'app-pipe2', value: 'pipe' },
    { id: 'app-foot2', value: 'footwear' },
    { id: 'app-prof', value: 'profile' },
    { id: 'app-hose', value: 'hose' },
    { id: 'app-mold2', value: 'mold' }
  ];

  const indCheckboxes = [
    { id: 'ind-elec', value: 'elec' },
    { id: 'ind-cons', value: 'cons' },
    { id: 'ind-auto', value: 'auto' },
    { id: 'ind-foot3', value: 'foot' },
    { id: 'ind-pack', value: 'pack' },
    { id: 'ind-cg', value: 'cg' }
  ];

  // Sorting and Views
  const sortSelect = document.getElementById('sort-select');
  const btnGrid = document.getElementById('view-grid-btn');
  const btnList = document.getElementById('view-list-btn');
  const btnAllProducts = document.getElementById('fp-all');

  // Industries Carousel
  const carouselTrack = document.getElementById('prod-ind-track');
  const btnPrev = document.getElementById('ind-prev');
  const btnNext = document.getElementById('ind-next');

  // Sidebar View More
  const btnViewMoreApps = document.getElementById('view-more-apps');
  const btnViewMoreInds = document.getElementById('view-more-inds');

  let activeCategory = 'all'; // Category set by top tabs ('all', 'pvc-compound', etc.)
  let carouselIndex = 0;

  // ============================================
  // 1. CAROUSEL FUNCTIONALITY
  // ============================================
  function initCarousel() {
    if (!carouselTrack || !btnPrev || !btnNext) return;

    const slides = carouselTrack.querySelectorAll('.prod-ind-slide');
    if (slides.length === 0) return;

    function getSlideWidth() {
      const slide = slides[0];
      const style = window.getComputedStyle(slide);
      const width = slide.getBoundingClientRect().width;
      const marginRight = parseFloat(style.marginRight) || 0;
      return width + marginRight;
    }

    function scrollCarousel(direction) {
      const trackWidth = carouselTrack.getBoundingClientRect().width;
      const containerWidth = carouselTrack.parentElement.getBoundingClientRect().width;
      const slideWidthPlusGap = getSlideWidth() || 132; // Fallback slide width + gap

      // Calculate max scroll steps
      const maxScroll = Math.max(0, trackWidth - containerWidth);
      const maxIndex = Math.ceil(maxScroll / slideWidthPlusGap);

      if (direction === 'next') {
        carouselIndex = Math.min(carouselIndex + 1, maxIndex);
      } else {
        carouselIndex = Math.max(carouselIndex - 1, 0);
      }

      const offset = carouselIndex * slideWidthPlusGap;
      carouselTrack.style.transform = `translateX(-${Math.min(offset, maxScroll)}px)`;

      // Disable/Enable buttons accordingly
      btnPrev.style.opacity = carouselIndex === 0 ? '0.4' : '1';
      btnNext.style.opacity = offset >= maxScroll ? '0.4' : '1';
    }

    btnNext.addEventListener('click', () => scrollCarousel('next'));
    btnPrev.addEventListener('click', () => scrollCarousel('prev'));

    // Responsive reset on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        carouselIndex = 0;
        carouselTrack.style.transform = 'translateX(0)';
        btnPrev.style.opacity = '0.4';
        btnNext.style.opacity = '1';
      }, 200);
    });

    // Initial state
    btnPrev.style.opacity = '0.4';
  }

  // ============================================
  // 2. SIDEBAR CHECKBOX STYLE SYNC
  // ============================================
  function initCheckboxSync() {
    sidebarCheckboxes.forEach(checkbox => {
      // Set initial class on load
      const label = checkbox.closest('.sidebar-checkbox');
      if (label) {
        label.classList.toggle('checked', checkbox.checked);
      }

      checkbox.addEventListener('change', function () {
        const label = this.closest('.sidebar-checkbox');
        if (label) {
          label.classList.toggle('checked', this.checked);
        }
        
        // If sidebar category checkbox is changed, sync it with top tabs
        if (Object.values(catCheckboxes).includes(this)) {
          syncSidebarToTabs();
        } else {
          filterProducts();
        }
      });
    });
  }

  // Sync category tabs at the top based on sidebar checks
  function syncSidebarToTabs() {
    const activeCheckedCategories = Object.keys(catCheckboxes).filter(key => {
      const checkbox = catCheckboxes[key];
      return checkbox && checkbox.checked;
    });

    catTabs.forEach(tab => tab.classList.remove('active'));

    if (activeCheckedCategories.length === 1) {
      activeCategory = activeCheckedCategories[0];
      const targetTab = document.querySelector(`.cat-tab[data-cat="${activeCategory}"]`);
      if (targetTab) targetTab.classList.add('active');
      btnAllProducts.classList.remove('active');
    } else if (activeCheckedCategories.length === 0 || activeCheckedCategories.length === Object.keys(catCheckboxes).length) {
      activeCategory = 'all';
      btnAllProducts.classList.add('active');
    } else {
      activeCategory = 'mixed';
      btnAllProducts.classList.remove('active');
    }

    filterProducts();
  }

  // ============================================
  // 3. CATEGORY TABS EVENT LISTENERS (TOP TABS)
  // ============================================
  function initCategoryTabs() {
    catTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const category = this.getAttribute('data-cat');
        
        catTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        btnAllProducts.classList.remove('active');

        activeCategory = category;

        // Sync sidebar category checkboxes: check ONLY the selected category
        Object.keys(catCheckboxes).forEach(key => {
          const cb = catCheckboxes[key];
          if (cb) {
            cb.checked = (key === category);
            const label = cb.closest('.sidebar-checkbox');
            if (label) label.classList.toggle('checked', cb.checked);
          }
        });

        filterProducts();
      });
    });

    if (btnAllProducts) {
      btnAllProducts.addEventListener('click', function () {
        catTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeCategory = 'all';

        // Check ALL sidebar category checkboxes (default state)
        Object.values(catCheckboxes).forEach(cb => {
          if (cb) {
            cb.checked = true;
            const label = cb.closest('.sidebar-checkbox');
            if (label) label.classList.add('checked');
          }
        });

        filterProducts();
      });
    }
  }

  // ============================================
  // 4. FILTERING LOGIC
  // ============================================
  function filterProducts() {
    // Gather checked categories from sidebar
    const checkedCats = Object.keys(catCheckboxes).filter(key => {
      const cb = catCheckboxes[key];
      return cb && cb.checked;
    });

    // Gather checked applications
    const checkedApps = appCheckboxes.filter(item => {
      const cb = document.getElementById(item.id);
      return cb && cb.checked;
    }).map(item => item.value);

    // Gather checked industries
    const checkedInds = indCheckboxes.filter(item => {
      const cb = document.getElementById(item.id);
      return cb && cb.checked;
    }).map(item => item.value);

    let matchCount = 0;

    productCards.forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      const cardApps = (card.getAttribute('data-app') || '').split(' ');
      const cardInds = (card.getAttribute('data-ind') || '').split(' ');

      // 1. Category check
      // If nothing checked in sidebar categories, show all. Otherwise show checked ones.
      let catMatch = checkedCats.length === 0 || checkedCats.includes(cardCat);

      // 2. Application check
      let appMatch = checkedApps.length === 0 || cardApps.some(app => checkedApps.includes(app));

      // 3. Industry check
      let indMatch = checkedInds.length === 0 || cardInds.some(ind => checkedInds.includes(ind));

      if (catMatch && appMatch && indMatch) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update product counts dynamically in the sidebar based on total matched
    updateSidebarCounts();

    // Show empty state if no products match
    showNoResultsMsg(matchCount === 0);
  }

  // Dynamic counter updater for categories in the sidebar
  function updateSidebarCounts() {
    Object.keys(catCheckboxes).forEach(key => {
      const cb = catCheckboxes[key];
      if (!cb) return;
      
      const label = cb.closest('.sidebar-checkbox');
      const countPill = label ? label.querySelector('.filter-count') : null;
      if (!countPill) return;

      // Count matches just for this category, respecting other filters
      const checkedApps = appCheckboxes.filter(item => {
        const c = document.getElementById(item.id);
        return c && c.checked;
      }).map(item => item.value);

      const checkedInds = indCheckboxes.filter(item => {
        const c = document.getElementById(item.id);
        return c && c.checked;
      }).map(item => item.value);

      let count = 0;
      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        const cardApps = (card.getAttribute('data-app') || '').split(' ');
        const cardInds = (card.getAttribute('data-ind') || '').split(' ');

        if (cardCat === key) {
          let appMatch = checkedApps.length === 0 || cardApps.some(app => checkedApps.includes(app));
          let indMatch = checkedInds.length === 0 || cardInds.some(ind => checkedInds.includes(ind));
          if (appMatch && indMatch) {
            count++;
          }
        }
      });

      countPill.textContent = count;
    });
  }

  // No products found message helper
  let noResultsEl = null;
  function showNoResultsMsg(show) {
    if (show) {
      if (!noResultsEl) {
        noResultsEl = document.createElement('div');
        noResultsEl.style.gridColumn = '1 / -1';
        noResultsEl.style.textAlign = 'center';
        noResultsEl.style.padding = '48px 24px';
        noResultsEl.style.background = '#fff';
        noResultsEl.style.borderRadius = '12px';
        noResultsEl.style.border = '1px dashed #ccc';
        noResultsEl.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.5" width="48" height="48" style="margin: 0 auto 12px; display: block;">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3 style="font-size: 16px; font-weight: 700; color: #333; margin-bottom: 6px;">No Products Found</h3>
          <p style="font-size: 13px; color: #777; margin-bottom: 16px;">Try adjusting your sidebar filters or selecting another category.</p>
          <button id="reset-filters-btn" class="filter-pill active" style="margin: 0 auto; border:none;">Clear All Filters</button>
        `;
        cardsGrid.appendChild(noResultsEl);

        const resetBtn = document.getElementById('reset-filters-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', resetAllFilters);
        }
      }
      noResultsEl.style.display = 'block';
    } else {
      if (noResultsEl) {
        noResultsEl.style.display = 'none';
      }
    }
  }

  function resetAllFilters() {
    sidebarCheckboxes.forEach(cb => {
      cb.checked = true; // default select category, unselect specific apps/inds
    });

    // Reset app and industry checks to unchecked
    appCheckboxes.forEach(item => {
      const cb = document.getElementById(item.id);
      if (cb) cb.checked = false;
    });

    indCheckboxes.forEach(item => {
      const cb = document.getElementById(item.id);
      if (cb) cb.checked = false;
    });

    sidebarCheckboxes.forEach(cb => {
      const label = cb.closest('.sidebar-checkbox');
      if (label) label.classList.toggle('checked', cb.checked);
    });

    // Reset top tabs
    catTabs.forEach(t => t.classList.remove('active'));
    if (btnAllProducts) btnAllProducts.classList.add('active');
    activeCategory = 'all';

    filterProducts();
  }

  // ============================================
  // 5. SORTING LOGIC
  // ============================================
  function initSorting() {
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function () {
      const sortValue = this.value;

      productCards.sort((a, b) => {
        if (sortValue === 'Name A–Z') {
          const titleA = a.querySelector('h3').textContent.trim().toLowerCase();
          const titleB = b.querySelector('h3').textContent.trim().toLowerCase();
          return titleA.localeCompare(titleB);
        } else if (sortValue === 'Newest') {
          const dateA = new Date(a.getAttribute('data-date') || '2025-01-01');
          const dateB = new Date(b.getAttribute('data-date') || '2025-01-01');
          return dateB - dateA; // Newest first
        } else {
          // 'Featured' or default
          const featA = parseInt(a.getAttribute('data-featured') || '999');
          const featB = parseInt(b.getAttribute('data-featured') || '999');
          return featA - featB;
        }
      });

      // Clear grid and append sorted cards
      productCards.forEach(card => {
        cardsGrid.appendChild(card);
      });
      if (noResultsEl) {
        cardsGrid.appendChild(noResultsEl); // keep placeholder at bottom
      }
    });
  }

  // ============================================
  // 6. LAYOUT VIEW TOGGLE (GRID vs LIST)
  // ============================================
  function initViewToggle() {
    if (!btnGrid || !btnList || !cardsGrid) return;

    btnGrid.addEventListener('click', function () {
      btnGrid.classList.add('active');
      btnList.classList.remove('active');
      cardsGrid.classList.remove('list-view');
    });

    btnList.addEventListener('click', function () {
      btnList.classList.add('active');
      btnGrid.classList.remove('active');
      cardsGrid.classList.add('list-view');
    });
  }

  // ============================================
  // 7. SIDEBAR VIEW MORE COLLAPSE/EXPAND
  // ============================================
  function initSidebarViewMore() {
    // Hide applications after first 4 items initially
    const appList = document.querySelectorAll('.sidebar-block:nth-of-type(2) .sidebar-filter-list li');
    if (appList.length > 4 && btnViewMoreApps) {
      for (let i = 4; i < appList.length; i++) {
        appList[i].style.display = 'none';
      }
      btnViewMoreApps.addEventListener('click', function () {
        const isCollapsed = this.textContent.includes('+');
        for (let i = 4; i < appList.length; i++) {
          appList[i].style.display = isCollapsed ? '' : 'none';
        }
        this.textContent = isCollapsed ? 'View Less -' : 'View More +';
      });
    } else if (btnViewMoreApps) {
      btnViewMoreApps.style.display = 'none';
    }

    // Hide industries after first 4 items initially
    const indList = document.querySelectorAll('.sidebar-block:nth-of-type(3) .sidebar-filter-list li');
    if (indList.length > 4 && btnViewMoreInds) {
      for (let i = 4; i < indList.length; i++) {
        indList[i].style.display = 'none';
      }
      btnViewMoreInds.addEventListener('click', function () {
        const isCollapsed = this.textContent.includes('+');
        for (let i = 4; i < indList.length; i++) {
          indList[i].style.display = isCollapsed ? '' : 'none';
        }
        this.textContent = isCollapsed ? 'View Less -' : 'View More +';
      });
    } else if (btnViewMoreInds) {
      btnViewMoreInds.style.display = 'none';
    }
  }

  // ============================================
  // 8. PARSE URL QUERY PARAMETERS ON PAGE LOAD
  // ============================================
  function parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');

    if (catParam) {
      const targetTab = document.querySelector(`.cat-tab[data-cat="${catParam}"]`);
      if (targetTab) {
        // Trigger click on corresponding category tab
        targetTab.click();
        
        // Scroll slightly down to product list category section for a better UX
        const browseCategorySection = document.getElementById('browse-category');
        if (browseCategorySection) {
          setTimeout(() => {
            const offset = 90;
            const top = browseCategorySection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }, 400);
        }
        return;
      }
    }

    // Default load: show PVC Compounds as active tab
    const defaultTab = document.getElementById('cat-pvc');
    if (defaultTab) {
      defaultTab.click();
    } else {
      filterProducts();
    }
  }

  // ============================================
  // INITIALIZATION RUN
  // ============================================
  initCarousel();
  initCheckboxSync();
  initCategoryTabs();
  initSorting();
  initViewToggle();
  initSidebarViewMore();
  parseUrlParameters(); // Run URL parsing at the end to trigger initial filter
});
