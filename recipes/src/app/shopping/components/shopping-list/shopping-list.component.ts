import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { Observable } from 'rxjs';
import { ShoppingService } from '../../../shared/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListComponent implements OnInit {
  public ingredients$: Observable<Ingredient[]> | undefined;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients$ = this.shoppingService.getIngredients$();
  }
}
