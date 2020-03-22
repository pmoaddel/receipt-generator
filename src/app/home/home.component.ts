import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showSidebar: boolean;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.showSidebar = !!this.cartService.items.size;
  }

  toggleSidebar() {
    console.log('toggle sidebar');
    this.showSidebar = !this.showSidebar;
  }
}
