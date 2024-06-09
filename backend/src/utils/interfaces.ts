export interface User {
  id: number;
  name: string;
  email: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

export interface OrderRecord {
  amount: number;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

export interface OrderChairsRecord {
  order_id: number;
  chair_id: number;
  quantity?: number;
}

export interface OrderTablesRecord {
  order_id: number;
  table_id: number;
  quantity?: number;
}

export interface OrderTopsRecord {
  order_id: number;
  top_id: number;
  quantity?: number;
}
export interface createOrderRecord {
  id?: number;
  amount: number;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  pincode: string;
}
