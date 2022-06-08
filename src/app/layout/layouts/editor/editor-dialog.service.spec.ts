import { TestBed } from '@angular/core/testing';

import { EditorDialogService } from './editor-dialog.service';

describe('EditorDialogService', () => {
  let service: EditorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
