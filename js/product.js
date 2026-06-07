document.addEventListener('DOMContentLoaded', function () {
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  var layout = document.getElementById('productLayout');
  var notFound = document.getElementById('productNotFound');
  var backLink = document.getElementById('backLink');

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(fileId) + '=s' + (size || 800);
  }

  function getValidImages(product) {
    var imgs = product.images || (product.image ? [product.image] : []);
    return imgs.filter(function (id) { return id && !id.startsWith('PLACEHOLDER'); });
  }

  function getProductId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function preserveBackLink() {
    if (document.referrer && document.referrer.indexOf('catalogue.html') !== -1) {
      backLink.href = document.referrer;
    }
  }

  function renderProduct(product) {
    var validImages = getValidImages(product);
    document.title = product.name + ' - Fundoo Gifts';

    // Gallery
    var gallery = document.createElement('div');
    gallery.className = 'product-gallery';

    var mainImgWrap = document.createElement('div');
    mainImgWrap.className = 'product-main-img-wrap';

    if (validImages.length > 0) {
      var mainImg = document.createElement('img');
      mainImg.className = 'product-main-img';
      mainImg.src = driveImageUrl(validImages[0], 1200);
      mainImg.alt = product.name;
      mainImgWrap.appendChild(mainImg);

      if (validImages.length > 1) {
        var prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-nav gallery-prev';
        prevBtn.innerHTML = '&#8249;';
        prevBtn.setAttribute('aria-label', 'Previous image');
        mainImgWrap.appendChild(prevBtn);

        var nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-nav gallery-next';
        nextBtn.innerHTML = '&#8250;';
        nextBtn.setAttribute('aria-label', 'Next image');
        mainImgWrap.appendChild(nextBtn);
      }
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'product-main-img-placeholder';
      placeholder.textContent = product.name.charAt(0);
      mainImgWrap.appendChild(placeholder);
    }
    gallery.appendChild(mainImgWrap);

    if (validImages.length > 1) {
      var thumbStrip = document.createElement('div');
      thumbStrip.className = 'product-thumbs';

      var currentIdx = 0;
      var mainImg = mainImgWrap.querySelector('.product-main-img');

      validImages.forEach(function (id, idx) {
        var thumb = document.createElement('img');
        thumb.className = 'product-thumb' + (idx === 0 ? ' active' : '');
        thumb.src = driveImageUrl(id, 200);
        thumb.alt = 'Image ' + (idx + 1);
        thumb.addEventListener('click', function () {
          currentIdx = idx;
          mainImg.src = driveImageUrl(id, 1200);
          thumbStrip.querySelectorAll('.product-thumb').forEach(function (t) { t.classList.remove('active'); });
          thumb.classList.add('active');
        });
        thumbStrip.appendChild(thumb);
      });
      gallery.appendChild(thumbStrip);

      prevBtn.addEventListener('click', function () {
        if (currentIdx > 0) {
          currentIdx--;
          mainImg.src = driveImageUrl(validImages[currentIdx], 1200);
          thumbStrip.querySelectorAll('.product-thumb').forEach(function (t, i) {
            t.classList.toggle('active', i === currentIdx);
          });
        }
      });

      nextBtn.addEventListener('click', function () {
        if (currentIdx < validImages.length - 1) {
          currentIdx++;
          mainImg.src = driveImageUrl(validImages[currentIdx], 1200);
          thumbStrip.querySelectorAll('.product-thumb').forEach(function (t, i) {
            t.classList.toggle('active', i === currentIdx);
          });
        }
      });
    }

    // Details
    var details = document.createElement('div');
    details.className = 'product-details';

    var catBadge = document.createElement('span');
    catBadge.className = 'product-category-badge';
    catBadge.textContent = product.category;
    details.appendChild(catBadge);

    var title = document.createElement('h1');
    title.className = 'product-title';
    title.textContent = product.name;
    details.appendChild(title);

    var desc = document.createElement('p');
    desc.className = 'product-description';
    desc.textContent = product.description;
    details.appendChild(desc);

    var stockEl = document.createElement('div');
    if (product.stock > 0) {
      stockEl.className = 'product-stock in-stock';
      stockEl.textContent = 'In Stock';
    } else {
      stockEl.className = 'product-stock out-of-stock';
      stockEl.textContent = 'Currently Out of Stock';
    }
    details.appendChild(stockEl);

    var waBtn = document.createElement('a');
    var waText = "Hi! I'm interested in \"" + product.name + "\" from Fundoo Gifts.";
    waBtn.href = 'https://wa.me/918050623674?text=' + encodeURIComponent(waText);
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.className = 'product-contact-btn';
    waBtn.textContent = 'Contact to Buy';
    details.appendChild(waBtn);

    layout.appendChild(gallery);
    layout.appendChild(details);
  }

  // Hamburger menu
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Init
  var productId = getProductId();
  if (!productId) {
    layout.style.display = 'none';
    notFound.style.display = 'block';
    return;
  }

  var product = products.find(function (p) { return p.id === productId; });
  if (!product) {
    layout.style.display = 'none';
    notFound.style.display = 'block';
    return;
  }

  preserveBackLink();
  renderProduct(product);
});
