import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingService } from '../shared/services/shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent {
  public open$ = new BehaviorSubject<boolean>(false);

  constructor(private shoppingService: ShoppingService) {}

  public toggleOpen(): void {
    this.open$.next(!this.open$.value);
  }

  public onAddIngredient(ingredient: Ingredient): void {
    this.shoppingService.addIngredient(ingredient);
  }
}
