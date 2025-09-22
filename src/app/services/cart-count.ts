import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartCount {
  // get cart length
  cartItemsCount(): number {
    if (localStorage.getItem('cart')) return JSON.parse(localStorage.getItem('cart')!).length;
    else return 0;
  }
}
