import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe.model";
import {ShoppingService} from "../../../shared/services/shopping.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | undefined

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
  }

  public addToShoppingList() {
    if(this.recipe?.ingredients) {
      this.shoppingService.addIngredients(this.recipe?.ingredients)
    }
  }

}
