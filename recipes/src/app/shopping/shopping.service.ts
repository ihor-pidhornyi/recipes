import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/models/ingredient.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor() {
  }

  public getIngredients$(): Observable<Ingredient[]> {
    return of([
      {name: 'Apples', amount: 5},
      {name: 'Tomatoes', amount: 10}
    ])
  }
}
