import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
  brand?: string;
  link?: string;
  delivery?: string;
}

export interface CartItem extends Product {
  quantity: number;
  addedAt: Timestamp;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  deliveryOption: string;
  paymentMethod: string;
  location?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'pending_payment' | 'shipped' | 'delivered';
  createdAt: Timestamp;
}
