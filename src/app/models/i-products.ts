export interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  slug: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  quantity: number;
  category: {
    id: number;
    name: string;
    slug: string;
    images: string;
    createdAt: string;
    updatedAt: string;
  };
}
