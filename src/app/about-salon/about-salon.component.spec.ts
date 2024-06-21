import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSalonComponent } from './about-salon.component';

describe('AboutSalonComponent', () => {
  let component: AboutSalonComponent;
  let fixture: ComponentFixture<AboutSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutSalonComponent]
    });
    fixture = TestBed.createComponent(AboutSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
