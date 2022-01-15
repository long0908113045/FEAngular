import { TestBed } from '@angular/core/testing';

import { SocialaccountService } from './socialaccount.service';

describe('SocialaccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialaccountService = TestBed.get(SocialaccountService);
    expect(service).toBeTruthy();
  });
});
