import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeriDetailComponent } from './admin-seri-detail.component';

describe('AdminSeriDetailComponent', () => {
  let component: AdminSeriDetailComponent;
  let fixture: ComponentFixture<AdminSeriDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeriDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeriDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
