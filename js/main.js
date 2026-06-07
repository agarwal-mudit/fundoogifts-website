document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // Populate pricing cards with product names
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  var packRanges = {
    budget: { min: 0, max: 49 },
    classic: { min: 50, max: 100 },
    premium: { min: 101, max: Infinity }
  };

  document.querySelectorAll('.pricing-product-list').forEach(function (container) {
    var pack = container.getAttribute('data-pack');
    var range = packRanges[pack];
    if (!range) return;

    var matching = products.filter(function (p) {
      return p.price >= range.min && p.price <= range.max;
    });

    if (matching.length === 0) {
      container.innerHTML = '<span class="pricing-product-empty">More products coming soon!</span>';
      return;
    }

    matching.forEach(function (p) {
      var item = document.createElement('div');
      item.className = 'pricing-product-item';
      item.textContent = p.name;
      container.appendChild(item);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.reset();
      if (formSuccess) {
        formSuccess.style.display = 'block';
        setTimeout(function () {
          formSuccess.style.display = 'none';
        }, 4000);
      }
    });
  }
});
