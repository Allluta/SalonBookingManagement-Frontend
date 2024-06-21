import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { userGuard } from './user.guard';
import { StorageService } from '../../services/storage/storage.service';

describe('userGuard', () => {
  let guard: userGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(userGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});