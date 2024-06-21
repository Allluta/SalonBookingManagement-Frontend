import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserEditComponent } from './hairdresser-edit.component';

describe('HairdresserEditComponent', () => {
  let component: HairdresserEditComponent;
  let fixture: ComponentFixture<HairdresserEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairdresserEditComponent]
    });
    fixture = TestBed.createComponent(HairdresserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
