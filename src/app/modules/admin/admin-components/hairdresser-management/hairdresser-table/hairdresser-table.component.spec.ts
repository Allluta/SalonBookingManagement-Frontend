import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserTableComponent } from './hairdresser-table.component';

describe('HairdresserTableComponent', () => {
  let component: HairdresserTableComponent;
  let fixture: ComponentFixture<HairdresserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairdresserTableComponent]
    });
    fixture = TestBed.createComponent(HairdresserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
