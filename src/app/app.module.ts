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

import { StoreModule } from '@ngrx/store';
import { itemReducer } from './item.reducer';
import { cartReducer } from './cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './item.effects';


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
    HttpClientModule,
    StoreModule.forRoot({ item: itemReducer, cart: cartReducer }),
    EffectsModule.forRoot([ItemEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
