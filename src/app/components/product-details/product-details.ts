import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

// interface
import { IProducts } from '../../models/i-products';

// service
import { FetchProducts } from '../../services/fetch-products';

// loader component
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, Loader],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  id: string = '';
  // to get all fetched data
  product: IProducts | undefined = {} as IProducts;

  // random rating
  ratings: number[] = [];

  // loading stop
  loading: boolean = true;

  // inject products from service(fetchProducts)
  constructor(private fetchProducts: FetchProducts, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((result: Params) => (this.id = result['id']));
    // when component start fetch all data
    this.fetchProducts.getAllGames().subscribe((products) => {
      this.product = products.find((product) => product.id == Number(this.id));
      this.ratings = products.map(() => Number((Math.random() * 5).toFixed(1)));

      // stop loader
      this.loading = false;
    });
  }

  // return rating as array to loop it
  rangeFill(n: number) {
    return Array.from({ length: Math.round(n) });
  }
  rangeEmpty(n: number) {
    return Array.from({ length: 5 - Math.round(n) });
  }
}
