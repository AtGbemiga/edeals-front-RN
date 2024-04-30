export interface OneSearchService {
  id: number;
  account_name: string;
  img: string;
  verified: string;
  avg_rating: string;
  tag: string;
  ratings_count: number;
}
export interface ResSearchServices {
  servicesFinalResult: [
    OneSearchService[],
    {
      total: number;
    }[]
  ];
}
