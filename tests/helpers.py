import json
import os
import re

PRODUCTS_JS = os.path.join(os.path.dirname(__file__), '..', 'data', 'products.js')

def load_products():
    with open(PRODUCTS_JS) as f:
        text = f.read()
    match = re.search(r'var PRODUCTS\s*=\s*(\[.*?\]);\s*(?:var |$)', text, re.DOTALL)
    if not match:
        raise ValueError('Could not parse PRODUCTS from products.js')
    return json.loads(match.group(1))

PACK_RANGES = {
    'budget':  {'min': 0, 'max': 49},
    'classic': {'min': 50, 'max': 100},
    'premium': {'min': 101, 'max': float('inf')},
}

def effective_price(p):
    if p.get('fundooPrice', 0) > 0:
        return p['fundooPrice']
    return p.get('mrp', 0)

def filter_products(products, filters):
    results = []
    for p in products:
        if p.get('stock', 0) <= 0:
            continue

        ages = p.get('age', ['any'])
        if isinstance(ages, str):
            ages = [ages]
        if not ages:
            ages = ['any']
        if filters.get('age') and filters['age'] not in ages and 'any' not in ages:
            continue

        p_gender = p.get('gender', 'any')
        if filters.get('gender') and p_gender != 'any' and p_gender != filters['gender']:
            continue

        if filters.get('budget') and filters['budget'] in PACK_RANGES:
            rng = PACK_RANGES[filters['budget']]
            ep = effective_price(p)
            if ep < rng['min'] or ep > rng['max']:
                continue

        if filters.get('category'):
            cats = p.get('categories', [])
            if filters['category'] not in cats:
                continue

        results.append(p)
    return results
