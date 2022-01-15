import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWheelComponent } from './manage-wheel.component';

describe('ManageWheelComponent', () => {
  let component: ManageWheelComponent;
  let fixture: ComponentFixture<ManageWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
