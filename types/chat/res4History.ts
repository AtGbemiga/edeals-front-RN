export interface OneChat {
  id: number;
  message: string;
  fk_sender_id: number;
  fk_recipient_id: number;
}
export interface Res4ChatHistory {
  result: OneChat[];
}
