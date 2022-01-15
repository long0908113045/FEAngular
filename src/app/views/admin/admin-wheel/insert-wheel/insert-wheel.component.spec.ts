import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWheelComponent } from './insert-wheel.component';

describe('InsertWheelComponent', () => {
  let component: InsertWheelComponent;
  let fixture: ComponentFixture<InsertWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertWheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
