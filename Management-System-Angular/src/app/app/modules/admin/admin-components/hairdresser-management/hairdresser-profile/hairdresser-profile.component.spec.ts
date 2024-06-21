import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserProfileComponent } from './hairdresser-profile.component';

describe('HairdresserProfileComponent', () => {
  let component: HairdresserProfileComponent;
  let fixture: ComponentFixture<HairdresserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairdresserProfileComponent]
    });
    fixture = TestBed.createComponent(HairdresserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
