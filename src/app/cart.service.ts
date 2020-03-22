import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';
import { TaxCalculatorService } from './tax-calculator.service';

import Item from './item';

export interface CartItem {
  item: Item;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Map<string, CartItem> = new Map();

  constructor(private taxService: TaxCalculatorService) { }


  addItem(item: Item) {
    let cartItem: CartItem = this.items.get(item.id);
    if (cartItem) {
      cartItem.count++;
      this.items.set(item.id, cartItem);
    } else {
      this.items.set(item.id, {item, count: 1});
    }
  }

  removeItem(item: Item) {
    const itemID = item.id;
    let cartItem: CartItem = this.items.get(itemID);
    if (!cartItem) {
      throw Error('Cannot remove item. Item does not exist');
    }
    if (cartItem.count === 1) {
      this.items.delete(itemID);
      return;
    }
    cartItem.count--;
    this.items.set(itemID, cartItem);
  }

  subtotal(): Decimal {
    let subtotal: Decimal = new Decimal(0);
    this.items.forEach((cartItem: CartItem, itemID: string) => {
      subtotal = subtotal.plus(cartItem.item.price.times(cartItem.count));
    });
    return subtotal;
  }

  getTax(item: Item): Decimal {
    let tax: Decimal = new Decimal(0);
    // sales tax
    if (!item.isSalesTaxFree()) {
      tax = tax.plus(this.taxService.calculateSalesTax(item.price));
    }
    // import tax
    if (item.isImported) {
      tax = tax.plus(this.taxService.calculateImportTax(item.price));
    }
    return tax;
  }

  totalTax(): Decimal {
    let tax: Decimal = new Decimal(0);
    this.items.forEach((cartItem: CartItem, itemID: string) => {
      tax = tax.plus(this.getTax(cartItem.item).times(cartItem.count));
    });
    return tax;
  }

  total(): Decimal {
    let total: Decimal = new Decimal(0);
    this.items.forEach((cartItem: CartItem, itemID: string) => {
      total = total.plus(cartItem.item.price.times(cartItem.count));
    });
    const tax = this.totalTax();
    return total.plus(tax);
  }
}
