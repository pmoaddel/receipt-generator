import { Decimal } from 'decimal.js';
import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { TaxCalculatorService } from './tax-calculator.service';
import { CartItem } from './cart.reducer';
import Item from './item';

const TEST_ITEM_ONE: Item = new Item({id: '111', price: '99.99'});
const TEST_ITEM_TWO: Item = new Item({id: '222', price: '99.99', types: ['candy']});
const TEST_ITEM_THREE: Item = new Item({id: '333', price: '99.99', isImported: true});
const TEST_ITEM_FOUR: Item = new Item({id: '333', price: '99.99', types: ['candy'], isImported: true});


describe('CartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });

  // subtotal
  it('calculates subtotal', () => {
    const service: CartService = TestBed.get(CartService);
    let cart: Map<string, CartItem> = new Map();
    cart.set(TEST_ITEM_ONE.id, { item: TEST_ITEM_ONE, count: 2});
    cart.set(TEST_ITEM_TWO.id, { item: TEST_ITEM_TWO, count: 1});
    const expectedSubtotal: Decimal = TEST_ITEM_ONE.price.times(2).plus(TEST_ITEM_TWO.price);
    expect(service.subtotal(cart).toString()).toBe(expectedSubtotal.toString());
  });

  // get tax for item
  it('calculates the tax for an item in the cart', () => {
    const service: CartService = TestBed.get(CartService);
    const taxService: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    // no sales tax, no import tax
    let expectedTax = new Decimal(0);
    expect(expectedTax.toString()).toBe(service.getTax(TEST_ITEM_TWO).toString());
    // sales tax, no import tax
    expectedTax = taxService.calculateSalesTax(TEST_ITEM_ONE.price);
    expect(expectedTax.toString()).toBe(service.getTax(TEST_ITEM_ONE).toString());
    // no sales tax, import tax
    expectedTax = taxService.calculateImportTax(TEST_ITEM_FOUR.price);
    expect(expectedTax.toString()).toBe(service.getTax(TEST_ITEM_FOUR).toString());
    // sales tax and import tax
    expectedTax = taxService.calculateImportTax(TEST_ITEM_THREE.price).plus(taxService.calculateSalesTax(TEST_ITEM_THREE.price));
    expect(expectedTax.toString()).toBe(service.getTax(TEST_ITEM_THREE).toString());
  });


  // total tax
  it('calculates the total tax for all items in the cart', () => {
    const service: CartService = TestBed.get(CartService);
    let cart: Map<string, CartItem> = new Map();
    cart.set(TEST_ITEM_ONE.id, { item: TEST_ITEM_ONE, count: 2});
    cart.set(TEST_ITEM_TWO.id, { item: TEST_ITEM_TWO, count: 1});
    let expectedTax: Decimal = service.getTax(TEST_ITEM_ONE).times(2).plus(service.getTax(TEST_ITEM_TWO));
    expect(expectedTax.toString()).toBe(service.totalTax(cart).toString());
  });

  // total
  it('calculates the total cost for all items in the cart', () => {
    const service: CartService = TestBed.get(CartService);
    let cart: Map<string, CartItem> = new Map();
    cart.set(TEST_ITEM_ONE.id, { item: TEST_ITEM_ONE, count: 3});
    cart.set(TEST_ITEM_TWO.id, { item: TEST_ITEM_TWO, count: 2});
    cart.set(TEST_ITEM_THREE.id, { item: TEST_ITEM_THREE, count: 1});
    // no sales tax, no import tax
    let expectedTotal: Decimal = service.subtotal(cart).plus(service.totalTax(cart));
    expect(expectedTotal.toString()).toBe(service.total(cart).toString());
  });
});
