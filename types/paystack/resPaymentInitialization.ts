export interface PaystackPaymentInitData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface ResPaystackPaymentInit {
  status: boolean;
  message: string;
  data: PaystackPaymentInitData;
}
