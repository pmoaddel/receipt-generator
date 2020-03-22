import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ItemService } from './item.service';

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });
});
