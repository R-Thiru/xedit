import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTableComponent } from './insert-table.component';

describe('InsertTableComponent', () => {
  let component: InsertTableComponent;
  let fixture: ComponentFixture<InsertTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
