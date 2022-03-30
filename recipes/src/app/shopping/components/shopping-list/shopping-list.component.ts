import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {
  ConfirmationModalComponent,
  ConfirmationModalData,
  ConfirmModalResult,
  Ingredient,
  ShoppingService,
} from '@shared';
import { ShoppingEditModalComponent } from '../shopping-edit-modal/shopping-edit-modal.component';
import { AskAgainEnumKeys } from '../../constants/constants';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent implements OnInit {
  public ingredients$: Observable<Ingredient[]> | undefined;
  private dontAsk = true;

  constructor(
    private shoppingService: ShoppingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.shoppingService.getIngredients$();
    this.dontAsk = localStorage.getItem(AskAgainEnumKeys.ingredient) === 'true';
  }

  public onEditItem(ingredient: Ingredient): void {
    this.dialog
      .open<ShoppingEditModalComponent, Ingredient>(
        ShoppingEditModalComponent,
        {
          data: ingredient,
        }
      )
      .afterClosed()
      .pipe(
        take(1),
        filter(
          (isSuccess): isSuccess is boolean => typeof isSuccess === 'boolean'
        )
      )
      .subscribe((isSuccess) => {
        // add notification service
      });
  }

  public onDeleteItem(event: MouseEvent, ingredient: Ingredient): void {
    event.stopPropagation();
    if (this.dontAsk) {
      this.shoppingService.deleteIngredient(ingredient.name, ingredient);
    } else {
      this.dialog
        .open<ConfirmationModalComponent, ConfirmationModalData>(
          ConfirmationModalComponent,
          {
            data: {
              contentText: 'Do you really want to delete this ingredient?',
              askAgain: true,
              confirmText: 'Delete',
            },
          }
        )
        .afterClosed()
        .pipe(
          filter(
            (value): value is ConfirmModalResult =>
              value && 'confirm' in value && 'askAgain' in value
          )
        )
        .subscribe((result) => {
          if (result.confirm) {
            // add notification service
            localStorage.setItem(
              AskAgainEnumKeys.ingredient,
              JSON.stringify(result.askAgain ?? false)
            );
            this.dontAsk = result.askAgain ?? false;
            this.shoppingService.deleteIngredient(ingredient.name, ingredient);
          }
        });
    }
  }
}
