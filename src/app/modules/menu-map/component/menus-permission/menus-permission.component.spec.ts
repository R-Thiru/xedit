import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusPermissionComponent } from './menus-permission.component';

describe('MenusPermissionComponent', () => {
  let component: MenusPermissionComponent;
  let fixture: ComponentFixture<MenusPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
