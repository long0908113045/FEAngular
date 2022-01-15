import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageAuthorComponent } from './admin-manage-author.component';

describe('AdminManageAuthorComponent', () => {
  let component: AdminManageAuthorComponent;
  let fixture: ComponentFixture<AdminManageAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
