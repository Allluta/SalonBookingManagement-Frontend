import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-appearance-dialog',
  template: `
    <h2>Czy klient się pojawił?</h2>
    <button mat-button (click)="dialogRef.close(true)">Tak</button>
    <button mat-button (click)="dialogRef.close(false)">Nie</button>
  `,
})
export class ClientAppearanceDialogComponent {
  constructor(public dialogRef: MatDialogRef<ClientAppearanceDialogComponent>) {}
}