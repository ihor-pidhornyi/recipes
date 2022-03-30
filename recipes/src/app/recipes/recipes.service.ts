import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from './models/recipe.model';
import { MOCK_RECIPES } from './constants/constants';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes$ = new BehaviorSubject<Recipe[]>(MOCK_RECIPES);

  constructor() {}

  private get recipes(): Recipe[] {
    return this.recipes$.value;
  }

  public getRecipes$(): Observable<Recipe[]> {
    return this.recipes$.asObservable();
  }

  public getRecipe$(id: string): Observable<Recipe> {
    return this.getRecipes$().pipe(
      map((recipes) => recipes.find((recipe) => recipe.id === id)),
      filter(Boolean)
    );
  }

  public addRecipe(recipe: Recipe): Observable<boolean> {
    const id = uuidv4() as string;

    this.recipes$.next([...this.recipes, { ...recipe, id }]);
    return of(true);
  }

  public updateRecipe(id: string, newRecipe: Recipe): Observable<boolean> {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      return of(false);
    }
    const copyRecipes = this.recipes.slice();
    copyRecipes[index] = newRecipe;
    this.recipes$.next(copyRecipes);
    return of(true);
  }

  public deleteRecipe(id: string): Observable<boolean> {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      return of(false);
    }
    const copyRecipes = this.recipes.slice();
    copyRecipes.splice(index, 1);
    this.recipes$.next(copyRecipes);
    return of(true);
  }
}
