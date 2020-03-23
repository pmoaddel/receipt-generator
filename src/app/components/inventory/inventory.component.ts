import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ItemService } from '../../services/item.service';
import { getAll } from '../../store/item/item.actions';
import Item from '../../item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items$: Observable<Item[]>;
  @Output() public itemAddedToCart = new EventEmitter<Item>();

  constructor(
    private itemService: ItemService,
    private store: Store<{ item: Item[] }>
  ) {
    this.items$ = store.pipe(select('item'));
  }

  ngOnInit() {
    this.store.dispatch(getAll());
  }

  addToCart(item: Item) {
    this.itemAddedToCart.emit(item);
  }
}
