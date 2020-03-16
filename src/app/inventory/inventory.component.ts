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
  items: Item[] = [];

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemService.findAll().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

}
