import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageBookComponent } from './admin-manage-book.component';

describe('AdminManageBookComponent', () => {
  let component: AdminManageBookComponent;
  let fixture: ComponentFixture<AdminManageBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
