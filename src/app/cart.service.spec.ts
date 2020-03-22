import { TestBed } from '@angular/core/testing';

import { CartService, CartItem } from './cart.service';

import Item from './item';
import { Decimal } from 'decimal.js';

describe('CartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });

  //add item
  it('add items and increase count', () => {
    const service: CartService = TestBed.get(CartService);
    const fakeItem: Item = new Item({id: '999', price: '99.99'})
    service.addItem(fakeItem)
    const cartItem: CartItem = service.items.get(fakeItem.id);
    expect(cartItem.item.id).toBe(fakeItem.id);
    expect(cartItem.count).toBe(1);
  });

  // remove item


  // subtotal



  // total tax



  // total
});
