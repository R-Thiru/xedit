import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatuploadComponent } from './patupload.component';

describe('PatuploadComponent', () => {
  let component: PatuploadComponent;
  let fixture: ComponentFixture<PatuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
