import * as SecureStore from "expo-secure-store";
import { ResPaystackPaymentInit } from "../../types/paystack/resPaymentInitialization";

export const payStackInitFn = async ({
  email,
  amount,
}: {
  email: string;
  amount: string;
}): Promise<ResPaystackPaymentInit> => {
  const url = `https://fav-work.loca.lt/api/v1/paystack/payment?amount=${amount}&email=${email}`;
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
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg}`
    );
  }

  const data = await res.json();

  console.log("function", data);

  return data;
};
