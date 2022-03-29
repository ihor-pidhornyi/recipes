import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { filter, Observable, take } from 'rxjs';
import { ShoppingService } from '../../../shared/services/shopping.service';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingEditModalComponent } from '../shopping-edit-modal/shopping-edit-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { ConfirmModalResult } from '../../../shared/models/confirm-modal.model';

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
    this.dontAsk = localStorage.getItem('askAgain') === 'true';
    console.log(typeof localStorage.getItem('askAgain'))
  }

  public onEditItem(ingredient: Ingredient): void {
    this.dialog
      .open<ShoppingEditModalComponent, Ingredient>(
        ShoppingEditModalComponent,
        {
          maxWidth: 800,
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
        .open<ConfirmationModalComponent, string>(ConfirmationModalComponent, {
          data: 'Do you really want to delete this ingredient?',
        })
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
            localStorage.setItem('askAgain', JSON.stringify(result.askAgain));
            this.dontAsk = result.askAgain;
            this.shoppingService.deleteIngredient(ingredient.name, ingredient);
          }
        });
    }
  }
}
