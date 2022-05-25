import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOptimizationComponent } from './image-optimization.component';

describe('ImageOptimizationComponent', () => {
  let component: ImageOptimizationComponent;
  let fixture: ComponentFixture<ImageOptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageOptimizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
