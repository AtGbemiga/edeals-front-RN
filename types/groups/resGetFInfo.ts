export interface OneGroupFInfo {
  id: number;
  name: string;
  about: string;
  logo: string;
  fk_user_id: number;
  member_total: number;
  user_has_joined: number;
}

export interface ResGroupFInfo {
  result: OneGroupFInfo[];
}
