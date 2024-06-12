import * as SecureStore from "expo-secure-store";
import { ResPaystackPaymentInit } from "../../types/paystack/resPaymentInitialization";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

export const payContactInitFn = async ({
  email,
  setErrMsg,
  recipientID,
}: {
  email: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  recipientID: number;
}): Promise<ResPaystackPaymentInit | ResSuccess | undefined> => {
  const url = `${baseURL}/paystack/paymentContact?email=${email}&recipientID=${recipientID}&amount=300000`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: ResPaystackPaymentInit | ResSuccess = await res.json();

  console.log("function", data);

  return data;
};
