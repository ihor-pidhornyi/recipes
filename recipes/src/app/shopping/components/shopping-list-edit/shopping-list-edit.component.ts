import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../../shared/services/shopping.service';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListEditComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  public addIngredient(): void {
    if (this.form.invalid) {
      return;
    }

    const ingredient: Ingredient = this.form.value as Ingredient;
    this.shoppingService.addIngredient(ingredient);
  }

  public clearForm(): void {
    this.form.reset();
  }
}
