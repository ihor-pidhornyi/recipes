import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ConfirmModalResult } from '../../models/confirm-modal.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  public askAgain = new FormControl(false);

  constructor(
    public dialogRef: MatDialogRef<
      ConfirmationModalComponent,
      ConfirmModalResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  public confirm() {
    const askAgainValue = this.askAgain.value as boolean;
    this.dialogRef.close({ confirm: true, askAgain: askAgainValue });
  }

  public discard(): void {
    this.dialogRef.close();
  }
}
