import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserVerifyPasswordComponent } from './hairdresser-verifyPassword.component';

describe('HairdresserProfileComponent', () => {
  let component: HairdresserVerifyPasswordComponent;
  let fixture: ComponentFixture<HairdresserVerifyPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairdresserVerifyPasswordComponent]
    });
    fixture = TestBed.createComponent(HairdresserVerifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
