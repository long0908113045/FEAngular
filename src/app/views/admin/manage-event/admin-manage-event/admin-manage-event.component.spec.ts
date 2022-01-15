import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageEventComponent } from './admin-manage-event.component';

describe('AdminManageEventComponent', () => {
  let component: AdminManageEventComponent;
  let fixture: ComponentFixture<AdminManageEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
