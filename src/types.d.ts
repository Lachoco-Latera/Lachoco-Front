export interface Product {
  id: string;
  name: string;
  presentacion: number;
  description: string;
  quantity: number;
  category: {
    id: string;
    name: string;
    icon: number;
  };
  price: string;
  currency: string;
  label: string;
  isActive: boolean;
  flavors: {
    id: string;
    name: string;
    stock: number;
  }[];
  images: string[];
}

export interface GiftCard {
  id:string
  designCard: string;
  amountCard: string;
  nameRecipient: string;
  emailRecipient: string;
  nameSender: string;
  emailSender: string;
  message?: string;
}