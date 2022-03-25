import {Injectable} from '@angular/core';
import {Recipe} from "./models/recipe.model";
import {BehaviorSubject, filter, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _selectedRecipe = new BehaviorSubject<Recipe | null>(null)
  public selectedRecipe$ = this._selectedRecipe.pipe(filter(Boolean))

  constructor() {
  }

  public getRecipes$(): Observable<Recipe[]> {
    return of([
      {
        name: 'A Test recipe',
        description: 'This is simply a test',
        imagePath: 'https://www.hellomagazine.com/imagenes/cuisine/20210211106689/pancake-day-recipes-sweet-savoury/0-514-409/pancake-day-z.jpg'
      },
      {
        name: 'Another Test recipe',
        description: 'This is simply a test',
        imagePath: 'https://www.hellomagazine.com/imagenes/cuisine/20210211106689/pancake-day-recipes-sweet-savoury/0-514-409/pancake-day-z.jpg'
      },
    ])
  }

  public selectRecipe(recipe: Recipe): void {
    this._selectedRecipe.next(recipe)
  }
}
