document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(fileId) + '=s' + (size || 400);
  }

  // Populate product card images from product data
  var categoryMap = {};
  products.forEach(function (p) {
    var imgs = p.images || [];
    if (!categoryMap[p.category] && imgs.length > 0 && !imgs[0].startsWith('PLACEHOLDER')) {
      categoryMap[p.category] = imgs[0];
    }
  });

  document.querySelectorAll('.product-card[data-category]').forEach(function (card) {
    var cat = card.getAttribute('data-category');
    var wrapper = card.querySelector('.product-card-img-wrapper');
    if (!wrapper) return;
    if (categoryMap[cat]) {
      var img = document.createElement('img');
      img.src = driveImageUrl(categoryMap[cat]);
      img.alt = cat;
      img.loading = 'lazy';
      wrapper.appendChild(img);
    } else {
      var fallback = document.createElement('span');
      fallback.className = 'product-icon-fallback';
      fallback.textContent = cat.charAt(0);
      wrapper.appendChild(fallback);
    }
  });

  // Populate showcase strip with product images
  var showcaseTrack = document.getElementById('showcaseTrack');
  if (showcaseTrack && products.length > 0) {
    var allImages = [];
    products.forEach(function (p) {
      var imgs = p.images || [];
      imgs.forEach(function (id) {
        if (id && !id.startsWith('PLACEHOLDER')) {
          allImages.push({ id: id, name: p.name });
        }
      });
    });

    for (var i = allImages.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = allImages[i];
      allImages[i] = allImages[j];
      allImages[j] = temp;
    }

    var selected = allImages.slice(0, 14);
    var doubled = selected.concat(selected);

    doubled.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'showcase-item';
      var img = document.createElement('img');
      img.src = driveImageUrl(item.id, 300);
      img.alt = item.name;
      img.loading = 'lazy';
      div.appendChild(img);
      showcaseTrack.appendChild(div);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!link.classList.contains('nav-dropdown-toggle')) {
          navLinks.classList.remove('open');
        }
      });
    });
  }

  var dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      dropdownToggle.parentElement.classList.toggle('open');
    });
  }

  // Populate pricing cards with product names
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
