import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// components
import { SignIn } from '../sign-in/sign-in';
import { SignUp } from '../sign-up/sign-up';
import { CartCount } from '../../services/cart-count';

// authontication
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, SignIn, SignUp],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly title = signal('project-app');

  constructor(private cartcount: CartCount, private auth: Auth, private router: Router) {}

  // get cart length
  get productsLengthCart() {
    return this.cartcount.cartItemsCount();
  }

  // check login dynamically
  get islogged() {
    return !!localStorage.getItem('user');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/products']);
  }
}
