import { TestBed } from '@angular/core/testing';
import { Decimal } from 'decimal.js';

import { TaxCalculatorService } from './tax-calculator.service';

describe('TaxCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    expect(service).toBeTruthy();
  });

  it('should calculate sales tax rate', ()=> {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const itemPrice : Decimal = new Decimal(99.99);
    const salesTaxRate : Decimal = new Decimal(0.10);
    const expectedSalesTax: Decimal = new Decimal(10.00);
    expect(service.calculateSalesTax(itemPrice, salesTaxRate).valueOf()).toBe(expectedSalesTax.valueOf());
  });

  it('should calculate import tax rate', ()=> {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const itemPrice : Decimal = new Decimal(11.00);
    const importTaxRate : Decimal = new Decimal(0.05);
    const expectedImportTax: Decimal = new Decimal(0.55);
    expect(service.calculateImportTax(itemPrice, importTaxRate).valueOf()).toBe(expectedImportTax.valueOf());
  });

  it('should deal with large numbers', ()=> {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const itemPrice : Decimal = new Decimal(1000000000000); //1 trillion dollars
    const taxRate: Decimal = new Decimal(0.05);
    const expectedTax: Decimal = new Decimal(50000000000); // 50 billion
    const rounding: Decimal = new Decimal(0.05);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());
  });

  it('should handle negative numbers gracefully', ()=> {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const itemPrice : Decimal = new Decimal(-10);
    const taxRate: Decimal = new Decimal(0.05);
    const expectedTax: Decimal = new Decimal(0);
    const rounding: Decimal = new Decimal(0.05);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());
  });

  it('should handle different tax rates', ()=> {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const rounding: Decimal = new Decimal(0.05);
    let itemPrice : Decimal = new Decimal(99.99);
    let taxRate: Decimal = new Decimal(0.01);
    let expectedTax: Decimal = new Decimal(1);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    itemPrice = new Decimal(99.99);
    taxRate = new Decimal(0.03);
    expectedTax = new Decimal(3);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    itemPrice = new Decimal(99.99);
    taxRate = new Decimal(0.13);
    expectedTax = new Decimal(13);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    itemPrice = new Decimal(50.50);
    taxRate = new Decimal(0.27);
    expectedTax = new Decimal(13.65);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    itemPrice = new Decimal(50.50);
    taxRate = new Decimal(0.27);
    expectedTax = new Decimal(13.65);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());
  });

  it('should handle different rounding values', ()=> {
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const itemPrice = new Decimal(50.50);
    const taxRate = new Decimal(0.27);

    let rounding: Decimal = new Decimal(0.01);
    let expectedTax: Decimal = new Decimal(13.64);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    rounding = new Decimal(0.001);
    expectedTax = new Decimal(13.635);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    rounding = new Decimal(0.25);
    expectedTax = new Decimal(13.75);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    rounding = new Decimal(1);
    expectedTax = new Decimal(14);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());

    rounding = new Decimal(1000);
    expectedTax = new Decimal(1000);
    expect(service._calculateTax(itemPrice, taxRate, rounding).valueOf()).toBe(expectedTax.valueOf());
  });

  it('should throw error if inputs are bad', ()=> {
    expect(10);
    const service: TaxCalculatorService = TestBed.get(TaxCalculatorService);
    const errorString: string = 'price, rate and rouding values must all be numbers';
    let itemPrice: any = new Decimal(50.50);
    let taxRate: any = new Decimal(0.27);
    let rounding: any = undefined;
    try {
      service._calculateTax(itemPrice, taxRate, rounding).valueOf()
    } catch (err) {
      expect(err.message).toBe(errorString);
    }
    rounding = new Decimal(0.05);
    taxRate = '0.27';
    try {
      service._calculateTax(itemPrice, taxRate, rounding).valueOf()
    } catch (err) {
      expect(err.message).toBe(errorString);
    }
    taxRate = new Decimal(0.27);
    itemPrice = [ 50.50 ];
    try {
      service._calculateTax(itemPrice, taxRate, rounding).valueOf()
    } catch (err) {
      expect(err.message).toBe(errorString);
    }
  });

});
