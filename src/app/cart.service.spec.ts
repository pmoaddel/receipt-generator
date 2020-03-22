import { Decimal } from 'decimal.js';
import { TestBed } from '@angular/core/testing';

import { CartService, CartItem } from './cart.service';
import { TaxCalculatorService } from './tax-calculator.service';
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

  //add items
  it('add items and increases count', () => {
    const service: CartService = TestBed.get(CartService);
    service.addItem(TEST_ITEM_ONE);
    let cartItem: CartItem = service.items.get(TEST_ITEM_ONE.id);
    expect(cartItem.item.id).toBe(TEST_ITEM_ONE.id);
    expect(cartItem.count).toBe(1);
    service.addItem(TEST_ITEM_ONE);
    cartItem = service.items.get(TEST_ITEM_ONE.id);
    expect(cartItem.count).toBe(2);
    service.addItem(TEST_ITEM_TWO);
    cartItem = service.items.get(TEST_ITEM_ONE.id);
    let cartItem2: CartItem = service.items.get(TEST_ITEM_TWO.id);
    expect(cartItem.count).toBe(2);
    expect(cartItem2.count).toBe(1);
  });

  // remove items
  it('removes items and decreases count', () => {
    const service: CartService = TestBed.get(CartService);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_TWO);
    service.addItem(TEST_ITEM_TWO);
    service.removeItem(TEST_ITEM_ONE);
    service.removeItem(TEST_ITEM_ONE)
    service.removeItem(TEST_ITEM_TWO);
    service.removeItem(TEST_ITEM_TWO);
    let cartItem: CartItem = service.items.get(TEST_ITEM_ONE.id);
    let cartItem2: CartItem = service.items.get(TEST_ITEM_TWO.id);
    expect(cartItem.count).toBe(1);
    expect(cartItem2).toBeFalsy();
  });

  // subtotal
  it('calculates subtotal', () => {
    const service: CartService = TestBed.get(CartService);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_TWO);
    service.addItem(TEST_ITEM_TWO);
    service.removeItem(TEST_ITEM_ONE)
    service.removeItem(TEST_ITEM_TWO);
    const expectedSubtotal: Decimal = TEST_ITEM_ONE.price.times(2).plus(TEST_ITEM_TWO.price);
    expect(service.subtotal().toString()).toBe(expectedSubtotal.toString());
  });

  // get tax for item
  it('calculates the tax for an item in the cart', () => {
    const service: CartService = TestBed.get(CartService);
    const taxService: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_TWO);
    service.addItem(TEST_ITEM_THREE);
    service.addItem(TEST_ITEM_FOUR);
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
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_TWO);
    service.addItem(TEST_ITEM_THREE);
    service.removeItem(TEST_ITEM_THREE);
    let expectedTax: Decimal = service.getTax(TEST_ITEM_ONE).times(2).plus(service.getTax(TEST_ITEM_TWO));
    expect(expectedTax.toString()).toBe(service.totalTax().toString());
  });

  // total
  it('calculates the total cost for all items in the cart', () => {
    const service: CartService = TestBed.get(CartService);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_ONE);
    service.addItem(TEST_ITEM_TWO);
    service.addItem(TEST_ITEM_TWO);
    service.addItem(TEST_ITEM_THREE);
    service.removeItem(TEST_ITEM_THREE);
    // no sales tax, no import tax
    let expectedTotal: Decimal = service.subtotal().plus(service.totalTax());
    expect(expectedTotal.toString()).toBe(service.total().toString());
  });
});
