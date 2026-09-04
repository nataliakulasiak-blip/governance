/* =========================================================================
   Urania Travel — skrypt interfejsu
   Bez zależności zewnętrznych. Wszystko degraduje się łagodnie.
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Motyw jasny / ciemny ---------- */
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('ut-theme'); } catch (e) {}
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'), false);

    var btn = doc.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    var meta = doc.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#061520' : '#fbfaf7');
    var btn = doc.querySelector('.theme-toggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Włącz tryb jasny' : 'Włącz tryb ciemny');
    if (persist) { try { localStorage.setItem('ut-theme', theme); } catch (e) {} }
  }

  /* ---------- 2. Menu mobilne ---------- */
  function initNav() {
    var toggle = doc.querySelector('.nav-toggle');
    var nav = doc.getElementById('main-nav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) close();
    });
  }

  /* ---------- 3. Nagłówek „przyklejony" + pasek postępu ---------- */
  function initScrollUI() {
    var header = doc.querySelector('.header');
    var bar = doc.querySelector('.progress-bar');
    if (!header && !bar) return;

    var ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle('is-stuck', y > 8);
      if (bar) {
        var h = doc.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- 4. Animacje wejścia ---------- */
  function initReveal() {
    var items = doc.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Dok kontaktowy ---------- */
  function initDock() {
    var dock = doc.querySelector('.dock');
    if (!dock) return;
    var toggle = dock.querySelector('.dock__toggle');

    toggle.addEventListener('click', function () {
      var open = dock.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    doc.addEventListener('click', function (e) {
      if (!dock.contains(e.target)) {
        dock.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dock.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 6. Godziny otwarcia — status na żywo ----------
     Źródło prawdy: atrybuty data-day / data-open / data-close na <li>.
     Format godzin: "HH:MM" albo "closed".
  ------------------------------------------------------------ */
  function initHours() {
    var list = doc.querySelector('[data-hours]');
    var pill = doc.querySelector('[data-open-status]');
    if (!list) return;

    var now = new Date();
    var today = now.getDay();                 // 0 = niedziela
    var minutes = now.getHours() * 60 + now.getMinutes();
    var isOpen = false;
    var todayLabel = '';

    Array.prototype.forEach.call(list.querySelectorAll('li'), function (li) {
      var days = (li.getAttribute('data-day') || '').split(',').map(Number);
      if (days.indexOf(today) === -1) return;
      li.classList.add('is-today');
      var open = li.getAttribute('data-open');
      var close = li.getAttribute('data-close');
      todayLabel = open && close ? open + '–' + close : '';
      if (!open || !close) return;
      var from = toMinutes(open), to = toMinutes(close);
      if (minutes >= from && minutes < to) isOpen = true;
    });

    if (!pill) return;
    pill.classList.remove('is-open', 'is-closed');
    pill.classList.add(isOpen ? 'is-open' : 'is-closed');
    var text = pill.querySelector('[data-open-text]');
    if (text) {
      var tr = function (k, fb) { return (window.UT && window.UT.t(k)) || fb; };
      text.textContent = isOpen
        ? tr('open_now', 'Otwarte teraz') + (todayLabel ? ' \u00b7 ' + todayLabel : '')
        : tr('closed_now', 'Obecnie zamkni\u0119te') + (todayLabel ? ' \u00b7 ' + todayLabel : '');
    }
  }

  function toMinutes(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1] || '0', 10);
  }

  /* ---------- 7. Mapa — ładowanie po kliknięciu (RODO + wydajność) ---------- */
  function initMap() {
    var shell = doc.querySelector('[data-map]');
    if (!shell) return;
    var btn = shell.querySelector('[data-map-load]');
    var src = shell.getAttribute('data-map-src');
    if (!btn || !src) return;

    btn.addEventListener('click', function () {
      var frame = doc.createElement('iframe');
      frame.src = src;
      frame.title = 'Mapa — siedziba Urania Travel';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.setAttribute('allowfullscreen', '');
      shell.insertBefore(frame, shell.firstChild);
      var ph = shell.querySelector('.map-placeholder');
      if (ph) ph.remove();
    });
  }

  /* ---------- 8. FAQ — akordeon, filtr i wyszukiwarka ---------- */
  function initFaq() {
    var items = Array.prototype.slice.call(doc.querySelectorAll('.faq__item'));
    if (!items.length) return;

    // tylko jedna odpowiedź otwarta naraz
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });

    var chips = Array.prototype.slice.call(doc.querySelectorAll('.faq-filter .chip'));
    var input = doc.querySelector('[data-faq-search]');
    var empty = doc.querySelector('.faq__empty');
    var activeCat = 'all';

    function apply() {
      var q = (input && input.value || '').trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var cat = item.getAttribute('data-cat') || '';
        var text = item.textContent.toLowerCase();
        var ok = (activeCat === 'all' || cat === activeCat) && (!q || text.indexOf(q) > -1);
        item.hidden = !ok;
        if (ok) shown++; else item.open = false;
      });
      if (empty) empty.classList.toggle('is-visible', shown === 0);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
        activeCat = chip.getAttribute('data-cat') || 'all';
        apply();
      });
    });

    if (input) input.addEventListener('input', apply);
  }

  function tr(key, fallback) {
    return (window.UT && window.UT.t(key)) || fallback;
  }

  /* ---------- 9. Formularz kontaktowy ---------- */
  function initForm() {
    var form = doc.querySelector('[data-contact-form]');
    if (!form) return;
    var status = form.querySelector('.form-status');

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) {
        say(status, 'is-err', tr('f_invalid', 'Uzupełnij zaznaczone pola i spróbuj ponownie.'));
        return;
      }

      // Antyspam: pole-pułapka musi zostać puste.
      var honey = form.querySelector('[name="_gotcha"]');
      if (honey && honey.value) return;

      var endpoint = form.getAttribute('data-endpoint');
      if (endpoint) {
        submitAjax(form, endpoint, status);
      } else {
        openMailClient(form);
        say(status, 'is-ok', tr('f_mailto', 'Otwieramy Twój program pocztowy z gotową wiadomością.'));
      }
    });

    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (el) {
      el.addEventListener('blur', function () { validateField(el); });
      el.addEventListener('input', function () {
        if (el.closest('.field') && el.closest('.field').classList.contains('has-error')) validateField(el);
      });
    });
  }

  function validate(form) {
    var ok = true;
    Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (el) {
      if (!validateField(el)) ok = false;
    });
    return ok;
  }

  function validateField(el) {
    var field = el.closest('.field') || el.closest('.check');
    if (!field) return true;
    var msg = field.querySelector('.error');
    var value = (el.value || '').trim();
    var error = '';

    if (el.hasAttribute('required')) {
      if (el.type === 'checkbox' && !el.checked) error = tr('v_required', 'To pole jest wymagane.');
      else if (el.type !== 'checkbox' && !value) error = tr('v_required', 'To pole jest wymagane.');
    }
    if (!error && el.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) {
      error = tr('v_email', 'Podaj poprawny adres e-mail.');
    }
    if (!error && el.type === 'tel' && value && !/^[+\d][\d\s()-]{6,}$/.test(value)) {
      error = tr('v_phone', 'Podaj poprawny numer telefonu.');
    }

    field.classList.toggle('has-error', !!error);
    if (msg) msg.textContent = error;
    el.setAttribute('aria-invalid', error ? 'true' : 'false');
    return !error;
  }

  function submitAjax(form, endpoint, status) {
    var btn = form.querySelector('[type="submit"]');
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = tr('f_sending', 'Wysyłanie…'); }

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      say(status, 'is-ok', tr('f_ok', 'Dziękujemy! Wiadomość została wysłana.'));
    }).catch(function () {
      say(status, 'is-err', tr('f_err', 'Nie udało się wysłać formularza.'));
    }).finally(function () {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    });
  }

  function openMailClient(form) {
    var data = new FormData(form);
    var get = function (k) { return (data.get(k) || '').toString().trim(); };
    var lines = [
      'Imię i nazwisko: ' + get('name'),
      'E-mail: ' + get('email'),
      'Telefon: ' + get('phone'),
      'Temat: ' + get('subject'),
      'Kierunek: ' + get('destination'),
      'Termin: ' + get('date'),
      'Liczba osób: ' + get('people'),
      '',
      get('message')
    ].join('\n');

    var href = 'mailto:' + (form.getAttribute('data-mailto') || 'kontakt@uraniatravel.pl') +
      '?subject=' + encodeURIComponent('Zapytanie ze strony: ' + (get('subject') || 'kontakt')) +
      '&body=' + encodeURIComponent(lines);
    window.location.href = href;
  }

  function say(node, cls, text) {
    if (!node) return;
    node.className = 'form-status is-visible ' + cls;
    node.textContent = text;
    node.setAttribute('role', 'status');
  }

  /* ---------- 10. Kopiowanie danych kontaktowych ---------- */
  function initCopy() {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-copy]'), function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var value = btn.getAttribute('data-copy');
        var done = function () {
          var old = btn.getAttribute('aria-label') || '';
          btn.setAttribute('aria-label', 'Skopiowano');
          btn.classList.add('is-copied');
          setTimeout(function () { btn.setAttribute('aria-label', old); btn.classList.remove('is-copied'); }, 1800);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(value).then(done).catch(function () {});
        else done();
      });
    });
  }

  /* ---------- 11. Rok w stopce ---------- */
  function initYear() {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-year]'), function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- start ---------- */
  function boot() {
    initTheme();
    initNav();
    initScrollUI();
    initReveal();
    initDock();
    initHours();
    initMap();
    initFaq();
    initForm();
    initCopy();
    initYear();
  }

  doc.addEventListener('ut:lang', function () { initHours(); });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
