import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorDetailComponent } from './admin-author-detail.component';

describe('AdminAuthorDetailComponent', () => {
  let component: AdminAuthorDetailComponent;
  let fixture: ComponentFixture<AdminAuthorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
