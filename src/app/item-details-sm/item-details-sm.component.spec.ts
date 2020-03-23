import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '../cart.reducer';

import { ItemDetailsSmComponent } from './item-details-sm.component';

import Item from '../item';

const testItem: Item = new Item({
  "id": "001",
  "name": "16lb bag of Skittles",
  "price": 16.00,
  "isImported": false,
  "types": [ "candy" ],
  "image": "/assets/skittles.jpg"
});

describe('ItemDetailsSmComponent', () => {
  let component: ItemDetailsSmComponent;
  let fixture: ComponentFixture<ItemDetailsSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsSmComponent ],
      imports: [
        StoreModule.forRoot({ cart: cartReducer })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsSmComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image', () => {
    const detailsElement: HTMLElement = fixture.nativeElement;
    const img = detailsElement.querySelector('img');
    expect(img.src.includes(testItem.image)).toBeTruthy();
  })
});
