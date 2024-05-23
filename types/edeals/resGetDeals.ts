export interface OneDeal {
  id: number;
  need: string;
  price: number;
  lg: string;
  state: string;
  tag:
    | "User"
    | "MakeupArtist"
    | "Repairer"
    | "Electrician"
    | "Plumber"
    | "Hairdresser"
    | "CarMechanic"
    | "Products";
  user_id: number;
  deal_taker_id: number;
}
export interface ResGetDeals {
  result: OneDeal[];
}
