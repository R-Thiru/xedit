import { TestBed } from '@angular/core/testing';

import { MenuMapService } from './menu-map.service';

describe('MenuMapService', () => {
  let service: MenuMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
