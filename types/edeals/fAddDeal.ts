export interface FAddDeal {
  need: string;
  price: string;
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
}
