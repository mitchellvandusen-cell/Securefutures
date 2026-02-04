// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          nav.classList.remove('open');
          toggle.classList.remove('active');
        }
      });
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.main-nav > li').forEach(function (item) {
    const dropdownMenu = item.querySelector('.dropdown-menu');
    if (dropdownMenu) {
      item.querySelector(':scope > a').addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var item = this.parentElement;
      var body = item.querySelector('.accordion-body');
      var inner = body.querySelector('.accordion-body-inner');

      if (item.classList.contains('active')) {
        body.style.maxHeight = '0';
        item.classList.remove('active');
      } else {
        // Close other items
        document.querySelectorAll('.accordion-item.active').forEach(function (openItem) {
          openItem.querySelector('.accordion-body').style.maxHeight = '0';
          openItem.classList.remove('active');
        });
        item.classList.add('active');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // Contact Form
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('submitBtn');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      // Simulate send (replace with actual endpoint)
      setTimeout(function () {
        contactForm.style.display = 'none';
        document.querySelector('.contact-wrapper h3').style.display = 'none';
        document.querySelector('.contact-wrapper > p').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
      }, 800);
    });
  }

  // Active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      var parentLi = link.closest('li');
      if (parentLi) parentLi.classList.add('active');
      // Also mark parent dropdown if in dropdown
      var parentDropdown = link.closest('.dropdown-menu');
      if (parentDropdown) {
        parentDropdown.closest('li').classList.add('active');
      }
    }
  });
});
