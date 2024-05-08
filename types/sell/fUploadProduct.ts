export interface FProductUpload {
  name: string;
  subHeading: string;
  description: string;
  category: string;
  price: number | undefined;
  stock_no: number | undefined;
  status: "Nigerian" | "Imported";
  xs: "0" | "1";
  s: "0" | "1";
  m: "0" | "1";
  l: "0" | "1";
  xl: "0" | "1";
  xxl: "0" | "1";
  x3l: "0" | "1";
  blue: "0" | "1";
  red: "0" | "1";
  yellow: "0" | "1";
  green: "0" | "1";
  brown: "0" | "1";
  orange: "0" | "1";
  white: "0" | "1";
  black: "0" | "1";
  purple: "0" | "1";
}

export enum FInputNames {
  name = "name",
  subHeading = "subHeading",
  description = "description",
  //   category = "category",
  price = "price",
  stock_no = "stock_no",
  status = "status",
  xs = "xs",
  s = "s",
  m = "m",
  l = "l",
  xl = "xl",
  xxl = "xxl",
  x3l = "x3l",
  blue = "blue",
  red = "red",
  yellow = "yellow",
  green = "green",
  brown = "brown",
  orange = "orange",
  white = "white",
  black = "black",
  purple = "purple",
}

export enum FUStatus {
  Nigerian = "Nigerian",
  Imported = "Imported",
}
