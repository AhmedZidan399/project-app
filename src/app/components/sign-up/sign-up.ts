import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/),
        ],
      ],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  //   onSubmit(): void {
  //     // using localstorage
  //     // if (this.signupForm.valid) {
  //     //   // get old users (if any)
  //     //   let users = JSON.parse(localStorage.getItem('user') || '[]');
  //     //   // push new user
  //     //   users.push(this.signupForm.value);
  //     //   // parse it again
  //     //   localStorage.setItem('user', JSON.stringify(users));
  //     //   window.location.reload();
  //     //   this.router.navigate([this.router.url]);
  //     // } else {
  //     //   this.signupForm.markAllAsTouched(); // show all validation errors
  //     //   return;
  //     // }
  //   }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;

      this.auth.register({ username: name, email, password }).subscribe({
        next: (res) => {
          console.log('User registered in dummy:', res);

          // Save locally so we can "login" later
          let users = JSON.parse(localStorage.getItem('userDb') || '[]');
          users.push(res);
          localStorage.setItem('userDb', JSON.stringify(users));
          this.auth.saveUser(res);
          // close signup popup
          document.querySelector('.signUpModel .btn-close')?.dispatchEvent(new Event('click'));
          this.router.navigate(['/profile']);
        },
        error: (err) => console.error('Register failed', err),
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  // get all error
  getError(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return 'Too short.';
    if (control?.hasError('maxlength')) return 'Too long.';
    if (control?.hasError('pattern')) return 'Invalid format.';
    return '';
  }
}
