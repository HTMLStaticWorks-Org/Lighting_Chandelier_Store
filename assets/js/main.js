/**
 * LUMORA — Luxury Lighting & Chandelier Showroom
 * Master JavaScript Application
 * Vanilla ES6, No external frameworks
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     00. THEME & RTL PERSISTENCE (Immediate Apply)
     -------------------------------------------------------------------------- */
  const THEME_STORAGE_KEY = 'lumora_theme_mode';
  const RTL_STORAGE_KEY = 'lumora_rtl_mode';

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function getSavedDir() {
    try {
      return localStorage.getItem(RTL_STORAGE_KEY) || 'ltr';
    } catch (e) {
      return 'ltr';
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {}
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      const isDark = theme === 'dark';
      btn.classList.toggle('is-active', isDark);
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const labelSpan = btn.querySelector('.theme-btn-label');
      if (labelSpan) {
        btn.innerHTML = isDark
          ? '<i class="bi bi-sun-fill"></i> <span class="theme-btn-label">Light</span>'
          : '<i class="bi bi-moon-stars"></i> <span class="theme-btn-label">Dark</span>';
      } else {
        btn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars"></i>';
      }
    });
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    try {
      localStorage.setItem(RTL_STORAGE_KEY, dir);
    } catch (e) {}
    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      const isRtl = dir === 'rtl';
      btn.classList.toggle('is-active', isRtl);
      btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
      btn.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      const labelSpan = btn.querySelector('.rtl-btn-label');
      if (labelSpan) {
        labelSpan.textContent = isRtl ? 'LTR' : 'RTL';
      }
    });
    const heroImg = document.querySelector('.hero-h1-bg-img');
    if (heroImg) {
      heroImg.style.transform = '';
    }
  }

  applyTheme(getSavedTheme());
  applyDir(getSavedDir());

  function initThemeAndRTL() {
    applyTheme(getSavedTheme());
    applyDir(getSavedDir());

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        applyDir(nextDir);
      });
    });
  }

  /* --------------------------------------------------------------------------
     01. PRODUCT CATALOG DATA (16+ DEMO PRODUCTS)
     -------------------------------------------------------------------------- */
  const PRODUCTS_DATA = [
    {
      id: 'lum-01',
      name: 'Aurelia Grand Crystal Chandelier',
      category: 'chandeliers',
      categoryLabel: 'Chandeliers',
      room: 'living',
      roomLabel: 'Living Room',
      style: 'classical',
      material: 'crystal',
      materialLabel: 'K9 Precision Crystal & Brass',
      finish: 'Brushed Champagne Gold',
      dimensions: '120 cm Dia × 140 cm H',
      price: 385000,
      badge: 'Signature Piece',
      image: 'assets/images/home/hero-chandelier.jpg',
      description: 'An architectural symphony of faceted precision-cut crystal droplets suspended from tiered champagne gold framework. Creates an awe-inspiring radiance across double-height living halls and grand entrance salons.'
    },
    {
      id: 'lum-02',
      name: 'Celestial Spiral Cascading Chandelier',
      category: 'chandeliers',
      categoryLabel: 'Chandeliers',
      room: 'entrance',
      roomLabel: 'Entrance & Hallway',
      style: 'sculptural',
      material: 'glass',
      materialLabel: 'Hand-blown Borosilicate Glass',
      finish: 'Matte Charcoal & Gold Leaf',
      dimensions: '90 cm Dia × 240 cm Drop',
      price: 420000,
      badge: 'Showroom Icon',
      image: 'assets/images/home-2/hero-staircase.jpg',
      description: 'Designed specifically for stairwells and soaring vertical volumes. Over sixty organic blown glass bubbles swirl in a helical descent, bathing transitional spaces in an ethereal warm glow.'
    },
    {
      id: 'lum-03',
      name: 'Solstice Brass & Smoked Glass Chandelier',
      category: 'chandeliers',
      categoryLabel: 'Chandeliers',
      room: 'dining',
      roomLabel: 'Dining Room',
      style: 'contemporary',
      material: 'brass',
      materialLabel: 'Solid Cast Brass & Smoked Glass',
      finish: 'Antiqued Satin Brass',
      dimensions: '110 cm Dia × 75 cm H',
      price: 275000,
      badge: 'Editorial Choice',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      description: 'Geometric arms extend in radial symmetry holding hand-blown smoked glass orbs. Provides warm, glare-free dining illumination with a striking modern European profile.'
    },
    {
      id: 'lum-04',
      name: 'Eos Sculptural Fluted Glass Pendant',
      category: 'pendant-lights',
      categoryLabel: 'Pendant Lights',
      room: 'dining',
      roomLabel: 'Dining Room',
      style: 'sculptural',
      material: 'glass',
      materialLabel: 'Artisanal Fluted Glass',
      finish: 'Champagne Gold Details',
      dimensions: '38 cm Dia × 55 cm H',
      price: 68000,
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80',
      description: 'Ribbed fluted glass catches natural daylight and refracts warm LED warmth into rhythmic light play. Exceptional installed in clusters of three over marble dining tables or kitchen islands.'
    },
    {
      id: 'lum-05',
      name: 'Vesper Brushed Brass Linear Pendant',
      category: 'pendant-lights',
      categoryLabel: 'Pendant Lights',
      room: 'kitchen',
      roomLabel: 'Kitchen',
      style: 'architectural',
      material: 'brass',
      materialLabel: 'Extruded Architectural Brass',
      finish: 'Hand-brushed Champagne Brass',
      dimensions: '150 cm L × 8 cm W × 12 cm H',
      price: 115000,
      badge: 'New Design',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
      description: 'Minimalist linear profile engineered with high CRI 95+ downward task lighting and soft upward ambient wash. Tailored for state-of-the-art kitchen islands and boardroom tables.'
    },
    {
      id: 'lum-06',
      name: 'Luna Hand-Blown Opal Pendant',
      category: 'pendant-lights',
      categoryLabel: 'Pendant Lights',
      room: 'bedroom',
      roomLabel: 'Bedroom',
      style: 'contemporary',
      material: 'glass',
      materialLabel: 'Opal Milk Glass & Brass',
      finish: 'Brushed Brass Accent',
      dimensions: '30 cm Dia',
      price: 48000,
      badge: 'Essential',
      image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80',
      description: 'A serene sphere of velvety matte opal glass, emitting tranquil diffuse light. Perfectly suited flanking bedroom bedsides as modern alternatives to conventional table lamps.'
    },
    {
      id: 'lum-07',
      name: 'Halo Architectural Flush Mount',
      category: 'ceiling-lights',
      categoryLabel: 'Ceiling Lights',
      room: 'bedroom',
      roomLabel: 'Bedroom',
      style: 'architectural',
      material: 'metal',
      materialLabel: 'Precision Spun Aluminium & Acrylic',
      finish: 'Charcoal Black & Gold Core',
      dimensions: '60 cm Dia × 9 cm Depth',
      price: 54000,
      badge: '',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1000&q=80',
      description: 'Subtle low-profile ceiling fixture with indirect perimeter corona glow. Eliminates ceiling glare while elevating modern apartment suites with modest ceiling clearances.'
    },
    {
      id: 'lum-08',
      name: 'Mirage Geometric Brass Ceiling Fixture',
      category: 'ceiling-lights',
      categoryLabel: 'Ceiling Lights',
      room: 'living',
      roomLabel: 'Living Room',
      style: 'contemporary',
      material: 'brass',
      materialLabel: 'Brushed Brass & Textured Glass',
      finish: 'Champagne Satin',
      dimensions: '75 cm W × 75 cm L × 14 cm Depth',
      price: 86000,
      badge: 'Featured',
      image: 'assets/images/products/mirage-ceiling.jpg',
      description: 'Intersecting square brass frames framing hand-poured textured glass diffusers. Blends structured architecture with soft decorative ceiling illumination.'
    },
    {
      id: 'lum-09',
      name: 'Tivoli Alabaster & Brass Sconce',
      category: 'wall-lights',
      categoryLabel: 'Wall Lights',
      room: 'entrance',
      roomLabel: 'Entrance & Hallway',
      style: 'classical',
      material: 'crystal',
      materialLabel: 'Natural Veined Spanish Alabaster',
      finish: 'Aged Warm Brass',
      dimensions: '16 cm W × 45 cm H × 10 cm Projection',
      price: 38000,
      badge: 'Artisanal',
      image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=80',
      description: 'Carved from authentic veined solid alabaster stone; each piece exhibits a distinct geological fingerprint when illuminated from within. Creates inviting hallway corridors.'
    },
    {
      id: 'lum-10',
      name: 'Eclipse Fluted Glass Wall Light',
      category: 'wall-lights',
      categoryLabel: 'Wall Lights',
      room: 'living',
      roomLabel: 'Living Room',
      style: 'contemporary',
      material: 'glass',
      materialLabel: 'Curved Fluted Glass & Deep Charcoal',
      finish: 'Matte Deep Charcoal',
      dimensions: '22 cm Dia × 8 cm Projection',
      price: 42000,
      badge: '',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
      description: 'Circular architectural sconce casting dual-directional halo glow up and down interior feature walls. Accentuates venetian plaster and textured wallpapers.'
    },
    {
      id: 'lum-11',
      name: 'Kanso Travertine & Brass Lamp',
      category: 'table-lamps',
      categoryLabel: 'Table Lamps',
      room: 'living',
      roomLabel: 'Living Room',
      style: 'minimalist',
      material: 'brass',
      materialLabel: 'Italian Travertine & Solid Brass',
      finish: 'Raw Travertine & Satin Brass',
      dimensions: '32 cm Dia × 48 cm H',
      price: 32000,
      badge: 'Limited',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
      description: 'Sculpted from porous Roman travertine with an articulated brass dome. A tactile accent lamp that grounds bedside credenzas and living room consoles with organic serenity.'
    },
    {
      id: 'lum-12',
      name: 'Novella Sculptural Ceramic Lamp',
      category: 'table-lamps',
      categoryLabel: 'Table Lamps',
      room: 'bedroom',
      roomLabel: 'Bedroom',
      style: 'sculptural',
      material: 'metal',
      materialLabel: 'Hand-thrown Ceramic & Linen Shade',
      finish: 'Warm Sand Matte Glaze',
      dimensions: '35 cm Dia × 56 cm H',
      price: 28500,
      badge: '',
      image: 'assets/images/products/novella-lamp.jpg',
      description: 'Organic vase-inspired silhouette hand-turned by master ceramists, topped with a custom Belgian linen drum shade for soft, soothing bedroom ambiance.'
    },
    {
      id: 'lum-13',
      name: 'Arcadian Curved Brass Floor Lamp',
      category: 'floor-lamps',
      categoryLabel: 'Floor Lamps',
      room: 'living',
      roomLabel: 'Living Room',
      style: 'contemporary',
      material: 'brass',
      materialLabel: 'Solid Brass & Honed Black Granite Base',
      finish: 'Brushed Champagne Gold',
      dimensions: '185 cm Reach × 210 cm H',
      price: 92000,
      badge: 'Statement',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80',
      description: 'A sweeping arch extending over low-profile modular seating without ceiling installation constraints. Weighted with a 24kg honed black granite plinth for steadfast stability.'
    },
    {
      id: 'lum-14',
      name: 'Monolith Charcoal Marble Floor Beacon',
      category: 'floor-lamps',
      categoryLabel: 'Floor Lamps',
      room: 'commercial',
      roomLabel: 'Commercial Spaces',
      style: 'sculptural',
      material: 'metal',
      materialLabel: 'Black Marquina Marble & Fluted Acrylic',
      finish: 'Deep Charcoal Anodised',
      dimensions: '25 cm W × 160 cm H',
      price: 108000,
      badge: '',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80',
      description: 'A monolithic vertical light column engineered for architectural reception lobbies, luxury suites, and library corners. Integrated touch dimming with warm-tone LED glow.'
    },
    {
      id: 'lum-15',
      name: 'Portico Architectural Bronze Lantern',
      category: 'outdoor-lighting',
      categoryLabel: 'Outdoor Lighting',
      room: 'entrance',
      roomLabel: 'Entrance & Hallway',
      style: 'classical',
      material: 'metal',
      materialLabel: 'Marine-grade Solid Bronze & Seeded Glass',
      finish: 'Natural Weathering Bronze',
      dimensions: '28 cm W × 62 cm H',
      price: 46000,
      badge: 'IP65 Rated',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
      description: 'Constructed to resist harsh coastal sea-spray and monsoon precipitation. Hand-blown seeded glass creates gentle light refractions across estate porticos and garden terraces.'
    },
    {
      id: 'lum-16',
      name: 'Vector Recessed Precision Downlight System',
      category: 'architectural-lighting',
      categoryLabel: 'Architectural Lighting',
      room: 'commercial',
      roomLabel: 'Commercial Spaces',
      style: 'architectural',
      material: 'metal',
      materialLabel: 'Die-cast Aluminium & Optical Baffle',
      finish: 'Trimless Deep Charcoal / White',
      dimensions: '75 mm Cutout × 95 mm Depth',
      price: 72000,
      badge: 'Pack of 6',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      description: 'Museum-grade trimless downlights featuring 30-degree deep tilt, zero glare honeycomb baffles, and CRI 98 color fidelity for illuminating art collections and architectural facades.'
    }
  ];

  /* --------------------------------------------------------------------------
     02. WISHLIST MANAGEMENT (localStorage)
     -------------------------------------------------------------------------- */
  const WISHLIST_STORAGE_KEY = 'lumora_luxury_wishlist';

  function getWishlist() {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(items) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
    updateWishlistBadges();
  }

  function toggleWishlistItem(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;
    if (index === -1) {
      wishlist.push(productId);
      added = true;
    } else {
      wishlist.splice(index, 1);
      added = false;
    }
    saveWishlist(wishlist);
    updateAllWishlistButtons();
    renderWishlistDrawer();
    return added;
  }

  function updateWishlistBadges() {
    const wishlist = getWishlist();
    const badgeElements = document.querySelectorAll('.wishlist-counter-badge');
    badgeElements.forEach((badge) => {
      badge.textContent = wishlist.length;
      badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
  }

  function updateAllWishlistButtons() {
    const wishlist = getWishlist();
    const buttons = document.querySelectorAll('[data-wishlist-toggle]');
    buttons.forEach((btn) => {
      const id = btn.getAttribute('data-wishlist-toggle');
      if (wishlist.includes(id)) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        btn.setAttribute('aria-label', 'Remove from Wishlist');
        btn.setAttribute('title', 'Remove from Wishlist');
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="bi bi-heart"></i>';
        btn.setAttribute('aria-label', 'Add to Wishlist');
        btn.setAttribute('title', 'Add to Wishlist');
      }
    });
  }

  /* --------------------------------------------------------------------------
     03. NUMBER FORMATTING (INR)
     -------------------------------------------------------------------------- */
  function formatINR(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  /* --------------------------------------------------------------------------
     04. GLOBAL HEADER & MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  function initHeaderAndNav() {
    const header = document.querySelector('.site-header');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    // Sticky Header Scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Active Page Indicator
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Hamburger Toggle
    function toggleMobileMenu(open) {
      const shouldOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
      if (shouldOpen) {
        mobileDrawer?.classList.add('open');
        mobileOverlay?.classList.add('open');
        hamburgerBtn?.classList.add('is-active');
        hamburgerBtn?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
      } else {
        mobileDrawer?.classList.remove('open');
        mobileOverlay?.classList.remove('open');
        hamburgerBtn?.classList.remove('is-active');
        hamburgerBtn?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    }

    hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());
    mobileOverlay?.addEventListener('click', () => toggleMobileMenu(false));

    // Close on navigation click
    mobileDrawer?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close button inside mobile drawer
    document.querySelectorAll('.mobile-drawer-close').forEach((btn) => {
      btn.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleMobileMenu(false);
        closeProductModal();
        closeWishlistDrawer();
      }
    });

    // Wishlist Drawer Trigger
    const wishlistBtns = document.querySelectorAll('.header-wishlist-trigger');
    wishlistBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openWishlistDrawer();
      });
    });

    // Wishlist Drawer Close
    const closeWishlistBtn = document.querySelector('.close-wishlist-drawer');
    closeWishlistBtn?.addEventListener('click', closeWishlistDrawer);
    document.querySelector('.wishlist-overlay')?.addEventListener('click', closeWishlistDrawer);

    updateWishlistBadges();
  }

  /* --------------------------------------------------------------------------
     05. WISHLIST DRAWER LOGIC
     -------------------------------------------------------------------------- */
  function openWishlistDrawer() {
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    hamburgerBtn?.classList.remove('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');

    const drawer = document.querySelector('.wishlist-drawer');
    const overlay = document.querySelector('.wishlist-overlay');
    renderWishlistDrawer();
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeWishlistDrawer() {
    const drawer = document.querySelector('.wishlist-drawer');
    const overlay = document.querySelector('.wishlist-overlay');
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function renderWishlistDrawer() {
    const listContainer = document.querySelector('.wishlist-items-list');
    if (!listContainer) return;

    const wishlistIds = getWishlist();
    const savedProducts = PRODUCTS_DATA.filter((p) => wishlistIds.includes(p.id));

    if (savedProducts.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--color-charcoal-muted);">
          <i class="bi bi-heart" style="font-size: 2.5rem; color: var(--color-champagne-gold); display: block; margin-bottom: 1rem;"></i>
          <p style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-deep-charcoal); margin-bottom: 0.5rem;">Your wishlist is empty</p>
          <p style="font-size: 0.875rem;">Explore our curated collection and save signature fixtures for your project.</p>
          <a href="products.html" class="btn btn-primary btn-sm" style="margin-top: 1rem;">Explore Collection</a>
        </div>
      `;
      return;
    }

    let html = '';
    let totalEstimate = 0;
    savedProducts.forEach((p) => {
      totalEstimate += p.price;
      html += `
        <div class="wishlist-item" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}" class="wishlist-thumb" loading="lazy">
          <div class="wishlist-info">
            <span style="font-size: 0.6875rem; text-transform: uppercase; color: var(--color-champagne-gold); font-weight: 600;">${p.categoryLabel}</span>
            <h4 style="font-size: 1rem; margin: 0.2rem 0; font-family: var(--font-serif);">${p.name}</h4>
            <span style="font-weight: 600; font-size: 0.9375rem;">${formatINR(p.price)}</span>
          </div>
          <button class="wishlist-remove-btn" data-remove-wishlist="${p.id}" aria-label="Remove item" title="Remove">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      `;
    });

    html += `
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-warm-grey-border);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1.25rem;">
          <span style="font-size: 0.875rem; color: var(--color-charcoal-muted);">Estimated Total (${savedProducts.length} items):</span>
          <span style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--color-deep-charcoal);">${formatINR(totalEstimate)}</span>
        </div>
        <a href="contact.html?enquiry=wishlist" class="btn btn-gold" style="width: 100%;">Enquire For Wishlist Items</a>
      </div>
    `;

    listContainer.innerHTML = html;

    listContainer.querySelectorAll('[data-remove-wishlist]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-wishlist');
        toggleWishlistItem(id);
      });
    });
  }

  /* --------------------------------------------------------------------------
     06. PRODUCT DETAIL MODAL
     -------------------------------------------------------------------------- */
  function openProductModal(productId) {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product) return;

    const modal = document.querySelector('.product-detail-modal');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-product-img');
    const modalCategory = modal.querySelector('.modal-product-category');
    const modalTitle = modal.querySelector('.modal-product-title');
    const modalPrice = modal.querySelector('.modal-product-price');
    const modalDesc = modal.querySelector('.modal-product-desc');
    const modalMaterial = modal.querySelector('.modal-product-material');
    const modalFinish = modal.querySelector('.modal-product-finish');
    const modalDimensions = modal.querySelector('.modal-product-dimensions');
    const modalWishlistBtn = modal.querySelector('.modal-wishlist-action');
    const modalEnquireBtn = modal.querySelector('.modal-enquire-action');

    if (modalImg) {
      modalImg.src = product.image;
      modalImg.alt = product.name;
    }
    if (modalCategory) modalCategory.textContent = product.categoryLabel;
    if (modalTitle) modalTitle.textContent = product.name;
    if (modalPrice) modalPrice.textContent = formatINR(product.price);
    if (modalDesc) modalDesc.textContent = product.description;
    if (modalMaterial) modalMaterial.textContent = product.materialLabel;
    if (modalFinish) modalFinish.textContent = product.finish;
    if (modalDimensions) modalDimensions.textContent = product.dimensions;

    if (modalWishlistBtn) {
      modalWishlistBtn.setAttribute('data-wishlist-toggle', product.id);
    }
    if (modalEnquireBtn) {
      modalEnquireBtn.href = `contact.html?product=${encodeURIComponent(product.name)}&category=${product.category}`;
    }

    updateAllWishlistButtons();

    modal.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeProductModal() {
    const modal = document.querySelector('.product-detail-modal');
    modal?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function initProductModal() {
    const modal = document.querySelector('.product-detail-modal');
    const closeBtn = modal?.querySelector('.modal-close-btn');

    closeBtn?.addEventListener('click', closeProductModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProductModal();
      }
    });

    document.addEventListener('click', (e) => {
      const quickViewBtn = e.target.closest('[data-quick-view]');
      if (quickViewBtn) {
        e.preventDefault();
        const id = quickViewBtn.getAttribute('data-quick-view');
        openProductModal(id);
      }

      const wishlistBtn = e.target.closest('[data-wishlist-toggle]');
      if (wishlistBtn) {
        e.preventDefault();
        const id = wishlistBtn.getAttribute('data-wishlist-toggle');
        toggleWishlistItem(id);
      }
    });
  }

  /* --------------------------------------------------------------------------
     07. PRODUCTS PAGE CATALOGUE & FILTER ENGINE
     -------------------------------------------------------------------------- */
  function initProductsPage() {
    const catalogGrid = document.querySelector('.product-catalogue-grid');
    if (!catalogGrid) return; // Not on products.html

    const searchInput = document.getElementById('filter-search');
    const roomSelect = document.getElementById('filter-room');
    const styleSelect = document.getElementById('filter-style');
    const materialSelect = document.getElementById('filter-material');
    const priceSelect = document.getElementById('filter-price');
    const sortSelect = document.getElementById('filter-sort');
    const clearBtn = document.getElementById('filter-clear');
    const countDisplay = document.getElementById('product-count-display');
    const categoryPills = document.querySelectorAll('.category-pill');

    let currentFilters = {
      category: 'all',
      room: 'all',
      style: 'all',
      material: 'all',
      price: 'all',
      search: '',
      sort: 'featured'
    };

    // Check URL parameters for direct deep-linking
    const urlParams = new URLSearchParams(window.location.search);
    const paramCategory = urlParams.get('category');
    const paramRoom = urlParams.get('room');
    const paramStyle = urlParams.get('style');

    if (paramCategory) {
      currentFilters.category = paramCategory.toLowerCase();
    }
    if (paramRoom && roomSelect) {
      currentFilters.room = paramRoom.toLowerCase();
      roomSelect.value = currentFilters.room;
    }
    if (paramStyle && styleSelect) {
      currentFilters.style = paramStyle.toLowerCase();
      styleSelect.value = currentFilters.style;
    }

    // Set initial category pill active state
    categoryPills.forEach((pill) => {
      const cat = pill.getAttribute('data-category');
      if (cat === currentFilters.category) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }

      pill.addEventListener('click', (e) => {
        e.preventDefault();
        categoryPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilters.category = cat;
        renderProducts();
      });
    });

    // Form inputs listeners
    searchInput?.addEventListener('input', (e) => {
      currentFilters.search = e.target.value.trim().toLowerCase();
      renderProducts();
    });

    roomSelect?.addEventListener('change', (e) => {
      currentFilters.room = e.target.value;
      renderProducts();
    });

    styleSelect?.addEventListener('change', (e) => {
      currentFilters.style = e.target.value;
      renderProducts();
    });

    materialSelect?.addEventListener('change', (e) => {
      currentFilters.material = e.target.value;
      renderProducts();
    });

    priceSelect?.addEventListener('change', (e) => {
      currentFilters.price = e.target.value;
      renderProducts();
    });

    sortSelect?.addEventListener('change', (e) => {
      currentFilters.sort = e.target.value;
      renderProducts();
    });

    clearBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      currentFilters = {
        category: 'all',
        room: 'all',
        style: 'all',
        material: 'all',
        price: 'all',
        search: '',
        sort: 'featured'
      };
      if (searchInput) searchInput.value = '';
      if (roomSelect) roomSelect.value = 'all';
      if (styleSelect) styleSelect.value = 'all';
      if (materialSelect) materialSelect.value = 'all';
      if (priceSelect) priceSelect.value = 'all';
      if (sortSelect) sortSelect.value = 'featured';
      categoryPills.forEach((p) => {
        if (p.getAttribute('data-category') === 'all') p.classList.add('active');
        else p.classList.remove('active');
      });
      renderProducts();
    });

    function renderProducts() {
      let filtered = PRODUCTS_DATA.filter((item) => {
        // Category
        if (currentFilters.category !== 'all' && item.category !== currentFilters.category) {
          return false;
        }
        // Room
        if (currentFilters.room !== 'all' && item.room !== currentFilters.room) {
          return false;
        }
        // Style
        if (currentFilters.style !== 'all' && item.style !== currentFilters.style) {
          return false;
        }
        // Material
        if (currentFilters.material !== 'all' && item.material !== currentFilters.material) {
          return false;
        }
        // Price Range
        if (currentFilters.price !== 'all') {
          if (currentFilters.price === 'under-50k' && item.price >= 50000) return false;
          if (currentFilters.price === '50k-100k' && (item.price < 50000 || item.price > 100000)) return false;
          if (currentFilters.price === '100k-250k' && (item.price < 100000 || item.price > 250000)) return false;
          if (currentFilters.price === 'above-250k' && item.price <= 250000) return false;
        }
        // Search
        if (currentFilters.search) {
          const hay = `${item.name} ${item.categoryLabel} ${item.roomLabel} ${item.materialLabel} ${item.description}`.toLowerCase();
          if (!hay.includes(currentFilters.search)) {
            return false;
          }
        }
        return true;
      });

      // Sorting
      if (currentFilters.sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentFilters.sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentFilters.sort === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      // Update count
      if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} lighting fixtures`;
      }

      if (filtered.length === 0) {
        catalogGrid.innerHTML = `
          <div class="no-products-msg">
            <i class="bi bi-lightbulb" style="font-size: 2.75rem; color: var(--color-champagne-gold); display: block; margin-bottom: 1rem;"></i>
            <h3 style="font-family: var(--font-serif); font-size: 1.75rem; margin-bottom: 0.5rem;">No matching lighting pieces found</h3>
            <p style="color: var(--color-charcoal-muted); margin-bottom: 1.5rem;">Try adjusting or clearing your active filters to view our full collection.</p>
            <button class="btn btn-outline" id="btn-reset-filters-inner">Reset All Filters</button>
          </div>
        `;
        document.getElementById('btn-reset-filters-inner')?.addEventListener('click', () => {
          clearBtn?.click();
        });
        return;
      }

      let html = '';
      filtered.forEach((p) => {
        html += `
          <article class="product-card reveal-fade" data-product-id="${p.id}">
            <div class="product-thumb-wrap">
              ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
              <button class="product-wishlist-btn" data-wishlist-toggle="${p.id}" aria-label="Add to Wishlist">
                <i class="bi bi-heart"></i>
              </button>
              <img src="${p.image}" alt="${p.name}" class="product-thumb" loading="lazy">
              <div class="product-quick-view-overlay">
                <button class="btn btn-gold btn-sm" data-quick-view="${p.id}">
                  <i class="bi bi-eye"></i> Quick View
                </button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-category-tag">${p.categoryLabel}</span>
              <h3 class="product-title">${p.name}</h3>
              <div class="product-meta-specs">
                <span>${p.materialLabel}</span>
                <span>${p.dimensions}</span>
              </div>
              <div class="product-bottom-bar">
                <span class="product-price">${formatINR(p.price)}</span>
                <button class="btn-link-gold" data-quick-view="${p.id}">
                  Details <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </article>
        `;
      });

      catalogGrid.innerHTML = html;
      updateAllWishlistButtons();
      initScrollReveals();
    }

    renderProducts();
  }

  /* --------------------------------------------------------------------------
     07B. BESPOKE FINISH SWATCH SELECTOR (products.html)
     -------------------------------------------------------------------------- */
  function initFinishSwatches() {
    const cards = document.querySelectorAll('.finish-swatch-card');
    const previewBox = document.getElementById('finish-preview-box');
    if (!cards.length || !previewBox) return;

    const activeDisc = document.getElementById('preview-active-disc');
    const activeRef = document.getElementById('preview-active-ref');
    const activeName = document.getElementById('preview-active-name');
    const activeDesc = document.getElementById('preview-active-desc');
    const activePairings = document.getElementById('preview-active-pairings');
    const activeSuitability = document.getElementById('preview-active-suitability');
    const activeLeadtime = document.getElementById('preview-active-leadtime');
    const filterBtn = document.getElementById('btn-filter-finish-products');

    cards.forEach((card) => {
      function activate() {
        cards.forEach((c) => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');

        const name = card.dataset.finishName || '';
        const ref = card.dataset.finishRef || '';
        const desc = card.dataset.finishDesc || '';
        const pairings = card.dataset.finishPairings || '';
        const suitability = card.dataset.finishSuitability || '';
        const leadtime = card.dataset.finishLeadtime || '';
        const id = card.dataset.finishId || '';

        if (activeName) activeName.textContent = name;
        if (activeRef) activeRef.textContent = ref;
        if (activeDesc) activeDesc.textContent = desc;
        if (activePairings) activePairings.textContent = pairings;
        if (activeSuitability) activeSuitability.textContent = suitability;
        if (activeLeadtime) activeLeadtime.textContent = leadtime;

        if (activeDisc) {
          activeDisc.className = 'preview-swatch-disc swatch-' + id;
        }
      }

      card.addEventListener('click', activate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });

    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        const activeCard = document.querySelector('.finish-swatch-card.active');
        if (!activeCard) return;
        const keyword = activeCard.dataset.filterKeyword || '';
        const searchInput = document.getElementById('filter-search');
        if (searchInput) {
          searchInput.value = keyword;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          const targetSection = document.querySelector('.filter-control-panel');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     08. HOME 2 INTERACTIVE MATERIALS TABS
     -------------------------------------------------------------------------- */
  function initMaterialsTabs() {
    const tabButtons = document.querySelectorAll('.details-tab-btn');
    const tabPanes = document.querySelectorAll('.details-pane');
    if (tabButtons.length === 0) return;

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        tabButtons.forEach((b) => b.classList.remove('active'));
        tabPanes.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = document.getElementById(`tab-${targetTab}`);
        activePane?.classList.add('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     09. CHANDELIER SIZING CALCULATOR (lighting-guide.html)
     -------------------------------------------------------------------------- */
  function initChandelierCalculator() {
    const lengthInput = document.getElementById('calc-room-length');
    const widthInput = document.getElementById('calc-room-width');
    const heightInput = document.getElementById('calc-ceiling-height');
    const outputDiameter = document.getElementById('calc-result-diameter');
    const outputHanging = document.getElementById('calc-result-hanging');
    const outputRecommendation = document.getElementById('calc-result-rec');

    if (!lengthInput || !widthInput || !heightInput) return;

    function calculate() {
      const l = parseFloat(lengthInput.value) || 0;
      const w = parseFloat(widthInput.value) || 0;
      const h = parseFloat(heightInput.value) || 0;

      if (l <= 0 || w <= 0) {
        if (outputDiameter) outputDiameter.textContent = '—';
        if (outputHanging) outputHanging.textContent = '—';
        if (outputRecommendation) outputRecommendation.textContent = 'Please enter valid room dimensions.';
        return;
      }

      // Formula: Room Length (ft) + Room Width (ft) = Recommended Diameter (inches)
      const diameterInches = Math.round(l + w);
      const diameterCm = Math.round(diameterInches * 2.54);

      // Hanging clearance: 7 ft minimum above floor, or 30-36 inches above dining table
      let hangingRecommendation = 'Minimum 7 ft (2.13 m) clearance above walking floor.';
      if (h >= 10) {
        hangingRecommendation = `Allow fixture height of approx ${(h * 2.5).toFixed(0)} inches with 7.5 ft floor clearance.`;
      }

      if (outputDiameter) {
        outputDiameter.textContent = `${diameterInches} inches (${diameterCm} cm)`;
      }
      if (outputHanging) {
        outputHanging.textContent = hangingRecommendation;
      }
      if (outputRecommendation) {
        outputRecommendation.textContent = `For a ${l}' × ${w}' space with a ${h}' ceiling, a fixture measuring ${diameterInches}" in diameter ensures harmonious visual equilibrium without crowding.`;
      }
    }

    lengthInput.addEventListener('input', calculate);
    widthInput.addEventListener('input', calculate);
    heightInput.addEventListener('input', calculate);

    calculate();
  }

  /* --------------------------------------------------------------------------
     10. FAQ ACCORDIONS
     -------------------------------------------------------------------------- */
  function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      questionBtn?.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          if (answer) answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. ENQUIRY FORM VALIDATION (contact.html)
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('showroom-enquiry-form');
    if (!form) return;

    // Prefill form from URL query params (if user clicked 'Enquire Now' on a product)
    const urlParams = new URLSearchParams(window.location.search);
    const prodParam = urlParams.get('product');
    const catParam = urlParams.get('category');
    const msgTextarea = document.getElementById('enquiry-message');
    const catSelect = document.getElementById('enquiry-category');

    if (prodParam && msgTextarea) {
      msgTextarea.value = `I am interested in scheduling a viewing or learning more about the "${decodeURIComponent(prodParam)}" fixture.`;
    }
    if (catParam && catSelect) {
      catSelect.value = catParam;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('enquiry-name');
      const emailInput = document.getElementById('enquiry-email');
      const phoneInput = document.getElementById('enquiry-phone');
      const messageInput = document.getElementById('enquiry-message');
      const feedbackBanner = document.getElementById('enquiry-feedback-banner');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      // Validate Phone (at least 10 digits)
      const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
      if (phoneClean.length < 10) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
      }

      if (isValid) {
        if (feedbackBanner) {
          feedbackBanner.className = 'form-feedback-banner success';
          feedbackBanner.innerHTML = `
            <strong><i class="bi bi-check-circle-fill"></i> Thank you, ${nameInput.value.trim()}.</strong><br>
            Your showroom enquiry has been recorded. Our lighting design concierge will contact you at <strong>${emailInput.value.trim()}</strong> within 24 business hours to confirm your private appointment.
          `;
          feedbackBanner.style.display = 'block';
        }
        form.reset();
        setTimeout(() => {
          feedbackBanner?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });

    // Real-time error clearance
    form.querySelectorAll('.form-control').forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     12. NEWSLETTER FORM (Footer)
     -------------------------------------------------------------------------- */
  function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        const feedback = form.querySelector('.newsletter-feedback');
        const email = input?.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          if (feedback) {
            feedback.className = 'newsletter-feedback show-error';
            feedback.textContent = 'Please enter a valid email address.';
          }
          return;
        }

        if (feedback) {
          feedback.className = 'newsletter-feedback show-success';
          feedback.textContent = 'Welcome to LUMORA. Private salon invitations will follow.';
        }
        form.reset();
        setTimeout(() => {
          if (feedback) feedback.className = 'newsletter-feedback';
        }, 6000);
      });
    });
  }

  /* --------------------------------------------------------------------------
     13. SCROLL REVEAL OBSERVER
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right').forEach((el) => {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right').forEach((el) => {
        el.classList.add('is-revealed');
      });
    }
  }

  /* --------------------------------------------------------------------------
     14. HOME 1 HERO SLIDER CONTROLS
     -------------------------------------------------------------------------- */
  function initHeroSlider() {
    const slideBtns = document.querySelectorAll('.hero-slide-num');
    const prevBtn = document.querySelector('.hero-arrow-btn.prev');
    const nextBtn = document.querySelector('.hero-arrow-btn.next');
    const heroImg = document.querySelector('.hero-h1-bg-img');
    if (slideBtns.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slideBtns.length;

    function setSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      slideBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === currentSlide);
      });
      if (heroImg) {
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        const prefix = isRtl ? 'scaleX(-1) ' : '';
        const scales = ['scale(1)', 'scale(1.035)', 'scale(1.06)'];
        heroImg.style.transform = prefix + (scales[currentSlide] || 'scale(1)');
      }
    }

    slideBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => setSlide(idx));
    });

    prevBtn?.addEventListener('click', () => setSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => setSlide(currentSlide + 1));
  }

  /* --------------------------------------------------------------------------
     15. BACK TO TOP CONTROLLER
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Back to Top');
      btn.setAttribute('title', 'Back to Top');
      btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
      document.body.appendChild(btn);
    }

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     16. DOM READY INITIALIZATION
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeAndRTL();
    initHeaderAndNav();
    initHeroSlider();
    initProductModal();
    initProductsPage();
    initFinishSwatches();
    initMaterialsTabs();
    initChandelierCalculator();
    initFaqAccordions();
    initContactForm();
    initNewsletterForm();
    initScrollReveals();
    initBackToTop();
    updateAllWishlistButtons();
  });

})();

