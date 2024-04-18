import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noAuthGuard } from './no-auth.guard';

describe('noAuthGuard', () => {
  let guard: noAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(noAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});