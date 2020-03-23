import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';

import { TaxCalculatorService } from '../services/tax-calculator.service';
import Item from '../item';
import { CartItem } from '../store/cart/cart.reducer';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private taxService: TaxCalculatorService) { }

  subtotal(items: Map<string, CartItem>): Decimal {
    let subtotal: Decimal = new Decimal(0);
    items.forEach((cartItem: CartItem, itemID: string) => {
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

  totalTax(items: Map<string, CartItem>): Decimal {
    let tax: Decimal = new Decimal(0);
    items.forEach((cartItem: CartItem, itemID: string) => {
      tax = tax.plus(this.getTax(cartItem.item).times(cartItem.count));
    });
    return tax;
  }

  total(items: Map<string, CartItem>): Decimal {
    let total: Decimal = new Decimal(0);
    items.forEach((cartItem: CartItem, itemID: string) => {
      total = total.plus(cartItem.item.price.times(cartItem.count));
    });
    const tax = this.totalTax(items);
    return total.plus(tax);
  }
}
