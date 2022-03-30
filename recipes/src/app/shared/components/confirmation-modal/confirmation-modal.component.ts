import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ConfirmModalResult } from '../../models/confirm-modal-result.model';
import { ConfirmationModalData } from '../../models/confirmation-modal-data.model'

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
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData
  ) {}

  public confirm() {
    if (this.data?.askAgain) {
      const askAgainValue = this.askAgain.value as boolean;
      this.dialogRef.close({ confirm: true, askAgain: askAgainValue });
    } else {
      this.dialogRef.close({ confirm: true });
    }
  }

  public discard(): void {
    this.dialogRef.close();
  }
}
