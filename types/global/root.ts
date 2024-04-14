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
  // Feed: { sort: 'latest' | 'top' } | undefined;
};
