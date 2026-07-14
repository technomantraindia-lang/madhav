/* Contact Us page — FAQ accordion + Contact form email (SMTP) */

(function () {
  'use strict';

  var accordion = document.getElementById('cu-accordion');
  if (accordion) {
    accordion.addEventListener('click', function (e) {
      var btn = e.target.closest('.cu-acc-btn');
      if (!btn) return;

      var item = btn.closest('.cu-acc-item');
      var isOpen = item.classList.contains('is-open');
      var items = accordion.querySelectorAll('.cu-acc-item');

      items.forEach(function (el) {
        el.classList.remove('is-open');
        var b = el.querySelector('.cu-acc-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var fields = form.querySelectorAll('[required]');
      var valid = true;

      fields.forEach(function (field) {
        var wrap = field.closest('.cu-field');
        var ok = !!String(field.value || '').trim();
        if (field.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        }
        if (wrap) wrap.classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        if (status) {
          status.hidden = false;
          status.style.color = '#b91c1c';
          status.textContent = 'Please fill in all required fields correctly.';
        }
        return;
      }

      if (!window.MadhavMail || typeof window.MadhavMail.sendFormMail !== 'function') {
        if (status) {
          status.hidden = false;
          status.style.color = '#b91c1c';
          status.textContent = 'Mail script not loaded. Please refresh and try again.';
        }
        return;
      }

      var submitBtn = form.querySelector('.cu-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('data-label', submitBtn.innerHTML);
        submitBtn.textContent = 'Sending...';
      }
      if (status) {
        status.hidden = false;
        status.style.color = '#5a5a6a';
        status.textContent = 'Sending your message...';
      }

      var fd = new FormData(form);
      window.MadhavMail.sendFormMail({
        formType: 'contact',
        name: fd.get('name') || '',
        email: fd.get('email') || '',
        company: fd.get('company') || '',
        phone: fd.get('phone') || '',
        subject: fd.get('subject') || '',
        message: fd.get('message') || '',
        website: fd.get('website') || '',
      }).then(function () {
        if (status) {
          status.style.color = '#15803d';
          status.textContent = 'Thank you! Your message has been emailed to madhavpoly7827@gmail.com. We will reply soon.';
        }
        form.reset();
        form.querySelectorAll('.is-invalid').forEach(function (el) {
          el.classList.remove('is-invalid');
        });
      }).catch(function (err) {
        if (status) {
          status.style.color = '#b91c1c';
          status.textContent = (err && err.message) ? err.message : 'Could not send. Please try again or email madhavpoly7827@gmail.com.';
        }
      }).finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.getAttribute('data-label') || 'Send Message';
        }
      });
    });
  }
})();
