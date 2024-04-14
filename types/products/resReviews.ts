export interface OneProductReview {
  id: number;
  review: string;
  reviewer_name: string;
  reviewer_img: string;
}

export interface Res4ProductReviews {
  finalResult: [
    OneProductReview[],
    {
      total: number;
    }[]
  ];
}
