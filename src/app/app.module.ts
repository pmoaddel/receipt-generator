import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItemTileComponent } from './components/item-tile/item-tile.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ItemDetailsSmComponent } from './components/item-details-sm/item-details-sm.component';

import { StoreModule } from '@ngrx/store';
import { itemReducer } from './store/item/item.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './store/item/item.effects';


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
