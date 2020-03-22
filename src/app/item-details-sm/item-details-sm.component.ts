import { Input, Component } from '@angular/core';
import Item from '../item';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-item-details-sm',
  templateUrl: './item-details-sm.component.html',
  styleUrls: ['./item-details-sm.component.scss']
})
export class ItemDetailsSmComponent {
  @Input() item: Item = new Item({id: '000', name: 'unknown', price: '0.00'});
  @Input() count: number;

  constructor(private cartService: CartService) { }

  removeFromCart() {
    this.cartService.removeItem(this.item);
  }
}
