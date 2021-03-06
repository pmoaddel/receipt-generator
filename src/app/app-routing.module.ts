import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CartComponent } from './components/cart/cart.component';
import { ReceiptComponent } from './components/receipt/receipt.component';


const routes: Routes = [
  	{
  		path: 'home',
  		component: HomeComponent
  	},
    {
      path: 'inventory',
      component: HomeComponent
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
