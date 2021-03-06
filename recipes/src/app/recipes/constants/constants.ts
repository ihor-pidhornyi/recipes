import { Recipe } from '../models/recipe.model';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'A Test recipe',
    description: 'This is simply a test',
    imagePath:
      'https://www.hellomagazine.com/imagenes/cuisine/20210211106689/pancake-day-recipes-sweet-savoury/0-514-409/pancake-day-z.jpg',
    ingredients: [
      { name: 'Eggs', amount: 2 },
      { name: '250ml of Milk', amount: 1 },
      { name: '50g of Sugar', amount: 1 },
      { name: '10g of Salt', amount: 1 },
      { name: '300g of Baking flour', amount: 1 },
    ],
  },
  {
    id: '2',
    name: 'Another Test recipe',
    description: 'This is simply a test This is simply a test This is simply a test This is simply a test This is simply a test This is simply a test This is simply a test',
    imagePath:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goulash-1640024815.jpeg?crop=1.00xw:0.752xh;0,0.115xh&resize=1200:*',
    ingredients: [
      { name: 'tbsp. extra-virgin olive oil', amount: 2 },
      { name: 'medium yellow onion, chopped', amount: 1 },
      { name: 'cloves garlic, minced', amount: 2 },
      { name: 'lb. ground beef', amount: 1 },
      { name: 'tbsp. tomato paste', amount: 1 },
      { name: '1/4 c. low-sodium beef broth', amount: 1 },
      { name: '(15-oz.) can tomato sauce', amount: 1 },
      { name: '(15-oz.) can diced tomatoes', amount: 1 },
      { name: 'tsp. Italian seasoning', amount: 1 },
      { name: 'tsp. paprika', amount: 1 },
      { name: '1/2 c. elbow macaroni, uncooked', amount: 1 },
      { name: 'c. shredded cheddar', amount: 1 },
    ],
  },
];

export enum RECIPE_FORM {
  id = 'id',
  name = 'name',
  description = 'description',
  imagePath = 'imagePath',
  ingredients = 'ingredients'
}
