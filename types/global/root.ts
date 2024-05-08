import { ResPaystackPaymentInit } from "../paystack/resPaymentInitialization";

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  Screen1: undefined;
  Screen2: undefined;
  "Select Account Type": { screen: "seller" | "buyer" };
  "Log In/Sign Up": { screen: "seller" | "buyer" };
  "Log In/Sign Up Form": { screen: "seller" | "buyer" };
  Terms: undefined;
  Privacy: undefined;
  HomeRoot: undefined;
  "Dynamic Product": { id: number };
  Cart: undefined;
  "Search Filiter": undefined;
  DynamicProfile: { id: number };
  More: undefined;
  Profile: undefined;
  UpdateProfile: { id: number };
  readonly WishList: { id: number };
  readonly GroupsIndex: undefined;
  readonly GroupFullInfo: { id: number };
  readonly PaymentScreen: { res: ResPaystackPaymentInit };
  Thanks: undefined;
  Orders: undefined;
  Sell: undefined;
};
