import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorInsertComponent } from './editor-insert.component';

describe('EditorInsertComponent', () => {
  let component: EditorInsertComponent;
  let fixture: ComponentFixture<EditorInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
