import { Decimal } from 'decimal.js';
import { TaxCalculatorService } from './tax-calculator.service';

export default class Item {

  id: string;
  name: string;
  price: Decimal;
  isImported: boolean;
  types: string[]; // candy, coffee, etc...
  image: string;

  constructor(itemJson: any) {
    this.id = itemJson.id;
    this.name = itemJson.name;
    this.price = new Decimal(itemJson.price);
    this.isImported = itemJson.isImported;
    this.types = itemJson.types || [];
    this.image = itemJson.image;
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
