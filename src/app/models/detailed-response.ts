import { IProducts } from "./i-products";

export interface DetailedResponse {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}
