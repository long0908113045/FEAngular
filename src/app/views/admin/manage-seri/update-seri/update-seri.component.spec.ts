import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSeriComponent } from './update-seri.component';

describe('UpdateSeriComponent', () => {
  let component: UpdateSeriComponent;
  let fixture: ComponentFixture<UpdateSeriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSeriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
