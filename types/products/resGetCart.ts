export interface OneCart {
  id: number;
  name: string;
  price: number;
  first_img: string;
  store_name: string;
  qty: number;
}
export interface ResGetCart {
  finalResult: [
    OneCart[],
    {
      total: number;
    }[]
  ];
}
