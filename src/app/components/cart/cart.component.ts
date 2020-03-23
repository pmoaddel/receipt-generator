import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Decimal } from 'decimal.js';

import { CartService } from '../../services/cart.service';
import Item from '../../item';
import { CartItem } from '../../store/cart/cart.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent {
  cartItems$: Observable<Map<string, CartItem>>;
  checkoutDisabled: boolean = true;
  subtotal: Decimal = new Decimal(0);

  constructor(
    private cartService: CartService,
    private store: Store<{ cart: Map<string, CartItem>}>
  ) {
    this.cartItems$ = store.pipe(
      select('cart'),
      tap((cart: Map<string, CartItem> ) => {
        this.checkoutDisabled = !cart.size;
        this.subtotal = this.cartService.subtotal(cart);
      })
    );
  }
}
