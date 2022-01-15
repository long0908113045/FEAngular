import { TestBed } from '@angular/core/testing';

import { VerifyEmailService } from './verify-email.service';

describe('VerifyEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyEmailService = TestBed.get(VerifyEmailService);
    expect(service).toBeTruthy();
  });
});
