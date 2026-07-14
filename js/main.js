document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  products.forEach(function (p) {
    if (p.category !== undefined && p.categories === undefined) {
      p.categories = [p.category];
    }
  });
  var siteConfig = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : { productOfTheMonth: '', whatsHot: [] };

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(fileId) + '=s' + (size || 400);
  }

  // Populate product card images from product data
  var categoryMap = {};
  products.forEach(function (p) {
    var imgs = p.images || [];
    (p.categories || []).forEach(function (cat) {
      if (!categoryMap[cat] && imgs.length > 0 && !imgs[0].startsWith('PLACEHOLDER')) {
        categoryMap[cat] = imgs[0];
      }
    });
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

  // ── Price Helpers ──

  function makePriceItem(label, value, cls) {
    var item = document.createElement('span');
    item.className = 'price-item';
    if (label) {
      var lbl = document.createElement('span');
      lbl.className = 'price-label';
      lbl.textContent = label;
      item.appendChild(lbl);
    }
    var val = document.createElement('span');
    val.className = cls;
    val.textContent = '₹' + value;
    item.appendChild(val);
    return item;
  }

  function renderPriceHtml(p) {
    var container = document.createElement('div');
    container.className = 'price-group';
    var mrp = p.mrp || 0;
    var fp = p.fundooPrice || 0;
    var op = p.offerPrice || 0;
    if (op > 0 && fp > 0 && mrp > 0) {
      container.appendChild(makePriceItem('MRP', mrp, 'price-mrp'));
      container.appendChild(makePriceItem('Fundoo', fp, 'price-fundoo'));
      container.appendChild(makePriceItem('Offer', op, 'price-highlight'));
    } else if (fp > 0 && mrp > 0) {
      container.appendChild(makePriceItem('MRP', mrp, 'price-mrp'));
      container.appendChild(makePriceItem('Fundoo Price', fp, 'price-highlight'));
    } else if (mrp > 0) {
      container.appendChild(makePriceItem('', mrp, 'price-single'));
    }
    return container;
  }

  // ── Product of the Month ──

  var potmSection = document.getElementById('product-of-month');
  var potmCard = document.getElementById('potmCard');
  if (potmSection && potmCard && siteConfig.productOfTheMonth) {
    var potmProduct = products.find(function (p) { return p.id === siteConfig.productOfTheMonth; });
    if (potmProduct) {
      potmSection.style.display = '';

      var potmLink = document.createElement('a');
      potmLink.href = 'product.html?id=' + encodeURIComponent(potmProduct.id);
      potmLink.className = 'potm-link';

      var potmImgWrap = document.createElement('div');
      potmImgWrap.className = 'potm-image';
      var potmImgs = potmProduct.images || [];
      if (potmImgs.length > 0 && !potmImgs[0].startsWith('PLACEHOLDER')) {
        var potmImg = document.createElement('img');
        potmImg.src = driveImageUrl(potmImgs[0], 600);
        potmImg.alt = potmProduct.name;
        potmImg.loading = 'lazy';
        potmImgWrap.appendChild(potmImg);
      }

      var potmDetails = document.createElement('div');
      potmDetails.className = 'potm-details';

      var potmCat = document.createElement('span');
      potmCat.className = 'potm-category';
      potmCat.textContent = (potmProduct.categories || []).join(' | ');
      potmDetails.appendChild(potmCat);

      var potmName = document.createElement('h3');
      potmName.className = 'potm-name';
      potmName.textContent = potmProduct.name;
      potmDetails.appendChild(potmName);

      var potmDesc = document.createElement('p');
      potmDesc.className = 'potm-desc';
      potmDesc.textContent = potmProduct.description;
      potmDetails.appendChild(potmDesc);

      potmDetails.appendChild(renderPriceHtml(potmProduct));

      var potmBtn = document.createElement('span');
      potmBtn.className = 'potm-btn';
      potmBtn.textContent = 'View Product';
      potmDetails.appendChild(potmBtn);

      potmLink.appendChild(potmImgWrap);
      potmLink.appendChild(potmDetails);
      potmCard.appendChild(potmLink);
    }
  }

  // ── What's Hot ──

  var whatsHotSection = document.getElementById('whats-hot');
  var whatsHotGrid = document.getElementById('whatsHotGrid');
  if (whatsHotSection && whatsHotGrid && siteConfig.whatsHot && siteConfig.whatsHot.length > 0) {
    var hotProducts = siteConfig.whatsHot.map(function (id) {
      return products.find(function (p) { return p.id === id; });
    }).filter(Boolean);

    if (hotProducts.length > 0) {
      whatsHotSection.style.display = '';

      hotProducts.forEach(function (hp) {
        var card = document.createElement('a');
        card.href = 'product.html?id=' + encodeURIComponent(hp.id);
        card.className = 'hot-card';

        var imgWrap = document.createElement('div');
        imgWrap.className = 'hot-card-img';
        var imgs = hp.images || [];
        if (imgs.length > 0 && !imgs[0].startsWith('PLACEHOLDER')) {
          var img = document.createElement('img');
          img.src = driveImageUrl(imgs[0], 400);
          img.alt = hp.name;
          img.loading = 'lazy';
          imgWrap.appendChild(img);
        }
        card.appendChild(imgWrap);

        var body = document.createElement('div');
        body.className = 'hot-card-body';

        var name = document.createElement('h3');
        name.textContent = hp.name;
        body.appendChild(name);

        body.appendChild(renderPriceHtml(hp));
        card.appendChild(body);

        whatsHotGrid.appendChild(card);
      });
    }
  }

  // ── What's New Hero Carousel ──

  var heroCarousel = document.getElementById('heroCarousel');
  var heroPrev = document.getElementById('heroPrev');
  var heroNext = document.getElementById('heroNext');
  var heroDots = document.getElementById('heroDots');

  if (heroCarousel && siteConfig.whatsNew && siteConfig.whatsNew.length > 0) {
    var newProducts = siteConfig.whatsNew.map(function (id) {
      return products.find(function (p) { return p.id === id; });
    }).filter(Boolean);

    if (newProducts.length > 0) {
      newProducts.forEach(function (np) {
        var slide = document.createElement('div');
        slide.className = 'hero-slide';

        var product = document.createElement('div');
        product.className = 'hero-slide-product';

        var imgWrap = document.createElement('div');
        imgWrap.className = 'hero-slide-img-wrap';
        var imgs = np.images || [];
        if (imgs.length > 0 && !imgs[0].startsWith('PLACEHOLDER')) {
          var img = document.createElement('img');
          img.src = driveImageUrl(imgs[0], 600);
          img.alt = np.name;
          imgWrap.appendChild(img);
        }
        product.appendChild(imgWrap);

        var info = document.createElement('div');
        info.className = 'hero-slide-info';

        var badge = document.createElement('span');
        badge.className = 'hero-slide-badge';
        badge.textContent = "WHAT'S NEW";
        info.appendChild(badge);

        var name = document.createElement('h2');
        name.className = 'hero-slide-name';
        name.textContent = np.name;
        info.appendChild(name);

        info.appendChild(renderPriceHtml(np));

        var cta = document.createElement('a');
        cta.href = 'product.html?id=' + encodeURIComponent(np.id);
        cta.className = 'hero-slide-cta';
        cta.textContent = 'View Product';
        info.appendChild(cta);

        product.appendChild(info);
        slide.appendChild(product);
        heroCarousel.appendChild(slide);
      });

      var allSlides = heroCarousel.querySelectorAll('.hero-slide');
      var heroSection = heroCarousel.closest('.hero');
      if (allSlides.length > 1 && heroSection) {
        heroSection.classList.add('hero-carousel-active');
      }

      // Build dots
      if (heroDots && allSlides.length > 1) {
        for (var di = 0; di < allSlides.length; di++) {
          var dot = document.createElement('button');
          dot.className = 'hero-dot' + (di === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Slide ' + (di + 1));
          dot.setAttribute('data-index', di);
          dot.addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-index'), 10));
          });
          heroDots.appendChild(dot);
        }
      }

      var currentSlide = 0;
      var autoTimer = null;
      var dotEls = heroDots ? heroDots.querySelectorAll('.hero-dot') : [];

      function goToSlide(index) {
        allSlides[currentSlide].classList.remove('active');
        if (dotEls.length > 0) dotEls[currentSlide].classList.remove('active');
        currentSlide = (index + allSlides.length) % allSlides.length;
        allSlides[currentSlide].classList.add('active');
        if (dotEls.length > 0) dotEls[currentSlide].classList.add('active');
        resetAuto();
      }

      function resetAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(function () {
          goToSlide(currentSlide + 1);
        }, 5000);
      }

      if (heroPrev) heroPrev.addEventListener('click', function () { goToSlide(currentSlide - 1); });
      if (heroNext) heroNext.addEventListener('click', function () { goToSlide(currentSlide + 1); });

      if (heroSection && allSlides.length > 1) {
        heroSection.addEventListener('mouseenter', function () {
          if (autoTimer) clearInterval(autoTimer);
        });
        heroSection.addEventListener('mouseleave', function () {
          resetAuto();
        });
        resetAuto();
      }
    }
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

  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
        if (dd !== toggle.parentElement) dd.classList.remove('open');
      });
      toggle.parentElement.classList.toggle('open');
    });
  });

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
      var ep = p.offerPrice > 0 ? p.offerPrice : (p.fundooPrice > 0 ? p.fundooPrice : (p.mrp || 0));
      return ep >= range.min && ep <= range.max;
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

  if (formSuccess && window.location.search.indexOf('submitted=1') !== -1) {
    formSuccess.style.display = 'block';
    setTimeout(function () {
      formSuccess.style.display = 'none';
    }, 5000);
    history.replaceState(null, '', window.location.pathname + '#contact');
  }
});
