import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients$ = new BehaviorSubject<Ingredient[]>([
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 },
  ]);

  constructor() {}

  public getIngredients$(): Observable<Ingredient[]> {
    return this.ingredients$.asObservable();
  }

  public addIngredient(ingredient: Ingredient): void {
    const previousIngredients = this.ingredients$.value;
    this.ingredients$.next([...previousIngredients, ingredient]);
  }

  public addIngredients(ingredients: Ingredient[]): void {
    const previousIngredients = this.ingredients$.value;
    this.ingredients$.next([...previousIngredients, ...ingredients]);
  }
}
