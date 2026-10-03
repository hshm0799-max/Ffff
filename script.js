(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
      toggle.setAttribute('aria-label', open ? 'Close Menu' : 'Open Menu');
    };
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Highlight current page in nav
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (a) {
    if ((a.getAttribute('href') || '').toLowerCase() === page) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in-view'); });
  }

  // FAQ accordion (one open at a time)
  document.querySelectorAll('.faq-item').forEach(function (item, i) {
    var btn = item.querySelector('.faq-question');
    var ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    var id = 'faq-answer-' + i;
    ans.id = id;
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('aria-expanded', String(item.classList.contains('active')));
    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (o) {
        o.classList.remove('active');
        var b = o.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) { item.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  // Demo form handling (replace with Formspree / EmailJS / backend later)
  function status(form, type, msg) {
    var s = form.querySelector('.form-status');
    if (!s) {
      s = document.createElement('div');
      s.className = 'form-status';
      s.setAttribute('role', 'status');
      form.appendChild(s);
    }
    s.className = 'form-status ' + type;
    s.textContent = msg;
  }
  document.querySelectorAll('.contact-form, .footer-newsletter').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var isNews = form.classList.contains('footer-newsletter');
      // TODO: send new FormData(form) to your backend here.
      status(form, 'success', isNews
        ? 'Thanks for subscribing! (demo mode)'
        : 'Thank you! Your inquiry has been received. We will contact you within 24 hours. (demo mode)');
      form.reset();
    });
  });
})();
