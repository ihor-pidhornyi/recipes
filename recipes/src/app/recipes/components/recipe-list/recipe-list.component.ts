import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    {
      name: 'A Test recipe',
      description: 'This is simply a test',
      imagePath: 'https://www.hellomagazine.com/imagenes/cuisine/20210211106689/pancake-day-recipes-sweet-savoury/0-514-409/pancake-day-z.jpg'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
