import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageCategoryComponent } from './admin-manage-category.component';

describe('AdminManageCategoryComponent', () => {
  let component: AdminManageCategoryComponent;
  let fixture: ComponentFixture<AdminManageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
