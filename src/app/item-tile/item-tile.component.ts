import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart.service';

import Item from '../item';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent implements OnInit {
  @Input() item: Item;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addItem(this.item);
  }

}
