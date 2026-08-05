(function () {
  var products = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  var MASCOT = 'images/gifti.jpeg';

  var packRanges = GiftFilterLogic.packRanges;
  var effectivePrice = GiftFilterLogic.effectivePrice;

  function driveImageUrl(fileId, size) {
    if (!fileId || fileId.startsWith('PLACEHOLDER')) return '';
    return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(fileId) + '=s' + (size || 200);
  }

  function getValidImages(product) {
    var imgs = product.images || (product.image ? [product.image] : []);
    return imgs.filter(function (id) { return id && !id.startsWith('PLACEHOLDER'); });
  }

  function filterProducts(filters) {
    return GiftFilterLogic.filterProducts(products, filters);
  }

  // Build DOM
  var container = document.getElementById('giftFinder');
  if (!container) return;

  // FAB button
  var fab = document.createElement('div');
  fab.className = 'gift-finder-fab';
  fab.innerHTML = '<img src="' + MASCOT + '" alt="Gifti">';
  container.appendChild(fab);

  // Speech bubble
  var bubble = document.createElement('div');
  bubble.className = 'gift-finder-bubble';
  bubble.innerHTML = 'Need help finding the <strong>perfect gift</strong>? Ask me!';
  container.appendChild(bubble);

  // Chat panel
  var panel = document.createElement('div');
  panel.className = 'gift-finder-panel';
  panel.innerHTML =
    '<div class="gift-finder-header">' +
      '<img src="' + MASCOT + '" alt="Gifti" class="gift-finder-header-avatar">' +
      '<div class="gift-finder-header-info">' +
        '<div class="gift-finder-header-name">Gifti</div>' +
        '<div class="gift-finder-header-status">Your Gift Finding Assistant</div>' +
      '</div>' +
      '<button class="gift-finder-close">&times;</button>' +
    '</div>' +
    '<div class="gift-finder-messages" id="gfMessages"></div>';
  container.appendChild(panel);

  var messagesEl = panel.querySelector('#gfMessages');
  var closeBtn = panel.querySelector('.gift-finder-close');

  // Toggle panel
  function openPanel() {
    panel.classList.add('open');
    bubble.classList.add('hidden');
    if (messagesEl.children.length === 0) showWelcome();
    scrollToBottom();
  }

  function closePanel() {
    panel.classList.remove('open');
    bubble.classList.remove('hidden');
  }

  fab.addEventListener('click', function () {
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  bubble.addEventListener('click', function () {
    openPanel();
  });

  closeBtn.addEventListener('click', function () {
    closePanel();
  });

  function scrollToBottom() {
    setTimeout(function () {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 50);
  }

  function addBotMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'gf-msg gf-msg-bot';
    msg.innerHTML =
      '<img src="' + MASCOT + '" alt="Gifti" class="gf-msg-avatar">' +
      '<div class="gf-msg-bubble">' + text + '</div>';
    messagesEl.appendChild(msg);
    scrollToBottom();
  }

  function addUserMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'gf-msg gf-msg-user';
    msg.innerHTML = '<div class="gf-msg-bubble">' + text + '</div>';
    messagesEl.appendChild(msg);
    scrollToBottom();
  }

  function addOptions(options) {
    var wrapper = document.createElement('div');
    wrapper.className = 'gf-options';
    options.forEach(function (opt) {
      var chip = document.createElement('button');
      chip.className = 'gf-chip' + (opt.secondary ? ' gf-chip-secondary' : '');
      chip.textContent = opt.label;
      chip.addEventListener('click', function () {
        wrapper.remove();
        addUserMessage(opt.label);
        setTimeout(function () { opt.action(); }, 300);
      });
      wrapper.appendChild(chip);
    });
    messagesEl.appendChild(wrapper);
    scrollToBottom();
  }

  function showResults(filtered, filters) {
    if (filtered.length === 0) {
      addBotMessage("Hmm, I couldn't find exact matches. Let me show you some close options!");
      var relaxed = filterProducts({});
      if (relaxed.length > 0) {
        showResultCards(relaxed.slice(0, 6));
      }
    } else {
      var count = filtered.length;
      addBotMessage("I found <strong>" + count + " gift" + (count > 1 ? 's' : '') + "</strong> for you! Here are my top picks:");
      showResultCards(filtered.slice(0, 6));
      if (count > 6) {
        var params = [];
        if (filters.budget) params.push('pack=' + filters.budget);
        if (filters.age) params.push('age=' + filters.age);
        if (filters.gender) params.push('gender=' + filters.gender);
        if (filters.category) params.push('cat=' + filters.category);
        var href = 'catalogue.html' + (params.length ? '?' + params.join('&') : '');
        var actionsDiv = document.createElement('div');
        actionsDiv.className = 'gf-actions';
        actionsDiv.innerHTML =
          '<a href="' + href + '" class="gf-action-link gf-action-primary">View all ' + count + ' matches</a>';
        messagesEl.appendChild(actionsDiv);
      }
    }
    showRestartOption();
  }

  function showResultCards(list) {
    var resultsDiv = document.createElement('div');
    resultsDiv.className = 'gf-results';
    list.forEach(function (p) {
      var card = document.createElement('a');
      card.className = 'gf-result-card';
      card.href = 'product.html?id=' + encodeURIComponent(p.id);

      var imgs = getValidImages(p);
      if (imgs.length > 0) {
        card.innerHTML =
          '<img src="' + driveImageUrl(imgs[0]) + '" alt="' + p.name + '" class="gf-result-img">' +
          '<div class="gf-result-info">' +
            '<div class="gf-result-name">' + p.name + '</div>' +
            '<div class="gf-result-price">' + formatPrice(p) + '</div>' +
          '</div>';
      } else {
        card.innerHTML =
          '<div class="gf-result-img-placeholder">' + p.name.charAt(0) + '</div>' +
          '<div class="gf-result-info">' +
            '<div class="gf-result-name">' + p.name + '</div>' +
            '<div class="gf-result-price">' + formatPrice(p) + '</div>' +
          '</div>';
      }
      resultsDiv.appendChild(card);
    });
    messagesEl.appendChild(resultsDiv);
    scrollToBottom();
  }

  function formatPrice(p) {
    var ep = effectivePrice(p);
    if (p.fundooPrice > 0 && p.mrp > p.fundooPrice) {
      return '₹' + ep + ' (MRP ₹' + p.mrp + ')';
    }
    return '₹' + ep;
  }

  function showRestartOption() {
    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'gf-actions';
    var restartBtn = document.createElement('button');
    restartBtn.className = 'gf-action-link gf-action-outline';
    restartBtn.textContent = 'Start Over';
    restartBtn.addEventListener('click', function () {
      messagesEl.innerHTML = '';
      showWelcome();
    });
    actionsDiv.appendChild(restartBtn);
    messagesEl.appendChild(actionsDiv);
    scrollToBottom();
  }

  // ── Welcome Screen ──

  function showWelcome() {
    addBotMessage("Hi! I'm <strong>Gifti</strong>, your gift finding assistant! What are you looking for today?");

    addOptions([
      { label: 'Gifts for 0-2 years', action: function () {
        showResults(filterProducts({ age: '0-2' }), { age: '0-2' });
      }},
      { label: 'Gifts for 2-5 years', action: function () {
        showResults(filterProducts({ age: '2-5' }), { age: '2-5' });
      }},
      { label: 'Gifts for 5-8 years', action: function () {
        showResults(filterProducts({ age: '5-8' }), { age: '5-8' });
      }},
      { label: 'Gifts for 8+ years', action: function () {
        showResults(filterProducts({ age: '8+' }), { age: '8+' });
      }},
      { label: 'Gifts under ₹50', action: function () {
        showResults(filterProducts({ budget: 'budget' }), { budget: 'budget' });
      }},
      { label: 'Gifts ₹50 to ₹100', action: function () {
        showResults(filterProducts({ budget: 'classic' }), { budget: 'classic' });
      }},
      { label: 'Premium gifts ₹100+', action: function () {
        showResults(filterProducts({ budget: 'premium' }), { budget: 'premium' });
      }},
      { label: 'Help me choose', secondary: true, action: function () {
        startGuidedFlow();
      }}
    ]);
  }

  // ── Guided Flow ──

  var filters = {};

  function startGuidedFlow() {
    filters = {};
    askAge();
  }

  function askAge() {
    addBotMessage("What age group is the gift for?");
    addOptions([
      { label: '0-2 years', action: function () { filters.age = '0-2'; askGender(); }},
      { label: '2-5 years', action: function () { filters.age = '2-5'; askGender(); }},
      { label: '5-8 years', action: function () { filters.age = '5-8'; askGender(); }},
      { label: '8+ years', action: function () { filters.age = '8+'; askGender(); }},
      { label: 'Any age', secondary: true, action: function () { askGender(); }}
    ]);
  }

  function askGender() {
    addBotMessage("Is this for a boy or a girl?");
    addOptions([
      { label: 'Boy', action: function () { filters.gender = 'boys'; askBudget(); }},
      { label: 'Girl', action: function () { filters.gender = 'girls'; askBudget(); }},
      { label: 'Both / Any', secondary: true, action: function () { askBudget(); }}
    ]);
  }

  function askBudget() {
    addBotMessage("What's your budget per gift?");
    addOptions([
      { label: 'Under ₹50', action: function () { filters.budget = 'budget'; showFinalResults(); }},
      { label: '₹50 to ₹100', action: function () { filters.budget = 'classic'; showFinalResults(); }},
      { label: '₹100+', action: function () { filters.budget = 'premium'; showFinalResults(); }},
      { label: 'Any budget', secondary: true, action: function () { showFinalResults(); }}
    ]);
  }

  function showFinalResults() {
    var filtered = filterProducts(filters);
    showResults(filtered, filters);
  }
})();
