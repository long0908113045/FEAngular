import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowListComponent } from './page-show-list.component';

describe('PageShowListComponent', () => {
  let component: PageShowListComponent;
  let fixture: ComponentFixture<PageShowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageShowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
