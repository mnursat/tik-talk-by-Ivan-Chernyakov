import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../../auth/auth';
import {Router} from '@angular/router';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss']
})
export class LoginPage {

  authService = inject(Auth)
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup<LoginForm>({
    username: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  })

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.getRawValue();
      this.authService.login(value).subscribe(_ => {
        this.router.navigate(['/'])
      });
    }
  }

}
