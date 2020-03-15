import { Store } from '@ngrx/store'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import Item from '../item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  // items$: Observable<Item[]> = this.store.select(state => state.items);

  constructor(
    private store: Store<{ items: Item[] }>
  ) { }

	ngOnInit() {
		// this.store.dispatch({ type: '[Item] Load Items' });
  }
}
