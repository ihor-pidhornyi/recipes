import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Ingredient, ShoppingService } from '@shared';

@Component({
  selector: 'app-shopping-edit-modal',
  templateUrl: './shopping-edit-modal.component.html',
  styleUrls: ['./shopping-edit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingEditModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ShoppingEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredient,
    private shoppingService: ShoppingService
  ) {}

  public onSubmit(ingredient: Ingredient) {
    this.shoppingService
      .updateIngredient(this.data.name, ingredient)
      .pipe(take(1))
      .subscribe((isSuccess) => {
        this.dialogRef.close(isSuccess);
      });
  }

  public onDiscard(): void {
    this.dialogRef.close();
  }
}
