import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppearanceDialogComponent } from './client-appearance-dialog.component';

describe('ClientAppearanceDialogComponent', () => {
  let component: ClientAppearanceDialogComponent;
  let fixture: ComponentFixture<ClientAppearanceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAppearanceDialogComponent]
    });
    fixture = TestBed.createComponent(ClientAppearanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
