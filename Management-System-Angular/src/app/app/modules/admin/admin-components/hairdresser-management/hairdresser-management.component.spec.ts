import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserManagementComponent } from './hairdresser-management.component';

describe('HairdresserManagementComponent', () => {
  let component: HairdresserManagementComponent;
  let fixture: ComponentFixture<HairdresserManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairdresserManagementComponent]
    });
    fixture = TestBed.createComponent(HairdresserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
