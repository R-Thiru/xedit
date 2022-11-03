import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakeComponent } from './bookmake.component';

describe('BookmakeComponent', () => {
  let component: BookmakeComponent;
  let fixture: ComponentFixture<BookmakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
