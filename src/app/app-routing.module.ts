import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CartComponent } from './cart/cart.component';
import { ReceiptComponent } from './receipt/receipt.component';


const routes: Routes = [
  	{
  		path: 'home',
  		component: HomeComponent
  	},
    {
      path: 'inventory',
      component: InventoryComponent
    },
    {
      path: 'cart',
      component: CartComponent
    },
    {
      path: 'receipt',
      component: ReceiptComponent
    },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
