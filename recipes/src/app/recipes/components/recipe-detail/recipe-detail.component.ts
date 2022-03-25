import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | undefined

  constructor() {
  }

  ngOnInit(): void {
  }

}
