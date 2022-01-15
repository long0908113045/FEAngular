import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navlv2Component } from './navlv2.component';

describe('Navlv2Component', () => {
  let component: Navlv2Component;
  let fixture: ComponentFixture<Navlv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navlv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navlv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
