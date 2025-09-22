import { Routes } from '@angular/router';

// components
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Cart } from './components/cart/cart';
import { NotFound } from './components/not-found/not-found';
import { ProductDetails } from './components/product-details/product-details';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetails },
  { path: 'cart', component: Cart },
  { path: 'profile', component: Profile },
  // default path
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // not found path
  { path: '**', component: NotFound },
];
