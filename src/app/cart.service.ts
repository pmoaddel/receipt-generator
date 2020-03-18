import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';
import { TaxCalculatorService } from './tax-calculator.service';

import Item from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Item[] = [];

  constructor(private taxService: TaxCalculatorService) { }


  addItem(item: Item) {
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.splice(index);
  }

  subtotal(): Decimal {
    let subtotal: Decimal = new Decimal(0);
    this.items.forEach((item) => {
      subtotal = subtotal.plus(item.price);
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
    this.items.forEach((item) => {
      tax = tax.plus(this.getTax(item));
    });
    return tax;
  }

  total(): Decimal {
    let total: Decimal = new Decimal(0);
    this.items.forEach((item) => {
      total = total.plus(item.price);
    });
    const tax = this.totalTax();
    return total.plus(tax);
  }
}
