document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('catalogueGrid');
  var filterBar = document.getElementById('filterBar');
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  var activeFilter = 'All';
  var activePack = null;

  var packRanges = {
    budget: { label: 'Budget Pack', min: 0, max: 49 },
    classic: { label: 'Classic Pack', min: 50, max: 100 },
    premium: { label: 'Premium Pack', min: 101, max: Infinity }
  };

  var categoryEmojis = {
    'Stationery Sets': '✏️',
    'Toy Bundles': '🧸',
    'Keychains': '🔑',
    'Art & Craft': '🎨',
    'Puzzle & Games': '🧩'
  };

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(fileId) + '=s' + (size || 400);
  }

  function getValidImages(product) {
    var imgs = product.images || (product.image ? [product.image] : []);
    return imgs.filter(function (id) { return id && !id.startsWith('PLACEHOLDER'); });
  }

  function getPackFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('pack');
  }

  function filterByPack(list) {
    if (!activePack || !packRanges[activePack]) return list;
    var range = packRanges[activePack];
    return list.filter(function (p) { return p.price >= range.min && p.price <= range.max; });
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

    card.addEventListener('click', function () {
      window.location.href = 'product.html?id=' + encodeURIComponent(product.id);
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
    var list = filterByPack(products);
    if (activeFilter === 'All') return list;
    return list.filter(function (p) { return p.category === activeFilter; });
  }

  function setupFilters(baseProducts) {
    var categories = ['All'];
    baseProducts.forEach(function (p) {
      if (categories.indexOf(p.category) === -1) categories.push(p.category);
    });

    filterBar.innerHTML = '';

    if (activePack && packRanges[activePack]) {
      var packLabel = document.createElement('div');
      packLabel.className = 'pack-filter-label';
      packLabel.textContent = packRanges[activePack].label;
      filterBar.insertAdjacentElement('beforebegin', packLabel);
    }

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
  activePack = getPackFromUrl();
  var baseProducts = filterByPack(products);

  if (baseProducts.length > 0) {
    setupFilters(baseProducts);
    renderGrid(baseProducts);
  } else if (activePack) {
    grid.innerHTML = '<div class="catalogue-empty">No products found in this price range. Check back soon!</div>';
  } else {
    grid.innerHTML = '<div class="catalogue-empty">No products available yet. Check back soon!</div>';
  }
});
