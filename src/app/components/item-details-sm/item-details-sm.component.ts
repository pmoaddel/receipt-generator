import { Input, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { removeItem } from '../../store/cart/cart.actions';
import Item from '../../item';

@Component({
  selector: 'app-item-details-sm',
  templateUrl: './item-details-sm.component.html',
  styleUrls: ['./item-details-sm.component.scss']
})
export class ItemDetailsSmComponent {
  @Input() item: Item = new Item({id: '000', name: 'unknown', price: '0.00'});
  @Input() count: number;

  constructor(private store: Store<{ cart }>) { }

  removeFromCart() {
    this.store.dispatch(removeItem({ item: this.item}));
  }
}
