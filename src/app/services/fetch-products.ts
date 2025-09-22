import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

// interface
import { IProducts } from '../models/i-products';

// component from api
import { HttpReq } from './http-req';

@Injectable({
  providedIn: 'root',
})
export class FetchProducts {
  constructor(private httpRequest: HttpReq) {}
  getAllGames(): Observable<Array<IProducts>> {
    return this.httpRequest
      .getRequest<Array<IProducts>>('products')
      .pipe(map((products) => (products = Object.values(products))));
  }
}
