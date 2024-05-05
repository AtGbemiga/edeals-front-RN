export interface OneOrder {
  id: number;
  user_id: number;
  product_id: number;
  fk_user_email: string;
  reference_id: string;
  created_at: string;
  order_status: string;
  buyer_name: string;
  name: string;
  price: number;
  first_img: string;
}

export interface ResGetOrders {
  ordersRes: OneOrder[];
}
