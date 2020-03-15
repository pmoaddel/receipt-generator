import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';


import Item from '../item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  loading$: Observable<boolean>;
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {
    this.items$ = itemService.entities$;
    this.loading$ = itemService.loading$;
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemService.findAll();
  }
}
