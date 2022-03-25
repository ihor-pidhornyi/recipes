import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Recipe} from "./models/recipe.model";
import {Observable} from "rxjs";
import {RecipesService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {
  selectedRecipe$: Observable<Recipe> | undefined

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit(): void {
    this.selectedRecipe$ = this.recipeService.selectedRecipe$
  }

}
