document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('catalogueGrid');
  var filterBar = document.getElementById('filterBar');
  var modalOverlay = document.getElementById('productModal');
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  var activeFilter = 'All';

  var categoryEmojis = {
    'Stationery Sets': '✏️',
    'Toy Bundles': '🧸',
    'Keychains': '🔑',
    'Art & Craft': '🎨',
    'Puzzle & Games': '🧩'
  };

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://drive.google.com/thumbnail?id=' + encodeURIComponent(fileId) + '&sz=w' + (size || 400);
  }

  function getValidImages(product) {
    var imgs = product.images || (product.image ? [product.image] : []);
    return imgs.filter(function (id) { return id && !id.startsWith('PLACEHOLDER'); });
  }

  function whatsappUrl(productName) {
    var text = "Hi! I'm interested in ordering \"" + productName + "\" from Fundoo Gifts.";
    return 'https://wa.me/91800000000?text=' + encodeURIComponent(text);
  }

  function renderCard(product) {
    var card = document.createElement('div');
    card.className = 'catalogue-card' + (product.stock <= 0 ? ' out-of-stock' : '');
    card.setAttribute('data-category', product.category);

    var validImages = getValidImages(product);
    var emoji = categoryEmojis[product.category] || '🎁';

    var imgContainer = document.createElement('div');
    if (validImages.length > 0) {
      var img = document.createElement('img');
      img.className = 'catalogue-card-img';
      img.src = driveImageUrl(validImages[0]);
      img.alt = product.name;
      img.loading = 'lazy';
      imgContainer.appendChild(img);
    } else {
      imgContainer.className = 'catalogue-card-img-placeholder';
      imgContainer.textContent = emoji;
    }
    card.appendChild(imgContainer);

    if (product.stock <= 0) {
      var badge = document.createElement('span');
      badge.className = 'out-of-stock-badge';
      badge.textContent = 'Out of Stock';
      card.appendChild(badge);
    }

    var body = document.createElement('div');
    body.className = 'catalogue-card-body';

    var catLabel = document.createElement('div');
    catLabel.className = 'catalogue-card-category';
    catLabel.textContent = product.category;
    body.appendChild(catLabel);

    var title = document.createElement('h3');
    title.textContent = product.name;
    body.appendChild(title);

    var desc = document.createElement('p');
    desc.textContent = product.description.length > 100
      ? product.description.substring(0, 100) + '...'
      : product.description;
    body.appendChild(desc);

    card.appendChild(body);

    var footer = document.createElement('div');
    footer.className = 'catalogue-card-footer';

    var btn = document.createElement('a');
    if (product.stock > 0) {
      btn.className = 'catalogue-whatsapp-btn';
      btn.href = whatsappUrl(product.name);
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    } else {
      btn.className = 'catalogue-whatsapp-btn disabled';
      btn.href = '#';
    }
    btn.textContent = product.stock > 0 ? 'Order on WhatsApp' : 'Out of Stock';
    footer.appendChild(btn);
    card.appendChild(footer);

    card.addEventListener('click', function (e) {
      if (e.target.closest('.catalogue-whatsapp-btn')) return;
      openModal(product);
    });

    return card;
  }

  function renderGrid(filteredProducts) {
    grid.innerHTML = '';
    if (filteredProducts.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'catalogue-empty';
      empty.textContent = 'No products found in this category.';
      grid.appendChild(empty);
      return;
    }
    filteredProducts.forEach(function (p) {
      grid.appendChild(renderCard(p));
    });
  }

  function filterProducts() {
    if (activeFilter === 'All') return products;
    return products.filter(function (p) { return p.category === activeFilter; });
  }

  function setupFilters() {
    var categories = ['All'];
    products.forEach(function (p) {
      if (categories.indexOf(p.category) === -1) categories.push(p.category);
    });

    filterBar.innerHTML = '';
    categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'filter-pill' + (cat === activeFilter ? ' active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', function () {
        activeFilter = cat;
        filterBar.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderGrid(filterProducts());
      });
      filterBar.appendChild(btn);
    });
  }

  function openModal(product) {
    var modal = modalOverlay.querySelector('.modal');
    var validImages = getValidImages(product);
    var emoji = categoryEmojis[product.category] || '🎁';
    var imgContainer = modal.querySelector('.modal-img-container');
    imgContainer.innerHTML = '';

    if (validImages.length > 1) {
      var carousel = document.createElement('div');
      carousel.className = 'modal-carousel';

      var track = document.createElement('div');
      track.className = 'modal-carousel-track';

      validImages.forEach(function (id) {
        var img = document.createElement('img');
        img.className = 'modal-img';
        img.src = driveImageUrl(id, 800);
        img.alt = product.name;
        track.appendChild(img);
      });
      carousel.appendChild(track);

      var prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-nav carousel-prev';
      prevBtn.innerHTML = '&#8249;';
      prevBtn.setAttribute('aria-label', 'Previous image');
      carousel.appendChild(prevBtn);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-nav carousel-next';
      nextBtn.innerHTML = '&#8250;';
      nextBtn.setAttribute('aria-label', 'Next image');
      carousel.appendChild(nextBtn);

      imgContainer.appendChild(carousel);

      var thumbs = document.createElement('div');
      thumbs.className = 'modal-thumbnails';
      validImages.forEach(function (id, idx) {
        var thumb = document.createElement('img');
        thumb.className = 'modal-thumb' + (idx === 0 ? ' active' : '');
        thumb.src = driveImageUrl(id, 100);
        thumb.alt = 'Image ' + (idx + 1);
        thumb.addEventListener('click', function () {
          track.children[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
          thumbs.querySelectorAll('.modal-thumb').forEach(function (t) { t.classList.remove('active'); });
          thumb.classList.add('active');
        });
        thumbs.appendChild(thumb);
      });
      imgContainer.appendChild(thumbs);

      var currentIdx = 0;
      function scrollTo(idx) {
        if (idx < 0 || idx >= validImages.length) return;
        currentIdx = idx;
        track.children[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        thumbs.querySelectorAll('.modal-thumb').forEach(function (t, i) {
          t.classList.toggle('active', i === idx);
        });
      }
      prevBtn.addEventListener('click', function () { scrollTo(currentIdx - 1); });
      nextBtn.addEventListener('click', function () { scrollTo(currentIdx + 1); });

    } else if (validImages.length === 1) {
      var img = document.createElement('img');
      img.className = 'modal-img';
      img.src = driveImageUrl(validImages[0], 800);
      img.alt = product.name;
      imgContainer.appendChild(img);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'modal-img-placeholder';
      placeholder.textContent = emoji;
      imgContainer.appendChild(placeholder);
    }

    modal.querySelector('.modal-category').textContent = product.category;
    modal.querySelector('.modal-body h2').textContent = product.name;
    modal.querySelector('.modal-body p').textContent = product.description;

    var stockWarning = modal.querySelector('.modal-stock-warning');
    var orderBtn = modal.querySelector('.modal-whatsapp-btn');

    if (product.stock <= 0) {
      stockWarning.style.display = 'block';
      stockWarning.textContent = 'Currently out of stock. Check back soon!';
      orderBtn.className = 'modal-whatsapp-btn disabled';
      orderBtn.removeAttribute('href');
      orderBtn.removeAttribute('target');
      orderBtn.textContent = 'Out of Stock';
    } else {
      stockWarning.style.display = 'none';
      orderBtn.className = 'modal-whatsapp-btn';
      orderBtn.href = whatsappUrl(product.name);
      orderBtn.target = '_blank';
      orderBtn.rel = 'noopener noreferrer';
      orderBtn.textContent = 'Order on WhatsApp';
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  });

  // Hamburger menu
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Render
  if (products.length > 0) {
    setupFilters();
    renderGrid(products);
  } else {
    grid.innerHTML = '<div class="catalogue-empty">No products available yet. Check back soon!</div>';
  }
});
