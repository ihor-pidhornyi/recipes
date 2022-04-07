import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum HiddenFields {
  password = 'password',
  repeatPassword = 'repeatPassword'
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  public form: FormGroup | undefined;
  public hidden: Record<HiddenFields, boolean> | undefined;

  public readonly HiddenFields = HiddenFields

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.min(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
    });

    this.hidden = {
      password: true,
      repeatPassword: true
    };
  }

  public register(): void {
    if (!this.form || this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  public toggleField(field: HiddenFields) {
    if (!this.hidden) {
      return
    }

    this.hidden[field] = !this.hidden[field]
  }
}
