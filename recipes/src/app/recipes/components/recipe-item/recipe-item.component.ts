import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../recipes.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe | undefined

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
  }

  public selectRecipe(): void {
    if (this.recipe) {
      this.recipesService.selectRecipe(this.recipe)
    }
  }
}
