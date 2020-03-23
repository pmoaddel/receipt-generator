import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from  '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from '../../store/cart/cart.reducer';
import { HomeComponent } from './home.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { CartComponent } from '../cart/cart.component';
import { ItemTileComponent } from '../item-tile/item-tile.component';
import { ItemDetailsSmComponent } from '../item-details-sm/item-details-sm.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ cart: cartReducer })
      ],
      declarations: [
        HomeComponent ,
        InventoryComponent,
        CartComponent,
        ItemTileComponent,
        ItemDetailsSmComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
