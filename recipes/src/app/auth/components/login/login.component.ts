import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form: FormGroup | undefined;
  public hidden = true;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  public login(): void {
    if (!this.form || this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  public toggleField(): void {
    this.hidden = !this.hidden;
  }
}
