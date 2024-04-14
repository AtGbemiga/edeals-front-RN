export interface OneProductLInfo {
  id: number;
  name: string;
  sub_heading: string;
  price: number;
  first_img: string;
  rating?: string;
  ratings_count?: number;
  discount?: string;
}

export interface ResProductsLInfo {
  result: OneProductLInfo[];
}

// type ModifiedOneProductLInfo = Omit<OneProductLInfo, "first_img">;
// export interface OneProductFInfo extends ModifiedOneProductLInfo {
//   description: string;
//   imgs: string;
// }

export interface Color {
  red: string;
  blue: string;
  black: string;
  brown: string;
  green: string;
  white: string;
  orange: string;
  purple: string;
  yellow: string;
  colors_id: number;
}

export interface Size {
  l: string;
  m: string;
  s: string;
  xl: string;
  xs: string;
  x3l: string;
  xxl: string;
  sizes_id: number;
}
export interface OneProductFInfo {
  id: number;
  name: string;
  sub_heading: string;
  price: number;
  imgs: string[];
  rating: string;
  ratings_count: number;
  discount: string;
  description: string;
  category: string;
  sizes: Size[];
  colors: Color[];
}

export interface ResProductFInfo {
  result: OneProductFInfo[];
}

/* similar products */
export type OneSimilarProduct = Omit<
  OneProductLInfo,
  "sub_heading" | "rating" | "ratings_count" | "discount"
>;

export interface ResSimilarProducts {
  result: OneSimilarProduct[];
}
