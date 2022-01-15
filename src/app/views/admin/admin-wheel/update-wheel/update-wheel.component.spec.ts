import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWheelComponent } from './update-wheel.component';

describe('UpdateWheelComponent', () => {
  let component: UpdateWheelComponent;
  let fixture: ComponentFixture<UpdateWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
