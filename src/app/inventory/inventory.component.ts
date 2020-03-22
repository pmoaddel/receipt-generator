import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';

import Item from '../item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  items: Item[] = [];
  @Output() public itemAddedToCart = new EventEmitter<Item>();

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemService.findAll().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  addToCart(item: Item) {
    this.itemAddedToCart.emit(item);
  }
}
