import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ItemTileComponent } from './item-tile/item-tile.component';

import { ItemEffects } from './item.effect';
import { itemReducer } from './item.reducer';



@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    InventoryComponent,
    NavBarComponent,
    ItemTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot([itemReducer]),
    EffectsModule.forRoot([ItemEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
