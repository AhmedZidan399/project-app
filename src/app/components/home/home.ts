import { Component } from '@angular/core';

// components
import { Instagram } from './instagram/instagram';
import { Subscribe } from './subscribe/subscribe';
import { Testimonials } from './testimonials/testimonials';
import { YearlySale } from './yearly-sale/yearly-sale';
import { LatestBlog } from './latest-blog/latest-blog';
import { Billboard } from './billboard/billboard';
import { OurServices } from './our-services/our-services';

// interface
import { IProducts } from '../../models/i-products';

// service
import { FetchProducts } from '../../services/fetch-products';

@Component({
  selector: 'app-home',
  imports: [Instagram, Subscribe, Testimonials, YearlySale, LatestBlog, Billboard, OurServices],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // to get all fetched data
  products: Array<IProducts> = [];

  constructor(private fetchProducts: FetchProducts) {}

  ngOnInit(): void {
    // when component start fetch all data
    // this.fetchProducts.getAllGames().subscribe((products) => (this.products = products));
    this.fetchProducts.getAllGames().subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
