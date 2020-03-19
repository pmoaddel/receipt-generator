import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsSmComponent } from './item-details-sm.component';

describe('ItemDetailsSmComponent', () => {
  let component: ItemDetailsSmComponent;
  let fixture: ComponentFixture<ItemDetailsSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
