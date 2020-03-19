import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ItemTileComponent } from './item-tile/item-tile.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ItemDetailsSmComponent } from './item-details-sm/item-details-sm.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    InventoryComponent,
    NavBarComponent,
    ItemTileComponent,
    ReceiptComponent,
    ItemDetailsSmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
