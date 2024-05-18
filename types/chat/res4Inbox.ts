export interface OneInboxLIInfo {
  id: number;
  message: string;
  fk_sender_id: number;
  fk_recipient_id: number;
}

export interface Res4InboxLIInfo {
  finalResult: [
    OneInboxLIInfo[],
    {
      result_count: number;
    }[]
  ];
}
