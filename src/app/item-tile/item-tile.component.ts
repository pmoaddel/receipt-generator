import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { addItem } from '../store/cart/cart.actions';

import Item from '../item';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent {
  @Output() public itemAddedToCart = new EventEmitter<Item>();

  @Input() item: Item = new Item({id: '000', name: 'unknown', price: '0.00'});

  constructor(private store: Store<{ cart }>) { }

  addToCart() {
    this.store.dispatch(addItem({ item: this.item}));
    this.itemAddedToCart.emit(this.item);
  }

}
