export interface OneDeal {
  id: number;
  need: string;
  price: number;
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
}
export interface ResGetDeals {
  result: OneDeal[];
}
