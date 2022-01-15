import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageSeriComponent } from './admin-manage-seri.component';

describe('AdminManageSeriComponent', () => {
  let component: AdminManageSeriComponent;
  let fixture: ComponentFixture<AdminManageSeriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageSeriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageSeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
