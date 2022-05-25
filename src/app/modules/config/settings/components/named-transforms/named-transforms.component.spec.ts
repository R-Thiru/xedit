import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedTransformsComponent } from './named-transforms.component';

describe('NamedTransformsComponent', () => {
  let component: NamedTransformsComponent;
  let fixture: ComponentFixture<NamedTransformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamedTransformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedTransformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
