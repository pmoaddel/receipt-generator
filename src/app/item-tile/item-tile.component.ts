import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CartService } from '../cart.service';

import Item from '../item';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent implements OnInit {
  @Output() public itemAddedToCart = new EventEmitter<Item>();

  @Input() item: Item = new Item({id: '000', name: 'unknown', price: '0.00'});

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addItem(this.item);
    this.itemAddedToCart.emit(this.item);
  }

}
