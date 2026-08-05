import unittest
from helpers import filter_products, effective_price, PACK_RANGES


def make_product(**kwargs):
    base = {'id': 'test-1', 'name': 'Test', 'mrp': 50, 'fundooPrice': 0,
            'stock': 10, 'categories': ['Toys'], 'images': ['img1']}
    base.update(kwargs)
    return base


class TestGenderFilter(unittest.TestCase):
    def setUp(self):
        self.boy_product = make_product(id='b1', gender='boys')
        self.girl_product = make_product(id='g1', gender='girls')
        self.any_product = make_product(id='a1', gender='any')
        self.no_gender = make_product(id='n1')
        self.all = [self.boy_product, self.girl_product, self.any_product, self.no_gender]

    def test_boys_filter_excludes_girls(self):
        result = filter_products(self.all, {'gender': 'boys'})
        ids = [p['id'] for p in result]
        self.assertNotIn('g1', ids)

    def test_girls_filter_excludes_boys(self):
        result = filter_products(self.all, {'gender': 'girls'})
        ids = [p['id'] for p in result]
        self.assertNotIn('b1', ids)

    def test_boys_filter_includes_any(self):
        result = filter_products(self.all, {'gender': 'boys'})
        ids = [p['id'] for p in result]
        self.assertIn('a1', ids)

    def test_girls_filter_includes_any(self):
        result = filter_products(self.all, {'gender': 'girls'})
        ids = [p['id'] for p in result]
        self.assertIn('a1', ids)

    def test_boys_filter_includes_boys(self):
        result = filter_products(self.all, {'gender': 'boys'})
        ids = [p['id'] for p in result]
        self.assertIn('b1', ids)

    def test_no_gender_filter_returns_all_in_stock(self):
        result = filter_products(self.all, {})
        self.assertEqual(len(result), 4)

    def test_missing_gender_defaults_to_any(self):
        result = filter_products(self.all, {'gender': 'boys'})
        ids = [p['id'] for p in result]
        self.assertIn('n1', ids)


class TestAgeFilter(unittest.TestCase):
    def test_age_array_match(self):
        p = make_product(age=['5-8', '8+'])
        result = filter_products([p], {'age': '5-8'})
        self.assertEqual(len(result), 1)

    def test_age_array_no_match(self):
        p = make_product(age=['0-2'])
        result = filter_products([p], {'age': '5-8'})
        self.assertEqual(len(result), 0)

    def test_age_any_passes_all(self):
        p = make_product(age=['any'])
        result = filter_products([p], {'age': '8+'})
        self.assertEqual(len(result), 1)

    def test_missing_age_defaults_to_any(self):
        p = make_product()
        result = filter_products([p], {'age': '2-5'})
        self.assertEqual(len(result), 1)

    def test_string_age_treated_as_single_element(self):
        p = make_product(age='5-8')
        result = filter_products([p], {'age': '5-8'})
        self.assertEqual(len(result), 1)

    def test_no_age_filter_returns_all(self):
        products = [make_product(age=['0-2']), make_product(age=['8+'])]
        result = filter_products(products, {})
        self.assertEqual(len(result), 2)


class TestBudgetFilter(unittest.TestCase):
    def test_budget_range(self):
        p = make_product(mrp=30, fundooPrice=0)
        result = filter_products([p], {'budget': 'budget'})
        self.assertEqual(len(result), 1)

    def test_classic_range(self):
        p = make_product(mrp=75, fundooPrice=0)
        result = filter_products([p], {'budget': 'classic'})
        self.assertEqual(len(result), 1)

    def test_premium_range(self):
        p = make_product(mrp=200, fundooPrice=0)
        result = filter_products([p], {'budget': 'premium'})
        self.assertEqual(len(result), 1)

    def test_budget_excludes_expensive(self):
        p = make_product(mrp=200, fundooPrice=0)
        result = filter_products([p], {'budget': 'budget'})
        self.assertEqual(len(result), 0)

    def test_uses_fundoo_price_when_available(self):
        p = make_product(mrp=200, fundooPrice=40)
        result = filter_products([p], {'budget': 'budget'})
        self.assertEqual(len(result), 1)


class TestStockFilter(unittest.TestCase):
    def test_zero_stock_excluded(self):
        p = make_product(stock=0)
        result = filter_products([p], {})
        self.assertEqual(len(result), 0)

    def test_negative_stock_excluded(self):
        p = make_product(stock=-1)
        result = filter_products([p], {})
        self.assertEqual(len(result), 0)

    def test_positive_stock_included(self):
        p = make_product(stock=1)
        result = filter_products([p], {})
        self.assertEqual(len(result), 1)


class TestCategoryFilter(unittest.TestCase):
    def test_category_match(self):
        p = make_product(categories=['Puzzle & Games'])
        result = filter_products([p], {'category': 'Puzzle & Games'})
        self.assertEqual(len(result), 1)

    def test_category_no_match(self):
        p = make_product(categories=['Toys'])
        result = filter_products([p], {'category': 'Puzzle & Games'})
        self.assertEqual(len(result), 0)

    def test_multi_category_matches_any(self):
        p = make_product(categories=['Toys', 'Puzzle & Games'])
        result = filter_products([p], {'category': 'Puzzle & Games'})
        self.assertEqual(len(result), 1)


class TestCombinedFilters(unittest.TestCase):
    def test_age_gender_budget_combined(self):
        products = [
            make_product(id='1', age=['5-8'], gender='boys', mrp=75),
            make_product(id='2', age=['5-8'], gender='girls', mrp=75),
            make_product(id='3', age=['0-2'], gender='boys', mrp=75),
            make_product(id='4', age=['5-8'], gender='boys', mrp=200),
        ]
        result = filter_products(products, {'age': '5-8', 'gender': 'boys', 'budget': 'classic'})
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['id'], '1')

    def test_empty_filters_returns_all_in_stock(self):
        products = [make_product(stock=5), make_product(stock=0)]
        result = filter_products(products, {})
        self.assertEqual(len(result), 1)

    def test_empty_product_list(self):
        result = filter_products([], {'gender': 'boys'})
        self.assertEqual(len(result), 0)


class TestEffectivePrice(unittest.TestCase):
    def test_prefers_fundoo_price(self):
        self.assertEqual(effective_price({'fundooPrice': 40, 'mrp': 80}), 40)

    def test_falls_back_to_mrp(self):
        self.assertEqual(effective_price({'fundooPrice': 0, 'mrp': 80}), 80)

    def test_zero_when_both_missing(self):
        self.assertEqual(effective_price({}), 0)

    def test_fundoo_zero_uses_mrp(self):
        self.assertEqual(effective_price({'fundooPrice': 0, 'mrp': 50}), 50)

    def test_no_mrp_returns_zero(self):
        self.assertEqual(effective_price({'fundooPrice': 0}), 0)


if __name__ == '__main__':
    unittest.main()
