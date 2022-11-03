import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyTabComponent } from './notify-tab.component';

describe('NotifyTabComponent', () => {
  let component: NotifyTabComponent;
  let fixture: ComponentFixture<NotifyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
