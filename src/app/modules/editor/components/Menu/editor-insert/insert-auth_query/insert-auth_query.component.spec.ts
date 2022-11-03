import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAuthQueryComponent } from './insert-auth_query.component';

describe('InsertAuthQueryComponent', () => {
  let component: InsertAuthQueryComponent;
  let fixture: ComponentFixture<InsertAuthQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertAuthQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAuthQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
