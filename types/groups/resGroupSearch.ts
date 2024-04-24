export interface OneGroupSearch {
  id: number;
  name: string;
  about: string;
  logo: string;
  fk_user_id: number;
  member_total: number;
  total_post_last_24_hrs: number;
}
export interface ResGroupSearch {
  finalResult: [
    OneGroupSearch[],
    {
      total: number;
    }[]
  ];
}
