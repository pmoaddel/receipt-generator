import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from './inventory.component';

import { ItemTileComponent } from '../item-tile/item-tile.component';

import { HttpClientModule } from '@angular/common/http';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        InventoryComponent,
        ItemTileComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
