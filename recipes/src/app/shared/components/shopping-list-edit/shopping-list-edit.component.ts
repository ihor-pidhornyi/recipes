import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListEditComponent implements OnInit {
  @Input() set ingredient(ingredient: Ingredient) {
    if (!this.isEdit$.value) {
      this.isEdit$.next(true);
    }
    this.ingredient$.next(ingredient);
  }

  @Output() submitted = new Subject<Ingredient>();
  @Output() discard = new Subject<void>();

  private positiveNumbers = new RegExp(/^[1-9]+[0-9]*$/);
  public form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern(this.positiveNumbers),
    ]),
  });

  public ingredient$ = new BehaviorSubject<Ingredient | null>(null);
  public isEdit$ = new BehaviorSubject<boolean>(false);

  private onDestroy$ = new Subject<void>();

  constructor() {}


  ngOnInit(): void {
    this.ingredient$.pipe().subscribe((ingredient: Ingredient | null) => {
      if (ingredient) {
        this.form.setValue(ingredient);
      }
    });
  }

  public onSubmit(): void {
    if (!this.form || this.form.invalid) {
      return;
    }
    const ingredient: Ingredient = this.form.value as Ingredient;
    this.submitted.next(ingredient);

    this.form.reset();
  }

  public onDiscard(): void {
    this.discard.next()
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }

  public isNewEditValue(): boolean {
    return this.ingredient$.value?.name !== this.form?.get('name')?.value;
  }
}
