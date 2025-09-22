import { TestBed } from '@angular/core/testing';

import { FetchProducts } from './fetch-products';

describe('FetchProducts', () => {
  let service: FetchProducts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchProducts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
