import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertGlossaryComponent } from './insert-glossary.component';

describe('InsertGlossaryComponent', () => {
  let component: InsertGlossaryComponent;
  let fixture: ComponentFixture<InsertGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertGlossaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
