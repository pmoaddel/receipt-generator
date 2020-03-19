import { Component } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {

  constructor(private cartService: CartService) { }


  print() {
    window.print();
  }
}
