import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  public recipes$: Observable<Recipe[]> | undefined;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.recipesService.getRecipes$();
  }

  public trackByFn(index: number): number {
    return index;
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
