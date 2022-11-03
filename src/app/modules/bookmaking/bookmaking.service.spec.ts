import { TestBed } from '@angular/core/testing';

import { BookmakingService } from './bookmaking.service';

describe('BookmakingService', () => {
  let service: BookmakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
