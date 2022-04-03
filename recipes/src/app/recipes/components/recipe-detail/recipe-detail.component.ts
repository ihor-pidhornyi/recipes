import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import {
  ConfirmationModalComponent,
  ConfirmationModalData,
  ConfirmModalResult,
  NotificationService,
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
    private notificationService: NotificationService,
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
    this.shoppingService
      .addIngredients(recipe?.ingredients)
      .pipe(take(1))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.notificationService.success(
            `Added ${recipe.name} ingredients to shopping list!`
          );
          return;
        }
        this.notificationService.error(
          `Whoops.. Couldn't ingredients of ${recipe.name} to shopping list`
        );
      });
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
          this.recipesService
            .deleteRecipe(recipe.id)
            .pipe(take(1))
            .subscribe((isSuccess) => {
              if (isSuccess) {
                this.router.navigate(['../'], { relativeTo: this.route });
                this.notificationService.success(
                  `Successfully deleted recipe: ${recipe.name}`
                );
                return;
              }
              this.notificationService.error(
                `Couldn't delete recipe with name: ${recipe.name}, try again!`
              );
            });
        }
      });
  }
}
