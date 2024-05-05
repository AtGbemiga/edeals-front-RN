export interface OneProductLInfo {
  id: number;
  name: string;
  sub_heading: string;
  price: number;
  first_img: string;
  rating: string;
  ratings_count: number;
  discount: string;
  discount_price: string;
  user_has_wishlisted: number;
  wishlist_id: number | null;
}

export interface ResProductsLInfo {
  productsRes: OneProductLInfo[];
}

/* wish list */
export interface ResWishListLInfo {
  wishListRes: OneProductLInfo[];
}

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
  readonly id: number;
  readonly name: string;
  readonly sub_heading: string;
  readonly price: number;
  readonly imgs: string[];
  readonly rating: string;
  readonly ratings_count: number;
  discount: string;
  discount_price: string;
  readonly description: string;
  readonly category: string;
  readonly wishlist_id?: number;
  readonly user_has_wishlisted: number;
  readonly sizes: Size[];
  readonly colors: Color[];
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
  similarProductsRes: OneSimilarProduct[];
}

/* search */
export type OneSearchLInfo = Pick<
  OneProductLInfo,
  "id" | "name" | "first_img" | "rating" | "ratings_count"
> & {
  store_id: number;
  account_name: string;
  img: string;
  verified: "0" | "1";
  searchRes: string;
};

export interface ResSearchLInfo {
  productSearchData: OneSearchLInfo[];
}
