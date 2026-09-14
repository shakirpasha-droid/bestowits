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