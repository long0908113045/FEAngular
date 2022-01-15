import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCartPaymentComponent } from './book-cart-payment.component';

describe('BookCartPaymentComponent', () => {
  let component: BookCartPaymentComponent;
  let fixture: ComponentFixture<BookCartPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCartPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
