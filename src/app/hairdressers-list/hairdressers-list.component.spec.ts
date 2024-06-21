import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdressersListComponent } from './hairdressers-list.component';

describe('HairdressersListComponent', () => {
  let component: HairdressersListComponent;
  let fixture: ComponentFixture<HairdressersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HairdressersListComponent]
    });
    fixture = TestBed.createComponent(HairdressersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
