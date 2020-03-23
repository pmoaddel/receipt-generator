import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';


import { CartItem } from '../cart.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showSidebar: boolean;

  constructor(private store: Store<{ cart: Map<string, CartItem>}>) {
      store.pipe(
          select('cart'),
          first()
      ).subscribe((cart: Map<string, CartItem>) => {
          this.showSidebar = !!cart.size;
      });
  }

  openSidebar() {
    this.showSidebar = true;
  }

  closeSidebar() {
    this.showSidebar = false;
  }
}
