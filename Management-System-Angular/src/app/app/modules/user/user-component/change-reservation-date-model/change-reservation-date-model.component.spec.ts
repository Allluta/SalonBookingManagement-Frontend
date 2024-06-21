import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReservationDateModelComponent } from './change-reservation-date-model.component';

describe('ChangeReservationDateModelComponent', () => {
  let component: ChangeReservationDateModelComponent;
  let fixture: ComponentFixture<ChangeReservationDateModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeReservationDateModelComponent]
    });
    fixture = TestBed.createComponent(ChangeReservationDateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
