import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelDetailsComponent } from './wheel-details.component';

describe('WheelDetailsComponent', () => {
  let component: WheelDetailsComponent;
  let fixture: ComponentFixture<WheelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
