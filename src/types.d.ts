export interface Product {
  id: string;
  name: string;
  presentacion: number;
  description: string;
  category: {
    id: string;
    name: string;
    icon: number;
  };
  price: string;
  currency: string;
  label: string;
  isActive: boolean;
  flavors?: {
    id: string;
    name: string;
    stock: number;
  }[];
  images: {
    id: string;
    img?: string;
    https?: string;
  }[];
}
