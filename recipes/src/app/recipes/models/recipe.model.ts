import {Ingredient} from "../../shared/models/ingredient.model";

export type Recipe = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[]
}
