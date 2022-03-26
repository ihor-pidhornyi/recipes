import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { ShoppingService } from '../../../shared/services/shopping.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe> | undefined;

  constructor(
    private shoppingService: ShoppingService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipe$ = this.route.params.pipe(
      switchMap((params) => {
        const id = params['id'];
        return this.recipesService.getRecipeById$(id);
      })
    );
  }

  public addToShoppingList(recipe: Recipe) {
    this.shoppingService.addIngredients(recipe?.ingredients);
  }

  public onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
