document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('catalogueGrid');
  var filterBar = document.getElementById('filterBar');
  var sortSelect = document.getElementById('sortSelect');
  var searchInput = document.getElementById('catalogueSearch');
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  products.forEach(function (p) {
    if (p.category !== undefined && p.categories === undefined) {
      p.categories = [p.category];
    }
  });
  var activeFilter = 'All';
  var activePack = null;
  var activeAge = null;
  var activeSort = 'relevance';
  var searchQuery = '';

  var packRanges = {
    budget: { label: 'Budget Pack', min: 0, max: 49 },
    classic: { label: 'Classic Pack', min: 50, max: 100 },
    premium: { label: 'Premium Pack', min: 101, max: Infinity }
  };

  var ageRanges = {
    toddler: { label: 'Less than 3 years' },
    kids:    { label: '3 to 8 years' },
    older:   { label: '8+ years' }
  };

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(fileId) + '=s' + (size || 400);
  }

  function getValidImages(product) {
    var imgs = product.images || (product.image ? [product.image] : []);
    return imgs.filter(function (id) { return id && !id.startsWith('PLACEHOLDER'); });
  }

  function effectivePrice(p) {
    if (p.offerPrice > 0) return p.offerPrice;
    if (p.fundooPrice > 0) return p.fundooPrice;
    return p.mrp || 0;
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

  function getPackFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('pack');
  }

  function getCatFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('cat');
  }

  function getAgeFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('age');
  }

  function getSearchFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('q') || '').trim();
  }

  function filterByPack(list) {
    if (!activePack || !packRanges[activePack]) return list;
    var range = packRanges[activePack];
    return list.filter(function (p) {
      var ep = effectivePrice(p);
      return ep >= range.min && ep <= range.max;
    });
  }

  function filterByAge(list) {
    if (!activeAge || !ageRanges[activeAge]) return list;
    return list.filter(function (p) {
      var pAge = p.age || 'any';
      return pAge === activeAge || pAge === 'any';
    });
  }

  function filterBySearch(list) {
    if (!searchQuery) return list;
    var q = searchQuery.toLowerCase();
    return list.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1 ||
             (p.categories || []).some(function (c) { return c.toLowerCase().indexOf(q) !== -1; }) ||
             (p.description && p.description.toLowerCase().indexOf(q) !== -1);
    });
  }

  function sortProducts(list) {
    var sorted = list.slice();
    switch (activeSort) {
      case 'price-low':
        sorted.sort(function (a, b) { return effectivePrice(a) - effectivePrice(b); });
        break;
      case 'price-high':
        sorted.sort(function (a, b) { return effectivePrice(b) - effectivePrice(a); });
        break;
      case 'name-az':
        sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
        break;
      case 'name-za':
        sorted.sort(function (a, b) { return b.name.localeCompare(a.name); });
        break;
    }
    return sorted;
  }

  function renderCard(product) {
    var card = document.createElement('div');
    card.className = 'catalogue-card' + (product.stock <= 0 ? ' out-of-stock' : '');
    card.setAttribute('data-category', (product.categories || []).join(','));

    var validImages = getValidImages(product);
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
      imgContainer.textContent = product.name.charAt(0);
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
    catLabel.textContent = (product.categories || []).join(' | ');
    body.appendChild(catLabel);

    var title = document.createElement('h3');
    title.textContent = product.name;
    body.appendChild(title);

    body.appendChild(renderPriceHtml(product));

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
      empty.textContent = searchQuery
        ? 'No products found for "' + searchQuery + '".'
        : 'No products found in this category.';
      grid.appendChild(empty);
      return;
    }
    filteredProducts.forEach(function (p) {
      grid.appendChild(renderCard(p));
    });
  }

  function getFilteredProducts() {
    var list = filterByPack(products);
    list = filterByAge(list);
    list = filterBySearch(list);
    if (activeFilter !== 'All') {
      list = list.filter(function (p) { return (p.categories || []).indexOf(activeFilter) !== -1; });
    }
    return sortProducts(list);
  }

  function refresh() {
    renderGrid(getFilteredProducts());
  }

  function setupFilters(baseProducts) {
    var categories = ['All'];
    baseProducts.forEach(function (p) {
      (p.categories || []).forEach(function (cat) {
        if (categories.indexOf(cat) === -1) categories.push(cat);
      });
    });

    filterBar.innerHTML = '';

    if (activePack && packRanges[activePack]) {
      var packLabel = document.createElement('div');
      packLabel.className = 'pack-filter-label';
      packLabel.textContent = packRanges[activePack].label;
      filterBar.insertAdjacentElement('beforebegin', packLabel);
    }

    if (activeAge && ageRanges[activeAge]) {
      var ageLabel = document.createElement('div');
      ageLabel.className = 'pack-filter-label';
      ageLabel.textContent = ageRanges[activeAge].label;
      filterBar.insertAdjacentElement('beforebegin', ageLabel);
    }

    categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'filter-pill' + (cat === activeFilter ? ' active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', function () {
        activeFilter = cat;
        filterBar.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        refresh();
      });
      filterBar.appendChild(btn);
    });
  }

  // Sort change handler
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      activeSort = sortSelect.value;
      refresh();
    });
  }

  // Live search on catalogue page
  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        searchQuery = searchInput.value.trim();
        refresh();
      }, 250);
    });
  }

  // Intercept nav search form on catalogue page to use live filtering
  var navSearchForm = document.querySelector('.nav-search-form');
  if (navSearchForm && searchInput) {
    navSearchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var navInput = navSearchForm.querySelector('.nav-search-input');
      if (navInput) {
        searchInput.value = navInput.value;
        searchQuery = navInput.value.trim();
        refresh();
        searchInput.focus();
      }
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

  // Nav dropdown toggles
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
        if (dd !== toggle.parentElement) dd.classList.remove('open');
      });
      toggle.parentElement.classList.toggle('open');
    });
  });

  // Init
  activePack = getPackFromUrl();
  activeAge = getAgeFromUrl();
  var urlCat = getCatFromUrl();
  searchQuery = getSearchFromUrl();
  if (urlCat) activeFilter = urlCat;

  // Pre-fill search inputs if there's a query from URL
  if (searchQuery) {
    if (searchInput) searchInput.value = searchQuery;
    var navInput = document.querySelector('.nav-search-input');
    if (navInput) navInput.value = searchQuery;
  }

  var baseProducts = filterByAge(filterByPack(products));

  if (baseProducts.length > 0 || (!activePack && !activeAge)) {
    setupFilters(baseProducts.length > 0 ? baseProducts : products);
    refresh();
  } else {
    grid.innerHTML = '<div class="catalogue-empty">No products found in this price range. Check back soon!</div>';
  }
});
