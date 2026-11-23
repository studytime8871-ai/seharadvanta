/* SeharAdvanta - Main JavaScript */
(() => {
  'use strict';

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll state
  const header = $('.site-header');
  const setHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  // Mobile nav
  const navToggle = $('.nav-toggle');
  const navLinks = $('.nav-links');
  const navOverlay = $('.nav-overlay');
  const closeNav = () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
    navOverlay?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  };
  const openNav = () => {
    navToggle?.classList.add('open');
    navLinks?.classList.add('open');
    navOverlay?.classList.add('open');
    navToggle?.setAttribute('aria-expanded', 'true');
    navToggle?.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  };
  navToggle?.addEventListener('click', () => {
    navLinks?.classList.contains('open') ? closeNav() : openNav();
  });
  navOverlay?.addEventListener('click', closeNav);
  $$('.nav-links a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('click', (e) => {
    if (!navLinks?.classList.contains('open')) return;
    if (e.target.closest('.nav-links') || e.target.closest('.nav-toggle') || e.target.closest('.nav-overlay')) return;
    closeNav();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeNav(); closeModal(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeNav(); });

  // Active nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Scroll reveal
  const reveals = $$('.reveal');
  if (reveals.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('visible'));
    } else {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => obs.observe(el));
    }
  }

  // Portfolio filters
  const filterBtns = $$('.filter-btn');
  const portfolioItems = $$('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      portfolioItems.forEach(item => {
        const cat = item.dataset.category || '';
        const show = filter === 'all' || cat.includes(filter);
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // Lightbox modal
  const modal = $('#portfolio-modal');
  const modalImg = $('#modal-image');
  const modalTitle = $('#modal-title');
  const modalCategory = $('#modal-category');
  const modalDesc = $('#modal-description');
  let lastFocus = null;
  const openModal = (item) => {
    if (!modal) return;
    lastFocus = document.activeElement;
    const img = item.querySelector('img');
    modalImg.src = img?.src || '';
    modalImg.alt = img?.alt || '';
    modalTitle.textContent = item.dataset.title || '';
    modalCategory.textContent = item.dataset.label || '';
    modalDesc.textContent = item.dataset.description || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    $('.modal-close', modal)?.focus();
  };
  const closeModal = () => {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); }
    });
  });
  $('.modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // FAQ accordion
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      $$('.faq-item').forEach(i => {
        i.classList.remove('open');
        $('.faq-question', i)?.setAttribute('aria-expanded', 'false');
      });
      if (!expanded) {
        item?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Contact form
  const form = $('#contact-form');
  if (form) {
    const feedback = $('#form-feedback');
    const showFeedback = (msg, type) => {
      feedback.textContent = msg;
      feedback.className = `form-feedback ${type}`;
      feedback.hidden = false;
    };
    const clearErrors = () => $$('.field-error', form).forEach(el => { el.textContent = ''; });
    const setError = (id, msg) => { const el = $(`#err-${id}`); if (el) el.textContent = msg; };
    const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      feedback.hidden = true;
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const service = form.service.value;
      const message = form.message.value.trim();
      let ok = true;
      if (name.length < 2) { setError('name', 'Please enter your name.'); ok = false; }
      if (!validEmail(email)) { setError('email', 'Please enter a valid email address.'); ok = false; }
      if (!service) { setError('service', 'Please select a service.'); ok = false; }
      if (message.length < 10) { setError('message', 'Please write a short message (at least 10 characters).'); ok = false; }
      if (!ok) { showFeedback('Please correct the highlighted fields and try again.', 'error'); return; }

      const subject = encodeURIComponent(`Website Inquiry from ${name} - ${service}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService Interest: ${service}\n\nMessage:\n${message}\n\n---\nSent from SeharAdvanta website contact form`
      );
      const mailto = `mailto:seharfatima989898@gmail.com?subject=${subject}&body=${body}`;
      showFeedback('Thank you! Your message is ready. Your email app should open now. You can also message me directly on WhatsApp for a faster response.', 'success');
      form.reset();
      window.location.href = mailto;
    });
  }

  // Back to top
  const backTop = $('.back-to-top');
  if (backTop) {
    const toggleBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
    toggleBackTop();
    window.addEventListener('scroll', toggleBackTop, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
  }
})();