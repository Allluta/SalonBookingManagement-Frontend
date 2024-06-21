import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-interest-dialog',
  templateUrl: './interest-dialog.component.html',
  styleUrls: ['./interest-dialog.component.scss']
})
export class InterestDialogComponent {
  constructor(public dialogRef: MatDialogRef<InterestDialogComponent>) {}

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
