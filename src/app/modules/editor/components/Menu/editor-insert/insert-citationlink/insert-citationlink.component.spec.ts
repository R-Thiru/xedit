import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCitationlinkComponent } from './insert-citationlink.component';

describe('InsertCitationlinkComponent', () => {
  let component: InsertCitationlinkComponent;
  let fixture: ComponentFixture<InsertCitationlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCitationlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCitationlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
