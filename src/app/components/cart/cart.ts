import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProducts } from '../../models/i-products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, SlicePipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  productsInCart: IProducts[] = [];

  totalPrice: number = 0;
  shippingPrice: number = 5;

  calcTotalPrice() {
    this.totalPrice = 0;
    // calc total price
    for (let p of this.productsInCart) {
      this.totalPrice += Number(p.price);
    }

    // shipping price
    this.shippingPrice = 5 * this.productsInCart.length;
  }

  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.productsInCart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.calcTotalPrice();
    }
  }

  // remove item from cart
  removeItemFromCart(id: number): void {
    const itemDeleted = this.productsInCart.findIndex((p) => p.id == id);
    this.productsInCart.splice(itemDeleted, 1);
    localStorage.setItem('cart', JSON.stringify(this.productsInCart));
    this.calcTotalPrice();
  }

  // check login dynamically
  get islogged() {
    return !!localStorage.getItem('user');
  }

  checkout(): void {
    if (this.islogged) {
      // remove cart from localStorage
      localStorage.removeItem('cart');

      // clear the component cart state
      this.productsInCart = [];
      this.totalPrice = 0;
      alert('check successfuly, products will arrived soom ^__^');
    }
  }
}
