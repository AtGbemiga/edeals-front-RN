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
}
export interface ResGetDeals {
  result: OneDeal[];
}
