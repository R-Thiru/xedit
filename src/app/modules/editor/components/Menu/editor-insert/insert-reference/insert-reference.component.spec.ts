import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReferenceComponent } from './insert-reference.component';

describe('InsertReferenceComponent', () => {
  let component: InsertReferenceComponent;
  let fixture: ComponentFixture<InsertReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
