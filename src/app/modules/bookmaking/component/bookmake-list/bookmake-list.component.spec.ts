import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakeListComponent } from './bookmake-list.component';

describe('BookmakeListComponent', () => {
  let component: BookmakeListComponent;
  let fixture: ComponentFixture<BookmakeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmakeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
