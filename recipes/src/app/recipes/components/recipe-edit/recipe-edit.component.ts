import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  Ingredient,
  NotificationService,
  POSITIVE_NUMBER_PATTERN,
  URL_PATTERN,
} from '@shared';
import { RECIPE_FORM } from '../../constants/constants';
import { RecipesService } from '../../recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit {
  public id$: Observable<string> | undefined;
  public isEditMode$ = new BehaviorSubject<boolean>(false);

  public form: FormGroup | undefined;
  public RECIPE_FORM = RECIPE_FORM;

  private onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesServices: RecipesService,
    private notificationService: NotificationService
  ) {}

  public get controls(): FormGroup[] {
    return (this.ingredients?.controls ?? []) as FormGroup[];
  }

  private get ingredients(): FormArray | null {
    const formArray = this.form?.get(RECIPE_FORM.ingredients) as
      | FormArray
      | null
      | undefined;
    return formArray ? formArray : null;
  }

  ngOnInit(): void {
    this.id$ = this.route.params.pipe(
      map((params: Params) => params['id']),
      filter((id): id is string => typeof id === 'string')
    );

    this.isEditMode$.pipe(takeUntil(this.onDestroy$)).subscribe((isEdit) => {
      !isEdit && this.initForm();
    });

    this.id$
      .pipe(
        switchMap((id) => this.recipesServices.getRecipe$(id)),
        takeUntil(this.onDestroy$)
      )
      .subscribe((recipe) => {
        this.isEditMode$.next(true);
        this.initForm(recipe);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSubmit(): void {
    const recipe = this.form?.value as Recipe;
    this.isEditMode$?.pipe(take(1)).subscribe((isEdit) => {
      if (isEdit && recipe.id) {
        this.recipesServices
          .updateRecipe(recipe.id, recipe)
          .pipe(take(1))
          .subscribe((isSuccess) => {
            if (isSuccess) {
              this.notificationService.success(`Updated ${recipe.name} recipe!`)
              this.router.navigate(['../'], { relativeTo: this.route });
              return;
            }
            this.notificationService.error('Whoops.. Something went wrong. Try again!')
          });
      }
      if (!isEdit) {
        this.recipesServices
          .addRecipe(recipe)
          .pipe(take(1))
          .subscribe((isSuccess) => {
            if (isSuccess) {
              this.notificationService.success(`Added new ${recipe.name} recipe!`)
              this.router.navigate(['../'], { relativeTo: this.route });
              return;
            }
            this.notificationService.success(`Couldn't add new recipe. Try again!`)
          });
      }
    });
  }

  public discardChanges(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public addIngredientControl() {
    const formArray = this.ingredients;
    if (formArray) {
      formArray.push(this.createIngredientControl());
    }
  }

  public removeIngredientControl(index: number) {
    const formArray = this.ingredients;
    if (formArray) {
      formArray.removeAt(index);
    }
  }

  public trackByFn(index: number): number {
    return index;
  }

  private createIngredientControl(
    ingredient: Ingredient | null = null
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient?.name, Validators.required),
      amount: new FormControl(ingredient?.amount, [
        Validators.required,
        Validators.pattern(POSITIVE_NUMBER_PATTERN),
      ]),
    });
  }

  private initForm(recipe: Recipe | null = null) {
    let initValues: Partial<Recipe> = {};
    let ingredientsControls: FormGroup[] = [this.createIngredientControl()];

    if (recipe) {
      initValues = recipe;
      ingredientsControls = recipe.ingredients.map((ingredient) =>
        this.createIngredientControl(ingredient)
      );
    }

    this.form = new FormGroup({
      [RECIPE_FORM.id]: new FormControl(initValues.id),
      [RECIPE_FORM.name]: new FormControl(initValues.name, Validators.required),
      [RECIPE_FORM.description]: new FormControl(
        initValues.description,
        Validators.required
      ),
      [RECIPE_FORM.imagePath]: new FormControl(initValues.imagePath, [
        Validators.required,
        Validators.pattern(URL_PATTERN),
      ]),
      [RECIPE_FORM.ingredients]: new FormArray(ingredientsControls),
    });
  }
}
