import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSeriComponent } from './insert-seri.component';

describe('InsertSeriComponent', () => {
  let component: InsertSeriComponent;
  let fixture: ComponentFixture<InsertSeriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSeriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
