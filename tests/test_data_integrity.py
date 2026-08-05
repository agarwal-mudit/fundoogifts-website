import unittest
from helpers import load_products

VALID_GENDERS = {'boys', 'girls', 'any'}
VALID_AGES = {'0-2', '2-5', '5-8', '8+', 'any'}


class TestDataIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.products = load_products()

    def test_products_not_empty(self):
        self.assertGreater(len(self.products), 0)

    def test_every_product_has_id(self):
        for p in self.products:
            self.assertTrue(p.get('id'), f"Product missing id: {p.get('name', '?')}")

    def test_every_product_has_name(self):
        for p in self.products:
            self.assertTrue(p.get('name'), f"Product {p.get('id')} missing name")

    def test_no_duplicate_ids(self):
        ids = [p['id'] for p in self.products]
        self.assertEqual(len(ids), len(set(ids)), f"Duplicate IDs found: {[x for x in ids if ids.count(x) > 1]}")

    def test_every_product_has_mrp(self):
        for p in self.products:
            self.assertGreater(p.get('mrp', 0), 0, f"Product {p['id']} has no MRP")

    def test_no_negative_stock(self):
        for p in self.products:
            self.assertGreaterEqual(p.get('stock', 0), 0, f"Product {p['id']} has negative stock")

    def test_every_product_has_categories(self):
        for p in self.products:
            cats = p.get('categories', [])
            self.assertGreater(len(cats), 0, f"Product {p['id']} has no categories")

    def test_every_product_has_images(self):
        for p in self.products:
            imgs = p.get('images', [])
            self.assertGreater(len(imgs), 0, f"Product {p['id']} has no images")

    def test_gender_values_valid_when_present(self):
        for p in self.products:
            if 'gender' in p:
                self.assertIn(p['gender'], VALID_GENDERS,
                              f"Product {p['id']} has invalid gender: {p['gender']}")

    def test_age_values_valid_when_present(self):
        for p in self.products:
            if 'age' not in p:
                continue
            ages = p['age'] if isinstance(p['age'], list) else [p['age']]
            for a in ages:
                self.assertIn(a, VALID_AGES,
                              f"Product {p['id']} has invalid age: {a}")

    def test_fundoo_price_not_greater_than_mrp(self):
        for p in self.products:
            fp = p.get('fundooPrice', 0)
            mrp = p.get('mrp', 0)
            if fp > 0 and mrp > 0:
                self.assertLessEqual(fp, mrp,
                                     f"Product {p['id']} fundooPrice ({fp}) > mrp ({mrp})")

    def test_description_not_empty(self):
        for p in self.products:
            self.assertTrue(p.get('description'), f"Product {p['id']} has no description")


if __name__ == '__main__':
    unittest.main()
