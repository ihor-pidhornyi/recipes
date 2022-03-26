import {Ingredient} from "../../shared/models/ingredient.model";

export type Recipe = {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[]
}
