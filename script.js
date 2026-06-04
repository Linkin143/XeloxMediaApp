// ===== XELOX MEDIA - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
  // ===== IMAGE FALLBACKS FOR MISSING ASSETS =====
  const imageFallback =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="Placeholder image">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#111827" />
            <stop offset="100%" stop-color="#374151" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" rx="32" fill="url(#g)" />
        <circle cx="400" cy="250" r="86" fill="#9ca3af" opacity="0.35" />
        <path d="M260 500c24-94 94-142 140-142s116 48 140 142" fill="#9ca3af" opacity="0.35" />
        <text x="400" y="345" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" fill="#f3f4f6" opacity="0.9">
          Image unavailable
        </text>
      </svg>
    `);

  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied === 'true') return;
      img.dataset.fallbackApplied = 'true';
      img.src = imageFallback;
    });
  });

  // ===== SERVICE CATALOG DATA =====
  const serviceIcons = {
    strategy: `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="24" cy="24" r="20" />
        <path d="M14 24l6 6 14-14" />
      </svg>
    `,
    creative: `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M10 34c3-12 9-18 14-18s11 6 14 18" />
        <path d="M12 18l5-10 7 7 7-7 5 10" />
      </svg>
    `,
    build: `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="6" y="8" width="36" height="28" rx="3" />
        <path d="M6 18h36M16 36v6M32 36v6" />
      </svg>
    `,
    automation: `
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M8 16h12l4-6 4 6h12v16H28l-4 6-4-6H8z" />
        <path d="M18 24h12" />
      </svg>
    `,
  };

  const serviceCatalog = [
    {
      id: 'social-media-management',
      url: 'social-media-management.html',
      title: 'Social Media Management',
      description: 'Complete social media account management and content publishing.',
      price: 12000,
      billing: 'monthly',
      icon: serviceIcons.strategy,
    },
    {
      id: 'meta-ads-management',
      url: 'meta-ads-management.html',
      title: 'Meta Ads Management',
      description: 'Facebook and Instagram advertising campaign management.',
      price: 10000,
      billing: 'monthly + ad spend',
      icon: serviceIcons.strategy,
    },
    {
      id: 'google-ads-management',
      url: 'google-ads-management.html',
      title: 'Google Ads Management',
      description: 'Search, Display and Performance Max campaign management.',
      price: 12000,
      billing: 'monthly + ad spend',
      icon: serviceIcons.strategy,
    },
    {
      id: 'lead-generation-campaigns',
      url: 'lead-generation-campaigns.html',
      title: 'Lead Generation Campaigns',
      description: 'Lead acquisition campaigns for local and online businesses.',
      price: 15000,
      billing: 'monthly',
      icon: serviceIcons.strategy,
    },
    {
      id: 'video-editing-reels-shorts',
      url: 'video-editing-reels-shorts.html',
      title: 'Video Editing (Reels/Shorts)',
      description: 'Professional editing for reels, shorts and social content.',
      price: 500,
      billing: 'per video',
      icon: serviceIcons.creative,
    },
    {
      id: 'graphic-design',
      url: 'graphic-design.html',
      title: 'Graphic Design',
      description: 'Creative social media, marketing and branding designs.',
      price: 500,
      billing: 'per design',
      icon: serviceIcons.creative,
    },
    {
      id: 'branding-package',
      url: 'branding-package.html',
      title: 'Branding Package',
      description: 'Logo, brand identity and visual branding assets.',
      price: 15000,
      billing: 'one-time',
      icon: serviceIcons.creative,
    },
    {
      id: 'business-website',
      url: 'business-website.html',
      title: 'Business Website',
      description: 'Professional responsive business website development.',
      price: 20000,
      billing: 'project',
      icon: serviceIcons.build,
    },
    {
      id: 'ecommerce-website',
      url: 'ecommerce-website.html',
      title: 'E-commerce Website',
      description: 'Online store with product catalog and payment integration.',
      price: 50000,
      billing: 'project',
      icon: serviceIcons.build,
    },
    {
      id: 'app-development',
      url: 'app-development.html',
      title: 'App Development',
      description: 'Custom Android, iOS or cross-platform application development.',
      price: 80000,
      billing: 'project',
      icon: serviceIcons.build,
    },
    {
      id: 'crm-dashboard',
      url: 'crm-dashboard.html',
      title: 'CRM Dashboard',
      description: 'Custom CRM dashboard and business management tools.',
      price: 40000,
      billing: 'project',
      icon: serviceIcons.build,
    },
    {
      id: 'whatsapp-automation',
      url: 'whatsapp-automation.html',
      title: 'WhatsApp Automation',
      description: 'Automated WhatsApp messaging and customer workflows.',
      price: 15000,
      billing: 'project',
      icon: serviceIcons.automation,
    },
    {
      id: 'custom-saas-development',
      url: 'custom-saas-development.html',
      title: 'Custom SaaS Development',
      description: 'Custom SaaS platform and web application development.',
      price: 200000,
      billing: 'project',
      icon: serviceIcons.build,
    },
  ];

  const cartStorageKey = 'xelox-media-cart-v1';
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  const formatINR = (value) => currencyFormatter.format(value);

  const loadCart = () => {
    try {
      const raw = localStorage.getItem(cartStorageKey);
      if (!raw) return {};

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return {};

      return Object.entries(parsed).reduce((acc, [id, item]) => {
        const service = serviceCatalog.find((entry) => entry.id === id);
        const quantity = Number(item && item.quantity) || 0;

        if (service && quantity > 0) {
          acc[id] = {
            ...service,
            quantity,
          };
        }

        return acc;
      }, {});
    } catch {
      return {};
    }
  };

  const persistCart = () => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    } catch {
      // Ignore storage failures and keep the cart in-memory.
    }
  };

  let cart = loadCart();

  const getCartItems = () => Object.values(cart);
  const getCartCount = () => getCartItems().reduce((sum, item) => sum + item.quantity, 0);
  const getCartTotal = () => getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const cartToggle = document.getElementById('cartToggle');
  const cartCount = document.getElementById('cartCount');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartClose = document.getElementById('cartClose');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const payNowBtn = document.getElementById('payNowBtn');
  const serviceCatalogGrid = document.getElementById('serviceCatalogGrid');
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');
  let cartBackdropHideTimer = null;
  const isHomePage = /(^|[\\/])index\.html$/i.test(window.location.pathname) || window.location.pathname === '/' || window.location.pathname === '';

  const legacyServicesGrid = document.querySelector('#services .services-grid:not(.services-grid-cart)');
  if (legacyServicesGrid) {
    legacyServicesGrid.remove();
  }

  const closeMobileNav = () => {
    if (!navLinks || !navToggle) return;
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openCart = () => {
    if (!cartDrawer || !cartBackdrop) return;
    if (cartBackdropHideTimer) {
      clearTimeout(cartBackdropHideTimer);
      cartBackdropHideTimer = null;
    }
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBackdrop.hidden = false;
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (cartToggle) cartToggle.setAttribute('aria-expanded', 'true');
    closeMobileNav();
  };

  const closeCart = () => {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (cartToggle) cartToggle.setAttribute('aria-expanded', 'false');

    if (cartBackdropHideTimer) {
      clearTimeout(cartBackdropHideTimer);
    }

    cartBackdropHideTimer = window.setTimeout(() => {
      cartBackdrop.hidden = true;
      cartBackdropHideTimer = null;
    }, 350);
  };

  const updateCartBadge = () => {
    if (!cartCount) return;
    cartCount.textContent = String(getCartCount());
  };

  const renderServiceCatalog = () => {
    if (!serviceCatalogGrid) return;

    serviceCatalogGrid.innerHTML = serviceCatalog
      .map((service) => {
        const inCart = Boolean(cart[service.id]);
        const serviceActions = isHomePage
          ? `
            <div class="service-actions">
              <button
                type="button"
                class="service-cart-btn ${inCart ? 'is-added' : ''}"
                data-cart-action="${inCart ? 'remove' : 'add'}"
                data-service-id="${service.id}"
                aria-pressed="${inCart ? 'true' : 'false'}"
              >
                ${inCart ? 'Remove' : 'Add To Cart'}
              </button>
            </div>
          `
          : '';

        return `
          <div
            class="service-card service-card-cart reveal"
            data-service-id="${service.id}"
            data-url="${service.url}"
            data-cart-state="${inCart ? 'added' : 'idle'}"
            role="link"
            tabindex="0"
            aria-label="${service.title}. Open service page."
          >
            <div class="service-icon">
              ${service.icon}
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="service-price-label">Starter Price</div>
            <div class="service-price">${formatINR(service.price)} <span>${service.billing}</span></div>
            ${serviceActions}
          </div>
        `;
      })
      .join('');

    if (window.revealObserverInstance) {
      serviceCatalogGrid.querySelectorAll('.reveal').forEach((el) => {
        window.revealObserverInstance.observe(el);
      });
    }
  };

  const renderCartDrawer = () => {
    if (!cartItems || !cartTotal) return;

    const items = getCartItems();

    if (!items.length) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          Your cart is empty right now. Add a service from the catalog to build your package.
        </div>
      `;
    } else {
      cartItems.innerHTML = items
        .map(
          (item) => `
            <div class="cart-item" data-service-id="${item.id}">
              <div class="cart-item-top">
                <div>
                  <div class="cart-item-title">${item.title}</div>
                  <div class="cart-item-price">${formatINR(item.price)} each</div>
                </div>
                <button type="button" class="cart-item-remove" data-cart-action="remove" data-service-id="${item.id}">
                  Remove
                </button>
              </div>
              <div class="cart-qty-row">
                <div class="cart-qty-control">
                  <button type="button" data-cart-action="decrease" data-service-id="${item.id}" aria-label="Decrease quantity">-</button>
                  <span>${item.quantity}</span>
                  <button type="button" data-cart-action="increase" data-service-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <div class="cart-item-subtotal">${formatINR(item.price * item.quantity)}</div>
              </div>
            </div>
          `
        )
        .join('');
    }

    cartTotal.textContent = formatINR(getCartTotal());
    updateCartBadge();

    if (payNowBtn) {
      payNowBtn.disabled = items.length === 0;
      payNowBtn.style.opacity = items.length === 0 ? '0.65' : '';
      payNowBtn.style.cursor = items.length === 0 ? 'not-allowed' : '';
    }

    renderServiceCatalog();
    persistCart();
  };

  const addToCart = (serviceId) => {
    const service = serviceCatalog.find((entry) => entry.id === serviceId);
    if (!service) return;

    cart[serviceId] = {
      ...service,
      quantity: 1,
    };

    renderCartDrawer();
  };

  const removeFromCart = (serviceId) => {
    if (!cart[serviceId]) return;

    delete cart[serviceId];
    renderCartDrawer();
  };

  const increaseQuantity = (serviceId) => {
    const item = cart[serviceId];
    if (!item) return;

    cart[serviceId] = {
      ...item,
      quantity: item.quantity + 1,
    };

    renderCartDrawer();
  };

  const decreaseQuantity = (serviceId) => {
    const item = cart[serviceId];
    if (!item) return;

    if (item.quantity <= 1) {
      removeFromCart(serviceId);
      return;
    }

    cart[serviceId] = {
      ...item,
      quantity: item.quantity - 1,
    };

    renderCartDrawer();
  };

  const getCartSummary = () => {
    const items = getCartItems();

    if (!items.length) {
      return 'Cart summary:';
    }

    const lines = items.map(
      (item) => `- ${item.title} x ${item.quantity} = ${formatINR(item.price * item.quantity)}`
    );

    return [
      'Cart summary:',
      ...lines,
      `Total: ${formatINR(getCartTotal())}`,
    ].join('\n');
  };

  const handleCartAction = (event) => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const { cartAction, serviceId } = button.dataset;

    if (cartAction === 'add') {
      addToCart(serviceId);
    } else if (cartAction === 'remove') {
      removeFromCart(serviceId);
    } else if (cartAction === 'increase') {
      increaseQuantity(serviceId);
    } else if (cartAction === 'decrease') {
      decreaseQuantity(serviceId);
    }
  };

  const openServicePage = (card) => {
    if (!card) return;
    const url = card.dataset.url;
    if (!url) return;
    window.location.href = url;
  };

  // ===== NAVBAR SCROLL EFFECT =====
  const handleNavScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ===== MOBILE NAV TOGGLE =====
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  // ===== CART TOGGLE =====
  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      if (cartDrawer && cartDrawer.classList.contains('open')) {
        closeCart();
      } else {
        openCart();
      }
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', closeCart);
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCart();
      closeMobileNav();
    }
  });

  // ===== SCROLL REVEAL (INTERSECTION OBSERVER) =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  window.revealObserverInstance = revealObserver;
  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== ANIMATED COUNTERS =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
        const statCard = el.closest('.stat-card');
        if (statCard) statCard.classList.add('counted');
      }
    };

    requestAnimationFrame(update);
  };

  const statsSection = document.getElementById('results');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            statNumbers.forEach((el, i) => {
              window.setTimeout(() => animateCounter(el), i * 200);
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statsObserver.observe(statsSection);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksList.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = '#ffffff';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ===== BOOKING FORM HANDLING =====
  const bookingMessage = document.getElementById('message');

  if (payNowBtn) {
    payNowBtn.addEventListener('click', () => {
      if (!getCartItems().length) return;

      if (bookingMessage) {
        bookingMessage.value = `${getCartSummary()}\n\nPlease share the next steps for payment and onboarding.`;
      }

      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = bookingSection.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }

      closeCart();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<span style="opacity: 0.7;">Sending...</span>';
        submitBtn.disabled = true;
      }

      const formData = {
        name: (document.getElementById('name') || {}).value || '',
        email: (document.getElementById('email') || {}).value || '',
        company: (document.getElementById('company') || {}).value || '',
        website: (document.getElementById('website') || {}).value || '',
        service: (document.getElementById('service') || {}).value || '',
        budget: (document.getElementById('budget') || {}).value || '',
        meetingTime: (document.getElementById('meeting-time') || {}).value || '',
        message: (document.getElementById('message') || {}).value || '',
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const rawResponse = await response.text();
        let result = {};

        try {
          result = rawResponse ? JSON.parse(rawResponse) : {};
        } catch {
          throw new Error(rawResponse || `Unexpected server response (${response.status})`);
        }

        if (response.ok) {
          bookingForm.innerHTML = `
            <div class="form-success">
              <h3>Thank You!</h3>
              <p>We've received your request. Our team will reach out within 24 hours to schedule your strategy meeting.</p>
            </div>
          `;
        } else {
          throw new Error(result.message || `Something went wrong (${response.status})`);
        }
      } catch (error) {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }

        let errorEl = bookingForm.querySelector('.form-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error';
          errorEl.style.cssText =
            'color: #ff6b6b; font-size: 0.85rem; text-align: center; margin-top: 12px;';
          if (submitBtn && submitBtn.parentNode) {
            submitBtn.parentNode.insertBefore(errorEl, submitBtn.nextSibling);
          }
        }

        errorEl.textContent = 'Failed to send. Please try again or email us directly.';
      }
    });
  }

  // ===== PARALLAX-LIKE EFFECT ON HERO BG LINES =====
  const heroLines = document.querySelector('.hero-bg-lines');
  if (heroLines) {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroLines.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
        }
      },
      { passive: true }
    );
  }

  // ===== CURSOR GLOW ON SERVICE CARDS (DESKTOP ONLY) =====
  if (window.matchMedia('(hover: hover)').matches) {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card) => {
      if (card.classList.contains('service-card-cart')) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.03) 0%, var(--dark) 50%, var(--black) 100%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  }

  // ===== LINK PRIMARY SERVICE CARDS TO LANDING PAGES =====
  const cardLinks = [
    { text: 'Digital Marketing Strategy', url: 'marketing-campaign.html' },
    { text: 'Influencer Marketing Campaigns', url: 'marketing-campaign.html' },
    { text: 'Brand Strategy & Positioning', url: 'brand-identity.html' },
    { text: 'Content Production & Shoots', url: 'content-production.html' },
    { text: 'Website Development', url: 'web-development.html' },
    { text: 'Custom Software & SaaS', url: 'web-development.html' },
  ];

  const primaryServicesGrid = document.querySelector('#services .services-grid:not(.services-grid-cart)');
  if (primaryServicesGrid) {
    cardLinks.forEach((link) => {
      const headings = primaryServicesGrid.querySelectorAll('.service-card h3');
      headings.forEach((h3) => {
        if (h3.textContent === link.text) {
          const card = h3.closest('.service-card');
          if (card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
              window.location.href = link.url;
            });
          }
        }
      });
    });
  }

  if (serviceCatalogGrid) {
    serviceCatalogGrid.addEventListener('click', handleCartAction);
    serviceCatalogGrid.addEventListener('click', (event) => {
      if (event.target.closest('[data-cart-action]')) return;
      const card = event.target.closest('.service-card-cart');
      if (!card || !serviceCatalogGrid.contains(card)) return;
      openServicePage(card);
    });
    serviceCatalogGrid.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      const card = event.target.closest('.service-card-cart');
      if (!card || !serviceCatalogGrid.contains(card)) return;
      if (event.target.closest('[data-cart-action]')) return;

      event.preventDefault();
      openServicePage(card);
    });
  }

  if (cartItems) {
    cartItems.addEventListener('click', handleCartAction);
  }

  updateCartBadge();
  renderServiceCatalog();
  renderCartDrawer();
});
