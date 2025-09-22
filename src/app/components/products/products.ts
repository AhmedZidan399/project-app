import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';

// service
import { FetchProducts } from '../../services/fetch-products';

// interface
import { IProducts } from '../../models/i-products';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// components
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-products',
  imports: [SlicePipe, RouterLink, FormsModule, Loader],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  // to get all fetched data
  products: Array<IProducts> = [];

  // to get all filterd data match category selected
  filteredData: Array<IProducts> = [];

  // value selected from select box
  selectedCategory: string = '';

  // search term
  searchTerm: string = '';

  // category select box
  categories: any = [];

  // random rating
  ratings: number[] = [];

  // pagination
  page: number = 1; // current page
  pageSize: number = 12; // products per page
  pagedData: Array<IProducts> = []; // products for current page

  // loading stop
  loading: boolean = true;

  // inject products from service(fetchProducts)
  constructor(private fetchProducts: FetchProducts, private router: Router) {}

  ngOnInit(): void {
    // when component start fetch all data
    // this.fetchProducts.getAllGames().subscribe((products) => (this.products = products));
    this.fetchProducts.getAllGames().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredData = this.products;
        this.categories = [...new Set(this.products.map((product) => product.category.name))];
        this.ratings = products.map(() => Number((Math.random() * 5).toFixed(1)));

        // pagination
        this.page = 1; // reset to first page after filtering
        this.updatePagedData();

        // stop loading
        this.loading = false;
      },
    });
  }

  // return rating as array to loop it
  rangeFill(n: number) {
    return Array.from({ length: Math.round(n) });
  }
  rangeEmpty(n: number) {
    return Array.from({ length: 5 - Math.round(n) });
  }

  viewDetails(id: number): void {
    this.router.navigate(['products', id]);
  }

  applyFilter(): void {
    this.filteredData = this.products.filter((p) => {
      const searchTermCleaned = this.searchTerm.trim().toLocaleLowerCase();
      const matchSearch =
        !this.searchTerm || p.title.toLocaleLowerCase().includes(searchTermCleaned);
      // || p.description.toLocaleLowerCase().includes(searchTermCleaned);

      const matchCategory =
        !this.selectedCategory ||
        p.category.name.toLocaleLowerCase().includes(this.selectedCategory.toLocaleLowerCase());

      return matchCategory && matchSearch;
    });

    this.page = 1; // reset to first page after filtering
    this.updatePagedData();
  }

  addToCart(p: IProducts, event: Event): void {
    event.stopPropagation(); // stop bubbling up
    event.preventDefault(); // prevent <a> navigatio
    if (!this.isInCart(p.id)) {
      // 1. Load existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      // Ensure it's always an array
      if (!Array.isArray(cart)) {
        cart = [];
      }

      // find if added once
      const existing = cart.find((prod: any) => prod.id == p.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...p, quantity: 1 });
      }

      // add to localstorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  // check item in cart
  isInCart(id: number): boolean {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return Array.isArray(cart) && cart.some((prod) => prod.id === id);
  }

  // pagination
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / 12);
  }

  updatePagedData() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filteredData.slice(startIndex, endIndex);
  }

  nextPrevPage(sign: string): void {
    this.loading = true;
    if (sign == '+') this.page++;
    else this.page--;
    this.updatePagedData();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.nextPrevPage('+');
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.nextPrevPage('-');
    }
  }
}
