import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCartCusInfoComponent } from './book-cart-cus-info.component';

describe('BookCartCusInfoComponent', () => {
  let component: BookCartCusInfoComponent;
  let fixture: ComponentFixture<BookCartCusInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCartCusInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCartCusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
