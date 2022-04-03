import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor() {}

  private _ingredients = new BehaviorSubject<Ingredient[]>([
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 },
  ]);

  private get ingredients(): Ingredient[] {
    return this._ingredients.value;
  }

  public getIngredients$(): Observable<Ingredient[]> {
    return this._ingredients.asObservable();
  }

  public getIngredient$(index: number): Observable<Ingredient> {
    return this.getIngredients$().pipe(
      map((ingredients) => ingredients[index])
    );
  }

  public addIngredient(ingredient: Ingredient): void {
    this.append(ingredient);
  }

  public addIngredients(ingredients: Ingredient[]): Observable<boolean> {
    this.append(...ingredients);
    return of(true);
  }

  public updateIngredient(
    id: string,
    ingredient: Ingredient
  ): Observable<boolean> {
    const index = this.getIndexById(id);
    if (index === -1) {
      return of(false);
    }
    const copy = this.ingredients.slice();
    copy[index] = ingredient;
    this._ingredients.next(copy);
    return of(true);
  }

  public deleteIngredient(id: string, ingredient: Ingredient): Observable<boolean> {
    const index = this.getIndexById(id);
    if (index === -1) {
      return of(false);
    }
    this._ingredients.next([
      ...this.ingredients.slice(0, index),
      ...this.ingredients.slice(index + 1, this.ingredients.length),
    ]);
    return of(true);
  }

  private getIndexById(id: string): number {
    return this.ingredients.findIndex(
      (eachIngredient) => eachIngredient.name.toLowerCase() === id.toLowerCase()
    );
  }

  private append(...ingredients: Ingredient[]): void {
    const previousIngredients = this.ingredients;
    this._ingredients.next([...previousIngredients, ...ingredients]);
  }
}
