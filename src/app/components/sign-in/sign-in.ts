import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
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
    });
  }

  //   onSubmit(): void {
  //     // using localstorage
  //     // if (this.loginForm.valid) {
  //     //   if (localStorage.getItem('user')) {
  //     //     const localStorageUsers = JSON.parse(localStorage.getItem('user')!);
  //     //     const exist = localStorageUsers.find((user: any) => {
  //     //       return (
  //     //         user.email == this.loginForm.get('email')?.value &&
  //     //         user.password == this.loginForm.get('password')?.value
  //     //       );
  //     //     });
  //     //     if (exist) {
  //     //       window.location.reload();
  //     //       this.router.navigate([this.router.url]);
  //     //     }
  //     //   }
  //     // } else {
  //     //   this.loginForm.markAllAsTouched(); // show all validation errors
  //     //   return;
  //     // }
  //   }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // First check local "registered users"
      let users = JSON.parse(localStorage.getItem('userDb') || '[]');
      const found = users.find((u: any) => u.email === email && u.password === password);

      if (found) {
        this.auth.saveUser(found);
        // close signup popup
        document.querySelector('.loginModel .btn-close')?.dispatchEvent(new Event('click'));
        this.router.navigate(['/products']);
        return;
      }

      // Otherwise try dummyjson seeded login
      this.auth.login(email, password).subscribe({
        next: (res) => {
          this.auth.saveUser(res);
          // close signup popup
          document.querySelector('.loginModel .btn-close')?.dispatchEvent(new Event('click'));
          this.router.navigate(['/products']);
        },
        error: () => alert('Invalid credentials'),
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // get all error
  getError(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return 'Too short.';
    if (control?.hasError('maxlength')) return 'Too long.';
    if (control?.hasError('pattern')) return 'Invalid format.';
    return '';
  }
}
