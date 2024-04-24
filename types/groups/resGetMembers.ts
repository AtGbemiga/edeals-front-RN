export interface OneGroupMember {
  id: number;
  account_name: string;
  img: string;
}

export interface ResGetGroupMembers {
  result: OneGroupMember[];
}
