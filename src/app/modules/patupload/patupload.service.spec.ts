import { TestBed } from '@angular/core/testing';

import { PatuploadService } from './patupload.service';

describe('PatuploadService', () => {
  let service: PatuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
