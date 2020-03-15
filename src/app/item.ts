import { Decimal } from 'decimal.js';
import { TaxCalculatorService } from './tax-calculator.service';

export default class Item {

  id: string;
  name: string;
  price: Decimal;
  isImported: boolean;
  types: string[]; // candy, coffee, etc...

  constructor(itemJson: any) {
    this.name = itemJson.name;
    this.price = new Decimal(itemJson.price);
    this.isImported = itemJson.isImported;
    this.types = itemJson.types;
	}

  isSalesTaxFree(): boolean {
    const TAX_FREE_TYPES: any = {
      candy: true,
      coffee: true,
      popcorn: true
    }
    return this.types.some((type: string)=> {
      return TAX_FREE_TYPES[type];
    });
  }

  // getTaxes(): Decimal {
  //     return TaxCalculatorService.calculateSalesTax(this.price);
  // }
  //
  // getPriceWithTax(): Decimal {
  //     return new Decimal(12);
  // }
}