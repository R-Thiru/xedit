import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterReorderComponent } from './chapter-reorder.component';

describe('ChapterReoderComponent', () => {
  let component: ChapterReorderComponent;
  let fixture: ComponentFixture<ChapterReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterReorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
