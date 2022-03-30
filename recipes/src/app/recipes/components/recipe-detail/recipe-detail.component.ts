import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import {
  ConfirmationModalComponent,
  ConfirmationModalData,
  ConfirmModalResult,
  ShoppingService,
} from '@shared';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe> | undefined;

  constructor(
    private shoppingService: ShoppingService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipe$ = this.route.params.pipe(
      switchMap((params) => {
        const id = params['id'];
        return this.recipesService.getRecipe$(id);
      })
    );
  }

  public addToShoppingList(recipe: Recipe) {
    this.shoppingService.addIngredients(recipe?.ingredients);
  }

  public onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe(recipe: Recipe): void {
    this.dialog
      .open<ConfirmationModalComponent, ConfirmationModalData>(
        ConfirmationModalComponent,
        {
          data: {
            contentText:
              'Are you sure you want delete ' +
              recipe.name +
              ' from your recipes?',
            confirmText: 'Yes',
          },
        }
      )
      .afterClosed()
      .pipe(
        take(1),
        filter(
          (value): value is ConfirmModalResult => value && 'confirm' in value
        )
      )
      .subscribe(({ confirm }) => {
        if (confirm && recipe.id) {
          // notification successful delete
          this.recipesService
            .deleteRecipe(recipe.id)
            .pipe(take(1))
            .subscribe((isSuccess) => {
              if (isSuccess) {
                this.router.navigate(['../'], { relativeTo: this.route });
              }
            });
        }
      });
  }
}
