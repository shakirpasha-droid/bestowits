/**
* Template Name: Bikin
* Template URL: https://bootstrapmade.com/bikin-free-simple-landing-page-template/
* Updated: May 25 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {

  "use strict";

  /**
   * Keep the header visually identical across all Bestow IT Services pages.
   * The homepage has its own inline header styling, so these shared rules
   * normalize the logo, header background and navigation state.
   */
  function normalizeBestowHeader() {
    const header = document.querySelector('#header');
    if (!header) return;

    const logo = header.querySelector('.logo img');
    if (logo) {
      logo.style.setProperty('max-height', '82px', 'important');
      logo.style.setProperty('width', 'auto', 'important');
      logo.style.display = 'block';
      logo.style.setProperty('mix-blend-mode', 'multiply', 'important');
    }

    header.style.setProperty('background', '#ffffff', 'important');
    header.style.setProperty('height', '80px', 'important');
    header.style.setProperty('border-bottom', '1px solid #e8ecf7', 'important');
    const headerContainer = header.querySelector('.container');
    if (headerContainer) headerContainer.style.setProperty('height', '80px', 'important');

    const links = header.querySelectorAll('#navbar a.nav-link');
    links.forEach(link => {
      link.classList.add('scrollto');
      link.style.position = 'relative';
      link.style.paddingBottom = '14px';
      link.style.setProperty('transition', 'color .25s ease', 'important');

      if (!link.querySelector('.bestow-nav-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'bestow-nav-indicator';
        indicator.style.position = 'absolute';
        indicator.style.left = '30px';
        indicator.style.right = '0';
        indicator.style.bottom = '3px';
        indicator.style.height = '3px';
        indicator.style.borderRadius = '3px';
        indicator.style.background = '#3b4ef8';
        indicator.style.transform = 'scaleX(0)';
        indicator.style.transformOrigin = 'center';
        indicator.style.transition = 'transform .25s ease';
        link.appendChild(indicator);
      }
    });

    const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    links.forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0].split('/').pop().toLowerCase();
      const isActive = (current === '' && href === 'index.html') || href === current;
      link.classList.toggle('active', isActive);
      const indicator = link.querySelector('.bestow-nav-indicator');
      if (indicator) indicator.style.transform = isActive ? 'scaleX(1)' : 'scaleX(0)';
      link.style.color = isActive ? '#3b4ef8' : '#2d405f';
    });

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const indicator = link.querySelector('.bestow-nav-indicator');
        if (indicator) indicator.style.transform = 'scaleX(1)';
      });
      link.addEventListener('mouseleave', () => {
        const indicator = link.querySelector('.bestow-nav-indicator');
        const isActive = link.classList.contains('active');
        if (indicator) indicator.style.transform = isActive ? 'scaleX(1)' : 'scaleX(0)';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', normalizeBestowHeader);
  window.addEventListener('load', normalizeBestowHeader);

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Add phone number field to the Web3Forms contact form without changing
   * the existing form configuration.
   */
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.php-email-form[action*="web3forms.com"]');
    if (!form || form.querySelector('input[name="phone"]')) return;

    const subjectField = form.querySelector('input[name="customer_subject"]');
    if (!subjectField) return;

    const subjectGroup = subjectField.closest('.form-group');
    if (!subjectGroup) return;

    const phoneGroup = document.createElement('div');
    phoneGroup.className = 'form-group mt-3';
    phoneGroup.innerHTML = '<input type="tel" class="form-control" name="phone" id="phone" placeholder="Your Phone Number" autocomplete="tel" required>';
    subjectGroup.parentNode.insertBefore(phoneGroup, subjectGroup);
  });

  /**
   * Trial homepage enquiry popup.
   * Set BESTOW_ENQUIRY_POPUP_ENABLED to false to disable it later.
   * The popup is shown once per browser session after a short delay.
   */
  const BESTOW_ENQUIRY_POPUP_ENABLED = true;

  function initBestowEnquiryPopup() {
    if (!BESTOW_ENQUIRY_POPUP_ENABLED) return;

    const path = (window.location.pathname || '/').toLowerCase();
    const isHome = path === '/' || path.endsWith('/index.html') || path.endsWith('/index.htm');
    if (!isHome) return;

    try {
      if (sessionStorage.getItem('bestow_enquiry_popup_seen') === '1') return;
    } catch (e) {}

    const style = document.createElement('style');
    style.id = 'bestow-enquiry-popup-style';
    style.textContent = `
      #bestow-enquiry-overlay{position:fixed;inset:0;background:rgba(12,25,56,.48);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;transition:opacity .28s ease,visibility .28s ease;z-index:10050}
      #bestow-enquiry-overlay.bestow-popup-visible{opacity:1;visibility:visible}
      .bestow-enquiry-modal{position:relative;width:min(470px,100%);max-height:calc(100vh - 40px);overflow:auto;background:#fff;border-radius:22px;box-shadow:0 25px 70px rgba(9,24,61,.28);transform:translateY(18px) scale(.98);transition:transform .3s ease;padding:30px}
      #bestow-enquiry-overlay.bestow-popup-visible .bestow-enquiry-modal{transform:translateY(0) scale(1)}
      .bestow-enquiry-close{position:absolute;right:14px;top:14px;width:36px;height:36px;border:0;border-radius:50%;background:#f1f5ff;color:#31456d;font-size:21px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s}
      .bestow-enquiry-close:hover{background:#e4ebff;color:#2454f4}
      .bestow-enquiry-brand{display:flex;align-items:center;gap:12px;margin-bottom:13px;padding-right:35px}
      .bestow-enquiry-brand img{width:auto;height:42px;max-width:190px;object-fit:contain}
      .bestow-enquiry-kicker{font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#53617c;margin-bottom:6px}
      .bestow-enquiry-title{font-size:27px;line-height:1.2;color:#10244d;font-weight:700;margin:0 0 7px}
      .bestow-enquiry-subtitle{font-size:13px;line-height:1.65;color:#66738c;margin:0 0 20px}
      .bestow-enquiry-form{display:grid;gap:12px}
      .bestow-enquiry-field{width:100%;border:1px solid #dfe6f4;border-radius:10px;background:#fbfcff;padding:11px 13px;font:500 13px Poppins,sans-serif;color:#263a60;outline:none;transition:border-color .2s,box-shadow .2s,background .2s}
      .bestow-enquiry-field:focus{border-color:#5d80f5;background:#fff;box-shadow:0 0 0 3px rgba(36,84,244,.09)}
      .bestow-enquiry-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .bestow-enquiry-field::placeholder{color:#9aa6ba}
      .bestow-enquiry-submit{border:0;border-radius:10px;background:#2454f4;color:#fff;padding:13px 18px;font:600 14px Poppins,sans-serif;cursor:pointer;box-shadow:0 9px 20px rgba(36,84,244,.2);transition:.2s}
      .bestow-enquiry-submit:hover{background:#1745dd;transform:translateY(-1px)}
      .bestow-enquiry-submit:disabled{opacity:.7;cursor:wait;transform:none}
      .bestow-enquiry-status{display:none;border-radius:10px;padding:11px 13px;font-size:12px;line-height:1.5}
      .bestow-enquiry-status.show{display:block}
      .bestow-enquiry-status.success{background:#ecfbf2;color:#19713d}
      .bestow-enquiry-status.error{background:#fff0f0;color:#a52b2b}
      .bestow-enquiry-note{text-align:center;font-size:10px;color:#8b96aa;margin:0}
      @media(max-width:520px){#bestow-enquiry-overlay{padding:12px}.bestow-enquiry-modal{padding:24px 18px;border-radius:18px;max-height:calc(100vh - 24px)}.bestow-enquiry-title{font-size:23px}.bestow-enquiry-grid{grid-template-columns:1fr}.bestow-enquiry-brand img{height:36px;max-width:170px}}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'bestow-enquiry-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="bestow-enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="bestow-enquiry-title">
        <button type="button" class="bestow-enquiry-close" aria-label="Close enquiry form">&times;</button>
        <div class="bestow-enquiry-brand"><img src="assets/img/logo.png" alt="Bestow IT Services"></div>
        <div class="bestow-enquiry-kicker">Need IT Support?</div>
        <h2 class="bestow-enquiry-title" id="bestow-enquiry-title">How Can We Help You?</h2>
        <p class="bestow-enquiry-subtitle">Tell us what IT support you need. Our team will get in touch with you.</p>
        <form class="bestow-enquiry-form" novalidate>
          <div class="bestow-enquiry-grid">
            <input class="bestow-enquiry-field" type="text" name="name" placeholder="Your Name *" autocomplete="name" required>
            <input class="bestow-enquiry-field" type="tel" name="phone" placeholder="Phone Number *" autocomplete="tel" required>
          </div>
          <div class="bestow-enquiry-grid">
            <input class="bestow-enquiry-field" type="email" name="email" placeholder="Email Address *" autocomplete="email" required>
            <select class="bestow-enquiry-field" name="customer_subject" required>
              <option value="" selected disabled>Service Required *</option>
              <option>Desktop & Computer Support</option>
              <option>Laptop Support & Computer AMC</option>
              <option>Network & Wi-Fi Solutions</option>
              <option>Data Backup & Recovery</option>
              <option>CCTV & Biometric Solutions</option>
              <option>EPABX & Telephone Systems</option>
              <option>Other IT Requirement</option>
            </select>
          </div>
          <textarea class="bestow-enquiry-field" name="message" rows="3" placeholder="Briefly describe your requirement *" required></textarea>
          <input type="text" name="company" tabindex="-1" autocomplete="off" style="display:none">
          <button class="bestow-enquiry-submit" type="submit">Send Enquiry</button>
          <div class="bestow-enquiry-status" role="status" aria-live="polite"></div>
          <p class="bestow-enquiry-note">Your enquiry will be sent securely to Bestow IT Services.</p>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);

    const modal = overlay.querySelector('.bestow-enquiry-modal');
    const closeButton = overlay.querySelector('.bestow-enquiry-close');
    const form = overlay.querySelector('.bestow-enquiry-form');
    const submitButton = overlay.querySelector('.bestow-enquiry-submit');
    const status = overlay.querySelector('.bestow-enquiry-status');
    let lastFocusedElement = null;

    function markSeen() {
      try { sessionStorage.setItem('bestow_enquiry_popup_seen', '1'); } catch (e) {}
    }

    function closePopup() {
      overlay.classList.remove('bestow-popup-visible');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
    }

    function openPopup() {
      lastFocusedElement = document.activeElement;
      overlay.classList.add('bestow-popup-visible');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => form.querySelector('input[name="name"]').focus(), 120);
    }

    closeButton.addEventListener('click', () => {
      markSeen();
      closePopup();
    });

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        markSeen();
        closePopup();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('bestow-popup-visible')) {
        markSeen();
        closePopup();
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (form.querySelector('input[name="company"]').value) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      status.className = 'bestow-enquiry-status';
      status.textContent = '';

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      payload.access_key = '414c8cf7-4187-4369-ad45-8c6132dd6610';
      payload.subject = 'New Website Popup Enquiry - BESTOW IT SERVICES';
      payload.from_name = 'BESTOW IT SERVICES Website Popup';
      payload.to = 'shakirpasha@bestowits.com,bestowits@gmail.com';
      payload.redirect = 'false';

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok && result.success === true) {
          status.className = 'bestow-enquiry-status success show';
          status.textContent = 'Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.';
          form.reset();
          markSeen();
          setTimeout(closePopup, 2200);
        } else {
          throw new Error(result.message || 'Unable to send your enquiry. Please try again.');
        }
      } catch (error) {
        status.className = 'bestow-enquiry-status error show';
        status.textContent = error.message || 'Something went wrong. Please try again.';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Enquiry';
      }
    });

    setTimeout(openPopup, 3500);
  }

  window.addEventListener('DOMContentLoaded', initBestowEnquiryPopup);

  /**
   * Initialize AOS after the page has loaded.
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()