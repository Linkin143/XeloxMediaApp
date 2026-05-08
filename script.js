// ===== XELOX MEDIA — MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== IMAGE FALLBACKS FOR MISSING ASSETS =====
  const imageFallback =
    "data:image/svg+xml;charset=UTF-8," +
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

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== SCROLL REVEAL (Intersection Observer) =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== ANIMATED COUNTERS =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

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
        el.closest('.stat-card').classList.add('counted');
      }
    };

    requestAnimationFrame(update);
  };

  const statsSection = document.getElementById('results');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          statNumbers.forEach((el, i) => {
            setTimeout(() => animateCounter(el), i * 200);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksList.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = '#ffffff';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ===== BOOKING FORM HANDLING =====
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Button loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span style="opacity: 0.7;">Sending...</span>';
      submitBtn.disabled = true;

      // Map form fields matching our backend JSON schema
      const formData = {
        name: (document.getElementById('name') || {}).value || '',
        email: (document.getElementById('email') || {}).value || '',
        company: (document.getElementById('company') || {}).value || '',
        website: (document.getElementById('website') || {}).value || '',
        service: (document.getElementById('service') || {}).value || '',
        budget: (document.getElementById('budget') || {}).value || '',
        meetingTime: (document.getElementById('meeting-time') || {}).value || '',
        message: (document.getElementById('message') || {}).value || ''
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
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
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show error message below button
        let errorEl = bookingForm.querySelector('.form-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error';
          errorEl.style.cssText = 'color: #ff6b6b; font-size: 0.85rem; text-align: center; margin-top: 12px;';
          submitBtn.parentNode.insertBefore(errorEl, submitBtn.nextSibling);
        }
        errorEl.textContent = 'Failed to send. Please try again or email us directly.';
      }
    });
  }

  // ===== PARALLAX-LIKE EFFECT ON HERO BG LINES =====
  const heroLines = document.querySelector('.hero-bg-lines');
  if (heroLines) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroLines.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
      }
    }, { passive: true });
  }

  // ===== CURSOR GLOW ON SERVICE CARDS (Desktop only) =====
  if (window.matchMedia('(hover: hover)').matches) {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
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

  // ===== LINK CARDS TO LANDING PAGES =====
  // Seamlessly connects the services and projects to their dedicated pages
  const cardLinks = [
    { type: 'service', text: 'Digital Marketing Strategy', url: 'marketing-campaign.html' },
    { type: 'service', text: 'Influencer Marketing Campaigns', url: 'marketing-campaign.html' },
    { type: 'service', text: 'Brand Strategy & Positioning', url: 'brand-identity.html' },
    { type: 'service', text: 'Content Production & Shoots', url: 'content-production.html' },
    { type: 'service', text: 'Website Development', url: 'web-development.html' },
    { type: 'service', text: 'Custom Software & SaaS', url: 'web-development.html' },
    { type: 'portfolio', id: '#portfolio-item-1', url: 'marketing-campaign.html' },
    { type: 'portfolio', id: '#portfolio-item-2', url: 'brand-identity.html' },
    { type: 'portfolio', id: '#portfolio-item-3', url: 'web-development.html' },
    { type: 'portfolio', id: '#portfolio-item-4', url: 'content-production.html' }
  ];

  cardLinks.forEach(link => {
    if (link.type === 'service') {
      const headings = document.querySelectorAll('.service-card h3');
      headings.forEach(h3 => {
        if (h3.textContent === link.text) {
          const card = h3.closest('.service-card');
          if (card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => window.location.href = link.url);
          }
        }
      });
    } else if (link.type === 'portfolio') {
      const item = document.querySelector(link.id);
      if (item) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => window.location.href = link.url);
      }
    }
  });

});
