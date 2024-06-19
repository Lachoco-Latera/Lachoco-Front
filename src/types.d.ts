export interface Product {
  id?: number;
  name?: string;
  img: string[];
  price: number;
  ratings: string | number;
  description: string;
  advice: string;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  quantity?: number;
}
