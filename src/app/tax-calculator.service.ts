import { Injectable } from '@angular/core';
import { Decimal } from 'decimal.js';

@Injectable({
  providedIn: 'root'
})
export class TaxCalculatorService {
  DEFAULT_IMPORT_TAX_RATE: Decimal = new Decimal(0.05);
  DEFAULT_SALES_TAX_RATE: Decimal = new Decimal(0.10);
  DEFAULT_TAX_ROUNDING: Decimal = new Decimal(0.05);

  constructor() { }

  calculateImportTax(price: Decimal, importTaxRate: Decimal = this.DEFAULT_IMPORT_TAX_RATE, rounding: Decimal = this.DEFAULT_TAX_ROUNDING): Decimal {
    return this._calculateTax(price, importTaxRate, rounding);
  }


  calculateSalesTax(price: Decimal, salesTaxRate: Decimal = this.DEFAULT_SALES_TAX_RATE, rounding: Decimal = this.DEFAULT_TAX_ROUNDING): Decimal {
    return this._calculateTax(price, salesTaxRate, rounding);
  }

  _calculateTax(price: Decimal, rate: Decimal, rounding: Decimal): Decimal {
    if (
      !Decimal.isDecimal(price) || !Decimal.isDecimal(rate) || !Decimal.isDecimal(rounding) ||
      price.isNaN() || rate.isNaN() || rounding.isNaN()
    ) {
      throw new Error('price, rate and rouding values must all be numbers');
    }
    if (price.lessThan(0)) { // no negative tax
      return new Decimal(0);
    }
    return price.times(rate).toNearest(rounding, Decimal.ROUND_UP);
  }

}
