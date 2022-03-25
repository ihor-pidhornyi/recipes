import {ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from "../../models/recipe.model";
import {Observable} from "rxjs";
import {RecipesService} from "../../recipes.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {
  public recipes$: Observable<Recipe[]> | undefined

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipes$ = this.recipesService.getRecipes$()
  }

  public trackByFn(index: number): number {
    return index
  }
}
