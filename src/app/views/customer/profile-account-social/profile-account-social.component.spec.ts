import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccountSocialComponent } from './profile-account-social.component';

describe('ProfileAccountSocialComponent', () => {
  let component: ProfileAccountSocialComponent;
  let fixture: ComponentFixture<ProfileAccountSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAccountSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAccountSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
