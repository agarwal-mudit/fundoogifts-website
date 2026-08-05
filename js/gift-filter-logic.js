(function (exports) {
  var packRanges = {
    budget:  { min: 0, max: 49 },
    classic: { min: 50, max: 100 },
    premium: { min: 101, max: Infinity }
  };

  function effectivePrice(p) {
    if (p.fundooPrice > 0) return p.fundooPrice;
    return p.mrp || 0;
  }

  function filterProducts(products, filters) {
    return products.filter(function (p) {
      if (p.stock <= 0) return false;

      var ages = Array.isArray(p.age) ? p.age : (p.age ? [p.age] : ['any']);
      if (filters.age && ages.indexOf(filters.age) === -1 && ages.indexOf('any') === -1) return false;

      var pGender = p.gender || 'any';
      if (filters.gender && pGender !== 'any' && pGender !== filters.gender) return false;

      if (filters.budget && packRanges[filters.budget]) {
        var range = packRanges[filters.budget];
        var ep = effectivePrice(p);
        if (ep < range.min || ep > range.max) return false;
      }

      if (filters.category) {
        if (!(p.categories || []).some(function (c) { return c === filters.category; })) return false;
      }

      return true;
    });
  }

  exports.packRanges = packRanges;
  exports.effectivePrice = effectivePrice;
  exports.filterProducts = filterProducts;
})(typeof module !== 'undefined' && module.exports ? module.exports : (this.GiftFilterLogic = {}));
