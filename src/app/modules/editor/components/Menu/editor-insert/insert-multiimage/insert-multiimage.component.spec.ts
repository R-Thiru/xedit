import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMultiimageComponent } from './insert-multiimage.component';

describe('InsertMultiimageComponent', () => {
  let component: InsertMultiimageComponent;
  let fixture: ComponentFixture<InsertMultiimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertMultiimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMultiimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
