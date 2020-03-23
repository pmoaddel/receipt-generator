import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Decimal } from 'decimal.js';

import { CartService } from '../cart.service';
import { CartItem } from '../cart.reducer';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {
  cartItems$: Observable<Map<string, CartItem>>;
  total: Decimal = new Decimal(0);
  totalTax: Decimal = new Decimal(0);

  constructor(
    private cartService: CartService,
    private store: Store<{ cart: Map<string, CartItem>}>
  ) {
    this.cartItems$ = store.pipe(
      select('cart'),
      tap((cart: Map<string, CartItem> ) => {
        this.totalTax = this.cartService.totalTax(cart);
        this.total = this.cartService.total(cart);
      })
    );
  }

  print() {
    window.print();
  }
}
