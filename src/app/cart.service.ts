import { Injectable } from '@angular/core';

import Item from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Item[] = [];

  constructor() { }


  addItem(item: Item) {
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.splice(index);
  }
}
